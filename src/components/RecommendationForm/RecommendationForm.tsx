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

interface ValidationErrors {
  ph?: string;
  gh?: string;
  kh?: string;
  ta?: string;
  nitrite?: string;
  nitrate?: string;
  chlorine?: string;
  temperature?: string;
  ammonia?: string;
  photoperiod?: string;
}

const validateParameters = (params: WaterParameters): ValidationErrors => {
  const errors: ValidationErrors = {};

  // pH validation (typical range 6.0-8.0)
  if (params.ph && (Number(params.ph) < 0 || Number(params.ph) > 14)) {
    errors.ph = 'pH must be between 0 and 14';
  }

  // GH validation (typical range 4-8°dH)
  if (params.gh && Number(params.gh) < 0) {
    errors.gh = 'GH cannot be negative';
  }

  // KH validation (typical range 4-8°dH)
  if (params.kh && Number(params.kh) < 0) {
    errors.kh = 'KH cannot be negative';
  }

  // Temperature validation (typical range 20-30°C)
  if (params.temperature && (Number(params.temperature) < 0 || Number(params.temperature) > 40)) {
    errors.temperature = 'Temperature must be between 0°C and 40°C';
  }

  // Nitrite validation (should be close to 0)
  if (params.nitrite && Number(params.nitrite) < 0) {
    errors.nitrite = 'Nitrite cannot be negative';
  }

  // Nitrate validation (should be < 40 ppm)
  if (params.nitrate && Number(params.nitrate) < 0) {
    errors.nitrate = 'Nitrate cannot be negative';
  }

  // Chlorine validation (should be 0)
  if (params.chlorine && Number(params.chlorine) < 0) {
    errors.chlorine = 'Chlorine cannot be negative';
  }

  // Ammonia validation (should be close to 0)
  if (params.ammonia && Number(params.ammonia) < 0) {
    errors.ammonia = 'Ammonia cannot be negative';
  }

  // Photoperiod validation (0-24 hours)
  if (params.photoperiod && (Number(params.photoperiod) < 0 || Number(params.photoperiod) > 24)) {
    errors.photoperiod = 'Photoperiod must be between 0 and 24 hours';
  }

  return errors;
};

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
  const [errors, setErrors] = useState<ValidationErrors>({});

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
    
    const validationErrors = validateParameters(parameters);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log('Form submitted:', { aquarium: selectedAquarium, parameters });
    }
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
              <input 
                type="number" 
                step="0.1" 
                id="ph" 
                name="ph" 
                value={parameters.ph} 
                onChange={handleChange}
                className={errors.ph ? styles.inputError : ''}
              />
              {errors.ph && <span className={styles.errorMessage}>{errors.ph}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="gh">GH (°dH):</label>
              <input 
                type="number" 
                step="0.1" 
                id="gh" 
                name="gh" 
                value={parameters.gh} 
                onChange={handleChange}
                className={errors.gh ? styles.inputError : ''}
              />
              {errors.gh && <span className={styles.errorMessage}>{errors.gh}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="kh">KH (°dH):</label>
              <input 
                type="number" 
                step="0.1" 
                id="kh" 
                name="kh" 
                value={parameters.kh} 
                onChange={handleChange}
                className={errors.kh ? styles.inputError : ''}
              />
              {errors.kh && <span className={styles.errorMessage}>{errors.kh}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="ta">Total Alkalinity:</label>
              <input 
                type="number" 
                id="ta" 
                name="ta" 
                value={parameters.ta} 
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="nitrite">Nitrite (NO₂):</label>
              <input 
                type="number" 
                step="0.01" 
                id="nitrite" 
                name="nitrite" 
                value={parameters.nitrite} 
                onChange={handleChange}
                className={errors.nitrite ? styles.inputError : ''}
              />
              {errors.nitrite && <span className={styles.errorMessage}>{errors.nitrite}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="nitrate">Nitrate (NO₃):</label>
              <input 
                type="number" 
                step="0.1" 
                id="nitrate" 
                name="nitrate" 
                value={parameters.nitrate} 
                onChange={handleChange}
                className={errors.nitrate ? styles.inputError : ''}
              />
              {errors.nitrate && <span className={styles.errorMessage}>{errors.nitrate}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="chlorine">Chlorine:</label>
              <input 
                type="number" 
                step="0.01" 
                id="chlorine" 
                name="chlorine" 
                value={parameters.chlorine} 
                onChange={handleChange}
                className={errors.chlorine ? styles.inputError : ''}
              />
              {errors.chlorine && <span className={styles.errorMessage}>{errors.chlorine}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="temperature">Temperature (°C):</label>
              <input 
                type="number" 
                step="0.1" 
                id="temperature" 
                name="temperature" 
                value={parameters.temperature} 
                onChange={handleChange}
                className={errors.temperature ? styles.inputError : ''}
              />
              {errors.temperature && <span className={styles.errorMessage}>{errors.temperature}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="ammonia">Ammonia (NH₃):</label>
              <input 
                type="number" 
                step="0.01" 
                id="ammonia" 
                name="ammonia" 
                value={parameters.ammonia} 
                onChange={handleChange}
                className={errors.ammonia ? styles.inputError : ''}
              />
              {errors.ammonia && <span className={styles.errorMessage}>{errors.ammonia}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="photoperiod">Photoperiod (hours):</label>
              <input 
                type="number" 
                min="0" 
                max="24" 
                id="photoperiod" 
                name="photoperiod" 
                value={parameters.photoperiod} 
                onChange={handleChange}
                className={errors.photoperiod ? styles.inputError : ''}
              />
              {errors.photoperiod && <span className={styles.errorMessage}>{errors.photoperiod}</span>}
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