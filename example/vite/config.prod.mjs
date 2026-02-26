import { defineConfig } from 'vite';
import { processAssetsProd } from 'pixel-tools';
import { assetsConfig } from './assets.mjs';
import pkg from '../../package.json' with { type: 'json' };

export default defineConfig({
    base: './',
    logLevel: 'warning',
    define: {
        'PHASER_PIXUI_VERSION': JSON.stringify(pkg.version),
    },
    resolve: {
        dedupe: ['phaser'],
    },
    preview: {
        port: 8080
    },
    plugins: [
        processAssetsProd(assetsConfig),
    ]
});
