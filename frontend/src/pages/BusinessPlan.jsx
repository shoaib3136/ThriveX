import { useState } from 'react';
import Navbar from '../components/Navbar';
import Input from '../components/Input';
import Button from '../components/Button';
import axiosInstance from '../api/axios';

export default function BusinessPlan() {
  const [startupDetails, setStartupDetails] = useState('');
  const [businessPlan, setBusinessPlan] = useState('');
  const [formattedPlan, setFormattedPlan] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await axiosInstance.post('/business-plans', {
        startupDetails,
      });
      setBusinessPlan(response.data.planContent);
      setFormattedPlan(response.data.formattedContent || response.data.planContent);
    } catch (err) {
      setError('Failed to generate business plan. Please try again.');
      console.error('Business plan error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow px-4 py-16 md:px-8 lg:px-16 max-w-6xl mx-auto w-full">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Business Plan Generator</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Create a professional business plan for your startup in seconds.</p>
        </div>
        
        <div className="grid md:grid-cols-5 gap-8">
          <div className="md:col-span-2 bg-white p-8 rounded-lg shadow-md border border-gray-100">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">Startup Details</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="startupDetails" className="block mb-2 text-sm font-medium text-gray-700">
                  Describe Your Startup
                </label>
                <textarea
                  id="startupDetails"
                  placeholder="Enter your business concept, target market, unique value proposition, and any other relevant details..."
                  value={startupDetails}
                  onChange={(e) => setStartupDetails(e.target.value)}
                  className="w-full h-64 px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent resize-none"
                  style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#d1d5db #f3f4f6'
                  }}
                  required
                />
                <style jsx>{`
                  textarea::-webkit-scrollbar {
                    width: 8px;
                  }
                  textarea::-webkit-scrollbar-track {
                    background-color: #f3f4f6;
                    border-radius: 4px;
                  }
                  textarea::-webkit-scrollbar-thumb {
                    background-color: #d1d5db;
                    border-radius: 4px;
                  }
                  textarea::-webkit-scrollbar-thumb:hover {
                    background-color: #9ca3af;
                  }
                `}</style>
              </div>
              <Button 
                type="submit" 
                disabled={loading || !startupDetails.trim()}
                className="w-full bg-black hover:bg-gray-800 text-white py-3 px-6 rounded-md transition-colors duration-200 font-medium"
              >
                {loading ? 'Generating...' : 'Generate Business Plan'}
              </Button>
            </form>
            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm">
                {error}
              </div>
            )}
          </div>
          
          <div className="md:col-span-3">
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100 h-full flex flex-col">
              <h2 className="text-xl font-semibold mb-6 text-gray-800">Generated Business Plan</h2>
              
              {!businessPlan ? (
                <div className="flex flex-col items-center justify-center flex-grow text-center">
                  <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="text-gray-500">Your business plan will appear here after generation.</p>
                </div>
              ) : (
                <div 
                  className="overflow-y-auto max-h-[500px] flex-grow pr-2 relative"
                  style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#d1d5db #f3f4f6'
                  }}
                >
                  <style jsx>{`
                    .overflow-y-auto::-webkit-scrollbar {
                      width: 8px;
                    }
                    .overflow-y-auto::-webkit-scrollbar-track {
                      background-color: #f3f4f6;
                      border-radius: 4px;
                    }
                    .overflow-y-auto::-webkit-scrollbar-thumb {
                      background-color: #d1d5db;
                      border-radius: 4px;
                    }
                    .overflow-y-auto::-webkit-scrollbar-thumb:hover {
                      background-color: #9ca3af;
                    }
                    
                    /* Styling for the rendered HTML content */
                    .business-plan-content h1 {
                      font-size: 1.8rem;
                      font-weight: 700;
                      margin-top: 1.5rem;
                      margin-bottom: 1rem;
                      color: #111827;
                    }
                    
                    .business-plan-content h2 {
                      font-size: 1.5rem;
                      font-weight: 600;
                      margin-top: 1.25rem;
                      margin-bottom: 0.75rem;
                      color: #1f2937;
                      border-bottom: 1px solid #e5e7eb;
                      padding-bottom: 0.5rem;
                    }
                    
                    .business-plan-content h3 {
                      font-size: 1.25rem;
                      font-weight: 600;
                      margin-top: 1rem;
                      margin-bottom: 0.5rem;
                      color: #374151;
                    }
                    
                    .business-plan-content p {
                      margin-bottom: 1rem;
                      line-height: 1.6;
                    }
                    
                    .business-plan-content ul, .business-plan-content ol {
                      margin-left: 1.5rem;
                      margin-bottom: 1rem;
                    }
                    
                    .business-plan-content ul {
                      list-style-type: disc;
                    }
                    
                    .business-plan-content ol {
                      list-style-type: decimal;
                    }
                    
                    .business-plan-content li {
                      margin-bottom: 0.5rem;
                    }
                    
                    .business-plan-content strong {
                      font-weight: 600;
                    }
                    
                    .business-plan-content em {
                      font-style: italic;
                    }
                  `}</style>
                  
                  {formattedPlan ? (
                    <div 
                      className="prose prose-gray max-w-none business-plan-content" 
                      dangerouslySetInnerHTML={{ __html: formattedPlan }}
                    />
                  ) : (
                    <div className="prose prose-gray max-w-none">
                      <div className="text-gray-800 whitespace-pre-line">{businessPlan}</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}