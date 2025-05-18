import { Image, StyleSheet, Text, View } from 'react-native';

export default function TabTwoScreen() {
  return (
    <View style={{ flex:1, justifyContent:"center", alignItems:"center" }}>
      <Image
        source={require('@/assets/images/pato.png')}
        style={{ width: 200, height: 200, marginBottom: 20 }}
      />
      <Text style={{ fontSize:30, fontWeight:"600" }}>Under construction</Text>
      <Text style={{ fontSize:16 }}>come back later</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
