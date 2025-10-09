import styled from 'styled-components/native';
import { TextInput } from 'react-native';
import { MagnifyingGlassIcon, SlidersHorizontalIcon } from 'phosphor-react-native';

export const Container = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  height: 50px;
  margin-bottom: 16px;
  gap: 10px;
`;

export const InputContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.COLORS.BORDER};
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  padding: 0 12px;
`;

export const SearchIcon = styled(MagnifyingGlassIcon).attrs(({ theme }) => ({
  size: 24,
  color: theme.COLORS.SUBTITLE,
}))`
  margin-right: 8px;
`;

export const Input = styled(TextInput).attrs(({ theme }) => ({
  placeholderTextColor: theme.COLORS.SUBTITLE,
}))`
  flex: 1;
  font-size: 16px;
  color: ${({ theme }) => theme.COLORS.TITLE};
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
`;

export const FilterButton = styled.TouchableOpacity`
  padding: 4px;
`;

export const FilterIcon = styled(SlidersHorizontalIcon).attrs(({ theme }) => ({
  size: 32,
  color: theme.COLORS.PRIMARY,
  weight: 'bold',
}))``;