import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { usePathname } from 'expo-router';
import { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Chrono } from './Chrono';
import { SelectWatchType } from './SelectWatchType';
import { Timer } from "./Timer";


export const WatchItem = ({id, handleDeleteWatch}:{id:string, handleDeleteWatch:any}) => {
  const pathname = usePathname();
  // @dev if you wish to allow the user to select the type of watch, you can set this value initially to null so the SelectWatchType component is shown (it already has the logic to set the type by clicking it)
  const [type, setType] = useState<null|"chrono"|"timer">(pathname === "/timer" ? "timer" : pathname === "/" ? "chrono" : null);
  const handleSetWatch = (type: "timer" | "chrono") => {
    setType(type);
  }

  return (
      <View style={{ borderRadius:10, borderColor:"#ccc", borderWidth:2, flex:1, flexDirection:"row", justifyContent:"space-between", padding:5 }}>
        { type===null && <SelectWatchType handleSetWatch={handleSetWatch} /> }
        { type==="chrono" && <Chrono /> } 
        { type==="timer" && <Timer /> }
        <TouchableOpacity style={{ width: 30, position:"absolute", left:9, bottom:5 }} onPress={()=>handleDeleteWatch(id)}>
          <MaterialIcons size={25} color={"#000"} name='delete-outline' />
        </TouchableOpacity>
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
