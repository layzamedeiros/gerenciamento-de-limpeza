import { ThemeProvider } from 'styled-components/native';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';

import { Loading } from '@components/Loading';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import theme from '@theme/index';
import { Routes } from '@routes/index';
import { useState } from 'react';

export type UserType = 'admin' | 'common';

export default function App() {
  const [ fontsLoaded ] = useFonts({ Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold });
  const [userType, setUserType] = useState<UserType>('admin');

  return (
    <SafeAreaProvider>
    <ThemeProvider theme={theme}>
       <Routes userType={userType} />
    </ThemeProvider>
    </SafeAreaProvider>
  );
}