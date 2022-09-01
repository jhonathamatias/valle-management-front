import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import requestSubmitSafariPolyfill from './polyfill/requestSubmitSafariPolyfill';

requestSubmitSafariPolyfill(HTMLFormElement.prototype);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);
