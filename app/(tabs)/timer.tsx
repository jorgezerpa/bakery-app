import { WatchesList } from '@/components/timers/WatchesList';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';

export default function HomeScreen() {

  return (
    <SafeAreaView style={{ paddingTop:"10%", paddingHorizontal:"2%", backgroundColor:"white", flex:1 }}>
      
      <StatusBar animated={true} backgroundColor="#61dafb" />
      <WatchesList title="Temporizador" />

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