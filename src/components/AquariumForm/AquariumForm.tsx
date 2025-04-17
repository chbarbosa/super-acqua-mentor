import { useState } from 'react';
import styles from './AquariumForm.module.css';
import { getRecommendation } from '../../api/mockApi';

type AquariumFormProps = {
  onRecommendation: (rec: { recommendation: string; timestamp: string }) => void;
};

export default function AquariumForm({ onRecommendation }: AquariumFormProps) {
  const [volume, setVolume] = useState<number>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await getRecommendation({ volume });
    onRecommendation(response); // Send to parent
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label className={styles.label}>
        Volume (Liters):
        <input
          type="number"
          className={styles.input}
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
        />
      </label>
      <button type="submit" className={styles.button}>
        Get Recommendation
      </button>
    </form>
  );
}