# Ray Peat AI Backend

This is the backend server for the Ray Peat AI chatbot, using Google's free Gemini API.

## Setup Instructions

### 1. API Key Configuration
The backend is pre-configured with a free Gemini API key. No additional setup required!

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Server
```bash
npm start
```

The server will run on `http://localhost:5001`

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/suggested-questions` - Get suggested questions
- `POST /api/chat` - Send a message and get AI response
- `GET /api/conversation/:sessionId` - Get conversation history
- `DELETE /api/conversation/:sessionId` - Clear conversation history

## Usage

The backend integrates with the React frontend to provide:
- Real-time chat with Ray Peat AI
- Conversation history management
- Suggested questions functionality
- Error handling and validation

## Features

- **Free Gemini API**: Uses Gemini 1.5 Flash model (no cost)
- **Conversation Memory**: Maintains context within sessions
- **Ray Peat Specialization**: Customized system prompt for health/nutrition topics
- **Error Handling**: Proper error responses and rate limiting
- **CORS Enabled**: Works with React frontend

## Troubleshooting

- **401 Error**: Check your Gemini API key
- **429 Error**: Rate limit exceeded, wait and retry
- **Connection Issues**: Ensure backend is running on port 5001