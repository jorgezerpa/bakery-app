import { STORAGE_KEYS } from '@/types/shared';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { activateKeepAwakeAsync } from 'expo-keep-awake';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {  
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  useEffect(()=>{
    (async()=>{
      let isKeepAwakeEnabled = await AsyncStorage.getItem(STORAGE_KEYS.keep_awake)
      if(isKeepAwakeEnabled == null) return 
      isKeepAwakeEnabled = JSON.parse(isKeepAwakeEnabled)
      if(isKeepAwakeEnabled){
        activateKeepAwakeAsync()
      }
    })()
  }, [])

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" backgroundColor="#61dafb" />
    </ThemeProvider>
  );
}
