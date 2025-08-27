import React, { useState } from "react";
import { Modal, ActivityIndicator, Switch, ModalProps } from "react-native";
import { useTheme } from "styled-components/native";

import { Funcionario, createFuncionario } from "@services/employee.service";

import {
  ModalOverlay,
  ModalContainer,
  ModalTitle,
  TitleInput,
  Input,
  ModalButtons,
  ModalButton,
  ModalButtonText,
  AdminContainer,
  AdminTitle,
} from "./styles";
import Toast from "react-native-toast-message";

type Props = ModalProps & {
  onClose: () => void;
  onEmployeeCreated: () => void;
};

export function CreateEmployeeModal({ onClose, onEmployeeCreated, ...rest }: Props) {
  const theme = useTheme();

  const [isCreating, setIsCreating] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isStaff, setIsStaff] = useState(false);

  const resetForm = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setIsStaff(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleCreateEmployee = async () => {
    if (!username.trim() || !password.trim() || !confirmPassword.trim()) {
      return Toast.show({
        type: "error",
        text1: "Atenção",
        text2: "Nome de usuário e senha são obrigatórios.",
      });
    }

    if (password !== confirmPassword) {
      return Toast.show({
        type: "error",
        text1: "Atenção",
        text2: "As senhas não coincidem.",
      });
    }

    setIsCreating(true);
    try {
      await createFuncionario({
        username,
        email,
        password,
        confirm_password: confirmPassword,
        is_staff: isStaff,
      });

      Toast.show({
        type: "success",
        text1: "Sucesso",
        text1Style: {
          fontSize: 16,
        },
        text2: "Funcionário cadastrado com sucesso!",
        text2Style: {
          fontSize: 14,
        },
      });

      await onEmployeeCreated();
      handleClose();
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.username?.[0] ||
        "Não foi possível cadastrar o funcionário.";

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
          <ModalTitle>Cadastrar funcionário</ModalTitle>

          <TitleInput>Usuário</TitleInput>
          <Input
            placeholder="Ex: joao.silva"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />

          <TitleInput>Senha</TitleInput>
          <Input
            placeholder="Digite uma senha forte"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TitleInput>Confirmar senha</TitleInput>
          <Input
            placeholder="Confirme a senha"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />

          <TitleInput>E-mail</TitleInput>
          <Input
            placeholder="Ex: joao.silva@email.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <AdminContainer>
            <Switch
              trackColor={{
                false: theme.COLORS.BORDER,
                true: theme.COLORS.PRIMARY_LIGHT,
              }}
              thumbColor={isStaff ? theme.COLORS.PRIMARY : theme.COLORS.PLACEHOLDER}
              onValueChange={setIsStaff}
              value={isStaff}
            />
            <AdminTitle>Administrador</AdminTitle>
          </AdminContainer>

          <ModalButtons>
            <ModalButton variant="cancel" onPress={handleClose}>
              <ModalButtonText variant="cancel">Cancelar</ModalButtonText>
            </ModalButton>
            <ModalButton
              variant="success"
              onPress={handleCreateEmployee}
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
