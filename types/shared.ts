export type Language = "EN"|"ES";

export interface STORAGE_KEYS_TYPES {
    language: string
    keep_awake: string
    chronos_data: string
    timers_data: string
}

export const STORAGE_KEYS:STORAGE_KEYS_TYPES = {
    language: "0x_ovenflow_language",
    keep_awake: "0x_ovenflow_keep_awake",
    chronos_data: "0x_ovenflow_chronos_data",
    timers_data: "0x_ovenflow_timers_data",
}

///////
// Items on the watchList component
export interface WatchType {
  id: string
}

// type used for initialReloadState logic
export interface Watch {
    type: "chrono"|"timer"
    title: string
    current_time: number // slapsed time (AKA what's displayed on the screen)
    start_time: number // timestamp when start running
    pause_time: number // timestamp when its paused
    is_running: boolean
    // only for timer
    timer_initial_time?: number
}