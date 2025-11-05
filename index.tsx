
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '/src/index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// Add splash-active class to prevent scrolling
document.body.classList.add('splash-active');

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Minimum splash screen duration (in milliseconds)
const MIN_SPLASH_DURATION = 2500;

// Track when the app started rendering
const renderStartTime = Date.now();

const hideSplashScreen = () => {
  const splashElement = document.getElementById('app-splash');
  if (splashElement) {
    const elapsedTime = Date.now() - renderStartTime;
    const remainingTime = Math.max(0, MIN_SPLASH_DURATION - elapsedTime);

    // Wait for minimum duration, then hide splash
    setTimeout(() => {
      requestAnimationFrame(() => {
        splashElement.classList.add('splash-screen--hidden');
        splashElement.addEventListener(
          'transitionend',
          () => {
            splashElement.remove();
            // Remove splash-active class to restore scrolling
            document.body.classList.remove('splash-active');
          },
          { once: true }
        );
      });
    }, remainingTime);
  }
};

// Wait for the next frame to ensure rendering is complete, then hide splash
requestAnimationFrame(() => {
  rootElement.classList.add('app-root--visible');
  // Hide splash after minimum duration
  hideSplashScreen();
});
