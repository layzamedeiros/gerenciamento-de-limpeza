import { ThemeProvider } from 'styled-components/native';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';

import { Loading } from '@components/Loading';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import theme from '@theme/index';
import { Routes } from '@routes/index';
import { AuthProvider } from '@contexts/AuthContext';
import { SalasProvider } from '@contexts/RoomsContext';
import { EmployeeProvider } from '@contexts/EmployeeContext';
import Toast from 'react-native-toast-message';

export default function App() {
  const [ fontsLoaded ] = useFonts({ Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold });

  return (
    <SafeAreaProvider>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <SalasProvider>
          <EmployeeProvider>
            <Routes />
            <Toast />
          </EmployeeProvider>
        </SalasProvider>
      </AuthProvider>
    </ThemeProvider>
    </SafeAreaProvider>
  );
}