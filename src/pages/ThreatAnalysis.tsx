import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react'
import { Search, Filter, Download, AlertTriangle, Eye, Clock } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const ThreatAnalysis = () => {
  const threats = [
    {
      id: 'THR-001',
      type: 'Malware',
      severity: 'Critical',
      source: '192.168.1.45',
      target: 'Web Server 01',
      description: 'Advanced persistent threat detected attempting privilege escalation',
      timestamp: '2024-01-15 14:23:45',
      status: 'Active',
      confidence: 97
    },
    {
      id: 'THR-002',
      type: 'Phishing',
      severity: 'High',
      source: 'email.suspicious-domain.com',
      target: 'User Network',
      description: 'Sophisticated phishing campaign targeting employee credentials',
      timestamp: '2024-01-15 13:15:22',
      status: 'Investigating',
      confidence: 89
    },
    {
      id: 'THR-003',
      type: 'DDoS',
      severity: 'Medium',
      source: 'Multiple IPs',
      target: 'Load Balancer',
      description: 'Distributed denial of service attack pattern identified',
      timestamp: '2024-01-15 12:08:10',
      status: 'Mitigated',
      confidence: 92
    },
    {
      id: 'THR-004',
      type: 'Data Exfiltration',
      severity: 'High',
      source: 'Internal Network',
      target: 'Database Server',
      description: 'Unusual data access patterns suggesting potential data theft',
      timestamp: '2024-01-15 11:45:33',
      status: 'Resolved',
      confidence: 85
    }
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'text-cyber-danger'
      case 'High': return 'text-cyber-warning'
      case 'Medium': return 'text-cyber-secondary'
      default: return 'text-muted-foreground'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'destructive'
      case 'Investigating': return 'default'
      case 'Mitigated': return 'secondary'
      case 'Resolved': return 'outline'
      default: return 'secondary'
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
                Threat Analysis
              </h1>
              <p className="text-muted-foreground">
                AI-powered threat detection and analysis dashboard
              </p>
            </div>

            {/* Filters and Search */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Filter Threats</CardTitle>
                <CardDescription>
                  Customize your threat analysis view
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search threats, IPs, or descriptions..."
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select>
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue placeholder="Severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Severities</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="investigating">Investigating</SelectItem>
                      <SelectItem value="mitigated">Mitigated</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Apply
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Threats List */}
            <div className="space-y-4">
              {threats.map((threat) => (
                <Card key={threat.id} className="hover:border-primary/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <AlertTriangle className={`h-6 w-6 ${getSeverityColor(threat.severity)}`} />
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">{threat.id}</h3>
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

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{threat.timestamp}</span>
                      </div>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </SignedIn>
    </>
  )
}

export default ThreatAnalysis