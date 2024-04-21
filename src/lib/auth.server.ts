import { initializeApp } from "firebase/app";
import {
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut
} from "firebase/auth";

import {
    FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID
} from '$env/static/private';

const firebaseConfig = {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET,
    messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
    appId: FIREBASE_APP_ID,
    measurementId: FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);

let auth = getAuth(app);

import { userStore } from '$lib/stores'

export const loginEmailPassword = async (email: string, password: string) => {
    console.log("Login called");
    await signInWithEmailAndPassword(auth, email, password);
}

export const signupEmailPassword = async (email: string, password: string) => {
    console.log("Signup called");
    await createUserWithEmailAndPassword(auth, email, password);
}

export const signUserOut = async () => {
    await signOut(auth);
}

onAuthStateChanged(auth, user => {
    if (user) {
        console.log("You are logged in.");
        userStore.update((value) => ({ ...value, isAuthenticated: true }));
    }
    else {
        console.log("Not really boi")
        userStore.update((value) => ({ ...value, isAuthenticated: false }));
    }
})