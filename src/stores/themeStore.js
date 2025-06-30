import { writable } from 'svelte/store';

const userPrefersDark = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
const initialTheme = userPrefersDark ? 'dark' : 'light';

export const theme = writable(initialTheme);
