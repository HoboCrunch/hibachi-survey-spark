
import React from 'react';
import { useToast } from '@/hooks/use-toast';
import GradientButton from './GradientButton';

interface Question {
  id: string;
  question: string;
  type: 'multiple_choice' | 'text';
  options?: string[];
  next?: {
    [key: string]: string | null;
  };
}

const mockQuestions: Record<string, Question> = {
  q1: {
    id: 'q1',
    question: 'Do you use crypto daily?',
    type: 'multiple_choice',
    options: ['Yes', 'No'],
    next: {
      'Yes': 'q2',
      'No': 'q3'
    }
  },
  q2: {
    id: 'q2',
    question: 'Which blockchain do you prefer?',
    type: 'multiple_choice',
    options: ['Ethereum', 'Solana', 'Bitcoin', 'Other'],
    next: {
      'Ethereum': 'q4',
      'Solana': 'q4',
      'Bitcoin': 'q4',
      'Other': 'q4'
    }
  },
  q3: {
    id: 'q3',
    question: 'What\'s stopping you?',
    type: 'multiple_choice',
    options: ['Lack of knowledge', 'Too risky', 'Other'],
    next: {
      'Lack of knowledge': 'q4',
      'Too risky': 'q4',
      'Other': 'q4'
    }
  },
  q4: {
    id: 'q4',
    question: 'How likely are you to recommend DeFi to friends?',
    type: 'multiple_choice',
    options: ['Very likely', 'Somewhat likely', 'Unlikely', 'Never'],
    next: {
      'Very likely': null,
      'Somewhat likely': null,
      'Unlikely': null,
      'Never': null
    }
  }
};

interface SurveyProps {
  onComplete: (responses: Record<string, string>) => void;
}

const Survey = ({ onComplete }: SurveyProps) => {
  const { toast } = useToast();
  const [currentQuestionId, setCurrentQuestionId] = React.useState('q1');
  const [responses, setResponses] = React.useState<Record<string, string>>({});
  const [selectedOption, setSelectedOption] = React.useState<string | null>(null);
  const currentQuestion = mockQuestions[currentQuestionId];
  
  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };
  
  const handleNext = () => {
    if (!selectedOption) return;
    
    // Save the response
    const updatedResponses = {
      ...responses,
      [currentQuestionId]: selectedOption
    };
    
    setResponses(updatedResponses);
    
    // Find the next question
    const next = currentQuestion.next?.[selectedOption];
    
    if (next) {
      setCurrentQuestionId(next);
      setSelectedOption(null);
    } else {
      // Survey complete
      toast({
        title: "Survey Complete",
        description: "Thank you for your responses!",
      });
      
      onComplete(updatedResponses);
    }
  };
  
  const progress = Object.keys(responses).length / Object.keys(mockQuestions).length * 100;
  
  return (
    <div className="max-w-2xl mx-auto bg-black/30 backdrop-blur-md rounded-xl p-8 shadow-lg border border-white/10">
      {/* Progress bar */}
      <div className="w-full h-1.5 bg-gray-800 rounded-full mb-8 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-hibachi-yellow via-hibachi-orange to-hibachi-pink"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <div className="space-y-6">
        {/* Question */}
        <h3 className="text-2xl font-medium">{currentQuestion.question}</h3>
        
        {/* Options */}
        <div className="space-y-3">
          {currentQuestion.options?.map((option) => (
            <div
              key={option}
              onClick={() => handleOptionSelect(option)}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                selectedOption === option
                  ? 'gradient-border bg-white/5'
                  : 'border-white/10 hover:border-white/30'
              }`}
            >
              {option}
            </div>
          ))}
        </div>
        
        {/* Next button */}
        <div className="pt-6">
          <GradientButton
            onClick={handleNext}
            disabled={!selectedOption}
            className="w-full"
          >
            {currentQuestion.next?.[selectedOption || ''] === null ? 'Complete Survey' : 'Next Question'}
          </GradientButton>
        </div>
      </div>
    </div>
  );
};

export default Survey;
