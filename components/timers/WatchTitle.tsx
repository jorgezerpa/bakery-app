import { useSettingsStore } from '@/store/settingsStore';
import { commonStyles } from '@/styles/common';
import React from 'react';
import { TextInput, View } from 'react-native';

interface WatchTitleProps {
  title: string
  setTitle: any
}

const TEXTS = {
  "ES": {
    name: "nombre",
  },
  "EN": {
    name: "name",
  }
}

export const WatchTitle = ({setTitle, title}:WatchTitleProps) => {
  const settingsStore = useSettingsStore();

    return (
      <View>
        <TextInput style={{...commonStyles.watchTitle, fontWeight:"800", maxWidth: 150, paddingHorizontal:10 }} value={title} onChangeText={(t)=>setTitle(t)} placeholder={TEXTS[settingsStore.language].name} placeholderTextColor={"#ccc"} />
      </View>
    )

  }
