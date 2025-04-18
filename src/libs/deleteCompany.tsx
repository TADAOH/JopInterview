import { getSession } from "next-auth/react";

export async function deleteCompany(cid: string) {
    try {
        const session = await getSession();
        const token = session?.user.token;

        if (!token) {
            throw new Error("Unauthorized: No token found. Please log in.");
        }

        const response = await fetch(`https://jobfair-project-rvik.vercel.app/api/v1/companies/${cid}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error("Unauthorized: You don't have permission to delete this company.");
            } else if (response.status === 403) {
                throw new Error("Forbidden: Your role is not authorized to delete companies.");
            }
            const errorData = await response.json();
            throw new Error(errorData.message || `Failed to delete company (status: ${response.status})`);
        }

        return await response.json();
    } catch (error: any) {
        console.error("Error deleting company:", error);
        throw error;
    }
}