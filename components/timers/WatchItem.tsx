import React, { useState } from 'react';
import { View } from 'react-native';
import { Chrono } from './Chrono';
import { SelectWatchType } from './SelectWatchType';
import { Timer } from "./Timer";

export const WatchItem = () => {

  const [type, setType] = useState<null|"chrono"|"timer">(null)

  const handleSetWatch = (type: "timer" | "chrono") => {
    setType(type);
  }

  return (
      <View style={{ borderRadius:10, borderColor:"#ccc", borderWidth:1, flex:1, flexDirection:"row", justifyContent:"space-between", padding:5 }}>
        { type===null && <SelectWatchType handleSetWatch={handleSetWatch} /> }
        { type==="chrono" && <Chrono /> } 
        { type==="timer" && <Timer /> }
      </View>
  )
}




// const styles = StyleSheet.create({
//   item: {
//     padding:5,
//     width: "50%",
//     height: 250,
//     display:"flex", justifyContent:"space-between",
//   },
// });
