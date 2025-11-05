import styled, { css } from 'styled-components/native';
import { TouchableOpacity, TextInput } from 'react-native';
import { CameraPlusIcon, XCircleIcon } from 'phosphor-react-native';

export const ModalOverlay = styled.View`
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

export const ModalTitle = styled.Text`
  font-size: 20px;
  text-align: center;
  margin-bottom: 20px;
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
  margin-top: 24px;
`;

type ModalButtonProps = {
  variant: 'cancel' | 'success';
}

export const ModalButton = styled(TouchableOpacity)<ModalButtonProps>`
  flex: 1;
  padding: 10px;
  border-radius: 8px;
  align-items: center;
  background-color: ${({ theme, variant }) => variant === 'success' ? theme.COLORS.ACCENT : theme.COLORS.PRIMARY};
  
  ${({ variant }) => variant === 'cancel' && css`
    margin-right: 10px;
  `}
  
  ${({ variant }) => variant === 'success' && css`
    margin-left: 10px;
  `};
`;

export const ModalButtonText = styled.Text<ModalButtonProps>`
  font-size: 14px;
  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.SEMIBOLD};
    color: ${theme.COLORS.WHITE};
  `};
`;

export const ExternalInputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 12px;
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

export const AddPhotoRoomContainer = styled.Pressable<{ photoExists: boolean }>`
  ${({ theme, photoExists }) => css`
    border-color: ${theme.COLORS.BORDER};
    height: ${photoExists ? "110px" : "60px"};
    width: ${photoExists ? "40%" : "auto"};
  `}
  flex-direction: row;
  border-width: 1px;
  border-style: dashed;
  border-radius: 8px;
  gap: 6px;
  align-items: center;
  justify-content: center;
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
  text-align: center;
  font-size: 12px;
  
`

export const PhotoPreview = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 8px;
`;

export const RemovePhotoButton = styled(TouchableOpacity).attrs({
  activeOpacity: 0.7
})`
  position: absolute;
  top: 6px;
  right: 6px;
  justify-content: center;
  align-items: center;
  padding: 2px;
`;

export const RemovePhotoIcon = styled(XCircleIcon)`
  background-color: ${({ theme }) => theme.COLORS.PRIMARY_LIGHT};
  border-radius: 50%;
  color: #004A8D;
  font-size: 16px;
  font-weight: bold;
`;

// --- Estilos para o Modal da Câmera ---

export const CameraModalContainer = styled.View`
  flex: 1;
  background-color: black;
`;

export const CameraPermissionDenied = styled.View`
  flex: 1;
  background-color: black;
  justify-content: center;
  align-items: center;
`;


export const CameraControls = styled.View`
  position: absolute;
  bottom: 0;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: rgba(0,0,0,0.4);
  padding: 20px 30px;
`;

export const CameraButton = styled(TouchableOpacity)`
  padding: 10px;
`;

export const CameraButtonText = styled.Text`
  color: white;
  font-size: 16px;
`;

export const CaptureButton = styled.View`
  width: 70px;
  height: 70px;
  border-radius: 35px;
  background-color: #FFF;
  border-width: 5px;
  border-color: grey;
`;