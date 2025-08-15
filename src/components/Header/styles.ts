import theme from "@theme/index";
import { BellIcon } from "phosphor-react-native";
import styled, { css } from "styled-components/native";

export const HeaderContainer = styled.View`
 ${({ theme }) => css`
    background-color: ${theme.COLORS.BACKGROUND};
    border-bottom-color: ${theme.COLORS.BORDER};
  `}
  width: 100%;
  height: 70px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-width: 0.8px;
`;

export const ScreenName = styled.Text`
  font-size: 20px;
  margin-left: 20px;

  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.SEMIBOLD};
    color: ${theme.COLORS.PRIMARY};
  `}
`;

export const NotificationButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.55
})`
  position: relative;
  margin-right: 20px;
`;

export const NotificationIcon = styled(BellIcon).attrs(({ theme }) => ({
  size: 26,
  color: theme.COLORS.PRIMARY,
  weight: "bold"
}))``;