import { useState } from 'react';
import AquariumForm from './components/AquariumForm/AquariumForm';
import RecommendationHistory from './components/RecommendationHistory/RecommendationHistory';
import './index.css';

export default function App() {
  const [recommendations, setRecommendations] = useState<Array<{
    recommendation: string;
    timestamp: string;
  }>>([]);

  const handleNewRecommendation = (newRec: { recommendation: string; timestamp: string }) => {
    setRecommendations([newRec, ...recommendations]); // Add newest to top
  };

  return (
    <div className="app">
      <h1>Super-Acqua-Mentor</h1>
      <AquariumForm onRecommendation={handleNewRecommendation} />
      <RecommendationHistory recommendations={recommendations} />
    </div>
  );
}