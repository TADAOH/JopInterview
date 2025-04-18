import CompanyCatalog from "@/components/CompanyCatalog";
import getCompanies from "@/libs/getCompanies";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";

export default function Companies() {
    const companies = getCompanies();

    return (
        <main className="w-full min-h-screen bg-gradient-to-b from-cyan-600 to-green-500 text-center py-16 px-6 text-white">
            {/* Page Title with More Spacing */}
            <h1 className="text-3xl md:text-4xl font-extrabold drop-shadow-lg mb-10">
                Select Your Company
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
            <CompanyCatalog companiesJson={companies} />
            </Suspense>
        </main>
    );
}