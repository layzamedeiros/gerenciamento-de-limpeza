import styled, { css } from "styled-components/native";

type InputProps = {
  error: boolean;
}

export const Container = styled.View<{ flex: number }>`
  flex-direction: column;
  gap: 3px;
`;

export const InputName = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.SEMIBOLD};
    color: ${theme.COLORS.TITLE};
  `}
  font-size: 14px;
`

export const Input = styled.TextInput.attrs(({ theme }) => ({
  placeholderTextColor: theme.COLORS.PLACEHOLDER,
}))<InputProps>`
  ${({ theme, error }) => css`
    background-color: ${theme.COLORS.WHITE};
    border-color: ${error ? theme.COLORS.DANGER : theme.COLORS.BORDER};
    color: ${theme.COLORS.TITLE};
  `}

  height: 40px;
  border-radius: 8px; 
  border-width: 1px;
  padding: 0 15px;
  font-size: 14px;
`;

export const ErrorText = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.REGULAR};
    color: ${theme.COLORS.DANGER};
  `}
  font-size: 12px;
  margin-left: 8px;
`;
