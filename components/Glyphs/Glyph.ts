import { commonColors, semanticColors } from "@heroui/theme";

export type Glyph = {
    char: string;
    birth: number;
    lifespan: number; // time to live in ms.
    // Canvas stuff
    color: string; // css color
    opacity: number; // 0-1
    // Position
    x: number;
    y: number;
    // Velocity
    vx: number;
    vy: number;
    // Acceleration
    ax: number;
    ay: number;
}

const GLYPH_CHARS: string[] = "".split("");

export function getRandomGlyphChar(): string {
    return GLYPH_CHARS[Math.floor(Math.random() * GLYPH_CHARS.length)];
}

export function getRandomGlyphColor(): string {

    const isDarkMode = document.documentElement.classList.contains("dark");

    const GLYPH_COLORS: {color: string, percentage: number}[] = [
        { color: isDarkMode ? semanticColors.dark.foreground[500] ?? '#FFFFFF' : semanticColors.light.foreground[500] ?? '#000000', percentage: 0.5 },
        { color: commonColors.blue[500], percentage: 0.5 / 9 },
        { color: commonColors.cyan[500], percentage: 0.5 / 9 },
        { color: commonColors.green[500], percentage: 0.5 / 9 },
        { color: commonColors.pink[500], percentage: 0.5 / 9 },
        { color: commonColors.purple[500], percentage: 0.5 / 9 },
        { color: commonColors.red[500], percentage: 0.5 / 9 },
        { color: commonColors.white[500], percentage: 0.5 / 9 },
        { color: commonColors.yellow[500], percentage: 0.5 / 9 },
        { color: commonColors.zinc[500], percentage: 0.5 / 9 },
    ];

    const r = Math.random();
    let acc = 0;
    for (const { color, percentage } of GLYPH_COLORS) {
        acc += percentage;
        if (r < acc) return color;
    }
    return GLYPH_COLORS[0].color;
}