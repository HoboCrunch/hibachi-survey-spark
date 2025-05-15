import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Check, Copy } from 'lucide-react';

interface RewardProps {
  giftCardCode: string;
  onClose: () => void;
}

export function Reward({ giftCardCode, onClose }: RewardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(giftCardCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto p-8 bg-black/60 border-gray-800">
      <div className="space-y-8">
        <div className="flex justify-center">
          <img src="/assets/hibachi-logo.svg" alt="Hibachi Logo" className="w-20 h-20 mb-2" />
        </div>
        
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#FFA205] via-[#FE344A] to-[#4E08BF] bg-clip-text text-transparent">
            Thank You!
          </h2>
          <p className="text-gray-400">
            Here's your Uber Eats gift card code as a reward for completing the survey
          </p>
        </div>

        <div className="bg-black/50 p-4 rounded-lg border border-gray-800 flex items-center justify-between">
          <code className="text-lg font-mono text-[#FFA205]">{giftCardCode}</code>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCopy}
            className="hover:bg-gray-800"
          >
            {copied ? 
              <Check className="h-4 w-4 text-green-500" /> : 
              <Copy className="h-4 w-4 text-gray-400" />
            }
          </Button>
        </div>

        <div className="space-y-4 text-gray-400">
          <p className="font-medium">
            To redeem your gift card:
          </p>
          <ol className="list-decimal list-inside space-y-3">
            <li className="text-gray-300">Open the Uber Eats app</li>
            <li className="text-gray-300">Go to Account → Wallet</li>
            <li className="text-gray-300">Tap "Add payment method"</li>
            <li className="text-gray-300">Select "Gift Card"</li>
            <li className="text-gray-300">Enter the code above</li>
          </ol>
        </div>

        <Button 
          onClick={onClose} 
          className="w-full bg-gradient-to-r from-[#FFA205] via-[#FE344A] to-[#4E08BF] hover:opacity-90 transition-opacity"
        >
          Start New Survey
        </Button>
      </div>
    </Card>
  );
} 