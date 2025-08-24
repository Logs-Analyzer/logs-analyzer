
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs-extra');
const path = require('path');
const { OpenAI } = require('openai');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const app = express();
const port = process.env.PORT || 3001;

// Initialize OpenAI (only if API key is properly configured)
let openai = null;
if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your_openai_api_key_here') {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });
  console.log('OpenAI initialized successfully');
} else {
  console.log('OpenAI API key not configured - using fallback analysis only');
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('dist'));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');
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
    // Accept common document and log file types
    const allowedTypes = ['.log', '.txt', '.csv', '.json', '.xml', '.pdf', '.docx', '.doc', '.rtf', '.md'];
    const fileExt = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(fileExt)) {
      cb(null, true);
    } else {
      cb(new Error('File type not supported. Allowed types: ' + allowedTypes.join(', ')), false);
    }
  },
  limits: {
    fileSize: 50 * 1024 * 1024 // Increased to 50MB limit
  }
});

// File processing function to extract text from different file types
async function extractTextFromFile(filePath, originalName) {
  const fileExt = path.extname(originalName).toLowerCase();
  
  try {
    switch (fileExt) {
      case '.pdf':
        const pdfBuffer = await fs.readFile(filePath);
        const pdfData = await pdfParse(pdfBuffer);
        return pdfData.text;
      
      case '.docx':
        const docxBuffer = await fs.readFile(filePath);
        const docxResult = await mammoth.extractRawText({ buffer: docxBuffer });
        return docxResult.value;
      
      case '.json':
        const jsonContent = await fs.readFile(filePath, 'utf8');
        return JSON.stringify(JSON.parse(jsonContent), null, 2);
      
      case '.log':
      case '.txt':
      case '.csv':
      case '.xml':
      case '.md':
      case '.rtf':
      default:
        return await fs.readFile(filePath, 'utf8');
    }
  } catch (error) {
    console.error(`Error extracting text from ${originalName}:`, error);
    // Fallback to reading as plain text
    try {
      return await fs.readFile(filePath, 'utf8');
    } catch (fallbackError) {
      throw new Error(`Unable to read file ${originalName}: ${fallbackError.message}`);
    }
  }
}

// AI Analysis function
async function analyzeLogsWithAI(logContent) {
  // If OpenAI is not configured, use fallback analysis immediately
  if (!openai) {
    console.log('Using fallback analysis - OpenAI not configured');
    return generateFallbackAnalysis(logContent);
  }

  try {
    const prompt = `
    Analyze the following log/document data and identify security threats. For each threat found, provide:
    1. Threat Type (e.g., Malware, Phishing, DDoS, Data Exfiltration, Suspicious Login, etc.)
    2. Severity Level (Critical, High, Medium, Low)
    3. Source IP or identifier
    4. Target system
    5. Description of the threat
    6. Confidence level (0-100%)
    7. Timestamp
    8. Recommended action

    Content to analyze:
    ${logContent.substring(0, 4000)} // Limit content to avoid token limits

    Please respond in JSON format with an array of threats found. If no threats are detected, return an empty array.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a cybersecurity expert analyzing documents and logs for potential threats. Always respond with valid JSON."
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
    console.error('AI Analysis Error:', error.message);
    // Fallback analysis if AI fails
    return generateFallbackAnalysis(logContent);
  }
}

// Fallback analysis function
function generateFallbackAnalysis(logContent) {
  const threats = [];
  const lines = logContent.split('\n').filter(line => line.trim());
  
  // Enhanced pattern matching for common threats
  const patterns = [
    {
      regex: /failed.*login|authentication.*failed|invalid.*credentials|login.*attempt.*failed|login.*unsuccessful/i,
      type: 'Authentication Failure',
      severity: 'Medium',
      confidence: 85
    },
    {
      regex: /malware|virus|trojan|suspicious.*file|infected.*file|quarantine/i,
      type: 'Malware',
      severity: 'Critical',
      confidence: 95
    },
    {
      regex: /ddos|denial.*service|flood|rate.*limit.*exceeded/i,
      type: 'DDoS Attack',
      severity: 'High',
      confidence: 90
    },
    {
      regex: /unauthorized.*access|privilege.*escalation|access.*denied.*override|unauthorized.*root.*access/i,
      type: 'Unauthorized Access',
      severity: 'High',
      confidence: 88
    },
    {
      regex: /data.*exfiltration|unusual.*download|large.*transfer|suspicious.*upload/i,
      type: 'Data Exfiltration',
      severity: 'Critical',
      confidence: 92
    },
    {
      regex: /sql.*injection|xss|cross.*site|script.*injection/i,
      type: 'Code Injection',
      severity: 'High',
      confidence: 90
    },
    {
      regex: /brute.*force|multiple.*failed.*attempts|password.*attack/i,
      type: 'Brute Force Attack',
      severity: 'High',
      confidence: 85
    },
    {
      regex: /phishing|suspicious.*email|fake.*domain|spoofed/i,
      type: 'Phishing',
      severity: 'High',
      confidence: 88
    },
    {
      regex: /ransomware|encrypted.*files|payment.*demanded/i,
      type: 'Ransomware',
      severity: 'Critical',
      confidence: 95
    },
    {
      regex: /firewall.*breach|perimeter.*violation|network.*intrusion/i,
      type: 'Network Intrusion',
      severity: 'High',
      confidence: 87
    },
    {
      regex: /error|failed|exception|critical|alert/i,
      type: 'System Error',
      severity: 'Low',
      confidence: 30
    },
    {
      regex: /warning|warn/i,
      type: 'System Warning',
      severity: 'Low',
      confidence: 20
    },
    {
      regex: /info|debug|trace/i,
      type: 'Information',
      severity: 'Low',
      confidence: 10
    }
  ];

  // Process each line and create entries for ALL log lines
  lines.forEach((line, index) => {
    if (line.trim()) {
      let matchedPattern = null;
      let highestConfidence = 0;
      
      // Find the best matching pattern for this line
      patterns.forEach(pattern => {
        if (pattern.regex.test(line)) {
          if (pattern.confidence > highestConfidence) {
            matchedPattern = pattern;
            highestConfidence = pattern.confidence;
          }
        }
      });

      // If no pattern matched, still create an entry with 0% confidence
      if (!matchedPattern) {
        matchedPattern = {
          type: 'Normal Activity',
          severity: 'Low',
          confidence: 0
        };
      }

      // Create a threat entry for every log line
      threats.push({
        id: `THR-${String(index + 1).padStart(3, '0')}`,
        type: matchedPattern.type,
        severity: matchedPattern.severity,
        source: extractIP(line) || extractDomain(line) || 'Unknown',
        target: 'System',
        description: line.length > 200 ? line.substring(0, 200) + '...' : line,
        timestamp: extractTimestamp(line) || extractCustomTimestamp(line) || new Date().toISOString(),
        status: matchedPattern.confidence > 50 ? 'Active' : 'Informational',
        confidence: matchedPattern.confidence,
        recommendedAction: matchedPattern.confidence > 50 ? getRecommendedAction(matchedPattern.type) : 'No action required - monitoring'
      });
    }
  });

  console.log(`Processed ${lines.length} log entries, generated ${threats.length} threat assessments`);
  return threats;
}

// Helper functions
function extractIP(line) {
  const ipRegex = /\b(?:[0-9]{1,3}\.){3}[0-9]{1,3}\b/;
  const match = line.match(ipRegex);
  return match ? match[0] : null;
}

function extractDomain(line) {
  const domainRegex = /(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}/;
  const match = line.match(domainRegex);
  return match ? match[0] : null;
}

function extractTimestamp(line) {
  const timestampRegex = /\d{4}-\d{2}-\d{2}[T\s]\d{2}:\d{2}:\d{2}/;
  const match = line.match(timestampRegex);
  return match ? match[0] : null;
}

function extractCustomTimestamp(line) {
  // Extract timestamps like "2025-08-18 15:12:34" from your log format
  const customTimestampRegex = /(\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2})/;
  const match = line.match(customTimestampRegex);
  return match ? match[0] : null;
}

function getRecommendedAction(threatType) {
  const actions = {
    'Authentication Failure': 'Review login attempts and consider implementing account lockout policies',
    'Malware': 'Isolate affected systems and run comprehensive malware scan',
    'DDoS Attack': 'Implement rate limiting and contact your ISP for DDoS protection',
    'Unauthorized Access': 'Revoke access permissions and conduct security audit',
    'Data Exfiltration': 'Immediately block suspicious connections and review data access logs',
    'Code Injection': 'Patch vulnerable applications and implement input validation',
    'Brute Force Attack': 'Implement account lockout and consider IP blocking',
    'Phishing': 'Block malicious domains and educate users about phishing',
    'Ransomware': 'Immediately isolate infected systems and restore from clean backups',
    'Network Intrusion': 'Review firewall rules and conduct network security assessment'
  };
  return actions[threatType] || `Investigate ${threatType.toLowerCase()} activity`;
}

// Routes
app.post('/api/upload-logs', upload.array('logFiles', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const analysisResults = [];

    for (const file of req.files) {
      try {
        const logContent = await extractTextFromFile(file.path, file.originalname);
        const threats = await analyzeLogsWithAI(logContent);
        
        analysisResults.push({
          fileName: file.originalname,
          fileSize: file.size,
          fileType: path.extname(file.originalname).toLowerCase(),
          threatsFound: threats.filter(t => t.confidence > 50).length, // Only count high-confidence threats
          threats: threats,
          totalEntries: threats.length
        });
      } catch (error) {
        console.error(`Error processing ${file.originalname}:`, error);
        analysisResults.push({
          fileName: file.originalname,
          fileSize: file.size,
          fileType: path.extname(file.originalname).toLowerCase(),
          threatsFound: 0,
          threats: [],
          error: `Failed to process file: ${error.message}`
        });
      }

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
  res.json({ 
    status: 'OK', 
    message: 'Backend server is running',
    openaiConfigured: !!openai,
    supportedFileTypes: ['.log', '.txt', '.csv', '.json', '.xml', '.pdf', '.docx', '.doc', '.rtf', '.md'],
    maxFileSize: '50MB'
  });
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
