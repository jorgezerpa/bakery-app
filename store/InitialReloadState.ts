// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { create } from 'zustand';
import { WatchType } from '@/types/shared';

// @dev this states will be used to be a clone of the current watches states
// it will be updated very N time, and saved on storage
// THIS DATA WILL NOT BE READED DIRECTLY FROM THE COMPONENTS
// the components will read it once on first render directly from the Storage

interface InitialReloadState {
    lastExistTimestamp: number // the timestamp of the latest storage update (executed by calling updateStorage function below)
    chronosList: WatchType[] // list of chronometers
    timersList: WatchType[] // list of timers
    //
    updateStorage: ()=>void // is called in a interval every X seconds (check main layout file) to save all the state values in the device storage
}



// export const useInitialReloadStateStore = create<InitialReloadState>((set) => ({
//     language:"ES",
//     keepAwake: false,

//     setLanguage: async (language) => {
//         await AsyncStorage.setItem(STORAGE_KEYS.language, language); 
//         set((SettingsState) => ({ language }))
//     },
    
//     setKeepAwake: async (keepAwake) => {
//         if(keepAwake) activateKeepAwakeAsync()
//         if(!keepAwake) deactivateKeepAwake()
//         await AsyncStorage.setItem(STORAGE_KEYS.keep_awake, JSON.stringify(keepAwake)); 
//         set((SettingsState) => ({ keepAwake }))
//     },
// }))