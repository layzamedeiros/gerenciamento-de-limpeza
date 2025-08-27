import React, { useState } from 'react';
import { Modal, ActivityIndicator, ModalProps } from 'react-native';
import Toast from 'react-native-toast-message';
import { changePassword } from '@services/user.service';

import { 
  ModalOverlay, ModalContainer, ModalTitle, TitleInput, Input, ModalButtons, ModalButton, ModalButtonText 
} from './styles';
import { useTheme } from 'styled-components/native';

type Props = ModalProps & {
  onClose: () => void;
}

export function ChangePasswordModal({ onClose, ...rest }: Props) {
  const theme = useTheme();
  const [isUpdating, setIsUpdating] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // --- PASSO 1: Crie uma função para limpar os campos ---
  const resetForm = () => {
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  // --- PASSO 2: Crie uma função que limpa E fecha o modal ---
  const handleClose = () => {
    resetForm(); // Limpa os dados do formulário
    onClose();   // Chama a função original para fechar o modal
  };

  const handleUpdatePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      return Toast.show({ type: 'error', text1: 'Atenção', text2: 'Todos os campos são obrigatórios.' });
    }
    if (newPassword !== confirmPassword) {
      return Toast.show({ type: 'error', text1: 'Atenção', text2: 'As novas senhas não coincidem.' });
    }

    setIsUpdating(true);
    try {
      await changePassword({
        old_password: oldPassword,
        new_password: newPassword,
        confirm_new_password: confirmPassword,
      });
      Toast.show({ type: 'success', text1: 'Sucesso!', text2: 'Sua senha foi alterada.' });
      
      // --- PASSO 3: Use a nova função handleClose aqui ---
      handleClose(); 
      
    } catch (error: any) {
      const errorMessage = error.response?.data?.old_password?.[0] || 'Não foi possível alterar a senha.';
      Toast.show({ type: 'error', text1: 'Erro', text2: errorMessage });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    // --- PASSO 3: Use a nova função handleClose aqui também ---
    <Modal transparent={true} onRequestClose={handleClose} animationType="fade" {...rest}>
      <ModalOverlay>
        <ModalContainer>
          <ModalTitle>Alterar Senha</ModalTitle>
          
          <TitleInput>Senha Atual</TitleInput>
          <Input 
            value={oldPassword} 
            onChangeText={setOldPassword} 
            secureTextEntry 
            placeholder="Digite sua senha atual" 
          />
          
          <TitleInput>Nova Senha</TitleInput>
          <Input 
            value={newPassword} 
            onChangeText={setNewPassword} 
            secureTextEntry 
            placeholder="Crie uma nova senha forte" 
          />
          
          <TitleInput>Confirmar Nova Senha</TitleInput>
          <Input 
            value={confirmPassword} 
            onChangeText={setConfirmPassword} 
            secureTextEntry 
            placeholder="Confirme sua nova senha" 
          />
          
          <ModalButtons>
            {/* --- PASSO 3: E aqui no botão de cancelar --- */}
            <ModalButton variant="cancel" onPress={handleClose}>
              <ModalButtonText>Cancelar</ModalButtonText>
            </ModalButton>
            <ModalButton variant="success" onPress={handleUpdatePassword} disabled={isUpdating}>
              {isUpdating ? <ActivityIndicator color={theme.COLORS.WHITE} /> : <ModalButtonText>Salvar</ModalButtonText>}
            </ModalButton>
          </ModalButtons>
        </ModalContainer>
      </ModalOverlay>
    </Modal>
  );
}