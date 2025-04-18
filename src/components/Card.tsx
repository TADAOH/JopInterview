'use client';
import Image from 'next/image';
import InteractiveCard from './InteractiveCard';
import { useState } from 'react';
import Rating from '@mui/material/Rating';

export default function Card({ companyName, imgSrc, onCard }
    : { companyName: string, imgSrc: string, onCard?: (name: string, rating: number | null) => void }) {
    
    const [value, setValue] = useState<number | null>(0);

    return (
        <InteractiveCard>
            {/* Card Container with Hover Effects */}
            <div className="group bg-white shadow-lg rounded-xl overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 ease-in-out">

                {/* Image Section */}
                <div className="relative w-full h-[200px] overflow-hidden">
                    <Image 
                        src={imgSrc}
                        alt={companyName}
                        width={500}
                        height={300}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                    />
                </div>

                {/* Company Details */}
                <div className="p-5 bg-white text-center">
                    {/* Company Name with Glow Effect */}
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-cyan-500 transition-all duration-300 drop-shadow-md">
                        {companyName}
                    </h3>

                    {/* Rating Component */}
                    {onCard && (
                        <div className="mt-3 flex justify-center">
                            <Rating
                                name={`${companyName}-rating`}
                                value={value}
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                    if (onCard) onCard(companyName, newValue);
                                }}
                                onClick={(e) => e.stopPropagation()}
                                className="scale-110"
                            />
                        </div>
                    )}
                </div>
            </div>
        </InteractiveCard>
    );
}
