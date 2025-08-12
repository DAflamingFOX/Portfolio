'use client';

import React, { useEffect, useRef, useState } from "react";
import { monocraft } from '@/app/styles/fonts';
import { handler } from "next/dist/build/templates/app-page";
import { Glyph } from "./Glyph";
import { twinkle, FlyOut as flyOut } from "./GlyphAnimations"

type GlyphCanvasProps = {
    boundingBox: DOMRect | null;
};

const MAX_GLYPHS: number = 10_000;

const ANIMATIONS = [
    twinkle,
    flyOut
];

const ANIMATION_TIME = 10_000;

export function GlyphCanvas({ boundingBox }: GlyphCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const glyphsRef = useRef<Glyph[]>([]);
    const animationFrame = useRef<number>(null);
    const spawnInterval = useRef<ReturnType<typeof setInterval>>(null);
    const fpsRef = useRef(0);
    const lastTimeRef = useRef(performance.now());
    const frameCountRef = useRef(0);

    const [glyphCount, setGlyphCount] = useState(0);
    const [fps, setFps] = useState(0);
    const [aniName, setAniName] = useState('unknown');


    useEffect(() => {
        const interval = setInterval(() => {
            setFps(fpsRef.current);
            setGlyphCount(glyphsRef.current.length);
            const aniIndex = Math.floor(
                (performance.now() / ANIMATION_TIME) % ANIMATIONS.length
            );
            setAniName(ANIMATIONS[aniIndex].name);
        }, 250);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {

        function spawnGlyphs() {
            if (glyphsRef.current.length >= MAX_GLYPHS) return;

            const aniIndex = Math.floor((performance.now() / ANIMATION_TIME) % ANIMATIONS.length);

            const currAni = ANIMATIONS[aniIndex];
            currAni.spawn(window.innerWidth, window.innerHeight);
            setAniName(currAni.name);
        };

        // If you want more glyphs to spawn per interval add multiple in the spawnGlyph function, this is asynchronous and doesn't block code.
        spawnInterval.current = setInterval(spawnGlyphs, 50);

        return () => clearInterval(spawnInterval.current!);

    }, []);

    useEffect(() => {

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        if (!boundingBox) return;

        // Set canvas bounds.
        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        // Must wait for fonts to be loaded.
        document.fonts.ready.then(() => {

            ctx.font = "18px Monocraft monospace";

            function draw() {
                if (!ctx) return;

                const now = performance.now();
                frameCountRef.current++;

                // ^ update
                ANIMATIONS.forEach((a) => { a.update(width, height) });

                glyphsRef.current = ANIMATIONS.flatMap((ani) => { return ani.glyphs });

                glyphsRef.current.forEach(glyph => {
                    ctx.globalAlpha = glyph.opacity;
                    ctx.fillStyle = glyph.color;
                    ctx.font = "18px Monocraft";

                    // Check if glyph colides with bounding box.
                    if (boundingBox) {
                        const padding = 50;

                        const bl = boundingBox.left;
                        const br = boundingBox.right;
                        const bt = boundingBox.top;
                        const bb = boundingBox.bottom;

                        const gx = glyph.x;
                        const gy = glyph.y;

                        if (gx >= bl && gx <= br && gy >= bt && gy <= bb) {
                            ctx.globalAlpha = 0;
                        } else if (gx >= bl - padding && gx <= br + padding && gy >= bt - padding && gy <= bb + padding) {
                            // Compute shortest distance to box edge
                            const dx = Math.max(bl - gx, 0, gx - br);
                            const dy = Math.max(bt - gy, 0, gy - bb);
                            const dist = Math.sqrt(dx * dx + dy * dy);

                            if (dist < padding) {
                                const scale = dist / padding; // 0 to 1
                                ctx.globalAlpha = glyph.opacity * scale;
                            }
                        }

                    }

                    ctx.fillText(glyph.char, glyph.x, glyph.y)
                })

                if (now - lastTimeRef.current >= 1000) {
                    // It's been 1 second, calculate FPS
                    fpsRef.current = frameCountRef.current;
                    frameCountRef.current = 0;
                    lastTimeRef.current = now;
                }

                animationFrame.current = requestAnimationFrame(draw);
            }

            animationFrame.current = requestAnimationFrame(draw);

        });

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        }

        window.addEventListener("resize", handleResize);

        return () => {
            cancelAnimationFrame(animationFrame.current!);
            window.removeEventListener("resize", handleResize);
        }

    }, [boundingBox]); // useEffect

    return (
        <>
            <canvas ref={canvasRef} className={`absolute inset-0 z-0 pointer-events-none ${monocraft.className}`} style={{ backgroundColor: 'var(--background)' }} />
            <div className="relative z-10 block text-green-400 text-xl font-black text-shadow-lg text-shadow-black">
                <p>{`Current animation: ${aniName}`}</p>
                <p>{`Entities: ${glyphCount}`}</p>
                <p>{`FPS: ${fps}`}</p>
            </div>
        </>
    )

}