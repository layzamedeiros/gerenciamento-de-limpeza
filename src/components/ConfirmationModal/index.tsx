import React, { ReactNode } from 'react';
import { Modal, ModalProps, ActivityIndicator } from 'react-native';
import { 
  ModalOverlay, ModalContainer, Title, Message, ModalButtons, ModalButton, ModalButtonText 
} from './styles';

type Props = ModalProps & {
  title: string;
  children: ReactNode;
  isLoading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function ConfirmationModal({ title, children, isLoading = false, onClose, onConfirm, ...rest }: Props) {
  return (
    <Modal
      transparent={true}
      onRequestClose={onClose}
      animationType="fade"
      {...rest}
    >
      <ModalOverlay>
        <ModalContainer>
          <Title>{title}</Title>
          <Message>{children}</Message>

          <ModalButtons>
            <ModalButton variant="cancel" onPress={onClose} disabled={isLoading}>
              <ModalButtonText>Cancelar</ModalButtonText>
            </ModalButton>
            <ModalButton variant="confirm" onPress={onConfirm} disabled={isLoading}>
              {isLoading ? <ActivityIndicator color="#FFF" /> : <ModalButtonText>Excluir</ModalButtonText>}
            </ModalButton>
          </ModalButtons>
        </ModalContainer>
      </ModalOverlay>
    </Modal>
  );
}