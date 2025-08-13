import 'react-native-reanimated';
import { DefaultTheme, NavigationContainer } from "@react-navigation/native"
import { BottomApp } from "./bottomApp.routes"
import { useTheme } from "styled-components/native";

export function Routes() {
  const theme = useTheme();
  
  const themeNavigation = DefaultTheme;
  themeNavigation.colors.background = theme.COLORS.BACKGROUND
  
  return(
    <NavigationContainer theme={themeNavigation}>
      <BottomApp />
    </NavigationContainer>
  )
}