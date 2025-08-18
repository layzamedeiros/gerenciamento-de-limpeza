import { TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled, { css } from "styled-components/native";

export const Container = styled(SafeAreaView).attrs({
  edges: ["right", "top", "left"],
})`
  flex: 1;
`;

export const Content = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
  padding: 15px 20px 0px 20px;
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.PRIMARY};
    font-family: ${theme.FONT_FAMILY.SEMIBOLD};
  `}
  font-size: 18px;
  margin-bottom: 10px;
`;

export const CleaningContainer = styled.View`
  margin-top: 10px;
`;

export const CleaningDetails = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.SEMIBOLD};
  color: ${({ theme }) => theme.COLORS.TITLE};
`;

export const CleaningDetailsTime = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.COLORS.SUBTITLE};
  margin-bottom: 10px;
`;

export const ObservationTitle = styled(Title)`
  margin-bottom: 10px; 
`;

export const ObservationInput = styled(TextInput).attrs(({ theme }) => ({
  placeholderTextColor: theme.COLORS.PLACEHOLDER,
  multiline: true,
}))`
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  border-color: ${({ theme }) => theme.COLORS.BORDER};
  border-width: 1px;
  border-radius: 8px;
  height: 20%;
  padding: 10px;
  font-size: 16px;
  color: ${({ theme }) => theme.COLORS.TITLE};
`;

type ButtonProps = {
  variant?: 'primary' | 'success';
}

export const Button = styled(TouchableOpacity)<ButtonProps>`
  background-color: ${({ theme, variant = 'primary' }) => 
    variant === 'success' ? theme.COLORS.ACCENT : theme.COLORS.PRIMARY};
  padding: 12px;
  border-radius: 8px;
  align-items: center;
  margin-top: 30px;
`;

export const ButtonText = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.WHITE};
    font-family: ${theme.FONT_FAMILY.SEMIBOLD};
  `}
  font-size: 14px;
`;
