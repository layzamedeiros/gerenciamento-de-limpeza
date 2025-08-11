import { ThemeProvider } from 'styled-components/native';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_700Bold } from '@expo-google-fonts/inter';

import { Home } from '@screens/Home';
import { Loading } from '@components/Loading';

import theme from '@theme/index';

export default function App() {
  const [ fontsLoaded ] = useFonts({ Inter_400Regular, Inter_500Medium, Inter_700Bold });

  return (
    <ThemeProvider theme={theme}>
      { fontsLoaded ? <Home /> : <Loading /> }
    </ThemeProvider>
  );
}