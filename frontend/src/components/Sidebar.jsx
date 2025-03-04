// Sidebar.js
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../api/axios';

const Sidebar = ({ startupId }) => { // Accept startupId as a prop
  const [isOpen, setIsOpen] = useState(false);
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log('Startup ID in Sidebar:', startupId); // Debugging line

  useEffect(() => {
    if (!startupId) return; // Don't fetch if startupId is undefined

    const fetchInvestments = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/api/investment/${startupId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Add token if required
          },
        });
        console.log('API Response:', response.data); // Debugging line
        setInvestments(response.data);
      } catch (err) {
        console.error('Fetch investments error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchInvestments();
  }, [startupId]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className=''>
      {/* Sidebar toggle button */}
      <button 
        onClick={toggleSidebar}
        className="fixed left-4 top-4 z-50 p-3 bg-zinc-950 text-white rounded-full shadow-lg hover:bg-gray-800 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
      >
        <div className="relative">
          {/* Message icon */}
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          )}
          
          {/* Message count badge */}
          {!isOpen && investments.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {investments.length > 9 ? '9+' : investments.length}
            </span>
          )}
        </div>
      </button>

      {/* Sidebar */}
      <div 
        className={`fixed top-0 right-0 z-40 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Sidebar header */}
          <div className="px-4 py-5 border-b flex items-center justify-between bg-zinc-950 text-white">
            <h2 className="text-xl font-bold">Investment Requests</h2>
            <button 
              onClick={toggleSidebar} 
              className="text-white hover:text-gray-300 focus:outline-none"
              aria-label="Close sidebar"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Investment requests content */}
          <div className="flex-grow overflow-y-auto p-4">
            {loading ? (
              <div className="animate-pulse space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex space-x-2">
                    <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                    <div className="flex-1 space-y-2 py-1">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : investments.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <svg className="w-12 h-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <p className="text-center">No investment requests yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {investments.map((investment) => (
                  <div key={investment._id} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold">{investment.investorName.charAt(0)}</span>
                      </div>
                      <div className="ml-2">
                        <h3 className="text-sm font-medium text-gray-900">{investment.investorName}</h3>
                        <p className="text-xs text-gray-500">{investment.email}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 line-clamp-2">{investment.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar footer */}
          <div className="p-4 border-t">
            <Link
              to="/investment-requests"
              className="w-full px-4 py-2 bg-zinc-950 text-white font-medium rounded-lg shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all flex justify-center items-center"
            >
              <span>View All Requests</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Overlay when sidebar is open */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-opacity-0 backdrop-blur-sm z-2"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default Sidebar;