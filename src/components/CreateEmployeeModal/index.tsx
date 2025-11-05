import React, { useState, useEffect, useCallback } from "react";
import { Modal, ActivityIndicator, ModalProps, ScrollView, Alert, TouchableOpacity } from "react-native";
import { useTheme } from "styled-components/native";
import { CaretUp, CaretDown, Check, ToggleLeft, ToggleRight } from "phosphor-react-native";
import Toast from "react-native-toast-message";

import { createUser, fetchGroups, Group } from "@services/employee.service";

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
  GroupDropdownButton,
  DropdownText,
  GroupSelectionContainer,
  GroupOption,
  GroupOptionText,
} from "./styles";

type Props = ModalProps & {
  onClose: () => void;
  onEmployeeCreated: () => void;
};

const GROUP_MAPPING = {
  ZELADORIA_ID: 1,
  COLABORADOR_ID: 2,
};

export function CreateEmployeeModal({ onClose, onEmployeeCreated, ...rest }: Props) {
  const theme = useTheme();

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [availableGroups, setAvailableGroups] = useState<Group[]>([]);
  const [selectedGroupIds, setSelectedGroupIds] = useState<number[]>([]);
  const [isGroupsOpen, setIsGroupsOpen] = useState(false);
  const [isSuperuser, setIsSuperuser] = useState(false);

  const [isCreating, setIsCreating] = useState(false);
  const [isGroupsLoading, setIsGroupsLoading] = useState(false);

  const loadGroups = useCallback(async () => {
    setIsGroupsLoading(true);
    try {
      const groups = await fetchGroups();
      const relevantGroups = groups.filter(g =>
        g.id === GROUP_MAPPING.ZELADORIA_ID || g.id === GROUP_MAPPING.COLABORADOR_ID
      );
      setAvailableGroups(relevantGroups);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os grupos.");
    } finally {
      setIsGroupsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (rest.visible) {
      loadGroups();
    }
  }, [rest.visible, loadGroups]);


  const resetForm = () => {
    setUsername("");
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setSelectedGroupIds([]);
    setIsSuperuser(false);
    setIsGroupsOpen(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const toggleGroupSelection = (groupId: number) => {
    setSelectedGroupIds(prev => prev.includes(groupId) ? [] : [groupId]);
    setIsGroupsOpen(false);
  };

  const getSelectedGroupName = () => {
    if (selectedGroupIds.length === 0) return "Selecionar Grupos";

    const selectedGroup = availableGroups.find(g => g.id === selectedGroupIds[0]);
    return selectedGroup ? selectedGroup.name : "Grupo Desconhecido";
  }

  const handleCreateEmployee = async () => {
    if (!username.trim() || !password.trim() || !confirmPassword.trim()) {
      return Toast.show({
        type: "error",
        text1: "Atenção",
        text2: "Usuário, Senha e Confirmação de Senha são obrigatórios.",
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
      const userData: any = {
        username: username.trim(),
        password: password,
        confirm_password: confirmPassword,
        is_superuser: isSuperuser,
      };

      if (name.trim()) {
        userData.name = name.trim();
      }

      if (email.trim()) {
        userData.email = email.trim();
      }

      if (selectedGroupIds.length > 0) {
        userData.groups = selectedGroupIds;
      }

      await createUser(userData);

      Toast.show({
        type: "success",
        text1: "Sucesso",
        text2: "Usuário cadastrado com sucesso!",
      });

      await onEmployeeCreated();
      handleClose();
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.username?.[0] ||
        error.response?.data?.detail ||
        "Não foi possível cadastrar o usuário. Verifique se o nome de usuário já existe, ou se a senha é forte o suficiente.";

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
          <ScrollView showsVerticalScrollIndicator={false}>
            <ModalTitle>Cadastrar Usuário</ModalTitle>

            <TitleInput>Usuário</TitleInput>
            <Input
              placeholder="Ex: maria.jose"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />

            <TitleInput>Nome Completo (Opcional)</TitleInput>
            <Input
              placeholder="Ex: Maria José da Silva"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />

            <TitleInput>E-mail (Opcional)</TitleInput>
            <Input
              placeholder="Ex: maria.jose@email.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TitleInput>Senha</TitleInput>
            <Input
              placeholder="Digite uma senha forte..."
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <TitleInput>Confirmar Senha</TitleInput>
            <Input
              placeholder="Confirme a senha..."
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />

            <TitleInput>Grupos (Opcional)</TitleInput>
            <GroupDropdownButton onPress={() => setIsGroupsOpen(prev => !prev)} disabled={isGroupsLoading || isCreating}>
              <DropdownText style={{ color: selectedGroupIds.length > 0 ? theme.COLORS.TITLE : theme.COLORS.PLACEHOLDER }}>
                {isGroupsLoading ? "Carregando..." : getSelectedGroupName()}
              </DropdownText>
              {isGroupsOpen ? <CaretUp size={20} color={theme.COLORS.TITLE} /> : <CaretDown size={20} color={theme.COLORS.TITLE} />}
            </GroupDropdownButton>

            {isGroupsOpen && (
              <GroupSelectionContainer>
                {availableGroups.map(group => {
                  const isSelected = selectedGroupIds.includes(group.id);
                  return (
                    <GroupOption
                      key={group.id}
                      onPress={() => toggleGroupSelection(group.id)}
                      isSelected={isSelected}
                    >
                      <GroupOptionText isSelected={isSelected}>
                        {group.name}
                      </GroupOptionText>
                      {isSelected && <Check size={18} color={theme.COLORS.PRIMARY} />}
                    </GroupOption>
                  );
                })}
              </GroupSelectionContainer>
            )}

            <AdminContainer>
              <TouchableOpacity
                onPress={() => setIsSuperuser(prev => !prev)}
                style={{ padding: 5 }}
                disabled={isCreating}
              >
                {isSuperuser ? (
                  <ToggleRight size={30} color={theme.COLORS.TITLE} weight="regular" />
                ) : (
                  <ToggleLeft size={30} color={theme.COLORS.TITLE} weight="regular" />
                )}
              </TouchableOpacity>
              <AdminTitle>Administrador Geral</AdminTitle>
            </AdminContainer>

            <ModalButtons>
              <ModalButton variant="cancel" onPress={handleClose} disabled={isCreating}>
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
          </ScrollView>
        </ModalContainer>
      </ModalOverlay>
    </Modal>
  );
}