import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react'
import { AlertTriangle, Shield, FileSearch, Users, TrendingUp, Clock } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import CyberBackground from '@/components/ui/cyber-background'

const Dashboard = () => {
  const getTimeDuration = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    
    if (diffMins < 1) return 'just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    return `${Math.floor(diffHours / 24)}d ago`
  }

  const stats = [
    {
      title: 'Active Threats',
      value: '7',
      icon: AlertTriangle,
      color: 'text-cyber-danger'
    },
    {
      title: 'Systems Protected',
      value: '6',
      icon: Shield,
      color: 'text-cyber-secondary'
    },
    {
      title: 'Logs Analyzed',
      value: '10',
      icon: FileSearch,
      color: 'text-primary'
    },
    {
      title: 'Response Time',
      value: '1.8s',
      icon: Clock,
      color: 'text-cyber-warning'
    }
  ]

  const recentAlerts = [
    {
      id: 1,
      type: 'Critical',
      message: 'Multiple privilege escalation attempts detected against /admin/config on appliance. Source IP not in allowlist. Successful shell established for 00:00:12',
      time: '20:47:48',
      status: 'investigating',
      detectedAt: new Date(Date.now() - 45 * 60000) // 45 minutes ago
    },
    {
      id: 2,
      type: 'High',
      message: 'Database read queries executed at high volume by account "sales_rep" outside normal hours; queries include export of PII fields. Originating session from IP 192.0.2.58 (unrecognized)',
      time: '17:51:26',
      status: 'investigating',
      detectedAt: new Date(Date.now() - 2 * 60 * 60000) // 2 hours ago
    },
    {
      id: 3,
      type: 'Low',
      message: 'Successful interactive login to VPN portal from device ID "Win10-Personal-7F" (not in corporate device registry). Geo: unknown; MFA bypass not detected',
      time: '18:34:12',
      status: 'monitoring',
      detectedAt: new Date(Date.now() - 10 * 60000) // 10 minutes ago
    }
  ]

  const systemStatus = [
    { name: 'Appliance/Admin Config', status: 'warning', uptime: 78.2, context: 'Multiple privilege escalation attempts detected - system operational but under active threat' },
    { name: 'Database Cluster', status: 'warning', uptime: 89.1, context: 'Suspicious database queries and PII export activity - data integrity at risk' },
    { name: 'VPN Portal', status: 'healthy', uptime: 99.8, context: 'Unrecognized device login detected but system operating normally' },
    { name: 'Web Servers', status: 'warning', uptime: 82.5, context: 'Multiple high-severity threats detected - service experiencing degradation' },
    { name: 'API Gateway', status: 'warning', uptime: 86.3, context: 'Network intrusion attempts detected - rate limiting active' },
    { name: 'File Servers', status: 'warning', uptime: 75.8, context: 'Critical data exfiltration attempt detected - access restricted' }
  ]

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
                  Security Dashboard
                </h1>
                <p className="text-muted-foreground">
                  Real-time overview of your cybersecurity posture
                </p>
              </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {stat.title}
                    </CardTitle>
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Alerts */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Security Alerts</CardTitle>
                  <CardDescription>
                    Latest threats detected by our AI system
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentAlerts.map((alert) => (
                      <div key={alert.id} className="flex items-start space-x-4 p-4 border border-border rounded-lg">
                        <AlertTriangle className={`h-5 w-5 mt-0.5 ${
                          alert.type === 'Critical' ? 'text-red-500' :
                          alert.type === 'High' ? 'text-yellow-500' : 'text-green-500'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <Badge variant={
                              alert.type === 'Critical' ? 'destructive' :
                              alert.type === 'High' ? 'default' : 'default'
                            } className={
                              alert.type === 'Critical' ? 'text-black' :
                              alert.type === 'High' ? 'bg-yellow-500 text-black hover:bg-yellow-600' :
                              alert.type === 'Low' ? 'bg-green-500 text-black hover:bg-green-600' : ''
                            }>
                              {alert.type}
                            </Badge>
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline" className={
                                alert.type === 'Critical' ? 'bg-red-500/10 border-red-500/30' :
                                alert.type === 'High' ? 'bg-yellow-500/10 border-yellow-500/30' :
                                'bg-green-500/10 border-green-500/30'
                              }>
                                {alert.status.charAt(0).toUpperCase() + alert.status.slice(1)} • {getTimeDuration(alert.detectedAt)}
                              </Badge>
                              <span className="text-xs text-muted-foreground">{alert.time}</span>
                            </div>
                          </div>
                          <p className="text-sm text-foreground mt-1">{alert.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* System Status */}
              <Card>
                <CardHeader>
                  <CardTitle>System Health</CardTitle>
                  <CardDescription>
                    Current status of protected systems
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <TooltipProvider>
                    <div className="space-y-4">
                      {systemStatus.map((system, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{system.name}</span>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Badge variant="outline" className={
                                  system.status === 'healthy' ? 'bg-green-500/10 border-green-500/30 text-green-700' :
                                  system.status === 'warning' ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-700' :
                                  'bg-red-500/10 border-red-500/30 text-red-700'
                                }>
                                  {system.status.charAt(0).toUpperCase() + system.status.slice(1)}
                                </Badge>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="max-w-xs">{system.context}</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex items-center space-x-2 cursor-help">
                                <Progress 
                                  value={system.uptime} 
                                  className={
                                    system.status === 'healthy' ? '[&>*]:bg-green-500' :
                                    system.status === 'warning' ? '[&>*]:bg-yellow-500' :
                                    '[&>*]:bg-red-500'
                                  }
                                />
                                <span className="text-xs text-muted-foreground w-12">
                                  {system.uptime}%
                                </span>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">{system.context}</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      ))}
                    </div>
                  </TooltipProvider>
                </CardContent>
              </Card>
            </div>
            </div>
          </div>
        </CyberBackground>
      </SignedIn>
    </>
  )
}

export default Dashboard