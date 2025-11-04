import styled, { css } from "styled-components/native";

type TagProps = {
  type: "admin" | "collaborator" | "zeladoria";
};

export const CardContainer = styled.View`
  width: 100%;
  min-height: 75px;
  border-radius: 11px;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  margin-bottom: 10px;
`;

export const InfoContainer = styled.View`
  flex: 1;
`;

export const Title = styled.Text`
  font-size: 16px;
  ${({ theme }) => css`
    color: ${theme.COLORS.TITLE};
    font-family: ${theme.FONT_FAMILY.SEMIBOLD};
  `};
`;

export const SubTitle = styled.Text`
  font-size: 14px;
  ${({ theme }) => css`
    color: ${theme.COLORS.SUBTITLE};
    font-family: ${theme.FONT_FAMILY.REGULAR};
  `};
`;

export const TagContainer = styled.View<TagProps>`
  padding: 4px 12px;
  border-radius: 20px;
  margin-left: 10px;
  background-color: ${({ theme, type }) => {
    switch (type) {
      case "admin":
        return theme.COLORS.PRIMARY_LIGHT;
      case "zeladoria":
        return theme.COLORS.GREEN_LIGHT;
      case "collaborator":
      default:
        return `${theme.COLORS.ACCENT}30`;
    }
  }};
`;

export const TagText = styled.Text<TagProps>`
  font-size: 12px;
  ${({ theme, type }) => css`
    font-family: ${theme.FONT_FAMILY.BOLD};
    color: ${() => {
      switch (type) {
        case "admin":
          return theme.COLORS.PRIMARY;
        case "zeladoria":
          return theme.COLORS.GREEN;
        case "collaborator":
        default:
          return theme.COLORS.ACCENT;
      }
    }};
  `}
`;
