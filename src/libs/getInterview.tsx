

import { getSession } from "next-auth/react";
async function getInterview(interviewId: string) {
    try {
        const session = await getSession();
        const token = session?.user.token;
        console.log('Hiii');
        console.log("Token:", token);
        console.log('Heyy')

        if (!token) {
            return { success: false, message: "No token found. Please log in" };
        }

        const response = await fetch(`https://jobfair-project-rvik.vercel.app/api/v1/interviews/${interviewId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`, // Send token from session
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch interviews");
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching interviews:", error);
        return { success: false, message: error instanceof Error ? error.message : "Unknown error" };
    }
}

export default getInterview;




