import Navbar from '../components/Navbar';
import Button from '../components/Button';
import bgImage from '../assets/new1.png';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <main 
        className="h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: `url(${bgImage})`}}
      >
        {/* Subtle dark gradient overlay for better text contrast */}
        {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div> */}
        
        <div className="text-center  relative z-10 mb-60  py-12 px-16 ml-150 mt-70 ">
          <h1 className="text-5xl font-bold mb-4 text-zinc-950">Welcome to THRIVE X</h1>
          <p className="text-xl mb-8 text-zinc-950">AI-powered startup funding made simple.</p>
          <Button className="transform transition-transform duration-300 hover:scale-105 shadow-lg">
            <Link to='/signup'>Get Started</Link>
          </Button>
        </div>
      </main>

      {/* How It Works Section */}
      <section className="py-20 bg-white/70">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 relative">
            <span className="relative">
              How THRIVE X Works
            </span>
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center p-6 relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
              <div className="absolute bottom-0 left-0 h-1 w-full bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              <div className="text-3xl font-bold mb-4 w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center mx-auto shadow-inner">1</div>
              <h3 className="text-xl font-semibold mb-4">Create Your Profile</h3>
              <p className="text-gray-700">Build a comprehensive profile showcasing your startup or investment preferences.</p>
            </div>
            <div className="text-center p-6 relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
              <div className="absolute bottom-0 left-0 h-1 w-full bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              <div className="text-3xl font-bold mb-4 w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center mx-auto shadow-inner">2</div>
              <h3 className="text-xl font-semibold mb-4">AI-Powered Matching</h3>
              <p className="text-gray-700">Our algorithm connects entrepreneurs with the most suitable investors.</p>
            </div>
            <div className="text-center p-6 relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
              <div className="absolute bottom-0 left-0 h-1 w-full bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              <div className="text-3xl font-bold mb-4 w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center mx-auto shadow-inner">3</div>
              <h3 className="text-xl font-semibold mb-4">Secure Funding</h3>
              <p className="text-gray-700">Connect, pitch, and secure the funding your startup needs to thrive.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/70 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 relative">
            <span className="relative">
              Platform Features
            </span>
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="p-8 bg-zinc-50 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-zinc-100">
              <h3 className="text-2xl font-semibold mb-6 pb-2 border-b border-zinc-200">For Entrepreneurs</h3>
              <ul className="space-y-6">
                <li className="flex items-start group">
                  <div className="mr-4 mt-1 w-6 h-6 bg-zinc-100 rounded-full flex items-center justify-center group-hover:bg-zinc-200 transition-colors duration-300">
                    <div className="w-2 h-2 bg-black rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold">AI Pitch Evaluation</h4>
                    <p className="text-gray-700">Get instant feedback on your pitch deck from our AI system.</p>
                  </div>
                </li>
                <li className="flex items-start group">
                  <div className="mr-4 mt-1 w-6 h-6 bg-zinc-100 rounded-full flex items-center justify-center group-hover:bg-zinc-200 transition-colors duration-300">
                    <div className="w-2 h-2 bg-black rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold">Business Plan Builder</h4>
                    <p className="text-gray-700">Create comprehensive business plans with AI assistance.</p>
                  </div>
                </li>
                <li className="flex items-start group">
                  <div className="mr-4 mt-1 w-6 h-6 bg-zinc-100 rounded-full flex items-center justify-center group-hover:bg-zinc-200 transition-colors duration-300">
                    <div className="w-2 h-2 bg-black rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold">Investor Matching</h4>
                    <p className="text-gray-700">Get matched with investors who align with your industry and goals.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="p-8 bg-zinc-50 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-zinc-100">
              <h3 className="text-2xl font-semibold mb-6 pb-2 border-b border-zinc-200">For Investors</h3>
              <ul className="space-y-6">
                <li className="flex items-start group">
                  <div className="mr-4 mt-1 w-6 h-6 bg-zinc-100 rounded-full flex items-center justify-center group-hover:bg-zinc-200 transition-colors duration-300">
                    <div className="w-2 h-2 bg-black rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold">Smart Deal Flow</h4>
                    <p className="text-gray-700">Access pre-screened startups that match your investment criteria.</p>
                  </div>
                </li>
                <li className="flex items-start group">
                  <div className="mr-4 mt-1 w-6 h-6 bg-zinc-100 rounded-full flex items-center justify-center group-hover:bg-zinc-200 transition-colors duration-300">
                    <div className="w-2 h-2 bg-black rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold">Due Diligence Tools</h4>
                    <p className="text-gray-700">Comprehensive analysis and verification tools at your fingertips.</p>
                  </div>
                </li>
                <li className="flex items-start group">
                  <div className="mr-4 mt-1 w-6 h-6 bg-zinc-100 rounded-full flex items-center justify-center group-hover:bg-zinc-200 transition-colors duration-300">
                    <div className="w-2 h-2 bg-black rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold">Portfolio Management</h4>
                    <p className="text-gray-700">Track and manage your startup investments in one place.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-white/70 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center px-4">
          <div className="p-12 rounded-lg shadow-md border border-zinc-100 bg-zinc-50">
            <h2 className="text-4xl font-bold mb-8">Ready to Transform Your Future?</h2>
            <p className="text-xl mb-8">Join THRIVE X today and be part of the next generation of startup success stories.</p>
            <Button className="transform transition-transform duration-300 hover:scale-105 shadow-lg">
              <Link to='/signup'>Join THRIVE X Now</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}