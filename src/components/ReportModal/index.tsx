import React, { useState, useEffect } from 'react';
import { Modal, ModalProps, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { Room } from '@services/rooms.service';
import { 
  ModalOverlay, 
  ModalContainer, 
  Title, 
  Message, 
  MessageHighlight,
  ObservationInput,
  ModalButtons, 
  ModalButton, 
  ModalButtonText 
} from './styles';

type Props = ModalProps & {
  sala: Room | null;
  isLoading?: boolean;
  onClose: () => void;
  onConfirm: (observacao: string) => void; // <-- Passa a observação ao confirmar
}

export function ReportModal({ sala, isLoading = false, onClose, onConfirm, ...rest }: Props) {
  const [observacao, setObservacao] = useState('');

  // Limpa o input sempre que o modal for fechado
  useEffect(() => {
    if (!rest.visible) {
      setObservacao('');
    }
  }, [rest.visible]);

  const handleConfirm = () => {
    onConfirm(observacao); // Envia a observação para a função
  };


  return (
    <Modal
      transparent={true}
      onRequestClose={onClose}
      animationType="fade"
      {...rest}
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ModalOverlay>
          <ModalContainer>
            <Title>Solicitar Limpeza</Title>
            <Message>
              Tem certeza que deseja solicitar limpeza para a sala <MessageHighlight>{sala?.nome_numero}</MessageHighlight>?
            </Message>

            <ObservationInput 
              placeholder="Adicionar observação (opcional)"
              multiline
              numberOfLines={3}
              value={observacao}
              onChangeText={setObservacao}
            />

            <ModalButtons>
              <ModalButton variant="cancel" onPress={onClose} disabled={isLoading}>
                <ModalButtonText variant='cancel'>Cancelar</ModalButtonText>
              </ModalButton>
              <ModalButton variant="confirm" onPress={handleConfirm} disabled={isLoading}>
                {isLoading ? <ActivityIndicator color="#FFF" /> : <ModalButtonText variant='confirm'>Confirmar</ModalButtonText>}
              </ModalButton>
            </ModalButtons>
          </ModalContainer>
        </ModalOverlay>
      </KeyboardAvoidingView>
    </Modal>
  );
}