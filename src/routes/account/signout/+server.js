import { json } from "@sveltejs/kit";
import { signUserOut } from '$lib/auth.server'


export async function POST() {
    try {
        let result = await signUserOut();
        return json(result);
    } catch (error) {
        console.error("Signout failed.");
        return json({
            status: 500,
            message: "Signout failed."
        });
    }
}