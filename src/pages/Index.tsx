
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import WalletConnect from '@/components/WalletConnect';
import Survey from '@/components/Survey';
import RewardDisplay from '@/components/RewardDisplay';

const Index = () => {
  const [stage, setStage] = useState<'wallet' | 'survey' | 'reward'>('wallet');
  const [surveyResponses, setSurveyResponses] = useState<Record<string, string>>({});

  const handleWalletVerified = () => {
    setStage('survey');
  };

  const handleSurveyComplete = (responses: Record<string, string>) => {
    setSurveyResponses(responses);
    setStage('reward');
  };

  const handleRestart = () => {
    setStage('wallet');
    setSurveyResponses({});
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Hibachi <span className="flame-gradient">Research</span> Survey
          </h1>
          <p className="text-lg text-white/70">
            Help us shape the future of crypto experiences and get rewarded
          </p>
        </div>

        {stage === 'wallet' && <WalletConnect onWalletVerified={handleWalletVerified} />}
        {stage === 'survey' && <Survey onComplete={handleSurveyComplete} />}
        {stage === 'reward' && <RewardDisplay responses={surveyResponses} onRestart={handleRestart} />}
      </div>
    </Layout>
  );
};

export default Index;
