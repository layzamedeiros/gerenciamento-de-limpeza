import { TouchableOpacity } from "react-native";
import styled, { css } from "styled-components/native";

type StatusProps = {
  status?: "limpa" | "pendente";
}

export const CardContainer = styled.View`
  width: 100%;
  border-radius: 11px;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  padding: 16px;
  margin-bottom: 10px;
`;

export const CardHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

export const Title = styled.Text`
  font-size: 16px;
  flex: 1; 
  ${({ theme }) => css`
    color: ${theme.COLORS.TITLE};
    font-family: ${theme.FONT_FAMILY.SEMIBOLD};
  `};
`;

export const StatusTag = styled.View<StatusProps>`
  padding: 4px 12px;
  border-radius: 20px;
  margin-left: 10px;
  
  background-color: ${({ theme, status }) => 
    status === 'limpa' ? theme.COLORS.PRIMARY_LIGHT : `${theme.COLORS.ACCENT}30`};
`;

export const StatusTagText = styled.Text<StatusProps>`
  font-size: 12px;
  ${({ theme, status }) => css`
    font-family: ${theme.FONT_FAMILY.BOLD};
    color: ${status === 'limpa' ? theme.COLORS.PRIMARY : theme.COLORS.ACCENT};
  `}
`;

export const SubTitle = styled.Text`
  font-size: 14px;
  line-height: 20px; 
  ${({ theme }) => css`
    color: ${theme.COLORS.SUBTITLE};
    font-family: ${theme.FONT_FAMILY.REGULAR};
  `};
`;

export const ActionsContainer = styled.View`
  flex-direction: row;
  justify-content: flex-start; 
  align-items: center;
  margin-top: 16px;
  gap: 10px;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.COLORS.DISABLED};
  padding-top: 12px;
`;

export const ActionButton = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  margin-left: px; 
`;

export const ActionButtonText = styled.Text`
  font-size: 14px;
  margin-left: 8px;
  ${({ theme }) => css`
    color: ${theme.COLORS.SUBTITLE};
    font-family: ${theme.FONT_FAMILY.MEDIUM};
  `}
`;

export const DeleteButtonText = styled(ActionButtonText)`
  color: ${({ theme }) => theme.COLORS.SUBTITLE};
`;