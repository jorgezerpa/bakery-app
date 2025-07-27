import { useInitialReloadStateStore } from '@/store/InitialReloadState';
import { useSettingsStore } from '@/store/settingsStore';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const initialReloadState = useInitialReloadStateStore()
  const settingsStore = useSettingsStore() 
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(()=>{
    (async()=>{
      // handle stored settings
      settingsStore.setInitialState()
      initialReloadState.readStorageAndSetStore()
    })()
  }, [])

  
  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }


  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      {/* <StatusBar style="auto" backgroundColor="#61dafb" /> */}
    </ThemeProvider>
  );
}
