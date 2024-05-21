import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import type { Config } from '$lib/types';

export const userStore = writable({
    "email": "test@demo.xyz",
    "password": "demo1234",
    "isAuthenticated": false
});

let isAuthenticated;
if (browser) {
    isAuthenticated = localStorage.getItem("userIsAuthenticated")
}

export const userIsAuthenticated = writable(isAuthenticated ? isAuthenticated : "0")

if (browser) {
    userIsAuthenticated.subscribe((value) => localStorage.setItem("userIsAuthenticated", value))
}

export const config = writable<Config>({
    "auth": true
})