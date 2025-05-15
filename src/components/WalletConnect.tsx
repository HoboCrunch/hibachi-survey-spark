import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { connectWallet, verifyWallet, formatAddress } from '../lib/walletUtils';
import { isMetaMaskAvailable } from '../lib/browserUtils';
import { AlertCircle, ExternalLink } from 'lucide-react';

interface WalletConnectProps {
  onWalletVerified: (address: string) => void;
}

export function WalletConnect({ onWalletVerified }: WalletConnectProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isApproved, setIsApproved] = useState<boolean | null>(null);
  const [hasWallet, setHasWallet] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if MetaMask is available
    setHasWallet(isMetaMaskAvailable());
  }, []);

  const handleConnect = async () => {
    setIsConnecting(true);
    setError(null);
    setAddress(null);
    setIsApproved(null);
    
    try {
      const walletInfo = await connectWallet();
      setAddress(walletInfo.address);
      setIsConnecting(false);
      setIsVerifying(true);
      
      // Verify the wallet address
      const approved = verifyWallet(walletInfo.address);
      setIsApproved(approved);
      setIsVerifying(false);
      
      if (approved) {
        // If approved, call the callback after a slight delay for UX
        setTimeout(() => {
          onWalletVerified(walletInfo.address);
        }, 1000);
      }
    } catch (err: any) {
      setIsConnecting(false);
      setError(err.message || 'Failed to connect wallet. Please try again.');
    }
  };

  const getInstallWalletButton = () => {
    return (
      <div className="text-center p-4 bg-black/50 rounded-lg space-y-3 border border-gray-800">
        <p className="text-white mb-2">No Wallet Detected</p>
        <p className="text-gray-400 text-sm">
          To participate in this survey, you need to install a wallet like MetaMask.
        </p>
        <a 
          href="https://metamask.io/download/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 text-[#FFA205] hover:text-[#FE344A] mt-2 text-sm"
        >
          Install MetaMask <ExternalLink size={14} />
        </a>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center gap-8 max-w-lg mx-auto py-6">
      <div className="flex flex-col items-center gap-4">
        <img src="/assets/hibachi-logo.svg" alt="Hibachi Logo" className="w-20 h-20 mb-2" />
        <h2 className="text-3xl font-bold bg-gradient-to-r from-[#FFA205] via-[#FE344A] to-[#4E08BF] bg-clip-text text-transparent">
          Connect Your Wallet
        </h2>
        <p className="text-gray-400 text-center">
          To participate in this survey, please connect your wallet for verification.
          Only approved wallets can access the survey.
        </p>
      </div>
      
      <div className="w-full max-w-xs">
        {hasWallet === false && !isConnecting && !address ? (
          getInstallWalletButton()
        ) : !address ? (
          <Button 
            onClick={handleConnect} 
            disabled={isConnecting}
            className="w-full bg-gradient-to-r from-[#FFA205] via-[#FE344A] to-[#4E08BF] hover:opacity-90 transition-opacity"
          >
            {isConnecting ? "Connecting..." : "Connect Wallet"}
          </Button>
        ) : isVerifying ? (
          <div className="text-center p-4 bg-black/50 rounded-lg">
            <p className="text-white mb-2">Verifying wallet...</p>
            <p className="text-gray-400 text-sm font-mono">{formatAddress(address)}</p>
          </div>
        ) : isApproved === false ? (
          <div className="text-center p-4 bg-red-900/30 border border-red-800 rounded-lg space-y-3">
            <div className="flex items-center justify-center gap-2 text-red-400">
              <AlertCircle size={20} />
              <span>Wallet Not Approved</span>
            </div>
            <p className="text-gray-400 text-sm">
              Your wallet is not on the approved list for this survey.
            </p>
            <Button 
              onClick={handleConnect} 
              variant="outline"
              className="w-full mt-2"
            >
              Try Another Wallet
            </Button>
          </div>
        ) : (
          <div className="text-center p-4 bg-green-900/30 border border-green-800 rounded-lg">
            <p className="text-green-400 mb-2">Wallet Approved!</p>
            <p className="text-gray-400 text-sm font-mono">{formatAddress(address)}</p>
          </div>
        )}
      </div>
      
      {error && (
        <div className="p-4 bg-red-900/30 border border-red-800 rounded-lg text-center">
          <p className="text-red-400 mb-1">Error</p>
          <p className="text-sm text-gray-300">{error}</p>
          {error.includes('install') ? (
            <a 
              href="https://metamask.io/download/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 text-[#FFA205] hover:text-[#FE344A] mt-3 text-sm"
            >
              Install MetaMask <ExternalLink size={14} />
            </a>
          ) : (
            <Button 
              onClick={handleConnect} 
              variant="outline"
              className="w-full mt-3"
            >
              Try Again
            </Button>
          )}
        </div>
      )}
      
      <div className="text-sm text-gray-500 max-w-md text-center">
        We only verify your wallet address. No transactions will be initiated.
        Your privacy and security are our top priorities.
      </div>
    </div>
  );
}
