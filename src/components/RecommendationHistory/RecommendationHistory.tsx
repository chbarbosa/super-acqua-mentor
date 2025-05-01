import { useEffect, useState } from 'react';
import { fetchRecommendations, Recommendation } from '../../api/mockApi';
import styles from './RecommendationHistory.module.css';

export default function RecommendationHistory() {
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

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
    <div className={styles.history}>
      <h2>Recommendation History</h2>
      {recommendations.length === 0 ? (
        <p>No recommendations yet.</p>
      ) : (
        <ul className={styles.list}>
          {recommendations.map((rec, index) => (
            <li key={index} className={styles.item}>
              <div className={styles.header}>
                <span className={styles.aiBadge}>{rec.aiModel}</span>
                <time>{new Date(rec.timestamp).toLocaleString()}</time>
              </div>
              <p>{rec.message}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}