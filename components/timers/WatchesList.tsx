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
          watches.map((w, i) => (
            <View style={ styles.item } key={w.id} >
              <WatchItem/>
              <TouchableOpacity onPress={()=>handleDeleteWatch(w.id)}>
                <Text>borrar</Text>
              </TouchableOpacity>
            </View>          
          ))
        }
      </ScrollView>
      <View style={{ position:"absolute", bottom: 50, right:30 }}>
        <TouchableOpacity onPress={handleAddWatch}>
          <Text>Agregar</Text>
        </TouchableOpacity>
      </View>
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
