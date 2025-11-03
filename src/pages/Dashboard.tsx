import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react'
import { AlertTriangle, Shield, FileSearch, Users, TrendingUp, Clock, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import CyberBackground from '@/components/ui/cyber-background'
import { useThreatAnalysis } from '@/contexts/ThreatAnalysisContext'

const Dashboard = () => {
  const { analysisResults, enhancedThreats } = useThreatAnalysis()
  
  // Check if we have any analysis data
  const hasData = analysisResults.length > 0 || enhancedThreats.length > 0
  
  // Calculate actual stats from threat analysis data
  const allThreats = enhancedThreats.length > 0 ? enhancedThreats : 
                     analysisResults.flatMap(result => result.threats || [])
  
  const criticalThreats = allThreats.filter(t => t.severity?.toLowerCase().includes('critical')).length
  const highThreats = allThreats.filter(t => t.severity?.toLowerCase().includes('high')).length
  const activeThreatsCount = criticalThreats + highThreats
  
  const systemsAffected = new Set(allThreats.map(t => t.target)).size
  const totalLogsAnalyzed = analysisResults.reduce((sum, result) => sum + (result.threatsFound || 0), 0)
  
  // Get home fixable count
  const homeFixableCount = allThreats.filter(t => 
    t.detailedAnalysis?.isHomeFixable === true
  ).length
  
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
      value: hasData ? activeThreatsCount.toString() : 'N/A',
      icon: AlertTriangle,
      color: 'text-cyber-danger',
      unavailable: !hasData
    },
    {
      title: 'Systems Affected',
      value: hasData ? systemsAffected.toString() : 'N/A',
      icon: Shield,
      color: 'text-cyber-secondary',
      unavailable: !hasData
    },
    {
      title: 'Threats Found',
      value: hasData ? allThreats.length.toString() : 'N/A',
      icon: FileSearch,
      color: 'text-primary',
      unavailable: !hasData
    },
    {
      title: 'Home Fixable',
      value: hasData ? homeFixableCount.toString() : 'N/A',
      icon: Clock,
      color: 'text-cyber-warning',
      unavailable: !hasData
    }
  ]

  // Get actual recent alerts from threat data
  const recentAlerts = hasData ? allThreats
    .sort((a, b) => {
      const severityOrder: Record<string, number> = { 'critical': 0, 'high': 1, 'medium': 2, 'low': 3 }
      return (severityOrder[a.severity?.toLowerCase()] || 999) - (severityOrder[b.severity?.toLowerCase()] || 999)
    })
    .slice(0, 3)
    .map(threat => {
      // Clean the description by removing timestamp and log level markers
      let cleanDescription = threat.description || 'No description available'
      // Remove timestamp patterns like "2025-08-18 12:31:16"
      cleanDescription = cleanDescription.replace(/^\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2}\s*/, '')
      // Remove log level markers like [ERROR], [INFO], [CRITICAL], etc.
      cleanDescription = cleanDescription.replace(/^\[([A-Z]+)\]\s*-?\s*/, '')
      
      return {
        id: threat.id,
        type: threat.severity || 'Unknown',
        message: cleanDescription,
        status: threat.status || 'detected',
        detectedAt: new Date(threat.timestamp)
      }
    }) : []

  // Calculate system status from threat data
  const systemStatus = hasData ? (() => {
    const systemsMap = new Map<string, { threats: any[], highestSeverity: string }>()
    
    allThreats.forEach(threat => {
      const target = threat.target || 'Unknown System'
      if (!systemsMap.has(target)) {
        systemsMap.set(target, { threats: [], highestSeverity: 'Low' })
      }
      const system = systemsMap.get(target)!
      system.threats.push(threat)
      
      const severityOrder: Record<string, number> = { 'critical': 0, 'high': 1, 'medium': 2, 'low': 3 }
      const currentSeverity = threat.severity?.toLowerCase() || 'low'
      const storedSeverity = system.highestSeverity.toLowerCase()
      
      if ((severityOrder[currentSeverity] || 999) < (severityOrder[storedSeverity] || 999)) {
        system.highestSeverity = threat.severity
      }
    })
    
    return Array.from(systemsMap.entries()).map(([name, data]) => {
      const severity = data.highestSeverity.toLowerCase()
      const threatCount = data.threats.length
      
      return {
        name,
        status: severity === 'critical' || severity === 'high' ? 'warning' : 
                severity === 'medium' ? 'warning' : 'healthy',
        uptime: severity === 'critical' ? 75 : severity === 'high' ? 85 : severity === 'medium' ? 92 : 98,
        context: `${threatCount} threat${threatCount > 1 ? 's' : ''} detected (${data.highestSeverity} severity)`
      }
    })
  })() : []

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
                <Card key={index} className={stat.unavailable ? 'opacity-60' : ''}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {stat.title}
                    </CardTitle>
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    {stat.unavailable && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Unavailable before threat analysis
                      </p>
                    )}
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
                  {!hasData ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        No Analysis Data Available
                      </h3>
                      <p className="text-sm text-muted-foreground max-w-md">
                        Unavailable before threat analysis. Please upload and analyze log files to view security alerts.
                      </p>
                    </div>
                  ) : recentAlerts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <Shield className="h-12 w-12 text-green-500 mb-4" />
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        No Active Threats
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Your systems are secure and no threats have been detected.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {recentAlerts.map((alert) => (
                      <div key={alert.id} className="flex items-start space-x-4 p-4 border border-border rounded-lg">
                        <AlertTriangle className={`h-5 w-5 mt-0.5 ${
                          alert.type === 'Critical' ? 'text-red-500' :
                          alert.type === 'High' ? 'text-yellow-500' : 'text-green-500'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant={
                              alert.type === 'Critical' ? 'destructive' :
                              alert.type === 'High' ? 'default' : 'default'
                            } className={
                              alert.type === 'Critical' ? 'text-black' :
                              alert.type === 'High' ? 'bg-yellow-500 text-black hover:bg-yellow-600' :
                              alert.type === 'Medium' ? 'bg-orange-400 text-black hover:bg-orange-500' :
                              alert.type === 'Low' ? 'bg-green-500 text-black hover:bg-green-600' : ''
                            }>
                              {alert.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-foreground">{alert.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  )}
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
                  {!hasData ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        No System Data Available
                      </h3>
                      <p className="text-sm text-muted-foreground max-w-md">
                        Unavailable before threat analysis. System health status will appear after analyzing log files.
                      </p>
                    </div>
                  ) : systemStatus.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <Shield className="h-12 w-12 text-green-500 mb-4" />
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        All Systems Healthy
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        No affected systems detected.
                      </p>
                    </div>
                  ) : (
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
                  )}
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