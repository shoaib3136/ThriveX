import Startup from '../models/Startup.js';


// @desc    Create a new startup
// @route   POST /api/startups
export const createStartup = async (req, res) => {
  const { name, description, industry, fundingNeeds, pitchDeck} = req.body;

  const userId = req.user.id;
  // Validate input
  if (!name || !description || !industry || !fundingNeeds || !pitchDeck||!userId) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {

    console.log('Logged-in user:', req.user)



    // Create the startup with the logged-in user's ID
    const startup = await Startup.create({
      name,
      description,
      industry,
      fundingNeeds,
      pitchDeck,
      userId // Ensure this is set correctly
    });

    res.status(201).json(startup);
  } catch (err) {
    console.log(err);
    console.error('Error in createStartup:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get all startups
// @route   GET /api/startups
export const getStartups = async (req, res) => {
  try {
    const startups = await Startup.find();
    res.json(startups);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};





// @desc    Get a specific startup
// @route   GET /api/startups/:id
export const getStartupById = async (req, res) => {
  try {
    const startup = await Startup.findById(req.params.id);
    if (!startup) {
      return res.status(404).json({ message: 'Startup not found' });
    }
    res.json(startup);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};