'use client';

import AbtMeAniText from "@/components/AbtMeAniText";
import { GlyphCanvas } from "@/components/Glyphs/GlyphCanvas";
import { ScrollIndicator } from "@/components/ScrollIndicator";
import { useEffect, useRef, useState } from "react";

export default function Page() {
    const textRef = useRef<HTMLDivElement>(null);
    const [textBounds, setTextBounds] = useState<DOMRect | null>(null);

    useEffect(() => {
        const updateBounds = () => {
            if (textRef.current) {
                setTextBounds(textRef.current.getBoundingClientRect());
                // console.log(textRef.current.getBoundingClientRect());
            }
        }



        const interval = setInterval(updateBounds); // poll for layout changes

        updateBounds();
        window.addEventListener("resize", updateBounds);

        return () => {
            window.removeEventListener("resize", updateBounds);
            clearInterval(interval);
        }
    }, []);

    return (
        <div className="w-screen h-screen">
            <GlyphCanvas boundingBox={textBounds} />
            <div className="absolute inset-0 flex items-center justify-center z-10">
                <AbtMeAniText ref={textRef} />
            </div>
            <ScrollIndicator />
        </div>
    );
}