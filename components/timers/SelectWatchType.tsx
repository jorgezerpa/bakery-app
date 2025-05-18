import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface SelectWatchTypeProps {
  handleSetWatch: (type: "timer" | "chrono") => void;
}

export const SelectWatchType = ({handleSetWatch}:SelectWatchTypeProps) => {
  return (
      <>
        <View style={{ backgroundColor:"white", height:50, justifyContent:"space-between" }}>
          <TouchableOpacity onPress={()=>handleSetWatch("chrono")}>
              <Text>Chrono</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>handleSetWatch("timer")}>
              <Text>Timer</Text>
          </TouchableOpacity>
        </View> 
      </>
  )
}

