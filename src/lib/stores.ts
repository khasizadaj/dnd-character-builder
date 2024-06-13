import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import type { Config } from '$lib/types';

export const characterInMemory = writable();

export const config = writable<Config>({
    "auth": true
})