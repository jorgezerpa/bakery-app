import { commonStyles } from '@/styles/common';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface SelectWatchTypeProps {
  handleSetWatch: (type: "timer" | "chrono") => void;
}

export const SelectWatchType = ({handleSetWatch}:SelectWatchTypeProps) => {
  return (
      <>
        <View style={{ flex:1, justifyContent:"center", alignItems:"center", gap:20 }}>
          <TouchableOpacity onPress={()=>handleSetWatch("chrono")}>
              <Text style={{ ...commonStyles.watchTitle, textAlign:"center" }}>Cronometro</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>handleSetWatch("timer")}>
              <Text style={{ ...commonStyles.watchTitle, textAlign:"center" }}>Temporizador</Text>
          </TouchableOpacity>
        </View> 
      </>
  )
}

