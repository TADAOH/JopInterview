import { getSession } from "next-auth/react";

export async function updateInterview(interviewId: string, formData: Record<string, string>) {
    try {
        const session = await getSession();
        const token = session?.user.token;

        if (!token) {
            return { success: false, message: "No token found. Please log in." };
        }

        const response = await fetch(`https://jobfair-project-rvik.vercel.app/api/v1/interviews/${interviewId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to update interview.");
        }

        return { success: true, message: "Interview updated successfully!" };
    } catch (error) {
        console.error("Error:", error);
        return { success: false, message: `Error updating interview: ${(error as Error).message}` };
    }
}
