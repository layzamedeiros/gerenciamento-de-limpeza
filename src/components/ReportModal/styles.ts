import { TouchableOpacity, TextInput } from 'react-native';
import styled, { css } from 'styled-components/native';

export const ModalOverlay = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
`;

export const ModalContainer = styled.View`
  width: 90%;
  max-width: 340px;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
  border-radius: 12px;
  padding: 22px;
  align-items: stretch; 
`;

export const Title = styled.Text`
  font-size: 20px;
  margin-bottom: 15px;
  text-align: center;
  ${({ theme }) => css`
    color: ${theme.COLORS.PRIMARY};
    font-family: ${theme.FONT_FAMILY.BOLD};
  `}
`;

export const Message = styled.Text`
  font-size: 16px;
  text-align: center;
  margin-bottom: 16px;
  line-height: 24px;
  ${({ theme }) => css`
    color: ${theme.COLORS.TITLE};
    font-family: ${theme.FONT_FAMILY.REGULAR};
  `}
`;

export const MessageHighlight = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  color: ${({ theme }) => theme.COLORS.TITLE};
`;

export const ObservationInput = styled(TextInput).attrs(({ theme }) => ({
  placeholderTextColor: theme.COLORS.PLACEHOLDER,
}))`
  width: 100%;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  border-radius: 8px; 
  border-width: 1px;
  border-color: ${({ theme }) => theme.COLORS.BORDER};
  padding: 10px 15px;
  font-size: 14px;
  color: ${({ theme }) => theme.COLORS.TITLE};
  margin-bottom: 24px;
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
  padding: 12px;
  border-radius: 8px;
  align-items: center;
  background-color: ${({ theme, variant }) => 
    variant === 'confirm' ? theme.COLORS.PRIMARY : theme.COLORS.WHITE}; 
  border-width: 1px;
  border-color: ${({ theme, variant }) => 
    variant === 'confirm' ? theme.COLORS.PRIMARY : theme.COLORS.PRIMARY};
    margin-right: 8px;
  ${({ variant }) => variant === 'cancel' && css`
    margin-right: 8px;
  `}
  ${({ variant }) => variant === 'confirm' && css`
    margin-left: 8px;
  `}
`;

export const ModalButtonText = styled.Text<ModalButtonProps>`
  font-size: 14px;
  ${({ theme, variant }) => css` 
    font-family: ${theme.FONT_FAMILY.SEMIBOLD};
    color: ${variant === 'confirm' ? theme.COLORS.WHITE : theme.COLORS.PRIMARY}; 
  `}
`;