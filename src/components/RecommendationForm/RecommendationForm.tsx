import React, { useState, useEffect } from 'react';
import { fetchAquariums, Aquarium } from '../../api/mockApi';
import AquariumSelector from '../AquariumSelector/AquariumSelector';
import styles from './RecommendationForm.module.css';

interface WaterParameters {
  tpa: string;
  ph: string;
  gh: string;
  kh: string;
  ta: string;
  nitrite: string;
  nitrate: string;
  chlorine: string;
  temperature: string;
  ammonia: string;
  photoperiod: string;
  recentProblems: string;
}

const RecommendationForm: React.FC = () => {
  const [aquariums, setAquariums] = useState<Aquarium[]>([]);
  const [selectedAquarium, setSelectedAquarium] = useState<Aquarium | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [parameters, setParameters] = useState<WaterParameters>({
    tpa: '1 week',
    ph: '',
    gh: '',
    kh: '',
    ta: '',
    nitrite: '',
    nitrate: '',
    chlorine: '',
    temperature: '',
    ammonia: '',
    photoperiod: '',
    recentProblems: ''
  });

  useEffect(() => {
    const loadAquariums = async () => {
      try {
        const data = await fetchAquariums();
        setAquariums(data);
      } catch (err) {
        setError('Failed to load aquariums');
      } finally {
        setIsLoading(false);
      }
    };

    loadAquariums();
  }, []);

  if (isLoading) {
    return (
      <div className="app">
        <div className="loading-spinner">Loading aquariums...</div>
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', { aquarium: selectedAquarium, parameters });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setParameters(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className={styles.container}>
      <h2>Get Aquarium Recommendation</h2>
      <AquariumSelector 
        aquariums={aquariums} 
        onSelect={setSelectedAquarium} 
      />
      
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="tpa">Water Change Frequency:</label>
            <select id="tpa" name="tpa" value={parameters.tpa} onChange={handleChange}>
              <option value="1 week">Weekly</option>
              <option value="2 weeks">Bi-weekly</option>
              <option value="3 weeks">Every 3 weeks</option>
              <option value="1 month">Monthly</option>
            </select>
          </div>

          <div className={styles.parameterGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="ph">pH:</label>
              <input type="number" step="0.1" id="ph" name="ph" value={parameters.ph} onChange={handleChange} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="gh">GH (°dH):</label>
              <input type="number" step="0.1" id="gh" name="gh" value={parameters.gh} onChange={handleChange} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="kh">KH (°dH):</label>
              <input type="number" step="0.1" id="kh" name="kh" value={parameters.kh} onChange={handleChange} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="ta">Total Alkalinity:</label>
              <input type="number" id="ta" name="ta" value={parameters.ta} onChange={handleChange} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="nitrite">Nitrite (NO₂):</label>
              <input type="number" step="0.01" id="nitrite" name="nitrite" value={parameters.nitrite} onChange={handleChange} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="nitrate">Nitrate (NO₃):</label>
              <input type="number" step="0.1" id="nitrate" name="nitrate" value={parameters.nitrate} onChange={handleChange} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="chlorine">Chlorine:</label>
              <input type="number" step="0.01" id="chlorine" name="chlorine" value={parameters.chlorine} onChange={handleChange} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="temperature">Temperature (°C):</label>
              <input type="number" step="0.1" id="temperature" name="temperature" value={parameters.temperature} onChange={handleChange} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="ammonia">Ammonia (NH₃):</label>
              <input type="number" step="0.01" id="ammonia" name="ammonia" value={parameters.ammonia} onChange={handleChange} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="photoperiod">Photoperiod (hours):</label>
              <input type="number" min="0" max="24" id="photoperiod" name="photoperiod" value={parameters.photoperiod} onChange={handleChange} />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="recentProblems">Recent Problems:</label>
            <textarea 
              id="recentProblems" 
              name="recentProblems" 
              value={parameters.recentProblems} 
              onChange={handleChange}
              placeholder="Describe any recent issues with your aquarium..."
            />
          </div>

          <button type="submit" className={styles.submitButton}>Get Recommendation</button>
        </form>
      
    </div>
  );
};

export default RecommendationForm;