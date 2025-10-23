import styled from "styled-components/native";

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6
})`
  background-color: ${({ theme }) => theme.COLORS.ACCENT};
  padding: 4;
  border-radius: 50%
`;
