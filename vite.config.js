import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/js/app.js'], // Keep as .js
            refresh: true,
        }),
        react({
            // Explicitly tell Vite to handle JSX in .js files
            include: ['**/*.{js,jsx}'],
        }),
    ],
    server: {
        host: '0.0.0.0',
        hmr: {
            host: 'localhost',
        },
    },
});