import { ThemeProvider } from 'styled-components/native';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_700Bold } from '@expo-google-fonts/inter';

import { Loading } from '@components/Loading';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import theme from '@theme/index';
import { Routes } from '@routes/index';

export default function App() {
  const [ fontsLoaded ] = useFonts({ Inter_400Regular, Inter_500Medium, Inter_700Bold });

  return (
    <SafeAreaProvider>
    <ThemeProvider theme={theme}>
      { fontsLoaded ? <Routes /> : <Loading /> }
    </ThemeProvider>
    </SafeAreaProvider>
  );
}