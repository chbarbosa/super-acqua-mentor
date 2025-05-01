import React, { useState, FormEvent } from 'react';
import './AquariumForm.css';

interface AquariumSetup {
  volumeLiters: number;
  faunaDescription: string;
  floraDescription: string;
  substrateDescription: string;
  hasFilter: boolean;
  hasHeater: boolean;
  hasLighting: boolean;
  setupDate: string;
}

const AquariumForm: React.FC = () => {
  const [formData, setFormData] = useState<AquariumSetup>({
    volumeLiters: 0,
    faunaDescription: '',
    floraDescription: '',
    substrateDescription: '',
    hasFilter: false,
    hasHeater: false,
    hasLighting: false,
    setupDate: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Aquarium setup:', formData);
    // Add your submission logic here
  };

  return (
    <div className="aquarium-form">
      <h2>Register Aquarium Setup</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="volumeLiters">Volume (liters)</label>
          <input
            type="number"
            id="volumeLiters"
            value={formData.volumeLiters}
            onChange={(e) => setFormData({...formData, volumeLiters: Number(e.target.value)})}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="faunaDescription">Fauna Description</label>
          <textarea
            id="faunaDescription"
            value={formData.faunaDescription}
            onChange={(e) => setFormData({...formData, faunaDescription: e.target.value})}
            placeholder="Describe the fish and other animals in your aquarium"
          />
        </div>

        <div className="form-group">
          <label htmlFor="floraDescription">Flora Description</label>
          <textarea
            id="floraDescription"
            value={formData.floraDescription}
            onChange={(e) => setFormData({...formData, floraDescription: e.target.value})}
            placeholder="Describe the plants in your aquarium"
          />
        </div>

        <div className="form-group">
          <label htmlFor="substrateDescription">Substrate Description</label>
          <textarea
            id="substrateDescription"
            value={formData.substrateDescription}
            onChange={(e) => setFormData({...formData, substrateDescription: e.target.value})}
            placeholder="Describe the substrate used"
          />
        </div>

        <div className="form-group checkboxes">
          <label>
            <input
              type="checkbox"
              checked={formData.hasFilter}
              onChange={(e) => setFormData({...formData, hasFilter: e.target.checked})}
            />
            Filter System
          </label>

          <label>
            <input
              type="checkbox"
              checked={formData.hasHeater}
              onChange={(e) => setFormData({...formData, hasHeater: e.target.checked})}
            />
            Heater
          </label>

          <label>
            <input
              type="checkbox"
              checked={formData.hasLighting}
              onChange={(e) => setFormData({...formData, hasLighting: e.target.checked})}
            />
            Lighting System
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="setupDate">Setup Date</label>
          <input
            type="date"
            id="setupDate"
            value={formData.setupDate}
            onChange={(e) => setFormData({...formData, setupDate: e.target.value})}
            required
          />
        </div>

        <button type="submit" className="submit-button">Register Aquarium</button>
      </form>
    </div>
  );
};

export default AquariumForm;