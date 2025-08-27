import React, { useState } from 'react';
import { ActivityIndicator, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard } from 'react-native';
import { UserIcon, LockIcon, EyeIcon, EyeSlashIcon } from "phosphor-react-native";

import { Container, Input, InputContainer, LoginButton, LoginButtonText, Logo, Subtitle, Title } from './styles';

import { useAuth } from '@contexts/AuthContext';
import { useTheme } from 'styled-components/native';
import Toast from 'react-native-toast-message';

export function Login() { 
  const theme = useTheme();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const { login, isLoading } = useAuth();

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      Toast.show({
        type: 'error', 
        text1: 'Atenção',
        text1Style: {
          fontSize: 16,
        },
        text2: 'Por favor, preencha o usuário e a senha.',
        text2Style: {
          fontSize: 14
        }
      });
      return;
    }
    try {
      await login(username, password);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro no Login',
        text1Style: {
          fontSize: 16,
        },
        text2: 'Credenciais inválidas. Tente novamente.',
         text2Style: {
          fontSize: 14
        }
      });
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Logo source={require('../../assets/logo.png')} />
          <Title>Login</Title>
          <Subtitle>Bem vindo ao Gerenciamento de Limpeza!</Subtitle>
          
          <InputContainer>
            <UserIcon size={20} color={theme.COLORS.PRIMARY} weight='bold' />
            <Input
              placeholder="Usuário"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              placeholderTextColor={theme.COLORS.PLACEHOLDER}
            />
          </InputContainer>
          
          <InputContainer>
            <LockIcon size={20} color={theme.COLORS.PRIMARY}  weight='bold'/>
            <Input
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              placeholderTextColor={theme.COLORS.PLACEHOLDER}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeSlashIcon size={22} color={theme.COLORS.PRIMARY} /> : <EyeIcon size={22} color={theme.COLORS.PRIMARY} />}
            </TouchableOpacity>
          </InputContainer>

          <LoginButton onPress={handleLogin} disabled={isLoading}>
            {isLoading ? (
                <ActivityIndicator size="large" color={theme.COLORS.PRIMARY}  />
            ) : (
                <LoginButtonText>Entrar</LoginButtonText>
            )}
          </LoginButton>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}