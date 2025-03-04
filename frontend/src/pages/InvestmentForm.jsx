import { useState, useEffect } from 'react';
import axiosInstance from '../api/axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';

export default function InvestmentForm() {
  const { startupId } = useParams();
  const navigate = useNavigate();
  const [startup, setStartup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    investorName: '',
    email: '',
    message: '',
  });

  useEffect(() => {
    const fetchStartupDetails = async () => {
      try {
        const response = await axiosInstance.get(`/startups/${startupId}`);
        setStartup(response.data);
      } catch (err) {
        console.error('Error fetching startup details:', err);
        toast.error('Could not fetch startup details');
      } finally {
        setLoading(false);
      }
    };

    fetchStartupDetails();
  }, [startupId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/investment', { ...formData, startupId });
      toast.success('Investment request sent successfully!', {
        style: {
          border: '1px solid black',
          padding: '16px',
          color: 'black',
        },
        iconTheme: {
          primary: 'black',
          secondary: 'white',
        }
      });
      navigate('/investordashboard');
    } catch (err) {
      toast.error('Failed to submit investment request.');
      console.error('Submit investment error:', err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow px-6 md:px-12 py-8 pt-24 max-w-7xl mx-auto w-full">
        {/* Breadcrumb navigation */}
        <nav className="flex mb-6 text-sm text-gray-500">
          <Link to="/investordashboard" className="hover:text-gray-700">Dashboard</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-900">Investment Form</span>
        </nav>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left column: Startup Info */}
          <div className="md:col-span-1">
            {loading ? (
              <div className="bg-white p-6 rounded-lg shadow-sm h-full animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2 mt-6"></div>
              </div>
            ) : (
              <div className="bg-white p-6 rounded-lg shadow-sm h-full">
                <div className="bg-zinc-950 text-white p-4 -mx-6 -mt-6 mb-6 rounded-t-lg">
                  <h2 className="text-xl font-bold">{startup?.name || 'Startup Details'}</h2>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Industry</p>
                    <p className="font-semibold">{startup?.industry || 'N/A'}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Funding Needs</p>
                    <p className="font-semibold">${startup?.fundingNeeds?.toLocaleString() || 'N/A'}</p>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-500 mb-2">About</p>
                    <p className="text-sm leading-relaxed">{startup?.description || 'No description available.'}</p>
                  </div>
                  
                  {startup?.pitchDeck && (
                    <div className="pt-4">
                      <a 
                        href={startup.pitchDeck} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all text-sm font-medium"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        View Pitch Deck
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          
          {/* Right column: Investment Form */}
          <div className="md:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Investment Request</h1>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Investor Name</label>
                    <input
                      type="text"
                      name="investorName"
                      value={formData.investorName}
                      onChange={handleChange}
                      className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:border-zinc-950 transition-all"
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:border-zinc-950 transition-all"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message to Founder</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:border-zinc-950 transition-all"
                    placeholder="Introduce yourself and explain why you're interested in investing..."
                    required
                  />
                </div>
                
                <div className="flex items-center pt-4">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    className="h-4 w-4 text-zinc-950 focus:ring-zinc-950 border-gray-300 rounded"
                    required
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                    I agree to the <a href="#" className="text-blue-600 hover:text-zinc-950">terms and conditions</a>
                  </label>
                </div>
                
                <div className="flex space-x-4 pt-2">
                  <Link
                    to="/investordashboard"
                    className="px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all text-sm font-medium"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-zinc-950 text-white rounded-lg hover:bg-gray-800 transition-all text-sm font-medium flex items-center justify-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    Submit Investment Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}