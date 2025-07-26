import { Language, STORAGE_KEYS } from '@/types/shared';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { activateKeepAwakeAsync, deactivateKeepAwake } from 'expo-keep-awake';
import { create } from 'zustand';

interface SettingsState {
    language: Language
    keepAwake: boolean
    setLanguage: (language:Language) => void
    setKeepAwake: (keepAwake:boolean) => void
    setInitialState: () => void // reads the storage to set properties to the saved value
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
    setInitialState: async() => {
        // KEEP AWAKE -> read from storage and custom logic
        let _keepAwake = await AsyncStorage.getItem(STORAGE_KEYS.keep_awake)
        let keep_awake:boolean;
        if(_keepAwake) { // if not null
            keep_awake = JSON.parse(_keepAwake)
            if(keep_awake) activateKeepAwakeAsync() // if its true
        } 

        // LANG -> read from storage and custom logic
        let language = await AsyncStorage.getItem(STORAGE_KEYS.language)
        
        // set states for all values
        set((SettingsState) => ({ 
            language: language ? language as Language : "ES",
            keepAwake: keep_awake
        }))
    }
}))