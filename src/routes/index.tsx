import 'react-native-reanimated';
import { DefaultTheme, NavigationContainer } from "@react-navigation/native"
import { BottomApp } from "./bottomApp.routes"
import { useTheme } from "styled-components/native";
import { UserType } from 'App';

type Props = {
  userType: UserType;
}

export function Routes({ userType }: Props) {
  const theme = useTheme();
  
  const themeNavigation = DefaultTheme;
  themeNavigation.colors.background = theme.COLORS.BACKGROUND
  
  return(
    <NavigationContainer theme={themeNavigation}>
      <BottomApp userType={userType} />
    </NavigationContainer>
  )
}