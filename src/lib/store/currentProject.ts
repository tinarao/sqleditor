import type { Project, TableNodeType } from "$lib/types";
import { writable } from "svelte/store";

export const currentProjectStore = writable<Project | undefined>(undefined);
export const currentNodesStore = writable<TableNodeType[]>([])
export const currentEdgesStore = writable([])
