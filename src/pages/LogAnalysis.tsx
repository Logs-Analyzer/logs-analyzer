
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react'
import { Upload, FileText, AlertTriangle, CheckCircle, Clock, X, ArrowRight } from 'lucide-react'
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
                        <div className="space-y-3">
                          <div className="text-center py-6">
                            <AlertTriangle className="mx-auto h-16 w-16 text-orange-500 mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Security Threats Detected</h3>
                            <p className="text-muted-foreground mb-4">
                              Found {result.threatsFound} potential security issues in this file
                            </p>
                            
                            {/* Severity Breakdown */}
                            <div className="flex justify-center space-x-4 mb-6">
                              {(() => {
                                const severityCounts = result.threats.reduce((acc, threat) => {
                                  acc[threat.severity] = (acc[threat.severity] || 0) + 1
                                  return acc
                                }, {} as Record<string, number>)
                                
                                return Object.entries(severityCounts).map(([severity, count]) => (
                                  <div key={severity} className="text-center">
                                    <Badge variant={getSeverityBadge(severity, 80)} className="mb-1">
                                      {severity}
                                    </Badge>
                                    <p className="text-sm text-muted-foreground">{count}</p>
                                  </div>
                                ))
                              })()}
                            </div>
                            
                            {/* Top Threats Preview */}
                            <div className="bg-muted rounded-lg p-4 mb-4">
                              <h4 className="font-semibold mb-2">Top Threats:</h4>
                              <div className="space-y-2">
                                {result.threats.slice(0, 3).map((threat) => (
                                  <div key={threat.id} className="flex items-center justify-between text-sm">
                                    <span className="font-medium">{threat.id}</span>
                                    <span className="text-muted-foreground">{threat.type}</span>
                                    <Badge variant={getSeverityBadge(threat.severity, threat.confidence)} className="text-xs">
                                      {threat.severity}
                                    </Badge>
                                  </div>
                                ))}
                                {result.threats.length > 3 && (
                                  <div className="text-center pt-2">
                                    <span className="text-sm text-muted-foreground">
                                      +{result.threats.length - 3} more threats
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            <Button 
                              onClick={() => navigate('/threat-analysis')}
                              className="bg-orange-600 hover:bg-orange-700 text-white"
                            >
                              <ArrowRight className="h-4 w-4 mr-2" />
                              Analyze All Threats
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
                          <p className="text-muted-foreground">No threats detected in this file</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
                
                {/* Summary and Call-to-Action */}
                {analysisResults.some(result => result.threatsFound > 0) && (
                  <Card className="border-2 border-orange-200 bg-orange-50/50 dark:border-orange-800 dark:bg-orange-950/20">
                    <CardContent className="pt-6">
                      <div className="text-center space-y-4">
                        <div className="flex items-center justify-center space-x-2">
                          <AlertTriangle className="h-6 w-6 text-orange-500" />
                          <h3 className="text-lg font-semibold">
                            {analysisResults.reduce((total, result) => total + result.threatsFound, 0)} Total Threats Detected
                          </h3>
                        </div>
                        <p className="text-muted-foreground">
                          Get detailed analysis, threat categorization, and AI-powered remediation recommendations
                        </p>
                        <Button 
                          onClick={() => navigate('/threat-analysis')}
                          className="bg-orange-600 hover:bg-orange-700 text-white"
                          size="lg"
                        >
                          <ArrowRight className="h-5 w-5 mr-2" />
                          Analyze Threats in Detail
                        </Button>
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
