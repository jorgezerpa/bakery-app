import { useSettingsStore } from '@/store/settingsStore';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const Settings = () => {
  const settingsStore = useSettingsStore();

  return (
    <>
      <ScrollView>
        <Text style={{ textAlign:"center", fontSize:30, fontWeight:"600", marginBottom:50, marginTop:10 }}>Opciones</Text>

        <View style={{  }}>
            <Text style={{ textAlign:"left", fontSize:20, fontWeight:"400", marginBottom:15, marginTop:0 }}>Mantener Encendido</Text>
            <TouchableOpacity onPress={()=>settingsStore.setKeepAwake(true)}>
            <Text style={{ color: settingsStore.keepAwake ? "green" : "grey", textAlign:"left", fontSize:20, fontWeight:"400", marginBottom:15, marginTop:0 }}>Si</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>settingsStore.setKeepAwake(false)}>
            <Text style={{ color: !settingsStore.keepAwake ? "green" : "grey", textAlign:"left", fontSize:20, fontWeight:"400", marginBottom:15, marginTop:0 }}>No</Text>
            </TouchableOpacity>
        </View>
        <View>
            <Text style={{ textAlign:"left", fontSize:20, fontWeight:"400", marginBottom:15, marginTop:0 }}>idioma</Text>
            <TouchableOpacity onPress={()=>settingsStore.setLanguage("ES")}>
            <Text style={{ color: settingsStore.language=="ES"?"green":"grey",  textAlign:"left", fontSize:20, fontWeight:"400", marginBottom:15, marginTop:0 }}>Espanol</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>settingsStore.setLanguage("EN")}>
            <Text style={{ color: settingsStore.language=="EN"?"green":"grey", textAlign:"left", fontSize:20, fontWeight:"400", marginBottom:15, marginTop:0 }}>Ingles</Text>
            </TouchableOpacity>
        </View>        

        <View style={{height:100}} />
      </ScrollView>
    </>
  )
}




const styles = StyleSheet.create({
  item: {
    padding:5,
    width: "100%",
    minHeight: 150,
    display:"flex", 
    justifyContent:"space-between",
  }
});
