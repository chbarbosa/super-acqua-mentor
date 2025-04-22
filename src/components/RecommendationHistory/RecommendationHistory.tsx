import { Recommendation } from '../../api/mockApi';
import styles from './RecommendationHistory.module.css';


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