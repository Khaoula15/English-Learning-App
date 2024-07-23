require('dotenv').config();
const express = require('express');
const { OpenAI } = require('openai');
const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const fallbackResponses = {
  greeting: "Hello! How can I assist you today?",
  farewell: "Goodbye! Have a great day!",
  default: "I'm sorry, I'm having trouble understanding. Could you please rephrase your question?"
};

function getFallbackResponse(message) {
  if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
    return fallbackResponses.greeting;
  } else if (message.toLowerCase().includes('bye') || message.toLowerCase().includes('goodbye')) {
    return fallbackResponses.farewell;
  }
  return fallbackResponses.default;
}

router.post('/chat', async (req, res) => {
  console.log('Received chat request:', req.body);
  try {
    const { message } = req.body;
    if (!message) {
      throw new Error('No message provided');
    }

    console.log('Sending message to OpenAI:', message);
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }],
    });

    console.log('Received response from OpenAI:', response.choices[0].message.content);
    res.json({ response: response.choices[0].message.content });
  } catch (error) {
    console.error('Error interacting with OpenAI API:', error);
    
    // Use fallback response
    const fallbackResponse = getFallbackResponse(req.body.message);
    res.json({ response: fallbackResponse, fallback: true });
  }
});

module.exports = router;
