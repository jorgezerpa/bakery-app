import { useSettingsStore } from '@/store/settingsStore';
import { WatchType } from '@/types/shared';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { WatchItem } from './WatchItem';


const TEXTS = {
  "ES": {
    no_watches_created: "dale click al boton de agregar para iniciar un reloj.",
    add_button_text: "Agregar"
  },
  "EN": {
    no_watches_created: "Click add button to display a watch",
    add_button_text: "Add"
  }
}


interface WatchesListProps {
  title: string
}

export const WatchesList = ({title}:WatchesListProps) => {
  const settingsStore = useSettingsStore();
  const [watches, setWatches] = useState<WatchType[]>([])

  const handleAddWatch = () => {
    const newWatch:WatchType = { id:"uniquewatchlistiditem" + Math.random() + Math.random()  }
    setWatches([...watches, newWatch]) 
  }

  const handleDeleteWatch = (idToDelete: string) => {
    setWatches((prev) => 
      prev.filter((item) => item.id !== idToDelete)
    );
  }

  return (
    <>
      <ScrollView>
        <Text style={{ textAlign:"center", fontSize:30, fontWeight:"600", marginBottom:30, marginTop:10 }}>{title}</Text>
        {
          watches.length === 0 && (
            <View style={{ height:350, justifyContent:"center", alignItems:"center", gap:0, paddingHorizontal:20 }}>
              {/* <MaterialIcons size={100} color={"#333"} name='watch-later' /> */}
              <Text style={{ textAlign:"center", color:"#666", fontSize:20 }}>
                { TEXTS[settingsStore.language].no_watches_created }
              </Text>
            </View>
          )
        }
        {
          watches.map((w, i) => (
            <View style={ styles.item } key={w.id} >
              <WatchItem id={w.id} handleDeleteWatch={handleDeleteWatch}/>
            </View>          
          ))
        }
        <View style={{ alignItems:"center" }}>
          <TouchableOpacity onPress={handleAddWatch} style={{ alignItems:"center" }}>
            <MaterialIcons size={70} color={"#000"} name='add-circle' />
            <Text>{ TEXTS[settingsStore.language].add_button_text }</Text>
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
