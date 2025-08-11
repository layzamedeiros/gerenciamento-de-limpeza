import theme from '@theme/index';
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;

export const LoadingIcon = styled.ActivityIndicator.attrs({
  size: 24,
  color: theme.COLORS.PRIMARY
})``;