import 'react-native-reanimated';
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { useTheme } from "styled-components/native";
import { ActivityIndicator, View } from 'react-native';

import { useAuth } from '@contexts/AuthContext';
import { Login } from '@screens/Login'; 
import { AppRoutes } from './app.routes';

export function Routes() {
  const { user, isAppLoading } = useAuth();
  const theme = useTheme();
  
  const themeNavigation = DefaultTheme;
  themeNavigation.colors.background = theme.COLORS.BACKGROUND;
  
  if (isAppLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={theme.COLORS.PRIMARY} />
      </View>
    );
  }

  return (
    <NavigationContainer theme={themeNavigation}>
      {user ? <AppRoutes /> : <Login />}
    </NavigationContainer>
  );
}
