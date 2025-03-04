import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PitchEvaluation from './pages/PitchEvaluation';
import Matchmaking from './pages/Matchmaking';
import BusinessPlan from './pages/BusinessPlan';
import InvestorDashboard from './pages/InvestorDashboard';
import EntrepreneurDashboard from './pages/EntrepreneurDashboard';
import CreateStartup from './pages/CreateStartup';
import InvestorPreference from './pages/InvestorPreference'
import SubscriptionPage from './pages/SubscriptionPage';
import InvestmentForm from './pages/InvestmentForm';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/investordashboard" element={<InvestorDashboard />} />
        <Route path="/entrepreneurdashboard" element={<EntrepreneurDashboard />} />
        <Route path="/pitch-evaluation" element={<PitchEvaluation />} />
        <Route path="/matchmaking" element={<Matchmaking />} />
        <Route path="/business-plan" element={<BusinessPlan />} />
        <Route path="/createstartup" element={<CreateStartup />} />
        <Route path="/investorpreference" element={<InvestorPreference/>} />
        <Route path="/sub" element={<SubscriptionPage/>} />
        <Route path="/invest/:startupId" element={<InvestmentForm />} />
      
      </Routes>
    </Router>
  );
}