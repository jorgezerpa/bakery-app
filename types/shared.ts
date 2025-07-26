export type Language = "EN"|"ES";

export interface STORAGE_KEYS_TYPES {
    language: string
    keep_awake: string
    watches_data: string
    last_timestamp_in_seconds: string
}

export const STORAGE_KEYS:STORAGE_KEYS_TYPES = {
    language: "0x_ovenflow_language",
    keep_awake: "0x_ovenflow_keep_awake",
    watches_data: "0x_ovenflow_watches_data",
    last_timestamp_in_seconds: "0x_ovenflow_last_timestamp_in_seconds"
}

///////
// Items on the watchList component
export interface WatchType {
  id: string
}

// type used for initialReloadState logic
export interface Watch {
    title: string
    current_time: number
    type: "chrono"|"timer"
    is_running: boolean
    // only for timer
    timer_initial_time?: number
}