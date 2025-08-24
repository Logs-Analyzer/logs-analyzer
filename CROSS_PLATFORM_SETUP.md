# 🔧 Cross-Platform Setup Guide - Mac & Windows

## 🚨 **Common Issues When Sharing Between Mac & Windows**

### 1. **Node.js Version Differences**
**Problem**: Different Node.js versions can cause compatibility issues.

**Solution**:
```bash
# Check Node.js version (should be 16+ for both)
node --version
npm --version

# If different versions, install Node.js 18+ on both systems
```

### 2. **Package Installation Issues**
**Problem**: Different package managers or missing dependencies.

**Solutions**:
```bash
# Clear npm cache and reinstall (run on Windows)
npm cache clean --force
rm -rf node_modules package-lock.json
npm install

# Install server dependencies
cd server
rm -rf node_modules package-lock.json  
npm install
cd ..
```

### 3. **File Path Issues**
**✅ Fixed**: Updated server code to use `path.join()` for cross-platform compatibility.

### 4. **Line Ending Differences**
**Problem**: Git converts line endings differently on Windows (CRLF) vs Mac (LF).

**Solution**: Add to `.gitattributes`:
```
* text=auto
*.js text eol=lf
*.json text eol=lf
*.md text eol=lf
```

### 5. **Environment Variables**
**Problem**: `.env` file might not be copied or have wrong format.

**Solution**:
```bash
# Ensure .env file exists in root directory
cp .env.example .env

# Edit .env with proper values
OPENAI_API_KEY=your_key_here
PORT=3001
```

### 6. **Port Conflicts**
**Problem**: Ports 3001 or 8081 might be used by other applications on Windows.

**Solution**: Change ports in `.env` and `vite.config.ts` if needed.

### 7. **Firewall/Antivirus Issues**
**Problem**: Windows Defender or antivirus might block Node.js or file uploads.

**Solution**: Add exceptions for:
- Node.js executable
- Project folder
- Ports 3001 and 8081

## 🛠 **Windows-Specific Setup Steps**

### Step 1: Install Prerequisites
```bash
# Install Node.js 18+ from nodejs.org
# Install Git from git-scm.com
# Optionally install VS Code
```

### Step 2: Clone and Setup
```bash
git clone https://github.com/TRIDYY/alert-tamer-ai.git
cd alert-tamer-ai

# Copy environment file
copy .env.example .env

# Install dependencies
npm install
cd server
npm install
cd ..
```

### Step 3: Run the Application
```bash
npm run dev:full
```

## 🔍 **Debugging Steps for Windows Users**

### Check 1: Node.js Installation
```bash
node --version    # Should be 16+
npm --version     # Should be 8+
```

### Check 2: Dependencies
```bash
# Check if all packages installed
npm list
cd server && npm list
```

### Check 3: Port Availability
```bash
# Check if ports are available
netstat -an | find "3001"
netstat -an | find "8081"
```

### Check 4: File Permissions
- Ensure the project folder has write permissions
- Check if uploads directory can be created

### Check 5: Backend Health
```bash
# Test backend directly
curl http://localhost:3001/api/health
```

## 📱 **Testing Cross-Platform Compatibility**

### Test Script for Both Platforms:
```bash
# Run this on both Mac and Windows
npm run dev:full
```

Then test:
1. Open http://localhost:8081/
2. Sign in to the application
3. Upload a test .log file
4. Verify analysis results appear

## 🚨 **Emergency Fixes**

If the Windows collaborator still has issues:

### Option 1: Use Different Ports
```bash
# In .env file
PORT=3002

# In vite.config.ts
server: {
  port: 8082,
  proxy: {
    '/api': 'http://localhost:3002'
  }
}
```

### Option 2: Docker Setup (Universal)
```dockerfile
# Create Dockerfile for consistent environment
FROM node:18
WORKDIR /app
COPY . .
RUN npm install
RUN cd server && npm install
EXPOSE 3001 8081
CMD ["npm", "run", "dev:full"]
```

### Option 3: Use GitHub Codespaces
- Open repository in GitHub Codespaces
- Runs in a Linux container (consistent environment)

## 📞 **Troubleshooting Checklist**

Send this to your Windows collaborator:

- [ ] Node.js 16+ installed
- [ ] Git installed and configured
- [ ] Project cloned successfully
- [ ] `.env` file exists in root directory
- [ ] `npm install` completed without errors
- [ ] `cd server && npm install` completed
- [ ] Firewall allows Node.js
- [ ] Ports 3001 and 8081 are available
- [ ] `npm run dev:full` starts both servers
- [ ] Can access http://localhost:8081/

## 🎯 **Most Likely Solutions**

1. **Clear and reinstall node_modules** (90% of issues)
2. **Check firewall/antivirus settings** (Windows specific)
3. **Verify Node.js version compatibility** (same major version)
4. **Ensure .env file is properly configured**
