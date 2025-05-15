import { isBrowser, checkRequiredApis } from './browserUtils';

// List of approved wallet addresses
const APPROVED_WALLETS = [
  '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
  '0x06A85356DCb5b307096726FB86A78c59D38e08ee',
  '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', // Vitalik's address
  '0x6C99d42C2b15A24dfdCf939b85b6B2393EC58B09',
  // Add more approved wallet addresses as needed
];

// Declare global ethers and Web3Modal from the CDN scripts
declare global {
  interface Window {
    ethereum: any;
    ethers: any;
    Web3Modal: any;
    WalletConnectProvider: any;
  }
}

export interface WalletInfo {
  address: string;
  provider: any;
  chainId: number;
}

let web3Modal: any;

/**
 * Ensure ethers is loaded in the browser. If the global ethers object is
 * missing (or incomplete) we dynamically inject the CDN script and await it.
 */
async function ensureEthers(): Promise<any> {
  if (isBrowser && (!window.ethers || !window.ethers.providers)) {
    return new Promise((resolve, reject) => {
      // Avoid injecting the script multiple times
      if (document.getElementById("__ethersjs__")) {
        // Wait a tick for the existing script to finish loading
        setTimeout(() => {
          if (window.ethers && window.ethers.providers) {
            resolve(window.ethers);
          } else {
            reject(new Error("Failed to load ethers.js"));
          }
        }, 300);
        return;
      }

      // Log the attempt to load ethers
      console.log("Dynamically loading ethers.js...");
      
      const script = document.createElement("script");
      script.id = "__ethersjs__";
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/ethers/5.7.2/ethers.umd.min.js";
      script.type = "application/javascript";
      script.async = true;
      script.onload = () => {
        console.log("Ethers.js loaded successfully:", !!window.ethers);
        if (window.ethers && window.ethers.providers) {
          resolve(window.ethers);
        } else {
          console.error("Ethers loaded but providers not available");
          reject(new Error("Failed to load ethers.js"));
        }
      };
      script.onerror = (event) => {
        console.error("Failed to load ethers.js from CDN", event);
        reject(new Error("Failed to load ethers.js from CDN"));
      };
      document.head.appendChild(script);
    });
  }

  // Ethers already available
  console.log("Using existing ethers:", !!window.ethers?.providers);
  return window.ethers;
}

/**
 * Initialize Web3Modal
 */
function initWeb3Modal() {
  if (!isBrowser) return;
  if (web3Modal) return web3Modal;

  // Check if required browser APIs are available
  if (!checkRequiredApis()) {
    console.warn('Required browser APIs not available, using fallback mode');
  }

  try {
    const providerOptions = {
      walletconnect: {
        package: window.WalletConnectProvider?.default || window.WalletConnectProvider,
        options: {
          infuraId: "9aa3d95b3bc440fa88ea12eaa4456161"
        }
      }
    };

    web3Modal = new window.Web3Modal.default({
      network: "mainnet",
      cacheProvider: false,
      providerOptions,
      disableInjectedProvider: false,
      theme: {
        background: "#1a1b1f",
        main: "#ffffff",
        secondary: "#858585",
        border: "#3b3d42",
        hover: "#2a2b31"
      }
    });

    return web3Modal;
  } catch (error) {
    console.error('Error initializing Web3Modal:', error);
    return null;
  }
}

/**
 * Connect wallet using MetaMask directly if available
 */
async function connectWithMetaMask(): Promise<WalletInfo> {
  if (!window.ethereum) {
    throw new Error('MetaMask not detected. Please install MetaMask first.');
  }

  // Ensure ethers is loaded before proceeding
  await ensureEthers();

  try {
    // Request accounts from MetaMask
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    
    if (accounts.length === 0) {
      throw new Error('No accounts found. Please unlock MetaMask.');
    }

    // Create ethers provider (now guaranteed to exist)
    const provider = new window.ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = accounts[0];
    const network = await provider.getNetwork();

    return {
      address,
      provider,
      chainId: network.chainId
    };
  } catch (error: any) {
    console.error('MetaMask connection error:', error);
    throw new Error(error.message || 'Failed to connect to MetaMask');
  }
}

/**
 * Connect to wallet using Web3Modal or fallback to direct methods
 */
export async function connectWallet(): Promise<WalletInfo> {
  try {
    if (!isBrowser) {
      throw new Error('Browser environment required');
    }

    // Ensure ethers is available early (helps with Web3Modal flow as well)
    await ensureEthers();

    // First try connecting with MetaMask directly
    if (window.ethereum) {
      console.log("Attempting direct connection with MetaMask...");
      try {
        return await connectWithMetaMask();
      } catch (err) {
        console.warn("Direct MetaMask connection failed, trying Web3Modal...", err);
      }
    }

    // Fallback to Web3Modal
    const modal = initWeb3Modal();
    if (!modal) {
      throw new Error('Failed to initialize wallet connection. Please make sure you have a wallet installed.');
    }
    
    const modalProvider = await modal.connect();
    console.log("Connected via Web3Modal, provider:", modalProvider);
    
    const ethersProvider = new window.ethers.providers.Web3Provider(modalProvider);
    const signer = ethersProvider.getSigner();
    const address = await signer.getAddress();
    const network = await ethersProvider.getNetwork();
    
    // Setup event listeners for the provider
    modalProvider.on("accountsChanged", (accounts: string[]) => {
      if (accounts.length === 0) {
        console.log("User disconnected");
        // You might want to handle this event in your UI
        window.location.reload();
      }
    });
    
    return {
      address,
      provider: ethersProvider,
      chainId: network.chainId
    };
  } catch (error: any) {
    console.error('Error connecting wallet:', error);
    throw new Error(error.message || 'Failed to connect wallet. Please try again.');
  }
}

/**
 * Disconnect wallet
 */
export async function disconnectWallet() {
  if (!isBrowser) return;
  
  if (web3Modal) {
    web3Modal.clearCachedProvider();
  }
}

/**
 * Verify if a wallet address is in the approved list
 */
export function verifyWallet(address: string): boolean {
  if (!address) return false;

  // For testing/development, if no addresses are set, approve all wallets
  if (APPROVED_WALLETS.length === 0) return true;
  
  return APPROVED_WALLETS.some(
    approvedAddress => approvedAddress.toLowerCase() === address.toLowerCase()
  );
}

/**
 * Format address for display (shorten it)
 */
export function formatAddress(address: string): string {
  if (!address) return '';
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
}

/**
 * Get Etherscan link for an address
 */
export function getEtherscanLink(address: string): string {
  return `https://etherscan.io/address/${address}`;
} 