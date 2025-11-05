import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read package.json to get version
const packageJson = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8')
);

// Read service worker template
const swPath = path.join(__dirname, '../service-worker.js');
let swContent = fs.readFileSync(swPath, 'utf-8');

// Replace version placeholder
swContent = swContent.replace('__APP_VERSION__', packageJson.version);

// Write to dist folder (this runs after build)
const distPath = path.join(__dirname, '../dist/service-worker.js');
fs.writeFileSync(distPath, swContent);

console.log(`✓ Service worker version updated to ${packageJson.version}`);

// Also update version.ts with current build date
const versionPath = path.join(__dirname, '../version.ts');
const versionContent = `/**
 * Application Version Configuration
 * 
 * Single source of truth for version number across the entire app.
 * Update this file when releasing new versions.
 */

export const APP_VERSION = '${packageJson.version}';
export const BUILD_DATE = '${new Date().toISOString()}';

// Semantic versioning helper
const [major, minor, patch] = APP_VERSION.split('.').map(Number);

export const VERSION_INFO = {
  major,
  minor,
  patch,
  full: APP_VERSION,
  buildDate: BUILD_DATE,
};

// For display in the app
export const getVersionString = () => \`v\${APP_VERSION}\`;
export const getFullVersionString = () => \`v\${APP_VERSION} (\${new Date(BUILD_DATE).toLocaleDateString()})\`;
`;

fs.writeFileSync(versionPath, versionContent);
console.log(`✓ version.ts updated with build date`);
