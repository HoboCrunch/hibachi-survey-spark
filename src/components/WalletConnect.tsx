
import React from 'react';
import GradientButton from './GradientButton';
import { useToast } from '@/hooks/use-toast';

interface WalletConnectProps {
  onWalletVerified: () => void;
}

const WalletConnect = ({ onWalletVerified }: WalletConnectProps) => {
  const { toast } = useToast();
  const [isConnecting, setIsConnecting] = React.useState(false);
  
  const handleConnectWallet = async () => {
    setIsConnecting(true);
    
    // This is a placeholder for the Dynamic.xyz SDK integration
    // In a real implementation, you would:
    // 1. Initialize the Dynamic SDK
    // 2. Connect the wallet
    // 3. Get the wallet address
    // 4. Verify it against the approved_wallets table in Supabase
    
    setTimeout(() => {
      // Simulate successful connection for demo
      toast({
        title: "Wallet connected!",
        description: "Your wallet has been successfully verified.",
      });
      setIsConnecting(false);
      onWalletVerified();
    }, 1500);
  };
  
  return (
    <div className="flex flex-col items-center gap-8 max-w-lg mx-auto py-12">
      <div className="flex flex-col gap-4 text-center">
        <h2 className="text-3xl font-bold">Connect Your Wallet</h2>
        <p className="text-white/70">
          To participate in this survey, please connect your wallet for verification.
          Only approved wallets can access the survey.
        </p>
      </div>
      
      <div className="w-full max-w-xs">
        <GradientButton 
          onClick={handleConnectWallet} 
          disabled={isConnecting}
          className="w-full"
        >
          {isConnecting ? "Connecting..." : "Connect Wallet"}
        </GradientButton>
      </div>
      
      <div className="text-sm text-white/50 max-w-md text-center">
        We only verify your wallet address. No transactions will be initiated.
        Your privacy and security are our top priorities.
      </div>
    </div>
  );
};

export default WalletConnect;
