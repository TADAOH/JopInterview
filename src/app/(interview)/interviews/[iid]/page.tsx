"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import getInterview from "@/libs/getInterview";
import { useSession } from "next-auth/react"; // To handle admin role-based access
import { deleteInterview } from "@/libs/deleteInterview";

export default function InterviewDetailPage({ params }: { params: { iid: string } }) {
    console.log("InterviewDetailPage params:", params);
    const router = useRouter();
    const [interviewDetail, setInterviewDetail] = useState<any>(null);
    const { data: session } = useSession(); // Get session to check for admin role

    // Fetch interview details on client side
    useEffect(() => {
        router.refresh();
        async function fetchInterview() {
            const data = await getInterview(params.iid);
            // console.log("Fetched Interview Data:", data);  // Log fetched data for debugging
            setInterviewDetail(data);
        }
        fetchInterview();
    }, [params.iid]);

    // Check if interviewDetail and interviewDetail.data are available before destructuring
    if (!interviewDetail || !interviewDetail.data) {
        return <div className="text-center text-white">Loading...</div>;
    }

    // Destructure interviewDetail to get company information and interview date
    const { company, intwDate } = interviewDetail.data;

    const handleNavigateToUpdate = () => {
        router.push(`/interviews/update?interviewId=${params.iid}`);
    };

    const handleNavigateToDelete = async () => {
        const confirmation = confirm("Are you sure you want to delete this interview?");
        if (confirmation) {
            try {
                const result = await deleteInterview(params.iid);
                if (result.success) {
                    alert("Interview deleted successfully.");
                    router.push("/interviews");  // Redirect to interviews list after deletion
                } else {
                    alert("Error deleting interview.");
                }
            } catch (error) {
                console.error("Error deleting interview:", error);
                alert("An error occurred while trying to delete the interview.");
            }
        }
    };

    return (
        <main className="w-full min-h-screen bg-gradient-to-b from-cyan-600 to-green-500 text-white flex flex-col items-center py-12 px-6">
            {/* Interview Title */}
            <h1 className="text-3xl font-extrabold drop-shadow-lg mb-8">
                🎤 Interview Details for {company?.name || "Unknown Company"} 🏢
            </h1>

            {/* Interview Details Section */}
            <div className="w-full max-w-4xl bg-white/90 text-black rounded-xl shadow-lg p-6 space-y-5 mt-8">
                <div className="text-md text-gray-700">
                    📅 <strong>Interview Date:</strong> {new Date(intwDate).toLocaleString()}
                </div>
                <div className="text-md text-gray-700">
                    🏢 <strong>Company Name:</strong> {company?.name || "Unknown"}
                </div>
                <div className="text-md text-gray-700">
                    📜 <strong>Description:</strong> {company?.description || "No description available"}
                </div>
                <div className="text-md text-gray-700">
                    📞 <strong>Telephone:</strong> {company?.telephonenumber || "N/A"}
                </div>
            </div>

            {/* Buttons */}
            <div className="flex space-x-4 mt-8">
                <button
                    onClick={handleNavigateToUpdate}
                    className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-gray-500"
                >
                    ✏️ Update Interview
                </button>

                <button
                    onClick={handleNavigateToDelete}
                    className="bg-red-500 hover:bg-red-400 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-red-300"
                >
                    🗑️ Delete Interview
                </button>
            </div>
        </main>
    );
}
