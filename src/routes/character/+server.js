import { json } from "@sveltejs/kit"
import { firestore, auth } from "$lib/auth.server"
import { doc, getDoc, setDoc } from "firebase/firestore"


export async function GET() {
    try {
        let user = auth.currentUser
        let characterDocRef = doc(firestore, `/users/${user?.uid}/data/characterDetails`)
        let characterDoc = await getDoc(characterDocRef);
        if (!characterDoc.exists()) {
            return json(
                {
                    status: 404,
                    data: null,
                    message: "Character cannot be loaded."
                }
            );
        }
        console.log(characterDoc.exists())
        return json(
            {
                status: 200,
                data: characterDoc.data(),
                message: "Character loaded."
            }
        );
    } catch (error) {
        console.log(`Error happened. ${error}`)
        return json({
            status: 500,
            data: null,
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


