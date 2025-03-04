import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Input from "../components/Input";
import Button from "../components/Button";
import axiosInstance from "../api/axios";
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const token = localStorage.getItem("token");
const decodedToken = token ? jwtDecode(token) : null;
const userId = decodedToken?.id;

export default function CreateStartup() {
  const [name, setname] = useState("");
  const [investmentCapacity, setInvestmentCapacity] = useState("");
  const [riskLevel, setRiskLevel] = useState("");
  const [industryPreferences, setIndustryPreferences] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      setError("User not logged in.");
      return;
    }

    try {
      await axiosInstance.post("/investors", {
        userId,
        investmentCapacity,
        riskLevel,
        industryPreferences,
        name
      });

      toast.success('Investor Standards Created.', {
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
      navigate("/investordashboard");
    } catch (err) {
      console.log(err);
      console.error("Create startup error:", err);
      setError("Failed to create investor standards. Please try again.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex flex-col items-center justify-center flex-grow p-6 pt-24">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Post Investment Preferences
        </h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg"
        >
          <div className="space-y-5">
            <Input
              type="text"
              placeholder="Investor Name"
              value={name}
              onChange={(e) => setname(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <Input
              type="number"
              placeholder="Investment Capacity"
              value={investmentCapacity}
              onChange={(e) => setInvestmentCapacity(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <Input
              type="text"
              placeholder="Risk Level"
              value={riskLevel}
              onChange={(e) => setRiskLevel(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <Input
              type="text"
              placeholder="Industry Preference"
              value={industryPreferences}
              onChange={(e) => setIndustryPreferences(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <Button type="submit" className="w-full mt-6 py-3 text-lg">
            Create Investor Standards
          </Button>
        </form>
        <ToastContainer />
      </main>
    </div>
  );
}