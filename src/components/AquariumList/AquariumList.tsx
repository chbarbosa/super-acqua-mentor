import React, { useEffect, useState } from 'react';
import { fetchAquariums, deleteAquarium, Aquarium } from '../../api/mockApi';
import styles from './AquariumList.module.css';

const AquariumList: React.FC = () => {
  const [aquariums, setAquariums] = useState<Aquarium[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadAquariums();
  }, []);

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

  const handleDelete = async (id: string) => {
    try {
      await deleteAquarium(id);
      setAquariums(aquariums.filter(aq => aq.id !== id));
    } catch (err) {
      setError('Failed to delete aquarium');
    }
  };

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
      <h2>My Aquariums</h2>
      {aquariums.length === 0 ? (
        <p>No aquariums registered yet.</p>
      ) : (
        <div className={styles.grid}>
          {aquariums.map(aquarium => (
            <div key={aquarium.id} className={styles.card}>
              <div className={styles.header}>
                <h3>{aquarium.volumeLiters}L Aquarium</h3>
                <button 
                  onClick={() => handleDelete(aquarium.id)}
                  className={styles.deleteButton}
                >
                  Delete
                </button>
              </div>
              <div className={styles.details}>
                <p><strong>Setup Date:</strong> {new Date(aquarium.setupDate).toLocaleDateString()}</p>
                <p><strong>Fauna:</strong> {aquarium.faunaDescription}</p>
                <p><strong>Flora:</strong> {aquarium.floraDescription}</p>
                <p><strong>Substrate:</strong> {aquarium.substrateDescription}</p>
                <div className={styles.features}>
                  {aquarium.hasFilter && <span>Filter</span>}
                  {aquarium.hasHeater && <span>Heater</span>}
                  {aquarium.hasLighting && <span>Lighting</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AquariumList;