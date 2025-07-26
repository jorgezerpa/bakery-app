import { STORAGE_KEYS, Watch } from '@/types/shared';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

// @dev this states will be used to be a clone of the current watches states
// it will be updated very N time, and saved on storage
// THIS DATA WILL NOT BE READED DIRECTLY FROM THE COMPONENTS
// the components will read it once on first render directly from the Storage

interface InitialReloadState {
    // flag inititally false, set to true when the first load is done AKA at the end of the readStorageAndSetStore function
    // this will trigger the useEffect in WatchesList.tsx to read the watches from the store
    firstLoadDone: boolean; 
    chronos: { [key: string]: Watch }; // object of chronometers with string keys
    timers: { [key: string]: Watch }; // object of timers with string keys
    //
    updateChrono: (id:string, _watch_data: Watch) => void
    updateTimer: (id:string, _watch_data: Watch) => void
    deleteChrono: (id:string) => void
    deleteTimer: (id:string) => void
    updateStorage: () => void; // is called in an interval every X seconds (check main layout file) to save all the state values in the device storage
    readStorageAndSetStore: () => void
}

// updateChrono and updateTimer are called on the individual interval of each watch
// updateStorage is called in a interval from the main _layout 
// delete functions should be called respectively from each watch 
// this data will be readed in a useEffect inside chronos and timers page

/// Usage places:
// - in timer Timer.tsx and Chrono.tsx: useEffects handle snapshots update -> for creation and update a useEffect who listen for time state changes, for deletion, a useState with a return (component didUnmount) AKA all watch lifecycle's snapshots are handled on the same file
// - updateStorage is called every X seconds in a interval placed on the main _layout.tsx file
// - to read on initial state:
//      - on main _layout call "readStorageAndUpdateState"
//      - the WatchesList commponent reads chronos and timers and update it's array (after firstLoadDone is true)
//      - each watch reads its correspondant value from this store in a useEffect executed just one time on first load

/// Usage places:
// updateStorage is called every X seconds in a interval placed on the main _layout.tsx file
// In WatchesList.tsx, on the add and delete functions, the updateChrono and updateTimer functions are called to add a new watch or delete an existing one.
// In watches list, is a useEffect that listen to the firstLoadDone property, if is true, it reads the chronos and timers and set the { id } object list to render
// 




// start resume makes the same, and why on earth y am savving the start time of the chrono?

export const useInitialReloadStateStore = create<InitialReloadState>((set, get) => ({
    firstLoadDone: false,
    chronos: {},
    timers: {},
    updateChrono: async(id:string, _watch_data: Watch ) => {
        set((state)=>({ 
            chronos: { ...state.chronos, [id]: _watch_data } // upsert pattern
        }))
    },
    updateTimer: async(id:string, _watch_data: Watch) => {
        set((state)=>({ 
            timers: { ...state.timers, [id]: _watch_data } // upsert pattern
        }))
    },
    deleteChrono: async(id:string) => {
        set((state) => {
            const newChronos = { ...state.chronos };
            delete newChronos[id]; // Remove the entry for the given id
            return { chronos: newChronos };
        });
    },
    deleteTimer: async(id:string) => {
        set((state) => {
            const newTimers = { ...state.timers };
            delete newTimers[id]; // Remove the entry for the given id
            return { timers: newTimers };
        });
    },
    updateStorage: async() => {
        const state = get(); 
        const _json = JSON.stringify({
            chronos: state.chronos, 
            timers: state.timers,   
        })
        await AsyncStorage.setItem(STORAGE_KEYS.watches_data, _json);
        let _currentimestampInSeconds = Date.now()/1000
        let currentimestampInSeconds = JSON.stringify(_currentimestampInSeconds)
        await AsyncStorage.setItem(STORAGE_KEYS.last_timestamp_in_seconds, currentimestampInSeconds)
    }, 

    readStorageAndSetStore: async() => {
        // 1. Read AS
        let _storage = await AsyncStorage.getItem(STORAGE_KEYS.watches_data)
        let _prev_timestamp = await AsyncStorage.getItem(STORAGE_KEYS.last_timestamp_in_seconds)

        if(!_storage || !_prev_timestamp) return

        let storage: { chronos: { [key: string]: Watch }, timers: { [key: string]: Watch } } = JSON.parse(_storage)
        let prev_timestamp: number = JSON.parse(_prev_timestamp)

        // 2. perform calculations of elapsed time
        const current_timestamp_in_seconds = Date.now() / 1000;
        const elapsed_time_in_seconds = current_timestamp_in_seconds - prev_timestamp;

        const updatedChronos: { [key: string]: Watch } = {};
        for (const id in storage.chronos) {
            const chrono = storage.chronos[id];
            if (chrono.is_running) {
                updatedChronos[id] = {
                    ...chrono,
                    current_time: Math.floor(chrono.current_time + elapsed_time_in_seconds),
                };
            } else {
                updatedChronos[id] = chrono;
            }
        }

        const updatedTimers: { [key: string]: Watch } = {};
        for (const id in storage.timers) {
            const timer = storage.timers[id];
            if (timer.is_running) {
                let new_current_time = timer.current_time - elapsed_time_in_seconds; 
                if (new_current_time < 0) { // @dev if in future I want to show negative values (like exceed time) just comment this conditional (also aside all other needed logic for this in other files)
                    new_current_time = 0;
                }
                updatedTimers[id] = {
                    ...timer,
                    current_time: Math.floor(new_current_time),
                };
            } else {
                updatedTimers[id] = timer;
            }
        }
        
        // 3. Update storage values 
        set({
            chronos: updatedChronos,
            timers: updatedTimers,
        });

        // 4. Update the storage with new calculated data
        const _json = JSON.stringify({
            chronos: updatedChronos, 
            timers: updatedTimers,   
        })
        await AsyncStorage.setItem(STORAGE_KEYS.watches_data, _json);
        let timestamp = JSON.stringify(current_timestamp_in_seconds)
        await AsyncStorage.setItem(STORAGE_KEYS.last_timestamp_in_seconds, timestamp)
        // 5. Set the firstLoadDone flag to true
        set({ firstLoadDone: true }); // this will trigger the useEffect in WatchesList.tsx to read the watches from the store
    }
}))