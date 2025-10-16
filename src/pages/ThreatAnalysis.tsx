import React, { useState, useEffect } from 'react'
import { useThreatAnalysis } from '../contexts/ThreatAnalysisContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog'
import { AlertTriangle, AlertCircle, Clock, Search, Shield, Download, FileText, Home, Users, Eye, X, Server, Network, Database, Globe, Lock, Bug, Cpu, Mail, Camera } from 'lucide-react'
import CyberBackground from '../components/ui/cyber-background'
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react'

const ThreatAnalysis: React.FC = () => {
  const {
    analysisResults,
    setAnalysisResults,
    enhancedThreats,
    isEnhancing,
    enhanceThreatsWithAI,
    setSelectedThreat
  } = useThreatAnalysis()

  const [isLoading, setIsLoading] = useState(true)

  // Initialize loading state and scroll to top
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, behavior: 'smooth' })
    
    // Give a small delay to ensure context has been initialized
    setTimeout(() => {
      setIsLoading(false)
    }, 100)
  }, [])

  const [searchTerm, setSearchTerm] = useState('')
  const [severityFilter, setSeverityFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [componentFilter, setComponentFilter] = useState('all')

  // Extract all threats from analysis results
  const allThreats = analysisResults.flatMap(result => result.threats || [])
  const totalThreats = allThreats.length

  // Get unique threat types and components for filter options
  const threatTypes = [...new Set(allThreats.map(threat => threat.type))].filter(Boolean)
  const affectedComponents = [...new Set(allThreats.map(threat => {
    const type = threat.type?.toLowerCase() || ''
    const target = threat.target?.toLowerCase() || ''
    const description = threat.description?.toLowerCase() || ''
    const source = threat.source?.toLowerCase() || ''
    
    // More specific categorization
    
    // Database threats
    if (type.includes('sql injection') || description.includes('sql injection')) return 'Database - SQL Injection'
    if (type.includes('database') || target.includes('database') || target.includes('db')) return 'Database - Access'
    
    // Network-specific threats
    if (type.includes('ddos') || description.includes('ddos') || description.includes('denial of service')) return 'Network - DDoS Attack'
    if (type.includes('port scan') || description.includes('port scan') || description.includes('port scanning')) return 'Network - Port Scanning'
    if (description.includes('network intrusion') || description.includes('network breach')) return 'Network - Intrusion'
    if (type.includes('firewall') || target.includes('firewall')) return 'Network - Firewall'
    if (type.includes('router') || target.includes('router')) return 'Network - Router'
    if (type.includes('network') || target.includes('network')) return 'Network - General'
    
    // System-specific threats (more granular)
    if (description.includes('unauthorized access') && (target.includes('system') || target.includes('server'))) return 'System - Unauthorized Access'
    if (description.includes('privilege escalation') || type.includes('privilege escalation')) return 'System - Privilege Escalation'
    if (description.includes('file system') || description.includes('disk') || type.includes('disk')) return 'System - File System'
    if (description.includes('os compromise') || description.includes('operating system')) return 'System - OS Compromise'
    if (description.includes('system exploit') || description.includes('kernel')) return 'System - Exploitation'
    if (description.includes('memory') || description.includes('buffer overflow')) return 'System - Memory Attack'
    if (description.includes('boot') || description.includes('firmware')) return 'System - Boot/Firmware'
    if (target.includes('system') || target.includes('server') || target.includes('host')) return 'System - General'
    
    // Authentication & Identity
    if (description.includes('brute force') || description.includes('bruteforce')) return 'Authentication - Brute Force'
    if (description.includes('credential') || description.includes('password')) return 'Authentication - Credential Theft'
    if (description.includes('login') && description.includes('failed')) return 'Authentication - Failed Login'
    if (type.includes('authentication') || target.includes('auth') || target.includes('login')) return 'Authentication - General'
    
    // Web Application threats
    if (description.includes('xss') || description.includes('cross-site')) return 'Web App - XSS'
    if (description.includes('csrf') || description.includes('cross-site request')) return 'Web App - CSRF'
    if (description.includes('path traversal') || description.includes('directory traversal')) return 'Web App - Path Traversal'
    if (description.includes('file upload') || description.includes('malicious upload')) return 'Web App - File Upload'
    if (type.includes('web') || target.includes('web') || target.includes('application')) return 'Web App - General'
    
    // Malware & Security
    if (type.includes('ransomware') || description.includes('ransomware')) return 'Security - Ransomware'
    if (type.includes('trojan') || description.includes('trojan')) return 'Security - Trojan'
    if (type.includes('virus') || description.includes('virus')) return 'Security - Virus'
    if (type.includes('malware') || description.includes('malware')) return 'Security - Malware'
    if (description.includes('phishing') || description.includes('social engineering')) return 'Security - Phishing'
    if (description.includes('data exfiltration') || description.includes('data theft')) return 'Security - Data Exfiltration'
    
    // Application & Services
    if (description.includes('service') || description.includes('daemon')) return 'Application - Service'
    if (description.includes('api') || target.includes('api')) return 'Application - API'
    if (description.includes('container') || description.includes('docker')) return 'Application - Container'
    
    // Email & Communication
    if (target.includes('email') || target.includes('mail')) return 'Communication - Email'
    if (target.includes('chat') || target.includes('messaging')) return 'Communication - Messaging'
    
    // IoT & Infrastructure
    if (target.includes('iot') || description.includes('iot') || description.includes('internet of things')) return 'IoT - Device'
    if (target.includes('camera') || target.includes('sensor')) return 'IoT - Surveillance'
    
    return 'Other'
  }))].filter(Boolean)

  // Severity priority for sorting (higher number = higher priority)
  const severityPriority = {
    'Critical': 4,
    'High': 3,
    'Medium': 2,
    'Low': 1
  }

  // Filter and sort threats
  const filteredAndSortedThreats = enhancedThreats
    .filter(threat => {
      const matchesSearch = !searchTerm || 
        threat.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        threat.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        threat.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
        threat.target.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesSeverity = severityFilter === 'all' || 
        threat.severity.toLowerCase() === severityFilter.toLowerCase() ||
        (severityFilter === 'critical-high' && (threat.severity === 'Critical' || threat.severity === 'High'))

      const matchesType = typeFilter === 'all' || 
        threat.type === typeFilter

      const threatComponent = (() => {
        const type = threat.type?.toLowerCase() || ''
        const target = threat.target?.toLowerCase() || ''
        const description = threat.description?.toLowerCase() || ''
        const source = threat.source?.toLowerCase() || ''
        
        // More specific categorization
        
        // Database threats
        if (type.includes('sql injection') || description.includes('sql injection')) return 'Database - SQL Injection'
        if (type.includes('database') || target.includes('database') || target.includes('db')) return 'Database - Access'
        
        // Network-specific threats
        if (type.includes('ddos') || description.includes('ddos') || description.includes('denial of service')) return 'Network - DDoS Attack'
        if (type.includes('port scan') || description.includes('port scan') || description.includes('port scanning')) return 'Network - Port Scanning'
        if (description.includes('network intrusion') || description.includes('network breach')) return 'Network - Intrusion'
        if (type.includes('firewall') || target.includes('firewall')) return 'Network - Firewall'
        if (type.includes('router') || target.includes('router')) return 'Network - Router'
        if (type.includes('network') || target.includes('network')) return 'Network - General'
        
        // System-specific threats (more granular)
        if (description.includes('unauthorized access') && (target.includes('system') || target.includes('server'))) return 'System - Unauthorized Access'
        if (description.includes('privilege escalation') || type.includes('privilege escalation')) return 'System - Privilege Escalation'
        if (description.includes('file system') || description.includes('disk') || type.includes('disk')) return 'System - File System'
        if (description.includes('os compromise') || description.includes('operating system')) return 'System - OS Compromise'
        if (description.includes('system exploit') || description.includes('kernel')) return 'System - Exploitation'
        if (description.includes('memory') || description.includes('buffer overflow')) return 'System - Memory Attack'
        if (description.includes('boot') || description.includes('firmware')) return 'System - Boot/Firmware'
        if (target.includes('system') || target.includes('server') || target.includes('host')) return 'System - General'
        
        // Authentication & Identity
        if (description.includes('brute force') || description.includes('bruteforce')) return 'Authentication - Brute Force'
        if (description.includes('credential') || description.includes('password')) return 'Authentication - Credential Theft'
        if (description.includes('login') && description.includes('failed')) return 'Authentication - Failed Login'
        if (type.includes('authentication') || target.includes('auth') || target.includes('login')) return 'Authentication - General'
        
        // Web Application threats
        if (description.includes('xss') || description.includes('cross-site')) return 'Web App - XSS'
        if (description.includes('csrf') || description.includes('cross-site request')) return 'Web App - CSRF'
        if (description.includes('path traversal') || description.includes('directory traversal')) return 'Web App - Path Traversal'
        if (description.includes('file upload') || description.includes('malicious upload')) return 'Web App - File Upload'
        if (type.includes('web') || target.includes('web') || target.includes('application')) return 'Web App - General'
        
        // Malware & Security
        if (type.includes('ransomware') || description.includes('ransomware')) return 'Security - Ransomware'
        if (type.includes('trojan') || description.includes('trojan')) return 'Security - Trojan'
        if (type.includes('virus') || description.includes('virus')) return 'Security - Virus'
        if (type.includes('malware') || description.includes('malware')) return 'Security - Malware'
        if (description.includes('phishing') || description.includes('social engineering')) return 'Security - Phishing'
        if (description.includes('data exfiltration') || description.includes('data theft')) return 'Security - Data Exfiltration'
        
        // Application & Services
        if (description.includes('service') || description.includes('daemon')) return 'Application - Service'
        if (description.includes('api') || target.includes('api')) return 'Application - API'
        if (description.includes('container') || description.includes('docker')) return 'Application - Container'
        
        // Email & Communication
        if (target.includes('email') || target.includes('mail')) return 'Communication - Email'
        if (target.includes('chat') || target.includes('messaging')) return 'Communication - Messaging'
        
        // IoT & Infrastructure
        if (target.includes('iot') || description.includes('iot') || description.includes('internet of things')) return 'IoT - Device'
        if (target.includes('camera') || target.includes('sensor')) return 'IoT - Surveillance'
        
        return 'Other'
      })()

      const matchesComponent = componentFilter === 'all' || 
        threatComponent === componentFilter

      return matchesSearch && matchesSeverity && matchesType && matchesComponent
    })
    .sort((a, b) => {
      // Sort by severity (Critical first, then High, Medium, Low)
      const severityA = severityPriority[a.severity] || 0
      const severityB = severityPriority[b.severity] || 0
      if (severityA !== severityB) {
        return severityB - severityA // Higher severity first
      }
      // If same severity, sort by timestamp (newest first)
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    })

  // Calculate stats
  const criticalHighThreats = allThreats.filter(t => t.severity === 'Critical' || t.severity === 'High').length
  
  // Calculate home fixable threats with fallback logic for non-enhanced threats
  const homeFixableThreats = (() => {
    // Count enhanced threats that are marked as home fixable
    const enhancedHomeFixable = enhancedThreats.filter(t => t.detailedAnalysis?.isHomeFixable).length
    
    // For non-enhanced threats, estimate based on severity and type
    const basicThreats = allThreats.filter(threat => 
      !enhancedThreats.some(enhanced => enhanced.id === threat.id)
    )
    
    const estimatedHomeFixable = basicThreats.filter(threat => {
      const threatType = threat.type?.toLowerCase() || ''
      const threatDesc = threat.description?.toLowerCase() || ''
      const severity = threat.severity?.toLowerCase() || ''
      
      // Consider these types likely to be home fixable
      const homeFixableKeywords = [
        'information', 'warning', 'configuration', 'log', 'disk space', 
        'memory', 'performance', 'space', 'cleanup', 'maintenance',
        'system warning', 'file', 'directory', 'permission'
      ]
      
      // High-risk keywords that are typically NOT home fixable
      const expertRequiredKeywords = [
        'unauthorized', 'breach', 'attack', 'malware', 'virus',
        'intrusion', 'hack', 'exploit', 'injection', 'ddos'
      ]
      
      // Check if it requires expert attention
      const requiresExpert = expertRequiredKeywords.some(keyword => 
        threatType.includes(keyword) || threatDesc.includes(keyword)
      )
      
      if (requiresExpert) return false
      
      // Low severity is often home fixable
      if (severity === 'low') {
        return homeFixableKeywords.some(keyword => 
          threatType.includes(keyword) || threatDesc.includes(keyword)
        ) || true // Default low severity to home fixable
      }
      
      // Medium severity with specific types
      if (severity === 'medium') {
        return homeFixableKeywords.slice(0, 8).some(keyword => 
          threatType.includes(keyword) || threatDesc.includes(keyword)
        )
      }
      
      return false
    }).length
    
    return enhancedHomeFixable + estimatedHomeFixable
  })()

  // Functions to handle stat card clicks
  const handleSeverityClick = (severity: string) => {
    if (severity === 'critical,high') {
      // For Critical/High card, we'll use a special filter
      setSeverityFilter('critical-high')
    } else {
      setSeverityFilter(severity.toLowerCase())
    }
  }

  const handleResetFilters = () => {
    setSearchTerm('')
    setSeverityFilter('all')
    setTypeFilter('all')
    setComponentFilter('all')
  }

  const enhanceAllThreats = async () => {
    await enhanceThreatsWithAI(allThreats)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity?.toLowerCase()) {
      case 'critical': return 'text-red-500'
      case 'high': return 'text-orange-500'
      case 'medium': return 'text-yellow-500'
      case 'low': return 'text-green-500'
      default: return 'text-gray-500'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active': return 'destructive'
      case 'mitigated': return 'default'
      case 'investigating': return 'secondary'
      default: return 'outline'
    }
  }

  const getComponentIcon = (component: string) => {
    if (component.startsWith('System')) return <Server className="h-3 w-3" />
    if (component.startsWith('Network')) return <Network className="h-3 w-3" />
    if (component.startsWith('Database')) return <Database className="h-3 w-3" />
    if (component.startsWith('Web App')) return <Globe className="h-3 w-3" />
    if (component.startsWith('Authentication')) return <Lock className="h-3 w-3" />
    if (component.startsWith('Security')) return <Bug className="h-3 w-3" />
    if (component.startsWith('Application')) return <Cpu className="h-3 w-3" />
    if (component.startsWith('Communication')) return <Mail className="h-3 w-3" />
    if (component.startsWith('IoT')) return <Camera className="h-3 w-3" />
    return <AlertCircle className="h-3 w-3" />
  }

  const getComponentColor = (component: string) => {
    if (component.startsWith('System')) return 'bg-red-100 text-red-800 border-red-200'
    if (component.startsWith('Network')) return 'bg-orange-100 text-orange-800 border-orange-200'
    if (component.startsWith('Database')) return 'bg-blue-100 text-blue-800 border-blue-200'
    if (component.startsWith('Web App')) return 'bg-green-100 text-green-800 border-green-200'
    if (component.startsWith('Authentication')) return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    if (component.startsWith('Security')) return 'bg-purple-100 text-purple-800 border-purple-200'
    if (component.startsWith('Application')) return 'bg-indigo-100 text-indigo-800 border-indigo-200'
    if (component.startsWith('Communication')) return 'bg-pink-100 text-pink-800 border-pink-200'
    if (component.startsWith('IoT')) return 'bg-teal-100 text-teal-800 border-teal-200'
    return 'bg-gray-100 text-gray-800 border-gray-200'
  }

  // Show loading state if no analysis results yet
  if (analysisResults.length === 0) {
    return (
      <>
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
        <SignedIn>
          <CyberBackground>
            <div className="flex items-center justify-center min-h-screen">
              <Card className="w-full max-w-md">
                <CardContent className="p-8 text-center">
                  <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h2 className="text-xl font-semibold mb-2">No Threat Analysis Available</h2>
                  <p className="text-muted-foreground mb-4">
                    Please run log analysis first to detect threats before accessing this page.
                  </p>
                  <Button variant="outline" onClick={() => window.location.href = '/log-analysis'}>
                    Go to Log Analysis
                  </Button>
                  <Button variant="outline" onClick={() => {
                    const testData = [{
                      fileName: 'test.log',
                      fileSize: 1000,
                      threatsFound: 1,
                      threats: [{
                        id: 'TEST-001',
                        type: 'Test Threat',
                        severity: 'High',
                        source: 'Unknown',
                        target: 'System',
                        description: 'Test threat for debugging',
                        timestamp: '2025-01-15 10:00:00',
                        status: 'Active',
                        confidence: 95
                      }]
                    }]
                    localStorage.setItem('threatAnalysis_results', JSON.stringify(testData))
                    window.location.reload()
                  }}>
                    Test LocalStorage
                  </Button>
                </CardContent>
              </Card>
            </div>
          </CyberBackground>
        </SignedIn>
      </>
    )
  }

  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
        <CyberBackground>
          <div className="p-6">
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">
                      Threat Analysis Dashboard
                    </h1>
                    <p className="text-muted-foreground">
                      AI-powered threat detection with detailed remediation insights
                    </p>
                  </div>
                  {isEnhancing && (
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock className="h-4 w-4 animate-spin" />
                      <span>Enhancing with AI...</span>
                    </div>
                  )}
                </div>
                
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                  <Card className="cursor-pointer hover:border-primary/50 transition-colors" onClick={handleResetFilters}>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                        <div>
                          <p className="text-sm font-medium">Total Threats</p>
                          <p className="text-2xl font-bold">{totalThreats}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="cursor-pointer hover:border-primary/50 transition-colors" onClick={() => handleSeverityClick('critical,high')}>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="h-5 w-5 text-orange-500" />
                        <div>
                          <p className="text-sm font-medium">Critical/High</p>
                          <p className="text-2xl font-bold">{criticalHighThreats}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-5 w-5 text-blue-500" />
                        <div>
                          <p className="text-sm font-medium">Files Analyzed</p>
                          <p className="text-2xl font-bold">{analysisResults.length}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="cursor-pointer hover:border-primary/50 transition-colors" onClick={() => setComponentFilter('all')}>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <Home className="h-5 w-5 text-green-500" />
                        <div>
                          <p className="text-sm font-medium">Home Fixable</p>
                          <p className="text-2xl font-bold">{homeFixableThreats}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Filters and Search */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Filter Threats</CardTitle>
                  <CardDescription>
                    Advanced threat categorization with detailed system component analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col space-y-4">
                    {/* Search and primary filters */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Search threats, IPs, or descriptions..."
                            className="pl-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </div>
                      </div>
                      <Select value={severityFilter} onValueChange={setSeverityFilter}>
                        <SelectTrigger className="w-full sm:w-48">
                          <SelectValue placeholder="Severity" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Severities</SelectItem>
                          <SelectItem value="critical-high">Critical & High</SelectItem>
                          <SelectItem value="critical">Critical Only</SelectItem>
                          <SelectItem value="high">High Only</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline" onClick={enhanceAllThreats} disabled={isEnhancing}>
                        <Shield className="h-4 w-4 mr-2" />
                        {isEnhancing ? 'Enhancing...' : 'Re-analyze with AI'}
                      </Button>
                    </div>

                    {/* Additional filters */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Select value={typeFilter} onValueChange={setTypeFilter}>
                        <SelectTrigger className="w-full sm:w-64">
                          <SelectValue placeholder="Threat Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          {threatTypes.map(type => (
                            <SelectItem key={String(type)} value={String(type)}>{String(type)}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      
                      <Select value={componentFilter} onValueChange={setComponentFilter}>
                        <SelectTrigger className="w-full sm:w-64">
                          <SelectValue placeholder="System Component" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Components</SelectItem>
                          {affectedComponents.map(component => (
                            <SelectItem key={String(component)} value={String(component)}>{String(component)}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Button variant="outline" onClick={handleResetFilters}>
                        Clear Filters
                      </Button>
                      
                      <Button variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Export Report
                      </Button>
                    </div>

                    {/* Active filters display */}
                    {(severityFilter !== 'all' || typeFilter !== 'all' || componentFilter !== 'all' || searchTerm) && (
                      <div className="flex flex-wrap gap-2">
                        <span className="text-sm text-muted-foreground">Active filters:</span>
                        {severityFilter !== 'all' && (
                          <Badge variant="secondary" className="cursor-pointer" onClick={() => setSeverityFilter('all')}>
                            Severity: {severityFilter === 'critical-high' ? 'Critical & High' : severityFilter} ×
                          </Badge>
                        )}
                        {typeFilter !== 'all' && (
                          <Badge variant="secondary" className="cursor-pointer" onClick={() => setTypeFilter('all')}>
                            Type: {typeFilter} ×
                          </Badge>
                        )}
                        {componentFilter !== 'all' && (
                          <Badge variant="secondary" className="cursor-pointer" onClick={() => setComponentFilter('all')}>
                            Component: {componentFilter} ×
                          </Badge>
                        )}
                        {searchTerm && (
                          <Badge variant="secondary" className="cursor-pointer" onClick={() => setSearchTerm('')}>
                            Search: "{searchTerm}" ×
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Threats List */}
              <div className="space-y-4">
                {/* Results count */}
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Showing {filteredAndSortedThreats.length} of {totalThreats} threats
                    {(severityFilter !== 'all' || typeFilter !== 'all' || componentFilter !== 'all' || searchTerm) && ' (filtered)'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Sorted by severity (Critical → Low)
                  </p>
                </div>

                {filteredAndSortedThreats.length === 0 ? (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No threats found</h3>
                      <p className="text-muted-foreground mb-4">
                        No threats match your current filter criteria.
                      </p>
                      <Button variant="outline" onClick={handleResetFilters}>
                        Clear all filters
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  filteredAndSortedThreats.map((threat) => {
                    const threatComponent = (() => {
                      const type = threat.type?.toLowerCase() || ''
                      const target = threat.target?.toLowerCase() || ''
                      const description = threat.description?.toLowerCase() || ''
                      const source = threat.source?.toLowerCase() || ''
                      
                      // More specific categorization
                      
                      // Database threats
                      if (type.includes('sql injection') || description.includes('sql injection')) return 'Database - SQL Injection'
                      if (type.includes('database') || target.includes('database') || target.includes('db')) return 'Database - Access'
                      
                      // Network-specific threats
                      if (type.includes('ddos') || description.includes('ddos') || description.includes('denial of service')) return 'Network - DDoS Attack'
                      if (type.includes('port scan') || description.includes('port scan') || description.includes('port scanning')) return 'Network - Port Scanning'
                      if (description.includes('network intrusion') || description.includes('network breach')) return 'Network - Intrusion'
                      if (type.includes('firewall') || target.includes('firewall')) return 'Network - Firewall'
                      if (type.includes('router') || target.includes('router')) return 'Network - Router'
                      if (type.includes('network') || target.includes('network')) return 'Network - General'
                      
                      // System-specific threats (more granular)
                      if (description.includes('unauthorized access') && (target.includes('system') || target.includes('server'))) return 'System - Unauthorized Access'
                      if (description.includes('privilege escalation') || type.includes('privilege escalation')) return 'System - Privilege Escalation'
                      if (description.includes('file system') || description.includes('disk') || type.includes('disk')) return 'System - File System'
                      if (description.includes('os compromise') || description.includes('operating system')) return 'System - OS Compromise'
                      if (description.includes('system exploit') || description.includes('kernel')) return 'System - Exploitation'
                      if (description.includes('memory') || description.includes('buffer overflow')) return 'System - Memory Attack'
                      if (description.includes('boot') || description.includes('firmware')) return 'System - Boot/Firmware'
                      if (target.includes('system') || target.includes('server') || target.includes('host')) return 'System - General'
                      
                      // Authentication & Identity
                      if (description.includes('brute force') || description.includes('bruteforce')) return 'Authentication - Brute Force'
                      if (description.includes('credential') || description.includes('password')) return 'Authentication - Credential Theft'
                      if (description.includes('login') && description.includes('failed')) return 'Authentication - Failed Login'
                      if (type.includes('authentication') || target.includes('auth') || target.includes('login')) return 'Authentication - General'
                      
                      // Web Application threats
                      if (description.includes('xss') || description.includes('cross-site')) return 'Web App - XSS'
                      if (description.includes('csrf') || description.includes('cross-site request')) return 'Web App - CSRF'
                      if (description.includes('path traversal') || description.includes('directory traversal')) return 'Web App - Path Traversal'
                      if (description.includes('file upload') || description.includes('malicious upload')) return 'Web App - File Upload'
                      if (type.includes('web') || target.includes('web') || target.includes('application')) return 'Web App - General'
                      
                      // Malware & Security
                      if (type.includes('ransomware') || description.includes('ransomware')) return 'Security - Ransomware'
                      if (type.includes('trojan') || description.includes('trojan')) return 'Security - Trojan'
                      if (type.includes('virus') || description.includes('virus')) return 'Security - Virus'
                      if (type.includes('malware') || description.includes('malware')) return 'Security - Malware'
                      if (description.includes('phishing') || description.includes('social engineering')) return 'Security - Phishing'
                      if (description.includes('data exfiltration') || description.includes('data theft')) return 'Security - Data Exfiltration'
                      
                      // Application & Services
                      if (description.includes('service') || description.includes('daemon')) return 'Application - Service'
                      if (description.includes('api') || target.includes('api')) return 'Application - API'
                      if (description.includes('container') || description.includes('docker')) return 'Application - Container'
                      
                      // Email & Communication
                      if (target.includes('email') || target.includes('mail')) return 'Communication - Email'
                      if (target.includes('chat') || target.includes('messaging')) return 'Communication - Messaging'
                      
                      // IoT & Infrastructure
                      if (target.includes('iot') || description.includes('iot') || description.includes('internet of things')) return 'IoT - Device'
                      if (target.includes('camera') || target.includes('sensor')) return 'IoT - Surveillance'
                      
                      return 'Other'
                    })()
                    
                    return (
                  <Card key={threat.id} className="hover:border-primary/50 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <AlertTriangle className={`h-6 w-6 ${getSeverityColor(threat.severity)}`} />
                          <div>
                            <div className="flex items-center space-x-2">
                              <h3 className="text-lg font-semibold text-foreground">{threat.id}</h3>
                              <Badge variant="outline" className="text-xs">
                                {threat.fileName}
                              </Badge>
                              <Badge variant="secondary" className={`text-xs ${getComponentColor(threatComponent)} flex items-center gap-1`}>
                                {getComponentIcon(threatComponent)}
                                {threatComponent}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{threat.type}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={getStatusColor(threat.status)}>
                            {threat.status}
                          </Badge>
                          <Badge variant="outline" className={getSeverityColor(threat.severity)}>
                            {threat.severity}
                          </Badge>
                          {threat.detailedAnalysis?.isHomeFixable && (
                            <Badge variant="secondary" className="text-green-600">
                              <Home className="h-3 w-3 mr-1" />
                              Home Fixable
                            </Badge>
                          )}
                          {threat.detailedAnalysis?.requiresExpert && (
                            <Badge variant="secondary" className="text-red-600">
                              <Users className="h-3 w-3 mr-1" />
                              Expert Needed
                            </Badge>
                          )}
                        </div>
                      </div>

                      <p className="text-foreground mb-4">{threat.description}</p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <span className="text-sm font-medium text-muted-foreground">Source:</span>
                          <p className="text-sm text-foreground">{threat.source}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-muted-foreground">Target:</span>
                          <p className="text-sm text-foreground">{threat.target}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-muted-foreground">Confidence:</span>
                          <p className="text-sm text-foreground">{threat.confidence}%</p>
                        </div>
                      </div>

                      {threat.detailedAnalysis?.targetedPorts && (
                        <div className="mb-4">
                          <span className="text-sm font-medium text-muted-foreground">Targeted Ports:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {threat.detailedAnalysis.targetedPorts.map((port, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {port}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{threat.timestamp}</span>
                        </div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedThreat(threat)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View AI Analysis
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="flex items-center space-x-2">
                                <AlertTriangle className={`h-5 w-5 ${getSeverityColor(threat.severity)}`} />
                                <span>{threat.id} - Detailed Analysis</span>
                              </DialogTitle>
                              <DialogDescription>
                                AI-powered threat analysis and remediation recommendations
                              </DialogDescription>
                            </DialogHeader>
                            
                            <div className="space-y-6">
                              {/* Basic Info */}
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-semibold mb-2">Threat Details</h4>
                                  <div className="space-y-2 text-sm">
                                    <div><strong>Type:</strong> {threat.type}</div>
                                    <div><strong>Severity:</strong> <span className={getSeverityColor(threat.severity)}>{threat.severity}</span></div>
                                    <div><strong>Source:</strong> {threat.source}</div>
                                    <div><strong>Target:</strong> {threat.target}</div>
                                    <div><strong>Confidence:</strong> {threat.confidence}%</div>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-semibold mb-2">AI Assessment</h4>
                                  <div className="space-y-2 text-sm">
                                    <div><strong>Risk Level:</strong> {threat.detailedAnalysis?.riskLevel || 'Assessing...'}</div>
                                    <div><strong>Business Impact:</strong> {threat.detailedAnalysis?.businessImpact || 'Analyzing...'}</div>
                                    <div><strong>Home Fixable:</strong> 
                                      <Badge variant={threat.detailedAnalysis?.isHomeFixable ? "default" : "destructive"} className="ml-2">
                                        {threat.detailedAnalysis?.isHomeFixable ? 'Yes' : 'No'}
                                      </Badge>
                                    </div>
                                    <div><strong>Expert Required:</strong> 
                                      <Badge variant={threat.detailedAnalysis?.requiresExpert ? "destructive" : "default"} className="ml-2">
                                        {threat.detailedAnalysis?.requiresExpert ? 'Yes' : 'No'}
                                      </Badge>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Targeted Ports */}
                              {threat.detailedAnalysis?.targetedPorts && (
                                <div>
                                  <h4 className="font-semibold mb-2">Targeted Ports & Services</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {threat.detailedAnalysis.targetedPorts.map((port, index) => (
                                      <Badge key={index} variant="outline">
                                        {port}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Technical Details */}
                              {threat.detailedAnalysis?.technicalDetails && (
                                <div>
                                  <h4 className="font-semibold mb-2">Technical Analysis</h4>
                                  <div className="bg-muted p-4 rounded-lg text-sm">
                                    {threat.detailedAnalysis.technicalDetails}
                                  </div>
                                </div>
                              )}

                              {/* Remediation Steps */}
                              {threat.detailedAnalysis?.remediationSteps && (
                                <div>
                                  <h4 className="font-semibold mb-2">Remediation Steps</h4>
                                  <div className="space-y-2">
                                    {threat.detailedAnalysis.remediationSteps.map((step, index) => (
                                      <div key={index} className="flex items-start space-x-2">
                                        <Badge variant="outline" className="text-xs mt-1">
                                          {index + 1}
                                        </Badge>
                                        <span className="text-sm">{step}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CardContent>
                  </Card>
                    )
                  })
                )}
              </div>
            </div>
          </div>
        </CyberBackground>
      </SignedIn>
    </>
  )
}

export default ThreatAnalysis