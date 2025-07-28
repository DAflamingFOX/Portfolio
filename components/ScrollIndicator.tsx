'use client';
import { useEffect, useState } from "react";

export function ScrollIndicator() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => setVisible(true), 5000); // 5s delay
        return () => clearTimeout(timeout);
    }, []);

    return (
        <div
            className={`p-2 backdrop-blur-sm
        absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20
        flex flex-col items-center transition-opacity duration-1000
        ${visible ? 'opacity-100' : 'opacity-0'}`}>
            <span className="mb-1 text-sm">Scroll down</span>
            <div className="animate-bounce text-2xl">
                <svg className="dark:fill-white fill-black" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" /></svg>
            </div>
        </div>
    );
}
