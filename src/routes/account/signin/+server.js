import { json } from "@sveltejs/kit";
import { loginEmailPassword } from '$lib/auth.server'


export async function POST({ request }) {
    try {
        const formData = request.formData();
        let email = (await formData).get('email');
        let password = (await formData).get('password');
        let result = await loginEmailPassword(email, password);
        return json(result);
    } catch (error) {
        return json({
            status: 500,
            message: "Signin failed."
        });
    }
}