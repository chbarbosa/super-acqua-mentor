import React, { useState } from 'react';
import { Aquarium } from '../../api/mockApi';
import styles from './AquariumSelector.module.css';

interface AquariumSelectorProps {
  aquariums: Aquarium[];
  onSelect: (aquarium: Aquarium) => void;
}

const AquariumSelector: React.FC<AquariumSelectorProps> = ({ aquariums, onSelect }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex(current => 
      current === 0 ? aquariums.length - 1 : current - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex(current => 
      current === aquariums.length - 1 ? 0 : current + 1
    );
  };

  if (aquariums.length === 0) {
    return <div className={styles.empty}>No aquariums available</div>;
  }

  const currentAquarium = aquariums[currentIndex];

  return (
    <div className={styles.selector}>
      <button 
        className={`${styles.arrow} ${styles.left}`}
        onClick={handlePrevious}
        aria-label="Previous aquarium"
      >
        &lt;
      </button>

      <div 
        className={styles.card}
        onClick={() => onSelect(currentAquarium)}
      >
        <div className={styles.header}>
          <h3>{currentAquarium.volumeLiters}L Aquarium</h3>
        </div>
        <div className={styles.details}>
          <p><strong>Setup Date:</strong> {new Date(currentAquarium.setupDate).toLocaleDateString()}</p>
          <p><strong>Fauna:</strong> {currentAquarium.faunaDescription}</p>
          <p><strong>Flora:</strong> {currentAquarium.floraDescription}</p>
          <div className={styles.features}>
            {currentAquarium.hasFilter && <span>Filter</span>}
            {currentAquarium.hasHeater && <span>Heater</span>}
            {currentAquarium.hasLighting && <span>Lighting</span>}
          </div>
        </div>
      </div>

      <button 
        className={`${styles.arrow} ${styles.right}`}
        onClick={handleNext}
        aria-label="Next aquarium"
      >
        &gt;
      </button>

      <div className={styles.pagination}>
        {aquariums.map((_, index) => (
          <span 
            key={index} 
            className={`${styles.dot} ${index === currentIndex ? styles.active : ''}`}
          />
        ))}
      </div>
    </div>
  );
};

export default AquariumSelector;