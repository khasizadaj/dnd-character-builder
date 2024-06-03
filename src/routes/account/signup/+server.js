import { firestore, signupEmailPassword } from '$lib/auth.server'
import { json } from '@sveltejs/kit';
import { doc, setDoc, addDoc, collection } from 'firebase/firestore';

// function that creates firbease documents after signup
/**
 * @param {any} user
 */
async function registerUserDetails(user) {
    let userDocRef = doc(firestore, `/users/${user.uid}`);
    await setDoc(userDocRef, {
        "email": user.email,
        "displayName": user.displayName ? user.displayName : null,
    });
    
    console.log("User document created.");
    
    try {
        let userDetailsRef = doc(firestore, `/users/${user.uid}/data/`, 'userDetails')
        await setDoc(userDetailsRef, {
            "email": user.email,
            "uid": user.uid,
            "displayName": user.displayName ? user.displayName : null,
            "photoURL": user.photoURL ? user.photoURL : null,
            "emailVerified": user.emailVerified,
            "phoneNumber": user.phoneNumber ? user.phoneNumber : null,
        });
    } catch (error) {
        console.error("userDetails document creation failed.", error);
    }
}

export async function POST({ request }) {
    try {
        const formData = request.formData();
        let email = (await formData).get('email')?.toString();
        if (!email) {
            return json({ status: 400, message: "Email is required." });
        }
        let password = (await formData).get('password')?.toString();
        if (!password) {
            return json({ status: 400, message: "Password is required." });
        }
        let result = await signupEmailPassword(email, password);
        if (result.status === 201 && result?.data?.user) {
            await registerUserDetails(result.data.user);
            return json(result);
        }
        return json(
            {
                status: result.status,
                message: result.message
            }
        );
    } catch (error) {
        return json({
            status: 500,
            message: "Signup failed."
        });
    }
}