import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND}; 
  align-items: center;
  justify-content: center;
  padding: 40px;
`;

export const Logo = styled.Image`
  width: 180px;
  height: 60px;
  margin-bottom: 20px;
`;

export const Title = styled.Text`
${({ theme }) => css`
  font-family: ${theme.FONT_FAMILY.BOLD};
  color: ${theme.COLORS.PRIMARY}
`}
  font-size: 30px;
`;

export const Subtitle = styled.Text`
${({ theme }) => css`
  font-family: ${theme.FONT_FAMILY.SEMIBOLD};
  color: ${theme.COLORS.PRIMARY}
`}
  font-size: 20px;
  margin-bottom: 40px;
`;

export const InputContainer = styled.View`
  width: 100%;
  height: 55px;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  border-radius: 30px; 
  border: 1px;
  border-left-color: ${({ theme }) => theme.COLORS.BORDER};
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
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

export const LoginButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
`;
