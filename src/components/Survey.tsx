import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';

interface Question {
  id: string;
  text: string;
  options: string[];
  nextQuestionId?: string;
}

interface SurveyProps {
  walletAddress: string;
  onComplete: (responses: Record<string, string>) => void;
}

// Mock questions - will be replaced with data from backend
const MOCK_QUESTIONS: Question[] = [
  {
    id: 'q1',
    text: 'Do you use crypto daily?',
    options: ['Yes', 'No'],
    nextQuestionId: 'q2'
  },
  {
    id: 'q2',
    text: 'Which blockchain do you prefer?',
    options: ['Ethereum', 'Solana', 'Bitcoin', 'Other']
  }
];

export function Survey({ walletAddress, onComplete }: SurveyProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [currentAnswer, setCurrentAnswer] = useState<string>('');

  const currentQuestion = MOCK_QUESTIONS[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / MOCK_QUESTIONS.length) * 100;

  const handleNext = () => {
    if (!currentAnswer) return;

    const updatedResponses = {
      ...responses,
      [currentQuestion.id]: currentAnswer
    };
    setResponses(updatedResponses);

    if (currentQuestionIndex < MOCK_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setCurrentAnswer('');
    } else {
      onComplete(updatedResponses);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto p-8 bg-black/60 border-gray-800">
      <div className="space-y-8">
        <div className="flex justify-center mb-4">
          <img src="/assets/hibachi-logo.svg" alt="Hibachi Logo" className="w-12 h-12" />
        </div>
        
        {/* Progress bar */}
        <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#FFA205] via-[#FE344A] to-[#4E08BF] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-[#FFA205] via-[#FE344A] to-[#4E08BF] bg-clip-text text-transparent">
            Question {currentQuestionIndex + 1} of {MOCK_QUESTIONS.length}
          </h3>
          <p className="text-gray-400 text-sm font-mono">Connected: {walletAddress}</p>
        </div>

        <div className="space-y-6">
          <p className="text-xl text-white">{currentQuestion.text}</p>

          <RadioGroup
            value={currentAnswer}
            onValueChange={setCurrentAnswer}
            className="space-y-3"
          >
            {currentQuestion.options.map((option) => (
              <div 
                key={option} 
                className={`p-4 rounded-lg border transition-all cursor-pointer ${
                  currentAnswer === option
                    ? 'border-[#FE344A]/50 bg-[#FE344A]/10'
                    : 'border-gray-800 hover:border-gray-700'
                }`}
                onClick={() => setCurrentAnswer(option)}
              >
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value={option} id={option} />
                  <Label htmlFor={option} className="text-gray-200 cursor-pointer">{option}</Label>
                </div>
              </div>
            ))}
          </RadioGroup>
        </div>

        <Button
          onClick={handleNext}
          disabled={!currentAnswer}
          className="w-full bg-gradient-to-r from-[#FFA205] via-[#FE344A] to-[#4E08BF] hover:opacity-90 transition-opacity"
        >
          {currentQuestionIndex === MOCK_QUESTIONS.length - 1 ? 'Complete Survey' : 'Next Question'}
        </Button>
      </div>
    </Card>
  );
}
