import { json } from "@sveltejs/kit"
import { firestore, auth } from "$lib/auth.server"
import { doc, getDoc, setDoc } from "firebase/firestore"

export async function GET() {
    try {
        let user = auth.currentUser
        if (user?.isAnonymous) {
            return json(0);
        }
        let characterDocRef = doc(firestore, `/users/${user?.uid}/data/characterDetails`)
        let characterDoc = await getDoc(characterDocRef);
        if (!characterDoc.exists()) {
            return json({});
        }
        return json(characterDoc.data());
    } catch (error) {
        console.log(`Error happened. ${error}`)
        return json({
            status: 500,
            message: "Character cannot be loaded."
        })
    }
}

export async function POST({ request }) {
    try {
        let user = auth.currentUser
        if (!user?.isAnonymous) {
            try {
                let data = await request.json()
                console.log(data)
                let characterDocRef = doc(firestore, `/users/${user?.uid}/data/characterDetails`)
                await setDoc(characterDocRef, data);
            } catch (error) {
                console.error("Loading character from UI failed.", error);
            }
        }
        return json({
            status: 200,
            message: "Character."
        })
    } catch (error) {
        return json({
            status: 500,
            message: "Character cannot be loaded."
        })
    }
}


