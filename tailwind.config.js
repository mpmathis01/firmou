/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class', // Importante para o toggle de tema funcionar igual
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                outfit: ['Outfit', 'sans-serif'],
                inter: ['Inter', 'sans-serif'],
                serif: ['"Playfair Display"', 'serif'],
                mono: ['"Space Mono"', 'monospace'],
            },
            colors: {
                firmou: {
                    dark: '#0f172a',
                    amber: '#fbbf24',
                }
            }
        },
    },
    plugins: [],
}
