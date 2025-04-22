import { useState } from 'react';
import { getRecommendation, Recommendation } from '../../api/mockApi';
import styles from './AquariumForm.module.css';

const AI_OPTIONS = [
  { id: 'gpt4', name: 'GPT-4' },
  { id: 'claude', name: 'Claude 3' },
  { id: 'gemini', name: 'Gemini' },
];

type AquariumFormProps = {
  onRecommendation: (rec: Recommendation) => void;
};

export default function AquariumForm({ onRecommendation }: AquariumFormProps) {
  const [formData, setFormData] = useState({
    volumeLiters: 0,
    ph: 7.0,
    temperature: 24,
    // Add other fields as needed
  });
  const [selectedAI, setSelectedAI] = useState(AI_OPTIONS[0].id);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'volumeLiters' || name === 'ph' || name === 'temperature' 
        ? Number(value) 
        : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const recommendation = await getRecommendation(formData, selectedAI);
      onRecommendation(recommendation);
      
      // Reset form
      setFormData({
        volumeLiters: 0,
        ph: 7.0,
        temperature: 24,
      });
    } catch (err) {
      console.error('Failed to get recommendation:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.field}>
        <label className={styles.label}>
          Volume (Liters):
          <input
            type="number"
            name="volumeLiters"
            min="0"
            value={formData.volumeLiters}
            onChange={handleInputChange}
            className={styles.input}
            required
          />
        </label>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>
          pH Level:
          <input
            type="number"
            name="ph"
            min="0"
            max="14"
            step="0.1"
            value={formData.ph}
            onChange={handleInputChange}
            className={styles.input}
            required
          />
        </label>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>
          Temperature (°C):
          <input
            type="number"
            name="temperature"
            min="0"
            max="40"
            value={formData.temperature}
            onChange={handleInputChange}
            className={styles.input}
            required
          />
        </label>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>
          AI Model:
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
        </label>
      </div>

      <button 
        type="submit" 
        className={styles.button}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <span className={styles.spinner} aria-label="Loading"></span>
        ) : (
          'Get Recommendation'
        )}
      </button>
    </form>
  );
}