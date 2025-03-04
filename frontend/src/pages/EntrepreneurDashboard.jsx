import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import axiosInstance from '../api/axios';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Sidebar from '../components/Sidebar';
import { useParams } from 'react-router-dom';

export default function EntrepreneurDashboard() {
  const [investors, setInvestors] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const { startupId } = useParams();

  useEffect(() => {
    const fetchInvestors = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get('/investors');
        setInvestors(response.data);
        setError('');
      } catch (err) {
        setError('Failed to fetch investors.');
        console.error('Fetch investors error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchInvestors();
  }, []);

  const handlePitch = async (investorId) => {
    try {
      toast.success('Pitch Request Send.', {
        style: {
          border: '1px solid black',
          padding: '16px',
          color: 'black',
        },
        iconTheme: {
          primary: 'black',
          secondary: 'white',
        },
      });
    } catch (err) {
      setError('Failed to send pitch request.');
      console.error('Pitch error:', err);
    }
  };

  // Helper function to format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  // Helper function to determine risk level badge color
  const getRiskBadgeColor = (riskLevel) => {
    switch(riskLevel?.toLowerCase()) {
      case 'high':
        return 'bg-gray-900 text-white';
      case 'medium':
        return 'bg-gray-700 text-white';
      case 'low':
      default:
        return 'bg-gray-300 text-gray-900';
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* <Sidebar startupId={startupId}/> */}
      <Navbar />
      <main className="flex-grow px-6 md:px-12 py-8 pt-24 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Entrepreneur Dashboard</h1>
          
          {/* Navigation Buttons */}
          <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
            <Link
              to="/createstartup"
              className="px-4 py-2 bg-black text-white font-medium rounded-lg shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all"
            >
              Create Startup
            </Link>
            <Link
              to="/pitch-evaluation"
              className="px-4 py-2 bg-white text-gray-800 font-medium rounded-lg shadow-sm border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all"
            >
              Pitch Evaluation
            </Link>
            <Link
              to="/business-plan"
              className="px-4 py-2 bg-white text-gray-800 font-medium rounded-lg shadow-sm border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all"
            >
              Business Plan
            </Link>
            <Link
              to="/matchmaking"
              className="px-4 py-2 bg-zinc-950 text-white font-medium rounded-lg shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all"
            >
              Matchmaking
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
              <div className="h-12 w-12 bg-gray-300 rounded-full"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-300 rounded w-36"></div>
                <div className="h-4 bg-gray-300 rounded w-24"></div>
              </div>
            </div>
          </div>
        ) : investors.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <p className="text-gray-600 mb-4">No investors available at the moment.</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-all"
            >
              Refresh
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {investors.map((investor) => (
              <Card key={investor._id} className="flex flex-col h-full bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <div className="p-5 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-900">{investor.name}</h2>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskBadgeColor(investor.riskLevel)}`}>
                      {investor.riskLevel} Risk
                    </span>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-center mb-3">
                      <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="font-medium text-gray-900">{formatCurrency(investor.investmentCapacity)}</span>
                    </div>
                    
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500 mb-1">Industries</span>
                      <div className="flex flex-wrap gap-2">
                        {investor.industryPreferences && investor.industryPreferences.map((industry, index) => (
                          <span key={index} className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-200 text-zinc-950">
                            {industry}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Additional investor details if available */}
                  {investor.description && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{investor.description}</p>
                  )}

                  {/* Button aligned at the bottom */}
                  <div className="mt-auto pt-4 border-t border-gray-100">
                    <button
                      onClick={() => handlePitch()}
                      className="w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-all text-sm font-medium flex items-center justify-center"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                      </svg>
                      Pitch Idea
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