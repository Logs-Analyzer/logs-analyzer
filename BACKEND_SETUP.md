# Alert Tamer AI - Setup Instructions

## Overview
Alert Tamer AI is a security log analysis tool that uses AI to identify potential threats in log files. The application consists of a React frontend and a Node.js/Express backend.

## Prerequisites
- Node.js (v16 or higher)
- npm or bun package manager
- OpenAI API key (for AI analysis features)

## Installation

### 1. Clone and install dependencies
```bash
# Clone the repository
git clone <your-repo-url>
cd alert-tamer-ai

# Install main dependencies
npm install

# Install server dependencies
cd server && npm install && cd ..
```

### 2. Environment Configuration
Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

Edit the `.env` file and add your OpenAI API key:
```env
OPENAI_API_KEY=your_actual_openai_api_key_here
PORT=3001
```

## Running the Application

### Development Mode (Frontend + Backend)
```bash
npm run dev:full
```
This will start both the React frontend (http://localhost:8081) and the Express backend (http://localhost:3001).

### Production Mode
```bash
# Build the frontend
npm run build

# Start the production server
npm start
```

### Running Components Separately

#### Frontend only:
```bash
npm run dev
```

#### Backend only:
```bash
npm run server
```

## API Endpoints

### Health Check
- **GET** `/api/health`
- Returns server status

### Log Analysis
- **POST** `/api/upload-logs`
- Accepts multipart form data with log files
- Supported file types: `.log`, `.txt`, `.csv`
- Maximum file size: 10MB per file
- Returns AI-powered threat analysis

## Features

### 🔍 **Log File Analysis**
- Upload multiple log files for analysis
- AI-powered threat detection using OpenAI GPT
- Fallback analysis using pattern matching
- Support for .log, .txt, and .csv files

### 🚨 **Threat Detection**
- Authentication failures
- Malware signatures  
- DDoS attacks
- Unauthorized access attempts
- Data exfiltration patterns

### 📊 **Analysis Results**
- Threat categorization and severity levels
- Confidence scoring
- Source IP identification
- Recommended actions
- Detailed threat descriptions

## Project Structure
```
├── src/                    # Frontend React application
├── server/                 # Backend Express server
│   ├── index.js           # Main server file
│   └── package.json       # Server dependencies
├── public/                # Static assets
├── .env                   # Environment variables
├── .env.example          # Environment template
├── package.json          # Main project dependencies
└── vite.config.ts        # Frontend build configuration
```

## Configuration

### Frontend (Vite)
- Port: 8081 (configurable in `vite.config.ts`)
- API proxy configured to forward `/api/*` requests to backend

### Backend (Express)
- Port: 3001 (configurable in `.env`)
- CORS enabled for frontend communication
- Multer configured for file uploads

## Security Features
- File type validation
- File size limits
- CORS protection
- Input sanitization
- Temporary file cleanup

## Troubleshooting

### Port Conflicts
If you encounter port conflicts:
1. Check what's using the ports: `lsof -ti:3001` or `lsof -ti:8081`
2. Kill conflicting processes: `kill -9 <process_id>`
3. Or change ports in `.env` and `vite.config.ts`

### API Key Issues
- Ensure your OpenAI API key is valid
- Check that the `.env` file is in the root directory
- Verify the key has sufficient credits/permissions

### File Upload Issues
- Ensure uploaded files are .log, .txt, or .csv format
- Check file size is under 10MB
- Verify server has write permissions for uploads directory

## Development

### Adding New Threat Patterns
Edit the `patterns` array in `server/index.js` to add new threat detection rules:

```javascript
const patterns = [
  {
    regex: /your-pattern-here/i,
    type: 'Threat Type',
    severity: 'High'
  }
];
```

### Modifying API Endpoints
Add new routes in `server/index.js` following the existing pattern.

## Production Deployment

### Environment Variables
Set these in your production environment:
- `OPENAI_API_KEY`: Your OpenAI API key
- `PORT`: Server port (default: 3001)
- `NODE_ENV`: Set to "production"

### Build Process
```bash
npm run build
npm start
```

## Support
For issues or questions, please check the logs and ensure all dependencies are properly installed.
