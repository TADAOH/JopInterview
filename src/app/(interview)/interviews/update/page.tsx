"use client";

import { useState, useEffect } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField } from "@mui/material";
import { Dayjs } from "dayjs";
import { useSearchParams } from "next/navigation";
import { updateInterview } from "@/libs/updateInterview";
import { useRouter } from "next/navigation"

function UpdateInterview() {
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const searchParams = useSearchParams();
    const interviewId = searchParams.get("interviewId"); // Get interviewId from URL
    const router = useRouter();

    // Fetch user profile when component mounts
    useEffect(() => {
        async function fetchUserProfile() {
            router.refresh();
            const response = await fetch("/api/user");
            const data = await response.json();

            if (data.error) {
                alert("User not authenticated");
                return;
            }

            setUserId(data._id);
        }

        fetchUserProfile();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedDate || !userId || !interviewId) {
            alert("Please select a date and ensure you are logged in.");
            return;
        }

        const updatedData = {
            intwDate: selectedDate.toISOString(), // Convert to ISO format
            user: userId,
        };

        // Call the backend function
        const result = await updateInterview(interviewId, updatedData);

        if (result.success) {
            alert(result.message);
        } else {
            alert(`Error: ${result.message}`);
        }
    };

    return (
        <main className="w-full min-h-screen bg-gradient-to-b from-cyan-600 to-green-500 text-white flex flex-col items-center py-12 px-6">
            <h1 className="text-3xl font-extrabold drop-shadow-lg mb-8">Update Interview</h1>
            <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white/90 text-black rounded-xl shadow-lg p-6 flex flex-col items-center space-y-6">
                <p className="text-lg text-gray-600 text-center mb-8">
                    Please select a new interview date.
                </p>
                <div className="w-full max-w-sm p-4 bg-white rounded-lg shadow-md">
                    
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            value={selectedDate}
                            onChange={(newDate: Dayjs | null) => setSelectedDate(newDate)}
                            slots={{ textField: TextField }}
                        />
                    </LocalizationProvider>
                </div>
                <button
                    className="mt-8 bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-gray-500"
                    type="submit"
                >
                    Update Interview
                </button>
            </form>
        </main>
    );
}

export default UpdateInterview;
