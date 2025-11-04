import styled, { css } from "styled-components/native";

export const ModalOverlay = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, .4);
`;

export const ModalContainer = styled.View`
  width: 90%;
  max-height: 85%;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
  border-radius: 12px;
  padding: 22px;
  gap: 20px;
`;

export const ModalTitle = styled.Text`
  font-size: 20px;
  text-align: center;
  margin-bottom: 2px;
  ${({ theme }) => css`
    color: ${theme.COLORS.TITLE};
    font-family: ${theme.FONT_FAMILY.BOLD};
  `};
`;

export const InputContainer = styled.View`
  gap: 8px;
`;

export const LabelContainer = styled.View`
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;

export const Label = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.SEMIBOLD};
    color: ${theme.COLORS.TITLE};
  `}
  font-size: 16px;
`;

export const CleanFilterButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.55
})`
  padding: 4px 6px;
`;

export const StatusRoomButtonContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 26px;
`;

export const StatusRoomButton = styled.TouchableOpacity.attrs({ 
  activeOpacity: 0.55
})`
  ${({ theme }) => css`
    background-color: ${theme.COLORS.PRIMARY};
  `}
  padding: 6px 16px;
  border-radius: 8px;
`;

export const StatusRoomText = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.WHITE};
    font-family: ${theme.FONT_FAMILY.REGULAR};
  `}
  font-size: 14px;
`;

export const CleanFilterText = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.BOLD};
    color: ${theme.COLORS.PRIMARY};
  `}
  font-size: 13px;
`;

export const CapacityContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 20px;
`;

export const ModalButtons = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 14px;
`;

type ModalButtonProps = {
  variant: 'cancel' | 'success';
}

export const ModalButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6
})<ModalButtonProps>`
  ${({ theme, variant }) => css`
    background-color: ${variant === 'success' ? theme.COLORS.PRIMARY : theme.COLORS.WHITE};
    ${variant === 'cancel' && css`
      margin-right: 10px;
    `}
    ${variant === 'success' && css`
      margin-left: 10px;
    `};
    border-color: ${theme.COLORS.PRIMARY};
  `}
  
  flex: 1;
  padding: 8px 10px;
  border-radius: 8px;
  border-width: 1px;
  align-items: center;
`;

export const ModalButtonText = styled.Text<ModalButtonProps>`
  font-size: 14px;
  ${({ theme, variant }) => css`
    font-family: ${theme.FONT_FAMILY.SEMIBOLD};
    color: ${variant === "success" ? theme.COLORS.WHITE : theme.COLORS.PRIMARY};
  `};
`;
