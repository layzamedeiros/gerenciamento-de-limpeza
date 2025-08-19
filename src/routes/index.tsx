import 'react-native-reanimated';
import { DefaultTheme, NavigationContainer } from "@react-navigation/native"
import { BottomApp } from "./bottomApp.routes"
import { Login} from '@screens/Login/index';
import { useTheme } from "styled-components/native";
import { ActivityIndicator, View } from 'react-native';
import { useAuth } from '@contexts/AuthContext';

export function Routes() {
  const { user, isAppLoading } = useAuth();
  const theme = useTheme();
  
  const themeNavigation = DefaultTheme;
  themeNavigation.colors.background = theme.COLORS.BACKGROUND
  
  if (isAppLoading) {
  return(
     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
  );
}
  return user ? <Routes /> : <Login />;
}