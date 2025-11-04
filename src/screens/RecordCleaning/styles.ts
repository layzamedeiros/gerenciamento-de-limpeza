import { TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled, { css } from "styled-components/native";

type ButtonProps = {
  variant?: "primary" | "success";
};

// --- Container e Conteúdo Principal ---
export const Container = styled(SafeAreaView).attrs({
  edges: ["top", "left", "right"],
})`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;

export const Content = styled.View`
  flex: 1;
  padding: 15px 20px 0px 20px;
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.PRIMARY};
    font-family: ${theme.FONT_FAMILY.SEMIBOLD};
  `}
  font-size: 19px;
  margin-bottom: 5px;
`;

export const SubTitle = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.TITLE};
    font-family: ${theme.FONT_FAMILY.REGULAR};
  `}
  font-size: 14px;
  margin-bottom: 15px;
`;

export const ScanButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.COLORS.PRIMARY};
  padding: 5px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

export const ScanButtonText = styled.Text`
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-family: ${({ theme }) => theme.FONT_FAMILY.SEMIBOLD};
  font-size: 16px;
  margin-left: 8px;
`;

export const Button = styled(TouchableOpacity)<ButtonProps>`
  background-color: ${({ theme, variant = "primary", disabled }) =>
    disabled ? theme.COLORS.BORDER : (variant === "success" ? theme.COLORS.ACCENT : theme.COLORS.ACCENT)};
  padding: 12px;
  border-radius: 8px;
  align-items: center;
  margin-top: 10px;
`;

export const ButtonText = styled.Text`
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-family: ${({ theme }) => theme.FONT_FAMILY.SEMIBOLD};
  font-size: 16px;
`;

export const InProgressContainer = styled.View`
  padding-bottom: 30px;
`;

export const SectionTitle = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.PRIMARY};
    font-family: ${theme.FONT_FAMILY.SEMIBOLD};
  `}
  font-size: 18px;
`;

export const DetailsContainer = styled.View`
`;

export const InfoRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const InfoLabel = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.COLORS.TITLE};
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  margin-top: 10px;
`;

export const InfoValue = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.COLORS.TITLE};
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
`;

export const InstructionsText = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.COLORS.SUBTITLE};
  line-height: 22px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  padding: 12px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.COLORS.BORDER};
`;

export const ObservationInput = styled(TextInput).attrs(({ theme }) => ({
  placeholderTextColor: theme.COLORS.PLACEHOLDER,
  inputMode: "text",
  multiline: true,
}))`
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  border: 1px solid ${({ theme }) => theme.COLORS.BORDER};
  border-radius: 8px;
  padding-left: 12px; 
  margin-top: 5px;
  margin-bottom: 15px;
  font-size: 14px;
  color: ${({ theme }) => theme.COLORS.TITLE};
`;

export const PhotoGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

export const PhotoContainer = styled.View`
  position: relative; 
  margin-left: 4px;
`;

export const RemovePhotoButton = styled.TouchableOpacity`
  position: absolute;
  top: 12;
  right: 3;
  background-color: ${({theme}) => theme.COLORS.PRIMARY_LIGHT};
  border: 1px solid ${({ theme }) => theme.COLORS.PRIMARY};
  width: 24px;
  height: 24px;
  border-radius: 12px;
  justify-content: center;
  align-items: center;
  z-index: 10; 
`;

export const RemovePhotoButtonText = styled.Text`
  color: ${({theme}) => theme.COLORS.PRIMARY};
  font-weight: bold;
  font-size: 14px;
  line-height: 20px; 
`;

export const Thumbnail = styled.Image`
  width: 110px;
  height: 109px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.COLORS.PRIMARY};
  margin-top: 10px;
`;

export const AddPhotoButton = styled.TouchableOpacity`
  width: 110px;
  height: 109px;
  border-radius: 8px;
  margin-left: 4px;
  margin-top: 10px;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  border: 1.5px dashed ${({ theme }) => theme.COLORS.PRIMARY};
  justify-content: center;
  align-items: center;
`;

export const AddPhotoButtonText = styled.Text`
  font-size: 24px;
  color: ${({ theme }) => theme.COLORS.PRIMARY};
`;

export const FinishButton = styled(TouchableOpacity)`
  background-color: ${({ theme, disabled }) => disabled ? theme.COLORS.DISABLED : theme.COLORS.PRIMARY};
  padding: 12px;
  border-radius: 8px;
  align-items: center;
  margin-top: 40px;
`;

export const FinishButtonText = styled.Text`
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-size: 16px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.SEMIBOLD};
`;

export const FullScreen = styled.View`
  flex: 1;
  background-color: transparent;
  justify-content: flex-end;
`;

export const CameraControls = styled.View`
  display: flex;
  padding: 20px 0 40px 0;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
`;

export const CaptureButton = styled.View`
  width: 70px;
  height: 70px;
  border-radius: 35px;
  margin-right: 100px;
  background-color: white;
`;

export const ScanMarker = styled.View`
    width: 250px;
    height: 250px;
    border-width: 2px;
    border-color: white;
    border-radius: 10px;
`;

export const ModalButton = styled.TouchableOpacity`
  padding: 10px 20px;
  position: absolute;
  bottom: 40px;
  align-self: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.SEMIBOLD};
`;