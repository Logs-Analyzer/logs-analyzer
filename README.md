# AI Powered Security Logger

> AI-powered log analysis and threat detection system with intelligent remediation recommendations

## 🚀 Overview

AI Powered Security Logger is a full-stack cybersecurity application that combines React frontend with Express.js backend to provide intelligent log analysis, threat detection, and automated incident response. The system uses AI-powered analysis to identify security threats, assess their severity, and provide actionable remediation steps.

## 🎯 Key Capabilities

- **Intelligent Log Analysis** - Upload and analyze multiple file formats (.log, .txt, .csv, .json, .xml, .pdf, .docx, etc.)
- **AI-Powered Threat Detection** - Advanced pattern recognition with natural language processing
- **Real-time Dashboard** - Live monitoring with dynamic threat statistics and system health
- **Severity Classification** - Automatic categorization (Critical, High, Medium, Low) with confidence scoring
- **Remediation Guidance** - Step-by-step instructions for threat mitigation
- **Home Fixable Analysis** - Identifies which threats can be resolved without expert intervention
- **Incident Response** - Streamlined workflow management (currently under maintenance)
- **Multi-format Support** - Process logs, documents, and structured data files

## 🏗️ Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Client (Browser)                         │
│                 http://localhost:8081                        │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ HTTP Requests
                         │
┌────────────────────────▼────────────────────────────────────┐
│                  Frontend (Vite + React)                     │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Components: Dashboard, Log Analysis, Threat Analysis │  │
│  │  State Management: ThreatAnalysisContext             │  │
│  │  UI: shadcn/ui + Tailwind CSS                        │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ API Calls (/api/*)
                         │
┌────────────────────────▼────────────────────────────────────┐
│              Backend (Express.js + Node.js)                  │
│                 http://localhost:3001                        │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Routes:                                              │  │
│  │    POST /api/upload-logs  - File upload & analysis   │  │
│  │    POST /api/enhance-threat - AI threat enhancement  │  │
│  │    GET  /api/health - Server health check            │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  File Processing: PDF, DOCX, JSON, XML, etc.        │  │
│  │  Threat Analysis: Pattern matching & AI scoring     │  │
│  │  OpenAI Integration: GPT-3.5 for deep analysis      │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## ✨ Features

### 1. **Dashboard**
- Real-time threat statistics (Active Threats, Systems Affected, Threats Found, Home Fixable)
- Recent Security Alerts with severity badges
- System Health monitoring with visual indicators
- Dynamic data from actual threat analysis
- "Unavailable before threat analysis" state for new users

### 2. **Log Analysis**
- Drag-and-drop file upload interface
- Multi-file batch processing
- Real-time analysis progress tracking
- Threat distribution breakdown (Low, Medium, High, Critical)
- Visual threat preview with top 3 alerts
- One-click navigation to detailed threat analysis

### 3. **Threat Analysis**
- Comprehensive threat listing with filterable views
- Severity-based filtering and sorting
- AI-powered threat enhancement
- Detailed remediation steps for each threat
- Home fixable vs. Expert required classification
- Export and reporting capabilities

### 4. **Incident Response**
- Currently under maintenance
- Planned features: Automated response workflows, playbook execution

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite (Fast HMR, optimized builds)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui + Radix UI
- **Authentication**: Clerk (Secure user management)
- **Icons**: Lucide React
- **State Management**: React Context API
- **Routing**: React Router v6
- **Storage**: LocalStorage for persistence

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **File Upload**: Multer (Multi-format support)
- **AI Integration**: OpenAI API (GPT-3.5 Turbo)
- **PDF Processing**: pdf-parse
- **DOCX Processing**: mammoth
- **File System**: fs-extra
- **CORS**: Enabled for local development

## 🚀 Getting Started

### Prerequisites

- **Node.js** v16 or higher
- **npm** or yarn package manager
- **OpenAI API Key** (optional, fallback analysis available)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/TRIDYY/alert-tamer-ai.git
   cd alert-tamer-ai
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd server
   npm install
   cd ..
   ```

4. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   PORT=3001
   ```
   
   > **Note**: If you don't have an OpenAI API key, the system will automatically use fallback analysis with pattern matching.

### Running the Application

You need to run **both** frontend and backend servers:

#### Option 1: Run in Separate Terminals (Recommended)

**Terminal 1 - Backend Server:**
```bash
cd server
node index.js
```
Output: `Server running on port 3001`

**Terminal 2 - Frontend Server:**
```bash
npm run dev
```
Output: `Local: http://localhost:8081/`

#### Option 2: Create a Start Script

Add to `package.json`:
```json
"scripts": {
  "dev:frontend": "vite",
  "dev:backend": "cd server && node index.js",
  "dev:full": "concurrently \"npm run dev:frontend\" \"npm run dev:backend\""
}
```

Then run:
```bash
npm install -D concurrently
npm run dev:full
```

### Accessing the Application

- **Frontend**: http://localhost:8081
- **Backend API**: http://localhost:3001
- **Health Check**: http://localhost:3001/api/health

## 📦 Project Structure

```
alert-tamer-ai/
├── src/                          # Frontend source code
│   ├── components/               # Reusable UI components
│   │   ├── layout/              # Layout components
│   │   │   ├── Header.tsx       # Navigation header
│   │   │   ├── Footer.tsx       # Footer component
│   │   │   └── Layout.tsx       # Main layout wrapper
│   │   └── ui/                  # shadcn/ui components
│   │       ├── button.tsx       # Button component
│   │       ├── card.tsx         # Card component
│   │       ├── badge.tsx        # Badge component
│   │       ├── alert.tsx        # Alert component
│   │       ├── toast.tsx        # Toast notifications
│   │       └── ...              # Other UI components
│   ├── contexts/                # React Context providers
│   │   └── ThreatAnalysisContext.tsx  # Threat data management
│   ├── hooks/                   # Custom React hooks
│   │   ├── use-mobile.tsx       # Mobile detection hook
│   │   └── use-toast.ts         # Toast notification hook
│   ├── lib/                     # Utility functions
│   │   └── utils.ts             # Helper utilities
│   ├── pages/                   # Page components (routes)
│   │   ├── Dashboard.tsx        # Main dashboard page
│   │   ├── LogAnalysis.tsx      # File upload & analysis
│   │   ├── ThreatAnalysis.tsx   # Detailed threat view
│   │   ├── IncidentResponse.tsx # Maintenance page
│   │   ├── Reports.tsx          # Reports page
│   │   ├── Settings.tsx         # Settings page
│   │   ├── Home.tsx             # Landing page
│   │   ├── Index.tsx            # Route index
│   │   └── NotFound.tsx         # 404 page
│   ├── App.tsx                  # Main app component
│   ├── main.tsx                 # Application entry point
│   └── index.css                # Global styles
│
├── server/                      # Backend source code
│   ├── index.js                 # Express server entry point
│   ├── uploads/                 # Temporary file storage (auto-created)
│   └── package.json             # Backend dependencies
│
├── public/                      # Static assets
│   ├── favicon.ico              # App favicon
│   ├── placeholder.svg          # Placeholder images
│   └── robots.txt               # SEO robots file
│
├── index.html                   # HTML entry point
├── package.json                 # Frontend dependencies
├── vite.config.ts              # Vite configuration
├── tailwind.config.ts          # Tailwind CSS config
├── tsconfig.json               # TypeScript config
├── components.json             # shadcn/ui config
└── README.md                   # This file
```

## 🔄 Complete Workflow

### 1. **User Uploads Log Files**
```
User → Log Analysis Page → Select Files → Click "Analyze Files"
```

### 2. **Frontend Processing**
```javascript
// LogAnalysis.tsx
const formData = new FormData()
selectedFiles.forEach(file => formData.append('logFiles', file))

const response = await fetch('/api/upload-logs', {
  method: 'POST',
  body: formData
})
```

### 3. **Backend Processing**
```javascript
// server/index.js
app.post('/api/upload-logs', upload.array('logFiles', 10), async (req, res) => {
  // 1. Extract text from files (PDF, DOCX, JSON, etc.)
  // 2. Analyze with AI or fallback pattern matching
  // 3. Generate threat objects with severity, confidence, etc.
  // 4. Return analysis results
})
```

### 4. **Threat Analysis Flow**
```
Backend Analysis
    ├─ OpenAI GPT-3.5 (if API key available)
    │   └─ Natural language threat assessment
    │
    └─ Fallback Analysis (pattern matching)
        ├─ Signature-based detection
        ├─ Confidence scoring
        ├─ Severity classification
        └─ Remediation recommendations
```

### 5. **Data Storage & Display**
```
Analysis Results
    └─ Stored in ThreatAnalysisContext
        └─ Persisted to LocalStorage
            └─ Displayed across:
                ├─ Dashboard (statistics)
                ├─ Log Analysis (preview)
                └─ Threat Analysis (full details)
```

### 6. **AI Enhancement (Optional)**
```
User clicks "Re-analyze with AI"
    └─ POST /api/enhance-threat for each threat
        └─ GPT-3.5 provides:
            ├─ isHomeFixable (true/false)
            ├─ requiresExpert (true/false)
            ├─ targetedPorts []
            ├─ remediationSteps []
            ├─ riskLevel
            ├─ businessImpact
            └─ technicalDetails
```

## 📡 API Reference

### POST `/api/upload-logs`
Upload and analyze log files

**Request:**
- Content-Type: `multipart/form-data`
- Field: `logFiles` (array of files)
- Max files: 10
- Max size: 50MB per file

**Supported File Types:**
`.log`, `.txt`, `.csv`, `.json`, `.xml`, `.pdf`, `.docx`, `.doc`, `.rtf`, `.md`

**Response:**
```json
{
  "success": true,
  "message": "Log files analyzed successfully",
  "results": [
    {
      "fileName": "security.log",
      "fileSize": 12345,
      "fileType": ".log",
      "threatsFound": 15,
      "threats": [
        {
          "id": "THR-001",
          "type": "Malware Detection",
          "severity": "Critical",
          "source": "192.168.1.100",
          "target": "System",
          "description": "Malicious process detected",
          "timestamp": "2025-11-03T10:30:00Z",
          "status": "Active",
          "confidence": 87,
          "recommendedAction": "Quarantine immediately..."
        }
      ]
    }
  ]
}
```

### POST `/api/enhance-threat`
Get AI-powered threat enhancement

**Request:**
```json
{
  "threat": {
    "type": "Malware Detection",
    "severity": "Critical",
    "description": "...",
    "source": "192.168.1.100",
    "target": "System",
    "confidence": 87
  }
}
```

**Response:**
```json
{
  "success": true,
  "detailedAnalysis": {
    "isHomeFixable": false,
    "requiresExpert": true,
    "targetedPorts": ["443", "80", "445"],
    "remediationSteps": [
      "Immediately isolate the affected system",
      "Run full antivirus scan",
      "..."
    ],
    "riskLevel": "Critical",
    "businessImpact": "High",
    "technicalDetails": "Malware detected through signature..."
  }
}
```

### GET `/api/health`
Check server health

**Response:**
```json
{
  "status": "OK",
  "message": "Backend server is running",
  "openaiConfigured": true,
  "supportedFileTypes": [".log", ".txt", "..."],
  "maxFileSize": "50MB"
}
```

## 🔧 Configuration

### Vite Configuration (`vite.config.ts`)
```typescript
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
  }
})
```

### Tailwind Configuration (`tailwind.config.ts`)
Custom theme colors for cybersecurity UI:
- `cyber-danger`: Red tones for critical threats
- `cyber-warning`: Orange/yellow for warnings
- `cyber-secondary`: Green for safe/resolved items

## 🎨 UI Components

### Custom Components
- **CyberBackground**: Animated background with cyber-themed particles
- **ThreatCard**: Individual threat display with severity indicators
- **SystemHealthCard**: Real-time system status monitoring
- **FileUploadZone**: Drag-and-drop file upload interface

### shadcn/ui Integration
All UI components are built with:
- Accessibility (ARIA labels, keyboard navigation)
- Dark mode support
- Responsive design
- Consistent styling

## 🔐 Security Features

### Authentication
- Clerk integration for secure user management
- Protected routes (Dashboard, Analysis pages)
- Session management
- Redirect to sign-in for unauthenticated users

### Data Protection
- Client-side file validation
- Server-side file type checking
- Size limits (50MB per file)
- Temporary file cleanup after processing
- LocalStorage encryption considerations

### Threat Analysis Security
- Confidence scoring (0-100%)
- Pattern-based detection (no false negatives)
- Multiple severity levels
- Actionable remediation steps

## 📊 Threat Detection Engine

### Pattern Matching System
The backend uses advanced pattern recognition:

1. **Signature Database**: 15+ threat categories
   - System Tampering
   - Malware Detection
   - Unauthorized Access
   - DDoS/Network Attacks
   - Brute Force Attacks
   - Code Injection
   - Data Exfiltration
   - Configuration Issues
   - System Errors
   - And more...

2. **Confidence Scoring Algorithm**
   - Pattern strength analysis
   - Keyword density
   - Critical indicators
   - Structured logging detection
   - Contextual analysis
   - Natural variation for realistic scores

3. **Severity Classification**
   - **Critical** (75-98%): Immediate action required
   - **High** (60-95%): Rapid response needed
   - **Medium** (30-85%): Planned response
   - **Low** (5-70%): Routine monitoring

## 🚀 Deployment

### Build for Production

**Frontend:**
```bash
npm run build
```
Output: `dist/` directory

**Backend:**
The backend runs directly with Node.js:
```bash
cd server
node index.js
```

### Environment Variables (Production)

Create `.env.production`:
```env
OPENAI_API_KEY=your_production_key
PORT=3001
NODE_ENV=production
```

### Deploy to Cloud Platforms

#### Vercel (Frontend)
```bash
npm i -g vercel
vercel --prod
```

#### Heroku (Backend)
```bash
heroku create your-app-name
git subtree push --prefix server heroku main
```

#### Docker (Full Stack)
Create `docker-compose.yml`:
```yaml
version: '3'
services:
  frontend:
    build: .
    ports:
      - "8081:8081"
  backend:
    build: ./server
    ports:
      - "3001:3001"
    environment:
      - OPENAI_API_KEY=${OPENAI_API_KEY}
```

## 🧪 Testing

### Manual Testing Workflow
1. Start both servers
2. Navigate to Log Analysis
3. Upload sample log file
4. Verify threat detection
5. Check Dashboard updates
6. Test AI enhancement
7. Verify data persistence (refresh page)

### Sample Log Files
Create test files with various threat patterns:

**test-critical.log:**
```
2025-11-03 10:30:15 [CRITICAL] - Malware detected: trojan.exe
2025-11-03 10:31:22 [ERROR] - Unauthorized root access attempt
```

**test-normal.log:**
```
2025-11-03 10:30:15 [INFO] - User login successful
2025-11-03 10:31:22 [INFO] - Application started
```

## 📝 Available Scripts

### Frontend
```bash
npm run dev          # Start Vite dev server (port 8081)
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Backend
```bash
node server/index.js # Start Express server (port 3001)
```

## 🐛 Troubleshooting

### Common Issues

**1. "Failed to analyze log files" error**
- ✅ Ensure backend server is running on port 3001
- ✅ Check `http://localhost:3001/api/health`
- ✅ Verify file types are supported
- ✅ Check file size (max 50MB)

**2. "Dashboard shows N/A"**
- ✅ Upload and analyze log files first
- ✅ Check browser console for errors
- ✅ Verify LocalStorage is enabled
- ✅ Try hard refresh (Cmd+Shift+R)

**3. "AI enhancement not working"**
- ✅ OpenAI API key in `.env` file
- ✅ Check API key validity
- ✅ System falls back to pattern matching automatically

**4. Port conflicts**
- ✅ Frontend: Change in `vite.config.ts`
- ✅ Backend: Change PORT in `.env`

## 🤝 Contributing

We welcome contributions! Here's how:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
   - Follow existing code style
   - Add comments for complex logic
   - Test thoroughly
4. **Commit your changes**
   ```bash
   git commit -m "Add amazing feature"
   ```
5. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**
   - Describe your changes
   - Reference any related issues
   - Add screenshots if UI changes

### Development Guidelines
- Use TypeScript for type safety
- Follow React best practices
- Keep components modular and reusable
- Write meaningful commit messages
- Update documentation for new features

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

## 👨‍💻 Contributors

**Core Team:**
- **TRIDYY** - [@TRIDYY](https://github.com/TRIDYY)
- **ishakshamsaini** - [@ishakshamsaini](https://github.com/ishakshamsaini)
- **Ssm158** - [@Ssm158](https://github.com/Ssm158)
- **JinRe-uX** - [@JinRe-uX](https://github.com/JinRe-uX)
- **Pranav071-a** - [@Pranav071-a](https://github.com/Pranav071-a)
- **aTwatwithaThinkPad** - [@aTwatwithaThinkPad](https://github.com/aTwatwithaThinkPad)

## 🙏 Acknowledgments

- **Vite** - Lightning-fast build tool
- **shadcn/ui** - Beautiful, accessible UI components
- **Clerk** - Seamless authentication
- **Lucide** - Consistent icon system
- **OpenAI** - AI-powered analysis
- **Tailwind CSS** - Utility-first styling
- **React** - Component-based architecture

## 📞 Support

For issues, questions, or suggestions:
- 🐛 [Report a Bug](https://github.com/TRIDYY/alert-tamer-ai/issues)
- 💡 [Request a Feature](https://github.com/TRIDYY/alert-tamer-ai/issues)
- 📧 Contact the team via GitHub

---

**Built with ❤️ for cybersecurity professionals and enthusiasts**
