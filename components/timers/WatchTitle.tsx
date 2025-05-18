import { commonStyles } from '@/styles/common';
import React from 'react';
import { TextInput, View } from 'react-native';

interface WatchTitleProps {
  title: string
  setTitle: any
}

export const WatchTitle = ({setTitle, title}:WatchTitleProps) => {

    return (
      <View>
        <TextInput style={{...commonStyles.watchTitle, maxWidth: 150, paddingHorizontal:10 }} value={title} onChangeText={(t)=>setTitle(t)} placeholder='nombre' placeholderTextColor={"#ccc"} />
      </View>
    )

  }
