import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import axiosInstance from '../api/axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function InvestorDashboard() {
  const [startups, setStartups] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStartups = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get('/startups');
        setStartups(response.data);
        setError('');
      } catch (err) {
        setError('Failed to fetch startups.');
        console.error('Fetch startups error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStartups();
  }, []);

  const handleInvest = (startupId) => {
    navigate(`/invest/${startupId}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      
      <Navbar />
      {/* <Sidebar /> */}
      <main className="flex-grow px-6 md:px-12 py-8 pt-24 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Investor Dashboard</h1>
          
          {/* Navigation Buttons */}
          <div className="flex mt-4 md:mt-0 space-x-3">
            <Link
              to="/matchmaking"
              className="px-4 py-2 bg-zinc-950 text-white font-medium rounded-lg shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all"
            >
              Matchmaking
            </Link>
            <Link
              to="/investorpreference"
              className="px-4 py-2 bg-zinc-950 text-white font-medium rounded-lg shadow-sm border hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all"
            >
              Investment Preferences
            </Link>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-md">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse flex space-x-4">
              <div className="h-12 w-12 bg-zinc-600 rounded-full"></div>
              <div className="space-y-4">
                <div className="h-4 bg-zinc-600 rounded w-36"></div>
                <div className="h-4 bg-zinc-600 rounded w-24"></div>
              </div>
            </div>
          </div>
        ) : startups.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <p className="text-gray-600 mb-4">No startups available at the moment.</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-all"
            >
              Refresh
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {startups.map((startup) => (
              <Card key={startup._id} className="flex flex-col h-full bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <div className="p-5 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-900">{startup.name}</h2>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-950 text-white">
                      {startup.industry}
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-gray-700 line-clamp-3 text-sm leading-relaxed">
                      {startup.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4 text-sm">
                    <div className="flex flex-col">
                      <span className="text-gray-500">Funding Needs</span>
                      <span className="font-semibold text-gray-900">${startup.fundingNeeds.toLocaleString()}</span>
                    </div>
                    
                    {startup.location && (
                      <div className="flex flex-col items-end">
                        <span className="text-gray-500">Location</span>
                        <span className="font-semibold text-gray-900">{startup.location}</span>
                      </div>
                    )}
                  </div>

                  {/* Buttons aligned at the bottom */}
                  <div className="mt-auto pt-4 border-t border-gray-100">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <a 
                        href={startup.pitchDeck} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all text-sm font-medium flex items-center justify-center"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Pitch Deck
                      </a>

                      <button
                        onClick={() => handleInvest(startup._id)}
                        className="px-4 py-2 bg-zinc-950 text-white rounded-lg hover:bg-gray-800 transition-all text-sm font-medium flex-1 flex items-center justify-center"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Invest
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
      
    </div>
  );
}