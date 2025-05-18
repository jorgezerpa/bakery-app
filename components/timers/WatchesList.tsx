import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { WatchItem } from './WatchItem';


interface WatchType {
  id: string
}

export const WatchesList = () => {
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
        {
          watches.length === 0 && (
            <View style={{ height:350, justifyContent:"center", alignItems:"center", gap:0, paddingHorizontal:20 }}>
              <MaterialIcons size={100} color={"#333"} name='watch-later' />
              <Text style={{ textAlign:"center", color:"#666", fontSize:20 }}>
                dale click al boton de agregar para iniciar un reloj.
              </Text>
            </View>
          )
        }
        {
          watches.map((w, i) => (
            <View style={ styles.item } key={w.id} >
              <WatchItem/>
              <TouchableOpacity style={{ top: -30, left: 10, width: 30 }} onPress={()=>handleDeleteWatch(w.id)}>
                <MaterialIcons size={25} color={"#000"} name='delete-outline' />
              </TouchableOpacity>
            </View>          
          ))
        }
        <View style={{ alignItems:"center" }}>
          <TouchableOpacity onPress={handleAddWatch} style={{ alignItems:"center" }}>
            <MaterialIcons size={60} color={"#000"} name='add-circle' />
            <Text>Agregar</Text>
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
    minHeight: 170,
    display:"flex", 
    justifyContent:"space-between",
  }
});
