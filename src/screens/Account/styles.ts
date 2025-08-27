import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled, { css } from "styled-components/native";

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;

export const Content = styled.View`
  flex: 1;
  align-items: center;
  padding: 32px;
`;

export const AvatarPlaceholder = styled.View`
  width: 100px;
  height: 100px;
  border-radius: 70px;
  background-color: ${({ theme }) => theme.COLORS.BORDER};
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 22px;
`;

export const UserName = styled.Text`
  font-size: 24px;
  ${({ theme }) => css`
    color: ${theme.COLORS.TITLE};
    font-family: ${theme.FONT_FAMILY.SEMIBOLD};
  `}
`;

export const UserEmail = styled.Text`
  font-size: 14px;
  ${({ theme }) => css`
    color: ${theme.COLORS.PLACEHOLDER};
    font-family: ${theme.FONT_FAMILY.REGULAR};
  `}
  margin-bottom: 20px;
`;

export const Divider = styled.View`
  width: 100%;                         
  height: 1px;                         
  background-color: ${({ theme }) => theme.COLORS.BORDER};       
  margin-bottom: 32px;    
`;

export const Button = styled(TouchableOpacity)`
  width: 100%;
  min-height: 50px;
  background-color: ${({ theme }) => theme.COLORS.PRIMARY};
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

export const ButtonText = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.WHITE};
    font-family: ${theme.FONT_FAMILY.SEMIBOLD};
  `}
  font-size: 16px;
`;

export const LogoutButton = styled(TouchableOpacity)`
  width: 100%;
  min-height: 50px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 14px;
  margin-top: auto;
`;

export const LogoutButtonText = styled.Text`
  font-size: 16px;
  margin-left: 8px;
  ${({ theme }) => css`
    color: ${theme.COLORS.DANGER};
    font-family: ${theme.FONT_FAMILY.SEMIBOLD};
  `}
`;