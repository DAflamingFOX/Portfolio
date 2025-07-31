import { getRandomGlyphChar, getRandomGlyphColor, Glyph } from "./Glyph";
import { commonColors, semanticColors } from "@heroui/theme";

// Represents a function which updates the glyphs each frame.
type GlyphAnimation = {
    glyphs: Glyph[],
    name: string,
    // Called to request the animation to spawn more glyphs
    spawn: (width: number, height: number) => void,
    // Called to update *this* animation's glyphs.
    update: (width: number, height: number) => void,
};

export const twinkle: GlyphAnimation = {
    glyphs: [],
    name: 'Twinkling Stars',
    spawn(width, height) {

        for (let i = 0; i < 5; i++) {
            let g: Glyph = {
                char: getRandomGlyphChar(),
                color: document.documentElement.classList.contains("dark") ? semanticColors.dark.foreground[500] ?? '#FFFFFF' : semanticColors.light.foreground[500] ?? '#000000',
                opacity: 1,
                birth: performance.now(),
                lifespan: 3000,
                x: Math.random() * width,
                y: Math.random() * height,
                vx: 0,
                vy: 0,
                ax: 0,
                ay: 0
            }
            this.glyphs.push(g);
        }
    },

    update(width, height) {
        this.glyphs = this.glyphs.filter(g => {

            var life = (performance.now() - g.birth) / g.lifespan;
            if (life > 1) return false;

            if (Math.random() < 0.0025)
                g.char = getRandomGlyphChar();

            if (life < 0.2)
                g.opacity = life * 5;
            else if (life < 0.8)
                g.opacity = 1;
            else
                g.opacity = 1 + (0.8 - life) * 5;

            return true;
        });
    }
}
export const FlyOut: GlyphAnimation = {
    glyphs: [],
    name: 'Fly Outwards',
    spawn(width, height) {

        const MAX_SPEED = 5;
        const MIN_SPEED = 0.25;
        const LIFESPAN = 5000;

        for (let i = 0; i < 3; i++) {
            const magnitude = Math.pow(Math.random(), 0.8) * (MAX_SPEED - MIN_SPEED + 1) + MIN_SPEED;
            const angle = Math.random() * (2 * Math.PI - 0 + 1);

            let g: Glyph = {
                char: getRandomGlyphChar(),
                color: getRandomGlyphColor(),
                opacity: 1,
                birth: performance.now(),
                lifespan: LIFESPAN,
                x: width / 2,
                y: height / 2,
                vx: magnitude * Math.cos(angle),
                vy: magnitude * Math.sin(angle),
                ax: 0,
                ay: 0
            }
            this.glyphs.push(g);
        }

    },

    update(width, height) {
        this.glyphs = this.glyphs.filter(g => {

            g.x += g.vx;
            g.y += g.vy;
            g.vx *= 0.995;
            g.vy *= 0.995;

            var life = (performance.now() - g.birth) / g.lifespan;
            if (life > 1) return false;

            if (Math.random() < 0.0025)
                g.char = getRandomGlyphChar();

            if (life < 0.2)
                g.opacity = life * 5;
            else if (life < 0.8)
                g.opacity = 1;
            else
                g.opacity = 1 + (0.8 - life) * 5;

            return true;
        });
    }
}

export const flyIn: GlyphAnimation = {
    glyphs: [],
    name: 'Fly Inwards',
    spawn(width, height) {

        const MAX_SPEED = 5;
        const MIN_SPEED = 0.25;
        const LIFESPAN = 5000;

        for (let i = 0; i < 3; i++) {
            const magnitude = Math.pow(Math.random(), 0.8) * (MAX_SPEED - MIN_SPEED + 1) + MIN_SPEED;
            const angle = Math.random() * (2 * Math.PI - 0 + 1);

            let g: Glyph = {
                char: getRandomGlyphChar(),
                color: getRandomGlyphColor(),
                opacity: 1,
                birth: performance.now(),
                lifespan: LIFESPAN,
                x: width / 2,
                y: height / 2,
                vx: magnitude * Math.cos(angle),
                vy: magnitude * Math.sin(angle),
                ax: 0,
                ay: 0
            }
            this.glyphs.push(g);
        }

    },
    update(width, height) {

    },
}






