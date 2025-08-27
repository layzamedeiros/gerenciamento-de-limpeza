import React, { useState, useEffect } from 'react';
import { Modal, Alert, ActivityIndicator, ModalProps } from 'react-native';
import { Sala, updateSala } from '@services/rooms.service';
import { 
  ModalOverlay, ModalContainer, ModalTitle, Input, ModalButtons, ModalButton, ModalButtonText, 
  TitleInput
} from './styles';

type Props = ModalProps & {
  sala: Sala | null; 
  onClose: () => void;
  onRoomUpdated: () => void;
}

export function EditRoomModal({ sala, onClose, onRoomUpdated, ...rest }: Props) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [nome, setNome] = useState('');
  const [capacidade, setCapacidade] = useState('');
  const [descricao, setDescricao] = useState('');
  const [localizacao, setLocalizacao] = useState('');

  useEffect(() => {
    if (sala) {
      setNome(sala.nome_numero);
      setCapacidade(String(sala.capacidade));
      setDescricao(sala.descricao || '');
      setLocalizacao(sala.localizacao || '');
    }
  }, [sala]);

  const handleUpdateRoom = async () => {
    if (!sala) return;
    if (!nome.trim() || !capacidade.trim()) {
      return Alert.alert('Edição', 'Nome, capacidade e localização são obrigatórios.');
    }

    setIsUpdating(true);
    try {
      await updateSala(sala.id, {
        nome_numero: nome,
        capacidade: Number(capacidade),
        descricao,
        localizacao,
      });
      Alert.alert('Sucesso', 'Sala atualizada com sucesso!');
      onRoomUpdated();
      onClose();
    } catch (error: any) {
      const errorMessage = error.response?.data?.nome_numero?.[0] || 'Não foi possível atualizar a sala.';
      Alert.alert('Erro na Edição', errorMessage);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Modal transparent={true} onRequestClose={onClose} animationType="fade" {...rest}>
      <ModalOverlay>
        <ModalContainer>
          <ModalTitle>Editar sala</ModalTitle>
          <TitleInput>Nome / Número</TitleInput>
          <Input value={nome} onChangeText={setNome} />
          <TitleInput>Capacidade</TitleInput>
          <Input value={capacidade} onChangeText={setCapacidade} keyboardType="numeric" />
          <TitleInput>Localização</TitleInput>
          <Input value={localizacao} onChangeText={setLocalizacao} />
          <TitleInput>Descrição (Opcional)</TitleInput>
          <Input value={descricao} onChangeText={setDescricao} />
          <ModalButtons>
            <ModalButton variant="cancel" onPress={onClose}>
              <ModalButtonText variant="cancel">Cancelar</ModalButtonText>
            </ModalButton>
            <ModalButton variant="success" onPress={handleUpdateRoom} disabled={isUpdating}>
              {isUpdating ? <ActivityIndicator color="#FFF" /> : <ModalButtonText variant="success">Salvar</ModalButtonText>}
            </ModalButton>
          </ModalButtons>
        </ModalContainer>
      </ModalOverlay>
    </Modal>
  );
}