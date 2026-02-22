import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

export function runAssetPipeline() {
    const publicAssetsDir = path.join(rootDir, 'public/assets')
    console.log('Running asset pipeline...')
    try {
        fs.rmSync(publicAssetsDir, { recursive: true, force: true })
        fontpack('fonts.yaml');
        atlaspack('ui.yaml',  'mana_soul');
        copy('bg_plains00.png');
    } catch (error) {
        console.error('Asset pipeline failed:', error.message);
        throw error;
    }
}

function fontpack(src, dst) { run('fontpack', src, dst) }
function atlaspack(src, dst) { run('atlaspack', src, dst) }

function copy(src, dst) {
    const srcPath = path.join(rootDir, 'assets', src)
    const dstShort = path.join('public/assets', dst ?? '')
    const dstPath = path.join(rootDir, dstShort, src)
    console.log(`Copying ${src} to ${dstShort}...`)
    fs.copyFileSync(srcPath, dstPath)
}

function run(cmd, src, dst) {
    const srcPath = path.join('assets', src)
    const dstPath = path.join('public/assets', dst ?? '')
    execSync(`${cmd} ${srcPath} ${dstPath}`, { cwd: rootDir, stdio: 'inherit' })
}

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
