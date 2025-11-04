import React from 'react';
import { TextInputProps } from 'react-native';
import { Container, InputContainer, SearchIcon, Input, FilterButton, FilterIcon } from './styles';

interface Props extends TextInputProps {
  onFilterPress: () => void;
  filter?: boolean;
}

export function SearchBar({ placeholder, onFilterPress, filter = true, ...rest }: Props) {
  return (
    <Container>
      <InputContainer>
        <SearchIcon />
        <Input
          placeholder={placeholder}
          {...rest}
        />
      </InputContainer>

      { !filter &&
        <FilterButton onPress={onFilterPress}>
          <FilterIcon />
        </FilterButton>
      }
    </Container>
  );
}