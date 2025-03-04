import PitchEvaluation from '../models/PitchEvaluation.js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import mongoose from 'mongoose';
import { marked } from 'marked';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// @desc    Evaluate pitch
// @route   POST /api/pitch-evaluation

export const evaluatePitch = async (req, res) => {
  const { pitchDeck } = req.body;
  
  if (!pitchDeck) {
    return res.status(400).json({ message: "PitchDeck idea is required" });
  }
  
  try {
    // Get the generative model
    const startupId = new mongoose.Types.ObjectId(req.user.id);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    
    // Define the prompt with explicit formatting guidance
    const prompt = `
    Generate a detailed business plan analysis for the following startup idea: ${pitchDeck}
    
    Please format your response in markdown with the following sections, ensuring adequate spacing between sections:
    
    # Executive Summary
    
    ## Strengths
    - [List strengths with bullet points]
    
    ## Weaknesses
    - [List weaknesses with bullet points]
    
    ## Opportunities
    - [List opportunities with bullet points]
    
    ## Threats
    - [List threats with bullet points]
    
    # Market Analysis
    
    # Financial Projections
    
    # Recommendations
    
    Make sure to use proper markdown formatting with headings, bullet points, and emphasis where appropriate.
    Add double line breaks between sections for better readability.
    `;
    
    const result = await model.generateContent({contents: [{ parts: [{ text: prompt }] }],});
    const response = await result.response;
    
    const evaluationResult = response.text();
    
    // Configure marked options for better spacing
    marked.setOptions({
      breaks: true,
      gfm: true
    });
    
    // Convert markdown to HTML
    const htmlContent = marked(evaluationResult);
    
    // Apply additional CSS for better spacing and readability
    const styledHtmlContent = `
      <style>
        .pitch-evaluation h1, .pitch-evaluation h2, .pitch-evaluation h3 {
          margin-top: 1.5em;
          margin-bottom: 0.8em;
        }
        .pitch-evaluation p {
          margin-bottom: 1em;
          line-height: 1.6;
        }
        .pitch-evaluation ul, .pitch-evaluation ol {
          margin-bottom: 1em;
          padding-left: 2em;
        }
        .pitch-evaluation li {
          margin-bottom: 0.5em;
        }
        .pitch-evaluation {
          max-width: 800px;
          margin: 0 auto;
          padding: 1em;
        }
      </style>
      <div class="pitch-evaluation">
        ${htmlContent}
      </div>
    `;
    
    // Create the evaluation in the database
    const pitchEvaluation = await PitchEvaluation.create({
      startupId,
      evaluationResult,
      formattedContent: styledHtmlContent
    });
    
    res.status(201).json({
      ...pitchEvaluation.toObject(),
      formattedContent: styledHtmlContent
    });
    
  } catch (err) {
    console.error('Error in evaluatePitch:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};