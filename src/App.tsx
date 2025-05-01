
import AquariumForm from './components/AquariumForm/AquariumForm';
import RecommendationHistory from './components/RecommendationHistory/RecommendationHistory';
import './index.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import RecommendationForm from './components/RecommendationForm/RecommendationForm';
import Layout from './Layout';

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/recommendation" replace />} />
          <Route path="aquarium" element={<AquariumForm />} />
          <Route path="recommendation" element={<RecommendationForm />} />
          <Route path="history" element={<RecommendationHistory />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}