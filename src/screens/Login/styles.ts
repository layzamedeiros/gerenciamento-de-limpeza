import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND}; 
  justify-content: center;
  padding: 0 35px ;
`;

export const Logo = styled.Image`
  width: 255px; 
  height: 80px;
  resize: contain;
  align-self: center; 
  margin-bottom: 35px;
`;

export const Title = styled.Text`
${({ theme }) => css`
  font-family: ${theme.FONT_FAMILY.BOLD};
  color: ${theme.COLORS.PRIMARY};
`}
  font-size: 30px;
  text-align: center;
`;

export const Subtitle = styled.Text`
${({ theme }) => css`
  font-family: ${theme.FONT_FAMILY.SEMIBOLD};
  color: ${theme.COLORS.PRIMARY};
`}
  font-size: 18px;
  margin-bottom: 30px;
  text-align: center;
`;

export const InputContainer = styled.View`
  width: 100%;
  height: 55px;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  border-radius: 8px; 
  border: 1px;
  border-color: ${({ theme }) => theme.COLORS.BORDER};
  margin-bottom: 15px;
  flex-direction: row;
  align-items: center;
  padding: 0 20px;
`;

export const Input = styled.TextInput`
  flex: 1;
  font-size: 16px;
  color: ${({ theme }) => theme.COLORS.TITLE};
  margin-left: 10px;
`;

export const LoginButton = styled.TouchableOpacity`
  width: 100%;
  height: 55px;
  background-color: ${({ theme }) => theme.COLORS.PRIMARY}; 
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
`;

export const LoginButtonText = styled.Text`
  color:  ${({ theme }) => theme.COLORS.WHITE};
  font-size: 18px;
  font-weight: bold;
`;
