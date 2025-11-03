import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled, { css } from "styled-components/native";

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
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
  margin-bottom: 2%;
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
  margin-bottom: 1%;
`;

export const UserRole = styled.Text`
  font-size: 14px;
  ${({ theme }) => css`
    color: ${theme.COLORS.PLACEHOLDER};
    font-family: ${theme.FONT_FAMILY.REGULAR};
  `}
  margin-bottom: 15%;
`;

export const AccountButton = styled(TouchableOpacity)`
  width: 105%;
  min-height: 50px;
  background-color: ${({ theme }) => theme.COLORS.PRIMARY};
  border-radius: 8px;
  align-items: center;
  padding: 10px;
  margin-bottom: 2%;
  flex-direction: row;
  justify-content: space-between;
  border: 0.8px;
  border-color: ${({ theme }) => theme.COLORS.GREY};
`;

export const AccountButtonText = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.WHITE};
    font-family: ${theme.FONT_FAMILY.SEMIBOLD};
  `}
  font-size: 16px;
`;

export const PasswordButton = styled(TouchableOpacity)`
  width: 105%;
  min-height: 50px;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
  border-radius: 8px;
  align-items: center;
  padding: 10px;
  margin-bottom: 7%;
  flex-direction: row;
  justify-content: space-between;
  border: 0.8px;
  border-color: ${({ theme }) => theme.COLORS.GREY};
`;

export const ButtonText = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.PRIMARY};
    font-family: ${theme.FONT_FAMILY.SEMIBOLD};
  `}
  font-size: 16px;
`;

export const LogoutButton = styled(TouchableOpacity)`
  width: 105%;
  min-height: 50px;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
  border-radius: 8px;
  align-items: center;
  padding: 10px;
  flex-direction: row;
  justify-content: space-between;
  border: 0.8px;
  border-color: ${({ theme }) => theme.COLORS.GREY};
`;

export const LogoutButtonText = styled.Text`
  font-size: 16px;
  margin-left: 8px;
  ${({ theme }) => css`
    color: ${theme.COLORS.DANGER};
    font-family: ${theme.FONT_FAMILY.SEMIBOLD};
  `}
`;