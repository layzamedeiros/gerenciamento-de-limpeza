import { SafeAreaView } from "react-native-safe-area-context";
import styled, { css } from "styled-components/native";

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;

export const Content = styled.View`
  flex: 1;
  padding: 15px 20px 0px 20px; 
`;

export const GoBackButton = styled.TouchableOpacity`
  align-items: center;
  flex-direction: row;
`;

export const GoBackButtonText = styled.Text`
  font-size: 14px;
  margin-left: 2px;

 ${({ theme }) => css`
  font-family: ${theme.FONT_FAMILY.MEDIUM};
  color: ${theme.COLORS.PRIMARY};
 `}
`;

export const TopBarContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const MarkAllButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

export const MarkAllButtonText = styled.Text`
  font-size: 14px;
  margin-left: 4px;

 ${({ theme }) => css`
  font-family: ${theme.FONT_FAMILY.MEDIUM};
  color: ${theme.COLORS.PRIMARY};
 `}
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const EmptyListText = styled.Text`
  text-align: center;
  margin-top: 50px;
  font-size: 16px;

 ${({ theme }) => css`
  font-family: ${theme.FONT_FAMILY.REGULAR};
  color: ${theme.COLORS.GREY};
 `}
`;

export const NotificationItemContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: flex-start;
  padding: 16px;
  margin-bottom: 12px;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  border-radius: 8px;
  border: 0.8px;
  border-color: ${({ theme }) => theme.COLORS.GREY};
`;

export const UnreadIndicator = styled.View`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.COLORS.PRIMARY};
  margin-right: 12px;
  margin-top: 8px; 
`;

export const IconContainer = styled.View`
  margin-right: 12px;
  margin-top: -2px; 
`;

export const MainContent = styled.View`
  flex: 1;
`;

export const TopRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

export const NotificationText = styled.Text`
  flex: 1; 
  font-size: 15px;
  line-height: 22px;
  margin-right: 8px; 

 ${({ theme }) => css`
  font-family: ${theme.FONT_FAMILY.REGULAR};
  color: ${theme.COLORS.SUBTITLE};
 `}
`;

export const NotificationTime = styled.Text`
  font-size: 12px;

 ${({ theme }) => css`
  font-family: ${theme.FONT_FAMILY.REGULAR};
  color: ${theme.COLORS.GREY};
 `}
`;