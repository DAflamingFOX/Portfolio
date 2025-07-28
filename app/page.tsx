'use client';

import { AbtMeAniText } from "@/components/AbtMeAniText";
import { GlyphBackground } from "@/components/GlyphBackground";
import { ScrollIndicator } from "@/components/ScrollIndicator";

export default function Page() {
    return (
        <div className="w-screen h-screen">
            <GlyphBackground />
            <div className="absolute inset-0 flex items-center justify-center z-10">
                <AbtMeAniText />
            </div>
            <ScrollIndicator />
        </div>
    );
}