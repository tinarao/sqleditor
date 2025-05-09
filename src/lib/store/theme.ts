import { persisted } from 'svelte-persisted-store';

export const theme = persisted<'light' | 'dark'>('theme', 'light');

export function toggleTheme() {
	theme.update((current) => (current === 'light' ? 'dark' : 'light'));
}
