
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react'
import { Upload, FileText, AlertTriangle, CheckCircle, Clock, X, ArrowRight, Shield } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { useToast } from '@/hooks/use-toast'
import { useThreatAnalysis } from '../contexts/ThreatAnalysisContext'
import CyberBackground from '@/components/ui/cyber-background'

interface Threat {
  id: string
  type: string
  severity: string
  source: string
  target: string
  description: string
  timestamp: string
  status: string
  confidence: number
  recommendedAction?: string
}

interface AnalysisResult {
  fileName: string
  fileSize: number
  fileType?: string
  threatsFound: number
  threats: Threat[]
  error?: string
}

const LogAnalysis = () => {
  const navigate = useNavigate()
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const { toast } = useToast()
  const { analysisResults, setAnalysisResults } = useThreatAnalysis()

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    const validFiles = files.filter(file => {
      const validExtensions = ['.log', '.txt', '.csv', '.json', '.xml', '.pdf', '.docx', '.doc', '.rtf', '.md']
      const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'))
      return validExtensions.includes(fileExtension)
    })

    if (validFiles.length !== files.length) {
      toast({
        title: "Invalid Files",
        description: "Supported files: .log, .txt, .csv, .json, .xml, .pdf, .docx, .doc, .rtf, .md",
        variant: "destructive"
      })
    }

    setSelectedFiles(validFiles)
  }

  const removeFile = (index: number) => {
    setSelectedFiles(files => files.filter((_, i) => i !== index))
  }

  const analyzeFiles = async () => {
    if (selectedFiles.length === 0) {
      toast({
        title: "No Files Selected",
        description: "Please select log files to analyze",
        variant: "destructive"
      })
      return
    }

    setIsAnalyzing(true)
    setUploadProgress(0)

    try {
      const formData = new FormData()
      selectedFiles.forEach(file => {
        formData.append('logFiles', file)
      })

      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return prev
          }
          return prev + 10
        })
      }, 500)

      const response = await fetch('/api/upload-logs', {
        method: 'POST',
        body: formData
      })

      clearInterval(progressInterval)
      setUploadProgress(100)

      if (!response.ok) {
        throw new Error('Failed to analyze files')
      }

      const data = await response.json()
      setAnalysisResults(data.results)
      
      toast({
        title: "Analysis Complete",
        description: `Found ${data.results.reduce((sum: number, result: AnalysisResult) => sum + result.threatsFound, 0)} potential threats`,
      })
    } catch (error) {
      console.error('Analysis error:', error)
      toast({
        title: "Analysis Failed",
        description: "Failed to analyze log files. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsAnalyzing(false)
      setUploadProgress(0)
    }
  }

  const getSeverityColor = (severity: string, confidence: number) => {
    if (confidence === 0) return 'text-gray-500'
    switch (severity) {
      case 'Critical': return 'text-red-500'
      case 'High': return 'text-orange-500'
      case 'Medium': return 'text-yellow-500'
      case 'Low': return 'text-blue-500'
      default: return 'text-gray-500'
    }
  }

  const getSeverityBadge = (severity: string, confidence: number) => {
    if (confidence === 0) return 'secondary'
    switch (severity) {
      case 'Critical': return 'destructive'
      case 'High': return 'default'
      case 'Medium': return 'secondary'
      case 'Low': return 'outline'
      default: return 'secondary'
    }
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
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Upload Files for Analysis
                </h1>
                <p className="text-muted-foreground">
                  Upload your log files for initial threat detection. Detailed analysis and remediation available on Threat Analysis page.
                </p>
              </div>

            {/* File Upload Section */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Upload Files for Analysis</CardTitle>
                <CardDescription>
                  Select files to analyze for security threats. Supports: .log, .txt, .csv, .json, .xml, .pdf, .docx, .doc, .rtf, .md
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Drop files here or click to browse
                      </p>
                      <input
                        type="file"
                        multiple
                        accept=".log,.txt,.csv,.json,.xml,.pdf,.docx,.doc,.rtf,.md"
                        onChange={handleFileSelect}
                        className="hidden"
                        id="file-upload"
                      />
                      <Button variant="outline" asChild>
                        <label htmlFor="file-upload" className="cursor-pointer">
                          Select Files
                        </label>
                      </Button>
                    </div>
                  </div>

                  {/* Selected Files */}
                  {selectedFiles.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Selected Files:</h3>
                      {selectedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FileText className="h-5 w-5 text-primary" />
                            <span className="text-sm font-medium">{file.name}</span>
                            <span className="text-xs text-muted-foreground">
                              ({(file.size / 1024).toFixed(1)} KB)
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Analysis Progress */}
                  {isAnalyzing && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Analyzing files...</span>
                        <span className="text-sm text-muted-foreground">{uploadProgress}%</span>
                      </div>
                      <Progress value={uploadProgress} />
                    </div>
                  )}

                  <Button 
                    onClick={analyzeFiles} 
                    disabled={selectedFiles.length === 0 || isAnalyzing}
                    className="w-full"
                  >
                    {isAnalyzing ? (
                      <>
                        <Clock className="h-4 w-4 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Analyze Files
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Analysis Results */}
            {analysisResults.length > 0 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-foreground">Analysis Results</h2>
                
                {analysisResults.map((result, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">{result.fileName}</CardTitle>
                          <CardDescription>
                            File size: {(result.fileSize / 1024).toFixed(1)} KB • {result.threats.length} entries analyzed
                            {result.fileType && ` • Type: ${result.fileType}`}
                          </CardDescription>
                        </div>
                        <div className="flex items-center space-x-2">
                          {result.error ? (
                            <Badge variant="destructive">
                              Processing Error
                            </Badge>
                          ) : (
                            <>
                              <Badge variant={result.threatsFound > 0 ? "destructive" : "default"}>
                                {result.threatsFound} threats found
                              </Badge>
                              {result.threatsFound > 0 && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => navigate('/threat-analysis')}
                                  className="ml-2"
                                >
                                  <ArrowRight className="h-4 w-4 mr-1" />
                                  View Details
                                </Button>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {result.error ? (
                        <div className="text-center py-8">
                          <AlertTriangle className="mx-auto h-12 w-12 text-red-500 mb-4" />
                          <p className="text-muted-foreground mb-2">Failed to process file</p>
                          <p className="text-sm text-red-600">{result.error}</p>
                        </div>
                      ) : result.threats.length > 0 ? (
                        <div className="relative overflow-hidden">
                          {/* Cybersecurity Background Pattern */}
                          <div className="absolute inset-0 opacity-5">
                            <div className="absolute top-4 left-4 w-8 h-8 border border-current rounded rotate-45"></div>
                            <div className="absolute top-12 right-8 w-6 h-6 border border-current rounded-full"></div>
                            <div className="absolute bottom-8 left-12 w-4 h-4 bg-current rounded-full"></div>
                            <div className="absolute bottom-16 right-4 w-12 h-1 bg-current rounded"></div>
                            <div className="absolute top-1/3 left-1/4 w-1 h-8 bg-current rounded"></div>
                            <div className="absolute top-1/2 right-1/3 w-8 h-1 bg-current rounded"></div>
                            <div className="absolute bottom-1/3 left-2/3 w-2 h-2 border border-current rotate-45"></div>
                          </div>
                          
                          <div className="relative z-10 text-center py-8">
                            {/* Animated Alert Icon */}
                            <div className="relative mb-6">
                              <div className="absolute inset-0 animate-pulse">
                                <div className="mx-auto h-20 w-20 rounded-full bg-orange-500/20"></div>
                              </div>
                              <AlertTriangle className="relative mx-auto h-16 w-16 text-orange-500 animate-bounce" />
                            </div>
                            
                            <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                              Security Threats Detected
                            </h3>
                            <p className="text-muted-foreground mb-6">
                              Found <span className="font-bold text-orange-500">{result.threatsFound}</span> potential security issues in this file
                            </p>
                            
                            {/* Enhanced Severity Breakdown */}
                            <div className="bg-gradient-to-r from-slate-900/50 to-slate-800/50 rounded-xl p-6 mb-6 border border-orange-500/20">
                              <h4 className="text-sm font-semibold text-orange-400 mb-4 uppercase tracking-wider">Threat Distribution</h4>
                              <div className="flex justify-center space-x-6">
                                {(() => {
                                  const severityCounts = result.threats.reduce((acc, threat) => {
                                    acc[threat.severity] = (acc[threat.severity] || 0) + 1
                                    return acc
                                  }, {} as Record<string, number>)
                                  
                                  return Object.entries(severityCounts).map(([severity, count]) => (
                                    <div key={severity} className="text-center">
                                      <div className="relative mb-2">
                                        <div className="absolute inset-0 bg-gradient-to-t from-orange-500/10 to-transparent rounded-lg"></div>
                                        <Badge variant={getSeverityBadge(severity, 80)} className="relative shadow-lg">
                                          {severity}
                                        </Badge>
                                      </div>
                                      <p className="text-xl font-bold text-orange-400">{count}</p>
                                      <p className="text-xs text-muted-foreground">threats</p>
                                    </div>
                                  ))
                                })()}
                              </div>
                            </div>
                            
                            {/* Enhanced Top Threats Preview */}
                            <div className="bg-gradient-to-br from-slate-900/70 to-slate-800/70 rounded-xl p-6 mb-6 border border-orange-500/30 backdrop-blur-sm">
                              <div className="flex items-center justify-center mb-4">
                                <Shield className="h-5 w-5 text-orange-400 mr-2" />
                                <h4 className="font-semibold text-orange-400 uppercase tracking-wider text-sm">Critical Alerts</h4>
                              </div>
                              <div className="space-y-3">
                                {result.threats.slice(0, 3).map((threat, index) => (
                                  <div key={threat.id} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-orange-500/10 hover:border-orange-500/30 transition-colors">
                                    <div className="flex items-center space-x-3">
                                      <div className="flex items-center justify-center w-8 h-8 bg-orange-500/20 rounded-full text-xs font-bold text-orange-400">
                                        {index + 1}
                                      </div>
                                      <div className="text-left">
                                        <p className="font-medium text-sm">{threat.id}</p>
                                        <p className="text-xs text-muted-foreground">{threat.type}</p>
                                      </div>
                                    </div>
                                    <Badge variant={getSeverityBadge(threat.severity, threat.confidence)} className="text-xs shadow-sm">
                                      {threat.severity}
                                    </Badge>
                                  </div>
                                ))}
                                {result.threats.length > 3 && (
                                  <div className="text-center pt-2 border-t border-orange-500/20">
                                    <span className="text-sm text-orange-400 font-medium">
                                      +{result.threats.length - 3} more threats detected
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            {/* Enhanced CTA Button */}
                            <div className="relative">
                              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg blur opacity-30"></div>
                              <Button 
                                onClick={() => navigate('/threat-analysis')}
                                className="relative bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white shadow-xl border border-orange-500/50 px-8 py-3"
                              >
                                <Shield className="h-5 w-5 mr-2" />
                                Analyze All Threats
                                <ArrowRight className="h-4 w-4 ml-2" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="relative text-center py-12 overflow-hidden">
                          {/* Success Background Pattern */}
                          <div className="absolute inset-0 opacity-5">
                            <div className="absolute top-4 left-6 w-6 h-6 border border-green-500 rounded-full animate-pulse"></div>
                            <div className="absolute top-8 right-4 w-4 h-4 bg-green-500 rounded rotate-45"></div>
                            <div className="absolute bottom-6 left-4 w-8 h-1 bg-green-500 rounded"></div>
                            <div className="absolute bottom-4 right-8 w-2 h-6 bg-green-500 rounded"></div>
                            <div className="absolute top-1/2 left-1/3 w-3 h-3 border border-green-500 rotate-12"></div>
                          </div>
                          
                          <div className="relative z-10">
                            <div className="relative mb-4">
                              <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl animate-pulse"></div>
                              <CheckCircle className="relative mx-auto h-16 w-16 text-green-500" />
                            </div>
                            <h4 className="text-lg font-semibold text-green-600 mb-2">All Clear!</h4>
                            <p className="text-muted-foreground">No security threats detected in this file</p>
                            <div className="mt-4 inline-block px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-lg">
                              <span className="text-sm text-green-600 font-medium">✓ File is secure</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
                
                {/* Enhanced Summary and Call-to-Action */}
                {analysisResults.some(result => result.threatsFound > 0) && (
                  <Card className="relative overflow-hidden border-2 border-orange-500/30 bg-gradient-to-br from-orange-950/20 via-red-950/20 to-orange-950/20 backdrop-blur-sm">
                    {/* Cybersecurity Background Elements */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-4 left-4 w-16 h-16 border-2 border-orange-500 rounded-full animate-pulse"></div>
                      <div className="absolute top-8 right-8 w-8 h-8 border border-orange-400 rotate-45"></div>
                      <div className="absolute bottom-4 left-1/3 w-12 h-2 bg-orange-500 rounded animate-pulse"></div>
                      <div className="absolute bottom-8 right-12 w-4 h-12 bg-gradient-to-t from-orange-500/50 to-transparent"></div>
                      <div className="absolute top-1/2 left-8 w-2 h-8 bg-orange-400 rounded animate-pulse"></div>
                      <div className="absolute top-1/3 right-1/4 w-6 h-6 border-2 border-orange-400 rounded rotate-12 animate-spin"></div>
                    </div>
                    
                    <CardContent className="relative z-10 pt-8 pb-8">
                      <div className="text-center space-y-6">
                        {/* Animated Alert Header */}
                        <div className="relative">
                          <div className="absolute inset-0 bg-orange-500/20 rounded-full blur-xl animate-pulse"></div>
                          <div className="relative flex items-center justify-center space-x-3">
                            <div className="relative">
                              <Shield className="h-8 w-8 text-orange-500 animate-pulse" />
                              <div className="absolute inset-0 h-8 w-8 border-2 border-orange-500 rounded-full animate-ping"></div>
                            </div>
                            <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                              {analysisResults.reduce((total, result) => total + result.threatsFound, 0)} Total Threats Detected
                            </h3>
                          </div>
                        </div>
                        
                        {/* Enhanced Description */}
                        <div className="bg-slate-900/50 rounded-lg p-4 border border-orange-500/20">
                          <p className="text-muted-foreground">
                            <span className="text-orange-400 font-semibold">⚡ Advanced Security Analysis Ready</span>
                            <br />
                            Get detailed threat categorization, AI-powered remediation recommendations, and expert-level security insights
                          </p>
                        </div>
                        
                        {/* Enhanced CTA Button */}
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg blur opacity-40 animate-pulse"></div>
                          <Button 
                            onClick={() => navigate('/threat-analysis')}
                            className="relative bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white shadow-2xl border border-orange-500/50 px-12 py-4 text-lg font-semibold"
                            size="lg"
                          >
                            <Shield className="h-6 w-6 mr-3 animate-pulse" />
                            Launch Security Analysis
                            <ArrowRight className="h-5 w-5 ml-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
            </div>
          </div>
        </CyberBackground>
      </SignedIn>
    </>
  )
}

export default LogAnalysis
