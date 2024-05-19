import { initializeApp } from "firebase/app";
import { FirebaseError } from "firebase/app";

import { userIsAuthenticated } from '$lib/stores';

import {
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

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
export const auth = getAuth(app);
export const firestore = getFirestore(app);

export const loginEmailPassword = async (email: string, password: string) => {
    console.log("Login called");
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return {
            "status": 200,
            "email": userCredential.user.email,
            "message": "Login successful."
        };
    } catch (error) {
        console.log("Login failed.", error);
        let errorCode = 401;
        if (error instanceof FirebaseError) {
            switch (error.code) {
                case "auth/user-not-found":
                case "auth/wrong-password":
                    errorCode = 401;
                    break;
                case "auth/too-many-requests":
                    errorCode = 429; // Too many requests
                    break;
                default:
                    errorCode = 500; // Internal Server Error for unexpected cases
            }
        }
        return {
            "status": errorCode,
            "message": error.message || "Authentication failed."
        };
    }
}

export const signupEmailPassword = async (email: string, password: string) => {
    console.log("Signup called");
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("Signup successful:", userCredential.user);

        return {
            status: 201,
            email: userCredential.user.email,
            message: "Signup successful."
        };
    } catch (error) {
        console.log("Signup failed:", error);

        let errorCode = 400;
        let errorMessage = "Request failed.";

        if (error instanceof FirebaseError) {
            switch (error.code) {
                case "auth/email-already-in-use":
                    errorCode = 409;
                    errorMessage = "Email already in use.";
                    break;
                case "auth/invalid-email":
                    errorCode = 400;
                    errorMessage = "Invalid email format.";
                    break;
                case "auth/weak-password":
                    errorCode = 400;
                    errorMessage = "Password should be at least 6 characters.";
                    break;
                default:
                    errorCode = 500;
                    errorMessage = "An unexpected error occurred.";
            }
        }

        return {
            status: errorCode,
            message: errorMessage
        };
    }
}

export const signUserOut = async () => {
    try {
        await signOut(auth);
        console.log("Signout was successful.");
        return {
            status: 200,
            message: "Signout was successful."
        };
    } catch (error) {
        console.log("Signout failed:", error);

        let errorCode = 500;
        let errorMessage = "Failed to sign out due to a server error.";

        if (error instanceof FirebaseError) {
            errorMessage = error.message || errorMessage;
        }

        return {
            status: errorCode,
            message: errorMessage
        };
    }
}

onAuthStateChanged(auth, user => {
    if (user) {
        console.log("You are logged in.");
        userIsAuthenticated.set('1');
    }
    else {
        console.log("Not really boi")
        userIsAuthenticated.set('0');
    }
})

// onAuthStateChanged(auth);