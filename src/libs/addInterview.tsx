import { getSession } from "next-auth/react";

export async function addInterview(companyId: string, formData: Record<string, string>) {
    try {
        const session = await getSession(); // Get session data
        const token = session?.user.token; // Extract token
        console.log("Session Data:", session);

        if (!token) {
            return { success: false, message: "No token found. Please log in." };
        }

        const response = await fetch(`https://jobfair-project-rvik.vercel.app/api/v1/companies/${companyId}/interviews`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to submit data.");
        }

        return { success: true, message: "Interview booked successfully!" };
    } catch (error) {
        console.error("Error:", error);
        return { success: false, message: `Error submitting data` };
    }
}
