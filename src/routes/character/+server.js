import { json } from "@sveltejs/kit"
import { firestore, auth } from "$lib/auth.server"
import { doc, getDoc } from "firebase/firestore"

export async function GET() {
    try {
        let user = auth.currentUser
        if (user?.isAnonymous)
        {
            return json(0);
        }
        let characterDocRef = doc(firestore, `/users/${user?.uid}/data/characterDetails`)
        let characterDoc = await getDoc(characterDocRef);
        return json(characterDoc.data());
    } catch (error) {
        console.log(`Error happened. ${error}`)
        return json({
            status: 500,
            message: "Character cannot be loaded."
        })
    }
}


