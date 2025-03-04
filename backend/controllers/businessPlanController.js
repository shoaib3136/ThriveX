import BusinessPlan from '../models/BusinessPlan.js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import mongoose from 'mongoose';
import { marked } from 'marked';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Generate a business plan using Gemini API
 * @route POST /api/business-plans
 */
export const generateBusinessPlan = async (req, res) => {
  const { startupDetails } = req.body;

  if (!startupDetails) {
    return res.status(400).json({ message: "Startup idea is required" });
  }

  try {
    const startupId = new mongoose.Types.ObjectId(req.user.id);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
      Generate a structured business plan for the following startup idea:
      
      ${startupDetails}
      
      Format the business plan using markdown with these sections:
      ## Executive Summary
      ## Company Description
      ## Market Analysis
      ## Organization & Management
      ## Service or Product Line
      ## Marketing & Sales Strategy
      ## Financial Projections
      ## Funding Requirements (if applicable)
      
      Ensure clarity with bullet points, numbered lists, and professional writing.
    `;

    // Generate content
    const result = await model.generateContent({ contents: [{ parts: [{ text: prompt }] }] });
    const response = result.response;
    const planContent = response.text();

    marked.setOptions({
      breaks: true,
      gfm: true
    });
    
    
    // Convert markdown to HTML
    const htmlContent = marked(planContent);

    // Save to DB
    const businessPlan = await BusinessPlan.create({
      startupId,
      planContent,
      formattedContent: htmlContent
    });

    res.status(201).json({ ...businessPlan.toObject(), formattedContent: htmlContent });
  } catch (err) {
    console.error('Error in generateBusinessPlan:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};
