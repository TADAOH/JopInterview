export default async function registerUser(formData: { name: string; telephone: string; email: string; password: string }) {
    try {
        const response = await fetch("https://jobfair-project-rvik.vercel.app/api/v1/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            return { success: false, message: errorData.message || "Registration failed." };
        }

        return { success: true };
    } catch (error) {
        return { success: false, message: "An unknown error occurred." };
    }
}