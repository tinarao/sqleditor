import { writable } from 'svelte/store';

export const selectedNodeId = writable<string | undefined>(undefined);

export function setSelectedNodeId(id: string | undefined) {
	selectedNodeId.set(id);
}
