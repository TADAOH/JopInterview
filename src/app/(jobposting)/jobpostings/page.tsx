import JobPostingCatalog from "@/components/JobPostingCatalog";
import getJobPostings from "@/libs/getJobPostings";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";

export default async function JobPostingPage() {
    const jobPostingsJson = getJobPostings();
    
    return (
        <main className="w-full min-h-screen bg-gradient-to-b from-cyan-600 to-green-500 text-center py-16 px-6 text-white">
            {/* Page Title with More Spacing */}
            <h1 className="text-3xl md:text-4xl font-extrabold drop-shadow-lg mb-10">
                Explore Jobs!!!
            </h1>
            
        {/* Loader & Content */}
        <Suspense fallback={
            <div className="mt-10 flex flex-col items-center">
                <p className="text-lg font-medium">Loading companies...</p>
                <div className="w-1/2 md:w-1/3 mt-2">
                    <LinearProgress color="inherit" />
                </div>
            </div>
        }>     
        <JobPostingCatalog jobPostingsJson={jobPostingsJson} />
        </Suspense>
        </main>
    );
}