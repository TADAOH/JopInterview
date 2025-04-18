import { getSession } from "next-auth/react";

export async function deleteJobposting(jpid: string) {
    try {
        const session = await getSession();
        const token = session?.user.token;

        if (!token) {
            throw new Error("Unauthorized: No token found. Please log in.");
        }

        const response = await fetch(`https://jobfair-project-rvik.vercel.app/api/v1/jobpostings/${jpid}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to delete jobposting (status: ${response.status})`);
        }

        return await response.json();
    } catch (error: any) {
        console.error("Error deleting jobposting:", error);
        throw error;
    }
}