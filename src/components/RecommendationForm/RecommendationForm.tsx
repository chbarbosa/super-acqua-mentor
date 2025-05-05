import React, { useEffect, useState } from 'react';
import { fetchAquariums, Aquarium } from '../../api/mockApi';
import AquariumSelector from '../AquariumSelector/AquariumSelector';
import styles from './RecommendationForm.module.css';

const RecommendationForm: React.FC = () => {
  const [aquariums, setAquariums] = useState<Aquarium[]>([]);
  const [selectedAquarium, setSelectedAquarium] = useState<Aquarium | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <div className={styles.container}>
      <h2>Get Aquarium Recommendation</h2>
      <AquariumSelector 
        aquariums={aquariums} 
        onSelect={setSelectedAquarium} 
      />
      {selectedAquarium && (
        <div className={styles.form}>
          {/* Additional form fields will go here */}
        </div>
      )}
    </div>
  );
};

export default RecommendationForm;