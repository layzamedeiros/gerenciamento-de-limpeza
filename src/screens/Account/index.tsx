import React from 'react';
import { useTheme } from 'styled-components/native';
import { Alert } from 'react-native';

import { UserIcon, SignOutIcon } from 'phosphor-react-native'; 

import { Container, Content, AvatarPlaceholder, UserName, UserEmail, ButtonGroup, LogoutButton, LogoutButtonText, ButtonText, Button } from './styles';

import { useAuth } from '@contexts/AuthContext';

export function Account() {
  const theme = useTheme(); 
  
  const { user, logout } = useAuth();

  const handleEditProfile = () => {
    Alert.alert("Editar Perfil", "Navegação para a tela de edição ainda não implementada.");
  };

  const handleChangePassword = () => {
    Alert.alert("Alterar Senha", "Navegação para a tela de alteração de senha ainda não implementada.");
  };

  const handleSignOut = () => {
    Alert.alert(
      "Sair", 
      "Você tem certeza que deseja sair?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Sair",
          onPress: logout, 
          style: "destructive"
        }
      ]
    );
  };

  return (
    <Container>
      <Content>
        <AvatarPlaceholder>
          <UserIcon size={60} color={theme.COLORS.PLACEHOLDER} />
        </AvatarPlaceholder>

        <UserName>{user?.username || 'Usuário'}</UserName>
        <UserEmail>{user?.email || 'Sem e-mail'}</UserEmail>
        
        <ButtonGroup>
          <Button style={{ flex: 1, marginRight: 8 }} onPress={handleEditProfile}>
            <ButtonText>Editar</ButtonText>
          </Button>
          <Button style={{ flex: 1, marginLeft: 8 }} onPress={handleChangePassword}>
            <ButtonText>Alterar senha</ButtonText>
          </Button>
        </ButtonGroup>

        <LogoutButton onPress={handleSignOut}>
          <SignOutIcon size={24} color={theme.COLORS.DANGER} />
          <LogoutButtonText>Sair</LogoutButtonText>
        </LogoutButton>
      </Content>
    </Container>
  );
}