import { writable } from "svelte/store";

export const selectedNodeId = writable<string | undefined>(undefined)
