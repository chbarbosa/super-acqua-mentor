import { useState } from 'react';
import styles from './AquariumForm.module.css';
import { getRecommendation } from '../../api/mockApi';
import { AI_OPTIONS } from '../../constants.ts';

type AquariumFormProps = {
  onRecommendation: (rec: { recommendation: string; timestamp: string; aiModel: string;}) => void;
};

export default function AquariumForm({ onRecommendation }: AquariumFormProps) {
  const [volume, setVolume] = useState<number>(0);
  const [selectedAI, setSelectedAI] = useState<string>(AI_OPTIONS[0].id); // Default to GPT-4

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await getRecommendation({ 
      volume,
      aiModel: selectedAI // Pass to mock API
    });
    onRecommendation({
      ...response,
      aiModel: selectedAI // Include in history
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {/* Existing fields... */}
      <label className={styles.label}>
        Volume (Liters):
        <input
          type="number"
          className={styles.input}
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
        />
      </label>

      {/* AI Selector */}
      <div className={styles.field}>
        <label className={styles.label}>AI Model:</label>
        <select
          value={selectedAI}
          onChange={(e) => setSelectedAI(e.target.value)}
          className={styles.select}
        >
          {AI_OPTIONS.map((ai) => (
            <option key={ai.id} value={ai.id}>
              {ai.name}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className={styles.button}>
        Get Recommendation ({AI_OPTIONS.find(ai => ai.id === selectedAI)?.name})
      </button>
    </form>
  );
}