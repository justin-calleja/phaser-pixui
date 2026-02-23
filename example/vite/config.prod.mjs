import { defineConfig } from 'vite';
import { runAssetPipeline } from './asset-pipeline.mjs';
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
    build: {
        rollupOptions: {
        },
        minify: 'terser',
        terserOptions: {
            compress: {
                passes: 2
            },
            mangle: true,
            format: {
                comments: false
            }
        }
    },
    server: {
        port: 8080
    },
    plugins: [
        {
            name: 'asset-pipeline-runner',
            buildStart() {
                try {
                    runAssetPipeline();
                } catch (error) {
                    process.exit(1);
                }
            }
        },
        {
            name: 'build-notifications',
            buildStart() { console.log('Building application...') },
            renderStart() { console.log('Minifying application...') }
        }
    ]
});
