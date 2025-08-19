import styled, { css } from "styled-components/native";

type StatusProps = {
  status?: "limpa" | "pendente";
}

export const CardContainer = styled.View`
  flex: 1;
  width: 100%;
  height: 90px;
  border-radius: 11px;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  flex-direction: column;
  justify-content: center;
  padding: 16px;
  margin-bottom: 10px;
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