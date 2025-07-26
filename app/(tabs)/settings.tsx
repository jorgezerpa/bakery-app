// @dev Index tab is the `Cronometro` tab, the first one open when the app starts
import { Settings } from '@/components/settings/Settings';
import { SafeAreaView, StyleSheet } from 'react-native';

export default function HomeScreen() {

  return (
    <SafeAreaView style={{ paddingTop:"10%", paddingHorizontal:"2%", backgroundColor:"white", flex:1 }}>
      
      {/* <StatusBar animated={true} backgroundColor="#61dafb" /> */}
      <Settings />

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