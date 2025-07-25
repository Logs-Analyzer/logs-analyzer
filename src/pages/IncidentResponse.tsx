import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react'
import { Play, Pause, RefreshCw, AlertCircle, CheckCircle, Clock, User } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const IncidentResponse = () => {
  const activeIncidents = [
    {
      id: 'INC-001',
      title: 'Critical Malware Detection',
      severity: 'Critical',
      status: 'In Progress',
      assignee: 'Security Team Alpha',
      progress: 65,
      startTime: '2024-01-15 14:20:00',
      estimatedCompletion: '2024-01-15 16:30:00',
      steps: [
        { name: 'Threat Identification', status: 'completed' },
        { name: 'System Isolation', status: 'completed' },
        { name: 'Malware Analysis', status: 'in-progress' },
        { name: 'System Cleanup', status: 'pending' },
        { name: 'Security Validation', status: 'pending' }
      ]
    },
    {
      id: 'INC-002',
      title: 'Phishing Campaign Response',
      severity: 'High',
      status: 'In Progress',
      assignee: 'Security Team Beta',
      progress: 40,
      startTime: '2024-01-15 13:15:00',
      estimatedCompletion: '2024-01-15 17:00:00',
      steps: [
        { name: 'Email Analysis', status: 'completed' },
        { name: 'User Notification', status: 'completed' },
        { name: 'Domain Blocking', status: 'in-progress' },
        { name: 'User Training', status: 'pending' },
        { name: 'Monitoring Enhancement', status: 'pending' }
      ]
    }
  ]

  const completedIncidents = [
    {
      id: 'INC-003',
      title: 'DDoS Attack Mitigation',
      severity: 'Medium',
      status: 'Resolved',
      duration: '45 minutes',
      completedAt: '2024-01-15 12:30:00'
    },
    {
      id: 'INC-004',
      title: 'Unauthorized Access Attempt',
      severity: 'High',
      status: 'Resolved',
      duration: '2 hours 15 minutes',
      completedAt: '2024-01-15 10:45:00'
    }
  ]

  const playbooks = [
    {
      name: 'Malware Response',
      description: 'Automated response for malware detection and removal',
      triggers: 12,
      avgTime: '2.5 hours'
    },
    {
      name: 'Data Breach Protocol',
      description: 'Comprehensive data breach response and notification',
      triggers: 3,
      avgTime: '6 hours'
    },
    {
      name: 'Phishing Response',
      description: 'Email security incident response and user protection',
      triggers: 18,
      avgTime: '1.5 hours'
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

  const getStepIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-cyber-secondary" />
      case 'in-progress': return <RefreshCw className="h-4 w-4 text-primary animate-spin" />
      default: return <Clock className="h-4 w-4 text-muted-foreground" />
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
                Incident Response
              </h1>
              <p className="text-muted-foreground">
                Automated incident response and management center
              </p>
            </div>

            <Tabs defaultValue="active" className="space-y-6">
              <TabsList>
                <TabsTrigger value="active">Active Incidents</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="playbooks">Response Playbooks</TabsTrigger>
              </TabsList>

              <TabsContent value="active" className="space-y-6">
                {activeIncidents.map((incident) => (
                  <Card key={incident.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center space-x-2">
                            <AlertCircle className={`h-5 w-5 ${getSeverityColor(incident.severity)}`} />
                            <span>{incident.title}</span>
                          </CardTitle>
                          <CardDescription className="mt-1">
                            {incident.id} • Started {incident.startTime}
                          </CardDescription>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="default">{incident.status}</Badge>
                          <Badge variant="outline" className={getSeverityColor(incident.severity)}>
                            {incident.severity}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <span className="text-sm font-medium text-muted-foreground">Assignee:</span>
                            <p className="text-sm text-foreground flex items-center">
                              <User className="h-4 w-4 mr-1" />
                              {incident.assignee}
                            </p>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-muted-foreground">Progress:</span>
                            <div className="flex items-center space-x-2 mt-1">
                              <Progress value={incident.progress} className="flex-1" />
                              <span className="text-sm text-foreground">{incident.progress}%</span>
                            </div>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-muted-foreground">ETC:</span>
                            <p className="text-sm text-foreground">{incident.estimatedCompletion}</p>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-foreground mb-2">Response Steps:</h4>
                          <div className="space-y-2">
                            {incident.steps.map((step, index) => (
                              <div key={index} className="flex items-center space-x-3 p-2 rounded border border-border">
                                {getStepIcon(step.status)}
                                <span className={`text-sm ${
                                  step.status === 'completed' ? 'text-muted-foreground line-through' : 'text-foreground'
                                }`}>
                                  {step.name}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex justify-between">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Pause className="h-4 w-4 mr-2" />
                              Pause
                            </Button>
                            <Button variant="outline" size="sm">
                              <RefreshCw className="h-4 w-4 mr-2" />
                              Restart
                            </Button>
                          </div>
                          <Button size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="completed" className="space-y-4">
                {completedIncidents.map((incident) => (
                  <Card key={incident.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <CheckCircle className="h-6 w-6 text-cyber-secondary" />
                          <div>
                            <h3 className="text-lg font-semibold text-foreground">{incident.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {incident.id} • Completed {incident.completedAt}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="text-sm font-medium text-foreground">Duration</p>
                            <p className="text-sm text-muted-foreground">{incident.duration}</p>
                          </div>
                          <Badge variant="outline" className={getSeverityColor(incident.severity)}>
                            {incident.severity}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="playbooks" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {playbooks.map((playbook, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Play className="h-5 w-5 text-primary" />
                          <span>{playbook.name}</span>
                        </CardTitle>
                        <CardDescription>{playbook.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Triggers this month:</span>
                            <span className="text-sm font-medium text-foreground">{playbook.triggers}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Avg response time:</span>
                            <span className="text-sm font-medium text-foreground">{playbook.avgTime}</span>
                          </div>
                        </div>
                        <Button className="w-full mt-4" variant="outline">
                          Configure Playbook
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </SignedIn>
    </>
  )
}

export default IncidentResponse