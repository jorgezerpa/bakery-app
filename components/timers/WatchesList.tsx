import React, { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { WatchItem } from './WatchItem';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
];

interface WatchType {
  id: string
}

export const WatchesList = () => {
  const [watches, setWatches] = useState<WatchType[]>([])

  const handleAddWatch = () => {
    const newWatch:WatchType = { id:"uniquewatchlistiditem" + Math.random() + Math.random()  }
    setWatches([...watches, newWatch]) 
  }

  return (
    <>
      <FlatList
          columnWrapperStyle={{ backgroundColor:"white" }}
        data={watches}
        numColumns={2}
        renderItem={({item}) => <WatchItem />}
        // renderItem={({item}) => <Timer />}
        keyExtractor={item => item.id}
      />
      <View style={{ position:"absolute", bottom: 50, right:30 }}>
        <TouchableOpacity onPress={handleAddWatch}>
          <Text>Agregar</Text>
        </TouchableOpacity>
      </View>
    </>
  )
}




// const styles = StyleSheet.create({
//   item: {
//     padding:5,
//     width: "50%",
//     height: 250,
//     display:"flex", justifyContent:"space-between",
//   }
// });
