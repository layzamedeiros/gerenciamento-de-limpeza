import { Room } from "@services/rooms.service";
import { TouchableOpacity } from "react-native";
import styled, { css } from "styled-components/native";

type StatusProps = {
  status: Room['status_limpeza'];
}

export const CardContainer = styled.View`
  width: 100%;
  border-radius: 11px;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  padding: 12px;
  margin-bottom: 10px;
`;

export const CardHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
`;

export const Line = styled.View`
  height: 1px;
  background-color: ${({ theme }) => theme.COLORS.DISABLED};
  margin-bottom: 4px;
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
  padding: 1.5px;
  border-radius: 6px;
  width: 32%;
  align-items: center;
  background-color: ${({ theme, status }) =>
    status === 'Limpa'
      ? theme.COLORS.GREEN_LIGHT
      : status === 'Em Limpeza'
      ? theme.COLORS.PRIMARY_LIGHT
      : status === 'Limpeza Pendente'
      ? theme.COLORS.ACCENT_LIGHT
      : theme.COLORS.DANGER_LIGHT};
`;

export const StatusTagText = styled.Text<StatusProps>`
  font-size: 11px;
  ${({ theme, status }) => css`
    font-family: ${theme.FONT_FAMILY.BOLD};
    color: ${
      status === 'Limpa'
        ? theme.COLORS.GREEN
        : status === 'Em Limpeza'
        ? theme.COLORS.PRIMARY
        : status === 'Limpeza Pendente'
        ? theme.COLORS.ACCENT
        : theme.COLORS.DANGER
    };
  `}
`;

export const SubTitle = styled.Text`
  font-size: 14px;
  line-height: 20px;
  ${({ theme }) => css`
    color: ${theme.COLORS.INFO};
    font-family: ${theme.FONT_FAMILY.REGULAR};
  `};
`;

export const DetailLabel = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.SEMIBOLD};
  color: ${({ theme }) => theme.COLORS.TITLE};
`;

export const ExpandedContent = styled.View`
  margin-top: 16px;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.COLORS.DISABLED};
  padding-top: 2px;
`;

export const RoomImage = styled.Image`
  width: 100%;
  height: 150px;
  margin-bottom: 12px;
`;

export const DetailsContainer = styled.View`
  gap: 4px;
`;

export const MenuButton = styled(TouchableOpacity)`
`;

export const MenuContainer = styled.View`
  position: absolute;
  top: 45px;
  right: 16px;
  background-color: ${({ theme }) => theme.COLORS.SURFACE};
  border-radius: 8px;
  border-width: 0.5px;
  border-color: ${({ theme }) => theme.COLORS.BORDER};
  z-index: 10;
`;

export const MenuItem = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 5px 10px;
  width: 180px;
`;

type MenuItemTextProps = {
  isDelete?: boolean;
}

export const MenuItemText = styled.Text<MenuItemTextProps>`
  font-size: 16px;
  ${({ theme, isDelete }) => css`
    font-family: ${theme.FONT_FAMILY.REGULAR};
    color: ${isDelete ? theme.COLORS.DANGER : theme.COLORS.TITLE};
  `};
`;

export const MenuSeparator = styled.View`
  height: 0.5px;
  background-color: ${({ theme }) => theme.COLORS.BORDER};
`;