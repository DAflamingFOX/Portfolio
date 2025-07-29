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
    originalSpeed: number;
    life: number; // 0 to 1
    lifespan: number;
    birth: number;
    color: string;
    distanceToCenter: number;
};

function getWeightedRandomColor() {
    const r = Math.random();
    let acc = 0;
    for (const { color, percentage } of GLYPH_COLORS) {
        acc += percentage;
        if (r < acc) return color;
    }
    return GLYPH_COLORS[0].color;
}

export function GlyphBackground() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [glyphs, setGlyphs] = useState<GlyphEntity[]>([]);
    const nextIndex = useRef(0);

    useEffect(() => {
        const spawnInterval = setInterval(() => {
            const rect = containerRef.current?.getBoundingClientRect();
            if (!rect) return;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Choose random edge spawn
            const side = Math.floor(Math.random() * 4);
            let x = 0, y = 0;

            switch (side) {
                case 0: x = Math.random() * rect.width; y = 0; break; // top
                case 1: x = rect.width; y = Math.random() * rect.height; break; // right
                case 2: x = Math.random() * rect.width; y = rect.height; break; // bottom
                case 3: x = 0; y = Math.random() * rect.height; break; // left
            }

            const dx = centerX - x;
            const dy = centerY - y;
            const distanceToCenter = Math.hypot(dx, dy);
            const angle = Math.atan2(dy, dx);
            const speed = Math.random() * (MAX_SPEED - MIN_SPEED) + MIN_SPEED;
            const lifespan = Math.random() * (MAX_LIFESPAN_MS - MIN_LIFESPAN_MS) + MIN_LIFESPAN_MS;
            const char = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

            setGlyphs((prev) => {
                const newGlyph: GlyphEntity = {
                    index: nextIndex.current++,
                    char,
                    x,
                    y,
                    angle,
                    speed,
                    originalSpeed: speed,
                    life: 0,
                    lifespan,
                    birth: performance.now(),
                    color: getWeightedRandomColor(),
                    distanceToCenter,
                };

                const next = [...prev, newGlyph];
                return next.length > MAX_GLYPHS ? next.slice(next.length - MAX_GLYPHS) : next;
            });

        }, 25);

        return () => clearInterval(spawnInterval);
    }, []);

    useEffect(() => {
        let animId: number;

        const update = () => {
            const now = performance.now();
            setGlyphs((prev) =>
                prev
                    .map((g) => {
                        const dx = Math.cos(g.angle) * g.speed;
                        const dy = Math.sin(g.angle) * g.speed;
                        const speed = g.speed * (1 - FRICTION);

                        const newX = g.x + dx;
                        const newY = g.y + dy;

                        const distanceToCenter = Math.hypot(
                            window.innerWidth / 2 - newX,
                            window.innerHeight / 2 - newY
                        );

                        const timeAlive = now - g.birth;
                        const life = timeAlive / g.lifespan;

                        return {
                            ...g,
                            x: newX,
                            y: newY,
                            speed,
                            char: Math.random() < CHANGE_GLYPH_CHANCE
                                ? GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
                                : g.char,
                            life,
                            distanceToCenter,
                        };
                    })
                    .filter((g) => g.distanceToCenter > 30 && g.life < 1) // Remove if near center or expired
            );

            animId = requestAnimationFrame(update);
        };

        animId = requestAnimationFrame(update);
        return () => cancelAnimationFrame(animId);
    }, []);

    return (
        <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none">
            {glyphs.map((glyph) => {
                const fadeOutStartDistance = 100; // px from center
                const fadeRatio = Math.min(1, glyph.distanceToCenter / fadeOutStartDistance);
                const fadeIn = glyph.life < 0.2 ? glyph.life * 5 : 1;

                return (
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
                            opacity: Math.min(fadeIn, fadeRatio),
                            transition: "opacity 0.1s linear",
                            pointerEvents: "none",
                            willChange: 'transform, opacity',
                        }}
                    >
                        {glyph.char}
                    </span>
                );
            })}
        </div>
    );
}
