import styled, { css } from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { CameraPlusIcon } from 'phosphor-react-native';

export const ModalOverlay = styled.Pressable`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
`;

export const ModalContainer = styled.View`
  width: 90%;
  max-height: 85%;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
  border-radius: 12px;
  padding: 22px;
  gap: 8px;
`;

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

export const ErrorCapacity = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.REGULAR};
    color: ${theme.COLORS.DANGER};
  `}
  font-size: 12px;
  margin-left: 8px;
`;

export const PhotoRoomContainer = styled.View`
  flex-direction: column;
  gap: 3px;
`

export const InputName = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.SEMIBOLD};
    color: ${theme.COLORS.TITLE};
  `}
  font-size: 14px;
`

export const AddPhotoRoomContainer = styled.Pressable`
  flex-direction: row;
  border-width: 1px;
  border-color: ${({ theme }) => theme.COLORS.BORDER};
  border-style: dotted;
  border-radius: 8px;
  padding: 0 5px;
  gap: 6px;
  align-items: center;
  justify-content: center;
  height: 60px;
`;

export const PhotoIcon = styled(CameraPlusIcon).attrs(({ theme }) => ({
  size: 24,
  color: theme.COLORS.TITLE
}))``;

export const PhotoText = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.REGULAR};
    color: ${theme.COLORS.TITLE};
  `}
`