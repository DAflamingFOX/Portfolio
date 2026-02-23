'use client';

import { Divider, Link } from "@heroui/react";

export function Footer() {
    return (
        <>
            <Divider />
            <div className="w-full min-h-[32px] bg-content1 p-4">
                Copyright © {new Date().getFullYear()} <Link href="/contact_me" color="foreground">Jeffrey Morris</Link>, All Rights Reserved.
            </div>
        </>
    );
}