import React, { useState } from 'react';
import { Modal, Alert, ActivityIndicator, ModalProps } from 'react-native';
import { ModalOverlay, ModalContainer, ModalTitle, TitleInput, Input, ModalButtons, ModalButton, ModalButtonText } from './styles'; 
import { createSala } from '@services/roomsService';

type Props = ModalProps & {
  onClose: () => void;
  onRoomCreated: () => Promise<void>; 
}
export function CreateRoomModal({ onClose, onRoomCreated, ...rest }: Props) {
  const [isCreating, setIsCreating] = useState(false);
  const [nome, setNome] = useState('');
  const [capacidade, setCapacidade] = useState('');
  const [descricao, setDescricao] = useState('');
  const [localizacao, setLocalizacao] = useState('');

  const resetForm = () => {
    setNome(''); setCapacidade(''); setDescricao(''); setLocalizacao('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  }

  const handleCreateRoom = async () => {
    if (!nome.trim() || !capacidade.trim() || !localizacao.trim()) {
      return Alert.alert('Cadastro', 'Nome, capacidade e localização são obrigatórios.');
    }

    setIsCreating(true);
    try {
      await createSala({
        nome_numero: nome,
        capacidade: Number(capacidade),
        descricao,
        localizacao,
      });
      Alert.alert('Sucesso', 'Sala cadastrada com sucesso!');
      onRoomCreated();
      handleClose();
    } catch (error: any) {
      const errorMessage = error.response?.data?.nome_numero?.[0] || 'Não foi possível cadastrar a sala.';
      Alert.alert('Erro no Cadastro', errorMessage);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Modal transparent={true} onRequestClose={handleClose} animationType="fade" {...rest}>
      <ModalOverlay>
        <ModalContainer>
          <ModalTitle>Cadastrar nova sala</ModalTitle>

          <TitleInput>Nome / Número</TitleInput>
          <Input placeholder="Ex: Auditório, Sala 101"  value={nome} onChangeText={setNome} />
          
          <TitleInput>Capacidade</TitleInput>
          <Input placeholder="Ex: 30" value={capacidade} onChangeText={setCapacidade} keyboardType="numeric" />

          <TitleInput>Localização</TitleInput>
          <Input placeholder="Ex: Bloco B"  value={localizacao} onChangeText={setLocalizacao} />

          <TitleInput>Descrição (Opcional)</TitleInput>
          <Input placeholder="Ex: Sala com projetor e Notebook" value={descricao} onChangeText={setDescricao} />

          <ModalButtons>
            <ModalButton variant="cancel" onPress={handleClose}>
              <ModalButtonText variant="cancel">Cancelar</ModalButtonText>
            </ModalButton>
            <ModalButton variant="success" onPress={handleCreateRoom} disabled={isCreating}>
              {isCreating ? <ActivityIndicator color="#FFF" /> : <ModalButtonText variant="success">Cadastrar</ModalButtonText>}
            </ModalButton>
          </ModalButtons>
        </ModalContainer>
      </ModalOverlay>
    </Modal>
  );
}