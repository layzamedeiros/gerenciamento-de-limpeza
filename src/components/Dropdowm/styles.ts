import styled, { css } from "styled-components/native";
import { CaretDownIcon, CaretUpIcon } from "phosphor-react-native";
import { FlatList, ScrollView } from "react-native";

type DropdownContainerProps = {
  pressed: boolean;
  isInvalid: boolean;
}

type DropdownItemContainerProps = {
  index: number;
  lenght: number;
}

export const Container = styled.View`
  flex-direction: column;
  position: relative;
  width: 100%;
  gap: 3px;
`;

export const DropdownText = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.SEMIBOLD};
    color: ${theme.COLORS.TITLE};
  `}
  font-size: 14px;
`

export const DropdownContainer = styled.Pressable<DropdownContainerProps>`
  ${({ theme, pressed, isInvalid }) => css`
    background-color: ${theme.COLORS.WHITE};
    border-color: ${isInvalid ? theme.COLORS.DANGER : theme.COLORS.BORDER};
    
    border-bottom-width: 1px;

    border-bottom-left-radius: ${pressed ? "0px" : "8px"};
    border-bottom-right-radius: ${pressed ? "0px" : "8px"};
    `}
  border-top-width: 1px;
  border-left-width: 1px;
  border-right-width: 1px;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  flex-direction: row;
  padding: 0px 15px;
  height: 40px;
  align-items: center;
  justify-content: space-between;
`;

export const TextDropdown = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.REGULAR};
    color: ${theme.COLORS.TITLE};
  `}
  font-size: 14px;
  max-width: 90%;
`;

export const TextDropdownPlaceholder = styled(TextDropdown)`
  color: ${({ theme }) => theme.COLORS.PLACEHOLDER};
`

export const ArrowDown = styled(CaretDownIcon).attrs(({ theme }) => ({
  color: theme.COLORS.PRIMARY,
  size: 20,
  weight: "bold"
}))``;

export const ArrowUp = styled(CaretUpIcon).attrs(({ theme }) => ({
  color: theme.COLORS.PRIMARY,
  size: 20,
  weight: "bold"
}))``;

export const ListContainer = styled.ScrollView`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;

  border-left-width: 1px;
  border-right-width: 1px;
  border-bottom-width: 1px;
  
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
  
  z-index: 10;
  max-height: 130px;
  
  ${({ theme }) => css`
    border-color: ${theme.COLORS.BORDER};
    background-color: ${theme.COLORS.WHITE};
  `}
`

export const DropdownItemContainer = styled.Pressable<DropdownItemContainerProps>`
  ${({ theme, index }) => css`
    background-color: ${theme.COLORS.WHITE};
    border-top-width: ${index === 0 ? "0px" : "1px"};
    border-color: ${theme.COLORS.BORDER};
  `}

  border-top-right-radius: 0px;
  border-top-left-radius: 0px;
  flex-direction: row;
  padding: 0px 15px;
  height: 40px;
  align-items: center;
  justify-content: space-between;
`;
