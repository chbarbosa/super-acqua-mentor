import React from 'react';
import styles from './AquariumList.module.css';

const AquariumList: React.FC = () => {
  return (
    <div className={styles.container}>
      <h2>My Aquariums</h2>
      <div className={styles.list}>
        <p>Aquarium list will be displayed here</p>
      </div>
    </div>
  );
};

export default AquariumList;