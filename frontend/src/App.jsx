import { useEffect, useState } from 'react';
import axios from 'axios';
import PortfolioView from './PortfolioView.jsx';

const API_BASE = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');

function App() {
  const [data, setData] = useState(null);
  const [cfData, setCfData] = useState(null);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    axios.get(`${API_BASE}/api/portfolio`)
      .then(({ data: portfolio }) => setData(portfolio))
      .catch((err) => {
        console.error('Failed to load portfolio data:', err);
        setLoadError(err.response?.data?.message || 'Could not load portfolio data. Please try again later.');
      });
  }, []);

  useEffect(() => {
    const handle = data?.profile?.codeforcesHandle;
    if (!handle) return;

    axios.get(`${API_BASE}/api/codeforces/${encodeURIComponent(handle)}`)
      .then(({ data: rating }) => setCfData(rating))
      .catch((err) => console.error('Failed to load Codeforces data:', err));
  }, [data]);

  if (loadError) {
    return <main role="alert" className="mx-auto max-w-4xl px-6 py-16 text-[#16211f]">{loadError}</main>;
  }

  if (!data) {
    return <main role="status" className="mx-auto max-w-4xl px-6 py-16 text-[#16211f]">Loading portfolio...</main>;
  }

  return <PortfolioView data={data} cfData={cfData} />;
}

export default App;
