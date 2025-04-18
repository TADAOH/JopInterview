"use client";
import { useState } from "react";
import { updateJobPosting } from "@/libs/updateJobPosting";
import { getSession } from "next-auth/react"; // Import getSession
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

function UpdateJobPosting() {
    const router = useRouter();
    const [isRedirecting, setIsRedirecting] = useState(false);
    const searchParams = useSearchParams();
    const jobpostingId = searchParams.get("jobpostingId");
    console.log("Job Posting ID:", jobpostingId);
    const [formData, setFormData] = useState({
        title: "",
        jobdescription: "",
        requirement: "",
        salary_range: "",
        jobtype: ""
    });

    const [message, setMessage] = useState("");

    function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
    
        if (!jobpostingId) {
            setMessage("Company ID is missing.");
            return;
        }
    
        // Remove empty fields before sending request
        const filteredData = Object.fromEntries(
            Object.entries(formData).filter(([_, value]) => value.trim() !== "")
        );
    
        if (Object.keys(filteredData).length === 0) {
            setMessage("No data to update.");
            return;
        }
    
        const session = await getSession();
        console.log("Token from session:", session?.user.token); // Debugging

        const result = await updateJobPosting(jobpostingId,filteredData)
    
        setMessage(result.message);
        setTimeout(() => {
            setIsRedirecting(true);
        }, 3000);

        // Redirect after 5 seconds
        setTimeout(() => {
            router.push("/jobpostings");
            router.refresh()
        },5000);
    }

    return (
        <main className="w-full min-h-screen bg-gradient-to-b from-cyan-600 to-green-500 text-white flex flex-col items-center py-12 px-6">
            <div className="text-3xl font-extrabold drop-shadow-lg mb-6">Update Job Posting</div>
            {/* <div className="text-md text-gray-600 text-center">
                Enter the updated job posting details below
            </div > */}

            <div className="w-full max-w-3xl bg-white/90 text-black rounded-xl shadow-lg p-6">
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    {Object.keys(formData).map((key) => (
                        <div key={key} className="flex flex-col">
                            <label className="text-gray-700 font-medium capitalize">
                                {key.replace(/_/g, " ")}:
                            </label>
                            {key === "jobtype" ? (
                                <select
                                    name={key}
                                    value={formData[key as keyof typeof formData]}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-black"
                                >
                                    <option value="">-- Select Job Type --</option>
                                    <option value="Full-time">Full-time</option>
                                    <option value="Part-time">Part-time</option>
                                    <option value="Contract">Contract</option>
                                    <option value="Internship">Internship</option>
                                    <option value="Temporary">Temporary</option>
                                </select>
                            ) : (
                                <input
                                    type={key === "jobdescription" || key === "requirement" ? "textarea" : "text"}
                                    name={key}
                                    value={formData[key as keyof typeof formData]}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-black"
                                />
                            )}
                        </div>
                    ))}
                    <button
                        className="w-full bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-gray-500"
                        type="submit">
                        Submit
                    </button>
                </form>
                
                {message && <div className="text-center text-red-600 font-medium mt-4">{message}</div>}
                {isRedirecting && <p className="text-blue-500 mt-2">Redirecting...</p>}
                
            </div>
        </main>
    );
}

export default UpdateJobPosting;
