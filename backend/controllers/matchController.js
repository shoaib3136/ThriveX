import Match from '../models/Match.js';
import Startup from '../models/Startup.js';
import Investor from '../models/Investor.js';

// @desc    Generate matches
// @route   POST /api/matches
export const generateMatches = async (req, res) => {
  try {
    const startups = await Startup.find();
    const investors = await Investor.find();

    const matches = [];
    startups.forEach((startup) => {
      investors.forEach((investor) => {
        if (investor.industryPreferences.includes(startup.industry)) { // Better matching
          let matchScore = 0;

          // Industry match bonus
          matchScore += 40;

          // Random slight variation to differentiate similar matches
          matchScore += Math.floor(Math.random() * 10);

          matches.push({
            startupId: startup._id,
            investorId: investor.userId,
            matchScore,
          });
        }
      });
    });

    await Match.insertMany(matches);
    console.log('Generated matches:', matches);
    console.log(investors.userId);
    res.status(201).json(matches);
  } catch (err) {
    console.error('Error generating matches:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};


// @desc    Get all matches
// @route   GET /api/matches
export const getMatches = async (req, res) => {
  try {
    const matches = await Match.find()
      .populate('startupId', 'name')
      .populate('investorId', 'name');
    console.log('Fetched matches:', matches); // Log fetched matches
    res.json(matches);
  } catch (err) {
    console.error('Error fetching matches:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};