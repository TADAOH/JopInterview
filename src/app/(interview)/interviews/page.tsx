"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import getInterviews from "@/libs/getInterviews";
import { deleteInterview } from "@/libs/deleteInterview";
import { InterviewJson } from "../../../../interface";
import { LinearProgress, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

const Page = () => {
    const [interviews, setInterviews] = useState<InterviewJson | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedInterviewId, setSelectedInterviewId] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchInterviews = async () => {
            try {
                router.refresh();
                const data = await getInterviews();
                if (data.success) {
                    setInterviews(data);
                } else {
                    setError(data.message || "Failed to load interviews");
                }
            } catch (err) {
                setError("An error occurred while fetching interviews");
            } finally {
                setLoading(false);
            }
        };

        fetchInterviews();
    }, []);

    const handleDeleteClick = (id: string) => {
        setSelectedInterviewId(id);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = async () => {
        if (selectedInterviewId !== null) {
            try {
                await deleteInterview(selectedInterviewId);
                setInterviews((prev) => ({
                    ...prev!,
                    data: prev!.data.filter((interview) => interview._id !== selectedInterviewId)
                }));
            } catch (error) {
                setError("Failed to delete interview");
            } finally {
                setDeleteDialogOpen(false);
                setSelectedInterviewId(null);
            }
        }
    };

    return (
        <main className="w-full min-h-screen bg-gradient-to-b from-cyan-600 to-green-500 text-center py-16 px-6 text-white">
            <h1 className="text-4xl font-extrabold drop-shadow-lg mb-10">📅 Scheduled Interviews</h1>

            {loading && (
                <div className="mt-10 flex flex-col items-center">
                    <p className="text-lg font-medium">Loading interviews...</p>
                    <div className="w-1/2 md:w-1/3 mt-2">
                        <LinearProgress color="inherit" />
                    </div>
                </div>
            )}

            {error && <div className="text-xl text-red-500">❌ {error}</div>}

            {!loading && !error && interviews && interviews.data.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white text-black rounded-lg overflow-hidden shadow-lg">
                        <thead>
                            <tr className="bg-gray-800 text-white">
                                <th className="py-3 px-4">Interview ID</th>
                                <th className="py-3 px-4">User ID</th>
                                <th className="py-3 px-4">Company</th>
                                <th className="py-3 px-4">Date</th>
                                <th className="py-3 px-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {interviews.data.map((interview) => (
                                <tr key={interview._id} className="border-b hover:bg-gray-100 transition-all">
                                    <td className="py-3 px-4">
                                        <Link href={`/interviews/${interview._id}`} className="text-blue-600 hover:underline">{interview._id}</Link>
                                    </td>
                                    <td className="py-3 px-4">{interview.user}</td>
                                    <td className="py-3 px-4">
                                        <Link href={`/companies/${interview.company._id}`} className="text-blue-600 hover:underline">{interview.company.name}</Link>
                                    </td>
                                    <td className="py-3 px-4">📅 {interview.intwDate}</td>
                                    <td className="py-3 px-4 flex gap-2 justify-center">
                                        <Button variant="contained" color="primary" 
                                        className="rounded-2xl font-bold"
                                        onClick={() => router.push(`/interviews/update?interviewId=${interview._id}`)}>
                                            Edit
                                        </Button>
                                        <Button variant="contained" color="secondary" 
                                        className="rounded-2xl bg-red-500 hover:bg-red-400 font-bold"
                                        onClick={() => handleDeleteClick(interview._id)}>
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                !loading && !error && <div className="text-xl">🚫 No interviews found.</div>
            )}

            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <p>Are you sure you want to delete this interview?</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)} color="primary">Cancel</Button>
                    <Button onClick={confirmDelete} color="secondary">Delete</Button>
                </DialogActions>
            </Dialog>
        </main>
    );
};

export default Page;
