import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export const userStore = writable({
    "email": "test@demo.xyz",
    "password": "demo1234",
    "isAuthenticated": false
});
