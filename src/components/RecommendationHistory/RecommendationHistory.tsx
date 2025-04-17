import styles from './RecommendationHistory.module.css';

type Recommendation = {
  recommendation: string;
  timestamp: string;
};

type RecommendationHistoryProps = {
  recommendations: Recommendation[];
};

export default function RecommendationHistory({ recommendations }: RecommendationHistoryProps) {
  return (
    <div className={styles.history}>
      <h2>Recommendation History</h2>
      {recommendations.length === 0 ? (
        <p>No recommendations yet.</p>
      ) : (
        <ul className={styles.list}>
          {recommendations.map((rec, index) => (
            <li key={index} className={styles.item}>
              <time className={styles.time}>
                {new Date(rec.timestamp).toLocaleString()}
              </time>
              <p className={styles.recommendation}>{rec.recommendation}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}