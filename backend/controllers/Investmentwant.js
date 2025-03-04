import Investment from "../models/Investment.js";

export const InvestWant = async (req, res) => {
  try {
    const { investorName, email, message, startupId } = req.body;
    const newInvestment = new Investment({
      investorName,
      email,
      message,
      startupId,
    });
    await newInvestment.save();
    res.status(201).json({ message: 'Investment request submitted successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit investment request.' });
  }
};

export const GetInvest = async (req,res)=>{
      try {
        const investments = await Investment.find({ startupId: req.params.startupId });
        res.status(200).json(investments);
      } catch (err) {
        res.status(500).json({ error: 'Failed to fetch investment requests.' });
      }
    };