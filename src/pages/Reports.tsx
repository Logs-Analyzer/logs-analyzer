import * as React from 'react'
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react'
import { Download, Calendar, FileText, BarChart3, TrendingUp, Shield, Upload, Loader2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/components/ui/use-toast'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import CyberBackground from '@/components/ui/cyber-background'

const { useState, useCallback } = React

const Reports = () => {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [selectedReportType, setSelectedReportType] = useState('')
  const [selectedTimePeriod, setSelectedTimePeriod] = useState('')
  const [selectedFormat, setSelectedFormat] = useState('')
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [generatingReport, setGeneratingReport] = useState(false)
  const [reports, setReports] = useState<{
    id: string
    name: string
    type: string
    generatedDate: string
    size: string
    format: string
    status: string
  }[]>([])

  // Load initial reports
  React.useEffect(() => {
    const loadInitialReports = () => {
      const initialReports = [
        {
          id: 'RPT-001',
          name: 'January Security Summary',
          type: 'Monthly Report',
          generatedDate: '2024-01-15 09:00:00',
          size: '2.4 MB',
          format: 'PDF',
          status: 'Ready'
        },
        {
          id: 'RPT-002',
          name: 'Threat Intelligence Weekly #3',
          type: 'Weekly Report',
          generatedDate: '2024-01-14 06:00:00',
          size: '1.8 MB',
          format: 'PDF',
          status: 'Ready'
        },
        {
          id: 'RPT-003',
          name: 'Q4 2023 Compliance Audit',
          type: 'Quarterly Report',
          generatedDate: '2024-01-10 10:30:00',
          size: '5.2 MB',
          format: 'PDF',
          status: 'Ready'
        },
        {
          id: 'RPT-004',
          name: 'December Incident Response',
          type: 'Monthly Report',
          generatedDate: '2024-01-05 14:15:00',
          size: '3.1 MB',
          format: 'PDF',
          status: 'Ready'
        }
      ]
      setReports(initialReports)
    }

    loadInitialReports()
  }, [])

  // Setup polling for updates
  React.useEffect(() => {
    const pollInterval = 30000 // Poll every 30 seconds
    let lastReportId = reports[0]?.id || ''

    const checkForNewReports = () => {
      // Simulate checking for new reports
      const currentDate = new Date()
      const newReport = {
        id: `RPT-${Math.random().toString(36).substr(2, 9)}`,
        name: `Security Scan - ${currentDate.toLocaleDateString()}`,
        type: 'Automated Scan',
        generatedDate: currentDate.toISOString().replace('T', ' ').substr(0, 19),
        size: `${(Math.random() * 5 + 1).toFixed(1)} MB`,
        format: 'PDF',
        status: 'Ready'
      }

      // Only add new report if it's different from the last one
      if (newReport.id !== lastReportId) {
        lastReportId = newReport.id
        setReports(prev => [newReport, ...prev.slice(0, 9)]) // Keep only last 10 reports
        toast({
          title: "New Report Available",
          description: `${newReport.name} has been generated`,
        })
      }
    }

    const pollTimer = setInterval(checkForNewReports, pollInterval)

    return () => clearInterval(pollTimer)
  }, [toast])

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 10MB",
          variant: "destructive"
        })
        return
      }
      setUploadedFile(file)
      toast({
        title: "File uploaded",
        description: "Your log file has been uploaded successfully"
      })
    }
  }, [toast])

  const generateReportContent = (type: string, logContent?: string) => {
    const date = new Date().toISOString().split('T')[0]
    const content = []
    
    content.push(`Security Report - ${type}`)
    content.push(`Generated on: ${date}\n`)
    
    if (logContent) {
      content.push('Log Analysis Results:')
      // Basic log analysis simulation
      const events = logContent.split('\n').length
      const errors = logContent.match(/error/gi)?.length || 0
      const warnings = logContent.match(/warning/gi)?.length || 0
      
      content.push(`Total Events Analyzed: ${events}`)
      content.push(`Critical Errors Found: ${errors}`)
      content.push(`Warnings Detected: ${warnings}`)
      content.push('\nDetailed Findings:')
      
      // Add some sample analysis
      if (errors > 0) content.push('- High priority: Multiple system errors detected')
      if (warnings > 0) content.push('- Medium priority: Security warnings present')
      content.push('- Info: Normal system operations detected')
    } else {
      content.push('Standard Security Report')
      content.push('System Status: Normal')
      content.push('Threat Level: Low')
      content.push('Security Recommendations:')
      content.push('- Continue monitoring system logs')
      content.push('- Update security protocols regularly')
      content.push('- Review access controls monthly')
    }
    
    return content.join('\n')
  }

  const generateReport = async (type: string, customData?: File) => {
    setGeneratingReport(true)
    try {
      // Simulate API call with 2 second delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      let reportContent = ''
      if (customData) {
        const reader = new FileReader()
        reader.onload = async (e) => {
          const text = e.target?.result as string
          reportContent = generateReportContent(type, text)
          
          // Create blob and download
          const blob = new Blob([reportContent], { type: 'text/plain' })
          const url = window.URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = `security-report-${new Date().getTime()}.txt`
          document.body.appendChild(a)
          a.click()
          window.URL.revokeObjectURL(url)
          document.body.removeChild(a)
          
          toast({
            title: "Report generated",
            description: "Your custom log report has been generated and downloaded"
          })
        }
        reader.readAsText(customData)
      } else {
        reportContent = generateReportContent(type)
        
        // Create blob and download
        const timestamp = new Date().getTime()
        const fileName = `security-report-${timestamp}.txt`
        const blob = new Blob([reportContent], { type: 'text/plain' })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = fileName
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
        
        // Add to recent reports
        const newReport = {
          id: `RPT-${Math.random().toString(36).substr(2, 9)}`,
          name: `${type} Report`,
          type: 'Generated Report',
          generatedDate: new Date().toISOString().replace('T', ' ').substr(0, 19),
          size: `${(blob.size / 1024).toFixed(1)} KB`,
          format: 'TXT',
          status: 'Ready'
        }
        
        setReports(prev => [newReport, ...prev.slice(0, 9)])
        
        toast({
          title: "Report generated",
          description: `Your ${type} report has been generated and downloaded`
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate report. Please try again.",
        variant: "destructive"
      })
    } finally {
      setGeneratingReport(false)
    }
  }

  const handleCustomReportGeneration = async () => {
    if (!selectedReportType || !selectedTimePeriod || !selectedFormat) {
      toast({
        title: "Missing information",
        description: "Please select all required fields",
        variant: "destructive"
      })
      return
    }
    await generateReport('custom')
  }

  const downloadReport = async (report: typeof reports[0]) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Generate sample content for the report
      const content = [
        `Security Report - ${report.name}`,
        `Generated Date: ${report.generatedDate}`,
        `Report ID: ${report.id}`,
        `Type: ${report.type}\n`,
        'Executive Summary:',
        '- No critical security issues detected',
        '- System performance within normal parameters',
        '- Compliance requirements met\n',
        'Detailed Findings:',
        '1. Security Metrics',
        '   - Threat detection rate: 99.9%',
        '   - False positive rate: 0.1%',
        '   - Average response time: 1.2s\n',
        '2. System Health',
        '   - CPU utilization: Normal',
        '   - Memory usage: Optimal',
        '   - Network traffic: Regular\n',
        'Recommendations:',
        '- Continue monitoring system logs',
        '- Schedule next security audit',
        '- Review access control policies'
      ].join('\n')

      // Create blob and download
      const blob = new Blob([content], { type: 'text/plain' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${report.name.toLowerCase().replace(/\s+/g, '-')}.txt`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)

      toast({
        title: "Download complete",
        description: "Your report has been downloaded successfully"
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download report",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const reportTemplates = [
    {
      name: 'Security Posture Assessment',
      description: 'Comprehensive overview of your organization\'s security status',
      frequency: 'Monthly',
      lastGenerated: '2024-01-10',
      type: 'Security'
    },
    {
      name: 'Threat Intelligence Report',
      description: 'Latest threat landscape and intelligence updates',
      frequency: 'Weekly',
      lastGenerated: '2024-01-12',
      type: 'Intelligence'
    },
    {
      name: 'Incident Response Summary',
      description: 'Summary of security incidents and response effectiveness',
      frequency: 'Monthly',
      lastGenerated: '2024-01-08',
      type: 'Incidents'
    },
    {
      name: 'Compliance Audit Report',
      description: 'Regulatory compliance status and audit findings',
      frequency: 'Quarterly',
      lastGenerated: '2024-01-01',
      type: 'Compliance'
    }
  ]

  // Report templates array is kept separate from the dynamic reports
  const recentReportTemplates = []

  const metrics = [
    {
      title: 'Reports Generated',
      value: '147',
      change: '+12 this month',
      icon: FileText
    },
    {
      title: 'Automated Reports',
      value: '89%',
      change: '+5% efficiency',
      icon: BarChart3
    },
    {
      title: 'Compliance Score',
      value: '98.5%',
      change: '+2.1% improved',
      icon: Shield
    },
    {
      title: 'Report Downloads',
      value: '432',
      change: '+18% this month',
      icon: TrendingUp
    }
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Security': return 'bg-cyber-primary text-background'
      case 'Intelligence': return 'bg-cyber-warning text-background'
      case 'Incidents': return 'bg-cyber-danger text-background'
      case 'Compliance': return 'bg-cyber-secondary text-background'
      default: return 'bg-muted text-foreground'
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
                  Security Reports
                </h1>
                <p className="text-muted-foreground">
                  Generate and manage comprehensive security reports
                </p>
              </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {metrics.map((metric, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {metric.title}
                    </CardTitle>
                    <metric.icon className="h-4 w-4 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{metric.value}</div>
                    <p className="text-xs text-muted-foreground">
                      {metric.change}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Tabs defaultValue="generate" className="space-y-6">
              <TabsList>
                <TabsTrigger value="generate">Generate Reports</TabsTrigger>
                <TabsTrigger value="recent">Recent Reports</TabsTrigger>
                <TabsTrigger value="schedule">Scheduled Reports</TabsTrigger>
              </TabsList>

              <TabsContent value="generate" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Custom Report Generator</CardTitle>
                    <CardDescription>
                      Create custom security reports based on your requirements
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <Select value={selectedReportType} onValueChange={setSelectedReportType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Report Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="security">Security Overview</SelectItem>
                          <SelectItem value="threats">Threat Analysis</SelectItem>
                          <SelectItem value="incidents">Incident Summary</SelectItem>
                          <SelectItem value="compliance">Compliance Report</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select value={selectedTimePeriod} onValueChange={setSelectedTimePeriod}>
                        <SelectTrigger>
                          <SelectValue placeholder="Time Period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="24h">Last 24 Hours</SelectItem>
                          <SelectItem value="7d">Last 7 Days</SelectItem>
                          <SelectItem value="30d">Last 30 Days</SelectItem>
                          <SelectItem value="90d">Last 90 Days</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                        <SelectTrigger>
                          <SelectValue placeholder="Format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pdf">PDF</SelectItem>
                          <SelectItem value="excel">Excel</SelectItem>
                          <SelectItem value="csv">CSV</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <Button
                          onClick={handleCustomReportGeneration}
                          disabled={generatingReport || !selectedReportType || !selectedTimePeriod || !selectedFormat}
                          className="w-full md:w-auto"
                        >
                          {generatingReport ? (
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          ) : (
                            <FileText className="h-4 w-4 mr-2" />
                          )}
                          Generate Report
                        </Button>
                      </div>

                      <div className="flex flex-col space-y-2">
                        <p className="text-sm text-muted-foreground">Or upload your log file for analysis</p>
                        <div className="flex items-center space-x-4">
                          <input
                            type="file"
                            id="log-file"
                            className="hidden"
                            accept=".log,.txt"
                            onChange={handleFileUpload}
                          />
                          <Button
                            variant="outline"
                            onClick={() => document.getElementById('log-file')?.click()}
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            Upload Log File
                          </Button>
                          {uploadedFile && (
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-muted-foreground">
                                {uploadedFile.name}
                              </span>
                              <Button
                                onClick={() => generateReport('custom', uploadedFile)}
                                disabled={generatingReport}
                              >
                                {generatingReport ? (
                                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                ) : (
                                  <FileText className="h-4 w-4 mr-2" />
                                )}
                                Analyze Log
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {reportTemplates.map((template, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">{template.name}</CardTitle>
                            <CardDescription className="mt-2">
                              {template.description}
                            </CardDescription>
                          </div>
                          <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${getTypeColor(template.type)}`}>
                            {template.type}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Frequency:</span>
                            <span className="text-foreground">{template.frequency}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Last Generated:</span>
                            <span className="text-foreground">{template.lastGenerated}</span>
                          </div>
                        </div>
                        <Button
                          className="w-full"
                          variant="outline"
                          onClick={() => generateReport(template.name)}
                          disabled={generatingReport}
                        >
                          {generatingReport ? (
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          ) : (
                            'Generate Now'
                          )}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="recent" className="space-y-4">
                {reports.length === 0 ? (
                  <Card>
                    <CardContent className="p-6 text-center">
                      <p className="text-muted-foreground">No reports available yet</p>
                    </CardContent>
                  </Card>
                ) : (
                  reports.map((report) => (
                    <Card key={report.id}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <FileText className="h-8 w-8 text-primary" />
                            <div>
                              <h3 className="text-lg font-semibold text-foreground">{report.name}</h3>
                              <p className="text-sm text-muted-foreground">{report.type}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <p className="text-sm text-muted-foreground">Generated</p>
                              <p className="text-sm font-medium text-foreground">{report.generatedDate}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-muted-foreground">Size</p>
                              <p className="text-sm font-medium text-foreground">{report.size}</p>
                            </div>
                            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                              {report.format}
                            </div>
                            <Button
                              size="sm"
                              onClick={() => downloadReport(report)}
                              disabled={loading}
                            >
                              {loading ? (
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              ) : (
                                <Download className="h-4 w-4 mr-2" />
                              )}
                              Download
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>

              <TabsContent value="schedule" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Scheduled Report Management</CardTitle>
                    <CardDescription>
                      Manage automated report generation schedules
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {reportTemplates.map((template, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                          <div className="flex items-center space-x-4">
                            <Calendar className="h-5 w-5 text-primary" />
                            <div>
                              <h4 className="font-medium text-foreground">{template.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                Runs {template.frequency.toLowerCase()}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                              Active
                            </div>
                            <Button variant="outline" size="sm">
                              Configure
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            </div>
          </div>
        </CyberBackground>
      </SignedIn>
    </>
  )
}

export default Reports