'use client'
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function Banner() {
    const covers = ['/img/cover7.jpg', '/img/cover5.jpg', '/img/cover6.jpg', '/img/cover8.jpg'];
    const [index, setIndex] = useState(0);
    const router = useRouter();
    const { data: session } = useSession();

    // Log session to check if it's properly loaded
    useEffect(() => {
        console.log(session);
    }, [session]);

    // Auto-change background every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % covers.length);
        }, 5000); // Change every 5 seconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    return (
        <div className="relative w-full min-h-[700px] md:min-h-[600px] lg:min-h-[700px] overflow-hidden cursor-pointer"
             onClick={() => setIndex((index + 1) % covers.length)}
        >
            {/* Background Images with Crossfade Effect */}
            <div className="absolute inset-0 w-full h-full">
                {covers.map((src, i) => (
                    <Image
                        key={i}
                        src={src}
                        alt="cover"
                        fill
                        priority
                        className={`object-cover transition-opacity duration-1000 ease-in-out ${index === i ? 'opacity-100' : 'opacity-0'}`}
                    />
                ))}
            </div>

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30 flex flex-col items-center justify-center text-center text-white p-6">
                <h1 className="text-5xl md:text-6xl font-extrabold tracking-wide leading-tight drop-shadow-lg">
                    Unlocking Opportunities for Every Career
                </h1>
                <h3 className="text-lg md:text-2xl font-light mt-4 max-w-2xl">
                    Discover top employers, connect with recruiters, and take the next step in your professional journey.
                </h3>
            </div>

            {/* Welcome Message */}
            {session && (
                <button
                    className="absolute top-5 right-10 bg-white/80 text-black font-semibold px-5 py-3 rounded-xl shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl focus:outline-none"
                    onClick={(e) => { 
                        console.log('Yeay');
                        router.push('/me'); 
                    }}
                >
                    Welcome, {session.user?.name}
                </button>
            )}

            {/* Action Buttons */}
            <div className="absolute bottom-6 right-6 flex space-x-4">
                {/* See Companies Button */}
                <button
                    className="bg-gradient-to-r from-cyan-500 to-green-500 text-white font-semibold px-5 py-3 rounded-full shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-cyan-400"
                    onClick={(e) => { 
                        e.stopPropagation(); 
                        router.push('/companies');
                        router.refresh(); 
                    }}
                >
                    See Companies
                </button>

                {/* See JobPostings Button */}
                <button
                    className="bg-white text-black font-semibold px-5 py-3 rounded-full shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-cyan-400"
                    onClick={(e) => { 
                        e.stopPropagation(); 
                        router.push('/jobpostings');
                        router.refresh();
                    }} // Change path manually
                >
                    See JobPostings
                </button>

                {/* See Interviews Button */}
                <button
                    className="bg-white text-black font-semibold px-5 py-3 rounded-full shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-cyan-400"
                    onClick={(e) => { 
                        e.stopPropagation(); 
                        router.push('/interviews');
                        router.refresh(); 
                    }} // Change path manually
                >
                    See Interviews
                </button>
            </div>
        </div>
    );
}
