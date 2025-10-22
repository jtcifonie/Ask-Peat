const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://ask-peat-frontend.onrender.com', 'http://localhost:3000']
    : true,
  credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());

// In-memory storage for conversation history (simple implementation)
const conversations = new Map();

// Gemini API configuration
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyBDq1GLQdgaTvJPsKSwxCKV6BMfY66l-Ww';
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY, {
  apiVersion: 'v1'
});

// System prompt for Ray Peat AI
const SYSTEM_PROMPT = `You are a knowledgeable assistant about Dr. Ray Peat's research on metabolism, nutrition, and health. 

Provide concise, helpful responses about:
- Thyroid function and metabolism
- Nutrition and dietary recommendations
- Stress and its effects on health
- Hormonal balance
- Cellular energy production

Keep responses brief and focused. Avoid lengthy disclaimers about being an AI. Just provide the information directly.`;

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Ray Peat AI Backend is running' });
});

// Get suggested questions
app.get('/api/suggested-questions', (req, res) => {
  const questions = [
    "What did Ray Peat say about metabolism?",
    "Tell me about the role of thyroid function",
    "What foods did Ray Peat recommend?",
    "Explain Ray Peat's views on stress"
  ];
  res.json({ questions });
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, sessionId = 'default' } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Get or create conversation history
    if (!conversations.has(sessionId)) {
      conversations.set(sessionId, []);
    }
    
    const conversationHistory = conversations.get(sessionId);
    
    // Get Gemini model - use the correct model name from Google's docs
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    // Build conversation context
    let conversationContext = SYSTEM_PROMPT + '\n\n';
    
    // Add recent conversation history
    if (conversationHistory.length > 0) {
      conversationContext += 'Previous conversation:\n';
      conversationHistory.slice(-6).forEach(msg => {
        conversationContext += `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}\n`;
      });
      conversationContext += '\n';
    }
    
    conversationContext += `User: ${message.trim()}`;

    // Generate response using Gemini
    const result = await model.generateContent(conversationContext);
    const aiResponse = result.response.text();

    // Store conversation
    conversationHistory.push({ role: 'user', content: message.trim() });
    conversationHistory.push({ role: 'assistant', content: aiResponse });

    // Keep only last 10 exchanges to manage memory
    if (conversationHistory.length > 20) {
      conversationHistory.splice(0, conversationHistory.length - 20);
    }

    res.json({
      response: aiResponse,
      sessionId: sessionId
    });

  } catch (error) {
    console.error('Chat error:', error.message);
    
    if (error.message.includes('API key')) {
      res.status(401).json({ 
        error: 'Invalid Gemini API key. Please check your configuration.' 
      });
    } else if (error.message.includes('quota')) {
      res.status(429).json({ 
        error: 'Rate limit exceeded. Please try again later.' 
      });
    } else {
      res.status(500).json({ 
        error: 'Failed to get response from AI service: ' + error.message
      });
    }
  }
});

// Get conversation history
app.get('/api/conversation/:sessionId', (req, res) => {
  const { sessionId } = req.params;
  const conversation = conversations.get(sessionId) || [];
  res.json({ conversation });
});

// Clear conversation history
app.delete('/api/conversation/:sessionId', (req, res) => {
  const { sessionId } = req.params;
  conversations.delete(sessionId);
  res.json({ message: 'Conversation cleared' });
});

// Start server
app.listen(PORT, async () => {
  console.log(`🚀 Ray Peat AI Backend running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🤖 Using Google Gemini API`);
  
  if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your_gemini_api_key_here') {
    console.log('⚠️  WARNING: GEMINI_API_KEY not set. Using default API key.');
  } else {
    console.log('✅ Gemini API key configured');
  }

  // Test the API connection and list available models
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    console.log('✅ Gemini model initialized successfully');
  } catch (error) {
    console.log('❌ Error initializing Gemini model:', error.message);
    console.log('💡 Trying alternative model names...');
    
    // Try different model names
    const modelNames = ['gemini-pro', 'gemini-1.5-pro', 'gemini-1.0-pro'];
    for (const modelName of modelNames) {
      try {
        const testModel = genAI.getGenerativeModel({ model: modelName });
        console.log(`✅ Found working model: ${modelName}`);
        break;
      } catch (e) {
        console.log(`❌ Model ${modelName} not available: ${e.message}`);
      }
    }
  }
});

module.exports = app;
