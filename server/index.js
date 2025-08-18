
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs-extra');
const path = require('path');
const { OpenAI } = require('openai');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('dist'));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Accept log files and text files
    const allowedTypes = ['.log', '.txt', '.csv'];
    const fileExt = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(fileExt)) {
      cb(null, true);
    } else {
      cb(new Error('Only log, txt, and csv files are allowed'), false);
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// AI Analysis function
async function analyzeLogsWithAI(logContent) {
  try {
    const prompt = `
    Analyze the following log data and identify security threats. For each threat found, provide:
    1. Threat Type (e.g., Malware, Phishing, DDoS, Data Exfiltration, Suspicious Login, etc.)
    2. Severity Level (Critical, High, Medium, Low)
    3. Source IP or identifier
    4. Target system
    5. Description of the threat
    6. Confidence level (0-100%)
    7. Timestamp
    8. Recommended action

    Log data:
    ${logContent}

    Please respond in JSON format with an array of threats found. If no threats are detected, return an empty array.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a cybersecurity expert analyzing log files for potential threats. Always respond with valid JSON."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 2000,
      temperature: 0.1
    });

    const analysis = response.choices[0].message.content;
    return JSON.parse(analysis);
  } catch (error) {
    console.error('AI Analysis Error:', error);
    // Fallback analysis if AI fails
    return generateFallbackAnalysis(logContent);
  }
}

// Fallback analysis function
function generateFallbackAnalysis(logContent) {
  const threats = [];
  const lines = logContent.split('\n').filter(line => line.trim());
  
  // Simple pattern matching for common threats
  const patterns = [
    {
      regex: /failed.*login|authentication.*failed|invalid.*credentials/i,
      type: 'Authentication Failure',
      severity: 'Medium'
    },
    {
      regex: /malware|virus|trojan|suspicious.*file/i,
      type: 'Malware',
      severity: 'Critical'
    },
    {
      regex: /ddos|denial.*service|flood/i,
      type: 'DDoS',
      severity: 'High'
    },
    {
      regex: /unauthorized.*access|privilege.*escalation/i,
      type: 'Unauthorized Access',
      severity: 'High'
    },
    {
      regex: /data.*exfiltration|unusual.*download|large.*transfer/i,
      type: 'Data Exfiltration',
      severity: 'Critical'
    }
  ];

  lines.forEach((line, index) => {
    patterns.forEach(pattern => {
      if (pattern.regex.test(line)) {
        threats.push({
          id: `THR-${String(threats.length + 1).padStart(3, '0')}`,
          type: pattern.type,
          severity: pattern.severity,
          source: extractIP(line) || 'Unknown',
          target: 'System',
          description: line.substring(0, 100) + '...',
          timestamp: extractTimestamp(line) || new Date().toISOString(),
          status: 'Active',
          confidence: 75,
          recommendedAction: `Investigate ${pattern.type.toLowerCase()} activity`
        });
      }
    });
  });

  return threats;
}

// Helper functions
function extractIP(line) {
  const ipRegex = /\b(?:[0-9]{1,3}\.){3}[0-9]{1,3}\b/;
  const match = line.match(ipRegex);
  return match ? match[0] : null;
}

function extractTimestamp(line) {
  const timestampRegex = /\d{4}-\d{2}-\d{2}[T\s]\d{2}:\d{2}:\d{2}/;
  const match = line.match(timestampRegex);
  return match ? match[0] : null;
}

// Routes
app.post('/api/upload-logs', upload.array('logFiles', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const analysisResults = [];

    for (const file of req.files) {
      const logContent = await fs.readFile(file.path, 'utf8');
      const threats = await analyzeLogsWithAI(logContent);
      
      analysisResults.push({
        fileName: file.originalname,
        fileSize: file.size,
        threatsFound: threats.length,
        threats: threats
      });

      // Clean up uploaded file
      await fs.remove(file.path);
    }

    res.json({
      success: true,
      message: 'Log files analyzed successfully',
      results: analysisResults
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Failed to analyze log files' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend server is running' });
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
