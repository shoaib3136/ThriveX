import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import axiosInstance from '../api/axios';

export default function Matchmaking() {
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('all');

  useEffect(() => {
    const fetchMatches = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get('/matches');
        setMatches(response.data);
        setError('');
      } catch (err) {
        setError('Failed to fetch matches.');
        console.error('Fetch matches error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, []);

  const getDisplayName = (entity, type) => {
    if (!entity) return `Unknown ${type}`;
    if (typeof entity === 'object' && entity.name) return entity.name;
    if (typeof entity === 'string') return `${type} ID: ${entity}`;
    return `Unknown ${type}`;
  };

  const filteredMatches = selectedFilter === 'all' 
    ? matches 
    : matches.filter(match => match.status?.toLowerCase() === selectedFilter);

  const getScoreColor = (score) => {
    if (score >= 80) return 'bg-green-100 text-green-800';
    if (score >= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow px-6 md:px-12 py-8 pt-24 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Matchmaking</h1>
            <p className="text-gray-500 mt-1">Find your perfect startup-investor connections</p>
          </div>
          <div className="flex flex-col sm:flex-row mt-4 md:mt-0 space-y-3 sm:space-y-0 sm:space-x-3">
            <Link to="/entrepreneurdashboard" className="px-4 py-2 bg-zinc-950 text-white font-medium rounded-lg shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all">
              Entrepreneur Dashboard
            </Link>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all flex items-center justify-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
          </div>
        </div>


        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="bg-white rounded-xl shadow-sm p-5 h-64">
                <div className="animate-pulse">
                  <div className="flex items-start justify-between mb-4">
                    <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-5 bg-gray-200 rounded-full w-16"></div>
                  </div>
                  <div className="space-y-3 mb-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                  <div className="h-5 bg-gray-200 rounded w-1/4 mt-4"></div>
                  <div className="h-10 bg-gray-200 rounded-lg w-full mt-8"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredMatches.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No matches found</h3>
            <p className="mt-1 text-gray-500">Try changing your filter or check back later.</p>
            <div className="mt-6">
              <button onClick={() => window.location.reload()} className="px-4 py-2 bg-zinc-950 text-white font-medium rounded-lg hover:bg-gray-800 transition-all">
                Refresh
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMatches.map((match) => (
              <Card key={match._id} className="flex flex-col h-full bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden border border-gray-100">
                <div className="p-5 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-900">Match Details</h2>
                    {match.status && (
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        match.status.toLowerCase() === 'accepted' ? 'bg-green-100 text-green-800' :
                        match.status.toLowerCase() === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {match.status}
                      </span>
                    )}
                  </div>
                  <div className="mb-4 space-y-2">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <p className="text-gray-700">
                        <span className="font-medium">Startup:</span> {getDisplayName(match.startupId, 'Startup')}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-gray-700">
                        <span className="font-medium">Investor:</span> {getDisplayName(match.investorId, 'Investor')}
                      </p>
                    </div>
                  </div>
                  
                  {match.matchScore !== undefined && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-1">Match Score</p>
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="h-2.5 rounded-full bg-zinc-950" 
                            style={{ width: `${match.matchScore}%` }}
                          ></div>
                        </div>
                        <span className={`ml-3 px-2 py-0.5 rounded text-xs font-medium ${getScoreColor(match.matchScore)}`}>
                          {match.matchScore}%
                        </span>
                      </div>
                    </div>
                  )}
                  
                  {match.lastUpdated && (
                    <p className="text-xs text-gray-500 mb-4">
                      Last updated: {new Date(match.lastUpdated).toLocaleDateString()}
                    </p>
                  )}
                  
                  <div className="mt-auto pt-4 border-t border-gray-100 flex gap-2">
                    <button className="flex-1 px-3 py-2 bg-zinc-950 text-white rounded-lg hover:bg-gray-800 transition-all text-sm font-medium flex items-center justify-center">
                      <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      View Details
                    </button>
                    <button className="px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all text-sm font-medium">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>
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