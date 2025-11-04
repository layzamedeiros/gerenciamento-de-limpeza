import styled, { css } from 'styled-components/native';

type Props = {
  focused: boolean;
  color?: string;
};

export const Container = styled.View`
  align-items: center;
`;

export const PageName = styled.Text<Props>`
  font-size: 12px;
  margin-top: 4px;
  width: 80px;
  text-align: center;
  ${({ theme, focused, color }) => css`
    color: ${color};
    font-family: ${focused ? theme.FONT_FAMILY.BOLD : theme.FONT_FAMILY.REGULAR};
  `};
`;