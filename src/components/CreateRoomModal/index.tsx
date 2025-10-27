import React, { useState } from "react";
import { Modal, ActivityIndicator, ModalProps } from "react-native";
import {
  ModalOverlay,
  ModalContainer,
  ModalTitle,
  TitleInput,
  Input,
  ModalButtons,
  ModalButton,
  ModalButtonText,
  InputContainer,
  ExternalInputContainer,
  InputFlexContainer,
} from "./styles";
import { createRoom } from "@services/rooms.service";
import Toast from "react-native-toast-message";
import { Dropdown } from "@components/Dropdowm";

type Props = ModalProps & {
  onClose: () => void;
  onRoomCreated: () => Promise<void>;
};
export function CreateRoomModal({ onClose, onRoomCreated, ...rest }: Props) {
  const [isCreating, setIsCreating] = useState(false);
  const [nome, setNome] = useState("");
  const [capacidade, setCapacidade] = useState("");
  const [descricao, setDescricao] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [responsableButtonPressed, setResponsableButtonPressed] = useState(false);
  const responsables = ["Enzo Makenzy", "Layza Kathleen", "Maria Paula", "Enza Makenzy", "Layze Kathleen", "Marie Paula", "Enze Makenzy", "Layzi Kathleen", "Marii Paula", "Enzi Makenzy", "Layzo Kathleen", "Mario Paula"];

  function pressResponsableButton() {
    setResponsableButtonPressed(oldValue => {
      const newValue = !oldValue;
      console.log(newValue);
      return newValue;
    });
  }

  const resetForm = () => {
    setNome("");
    setCapacidade("");
    setDescricao("");
    setLocalizacao("");84994226315
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleCreateRoom = async () => {
    if (!nome.trim() || !capacidade.trim() || !localizacao.trim()) {
      return Toast.show({
        type: "error",
        text1: "Atenção",
        text1Style: {
          fontSize: 16,
        },
        text2: "Nome, capacidade e localização são obrigatórios.",
        text2Style: {
          fontSize: 14,
        },
      });
    }
    setIsCreating(true);
    try {
      await createRoom({
        nome_numero: nome,
        capacidade: Number(capacidade),
        descricao,
        localizacao,
      });
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

  return (
    <Modal transparent={true} onRequestClose={handleClose} animationType="fade" {...rest}>
      <ModalOverlay>
        <ModalContainer>
          <ModalTitle>Criar nova sala</ModalTitle>

          <InputContainer>
            <TitleInput>Nome*</TitleInput>
            <Input
              placeholder="Ex: Auditório, Sala 101"
              value={nome}
              onChangeText={setNome}
            />
          </InputContainer>

          <InputContainer>
            <TitleInput>Localização*</TitleInput>
            <Input
              placeholder="Ex: Bloco B"
              value={localizacao}
              onChangeText={setLocalizacao}
            />
          </InputContainer>

          <ExternalInputContainer>
            <InputFlexContainer>
              <TitleInput>Capacidade*</TitleInput>
              <Input
                placeholder="Ex: 30"
                value={capacidade}
                onChangeText={setCapacidade}
                keyboardType="numeric"
              />
            </InputFlexContainer>

            <InputFlexContainer>
              <TitleInput>Validade da limpeza</TitleInput>
                <Input
                  placeholder="Ex: 4"
                  value={capacidade}
                  onChangeText={setCapacidade}
                  keyboardType="numeric"
                  />
            </InputFlexContainer>
          </ExternalInputContainer>

          <InputContainer>
            <TitleInput>Responsáveis</TitleInput>
            <Dropdown 
              pressed={responsableButtonPressed}
              onPress={pressResponsableButton}
              content={responsables}
            />
          </InputContainer>

          <InputContainer>
            <TitleInput>Descrição</TitleInput>
            <Input
              placeholder="Ex: Sala com projetor e notebook"
              value={descricao}
              onChangeText={setDescricao}
            />
          </InputContainer>

          <InputContainer>
            <TitleInput>Instruções</TitleInput>
            <Input
              placeholder="Ex: Desligue os equipamentos"
              value={descricao}
              onChangeText={setDescricao}
            />
          </InputContainer>

          <ModalButtons>
            <ModalButton variant="cancel" onPress={handleClose}>
              <ModalButtonText variant="cancel">Cancelar</ModalButtonText>
            </ModalButton>
            <ModalButton
              variant="success"
              onPress={handleCreateRoom}
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
