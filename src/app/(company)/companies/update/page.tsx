"use client";
import { useState } from "react";
import { updateCompany } from "@/libs/updateCompany";
import { getSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

function UpdateCompany() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const companyId = searchParams.get("companyId");
    const [isRedirecting, setIsRedirecting] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        address: "",
        district: "",
        province: "",
        postalcode: "",
        website: "",
        description: "",
        telephonenumber: ""
    });

    const [message, setMessage] = useState("");

    function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        if (!companyId) {
            setMessage("Company ID is missing.");
            return;
        }

        const filteredData = Object.fromEntries(
            Object.entries(formData).filter(([_, value]) => value.trim() !== "")
        );

        if (Object.keys(filteredData).length === 0) {
            setMessage("No data to update.");
            return;
        }

        const session = await getSession();
        console.log("Token from session:", session?.user.token);

        const result = await updateCompany(companyId, filteredData);

        setMessage(result.message);

        setTimeout(() => {
            setIsRedirecting(true);
        }, 3000);

        // Redirect after 5 seconds
        setTimeout(() => {
            router.push("/companies");
            router.refresh()
        },5000);
    }

    return (
        <main className="w-full min-h-screen bg-gradient-to-b from-cyan-600 to-green-500 text-white flex flex-col items-center py-12 px-6">
            {/* Page Title */}
            <h1 className="text-3xl font-extrabold drop-shadow-lg mb-6">Update Company</h1>

            {/* Form Container */}
            <div className="w-full max-w-3xl bg-white/90 text-black rounded-xl shadow-lg p-6">
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    {Object.keys(formData).map((key) => (
                        <div key={key} className="flex flex-col">
                            <label className="text-gray-700 font-medium capitalize">
                                {key.replace(/([a-z])([A-Z])/g, "$1 $2")}:
                            </label>
                            {key === "description" ? (
                                <textarea
                                    name={key}
                                    value={formData[key as keyof typeof formData]}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-black"
                                    rows={3}
                                />
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
                        type="submit"
                    >
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

export default UpdateCompany;

