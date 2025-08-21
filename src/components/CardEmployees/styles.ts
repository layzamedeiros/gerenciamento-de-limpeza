import styled, { css } from "styled-components/native";

type TagProps = {
  type: 'admin' | 'collaborator';
}

export const CardContainer = styled.View`
  width: 100%;
  min-height: 90px;
  border-radius: 11px;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  flex-direction: column;
  justify-content: center; 
  align-items: flex-start;
  padding: 16px;
  margin-bottom: 10px;
`;

export const InfoContainer = styled.View`
  margin-bottom: 8px;
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
  background-color: ${({ theme, type }) => 
    type === 'admin' ? theme.COLORS.PRIMARY_LIGHT : `${theme.COLORS.ACCENT}30`}; 
`;

export const TagText = styled.Text<TagProps>`
  font-size: 12px;
  ${({ theme, type }) => css`
    font-family: ${theme.FONT_FAMILY.BOLD};
    color: ${type === 'admin' ? theme.COLORS.PRIMARY : theme.COLORS.ACCENT};
  `}
`;