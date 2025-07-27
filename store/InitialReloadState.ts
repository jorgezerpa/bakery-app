import { STORAGE_KEYS, Watch } from '@/types/shared';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

interface InitialReloadState {
    firstLoadDone: boolean,
    chronos: { [key: string]: Watch }; // object of chronometers with string keys
    timers: { [key: string]: Watch }; // object of timers with string keys
    //
    // upsert pattern -> called when create, play, pause, reestart and delete a watch
    // depending on watch.type updates `chronos` and `timers`
    updateWatch: (id:string, _watch_data: Watch) => void
    deleteWatch: (id:string, type:Watch["type"]) => void
    readStorageAndSetStore: () => void
}

export const useInitialReloadStateStore = create<InitialReloadState>((set, get) => ({
    firstLoadDone: false,
    chronos: {},
    timers: {},

    updateWatch: (id:string, _watch_data: Watch) => {
        if(_watch_data.type=="chrono"){
            set((state)=>({ 
                chronos: { ...state.chronos, [id]: _watch_data } // upsert pattern
            }))
            // update local storage
            AsyncStorage.setItem(STORAGE_KEYS.chronos_data, JSON.stringify({ ...get().chronos, [id]: _watch_data }));
        }
        if(_watch_data.type=="timer"){
            set((state)=>({ 
                timers: { ...state.timers, [id]: _watch_data } // upsert pattern
            }))
            // update local storage
            AsyncStorage.setItem(STORAGE_KEYS.timers_data, JSON.stringify({ ...get().timers, [id]: _watch_data }));
        }
    },
    deleteWatch: (id:string, type:Watch["type"]) => {
        if(type=="chrono") {
            const newChronos = { ...get().chronos };
            delete newChronos[id]; // Remove the entry for the given id
            set((state) => {
                return { chronos: newChronos };    
            })
            // update local storage
            AsyncStorage.setItem(STORAGE_KEYS.chronos_data, JSON.stringify(newChronos));
        }
        if(type=="timer") {
            const newTimers = { ...get().timers };
            delete newTimers[id]; // Remove the entry for the given id
            set((state) => {
                return { timers: newTimers };
            });
            // update local storage
            AsyncStorage.setItem(STORAGE_KEYS.timers_data, JSON.stringify(newTimers));
        }
    },
    readStorageAndSetStore: async() => {
        // read storage and set the store
        const storedData = await Promise.all([
            AsyncStorage.getItem(STORAGE_KEYS.chronos_data),
            AsyncStorage.getItem(STORAGE_KEYS.timers_data)
        ]);
        const [chronosData, timersData] = storedData;
        const chronos = chronosData ? JSON.parse(chronosData) : {};
        const timers = timersData ? JSON.parse(timersData) : {};

        // make calculations since last open 
        const currentTimestamp = Math.floor(Date.now() / 1000); // current timestamp in seconds

        // notice that by manipulating current_time, all other values will be correctly modified on the Chrono.tsx and Timer.tsx file, on interactions
        Object.keys(chronos).forEach((key) => {
            const chrono = chronos[key];
            if (chrono.is_running) {
                const elapsedTime = Math.floor(currentTimestamp - chrono.start_time);
                chrono.current_time = elapsedTime;
            } else {
                chrono.current_time = Math.floor(chrono.pause_time - chrono.start_time); // freeze the time
            }
        });

        // @dev naming error, for timers, "start_time" is the "end_time" the timer will be setted and current_time is the remaining time to get to start_time
        Object.keys(timers).forEach((key) => {
            const timer = timers[key];
            if (timer.is_running) {
                const remainingTime = Math.ceil(timer.start_time - currentTimestamp);
                timer.current_time = remainingTime >= 0 ? remainingTime : 0; // Ensure time doesn't go negative
                timer.running = remainingTime > 0; // Set running state based on remaining time
            } else {
                // take in count timer.timer_initial_time, so the current_time is the diff btw start_time and pause_time
                timer.current_time = Math.floor(timer.start_time - timer.pause_time) > 0 ? Math.floor(timer.start_time - timer.pause_time) : 0; // freeze the time
            }
        });

        set({
            chronos: chronos,
            timers: timers,
            firstLoadDone: true
        });
        // update local storage
        AsyncStorage.setItem(STORAGE_KEYS.chronos_data, JSON.stringify(chronos));
        AsyncStorage.setItem(STORAGE_KEYS.timers_data, JSON.stringify(timers));
    }
}))