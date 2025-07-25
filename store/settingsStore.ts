import { STORAGE_KEYS } from '@/types/shared';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { activateKeepAwakeAsync, deactivateKeepAwake } from 'expo-keep-awake';
import { create } from 'zustand';

type Language = "EN"|"ES";

interface SettingsState {
    language: Language
    keepAwake: boolean
    setLanguage: (language:Language) => void
    setKeepAwake: (keepAwake:boolean) => void
}

export const useSettingsStore = create<SettingsState>((set) => ({
    language:"ES",
    keepAwake: false,

    setLanguage: async (language) => {
        await AsyncStorage.setItem(STORAGE_KEYS.language, language); 
        set((SettingsState) => ({ language }))
    },
    
    setKeepAwake: async (keepAwake) => {
        if(keepAwake) activateKeepAwakeAsync()
        if(!keepAwake) deactivateKeepAwake()
        await AsyncStorage.setItem(STORAGE_KEYS.keep_awake, JSON.stringify(keepAwake)); 
        set((SettingsState) => ({ keepAwake }))
    },
}))