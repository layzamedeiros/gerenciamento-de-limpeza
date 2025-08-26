import { TouchableOpacity } from 'react-native';
import styled, { css } from 'styled-components/native';

export const ModalOverlay = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
`;

export const ModalContainer = styled.View`
  width: 80%;
  max-width: 300px;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
  border-radius: 12px;
  padding: 24px;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 20px;
  margin-bottom: 15px;
  ${({ theme }) => css`
    color: ${theme.COLORS.PRIMARY};
    font-family: ${theme.FONT_FAMILY.BOLD};
  `}
`;

export const Message = styled.Text`
  font-size: 16px;
  text-align: center;
  margin-bottom: 24px;
  line-height: 24px;
  ${({ theme }) => css`
    color: ${theme.COLORS.SUBTITLE};
    font-family: ${theme.FONT_FAMILY.REGULAR};
  `}
`;

export const MessageHighlight = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  color: ${({ theme }) => theme.COLORS.TITLE};
`;

export const ModalButtons = styled.View`
  flex-direction: row;
  width: 100%;
`;

type ModalButtonProps = {
  variant: 'cancel' | 'confirm';
}

export const ModalButton = styled(TouchableOpacity)<ModalButtonProps>`
  flex: 1;
  padding: 10px;
  border-radius: 8px;
  align-items: center;
  background-color: ${({ theme, variant }) => 
    variant === 'confirm' ? theme.COLORS.ACCENT : theme.COLORS.PRIMARY};
  
  ${({ variant }) => variant === 'cancel' && css`
    margin-right: 8px;
  `}
  
  ${({ variant }) => variant === 'confirm' && css`
    margin-left: 8px;
  `}
`;

export const ModalButtonText = styled.Text`
  font-size: 14px;
  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.SEMIBOLD};
    color: ${theme.COLORS.WHITE};
  `}
`;