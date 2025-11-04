import React, { useCallback, useState } from "react";
import { Modal, ActivityIndicator, ModalProps, ScrollView } from "react-native";
import {
  ModalOverlay,
  ModalContainer,
  ModalTitle,
  ModalButtons,
  ModalButton,
  ModalButtonText,
  ExternalInputContainer,
  PhotoRoomContainer,
  PhotoIcon,
  PhotoText,
  InputName,
  AddPhotoRoomContainer
} from "./styles";

import { createRoom } from "@services/rooms.service";
import { fetchUsers, User } from "@services/employee.service";

import Toast from "react-native-toast-message";

import { Dropdown } from "@components/Dropdowm";
import { FormInput } from "@components/FormInput";

import { useForm, Controller } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFocusEffect } from "@react-navigation/native";

type Props = ModalProps & {
  onClose: () => void;
  onRoomCreated: () => Promise<void>;
};

const createRoomFormSchema = z.object({
  nome_numero: z.string().trim().nonempty("Campo obrigatório"),
  localizacao: z.string().trim().nonempty("Campo obrigatório"),
  capacidade: z.string().trim().nonempty("Campo obrigatório"),
  validade_limpeza_horas: z.string().trim().optional(),
  responsaveis: z.array(z.string()).optional(),
  descricao: z.string().trim().optional(),
  instrucoes: z.string().trim().optional()
});

export type CreateRoomFormData = z.infer<typeof createRoomFormSchema>;

export function CreateRoomModal({ onClose, onRoomCreated, ...rest }: Props) {
  const [isCreating, setIsCreating] = useState(false);
  const [responsableButtonPressed, setResponsableButtonPressed] = useState(false);
  const [responsables, setResponsables] = useState<User[]>({} as User[]);
  const [photo, setPhoto] = useState(false);

  const { control, handleSubmit, formState: { errors }, reset } = useForm<CreateRoomFormData>({
    resolver: zodResolver(createRoomFormSchema),
    defaultValues: {
      nome_numero: "",
      localizacao: "",
      capacidade: "",
      validade_limpeza_horas: "",
      responsaveis: [],
      descricao: "",
      instrucoes: ""
    }
  })

  function pressResponsableButton() {
    setResponsableButtonPressed(oldValue => {
      const newValue = !oldValue;
      console.log(newValue);
      return newValue;
    });
  }

  const handleClose = () => {
    reset();
    onClose();
    setResponsableButtonPressed(false);
  };

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

  async function handleCreateRoom(data: CreateRoomFormData) {
    setIsCreating(true);

    try {
      createRoom(data);

      Toast.show({
        type: "success",
        text1: "Sucesso",
        text1Style: {
          fontSize: 16,
        },
        text2: "Sala cadastrada com sucesso!",
        text2Style: {
          fontSize: 12,
        },
      });
      
      onRoomCreated();
      handleClose();
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.nome_numero?.[0] || "Não foi possível cadastrar a sala.";
      Toast.show({
        type: "error",
        text1: "Erro no Cadastro",
        text2: errorMessage,
      });
    } finally {
      setIsCreating(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getEmplooyes();
    }, [])
  )

  return (
    <Modal transparent={true} onRequestClose={handleClose} animationType="fade" {...rest}>
      <ModalOverlay onPress={() => setResponsableButtonPressed(false)}>
        <ModalContainer>
          <ModalTitle>Criar nova sala</ModalTitle>

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
                value={value || []}
                onChange={onChange}
                errorMessage={errors.responsaveis?.message}
                onFocus={() => setResponsableButtonPressed(false)}
              />
            )}
          />

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
                value={value}
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
                value={value}
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
              onPress={handleSubmit(handleCreateRoom)}
              disabled={isCreating}
            >
              {isCreating ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <ModalButtonText variant="success">Cadastrar</ModalButtonText>
              )}
            </ModalButton>
          </ModalButtons>
        </ModalContainer>
      </ModalOverlay>
    </Modal>
  );
}
