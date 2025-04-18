'use client'
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Key } from "react";
import { JobPostingJson } from "../../interface";

export default async function JobPostingCatalog({ jobPostingsJson }: { jobPostingsJson: Promise<JobPostingJson> }) {
    const { data: session } = useSession();
    const jobPostingJsonReady = await jobPostingsJson;

    return (
        <div className="w-full bg-white rounded-lg shadow-lg p-6 mt-6">
            {/* Title */}
            <span className="text-black text-lg font-semibold">
                Explore {jobPostingJsonReady.count} job opportunities in our catalog
            </span>

            {/* Add Company Button */}
            {session?.user?.role === "admin" && (
                <div className="flex justify-end mt-6"> 
                    <Link href='/jobpostings/add'>
                        <button 
                            className="bg-black text-white font-semibold px-5 py-3 rounded-xl shadow-lg transition-all duration-300 ease-in-out hover:bg-green-600">
                            Add JobPosting
                        </button>
                    </Link>
                </div>
            )}

            {/* Table view for job postings */}
            <div className="overflow-x-auto mt-6">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-3 px-6 text-left font-medium text-gray-600">Job Title</th>
                            <th className="py-3 px-6 text-left font-medium text-gray-600">Company</th>
                            <th className="py-3 px-6 text-left font-medium text-gray-600">Salary Range</th>
                            <th className="py-3 px-6 text-left font-medium text-gray-600">Posted Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            jobPostingJsonReady.data.map((jobItem: { _id: Key | null | undefined; title: string; company: { name: string; _id: Key }; salary_range: string; posted_date: string; }) => (
                                <tr key={jobItem._id} className="border-b hover:bg-gray-50 transition-all duration-300 ease-in-out">
                                    <td className="py-3 px-6 text-sm text-gray-800">
                                        <Link href={`/jobpostings/${jobItem._id}`} className="font-semibold text-blue-600 hover:text-blue-800">
                                            {jobItem.title}
                                        </Link>
                                    </td>
                                    <td className="py-3 px-6 text-sm text-gray-800">
                                        <Link href={`/companies/${jobItem.company._id}`} className="text-green-600 hover:text-green-800 font-semibold">
                                            {jobItem.company.name}
                                        </Link>
                                    </td>
                                    <td className="py-3 px-6 text-sm text-gray-800">{jobItem.salary_range}</td>
                                    <td className="py-3 px-6 text-sm text-gray-800">{jobItem.posted_date}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}
