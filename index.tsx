
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '/src/index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const splashElement = document.getElementById('app-splash');
if (splashElement) {
  requestAnimationFrame(() => {
    splashElement.classList.add('splash-screen--hidden');
    splashElement.addEventListener(
      'transitionend',
      () => {
        splashElement.remove();
      },
      { once: true }
    );
  });
}

requestAnimationFrame(() => {
  rootElement.classList.add('app-root--visible');
});
