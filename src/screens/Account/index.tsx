import React, { useState } from 'react';
import { useTheme } from 'styled-components/native';

import { UserIcon, SignOutIcon, LockIcon, PersonIcon, CaretCircleRightIcon, CaretRightIcon, LockKeyIcon, UserCircleIcon } from 'phosphor-react-native'; 
import { Container, Content, AvatarPlaceholder, UserName, UserEmail, LogoutButton, LogoutButtonText, ButtonText, AccountButtonText, AccountButton, PasswordButton, UserRole } from './styles';

import { useAuth } from '@contexts/AuthContext';
import { ChangePasswordModal } from '@components/ChangePasswordModal';
import { ConfirmationModal } from '@components/ConfirmationModal'; 
import { Header } from '@components/Header';

/**
 * @param {Array<number> | undefined} groupIdsArray
 * @returns {String} 
 */
export const getRoleName = (groupIdsArray: number[] | undefined): string => {
  if (!Array.isArray(groupIdsArray) || groupIdsArray.length === 0) {
    return ""; 
  }

  const groupIds = new Set(groupIdsArray);

  if (groupIds.has(1) && groupIds.has(2)) {
    return "Administrador Pleno";
  }

  if (groupIds.has(1) && groupIds.size === 1) {
    return "Zeladoria";
  }

  if (groupIds.has(2) && groupIds.size === 1) {
    return "Solicitante de Serviços";
  }

  return "Permissão desconhecida"; 
};

export function Account() {
  const theme = useTheme(); 
  const { user, logout } = useAuth();
  const [isPasswordModalVisible, setPasswordModalVisible] = useState(false);
  
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);

  const handleSignOut = () => {
    setLogoutModalVisible(true);
  };

  return (
    <Container>
      <Header title="Minha Conta" showNotificationIcon={false} />
      <Content>
        <AvatarPlaceholder>
          <UserIcon size={80} color={theme.COLORS.WHITE}/>
        </AvatarPlaceholder>

        <UserName>{user?.username || ""}</UserName>
        <UserEmail>{user?.email || "Email@gmail.com"}</UserEmail>
        <UserRole>{getRoleName(user?.groups || [])}</UserRole>

        <AccountButton>
          <UserIcon size={24} color={theme.COLORS.WHITE}></UserIcon>
          <AccountButtonText>Editar perfil</AccountButtonText>
          <CaretRightIcon size={16} color={theme.COLORS.WHITE}></CaretRightIcon>
        </AccountButton>
        
        <PasswordButton onPress={() => setPasswordModalVisible(true)}>
          <LockKeyIcon size={24} color={theme.COLORS.PRIMARY}></LockKeyIcon>
          <ButtonText>Alterar senha</ButtonText>
          <CaretRightIcon size={16} color={theme.COLORS.PRIMARY}></CaretRightIcon>
        </PasswordButton>

        <LogoutButton onPress={handleSignOut}>
          <SignOutIcon size={24} color={theme.COLORS.DANGER} />
          <LogoutButtonText>Sair</LogoutButtonText>
          <CaretRightIcon size={16} color={theme.COLORS.DANGER}></CaretRightIcon>

        </LogoutButton>
      </Content>

      <ChangePasswordModal 
        visible={isPasswordModalVisible}
        onClose={() => setPasswordModalVisible(false)}
      />

      <ConfirmationModal
        visible={isLogoutModalVisible}
        onClose={() => setLogoutModalVisible(false)}
        onConfirm={logout} 
        title="Sair da Conta"
      >
        Você tem certeza que deseja sair?
      </ConfirmationModal>
    </Container>
  );
}