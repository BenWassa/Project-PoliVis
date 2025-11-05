/**
 * Application Version Configuration
 * 
 * Single source of truth for version number across the entire app.
 * Update this file when releasing new versions.
 */

export const APP_VERSION = '1.0.0';
export const BUILD_DATE = '2025-11-05T04:00:13.224Z';

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
export const getVersionString = () => `v${APP_VERSION}`;
export const getFullVersionString = () => `v${APP_VERSION} (${new Date(BUILD_DATE).toLocaleDateString()})`;
