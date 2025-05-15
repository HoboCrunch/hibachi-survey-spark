import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { checkRequiredApis, isMetaMaskAvailable } from './lib/browserUtils';

// Check if running in browser
if (typeof window !== 'undefined') {
  // Log wallet detection info
  console.log('MetaMask available:', isMetaMaskAvailable());
  console.log('Window ethereum:', window.ethereum ? 'Available' : 'Not available');
  console.log('Web3Modal available:', window.Web3Modal ? 'Available' : 'Not available');

  // Check for required browser APIs
  if (!checkRequiredApis()) {
    console.warn(
      'Some required browser APIs are not available. Wallet connection may not work correctly. ' +
      'Please make sure you are using a modern browser and that you have a wallet extension installed.'
    );
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
