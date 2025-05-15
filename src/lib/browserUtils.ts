/**
 * Check if the code is running in a browser environment
 */
export const isBrowser = typeof window !== 'undefined';

/**
 * Safely access window object only in browser environments
 */
export const getWindow = (): Window | undefined => {
  return isBrowser ? window : undefined;
};

/**
 * Check if MetaMask is available
 */
export const isMetaMaskAvailable = (): boolean => {
  if (!isBrowser) return false;
  return typeof window.ethereum !== 'undefined';
};

/**
 * Check if required browser APIs are available
 * Returns true if all required APIs are available, false otherwise
 * Don't throw errors - we'll handle fallbacks in the wallet connection logic
 */
export const checkRequiredApis = (): boolean => {
  if (!isBrowser) return false;
  
  let missingApis = [];
  
  // Check for Web3Modal
  if (!window.Web3Modal) {
    console.warn('Web3Modal not found. Wallet connection might be limited.');
    missingApis.push('Web3Modal');
  }
  
  // Check for ethers
  if (!window.ethers) {
    console.warn('ethers.js not found. Wallet connection might be limited.');
    missingApis.push('ethers');
  }
  
  // Check for WalletConnectProvider
  if (!window.WalletConnectProvider) {
    console.warn('WalletConnectProvider not found. WalletConnect might not work.');
    missingApis.push('WalletConnectProvider');
  }
  
  // Check for direct ethereum provider (MetaMask, etc)
  if (!window.ethereum) {
    console.warn('No Ethereum provider detected. Please install MetaMask or another wallet.');
    missingApis.push('ethereum');
  }
  
  if (missingApis.length > 0) {
    console.warn(`Missing APIs: ${missingApis.join(', ')}`);
    return false;
  }
  
  return true;
}; 