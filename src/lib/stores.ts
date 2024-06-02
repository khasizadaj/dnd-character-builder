import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import type { Config } from '$lib/types';

export const userStore = writable({
    "email": "test@demo.xyz",
    "password": "demo1234",
    "isAuthenticated": false
});

export const config = writable<Config>({
    "auth": true
})