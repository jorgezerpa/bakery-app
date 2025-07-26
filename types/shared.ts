export type Language = "EN"|"ES";

export interface STORAGE_KEYS_TYPES {
    language: string
    keep_awake: string
}

export const STORAGE_KEYS:STORAGE_KEYS_TYPES = {
    language: "0x_ovenflow_language",
    keep_awake: "0x_ovenflow_keep_awake",
}

///////
export interface WatchType {
  id: string
}