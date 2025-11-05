import styled, { css } from "styled-components/native";
import { TouchableOpacity, TextInput } from "react-native";
import { ScrollView } from "react-native";

export const StyledScroll = styled(ScrollView).attrs(() => ({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: 20,
  },
}))``;

export const ModalOverlay = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
`;

export const ModalContainer = styled.View`
  width: 90%;
  max-height: 96%;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  border-radius: 12px;
  padding: 24px;
  align-items: stretch;
`;

export const ModalTitle = styled.Text`
  font-size: 20px;
  text-align: center;
  margin-bottom: 10px;
  ${({ theme }) => css`
    color: ${theme.COLORS.PRIMARY};
    font-family: ${theme.FONT_FAMILY.BOLD};
  `};
`;

export const TitleInput = styled.Text`
  font-size: 14px;
  margin-top: 12px;
  margin-bottom: 6px;
  ${({ theme }) => css`
    color: ${theme.COLORS.TITLE};
    font-family: ${theme.FONT_FAMILY.SEMIBOLD};
  `};
`;

export const Input = styled(TextInput).attrs(({ theme }) => ({
  placeholderTextColor: theme.COLORS.PLACEHOLDER,
}))`
  width: 100%;
  height: 50px;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  border-radius: 8px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.COLORS.BORDER};
  padding: 0 15px;
  font-size: 14px;
  color: ${({ theme }) => theme.COLORS.TITLE};
`;

export const GroupDropdownButton = styled(TouchableOpacity)`
  width: 100%;
  height: 50px;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  border-radius: 8px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.COLORS.BORDER};
  padding: 0 15px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 6px;
`;

export const DropdownText = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.COLORS.PLACEHOLDER};
`;

export const GroupSelectionContainer = styled.View`
  border-width: 1px;
  border-color: ${({ theme }) => theme.COLORS.BORDER};
  border-radius: 8px;
  margin-top: 5px;
  padding: 5px 0;
  overflow: hidden;
`;

export const GroupOption = styled(TouchableOpacity)<{ isSelected: boolean }>`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  background-color: ${({ theme, isSelected }) =>
    isSelected ? theme.COLORS.PRIMARY_LIGHT : theme.COLORS.WHITE};
`;

export const GroupOptionText = styled.Text<{ isSelected: boolean }>`
  font-size: 14px;
  ${({ theme, isSelected }) => css`
    font-family: ${theme.FONT_FAMILY.REGULAR};
    color: ${isSelected ? theme.COLORS.PRIMARY : theme.COLORS.TITLE};
  `};
`;

export const AdminContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
`;

export const AdminTitle = styled.Text`
  font-size: 16px;
  margin-left: 10px;
  ${({ theme }) => css`
    color: ${theme.COLORS.TITLE};
    font-family: ${theme.FONT_FAMILY.REGULAR};
  `}
`;

export const ModalButtons = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 24px;
`;

type ModalButtonProps = {
  variant: "cancel" | "success";
};

export const ModalButton = styled(TouchableOpacity)<ModalButtonProps>`
  flex: 1;
  padding: 10px;
  border-radius: 8px;
  align-items: center;
  border-width: 1px;

  background-color: ${({ theme, variant }) =>
    variant === "success" ? theme.COLORS.PRIMARY : theme.COLORS.WHITE};

  border-color: ${({ theme, variant }) =>
    variant === "success" ? theme.COLORS.PRIMARY : theme.COLORS.PRIMARY};

  ${({ variant }) =>
    variant === "cancel" &&
    css`
      margin-right: 10px;
    `}

  ${({ variant }) =>
    variant === "success" &&
    css`
      margin-left: 10px;
    `};
`;

export const ModalButtonText = styled.Text<ModalButtonProps>`
  font-size: 14px;
  ${({ theme, variant }) => css`
    font-family: ${theme.FONT_FAMILY.SEMIBOLD};
    color: ${variant === "success" ? theme.COLORS.WHITE : theme.COLORS.PRIMARY};
  `};
`;
