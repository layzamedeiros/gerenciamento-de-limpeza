import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

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