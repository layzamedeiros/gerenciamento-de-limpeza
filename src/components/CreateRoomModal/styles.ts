import styled, { css } from 'styled-components/native';
import { TouchableOpacity, TextInput } from 'react-native';

export const ModalOverlay = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
`;

export const ModalContainer = styled.View`
  width: 90%;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
  border-radius: 12px;
  padding: 22px;
  gap: 8px;
`;


export const InputContainer = styled.View`
  
`;

export const InputFlexContainer = styled(InputContainer)`
  flex: 1;
`

export const ExternalInputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

export const ModalTitle = styled.Text`
  font-size: 20px;
  text-align: center;
  margin-bottom: 2px;
  ${({ theme }) => css`
    color: ${theme.COLORS.PRIMARY};
    font-family: ${theme.FONT_FAMILY.BOLD};
  `};
`;

export const TitleInput = styled.Text`
  font-size: 14px;
  margin-top: 12px;
  margin-bottom: 6px;
  ${({ theme }) => css`
    color: ${theme.COLORS.TITLE};
    font-family: ${theme.FONT_FAMILY.SEMIBOLD};
  `};
`;

export const Input = styled(TextInput).attrs(({ theme }) => ({
  placeholderTextColor: theme.COLORS.PLACEHOLDER,
}))`
  /* width: 100%; */
  height: 40px;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  border-radius: 8px; 
  border-width: 1px;
  border-color: ${({ theme }) => theme.COLORS.BORDER};
  padding: 0 15px;
  font-size: 14px;
  color: ${({ theme }) => theme.COLORS.TITLE};
`;

export const AdminContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
`;

export const AdminTitle = styled.Text`
  font-size: 16px;
  margin-left: 10px;
  ${({ theme }) => css`
    color: ${theme.COLORS.TITLE};
    font-family: ${theme.FONT_FAMILY.REGULAR};
  `}
`;

export const ModalButtons = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 14px;
`;

type ModalButtonProps = {
  variant: 'cancel' | 'success';
}

export const ModalButton = styled(TouchableOpacity).attrs({
  activeOpacity: 0.6
})<ModalButtonProps>`
  ${({ theme, variant }) => css`
    background-color: ${variant === 'success' ? theme.COLORS.PRIMARY : theme.COLORS.WHITE};
    ${variant === 'cancel' && css`
      margin-right: 10px;
    `}
    ${variant === 'success' && css`
      margin-left: 10px;
    `};
    border-color: ${theme.COLORS.PRIMARY};
  `}
  
  flex: 1;
  padding: 8px 10px;
  border-radius: 8px;
  border-width: 1px;
  align-items: center;
`;

export const ModalButtonText = styled.Text<ModalButtonProps>`
  font-size: 14px;
  ${({ theme, variant }) => css`
    font-family: ${theme.FONT_FAMILY.SEMIBOLD};
    color: ${variant === "success" ? theme.COLORS.WHITE : theme.COLORS.PRIMARY};
  `};
`;