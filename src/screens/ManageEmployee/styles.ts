import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled, { css } from "styled-components/native";

export const Container = styled(SafeAreaView).attrs({
  edges: ["right", "top", "left"],
})`
  flex: 1;
`;

export const Content = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
  padding: 15px 20px 0px 20px;
`;

export const FilterContainer = styled.View` 
  flex-direction: row;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 20px; 
`;

export const StyledScroll = styled.ScrollView.attrs(() => ({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: 20
  },
}))``;


export const Button = styled(TouchableOpacity)`
  background-color: ${({ theme }) => theme.COLORS.PRIMARY};
  padding: 12px;
  border-radius: 8px;
  justify-content: center;
  flex-direction: row;
  margin-bottom: 20px;
  gap: 5px;
`;

export const ButtonText = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.WHITE};
    font-family: ${theme.FONT_FAMILY.SEMIBOLD};
  `}
  font-size: 14px;
`;