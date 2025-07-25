import { useSettingsStore } from '@/store/settingsStore';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const TEXTS = {
  "ES": {
    title: "Opciones",
    keep_screen_awake: "Mantener pantalla encendida",
    yes: "si",
    no: "no",
    language: "Idioma",
    spanish: "Espanol",
    english: "Ingles",
  },
  "EN": {
    title: "Options",
    keep_screen_awake: "Keep screen awake",
    yes: "yes",
    no: "no",
    language: "Language",
    spanish: "Spanish",
    english: "English",
  }
}

export const Settings = () => {
  const settingsStore = useSettingsStore();

  return (
    <>
      <ScrollView>
        <Text style={{ textAlign:"center", fontSize:30, fontWeight:"600", marginBottom:50, marginTop:10 }}>{TEXTS[settingsStore.language].title}</Text>

        <View style={{  }}>
            <Text style={{ textAlign:"left", fontSize:20, fontWeight:"400", marginBottom:15, marginTop:0 }}>{TEXTS[settingsStore.language].keep_screen_awake}</Text>
            <TouchableOpacity onPress={()=>settingsStore.setKeepAwake(true)}>
            <Text style={{ color: settingsStore.keepAwake ? "green" : "grey", textAlign:"left", fontSize:20, fontWeight:"400", marginBottom:15, marginTop:0 }}>{ TEXTS[settingsStore.language].yes }</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>settingsStore.setKeepAwake(false)}>
            <Text style={{ color: !settingsStore.keepAwake ? "green" : "grey", textAlign:"left", fontSize:20, fontWeight:"400", marginBottom:15, marginTop:0 }}>{ TEXTS[settingsStore.language].no }</Text>
            </TouchableOpacity>
        </View>
        <View>
            <Text style={{ textAlign:"left", fontSize:20, fontWeight:"400", marginBottom:15, marginTop:0 }}>{ TEXTS[settingsStore.language].language }</Text>
            <TouchableOpacity onPress={()=>settingsStore.setLanguage("ES")}>
            <Text style={{ color: settingsStore.language=="ES"?"green":"grey",  textAlign:"left", fontSize:20, fontWeight:"400", marginBottom:15, marginTop:0 }}>{ TEXTS[settingsStore.language].spanish }</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>settingsStore.setLanguage("EN")}>
            <Text style={{ color: settingsStore.language=="EN"?"green":"grey", textAlign:"left", fontSize:20, fontWeight:"400", marginBottom:15, marginTop:0 }}>{ TEXTS[settingsStore.language].english }</Text>
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
