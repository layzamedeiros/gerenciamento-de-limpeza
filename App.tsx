// O import da StatusBar agora vem de 'expo-status-bar'
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components/native';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import { Loading } from '@components/Loading';
import theme from '@theme/index';
import { Routes } from '@routes/index';
import { AuthProvider } from '@contexts/AuthContext';
import { RoomsProvider } from '@contexts/RoomsContext';
import { EmployeeProvider } from '@contexts/EmployeeContext';
import { MenuProvider } from 'react-native-popup-menu';

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return <Loading />;
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" translucent />
      <ThemeProvider theme={theme}>
        <MenuProvider>
          <AuthProvider>
            <RoomsProvider>
              <EmployeeProvider>
                  <Routes />
                  <Toast />
              </EmployeeProvider>
            </RoomsProvider>
          </AuthProvider>
        </MenuProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}