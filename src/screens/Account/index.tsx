import React, { useContext } from 'react';
import { UserIcon, SignOutIcon } from 'phosphor-react-native'; 
import { useTheme } from 'styled-components/native'; 

import { Container, Content, AvatarPlaceholder, UserName, UserEmail, ButtonGroup, LogoutButton, LogoutButtonText, ButtonText, Button } from './styles';
import { Alert } from 'react-native';

const mockUser = {
  name: 'Maria José',
  email: 'email.ficticio@exemplo.com',
};

export function Account() {
  const theme = useTheme(); 
  
  const handleEditProfile = () => {
    Alert.alert("Editar Perfil", "Navegação para a tela de edição ainda não implementada.");
  };

  const handleChangePassword = () => {
    Alert.alert("Alterar Senha", "Navegação para a tela de alteração de senha ainda não implementada.");
  };

  const handleSignOut = () => {
    Alert.alert("Sair", "A função de logout será implementada com o Contexto de Autenticação.");
  };

  return (
    <Container>
      <Content>
        <AvatarPlaceholder>
          <UserIcon size={60} color={theme.COLORS.PLACEHOLDER} />
        </AvatarPlaceholder>

        <UserName>{mockUser.name}</UserName>
        <UserEmail>{mockUser.email}</UserEmail>
        
        <ButtonGroup>
          <Button style={{ flex: 1, marginRight: 8 }} onPress={handleEditProfile}>
            <ButtonText>Editar</ButtonText>
          </Button>
          <Button style={{ flex: 1, marginLeft: 8 }} onPress={handleChangePassword}>
            <ButtonText>Alterar senha</ButtonText>
          </Button>
        </ButtonGroup>

        <LogoutButton onPress={handleSignOut}>
          <SignOutIcon size={24} color="#AA2834" />
          <LogoutButtonText>Sair</LogoutButtonText>
        </LogoutButton>
      </Content>
    </Container>
  );
}