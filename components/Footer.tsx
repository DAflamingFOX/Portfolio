'use client';

import { Link } from "@heroui/react";

export function Footer() {
    return (
        <div className="w-full min-h-[128px] flex p-8 bg-emerald-100 dark:bg-emerald-950">
            <div className="my-auto content w-full flex flex-col justify-start">
                <p>Copyright © {new Date().getFullYear()} Jeffrey Morris, All Rights Reserved.</p>
                <Link href='/contact_me'>Contact Me</Link>
            </div>
        </div>
    );
}