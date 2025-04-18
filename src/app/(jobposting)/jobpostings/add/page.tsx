
"use client";

import { useState, useEffect } from "react";
import { addJobPosting } from "@/libs/addJobPosting";
import getCompanies from "@/libs/getCompanies";
import { useRouter } from "next/navigation";

const jobTypes = ["Full-time", "Part-time", "Contract", "Internship", "Temporary"];

function JobForm() {
    const router = useRouter(); 
    const [formData, setFormData] = useState({
        title: "",
        jobdescription: "",
        requirement: "",
        salary_range: "",
        jobtype: "",
    });

    const [message, setMessage] = useState("");
    const [companies, setCompanies] = useState<{ _id: string; name: string }[]>([]);
    const [selectedCompany, setSelectedCompany] = useState("");
    const [isRedirecting, setIsRedirecting] = useState(false);

    useEffect(() => {
        async function fetchCompanies() {
            router.refresh();
            try {
                const data = await getCompanies();
                setCompanies(data.data);
            } catch (error) {
                console.error("Failed to fetch companies:", error);
            }
        }
        fetchCompanies();
    }, []);

    function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    function handleCompanyChange(event: React.ChangeEvent<HTMLSelectElement>) {
        setSelectedCompany(event.target.value);
    }

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        
        if (!selectedCompany) {
            setMessage("Please select a company.");
            return;
        }

        const result = await addJobPosting(selectedCompany, formData);
        setMessage(result.message);

        if (result.success) {
            setFormData({
                title: "",
                jobdescription: "",
                requirement: "",
                salary_range: "",
                jobtype: "",
            });
        }
        setTimeout(() => {
            setIsRedirecting(true);
        }, 3000);

        // Redirect after 5 seconds
        setTimeout(() => {
            router.push("/jobpostings");
            router.refresh()
        }, 5000);
    }

    return (
        <main className="w-full min-h-screen bg-gradient-to-b from-cyan-600 to-green-500 text-white flex flex-col items-center py-12 px-6">
            {/* Page Title */}
            <h1 className="text-3xl font-extrabold drop-shadow-lg mb-6">Add Job Posting</h1>

            {/* Form Container */}
            <div className="w-full max-w-3xl bg-white/90 text-black rounded-xl shadow-lg p-6">
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    {/* Select Company */}
                    <div className="flex flex-col">
                        <label className="text-gray-700 font-medium">Select Company:</label>
                        <select 
                            value={selectedCompany} 
                            onChange={handleCompanyChange} 
                            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-black"
                        >
                            <option value="">-- Select a company --</option>
                            {companies.map(company => (
                                <option key={company._id} value={company._id}>{company.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Other Form Fields */}
                    {Object.keys(formData).map((key) => (
                        <div key={key} className="flex flex-col">
                            <label className="text-gray-700 font-medium capitalize">
                                {key.replace(/_/g, " ")}:
                            </label>
                            {key === "jobdescription" || key === "requirement" ? (
                                <textarea
                                    name={key}
                                    value={formData[key as keyof typeof formData]}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-black"
                                    rows={3}
                                />
                            ) : key === "jobtype" ? (
                                <select
                                    name="jobtype"
                                    value={formData.jobtype}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-black"
                                >
                                    <option value="">-- Select Job Type --</option>
                                    {jobTypes.map((type) => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    type="text"
                                    name={key}
                                    value={formData[key as keyof typeof formData]}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-black"
                                />
                            )}
                        </div>
                    ))}

                    {/* Submit Button */}
                    <button 
                        className="w-full bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-gray-500"
                        type="submit">
                        Submit
                    </button>
                </form>

                {/* Message Display */}
                {message && <div className="text-center text-red-600 font-medium mt-4">{message}</div>}
                {isRedirecting && <p className="text-blue-500 mt-2">Redirecting...</p>}
            </div>
        </main>
    );
}
export default JobForm;