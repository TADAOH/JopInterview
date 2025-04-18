"use client";

import Link from "next/link";
import { useState } from "react";
import { InterviewJson } from "../../interface";

const InterviewCatalog = ({ interviewsJson }: { interviewsJson: InterviewJson }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState<number | "all">(5);
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);

    if (!interviewsJson || !Array.isArray(interviewsJson.data)) {
        return <p className="text-red-500">No interviews found.</p>;
    }

    // Sorting function
    const sortedData = [...interviewsJson.data].sort((a, b) => {
        if (!sortConfig) return 0;
        const { key, direction } = sortConfig;
        const order = direction === "asc" ? 1 : -1;

        if (a[key as keyof typeof a] < b[key as keyof typeof b]) return -1 * order;
        if (a[key as keyof typeof a] > b[key as keyof typeof b]) return 1 * order;
        return 0;
    });

    // Pagination logic
    const totalPages = itemsPerPage === "all" ? 1 : Math.ceil(interviewsJson.data.length / (itemsPerPage as number));
    const startIndex = (currentPage - 1) * (itemsPerPage === "all" ? interviewsJson.data.length : itemsPerPage);
    const paginatedData = itemsPerPage === "all" ? sortedData : sortedData.slice(startIndex, startIndex + itemsPerPage);

    // Handle sorting
    const requestSort = (key: string) => {
        let direction: "asc" | "desc" = "asc";
        if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };

    return (
        <div className="w-full bg-white rounded-lg shadow-lg p-6 mt-6">
            {/* Title */}
            <span className="text-black text-lg font-semibold">
                Explore {interviewsJson.count} scheduled interviews
            </span>

            {/* Pagination Size Selector */}
            <div className="mt-4">
                <label htmlFor="pageSize" className="mr-2 text-gray-700">Show:</label>
                <select
                    id="pageSize"
                    className="border rounded px-3 py-1 text-gray-700 bg-white"
                    value={itemsPerPage}
                    onChange={(e) => {
                        const value = e.target.value === "all" ? "all" : parseInt(e.target.value);
                        setItemsPerPage(value);
                        setCurrentPage(1);
                    }}
                >
                    <option value="5">5 per page</option>
                    <option value="25">25 per page</option>
                    <option value="all">All</option>
                </select>
            </div>

            {/* Table View for Interviews */}
            <div className="overflow-x-auto mt-6">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-3 px-6 text-left font-medium text-gray-600">
                                Company
                            </th>
                            <th
                                className="py-3 px-6 text-left font-medium text-gray-600 cursor-pointer hover:text-gray-800"
                                onClick={() => requestSort("user")}
                            >
                                User ID {sortConfig?.key === "user" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
                            </th>
                            <th
                                className="py-3 px-6 text-left font-medium text-gray-600 cursor-pointer hover:text-gray-800"
                                onClick={() => requestSort("intwDate")}
                            >
                                Interview Date {sortConfig?.key === "intwDate" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((interview) => (
                            <tr key={interview._id} className="border-b hover:bg-gray-50 transition-all duration-300 ease-in-out">
                                <td className="py-3 px-6 text-sm text-gray-800">
                                    <Link 
                                        href={`/companies/${interview.company?._id}`} 
                                        className="text-green-600 hover:text-green-800 font-semibold"
                                    >
                                        {interview.company?.name || "Unknown Company"}
                                    </Link>
                                </td>
                                <td className="py-3 px-6 text-sm text-gray-800">{interview.user || "N/A"}</td>
                                <td className="py-3 px-6 text-sm text-gray-800">{new Date(interview.intwDate).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            {itemsPerPage !== "all" && (
                <div className="flex justify-between items-center mt-4">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700 text-white"}`}
                    >
                        Previous
                    </button>
                    <span className="text-gray-700">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 rounded ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700 text-white"}`}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default InterviewCatalog;
