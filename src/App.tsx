import { useState, useEffect } from 'react';
import { WalletConnect } from './components/WalletConnect';
import { Survey } from './components/Survey';
import { Reward } from './components/Reward';
import { disconnectWallet } from './lib/walletUtils';

type Step = 'wallet' | 'survey' | 'reward';

export default function App() {
  const [step, setStep] = useState<Step>('wallet');
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [surveyResponses, setSurveyResponses] = useState<Record<string, string>>({});
  
  // Mock gift card code - will be replaced with actual API call
  const mockGiftCardCode = 'UBER-EATS-1234-5678';

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      // Disconnect wallet when component unmounts
      disconnectWallet();
    };
  }, []);

  const handleWalletVerified = (address: string) => {
    setWalletAddress(address);
    setStep('survey');
  };

  const handleSurveyComplete = (responses: Record<string, string>) => {
    setSurveyResponses(responses);
    setStep('reward');
    
    // Here you would typically send the survey responses to your backend
    console.log('Survey responses:', responses);
  };

  const handleClose = async () => {
    // Reset the app state
    setStep('wallet');
    setWalletAddress('');
    setSurveyResponses({});
    
    // Disconnect the wallet
    await disconnectWallet();
  };

  return (
    <div className="min-h-screen bg-black text-white p-6" style={{ 
      backgroundImage: 'url("/assets/hibachi-background.png")', 
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <img 
              src="/assets/hibachi-text.svg" 
              alt="Hibachi" 
              className="h-16 md:h-20"
            />
          </div>
          <p className="text-gray-400">
            Complete the survey to receive your Uber Eats gift card
          </p>
        </header>

        {/* Main content */}
        <main>
          {step === 'wallet' && (
            <WalletConnect onWalletVerified={handleWalletVerified} />
          )}
          
          {step === 'survey' && (
            <Survey
              walletAddress={walletAddress}
              onComplete={handleSurveyComplete}
            />
          )}
          
          {step === 'reward' && (
            <Reward
              giftCardCode={mockGiftCardCode}
              onClose={handleClose}
            />
          )}
        </main>
      </div>
    </div>
  );
}
