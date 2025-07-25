import { WatchesList } from '@/components/timers/WatchesList';
import { useSettingsStore } from '@/store/settingsStore';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';

const TEXTS = {
  "ES": {
    title: "Temporizador"
  },
  "EN": {
    title: "Timer"
  }
}

export default function HomeScreen() {
  const settingsStore = useSettingsStore();

  return (
    <SafeAreaView style={{ paddingTop:"10%", paddingHorizontal:"2%", backgroundColor:"white", flex:1 }}>
      
      <StatusBar animated={true} backgroundColor="#61dafb" />
      <WatchesList title={TEXTS[settingsStore.language].title} />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  timerBox: {
    // backgroundColor: "#ccc",
    height: 100,
    width: "50%"
  }
});