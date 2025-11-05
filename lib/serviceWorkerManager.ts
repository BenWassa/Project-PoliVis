import { APP_VERSION } from '../version';

/**
 * Service Worker Update Manager
 * Handles automatic updates and version checking
 */

let registration: ServiceWorkerRegistration | null = null;
let updateCheckInterval: number | null = null;

export const initServiceWorker = async () => {
  if (!('serviceWorker' in navigator)) {
    console.log('Service Worker not supported');
    return null;
  }

  try {
    registration = await navigator.serviceWorker.register('/service-worker.js', {
      scope: '/',
    });

    console.log(`[App v${APP_VERSION}] Service Worker registered`, registration);

    // Check for updates on page load
    await checkForUpdates();

    // Set up periodic update checks (every hour)
    updateCheckInterval = window.setInterval(checkForUpdates, 60 * 60 * 1000);

    // Listen for controller change (new SW activated)
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      console.log('[App] New service worker activated, reloading...');
      window.location.reload();
    });

    // Handle update found
    registration.addEventListener('updatefound', () => {
      const newWorker = registration?.installing;
      if (!newWorker) return;

      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          // New version available
          console.log('[App] New version available!');
          showUpdateNotification();
        }
      });
    });

    return registration;
  } catch (error) {
    console.error('[App] Service Worker registration failed:', error);
    return null;
  }
};

export const checkForUpdates = async () => {
  if (!registration) return;

  try {
    await registration.update();
    console.log('[App] Checked for updates');
  } catch (error) {
    console.error('[App] Failed to check for updates:', error);
  }
};

export const skipWaiting = () => {
  if (!registration?.waiting) return;
  
  // Send message to SW to skip waiting
  registration.waiting.postMessage({ type: 'SKIP_WAITING' });
};

const showUpdateNotification = () => {
  // Create a simple notification banner
  const banner = document.createElement('div');
  banner.id = 'update-banner';
  banner.innerHTML = `
    <div style="
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 16px;
      text-align: center;
      z-index: 10000;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      animation: slideDown 0.3s ease-out;
    ">
      <style>
        @keyframes slideDown {
          from { transform: translateY(-100%); }
          to { transform: translateY(0); }
        }
      </style>
      <div style="max-width: 800px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">
        <span style="font-weight: 600;">
          🎉 New version available! Update now for the latest features.
        </span>
        <div style="display: flex; gap: 8px;">
          <button onclick="window.updateApp()" style="
            background: white;
            color: #667eea;
            border: none;
            padding: 8px 16px;
            border-radius: 6px;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.2s;
          " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
            Update Now
          </button>
          <button onclick="document.getElementById('update-banner').remove()" style="
            background: rgba(255,255,255,0.2);
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 6px;
            cursor: pointer;
          ">
            Later
          </button>
        </div>
      </div>
    </div>
  `;
  
  document.body.insertBefore(banner, document.body.firstChild);
};

// Expose update function globally
(window as any).updateApp = () => {
  skipWaiting();
  document.getElementById('update-banner')?.remove();
};

export const getServiceWorkerVersion = async (): Promise<string> => {
  if (!registration) return APP_VERSION;

  try {
    const sw = registration.active || registration.installing || registration.waiting;
    if (!sw) return APP_VERSION;

    const messageChannel = new MessageChannel();
    
    return new Promise((resolve) => {
      messageChannel.port1.onmessage = (event) => {
        resolve(event.data.version || APP_VERSION);
      };

      sw.postMessage({ type: 'GET_VERSION' }, [messageChannel.port2]);
      
      // Timeout after 1 second
      setTimeout(() => resolve(APP_VERSION), 1000);
    });
  } catch (error) {
    console.error('[App] Failed to get SW version:', error);
    return APP_VERSION;
  }
};

export const unregisterServiceWorker = async () => {
  if (!registration) return;
  
  if (updateCheckInterval) {
    clearInterval(updateCheckInterval);
  }

  await registration.unregister();
  console.log('[App] Service Worker unregistered');
};
