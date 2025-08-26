import styled, { css } from "styled-components/native";

export const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 1
})`
  background-color: ${({ theme })  => theme.COLORS.PRIMARY};
  max-width: 47.5%;
  aspect-ratio: 160 / 180;
  padding: 10px;
  border-radius: 14px;
  justify-content: space-between;
  align-items: center;
`;

export const Content = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const IconWrapper = styled.View`  
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.WHITE};
    font-family: ${theme.FONT_FAMILY.SEMIBOLD};
  `}
  font-size: 16px;
  text-align: center;
  margin-top: 8px;
`;

export const SubTitle = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.WHITE};
    font-family: ${theme.FONT_FAMILY.MEDIUM};
  `}
  font-size: 14px;
  text-align: center;
`;