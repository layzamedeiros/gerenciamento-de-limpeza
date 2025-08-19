import styled, { css } from "styled-components/native";

type StatusProps = {
  status?: "limpa" | "pendente";
}

export const CardContainer = styled.View`
  flex: 1;
  width: 100%;
  height: 140px;
  border-radius: 11px;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  flex-direction: row;
  align-items: center;
  padding: 16px;
  margin-bottom: 10px;
`;

export const StatusContainer = styled.View<StatusProps>`
  width: 90px;
  height: 16px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  transform: rotate(-90deg);
  left: -30px;

  ${({ theme, status }) => css`
    background-color: ${
      status === "limpa"
        ? "#D6E4F2"
        : `${theme.COLORS.ACCENT}8C`
    };
  `}
`;

export const StatusTitle = styled.Text`
  font-size: 11px;

  ${({ theme }) => css`
    color: ${theme.COLORS.WHITE};
    font-family: ${theme.FONT_FAMILY.SEMIBOLD};
  `}
`;

export const CardContent = styled.View`
  flex: 1;
  left: -50px;
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

export const IconContainer = styled.View`
  flex-direction: column; 
  align-items: center;
  gap: 12px; 
`;
