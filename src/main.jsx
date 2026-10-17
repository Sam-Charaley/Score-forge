import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // The app works without the worker (it only makes the app installable),
    // so a failed registration is logged, not shown to the student.
    navigator.serviceWorker.register('/sw.js')
      .catch(error => console.warn('Service worker registration failed:', error));
  });
}