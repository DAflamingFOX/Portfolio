// tailwind.config.js
const { heroui } = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    darkMode: "class",
    plugins: [heroui(
        {
            "themes": {
                "light": {
                    "colors": {
                        "default": {
                            "50": "#f8f8f8",
                            "100": "#efefef",
                            "200": "#e5e5e5",
                            "300": "#dcdcdc",
                            "400": "#d2d2d2",
                            "500": "#c9c9c9",
                            "600": "#a6a6a6",
                            "700": "#838383",
                            "800": "#5f5f5f",
                            "900": "#3c3c3c",
                            "foreground": "#000",
                            "DEFAULT": "#c9c9c9"
                        },
                        "primary": {
                            "50": "#dfecff",
                            "100": "#b3d2ff",
                            "200": "#86b8ff",
                            "300": "#599eff",
                            "400": "#2d83ff",
                            "500": "#0069ff",
                            "600": "#0057d2",
                            "700": "#0044a6",
                            "800": "#003279",
                            "900": "#00204d",
                            "foreground": "#fff",
                            "DEFAULT": "#0069ff"
                        },
                        "secondary": {
                            "50": "#e8e6f3",
                            "100": "#c8c4e3",
                            "200": "#a7a1d3",
                            "300": "#877fc3",
                            "400": "#665cb2",
                            "500": "#463aa2",
                            "600": "#3a3086",
                            "700": "#2e2669",
                            "800": "#211c4d",
                            "900": "#151131",
                            "foreground": "#fff",
                            "DEFAULT": "#463aa2"
                        },
                        "success": {
                            "50": "#eff9f9",
                            "100": "#d9f1f1",
                            "200": "#c3e8e9",
                            "300": "#ade0e1",
                            "400": "#97d7d9",
                            "500": "#81cfd1",
                            "600": "#6aabac",
                            "700": "#548788",
                            "800": "#3d6263",
                            "900": "#273e3f",
                            "foreground": "#000",
                            "DEFAULT": "#81cfd1"
                        },
                        "warning": {
                            "50": "#fdfaf7",
                            "100": "#faf3eb",
                            "200": "#f7ecdf",
                            "300": "#f5e5d3",
                            "400": "#f2dec7",
                            "500": "#efd7bb",
                            "600": "#c5b19a",
                            "700": "#9b8c7a",
                            "800": "#726659",
                            "900": "#484138",
                            "foreground": "#000",
                            "DEFAULT": "#efd7bb"
                        },
                        "danger": {
                            "50": "#fcf1f1",
                            "100": "#f7dcdc",
                            "200": "#f3c8c8",
                            "300": "#eeb4b4",
                            "400": "#ea9f9f",
                            "500": "#e58b8b",
                            "600": "#bd7373",
                            "700": "#955a5a",
                            "800": "#6d4242",
                            "900": "#452a2a",
                            "foreground": "#000",
                            "DEFAULT": "#e58b8b"
                        },
                        "background": "#fafaff",
                        "foreground": {
                            "50": "#e0dfe1",
                            "100": "#b4b3b8",
                            "200": "#88868e",
                            "300": "#5c5a64",
                            "400": "#302d3b",
                            "500": "#040111",
                            "600": "#03010e",
                            "700": "#03010b",
                            "800": "#020008",
                            "900": "#010005",
                            "foreground": "#fff",
                            "DEFAULT": "#040111"
                        },
                        "content1": {
                            "DEFAULT": "#f2f8ff",
                            "foreground": "#000"
                        },
                        "content2": {
                            "DEFAULT": "#d9e9ff",
                            "foreground": "#000"
                        },
                        "content3": {
                            "DEFAULT": "#bfdaff",
                            "foreground": "#000"
                        },
                        "content4": {
                            "DEFAULT": "#a6cbff",
                            "foreground": "#000"
                        },
                        "focus": "#0069ff",
                        "overlay": "#000000",
                        "divider": "#111111"
                    }
                },
                "dark": {
                    "colors": {
                        "default": {
                            "50": "#0c0e11",
                            "100": "#13161b",
                            "200": "#1a1f24",
                            "300": "#21272e",
                            "400": "#282f38",
                            "500": "#4e535b",
                            "600": "#73787e",
                            "700": "#999ca0",
                            "800": "#bfc1c3",
                            "900": "#e4e5e6",
                            "foreground": "#fff",
                            "DEFAULT": "#282f38"
                        },
                        "primary": {
                            "50": "#00204d",
                            "100": "#003279",
                            "200": "#0044a6",
                            "300": "#0057d2",
                            "400": "#0069ff",
                            "500": "#2d83ff",
                            "600": "#599eff",
                            "700": "#86b8ff",
                            "800": "#b3d2ff",
                            "900": "#dfecff",
                            "foreground": "#fff",
                            "DEFAULT": "#0069ff"
                        },
                        "secondary": {
                            "50": "#151131",
                            "100": "#211c4d",
                            "200": "#2e2669",
                            "300": "#3a3086",
                            "400": "#463aa2",
                            "500": "#665cb2",
                            "600": "#877fc3",
                            "700": "#a7a1d3",
                            "800": "#c8c4e3",
                            "900": "#e8e6f3",
                            "foreground": "#fff",
                            "DEFAULT": "#463aa2"
                        },
                        "success": {
                            "50": "#273e3f",
                            "100": "#3d6263",
                            "200": "#548788",
                            "300": "#6aabac",
                            "400": "#81cfd1",
                            "500": "#97d7d9",
                            "600": "#ade0e1",
                            "700": "#c3e8e9",
                            "800": "#d9f1f1",
                            "900": "#eff9f9",
                            "foreground": "#000",
                            "DEFAULT": "#81cfd1"
                        },
                        "warning": {
                            "50": "#484138",
                            "100": "#726659",
                            "200": "#9b8c7a",
                            "300": "#c5b19a",
                            "400": "#efd7bb",
                            "500": "#f2dec7",
                            "600": "#f5e5d3",
                            "700": "#f7ecdf",
                            "800": "#faf3eb",
                            "900": "#fdfaf7",
                            "foreground": "#000",
                            "DEFAULT": "#efd7bb"
                        },
                        "danger": {
                            "50": "#452a2a",
                            "100": "#6d4242",
                            "200": "#955a5a",
                            "300": "#bd7373",
                            "400": "#e58b8b",
                            "500": "#ea9f9f",
                            "600": "#eeb4b4",
                            "700": "#f3c8c8",
                            "800": "#f7dcdc",
                            "900": "#fcf1f1",
                            "foreground": "#000",
                            "DEFAULT": "#e58b8b"
                        },
                        "background": "#030208",
                        "foreground": {
                            "50": "#46464d",
                            "100": "#6e6e79",
                            "200": "#9797a6",
                            "300": "#bfbfd2",
                            "400": "#e8e8ff",
                            "500": "#ececff",
                            "600": "#f0f0ff",
                            "700": "#f4f4ff",
                            "800": "#f8f8ff",
                            "900": "#fcfcff",
                            "foreground": "#000",
                            "DEFAULT": "#e8e8ff"
                        },
                        "content1": {
                            "DEFAULT": "#001026",
                            "foreground": "#fff"
                        },
                        "content2": {
                            "DEFAULT": "#001533",
                            "foreground": "#fff"
                        },
                        "content3": {
                            "DEFAULT": "#001a40",
                            "foreground": "#fff"
                        },
                        "content4": {
                            "DEFAULT": "#00204d",
                            "foreground": "#fff"
                        },
                        "focus": "#0069ff",
                        "overlay": "#ffffff",
                        "divider": "#ffffff"
                    }
                }
            },
            "layout": {
                "fontSize": {
                    "tiny": "0.75rem",
                    "small": "0.875rem",
                    "medium": "1rem",
                    "large": "1.125rem"
                },
                "lineHeight": {
                    "tiny": "1rem",
                    "small": "1.25rem",
                    "medium": "1.5rem",
                    "large": "1.75rem"
                },
                "radius": {
                    "small": "0.5rem",
                    "medium": "0.75rem",
                    "large": "0.875rem"
                },
                "borderWidth": {
                    "small": "1px",
                    "medium": "2px",
                    "large": "3px"
                },
                "disabledOpacity": "0.5",
                "dividerWeight": "1",
                "hoverOpacity": "0.9"
            }
        }
    )],
};

