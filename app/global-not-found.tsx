'use client';

import { Providers } from "./providers";

import { Image, Link } from "@heroui/react";

import './styles/globals.css';


export default function GlobalNotFound() {
    return (
        <html lang="en" dir="ltr" suppressHydrationWarning>
            <body>
                <Providers>
                    <div className="flex h-screen w-screen justify-center items-center relative">
                        {/* Container for image + centered text */}
                        <div className="flex flex-col items-center">
                            <Image isBlurred src="/rethink_your_life.jpeg" className="mb-4" />

                            <div className="text-2xl font-semibold text-center">
                                You want to <Link href="/" className="text-2xl">go home</Link> and rethink your life.
                            </div>
                        </div>

                        {/* Lower text */}
                        <div className="absolute top-[85%] left-1/2 -translate-x-1/2">
                            <p>404 | Page Not Found</p>
                        </div>
                    </div>
                </Providers>
            </body>
        </html>
    );
}