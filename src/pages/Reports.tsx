import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react'
import { Download, Calendar, FileText, BarChart3, TrendingUp, Shield } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const Reports = () => {
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

  const recentReports = [
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
        <div className="min-h-screen bg-background p-6">
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
                      <Select>
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
                      <Select>
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
                      <Select>
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
                    <Button className="w-full md:w-auto">
                      <FileText className="h-4 w-4 mr-2" />
                      Generate Report
                    </Button>
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
                          <Badge className={getTypeColor(template.type)}>
                            {template.type}
                          </Badge>
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
                        <Button className="w-full" variant="outline">
                          Generate Now
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="recent" className="space-y-4">
                {recentReports.map((report) => (
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
                          <Badge variant="outline">{report.format}</Badge>
                          <Button size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
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
                            <Badge variant="outline">Active</Badge>
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
      </SignedIn>
    </>
  )
}

export default Reports