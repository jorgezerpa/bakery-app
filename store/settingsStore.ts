import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

type Language = "EN"|"ES";

interface STORAGE_KEYS_TYPES {
    language: string
    keep_awake: string
}

const STORAGE_KEYS:STORAGE_KEYS_TYPES = {
    language: "0x_ovenflow_language",
    keep_awake: "0x_ovenflow_keep_awake",
}

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
        await AsyncStorage.setItem(STORAGE_KEYS.keep_awake, JSON.stringify(keepAwake)); 
        set((SettingsState) => ({ keepAwake }))
    },
}))