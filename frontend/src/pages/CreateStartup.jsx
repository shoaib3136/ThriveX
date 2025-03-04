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
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [industry, setIndustry] = useState("");
  const [fundingNeeds, setFundingNeeds] = useState("");
  const [pitchdeck, setPitchdeck] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/startups", {
        name,
        description,
        industry,
        fundingNeeds,
        pitchDeck: pitchdeck,
        userId
      });
      toast.success("Startup created successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/entrepreneurdashboard");
    } catch (err) {
      console.log(error);
      setError("Failed to create startup. Please try again.");
      console.error("Create startup error:", err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex flex-col items-center justify-center flex-grow p-6 pt-24">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Post Your Startup Idea
        </h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg"
        >
          <div className="space-y-5">
            <Input
              type="text"
              placeholder="Startup Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 min-h-[120px] resize-none"
            />
            <Input
              type="text"
              placeholder="Industry"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <Input
              type="number"
              placeholder="Funding Needs (in USD)"
              value={fundingNeeds}
              onChange={(e) => setFundingNeeds(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <Input
              type="text"
              placeholder="Pitch Deck Link"
              value={pitchdeck}
              onChange={(e) => setPitchdeck(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <Button type="submit" className="w-full mt-6 py-3 text-lg">
            Create Startup
          </Button>
        </form>
        <ToastContainer />
      </main>
    </div>
  );
}