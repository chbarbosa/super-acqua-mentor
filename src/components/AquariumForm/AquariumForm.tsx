import { useState } from 'react';
import styles from './AquariumForm.module.css';
import { getRecommendation } from '../../api/mockApi';

export default function AquariumForm() {
  const [volume, setVolume] = useState<number>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Inside handleSubmit:
    const response = await getRecommendation({ volume });
    console.log(response); // Later, store this in state/history
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