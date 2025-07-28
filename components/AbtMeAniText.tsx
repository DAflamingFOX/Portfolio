'use client';

import React, { useEffect, useState } from 'react';
import monocraft from '@/app/fonts/monocraft';

const galactic_alphabet = '';

const phrases = [
    "Howdy, I'm Jeffrey!",
    'I\'m an electrical engineer.',
    'I\'m a software developer.',
    'I\'m a problem solver.',
    'I run on caffeine.',
    'I\'m a robotics enthusiast.'
];

type Phase =
    | 'empty'
    | 'glitchIn'
    | 'resolve'
    | 'hold'
    | 'glitchOut'
    | 'transition';

const getRandomGlyph = () =>
    galactic_alphabet[Math.floor(Math.random() * galactic_alphabet.length)];

const shuffleArray = (arr: number[]) => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
};

const getRandomIndex = (length: number) =>
    Math.floor(Math.random() * (length + 1));

export function AbtMeAniText() {
    const [displayText, setDisplayText] = useState<string[]>([]);
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [phase, setPhase] = useState<Phase>('empty');

    const currentPhrase = phrases[phraseIndex];

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        let interval: NodeJS.Timeout;

        if (phase === 'empty') {
            setDisplayText([]);
            timeout = setTimeout(() => setPhase('glitchIn'), 300);
        }

        // PHASE 1: GLITCH IN - build up the string one glyph at a time at random positions
        if (phase === 'glitchIn') {
            setDisplayText(Array(currentPhrase.length).fill('')); // initialize with empty

            interval = setInterval(() => {
                setDisplayText((prev) => {
                    const emptyIndices = prev
                        .map((ch, i) => (ch === '' ? i : -1))
                        .filter((i) => i !== -1);

                    if (emptyIndices.length === 0) {
                        clearInterval(interval);
                        setPhase('resolve');
                        return prev;
                    }

                    const randomEmptyIndex =
                        emptyIndices[Math.floor(Math.random() * emptyIndices.length)];

                    const updated = [...prev];
                    updated[randomEmptyIndex] = getRandomGlyph();
                    return updated;
                });
            }, 40);
        }



        // PHASE 2: RESOLVE - replace glyphs with correct characters in random order
        if (phase === 'resolve') {
            const indices = shuffleArray(
                Array.from({ length: currentPhrase.length }, (_, i) => i)
            );
            let progress = 0;

            interval = setInterval(() => {
                if (progress >= indices.length) {
                    clearInterval(interval);
                    setPhase('hold');
                    return;
                }

                const idx = indices[progress];
                setDisplayText((prev) => {
                    const updated = [...prev];
                    updated[idx] = currentPhrase[idx];
                    return updated;
                });

                progress++;
            }, 60);
        }



        // PHASE 3: HOLD - pause so user can read
        if (phase === 'hold') {
            timeout = setTimeout(() => setPhase('glitchOut'), 4000);
        }

        // PHASE 4: GLITCH OUT - characters are replaced by persistent glyphs in random order
        if (phase === 'glitchOut') {
            const indices = shuffleArray(
                Array.from({ length: displayText.length }, (_, i) => i)
            );
            let progress = 0;
            const updated = [...displayText];

            interval = setInterval(() => {
                if (progress >= indices.length) {
                    clearInterval(interval);
                    setPhase('transition');
                    return;
                }

                const idx = indices[progress];
                updated[idx] = getRandomGlyph();
                setDisplayText([...updated]);
                progress++;
            }, 40);
        }

        // PHASE 5: TRANSITION - match the new phrase's length
        if (phase === 'transition') {
            const nextPhrase = phrases[(phraseIndex + 1) % phrases.length];
            const updated = [...displayText];

            interval = setInterval(() => {
                if (updated.length === nextPhrase.length) {
                    clearInterval(interval);
                    setPhraseIndex((i) => (i + 1) % phrases.length);
                    setPhase('resolve');
                    return;
                }

                if (updated.length < nextPhrase.length) {
                    const insertAt = getRandomIndex(updated.length);
                    updated.splice(insertAt, 0, getRandomGlyph());
                } else {
                    const removeAt = getRandomIndex(updated.length - 1);
                    updated.splice(removeAt, 1);
                }

                setDisplayText([...updated]);
            }, 40);
        }

        return () => {
            clearTimeout(timeout);
            clearInterval(interval);
        };
    }, [phase]);

    return (
        <>
            <div className="p-1 rounded-xl">
                <h1 className={`text-3xl text-bold text-[#AA00AA] text-shadow-lg ${monocraft.className}`}>
                    {displayText.join('')}
                </h1>
            </div>
        </>
    );
};