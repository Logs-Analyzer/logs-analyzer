import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react'
import { AlertTriangle, Shield, Activity, Users, TrendingUp, Clock } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import CyberBackground from '@/components/ui/cyber-background'

const Dashboard = () => {
  const stats = [
    {
      title: 'Active Threats',
      value: '3',
      change: '-2 from yesterday',
      icon: AlertTriangle,
      color: 'text-cyber-danger'
    },
    {
      title: 'Systems Protected',
      value: '127',
      change: '+5 this week',
      icon: Shield,
      color: 'text-cyber-secondary'
    },
    {
      title: 'Logs Analyzed',
      value: '2.4M',
      change: '+12% this month',
      icon: Activity,
      color: 'text-primary'
    },
    {
      title: 'Response Time',
      value: '1.2s',
      change: '-0.3s improved',
      icon: Clock,
      color: 'text-cyber-warning'
    }
  ]

  const recentAlerts = [
    {
      id: 1,
      type: 'Critical',
      message: 'Suspicious login attempt from unknown IP',
      time: '2 minutes ago',
      status: 'investigating'
    },
    {
      id: 2,
      type: 'High',
      message: 'Unusual network traffic pattern detected',
      time: '15 minutes ago',
      status: 'resolved'
    },
    {
      id: 3,
      type: 'Medium',
      message: 'Failed authentication attempts threshold exceeded',
      time: '1 hour ago',
      status: 'monitoring'
    }
  ]

  const systemStatus = [
    { name: 'Web Servers', status: 'healthy', uptime: 99.9 },
    { name: 'Database Cluster', status: 'healthy', uptime: 100 },
    { name: 'API Gateway', status: 'warning', uptime: 98.5 },
    { name: 'File Servers', status: 'healthy', uptime: 99.7 }
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
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground">
                      {stat.change}
                    </p>
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
                          alert.type === 'Critical' ? 'text-cyber-danger' :
                          alert.type === 'High' ? 'text-cyber-warning' : 'text-cyber-secondary'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <Badge variant={
                              alert.type === 'Critical' ? 'destructive' :
                              alert.type === 'High' ? 'default' : 'secondary'
                            }>
                              {alert.type}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{alert.time}</span>
                          </div>
                          <p className="text-sm text-foreground mt-1">{alert.message}</p>
                          <Badge variant="outline" className="mt-2">
                            {alert.status}
                          </Badge>
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
                  <div className="space-y-4">
                    {systemStatus.map((system, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{system.name}</span>
                          <Badge variant={
                            system.status === 'healthy' ? 'default' :
                            system.status === 'warning' ? 'secondary' : 'destructive'
                          }>
                            {system.status}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Progress value={system.uptime} className="flex-1" />
                          <span className="text-xs text-muted-foreground w-12">
                            {system.uptime}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
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