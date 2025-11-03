import React, { useState, useEffect } from "react";
import { Modal, ActivityIndicator, ModalProps } from "react-native";
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
} from "./styles";
import { Room, updateRoom } from "@services/rooms.service";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ScrollView } from "react-native";
import { FormInput } from "@components/FormInput";
import { Dropdown } from "@components/Dropdowm";

type Props = ModalProps & {
  room: Room;
  onClose: () => void;
  onRoomUpdated: () => void;
};

const editRoomFormSchema = z.object({
  nome_numero: z.string().trim().nonempty("Campo obrigatório"),
  localizacao: z.string().trim().nonempty("Campo obrigatório"),
  capacidade: z.string().trim().nonempty("Campo obrigatório"),
  validade_horas: z.string().trim().optional(),
  responsaveis: z.array(z.string()).optional(),
  descricao: z.string().trim().optional().nullable(),
  instrucoes: z.string().trim().optional().nullable()
});

export type EditRoomFormData = z.infer<typeof editRoomFormSchema>;

export function EditRoomModal({ room, onClose, onRoomUpdated, ...rest }: Props) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [responsableButtonPressed, setResponsableButtonPressed] = useState(false);
  const [photo, setPhoto] = useState(false);

  const { control, handleSubmit, formState: { errors }, reset } = useForm<EditRoomFormData>({
    resolver: zodResolver(editRoomFormSchema)
  });

  function closeModal() {
    onClose()
    reset()
  }

  useEffect(() => {
    if (room) {
      reset({
        nome_numero: room.nome_numero,
        localizacao: room.localizacao,
        
        capacidade: room.capacidade?.toString() ?? '', 
        validade_horas: room.validade_limpeza_horas?.toString() ?? '',
        
        descricao: room.descricao,
        instrucoes: room.instrucoes
      });
    }
  }, [room, reset])

  useEffect(() => {
    
  }, [room]);

  const handleUpdateRoom = async (data: EditRoomFormData) => {
    setIsUpdating(true);
    try {
      console.log(data);

      // Toast.show({
      //   type: "success",
      //   text1: "Sucesso",
      //   text1Style: {
      //     fontSize: 16,
      //   },
      //   text2: "Sala editada com sucesso!",
      //   text2Style: {
      //     fontSize: 12,
      //   },
      // });

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
                  name="validade_horas"
                  render={({ field: { onChange, value } }) => (
                    <FormInput
                      inputName="Validade da limpeza"
                      placeholder="Ex: 4"
                      value={value}
                      onChangeText={onChange}
                      keyboardType="numeric"
                      flex={1}
                      errorMessage={errors.validade_horas?.message}
                      style={errors.capacidade?.message ? { marginBottom: 19 } : { }}
                      onFocus={() => setResponsableButtonPressed(false)}
                    />
                  )}
                />
              </ExternalInputContainer>
    
              {/* <Controller
                control={control}
                name="responsaveis"
                render={({ field: { onChange, value } }) => (
                  <Dropdown
                    dropdownText="Responsáveis"
                    pressed={responsableButtonPressed}
                    onPress={pressResponsableButton}
                    content={responsables}
                    value={value || []}
                    onChange={onChange}
                    errorMessage={errors.responsaveis?.message}
                    onFocus={() => setResponsableButtonPressed(false)}
                  />
                )}
              /> */}
    
              <PhotoRoomContainer>
                <InputName>Foto da sala</InputName>
                <AddPhotoRoomContainer>
                  { photo ?
                      <></>
                    :
                      <>
                      <PhotoIcon />
                      <PhotoText>Adicionar imagem da sala</PhotoText>
                      </>
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
            <ModalButton variant="cancel" onPress={closeModal}>
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
    </Modal>
  );
}
