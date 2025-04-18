import { getSession } from "next-auth/react"; 

export const updateCompany = async (companyId: string, data: any) => {
    try {
        const session = await getSession(); 
        const token = session?.user.token; 

        if (!token) {
            return { success: false, message: "No token found. Please log in." };
        }

        const response = await fetch(`https://jobfair-project-rvik.vercel.app/api/v1/companies/${companyId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data),
        });
  
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to update company"); 
        }
  
        return { success: true, message: "Data submitted successfully!"};
    } catch (error) {
        console.error("Error updating company:", error);
        return { success: false, message: `Error submitting data`};
    }
};
  