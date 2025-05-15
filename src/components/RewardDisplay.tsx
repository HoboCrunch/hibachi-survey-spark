
import React from 'react';
import { CheckCircle } from 'lucide-react';
import GradientButton from './GradientButton';

interface RewardDisplayProps {
  responses: Record<string, string>;
  onRestart: () => void;
}

const RewardDisplay = ({ responses, onRestart }: RewardDisplayProps) => {
  // In a real implementation, this would come from Supabase
  const mockGiftCode = "UBEREATS-1234-5678-90XYZ";
  
  return (
    <div className="max-w-md mx-auto text-center">
      <div className="flex flex-col items-center gap-6 mb-8">
        <div className="w-20 h-20 rounded-full bg-green-900/20 flex items-center justify-center">
          <CheckCircle size={40} className="text-green-500" />
        </div>
        
        <h2 className="text-3xl font-bold">Thank You!</h2>
        
        <p className="text-white/70">
          Your feedback is invaluable to us. As a token of our appreciation, 
          here's your Uber Eats gift card code:
        </p>
      </div>
      
      <div className="bg-black/30 backdrop-blur-md rounded-lg border border-white/10 p-6 mb-8">
        <div className="text-lg font-mono tracking-wide text-white">{mockGiftCode}</div>
        <p className="text-xs text-white/50 mt-2">
          Apply this code in the Uber Eats app or website
        </p>
      </div>
      
      <div className="space-y-4">
        <p className="text-white/70">
          Would you like to share this survey with others?
        </p>
        
        <div className="flex flex-wrap gap-3 justify-center">
          <GradientButton 
            variant="outline"
            onClick={() => window.open("https://twitter.com/intent/tweet?text=Just%20completed%20the%20Hibachi%20survey%20and%20got%20rewarded!%20Check%20it%20out%3A", "_blank")}
          >
            Share on X
          </GradientButton>
          
          <GradientButton
            variant="default"
            onClick={onRestart}
          >
            Start Over
          </GradientButton>
        </div>
      </div>
    </div>
  );
};

export default RewardDisplay;
