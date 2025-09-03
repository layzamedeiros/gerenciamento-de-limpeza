import React, { useState } from 'react';
import { useTheme } from 'styled-components/native';

import { UserIcon, SignOutIcon } from 'phosphor-react-native'; 
import { Container, Content, AvatarPlaceholder, UserName, UserEmail, LogoutButton, LogoutButtonText, ButtonText, Button, Divider } from './styles';

import { useAuth } from '@contexts/AuthContext';
import { ChangePasswordModal } from '@components/ChangePasswordModal';
import { ConfirmationModal } from '@components/ConfirmationModal'; 
import { Header } from '@components/Header';

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
          <UserIcon size={60} color={theme.COLORS.PLACEHOLDER} />
        </AvatarPlaceholder>

        <UserName>{user?.username || ""}</UserName>
        <UserEmail>{user?.email || ""}</UserEmail>

        <Divider/>
        
        <Button onPress={() => setPasswordModalVisible(true)}>
          <ButtonText>Alterar senha</ButtonText>
        </Button>

        <LogoutButton onPress={handleSignOut}>
          <SignOutIcon size={24} color={theme.COLORS.DANGER} />
          <LogoutButtonText>Sair</LogoutButtonText>
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