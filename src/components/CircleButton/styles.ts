import styled from "styled-components/native";

export const Container = styled.Pressable`
  background-color: ${({ theme }) => theme.COLORS.ACCENT};
  padding: 4px;
  border-radius: 50%;
  position: absolute;
  z-index: 50;
  right: 20px;
  bottom: 15px;
`;
