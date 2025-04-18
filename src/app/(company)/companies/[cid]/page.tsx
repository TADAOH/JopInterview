"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import getCompany from "@/libs/getCompany";
import getJobPostingforCompany from "@/libs/getJobPostingforCompany";

export default function CompanyDetailPage({ params }: { params: { cid: string } }) {
    console.log("CompanyDetailPage params:", params);
    const { data: session } = useSession();
    const router = useRouter();
    const [companyDetail, setCompanyDetail] = useState<any>(null);
    const [jpDetail, setJPDetail] = useState<any>(null);
    const [showJobPosting, setShowJobPosting] = useState<boolean>(false);

    useEffect(() => {
        async function fetchCompany() {
            const data = await getCompany(params.cid);
            const data2 = await getJobPostingforCompany(params.cid);
            setCompanyDetail(data);
            setJPDetail(data2);
        }
        fetchCompany();
    }, [params.cid]);

    if (!companyDetail) {
        return <div className="text-center text-white">Loading...</div>;
    }

    const handleNavigate = () => {
        router.push(`/interviews/add?companyId=${params.cid}`);
    };

    const handleNavigatetoUpdate = () => {
        router.push(`/companies/update?companyId=${params.cid}`);
    };


    const handleNavigatetoDelete = () => {
        router.push(`/companies/delete/${params.cid}`);
    };

    return (
        <main className="w-full min-h-screen bg-gradient-to-b from-cyan-600 to-green-500 text-white flex flex-col items-center py-12 px-6">
            {/* Company Name */}
            <h1 className="text-3xl font-extrabold drop-shadow-lg mb-8">
                {companyDetail.data.name}
            </h1>

            {/* Content Container */}
            <div className="w-full max-w-4xl bg-white/90 text-black rounded-xl shadow-lg p-6 flex flex-col md:flex-row items-center">
                {/* Company Image */}
                <Image
                    src="https://drive.google.com/uc?export=view&id=1VThaI32ox5b6Knz9AHAf9IN3ek6RIWrH"
                    alt="Company Image"
                    width={300}
                    height={300}
                    className="rounded-lg shadow-md w-[80%] md:w-[40%] object-cover"
                />

                {/* Company Details */}
                <div className="text-left w-full md:w-[60%] mt-6 md:mt-0 md:ml-8 space-y-3">
                    <p className="text-lg font-semibold">{companyDetail.data.name}</p>
                    <p className="text-md text-gray-700">📍 Address: {companyDetail.data.address}</p>
                    <p className="text-md text-gray-700">🏙 District: {companyDetail.data.district}</p>
                    <p className="text-md text-gray-700">🌍 Province: {companyDetail.data.province}</p>
                    <p className="text-md text-gray-700">📮 Postal Code: {companyDetail.data.postalcode}</p>
                    <p className="text-md text-gray-700">🌐 Website: <a href={companyDetail.data.website} target="_blank" className="text-cyan-600 hover:underline">{companyDetail.data.website}</a></p>
                    <p className="text-md text-gray-700">📞 Tel: {companyDetail.data.telephonenumber}</p>
                    <p className="text-md text-gray-700">📝 Description: {companyDetail.data.description}</p>
                </div>
            </div>

            {/* Buttons */}
            <div className="flex space-x-4 mt-8">
                <button
                    onClick={() => setShowJobPosting(!showJobPosting)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-400"
                >
                    {showJobPosting ? "Hide Job Posting" : "View Job Posting"}
                </button>
                {(session?.user?.role === "admin" || session?.user?.role === "user") && (
                <>
                    <button
                        onClick={handleNavigate}
                        className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-gray-500"
                    >
                        Book an Interview
                    </button>
                </>
                )}
                {session?.user?.role === "admin" && (
                <>

                    <button 
                        onClick={handleNavigatetoUpdate}
                        className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-gray-500"
                    >
                        Update Company
                    </button>
                
                    {/* <Link href='/companydelete'> */}
                        <button 
                            onClick={handleNavigatetoDelete}
                            className="bg-red-500 hover:bg-red-400 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-red-300"
                        >
                            Delete Company
                        </button>
                    {/* </Link> */}
                </>
                )}
            </div>

            {/* Job Posting Section */}
            {showJobPosting && (
                <div className="mt-6 w-full max-w-4xl bg-white/90 text-black rounded-xl shadow-lg p-6">
                    {jpDetail && jpDetail.count > 0 ? (
                        jpDetail.data.map((job: any) => (
                            <div key={job._id} className="p-4 border-b border-gray-300">
                                <h2 className="text-xl font-bold text-gray-900">{job.title}</h2>
                                <p className="text-gray-700"><strong>📋 Description:</strong> {job.jobdescription}</p>
                                <p className="text-gray-700"><strong>🎯 Requirement:</strong> {job.requirement}</p>
                                <p className="text-gray-700"><strong>💰 Salary Range:</strong> ${job.salary_range}K</p>
                                <p className="text-gray-700"><strong>📄 Job Type:</strong> {job.jobtype}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-700 font-semibold">No Available job yet.</p>
                    )}
                </div>
            )}
        </main>
    );
}

