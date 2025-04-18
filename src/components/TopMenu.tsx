'use client'
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function TopMenu() {
    const { data: session } = useSession();

    return (
        <div className="w-full h-16 bg-white text-cyan-600 shadow-md backdrop-blur-md flex items-center justify-between px-6 fixed top-0 z-50">
            {/* Logo */}
            <Link href="/">
                <Image
                    src="/img/logo5.png"
                    alt="logo"
                    width={125}
                    height={115}
                    style={{ marginTop: "110px" }}
                    className="object-contain cursor-pointer"
                />
            </Link>

            {/* Authentication Button */}
            <div className="flex items-center space-x-4">
                {session ? (
                    <Link href="/api/auth/signout">
                        <div className="text-sm font-medium cursor-pointer hover:text-cyan-800 transition-all">
                            Sign-Out of {session.user?.name}
                        </div>
                    </Link>
                ) : (
                    <>
                        <Link href="/api/auth/signin">
                            <div className="text-sm font-medium cursor-pointer hover:text-cyan-800 transition-all">
                                Sign-In
                            </div>
                        </Link>
                        <Link href="/register">
                            <div className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-6 rounded-full cursor-pointer transition-all">
                                Register
                            </div>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}
