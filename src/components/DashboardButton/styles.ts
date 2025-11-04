import styled, { css } from "styled-components/native";

export const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 1
})`
  background-color: ${({ theme })  => theme.COLORS.WHITE};
  width: 333px;
  height: 100px;
  padding: 10px;
  border-radius: 14px;
  flex-direction: column;
  align-items: center;
`;

export const Content = styled.View`
  width: 340px;
  padding: 20px;
  flex: 1;
  align-items: center;
  gap: 25px;
  flex-direction: row;
`;

export const IconWrapper = styled.View`  
  align-items: center;
`;

export const Description = styled.View`
  flex-direction: column;
  justify-content: center;
  width: 80%;
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.PRIMARY};
    font-family: ${theme.FONT_FAMILY.SEMIBOLD};
  `}
  font-size: 16px;
  margin-top: 8px;
`;

export const SubTitle = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.PRIMARY};
    font-family: ${theme.FONT_FAMILY.MEDIUM};
  `}
  font-size: 14px;
`;