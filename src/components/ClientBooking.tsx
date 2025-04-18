"use client"; 

import Reserve from "@/components/DateReserve";

function ClientBooking() {
    function clickSubmit() {
        alert("Book Venue");
    }

    return (
        <main className="w-full flex flex-col items-center space-y-6 py-6">
            <div className="text-2xl font-semibold text-black">Venue Booking</div>
            <div className="text-md text-gray-600 text-center">
                Enter the information of the contact person, the type of venue, and the event dates
            </div>
            <form>
            <div className="w-fit p-4 bg-white rounded-lg shadow-lg">
                <Reserve />
            </div>
            <button 
                className="block rounded bg-[#F5DEB3] hover:bg-[#8B4513] px-6 py-3 text-white shadow-md font-semibold"
                type="submit">
                Book Venue
            </button>
            </form>
        </main>
    );
}

export default ClientBooking;