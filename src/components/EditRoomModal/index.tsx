import React, { useState, useEffect, useRef } from "react";
import { Modal, ActivityIndicator, ModalProps, TouchableOpacity, Modal as CameraModal } from "react-native";
import Toast from "react-native-toast-message";
import {
  ModalOverlay,
  ModalContainer,
  ModalTitle,
  ModalButtons,
  ModalButton,
  ModalButtonText,
  ExternalInputContainer,
  PhotoRoomContainer,
  InputName,
  AddPhotoRoomContainer,
  PhotoIcon,
  PhotoText,
  PhotoPreview,
  RemovePhotoButton,
  RemovePhotoIcon,
  CameraModalContainer,
  CameraPermissionDenied,
  CameraButtonText,
  CameraControls,
  CameraButton,
  CaptureButton,
} from "./styles";
import { Room, updateRoom } from "@services/rooms.service";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ScrollView } from "react-native";
import { FormInput } from "@components/FormInput";
import { Dropdown } from "@components/Dropdowm";
import { fetchUsers, User } from "@services/employee.service";
import { CameraView, useCameraPermissions } from "expo-camera";
import api from "@services/api";

type Props = ModalProps & {
  room: Room;
  onClose: () => void;
  onRoomUpdated: () => void;
};

const editRoomFormSchema = z.object({
  nome_numero: z.string().trim().nonempty("Campo obrigatório"),
  localizacao: z.string().trim().nonempty("Campo obrigatório"),
  capacidade: z.string().trim().nonempty("Campo obrigatório"),
  validade_limpeza_horas: z.string().trim().optional(),
  responsaveis: z.array(z.string()).optional(),
  descricao: z.string().trim().optional().nullable(),
  instrucoes: z.string().trim().optional().nullable()
});

export type EditRoomFormData = z.infer<typeof editRoomFormSchema>;

export function EditRoomModal({ room, onClose, onRoomUpdated, ...rest }: Props) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [responsableButtonPressed, setResponsableButtonPressed] = useState(false);
  const [responsables, setResponsables] = useState<User[]>({} as User[]);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [originalPhoto, setOriginalPhoto] = useState<string | null>(null);

  const [isCameraVisible, setCameraVisible] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);

  const { control, handleSubmit, formState: { errors }, reset } = useForm<EditRoomFormData>({
    resolver: zodResolver(editRoomFormSchema)
  });

    async function handleOpenCam() {
      if (permission && permission.granted) {
        setCameraVisible(true);
        return;
      }
  
      const response = await requestPermission();
      if (!response.granted) {
        Toast.show({
          type: "error",
          text1: "Permissão Negada",
          text1Style: {
            fontSize: 16,
          },
          text2: "Permita o acesso da câmera para tirar fotos.",
          text2Style: {
            fontSize: 12,
          },
        });
        return;
      }
      setCameraVisible(true);
    }
  
    async function handleTakePhoto() {
      if (!cameraRef.current) return;
  
      try {
        const photo = await cameraRef.current.takePictureAsync({ quality: 0.7 });
        if (photo) {
          setPhotoUri(photo.uri); 
        }
      } catch (error) {
        console.error("Erro ao tirar foto: ", error);
        Toast.show({ type: "error", text1: "Erro ao tirar foto." });
      } finally {
        setCameraVisible(false); 
      }
    }

  async function getEmplooyes() {
    try {
      const data = await fetchUsers("group", "zeladoria");

      setResponsables(data);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.nome_numero?.[0] || "Não foi possível resgatar os zeladores";
      Toast.show({
        type: "error",
        text1: "Erro no Cadastro",
        text2: errorMessage,
      });
    }
  }

  function pressResponsableButton() {
    setResponsableButtonPressed(oldValue => !oldValue);
  }

  const handleClose = () => {
    reset();
    onClose();
    setResponsableButtonPressed(false);
    setPhotoUri(null);
    setOriginalPhoto(null);
  };
  
  const handleUpdateRoom = async (data: EditRoomFormData) => {
    const deleteExistingPhoto = !photoUri && !originalPhoto && !!room.imagem;

    try {
      // Passe a flag 'deleteExistingPhoto' para o serviço
      await updateRoom(room.qr_code_id, data, deleteExistingPhoto, photoUri);

      Toast.show({
        type: "success",
        text1: "Sucesso",
        text1Style: {
          fontSize: 16,
        },
        text2: "Sala editada com sucesso!",
        text2Style: {
          fontSize: 12,
        },
      });

      onRoomUpdated();
      onClose();
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.nome_numero?.localizacao?.[0] ||
        "Não foi possível atualizar a sala.";
      Toast.show({
        type: "error",
        text1: "Erro na Edição",
        text2: errorMessage,
      });
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    if (room) {
      reset({
        nome_numero: room.nome_numero,
        localizacao: room.localizacao,
        
        capacidade: room.capacidade?.toString() ?? '', 
        validade_limpeza_horas: room.validade_limpeza_horas?.toString() ?? '',

        responsaveis: room.responsaveis,
        
        descricao: room.descricao,
        instrucoes: room.instrucoes
      });
    }

    if (room.imagem) {
        const serverImageUrl = `${api.defaults.baseURL?.replace('/api/', '')}${room.imagem}`;
        setOriginalPhoto(serverImageUrl);
      } else {
        setOriginalPhoto(null);
      }
      
      setPhotoUri(null)
  }, [room, reset])

  useEffect(() => {
    getEmplooyes();
  }, []);

  const displayUri = photoUri || originalPhoto;

  return (
    <Modal transparent={true} onRequestClose={onClose} animationType="fade" {...rest}>
      <ModalOverlay>
        <ModalContainer>
          <ModalTitle>Editar sala</ModalTitle>
            <ScrollView 
              nestedScrollEnabled
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ gap: 8, flexDirection: "column" }}
            >
              <Controller
                control={control}
                name="nome_numero"
                render={({ field: { onChange, value } }) => (
                  <FormInput
                    inputName="Nome*"
                    placeholder="Ex: Auditório, Sala 101"
                    value={value}
                    onChangeText={onChange}
                    errorMessage={errors.nome_numero?.message}
                    onFocus={() => setResponsableButtonPressed(false)}
                  />
                )}
              />
    
              <Controller 
                control={control}
                name="localizacao"
                render={({ field: { onChange, value } }) => (
                  <FormInput
                    inputName="Localização*"
                    placeholder="Ex: Bloco B"
                    value={value}
                    onChangeText={onChange}
                    errorMessage={errors.localizacao?.message}
                    onFocus={() => setResponsableButtonPressed(false)}
                  />
                )}
              />
      
    
              <ExternalInputContainer>
                <Controller 
                  control={control}
                  name="capacidade"
                  render={({ field: { onChange, value } }) => (
                    <FormInput
                      inputName="Capacidade*"
                      placeholder="Ex: 30"
                      value={value}
                      onChangeText={onChange}
                      keyboardType="numeric"
                      flex={1}
                      errorMessage={errors.capacidade?.message}
                      onFocus={() => setResponsableButtonPressed(false)}
                    />
                  )}
                />
    
                <Controller 
                  control={control}
                  name="validade_limpeza_horas"
                  render={({ field: { onChange, value } }) => (
                    <FormInput
                      inputName="Validade da limpeza"
                      placeholder="Ex: 4"
                      value={value}
                      onChangeText={onChange}
                      keyboardType="numeric"
                      flex={1}
                      errorMessage={errors.validade_limpeza_horas?.message}
                      style={errors.capacidade?.message ? { marginBottom: 19 } : { }}
                      onFocus={() => setResponsableButtonPressed(false)}
                    />
                  )}
                />
              </ExternalInputContainer>
              
    
              <Controller
                control={control}
                name="responsaveis"
                render={({ field: { onChange, value } }) => (
                  <Dropdown
                    dropdownText="Responsáveis"
                    pressed={responsableButtonPressed}
                    onPress={pressResponsableButton}
                    content={responsables}
                    value={value || room.responsaveis}
                    onChange={onChange}
                    errorMessage={errors.responsaveis?.message}
                    onFocus={() => setResponsableButtonPressed(false)}
                  />
                )}
              /> 
              
          <PhotoRoomContainer>
            <InputName>Foto da sala</InputName>
            
            <AddPhotoRoomContainer onPress={!displayUri ? handleOpenCam : undefined} photoExists={!!displayUri} >
              
              { displayUri ?
                ( 
                  <>
                    <PhotoPreview 
                      source={{ uri: displayUri }} 
                      resizeMode="cover" 
                    />
                    
                    <RemovePhotoButton onPress={() => {
                      setPhotoUri(null);
                      setOriginalPhoto(null);
                    }}>
                      <RemovePhotoIcon color="#004A8D" />
                    </RemovePhotoButton>
                  </>
                )
                :
                ( 
                  <>
                    <PhotoIcon />
                    <PhotoText>Adicionar imagem da sala</PhotoText>
                  </>
                )
              }

            </AddPhotoRoomContainer>
          </PhotoRoomContainer>
    
              <Controller 
                control={control}
                name="descricao"
                render={({ field: { onChange, value } }) => (
                  <FormInput
                    inputName="Descrição"
                    placeholder="Ex: Sala com projetor e notebook"
                    value={value ?? ""}
                    onChangeText={onChange}
                    errorMessage={errors.descricao?.message}
                    onFocus={() => setResponsableButtonPressed(false)}
                  />
                )}
              />
    
              <Controller 
                control={control}
                name="instrucoes"
                render={({ field: { onChange, value } }) => (
                  <FormInput
                    inputName="Instruções"
                    placeholder="Ex: Desligue os equipamentos"
                    value={value ?? ""}
                    onChangeText={onChange}
                    errorMessage={errors.instrucoes?.message}
                    onFocus={() => setResponsableButtonPressed(false)}
                  />
                )}
              />
  
            </ScrollView>
          <ModalButtons>
            <ModalButton variant="cancel" onPress={handleClose}>
              <ModalButtonText variant="cancel">Cancelar</ModalButtonText>
            </ModalButton>
            <ModalButton
              variant="success"
              onPress={handleSubmit(handleUpdateRoom)}
              disabled={isUpdating}
            >
              {isUpdating ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <ModalButtonText variant="success">Salvar</ModalButtonText>
              )}
            </ModalButton>
          </ModalButtons>
        </ModalContainer>
      </ModalOverlay>

            <CameraModal 
              visible={isCameraVisible} 
              animationType="slide" 
              onRequestClose={() => setCameraVisible(false)}
            >
              <CameraModalContainer>
                {permission?.granted ? (
                  <CameraView 
                    ref={cameraRef} 
                    style={{ flex: 1 }} 
                    facing="back" 
                  />
                ) : (
                  <CameraPermissionDenied>
                    <CameraButtonText>Aguardando permissão...</CameraButtonText>
                  </CameraPermissionDenied>
                )}
                
                <CameraControls>
                   <CameraButton onPress={() => setCameraVisible(false)}>
                    <CameraButtonText>Voltar</CameraButtonText>
                  </CameraButton>
                  
                  <TouchableOpacity 
                    onPress={handleTakePhoto} 
                    disabled={!permission?.granted}
                  >
                    <CaptureButton />
                  </TouchableOpacity>
                </CameraControls>
              </CameraModalContainer>
            </CameraModal>
    </Modal>
  );
}
