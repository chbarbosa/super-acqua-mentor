import { useState, useEffect } from 'react';
import AquariumForm from './components/AquariumForm/AquariumForm';
import RecommendationHistory from './components/RecommendationHistory/RecommendationHistory';
import { fetchRecommendations, Recommendation } from './api/mockApi';
import './index.css';

export default function App() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load initial recommendations
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchRecommendations();
        setRecommendations(data);
      } catch (err) {
        setError('Failed to load recommendations');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleNewRecommendation = (newRec: Recommendation) => {
    setRecommendations([newRec, ...recommendations]);
  };

  if (isLoading) {
    return (
      <div className="app">
        <div className="loading-spinner">Loading aquarium history...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="app">
      <h1>Super-Acqua-Mentor</h1>
      <AquariumForm onRecommendation={handleNewRecommendation} />
      <RecommendationHistory recommendations={recommendations} />
    </div>
  );
}