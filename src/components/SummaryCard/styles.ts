import styled, { css } from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

export const SummaryCardContainer = styled.View`
  background-color: ${({ theme }) => theme.COLORS.PRIMARY_LIGHT};
  border-radius: 12px;
  padding: 24px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 14px;
  margin-bottom: 24px;

`;

export const TextContent = styled.View`
  flex: 1;
  gap: 8px;
  position: relative;
  width: 20%;
`;

export const SummaryTitle = styled.Text`
  font-size: 20px;
  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.BOLD};
    color: ${theme.COLORS.PRIMARY};
  `};
`;

export const SummarySubtitle = styled.Text`
  font-size: 16px;
  width: 60%;
  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.MEDIUM};
    color: ${theme.COLORS.PRIMARY};
  `};
`;

export const DetailsButton = styled(TouchableOpacity)`
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  border-radius: 8px;
  padding: 6px 26px;
  align-self: flex-start;
`;

export const DetailsButtonText = styled.Text`
  font-size: 16px;
  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.BOLD};
    color: ${theme.COLORS.PRIMARY};
  `};
`;

export const IconContainer = styled.View`
  width: 80px;
  height: 80px;
  border-radius: 80px;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  align-items: center;
  justify-content: center;
  position: absolute; 
  z-index: 1; 
  top: 60;
  left: 240;
`;