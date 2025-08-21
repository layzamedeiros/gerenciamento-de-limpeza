import React, { useState } from 'react';
import { Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import { UserIcon, LockIcon, EyeIcon, EyeSlashIcon } from "phosphor-react-native";

import { Container, Input, InputContainer, LoginButton, LoginButtonText, Logo, Subtitle, Title } from './styles';

import { useAuth } from '@contexts/AuthContext';

export function Login() { 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const { login, isLoading } = useAuth();

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert('Atenção', 'Por favor, preencha o usuário e a senha.');
      return;
    }

    try {
      await login(username, password);
    } catch (error) {
      Alert.alert('Erro no Login', 'Credenciais inválidas. Tente novamente.');
    }
  };

  return (
    <Container>
      {/* <Logo source={require('../../assets/logo_senac.png')} /> */}
      <Title>Login</Title>
      <Subtitle>Seja Bem-Vindo!</Subtitle>
      
      <InputContainer>
        <UserIcon size={20} color="#004A8D" weight='bold' />
        <Input
          placeholder="usuário"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          placeholderTextColor="#888"
        />
      </InputContainer>
      
      <InputContainer>
        <LockIcon size={20} color="#004A8D"  weight='bold'/>
        <Input
          placeholder="senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          placeholderTextColor="#888"
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          {showPassword ? <EyeSlashIcon size={22} color="#004A8D" /> : <EyeIcon size={22} color="#004A8D" />}
        </TouchableOpacity>
      </InputContainer>

      <LoginButton onPress={handleLogin} disabled={isLoading}>
        {isLoading ? (
            <ActivityIndicator size="large" color="#003366"  />
        ) : (
            <LoginButtonText>Entrar</LoginButtonText>
        )}
      </LoginButton>
    </Container>
  );
}