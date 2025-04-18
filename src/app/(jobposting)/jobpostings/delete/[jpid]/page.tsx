'use client';
import { useRouter } from "next/navigation";
import { deleteJobposting } from "@/libs/deleteJobposting";
import getJobPosting from "@/libs/getJobPosting";

export default async function DeleteJobpostingDetailPage({ params }: { params: { jpid: string } }) {
    const router = useRouter();
    const jobDetail = await getJobPosting(params.jpid);

    const handleDelete = async () => {
        try {
            await deleteJobposting(params.jpid);
            router.push("/jobpostings");
            router.refresh();
        } catch (error: any) {
            console.error("Failed to delete job posting:", error.message);
        }
    };

    if (!jobDetail) {
        return (
            <main className="w-full min-h-screen bg-gradient-to-b from-cyan-600 to-green-500 text-white flex flex-col items-center py-12 px-6">
                <div>
                    <h1 className="text-3xl font-bold drop-shadow-lg">Job posting ID {params.jpid} is deleted</h1>
                </div>
            </main>
        );
    }

    return (
        <main className="w-full min-h-screen bg-gradient-to-b from-cyan-600 to-green-500 text-white flex flex-col items-center py-12 px-6">
            <h1 className="text-3xl font-extrabold drop-shadow-lg mb-8">{jobDetail.data.title}</h1>
            <div className="w-full max-w-4xl bg-white/90 text-black rounded-xl shadow-lg p-6 flex flex-col space-y-3">
                <p className="text-lg font-semibold">{jobDetail.data.title}</p>
                <p className="text-md text-gray-700">📄 Description: {jobDetail.data.jobdescription}</p>
                <p className="text-md text-gray-700">📌 Requirements: {jobDetail.data.requirement}</p>
                <p className="text-md text-gray-700">💰 Salary Range: {jobDetail.data.salary_range}</p>
                <p className="text-md text-gray-700">📋 Job Type: {jobDetail.data.jobtype}</p>
                <p className="text-md text-gray-700">🏢 Company: {jobDetail.data.company.name}</p>
                <p className="text-md text-gray-700">📅 Posted Date: {new Date(jobDetail.data.posted_date).toLocaleDateString()}</p>
            </div>

            <button 
                className="mt-8 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-red-500"
                onClick={handleDelete}
            >
                Delete Job Posting
            </button>
            <p className="mt-2 text-white text-sm">
                Click here to <strong>delete</strong> this job posting from the website.
            </p>
        </main>
    );
}
