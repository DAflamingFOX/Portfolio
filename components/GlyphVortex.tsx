'use client';

import React, { useEffect, useRef, useState } from "react";

const GLYPHS = "".split("");
const MAX_LIFESPAN = 100000;
const MIN_LIFESPAN = 3000;
const MAX_GLYPHS = 10000;
const ANGULAR_VELOCITY = 0.1;
const SPIRAL_SHRINK_RATE = 0.5;
const FADE_OUT_RADIUS = 50;

const GLYPH_COLORS = [
    { color: 'white', percentage: 0.5 },
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

type Glyph = {
    char: string;
    angle: number;
    radius: number;
    angularVelocity: number;
    shrinkRate: number;
    birth: number;
    lifespan: number;
    color: string;
};

function getWeightedRandomColor(): string {
    const r = Math.random();
    let acc = 0;
    for (const { color, percentage } of GLYPH_COLORS) {
        acc += percentage;
        if (r < acc) return color;
    }
    return GLYPH_COLORS[0].color;
}

export function SpiralCanvasGlyphs() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const glyphsRef = useRef<Glyph[]>([]);
    const animationFrame = useRef<number>(null);
    const spawnInterval = useRef<ReturnType<typeof setInterval>>(null);
    const [glyphCount, setGlyphCount] = useState(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        const centerX = width / 2;
        const centerY = height / 2;

        function spawnGlyph() {
            if (glyphsRef.current.length >= MAX_GLYPHS) return;

            const maxRadius = Math.hypot(width, height) / 2;
            const angle = Math.random() * 2 * Math.PI;
            const radius = maxRadius * 0.8 + Math.random() * maxRadius * 0.2;

            glyphsRef.current.push({
                char: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
                angle,
                radius,
                angularVelocity: ANGULAR_VELOCITY * (0.5 + Math.random()),
                shrinkRate: SPIRAL_SHRINK_RATE * (0.5 + Math.random()),
                birth: performance.now(),
                lifespan: Math.random() * (MAX_LIFESPAN - MIN_LIFESPAN) + MIN_LIFESPAN,
                color: getWeightedRandomColor(),
            });
        }


        document.fonts.ready.then(() => {
            ctx.font = "18px Monocraft, monospace"; // Important: fallback too
            function draw() {
                if (!ctx) { return }
                ctx.clearRect(0, 0, width, height);

                const now = performance.now();

                glyphsRef.current = glyphsRef.current.filter(glyph => {
                    const age = now - glyph.birth;
                    const life = age / glyph.lifespan;

                    if (life >= 1 || glyph.radius <= 2) return false;

                    glyph.angle += glyph.angularVelocity;
                    glyph.radius -= glyph.shrinkRate;

                    const x = centerX + Math.cos(glyph.angle) * glyph.radius;
                    const y = centerY + Math.sin(glyph.angle) * glyph.radius;

                    const fadeIn = life < 0.2 ? life * 5 : 1;
                    const fadeOut = glyph.radius < FADE_OUT_RADIUS
                        ? glyph.radius / FADE_OUT_RADIUS
                        : 1;
                    const opacity = Math.min(fadeIn, fadeOut);

                    ctx.globalAlpha = opacity;
                    ctx.fillStyle = glyph.color;
                    ctx.font = "18px Monocraft";
                    ctx.fillText(glyph.char, x, y);

                    return true;
                });

                setGlyphCount(glyphsRef.current.length);

                animationFrame.current = requestAnimationFrame(draw);
            }

            spawnInterval.current = setInterval(spawnGlyph, 0.01);
            animationFrame.current = requestAnimationFrame(draw);
        });
        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener("resize", handleResize);

        return () => {
            clearInterval(spawnInterval.current!);
            cancelAnimationFrame(animationFrame.current!);
            window.removeEventListener("resize", handleResize);
        };

    }, []);


    return (
        <>
            <p>{glyphCount}</p>
            <canvas
                ref={canvasRef}
                className="fixed inset-0 z-0 pointer-events-none"
            />
        </>

    );
}
