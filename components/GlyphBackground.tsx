'use client';

import React, { useEffect, useRef, useState } from "react";
import monocraft from "@/app/fonts/monocraft";

const GLYPHS = "".split("");
const MAX_LIFESPAN_MS = 10000;
const MIN_LIFESPAN_MS = 3000;
const MAX_SPEED = 5;
const MIN_SPEED = 0.25;
const FRICTION = 0.005;
const CHANGE_GLYPH_CHANCE = 0.03;
const MAX_GLYPHS = 150;
const GLYPH_COLORS = [
    { color: 'var(--foreground)', percentage: 0.5 },
    { color: '#0000AA', percentage: 0.5 / 11 },
    { color: '#00AA00', percentage: 0.5 / 11 },
    { color: '#00AAAA', percentage: 0.5 / 11 },
    { color: '#AA0000', percentage: 0.5 / 11 },
    { color: '#AA00AA', percentage: 0.5 / 11 },
    { color: '#FFAA00', percentage: 0.5 / 11 },
    { color: '#55FF55', percentage: 0.5 / 11 },
    { color: '#55FFFF', percentage: 0.5 / 11 },
    { color: '#FF5555', percentage: 0.5 / 11 },
    { color: '#FF55FF', percentage: 0.5 / 11 },
    { color: '#FFFF55', percentage: 0.5 / 11 },
];

type GlyphEntity = {
    index: number;
    char: string;
    x: number;
    y: number;
    angle: number;
    speed: number;
    life: number; // 0 to 1
    lifespan: number;
    birth: number; // timestamp
    color: string;
};

function getWeightedRandomColor() {
    const r = Math.random();
    let acc = 0;
    for (const { color, percentage } of GLYPH_COLORS) {
        acc += percentage;
        if (r < acc) return color;
    }
    return GLYPH_COLORS[0].color; // fallback
}

export function GlyphBackground() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [glyphs, setGlyphs] = useState<GlyphEntity[]>([]);
    const nextIndex = useRef(0);

    // Add new glyphs at intervals
    useEffect(() => {
        const spawnInterval = setInterval(() => {
            const rect = containerRef.current?.getBoundingClientRect();
            if (!rect) return;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const angle = Math.random() * 2 * Math.PI;
            const offset = 50 + Math.random() * 20;

            const x = centerX + Math.cos(angle) * offset;
            const y = centerY + Math.sin(angle) * offset;

            const speed = Math.random() * (MAX_SPEED - MIN_SPEED + 1) + MIN_SPEED; // pixels/frame
            const lifespan = Math.random() * (MAX_LIFESPAN_MS - MIN_LIFESPAN_MS + 1) + MIN_LIFESPAN_MS;
            const char = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

            setGlyphs((prev) => {
                const newGlyph: GlyphEntity = {
                    index: nextIndex.current++,
                    char,
                    x,
                    y,
                    angle,
                    speed,
                    life: 0,
                    lifespan,
                    birth: performance.now(),
                    color: getWeightedRandomColor(),
                };

                const next = [...prev, newGlyph];

                // Keep only the last MAX_GLYPHS
                return next.length > MAX_GLYPHS ? next.slice(0, MAX_GLYPHS) : next;
            });

        }, 25);

        return () => clearInterval(spawnInterval);
    }, []);

    // Animate glyphs
    useEffect(() => {
        let animId: number;

        const update = () => {
            const now = performance.now();
            setGlyphs((prev) =>
                prev
                    .map((g) => {
                        const dx = Math.cos(g.angle) * g.speed;
                        const dy = Math.sin(g.angle) * g.speed;

                        const speed = (1 - FRICTION) * g.speed;

                        // Change glyph randomly
                        const shouldChange = Math.random() < CHANGE_GLYPH_CHANCE;
                        const char = shouldChange
                            ? GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
                            : g.char;

                        return {
                            ...g,
                            x: g.x + dx,
                            y: g.y + dy,
                            speed,
                            char,
                            life: (now - g.birth) / g.lifespan,
                        };
                    })
                    .filter((g) => {
                        const offScreen =
                            g.x < 50 ||
                            g.x > window.innerWidth - 50 ||
                            g.y < -50 ||
                            g.y > window.innerHeight - 50;

                        // Remove old glyphs and glyphs that have gone off-screen
                        console.log(g.lifespan);
                        return g.life < 1 && !offScreen;
                    })
            );

            animId = requestAnimationFrame(update);
        };

        animId = requestAnimationFrame(update);
        return () => cancelAnimationFrame(animId);
    }, []);

    return (
        <>
            <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none">
                {glyphs.map((glyph) => (
                    <span
                        key={glyph.index}
                        className={monocraft.className}
                        style={{
                            color: glyph.color,
                            position: "absolute",
                            left: glyph.x,
                            top: glyph.y,
                            transform: "translate(-50%, -50%)",
                            fontSize: "18px",
                            opacity: glyph.life < 0.2
                                ? glyph.life * 5 // fade in
                                : 1 - (glyph.life - 0.2), // fade out after
                            transition: "opacity 0.1s linear",
                            pointerEvents: "none",
                            willChange: 'transform, opacity',
                        }}
                    >
                        {glyph.char}
                    </span>
                ))}
            </div>
        </>
    );
};
