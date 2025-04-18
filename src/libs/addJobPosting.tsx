import { getSession } from "next-auth/react";
export async function addJobPosting(companyId: string, formData: Record<string, string>) {
    try {
        const session = await getSession(); // Get session data
        const token = session?.user.token; // Extract token
        console.log('Yaai');
        console.log("Token:", token);
        console.log('Yeyy')

        if (!token) {
            return { success: false, message: "No token found. Please log in." };
        }

        const response = await fetch(`https://jobfair-project-rvik.vercel.app/api/v1/jobpostings/${companyId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to submit job posting.");
        }

        return { success: true, message: "Job posting submitted successfully!" };
    } catch (error) {
        console.error("Error:", error);
        return { success: false, message: `Error submitting job posting` };
    }
}



