import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled, { css } from "styled-components/native";

export const Container = styled(SafeAreaView).attrs({
  edges: ["top"],
})`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    padding: 20,
  },
  showsVerticalScrollIndicator: false
})`
  flex: 1;
`;


export const InfoCard = styled.View`
  background-color: ${({ theme }) => theme.COLORS.PRIMARY_LIGHT};
  padding: 20px;
  border-radius: 12px;
  height: 25%;
  margin-bottom: 18px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const InfoCardTextContainer = styled.View`
  flex: 1;
  margin-right: 15px;
`;

export const InfoCardIconContainer = styled.View`
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  padding: 12px;
  border-radius: 40px; 
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.PRIMARY};
    font-family: ${theme.FONT_FAMILY.BOLD};
  `}
  font-size: 22px;
  text-align: left; 
  margin-bottom: 5px;
`;

export const SubTitle = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.TITLE};
    font-family: ${theme.FONT_FAMILY.REGULAR};
  `}
  font-size: 14px;
  text-align: left; 
  margin-bottom: 15px;
  line-height: 20px;
`;

export const ReportButton = styled(TouchableOpacity)`
  background-color: ${({ theme, disabled }) => disabled ? theme.COLORS.BORDER : theme.COLORS.PRIMARY};
  padding: 14px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

export const ReportButtonText = styled.Text`
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-family: ${({ theme }) => theme.FONT_FAMILY.SEMIBOLD};
  font-size: 16px;
`;

export const SeparatorText = styled.Text`
  color: ${({ theme }) => theme.COLORS.SUBTITLE};
  font-family: ${({ theme }) => theme.FONT_FAMILY.SEMIBOLD};
  font-size: 14px;
  text-align: center;
  margin: 24px 0;
`;

export const ScannerButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  padding-bottom: 40px; 
`;


export const ScannerIconBox = styled.View`
  width: 150px;
  height: 150px;
  align-items: center;
  justify-content: center;
  position: relative; 
`;

export const ScannerIconText = styled.Text`
  color: ${({ theme }) => theme.COLORS.PRIMARY};
  font-family: ${({ theme }) => theme.FONT_FAMILY.SEMIBOLD};
  font-size: 16px;
  margin-top: 8px;
`;

/* --- ESTILOS DO MODAL (Não mudam) --- */
export const ScanMarkerContainer = styled.View`
  width: 250px;
  height: 250px;
  align-self: center;
  border-radius: 10px;
  overflow: hidden; 
  position: relative; 
`;

export const ScanMarker = styled.View`
    width: 250px;
    height: 250px;
    border-width: 2px;
    border-color: white;
    border-radius: 10px;
`;