import { writeFile } from "fs/promises";
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
    try {
        const data = await request.json();
        const filename = `src/uploads/${data.username}.json`;
        await writeFile(filename, JSON.stringify(data.character), 'utf8');

        return json({
            status: 200, // HTTP status code
            body: {
                success: true,
                message: "Data processed successfully."
            }
        });
    } catch (error) {
        return json({
            status: 500, // Server error status
            body: {
                success: false,
                message: "Failed to process data."
            }
        });
    }
}
