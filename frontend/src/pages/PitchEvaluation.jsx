import { useState } from 'react';
import Navbar from '../components/Navbar';
import Input from '../components/Input';
import Button from '../components/Button';
import axiosInstance from '../api/axios';


export default function PitchEvaluation() {
  const [pitchDeck, setPitchDeck] = useState('');
  const [evaluationResult, setEvaluationResult] = useState('');
  const [formattedPlan, setFormattedPlan] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await axiosInstance.post('/pitch-evaluation', {
        pitchDeck,
      });
      setEvaluationResult(response.data.evaluationResult);
      setFormattedPlan(response.data.formattedContent || response.data.evaluationResult);
    } catch (err) {
      setError('Failed to evaluate pitch. Please try again.');
      console.error('Pitch evaluation error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow px-4 py-16 md:px-8 lg:px-16 max-w-6xl mx-auto w-full">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Pitch Evaluation</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Get professional feedback on your startup pitch to increase your chances of securing investment.</p>
        </div>
        
        <div className="grid md:grid-cols-5 gap-8">
          <div className="md:col-span-2 bg-white p-8 rounded-lg shadow-md border border-gray-100">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">Submit Your Pitch</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="pitchDeck" className="block mb-2 text-sm font-medium text-gray-700">
                  Pitch Deck Content
                </label>
                <textarea
                  id="pitchDeck"
                  placeholder="Paste your pitch deck content or outline here..."
                  value={pitchDeck}
                  onChange={(e) => setPitchDeck(e.target.value)}
                  className="w-full h-64 px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent resize-none scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
                  required
                />
              </div>
              <Button 
                type="submit" 
                disabled={loading || !pitchDeck.trim()}
                className="w-full bg-black hover:bg-gray-800 text-white py-3 px-6 rounded-md transition-colors duration-200 font-medium"
              >
                {loading ? 'Evaluating...' : 'Evaluate Pitch'}
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
              <h2 className="text-xl font-semibold mb-6 text-gray-800">Evaluation Results</h2>
              
              {!evaluationResult ? (
                <div className="flex flex-col items-center justify-center flex-grow text-center">
                  <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="text-gray-500">Submit your pitch to see professional evaluation results here.</p>
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
                    .overflow-y-auto {
                      scrollbar-width: thin;
                      scrollbar-color: #d1d5db #f3f4f6;
                    }
                  `}</style>
                   {formattedPlan ? (
                    <div 
                      className="prose prose-gray max-w-none business-plan-content" 
                      dangerouslySetInnerHTML={{ __html: formattedPlan }}
                    />
                  ) : (
                  <div className="prose prose-gray max-w-none">
                    <div className="text-gray-800 whitespace-pre-line">{evaluationResult}</div>
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