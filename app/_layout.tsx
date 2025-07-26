import { useSettingsStore } from '@/store/settingsStore';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { useInitialReloadStateStore } from '@/store/InitialReloadState';

export default function RootLayout() {
  const initialReloadStore = useInitialReloadStateStore() 
  const settingsStore = useSettingsStore() 
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(()=>{
    (async()=>{
      // handle stored settings
      settingsStore.setInitialState()

      // // read previous app state from storage and update store (@dev after this, the list and watches components will read the store to render the data)
      // // this function makes the calculations of the elapsed time since last timestamp snapshot 
      // // and also saves the new data on storage inmediatly 
      
      initialReloadStore.readStorageAndSetStore();

      // // handle concurrent snapshots of state for future opens
      // // @dev if in a future a different main folder than `(tabs)` is created, you can put this below logic on the _layout of `(tabs)` to not call this setInterval unnecesarly (also, remember in that case, to add a return to the useEffect to clear the interval) -> this will update resources comsumption
      let id = setInterval(()=>{
        initialReloadStore.updateStorage()
      }, 5000) 

      return () => clearInterval(id) // clear interval on unmount
    })()
  }, [])

  // console.log(initialReloadStore.firstLoadDone)
  // console.log(initialReloadStore.chronos)
  // console.log(initialReloadStore.timers)
  
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
