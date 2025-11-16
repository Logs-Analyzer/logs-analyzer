import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react'
import { Save, Bell, Shield, Users, Database, Smartphone, Palette, Globe, Download, Upload, Clock, Zap, Activity, FileText, Eye, EyeOff, RefreshCw, Settings as SettingsIcon, Moon, Sun, Monitor, Check } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { useState, useEffect } from 'react'
import { useToast } from '@/hooks/use-toast'
import CyberBackground from '@/components/ui/cyber-background'

const Settings = () => {
  const { toast } = useToast()
  
  // Load settings from localStorage on mount
  const loadSetting = (key: string, defaultValue: any) => {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : defaultValue
  }

  // Save setting to localStorage
  const saveSetting = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value))
    if (autoSave) {
      toast({
        title: "Setting saved",
        description: "Your changes have been saved automatically.",
        duration: 2000,
      })
    }
  }

  // Theme & Appearance
  const [themeMode, setThemeMode] = useState<'light' | 'dark' | 'system'>(() => loadSetting('themeMode', 'dark'))
  const [accentColor, setAccentColor] = useState(() => loadSetting('accentColor', 'blue'))
  const [highContrast, setHighContrast] = useState(() => loadSetting('highContrast', false))
  const [compactView, setCompactView] = useState(() => loadSetting('compactView', false))
  const [animations, setAnimations] = useState(() => loadSetting('animations', true))
  const [fontSize, setFontSize] = useState(() => loadSetting('fontSize', 'medium'))

  // System Preferences
  const [autoSave, setAutoSave] = useState(() => loadSetting('autoSave', true))
  const [showTooltips, setShowTooltips] = useState(() => loadSetting('showTooltips', true))
  const [keyboardShortcuts, setKeyboardShortcuts] = useState(() => loadSetting('keyboardShortcuts', true))
  const [soundEffects, setSoundEffects] = useState(() => loadSetting('soundEffects', false))

  // General Settings
  const [orgName, setOrgName] = useState(() => loadSetting('orgName', 'LOGS ANALYZER'))
  const [orgDomain, setOrgDomain] = useState(() => loadSetting('orgDomain', ''))
  const [orgDescription, setOrgDescription] = useState(() => loadSetting('orgDescription', ''))
  const [timezone, setTimezone] = useState(() => loadSetting('timezone', 'utc'))
  const [language, setLanguage] = useState(() => loadSetting('language', 'en'))
  const [dateFormat, setDateFormat] = useState(() => loadSetting('dateFormat', 'mdy'))

  // Appearance Additional
  const [showGridLines, setShowGridLines] = useState(() => loadSetting('showGridLines', true))
  const [sidebarPosition, setSidebarPosition] = useState(() => loadSetting('sidebarPosition', 'left'))

  // Security
  const [securityMode, setSecurityMode] = useState(() => loadSetting('securityMode', 'standard'))
  const [autoBlockIPs, setAutoBlockIPs] = useState(() => loadSetting('autoBlockIPs', true))
  const [realTimeScanning, setRealTimeScanning] = useState(() => loadSetting('realTimeScanning', true))
  const [incidentAutoResponse, setIncidentAutoResponse] = useState(() => loadSetting('incidentAutoResponse', true))
  const [require2FA, setRequire2FA] = useState(() => loadSetting('require2FA', true))
  const [maintenanceMode, setMaintenanceMode] = useState(() => loadSetting('maintenanceMode', false))
  const [learningMode, setLearningMode] = useState(() => loadSetting('learningMode', true))
  const [threatLevel, setThreatLevel] = useState(() => loadSetting('threatLevel', 'medium'))
  const [sessionTimeout, setSessionTimeout] = useState(() => loadSetting('sessionTimeout', '30'))
  const [ssoIntegration, setSsoIntegration] = useState(() => loadSetting('ssoIntegration', false))
  const [ipWhitelist, setIpWhitelist] = useState(() => loadSetting('ipWhitelist', false))
  const [geoBlocking, setGeoBlocking] = useState(() => loadSetting('geoBlocking', false))
  const [e2eEncryption, setE2eEncryption] = useState(() => loadSetting('e2eEncryption', true))
  const [dataAnonymization, setDataAnonymization] = useState(() => loadSetting('dataAnonymization', true))
  const [secureLogStorage, setSecureLogStorage] = useState(() => loadSetting('secureLogStorage', true))
  const [encryptionLevel, setEncryptionLevel] = useState(() => loadSetting('encryptionLevel', 'aes256'))

  // Notifications
  const [emailAlerts, setEmailAlerts] = useState(() => loadSetting('emailAlerts', true))
  const [pushNotifications, setPushNotifications] = useState(() => loadSetting('pushNotifications', true))
  const [smsAlerts, setSmsAlerts] = useState(() => loadSetting('smsAlerts', false))
  const [criticalOnly, setCriticalOnly] = useState(() => loadSetting('criticalOnly', false))
  const [dailyDigest, setDailyDigest] = useState(() => loadSetting('dailyDigest', true))

  // Data Management
  const [automaticBackups, setAutomaticBackups] = useState(() => loadSetting('automaticBackups', true))
  const [backupFrequency, setBackupFrequency] = useState(() => loadSetting('backupFrequency', 'daily'))
  const [backupRetention, setBackupRetention] = useState(() => loadSetting('backupRetention', '90'))
  const [cloudBackup, setCloudBackup] = useState(() => loadSetting('cloudBackup', true))
  const [logRetention, setLogRetention] = useState(() => loadSetting('logRetention', '90'))
  const [reportRetention, setReportRetention] = useState(() => loadSetting('reportRetention', '365'))
  const [autoDeleteOldData, setAutoDeleteOldData] = useState(() => loadSetting('autoDeleteOldData', true))

  // Advanced
  const [apiKeyVisible, setApiKeyVisible] = useState(false)
  const [debugMode, setDebugMode] = useState(() => loadSetting('debugMode', false))
  const [betaFeatures, setBetaFeatures] = useState(() => loadSetting('betaFeatures', false))
  const [aiEnhanced, setAiEnhanced] = useState(() => loadSetting('aiEnhanced', false))
  const [enableCaching, setEnableCaching] = useState(() => loadSetting('enableCaching', true))
  const [parallelProcessing, setParallelProcessing] = useState(() => loadSetting('parallelProcessing', true))

  // Apply theme changes in real-time
  useEffect(() => {
    saveSetting('themeMode', themeMode)
    
    // Apply theme to document
    const root = document.documentElement
    if (themeMode === 'dark') {
      root.classList.add('dark')
      root.classList.remove('light')
    } else if (themeMode === 'light') {
      root.classList.add('light')
      root.classList.remove('dark')
    } else {
      // System preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      root.classList.toggle('dark', prefersDark)
      root.classList.toggle('light', !prefersDark)
    }
  }, [themeMode])

  // Apply font size changes
  useEffect(() => {
    saveSetting('fontSize', fontSize)
    const root = document.documentElement
    const sizeMap = {
      small: '14px',
      medium: '16px',
      large: '18px',
      xlarge: '20px'
    }
    root.style.fontSize = sizeMap[fontSize as keyof typeof sizeMap] || '16px'
  }, [fontSize])

  // Apply compact view
  useEffect(() => {
    saveSetting('compactView', compactView)
    document.body.classList.toggle('compact-view', compactView)
  }, [compactView])

  // Apply high contrast
  useEffect(() => {
    saveSetting('highContrast', highContrast)
    document.body.classList.toggle('high-contrast', highContrast)
  }, [highContrast])

  // Apply animations
  useEffect(() => {
    saveSetting('animations', animations)
    document.body.classList.toggle('reduce-motion', !animations)
  }, [animations])

  // Apply timezone changes
  useEffect(() => {
    saveSetting('timezone', timezone)
    // Store timezone for use across the app
    document.documentElement.setAttribute('data-timezone', timezone)
  }, [timezone])

  // Apply language changes
  useEffect(() => {
    saveSetting('language', language)
    // Store language for use across the app
    document.documentElement.setAttribute('lang', language)
  }, [language])

  // Apply date format changes
  useEffect(() => {
    saveSetting('dateFormat', dateFormat)
    // Store date format for use across the app
    document.documentElement.setAttribute('data-date-format', dateFormat)
  }, [dateFormat])

  // Handle security mode changes
  const handleSecurityModeChange = (mode: string) => {
    setSecurityMode(mode)
    saveSetting('securityMode', mode)
    
    // Auto-configure settings based on mode
    if (mode === 'maximum') {
      setAutoBlockIPs(true)
      setRealTimeScanning(true)
      setIncidentAutoResponse(true)
      setRequire2FA(true)
      toast({
        title: "Maximum Security Mode",
        description: "All security features have been enabled.",
      })
    } else if (mode === 'strict') {
      setAutoBlockIPs(true)
      setRealTimeScanning(true)
      toast({
        title: "Strict Security Mode",
        description: "Enhanced security features enabled.",
      })
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
            <div className="max-w-6xl mx-auto">
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
                      <SettingsIcon className="h-8 w-8 text-cyber-primary" />
                      Settings
                    </h1>
                    <p className="text-muted-foreground">
                      Configure your LOGS ANALYZER security preferences and system behavior
                    </p>
                  </div>
                  {autoSave && (
                    <Badge variant="outline" className="flex items-center gap-2">
                      <RefreshCw className="h-3 w-3 animate-spin" />
                      Auto-saving enabled
                    </Badge>
                  )}
                </div>
              </div>

            <Tabs defaultValue="general" className="space-y-6">
              <TabsList className="grid w-full grid-cols-7 lg:grid-cols-7">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="appearance">Appearance</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="notifications">Alerts</TabsTrigger>
                <TabsTrigger value="data">Data</TabsTrigger>
                <TabsTrigger value="integrations">Integrations</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Organization Settings</CardTitle>
                    <CardDescription>
                      Manage your organization's basic information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="org-name">Organization Name</Label>
                        <Input 
                          id="org-name" 
                          placeholder="Enter organization name" 
                          value={orgName}
                          onChange={(e) => {
                            setOrgName(e.target.value)
                            if (autoSave) saveSetting('orgName', e.target.value)
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="domain">Primary Domain</Label>
                        <Input 
                          id="domain" 
                          placeholder="example.com" 
                          value={orgDomain}
                          onChange={(e) => {
                            setOrgDomain(e.target.value)
                            if (autoSave) saveSetting('orgDomain', e.target.value)
                          }}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea 
                        id="description" 
                        placeholder="Brief description of your organization" 
                        rows={3}
                        value={orgDescription}
                        onChange={(e) => {
                          setOrgDescription(e.target.value)
                          if (autoSave) saveSetting('orgDescription', e.target.value)
                        }}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="timezone">Timezone</Label>
                        <Select 
                          value={timezone} 
                          onValueChange={(value) => {
                            setTimezone(value)
                            toast({
                              title: "Timezone updated",
                              description: `Timezone changed to ${value.toUpperCase()}`,
                            })
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select timezone" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="utc">UTC (Coordinated Universal Time)</SelectItem>
                            <SelectItem value="est">EST (Eastern Standard Time)</SelectItem>
                            <SelectItem value="pst">PST (Pacific Standard Time)</SelectItem>
                            <SelectItem value="cet">CET (Central European Time)</SelectItem>
                            <SelectItem value="ist">IST (Indian Standard Time)</SelectItem>
                            <SelectItem value="jst">JST (Japan Standard Time)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="language">Language</Label>
                        <Select 
                          value={language} 
                          onValueChange={(value) => {
                            setLanguage(value)
                            const languageNames: Record<string, string> = {
                              en: 'English',
                              es: 'Español',
                              fr: 'Français',
                              de: 'Deutsch',
                              ja: '日本語',
                              zh: '中文'
                            }
                            toast({
                              title: "Language updated",
                              description: `Language changed to ${languageNames[value]}`,
                            })
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es">Español</SelectItem>
                            <SelectItem value="fr">Français</SelectItem>
                            <SelectItem value="de">Deutsch</SelectItem>
                            <SelectItem value="ja">日本語</SelectItem>
                            <SelectItem value="zh">中文</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date-format">Date Format</Label>
                      <Select 
                        value={dateFormat} 
                        onValueChange={(value) => {
                          setDateFormat(value)
                          const formatNames: Record<string, string> = {
                            mdy: 'MM/DD/YYYY (US)',
                            dmy: 'DD/MM/YYYY (EU)',
                            ymd: 'YYYY-MM-DD (ISO)'
                          }
                          toast({
                            title: "Date format updated",
                            description: `Format changed to ${formatNames[value]}`,
                          })
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select date format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mdy">MM/DD/YYYY (US)</SelectItem>
                          <SelectItem value="dmy">DD/MM/YYYY (EU)</SelectItem>
                          <SelectItem value="ymd">YYYY-MM-DD (ISO)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      onClick={() => {
                        saveSetting('orgName', orgName)
                        saveSetting('orgDomain', orgDomain)
                        saveSetting('orgDescription', orgDescription)
                        saveSetting('timezone', timezone)
                        saveSetting('language', language)
                        saveSetting('dateFormat', dateFormat)
                        toast({
                          title: "Settings saved",
                          description: "Organization settings have been saved successfully.",
                        })
                      }}
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>System Preferences</CardTitle>
                    <CardDescription>
                      Configure system-wide behavior and defaults
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Auto-save Changes</Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically save your settings as you make changes
                        </p>
                      </div>
                      <Switch 
                        checked={autoSave} 
                        onCheckedChange={(checked) => {
                          setAutoSave(checked)
                          saveSetting('autoSave', checked)
                          toast({
                            title: checked ? "Auto-save enabled" : "Auto-save disabled",
                            description: checked ? "Your changes will be saved automatically." : "You'll need to save manually.",
                          })
                        }}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Show Tooltips</Label>
                        <p className="text-sm text-muted-foreground">
                          Display helpful tooltips throughout the interface
                        </p>
                      </div>
                      <Switch 
                        checked={showTooltips} 
                        onCheckedChange={(checked) => {
                          setShowTooltips(checked)
                          saveSetting('showTooltips', checked)
                        }}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Keyboard Shortcuts</Label>
                        <p className="text-sm text-muted-foreground">
                          Enable keyboard shortcuts for faster navigation
                        </p>
                      </div>
                      <Switch 
                        checked={keyboardShortcuts} 
                        onCheckedChange={(checked) => {
                          setKeyboardShortcuts(checked)
                          saveSetting('keyboardShortcuts', checked)
                        }}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Sound Effects</Label>
                        <p className="text-sm text-muted-foreground">
                          Play sound effects for alerts and notifications
                        </p>
                      </div>
                      <Switch 
                        checked={soundEffects} 
                        onCheckedChange={(checked) => {
                          setSoundEffects(checked)
                          saveSetting('soundEffects', checked)
                          if (checked) {
                            // Play a test sound
                            toast({
                              title: "Sound effects enabled",
                              description: "🔊 You'll hear sounds for important events.",
                            })
                          }
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="appearance" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Palette className="h-5 w-5" />
                      Theme Settings
                    </CardTitle>
                    <CardDescription>
                      Customize the look and feel of your dashboard
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <Label>Theme Mode</Label>
                      <div className="grid grid-cols-3 gap-4">
                        <button
                          onClick={() => setThemeMode('light')}
                          className={`relative flex flex-col items-center justify-center p-4 border-2 rounded-lg transition-all ${
                            themeMode === 'light' ? 'border-cyber-primary bg-cyber-primary/10' : 'border-border hover:border-cyber-primary/50'
                          }`}
                        >
                          {themeMode === 'light' && (
                            <Check className="absolute top-2 right-2 h-4 w-4 text-cyber-primary" />
                          )}
                          <Sun className="h-8 w-8 mb-2" />
                          <span className="font-medium">Light</span>
                          <span className="text-xs text-muted-foreground mt-1">Bright theme</span>
                        </button>
                        <button
                          onClick={() => setThemeMode('dark')}
                          className={`relative flex flex-col items-center justify-center p-4 border-2 rounded-lg transition-all ${
                            themeMode === 'dark' ? 'border-cyber-primary bg-cyber-primary/10' : 'border-border hover:border-cyber-primary/50'
                          }`}
                        >
                          {themeMode === 'dark' && (
                            <Check className="absolute top-2 right-2 h-4 w-4 text-cyber-primary" />
                          )}
                          <Moon className="h-8 w-8 mb-2" />
                          <span className="font-medium">Dark</span>
                          <span className="text-xs text-muted-foreground mt-1">Dark theme</span>
                        </button>
                        <button
                          onClick={() => setThemeMode('system')}
                          className={`relative flex flex-col items-center justify-center p-4 border-2 rounded-lg transition-all ${
                            themeMode === 'system' ? 'border-cyber-primary bg-cyber-primary/10' : 'border-border hover:border-cyber-primary/50'
                          }`}
                        >
                          {themeMode === 'system' && (
                            <Check className="absolute top-2 right-2 h-4 w-4 text-cyber-primary" />
                          )}
                          <Monitor className="h-8 w-8 mb-2" />
                          <span className="font-medium">System</span>
                          <span className="text-xs text-muted-foreground mt-1">Auto detect</span>
                        </button>
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <Label htmlFor="accent-color">Accent Color</Label>
                      <div className="grid grid-cols-6 gap-3">
                        <button 
                          aria-label="Blue theme" 
                          title="Blue" 
                          onClick={() => { setAccentColor('blue'); saveSetting('accentColor', 'blue'); }}
                          className={`relative h-12 w-12 rounded-lg bg-blue-500 border-2 hover:scale-110 transition-transform ${
                            accentColor === 'blue' ? 'border-white ring-2 ring-blue-500 ring-offset-2' : 'border-transparent'
                          }`}
                        >
                          {accentColor === 'blue' && <Check className="absolute inset-0 m-auto h-5 w-5 text-white" />}
                        </button>
                        <button 
                          aria-label="Purple theme" 
                          title="Purple" 
                          onClick={() => { setAccentColor('purple'); saveSetting('accentColor', 'purple'); }}
                          className={`relative h-12 w-12 rounded-lg bg-purple-500 border-2 hover:scale-110 transition-transform ${
                            accentColor === 'purple' ? 'border-white ring-2 ring-purple-500 ring-offset-2' : 'border-transparent'
                          }`}
                        >
                          {accentColor === 'purple' && <Check className="absolute inset-0 m-auto h-5 w-5 text-white" />}
                        </button>
                        <button 
                          aria-label="Green theme" 
                          title="Green" 
                          onClick={() => { setAccentColor('green'); saveSetting('accentColor', 'green'); }}
                          className={`relative h-12 w-12 rounded-lg bg-green-500 border-2 hover:scale-110 transition-transform ${
                            accentColor === 'green' ? 'border-white ring-2 ring-green-500 ring-offset-2' : 'border-transparent'
                          }`}
                        >
                          {accentColor === 'green' && <Check className="absolute inset-0 m-auto h-5 w-5 text-white" />}
                        </button>
                        <button 
                          aria-label="Orange theme" 
                          title="Orange" 
                          onClick={() => { setAccentColor('orange'); saveSetting('accentColor', 'orange'); }}
                          className={`relative h-12 w-12 rounded-lg bg-orange-500 border-2 hover:scale-110 transition-transform ${
                            accentColor === 'orange' ? 'border-white ring-2 ring-orange-500 ring-offset-2' : 'border-transparent'
                          }`}
                        >
                          {accentColor === 'orange' && <Check className="absolute inset-0 m-auto h-5 w-5 text-white" />}
                        </button>
                        <button 
                          aria-label="Red theme" 
                          title="Red" 
                          onClick={() => { setAccentColor('red'); saveSetting('accentColor', 'red'); }}
                          className={`relative h-12 w-12 rounded-lg bg-red-500 border-2 hover:scale-110 transition-transform ${
                            accentColor === 'red' ? 'border-white ring-2 ring-red-500 ring-offset-2' : 'border-transparent'
                          }`}
                        >
                          {accentColor === 'red' && <Check className="absolute inset-0 m-auto h-5 w-5 text-white" />}
                        </button>
                        <button 
                          aria-label="Pink theme" 
                          title="Pink" 
                          onClick={() => { setAccentColor('pink'); saveSetting('accentColor', 'pink'); }}
                          className={`relative h-12 w-12 rounded-lg bg-pink-500 border-2 hover:scale-110 transition-transform ${
                            accentColor === 'pink' ? 'border-white ring-2 ring-pink-500 ring-offset-2' : 'border-transparent'
                          }`}
                        >
                          {accentColor === 'pink' && <Check className="absolute inset-0 m-auto h-5 w-5 text-white" />}
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Display Preferences</CardTitle>
                    <CardDescription>
                      Customize your dashboard appearance and layout
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>High Contrast Mode</Label>
                        <p className="text-sm text-muted-foreground">
                          Increase contrast for better visibility
                        </p>
                      </div>
                      <Switch 
                        checked={highContrast} 
                        onCheckedChange={setHighContrast}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Compact View</Label>
                        <p className="text-sm text-muted-foreground">
                          Show more content in less space
                        </p>
                      </div>
                      <Switch 
                        checked={compactView} 
                        onCheckedChange={setCompactView}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Animations</Label>
                        <p className="text-sm text-muted-foreground">
                          Enable smooth animations and transitions
                        </p>
                      </div>
                      <Switch 
                        checked={animations} 
                        onCheckedChange={setAnimations}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Show Grid Lines</Label>
                        <p className="text-sm text-muted-foreground">
                          Display grid lines on charts and graphs
                        </p>
                      </div>
                      <Switch 
                        checked={showGridLines}
                        onCheckedChange={(checked) => {
                          setShowGridLines(checked)
                          saveSetting('showGridLines', checked)
                          toast({
                            title: checked ? "Grid lines enabled" : "Grid lines disabled",
                            description: checked ? "Grid lines will now appear on charts." : "Grid lines are now hidden.",
                          })
                        }}
                      />
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <Label htmlFor="sidebar-position">Sidebar Position</Label>
                      <Select 
                        value={sidebarPosition} 
                        onValueChange={(value) => {
                          setSidebarPosition(value)
                          saveSetting('sidebarPosition', value)
                          toast({
                            title: "Sidebar position updated",
                            description: `Sidebar moved to ${value} side.`,
                          })
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="left">Left Side</SelectItem>
                          <SelectItem value="right">Right Side</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="font-size">Font Size</Label>
                      <Select value={fontSize} onValueChange={setFontSize}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">Small</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="large">Large</SelectItem>
                          <SelectItem value="xlarge">Extra Large</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Shield className="h-5 w-5" />
                      <span>Security Policies</span>
                    </CardTitle>
                    <CardDescription>
                      Configure security policies and threat detection settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="threat-level">Threat Detection Sensitivity</Label>
                      <Select 
                        value={threatLevel} 
                        onValueChange={(value) => {
                          setThreatLevel(value)
                          saveSetting('threatLevel', value)
                          toast({
                            title: "Threat detection updated",
                            description: `Sensitivity set to ${value}.`,
                          })
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select sensitivity level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low - Fewer alerts</SelectItem>
                          <SelectItem value="medium">Medium - Balanced</SelectItem>
                          <SelectItem value="high">High - Maximum detection</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Auto-block Suspicious IPs</Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically block IPs with suspicious activity
                        </p>
                      </div>
                      <Switch 
                        checked={autoBlockIPs}
                        onCheckedChange={(checked) => {
                          setAutoBlockIPs(checked)
                          saveSetting('autoBlockIPs', checked)
                        }}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Real-time Scanning</Label>
                        <p className="text-sm text-muted-foreground">
                          Continuous monitoring of all network traffic
                        </p>
                      </div>
                      <Switch 
                        checked={realTimeScanning}
                        onCheckedChange={(checked) => {
                          setRealTimeScanning(checked)
                          saveSetting('realTimeScanning', checked)
                        }}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Incident Auto-response</Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically respond to detected incidents
                        </p>
                      </div>
                      <Switch 
                        checked={incidentAutoResponse}
                        onCheckedChange={(checked) => {
                          setIncidentAutoResponse(checked)
                          saveSetting('incidentAutoResponse', checked)
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Security Modes</CardTitle>
                    <CardDescription>
                      Choose your security posture and monitoring level
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Security Mode</Label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div 
                          onClick={() => handleSecurityModeChange('standard')}
                          className={`p-4 border-2 rounded-lg cursor-pointer transition ${
                            securityMode === 'standard' 
                              ? 'border-green-500 bg-green-500/10' 
                              : 'border-border hover:border-green-500/50'
                          }`}
                        >
                          <h4 className="font-medium text-green-500 mb-1 flex items-center justify-between">
                            Standard
                            {securityMode === 'standard' && <Check className="h-4 w-4" />}
                          </h4>
                          <p className="text-xs text-muted-foreground">Balanced security and performance</p>
                        </div>
                        <div 
                          onClick={() => handleSecurityModeChange('strict')}
                          className={`p-4 border-2 rounded-lg cursor-pointer transition ${
                            securityMode === 'strict' 
                              ? 'border-orange-500 bg-orange-500/10' 
                              : 'border-border hover:border-orange-500/50'
                          }`}
                        >
                          <h4 className="font-medium text-orange-500 mb-1 flex items-center justify-between">
                            Strict
                            {securityMode === 'strict' && <Check className="h-4 w-4" />}
                          </h4>
                          <p className="text-xs text-muted-foreground">Enhanced security, more alerts</p>
                        </div>
                        <div 
                          onClick={() => handleSecurityModeChange('maximum')}
                          className={`p-4 border-2 rounded-lg cursor-pointer transition ${
                            securityMode === 'maximum' 
                              ? 'border-red-500 bg-red-500/10' 
                              : 'border-border hover:border-red-500/50'
                          }`}
                        >
                          <h4 className="font-medium text-red-500 mb-1 flex items-center justify-between">
                            Maximum
                            {securityMode === 'maximum' && <Check className="h-4 w-4" />}
                          </h4>
                          <p className="text-xs text-muted-foreground">Highest security, all features on</p>
                        </div>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Maintenance Mode</Label>
                        <p className="text-sm text-muted-foreground">
                          Temporarily disable non-critical alerts
                        </p>
                      </div>
                      <Switch 
                        checked={maintenanceMode}
                        onCheckedChange={(checked) => {
                          setMaintenanceMode(checked)
                          saveSetting('maintenanceMode', checked)
                          toast({
                            title: checked ? "Maintenance mode enabled" : "Maintenance mode disabled",
                            description: checked ? "Non-critical alerts are now disabled." : "All alerts are now active.",
                            variant: checked ? "default" : "default"
                          })
                        }}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Learning Mode</Label>
                        <p className="text-sm text-muted-foreground">
                          System learns normal patterns (reduces false positives)
                        </p>
                      </div>
                      <Switch 
                        checked={learningMode}
                        onCheckedChange={(checked) => {
                          setLearningMode(checked)
                          saveSetting('learningMode', checked)
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Access Control</CardTitle>
                    <CardDescription>
                      Manage user access and permissions
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                      <Select 
                        value={sessionTimeout} 
                        onValueChange={(value) => {
                          setSessionTimeout(value)
                          saveSetting('sessionTimeout', value)
                          const label = value === 'never' ? 'Never timeout' : `${value} minutes`
                          toast({
                            title: "Session timeout updated",
                            description: `Sessions will timeout after ${label}.`,
                          })
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 Minutes</SelectItem>
                          <SelectItem value="30">30 Minutes (Default)</SelectItem>
                          <SelectItem value="60">1 Hour</SelectItem>
                          <SelectItem value="240">4 Hours</SelectItem>
                          <SelectItem value="never">Never Timeout</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Require 2FA</Label>
                        <p className="text-sm text-muted-foreground">
                          Require two-factor authentication for all users
                        </p>
                      </div>
                      <Switch 
                        checked={require2FA}
                        onCheckedChange={(checked) => {
                          setRequire2FA(checked)
                          saveSetting('require2FA', checked)
                          toast({
                            title: checked ? "2FA enabled" : "2FA disabled",
                            description: checked ? "Two-factor authentication is now required." : "2FA is now optional.",
                          })
                        }}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>SSO Integration</Label>
                        <p className="text-sm text-muted-foreground">
                          Enable single sign-on integration
                        </p>
                      </div>
                      <Switch 
                        checked={ssoIntegration}
                        onCheckedChange={(checked) => {
                          setSsoIntegration(checked)
                          saveSetting('ssoIntegration', checked)
                          toast({
                            title: checked ? "SSO enabled" : "SSO disabled",
                            description: checked ? "Single sign-on is now active." : "SSO has been turned off.",
                          })
                        }}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>IP Whitelist</Label>
                        <p className="text-sm text-muted-foreground">
                          Only allow access from specific IP addresses
                        </p>
                      </div>
                      <Switch 
                        checked={ipWhitelist}
                        onCheckedChange={(checked) => {
                          setIpWhitelist(checked)
                          saveSetting('ipWhitelist', checked)
                          toast({
                            title: checked ? "IP whitelist enabled" : "IP whitelist disabled",
                            description: checked ? "Only whitelisted IPs can access." : "IP restrictions removed.",
                          })
                        }}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Geo-blocking</Label>
                        <p className="text-sm text-muted-foreground">
                          Block access from specific countries
                        </p>
                      </div>
                      <Switch 
                        checked={geoBlocking}
                        onCheckedChange={(checked) => {
                          setGeoBlocking(checked)
                          saveSetting('geoBlocking', checked)
                          toast({
                            title: checked ? "Geo-blocking enabled" : "Geo-blocking disabled",
                            description: checked ? "Country-based restrictions active." : "Geographic restrictions removed.",
                          })
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Encryption & Privacy</CardTitle>
                    <CardDescription>
                      Configure data encryption and privacy settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>End-to-End Encryption</Label>
                        <p className="text-sm text-muted-foreground">
                          Encrypt all data in transit and at rest
                        </p>
                      </div>
                      <Switch 
                        checked={e2eEncryption}
                        onCheckedChange={(checked) => {
                          setE2eEncryption(checked)
                          saveSetting('e2eEncryption', checked)
                          toast({
                            title: checked ? "E2E encryption enabled" : "E2E encryption disabled",
                            description: checked ? "All data is now encrypted." : "Encryption has been disabled.",
                          })
                        }}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Data Anonymization</Label>
                        <p className="text-sm text-muted-foreground">
                          Remove personally identifiable information from logs
                        </p>
                      </div>
                      <Switch 
                        checked={dataAnonymization}
                        onCheckedChange={(checked) => {
                          setDataAnonymization(checked)
                          saveSetting('dataAnonymization', checked)
                          toast({
                            title: checked ? "Anonymization enabled" : "Anonymization disabled",
                            description: checked ? "PII will be removed from logs." : "Full data logging enabled.",
                          })
                        }}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Secure Log Storage</Label>
                        <p className="text-sm text-muted-foreground">
                          Use encrypted storage for sensitive log data
                        </p>
                      </div>
                      <Switch 
                        checked={secureLogStorage}
                        onCheckedChange={(checked) => {
                          setSecureLogStorage(checked)
                          saveSetting('secureLogStorage', checked)
                          toast({
                            title: checked ? "Secure storage enabled" : "Secure storage disabled",
                            description: checked ? "Logs stored with encryption." : "Standard storage active.",
                          })
                        }}
                      />
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <Label htmlFor="encryption-level">Encryption Level</Label>
                      <Select 
                        value={encryptionLevel} 
                        onValueChange={(value) => {
                          setEncryptionLevel(value)
                          saveSetting('encryptionLevel', value)
                          toast({
                            title: "Encryption level updated",
                            description: `Using ${value.toUpperCase()} encryption.`,
                          })
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="aes128">AES-128 (Fast)</SelectItem>
                          <SelectItem value="aes256">AES-256 (Recommended)</SelectItem>
                          <SelectItem value="aes512">AES-512 (Maximum Security)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Bell className="h-5 w-5" />
                      <span>Alert Preferences</span>
                    </CardTitle>
                    <CardDescription>
                      Configure how and when you receive security alerts
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-foreground mb-3">Critical Alerts</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Email notifications</span>
                            <Switch 
                              checked={emailAlerts}
                              onCheckedChange={(checked) => {
                                setEmailAlerts(checked)
                                saveSetting('emailAlerts', checked)
                              }}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">SMS notifications</span>
                            <Switch 
                              checked={smsAlerts}
                              onCheckedChange={(checked) => {
                                setSmsAlerts(checked)
                                saveSetting('smsAlerts', checked)
                              }}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Push notifications</span>
                            <Switch 
                              checked={pushNotifications}
                              onCheckedChange={(checked) => {
                                setPushNotifications(checked)
                                saveSetting('pushNotifications', checked)
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <Separator />
                      <div>
                        <h4 className="font-medium text-foreground mb-3">Warning Alerts</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Email notifications</span>
                            <Switch 
                              checked={emailAlerts}
                              onCheckedChange={(checked) => {
                                setEmailAlerts(checked)
                                saveSetting('emailAlerts', checked)
                              }}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">SMS notifications</span>
                            <Switch 
                              checked={criticalOnly}
                              onCheckedChange={(checked) => {
                                setCriticalOnly(checked)
                                saveSetting('criticalOnly', checked)
                              }}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Push notifications</span>
                            <Switch 
                              checked={pushNotifications}
                              onCheckedChange={(checked) => {
                                setPushNotifications(checked)
                                saveSetting('pushNotifications', checked)
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <Separator />
                      <div>
                        <h4 className="font-medium text-foreground mb-3">Informational</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Email notifications</span>
                            <Switch 
                              checked={dailyDigest}
                              onCheckedChange={(checked) => {
                                setDailyDigest(checked)
                                saveSetting('dailyDigest', checked)
                              }}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">SMS notifications</span>
                            <Switch 
                              checked={false}
                              onCheckedChange={(checked) => {
                                saveSetting('infoSms', checked)
                              }}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Push notifications</span>
                            <Switch 
                              checked={false}
                              onCheckedChange={(checked) => {
                                saveSetting('infoPush', checked)
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Notification Channels</CardTitle>
                    <CardDescription>
                      Configure notification delivery methods
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="admin@company.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="webhook">Webhook URL</Label>
                      <Input id="webhook" placeholder="https://api.company.com/webhook" />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="data" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Database className="h-5 w-5" />
                      Data Management
                    </CardTitle>
                    <CardDescription>
                      Manage your data, backups, and exports
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Button variant="outline" className="h-auto py-6 flex flex-col items-center gap-2">
                        <Download className="h-6 w-6 text-cyber-primary" />
                        <span className="font-medium">Export Data</span>
                        <span className="text-xs text-muted-foreground">Download all logs & reports</span>
                      </Button>
                      <Button variant="outline" className="h-auto py-6 flex flex-col items-center gap-2">
                        <Upload className="h-6 w-6 text-cyber-secondary" />
                        <span className="font-medium">Import Data</span>
                        <span className="text-xs text-muted-foreground">Upload logs or settings</span>
                      </Button>
                      <Button variant="outline" className="h-auto py-6 flex flex-col items-center gap-2">
                        <RefreshCw className="h-6 w-6 text-cyber-warning" />
                        <span className="font-medium">Backup Now</span>
                        <span className="text-xs text-muted-foreground">Create instant backup</span>
                      </Button>
                    </div>
                    <Separator />
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Activity className="h-5 w-5 text-green-500" />
                          <div>
                            <p className="font-medium">Last Backup</p>
                            <p className="text-sm text-muted-foreground">November 2, 2025 at 3:45 PM</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                          Successful
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Database className="h-5 w-5 text-cyber-primary" />
                          <div>
                            <p className="font-medium">Storage Used</p>
                            <p className="text-sm text-muted-foreground">2.4 GB of 10 GB (24%)</p>
                          </div>
                        </div>
                        <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full w-1/4 bg-cyber-primary rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Backup Settings</CardTitle>
                    <CardDescription>
                      Configure automatic backup preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Automatic Backups</Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically backup data at scheduled intervals
                        </p>
                      </div>
                      <Switch 
                        checked={automaticBackups}
                        onCheckedChange={(checked) => {
                          setAutomaticBackups(checked)
                          saveSetting('automaticBackups', checked)
                          toast({
                            title: checked ? "Auto-backups enabled" : "Auto-backups disabled",
                            description: checked ? "Backups will run automatically." : "Manual backups only.",
                          })
                        }}
                      />
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <Label htmlFor="backup-frequency">Backup Frequency</Label>
                      <Select 
                        value={backupFrequency} 
                        onValueChange={(value) => {
                          setBackupFrequency(value)
                          saveSetting('backupFrequency', value)
                          toast({
                            title: "Backup frequency updated",
                            description: `Backups will run ${value}.`,
                          })
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hourly">Every Hour</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="retention-period">Retention Period</Label>
                      <Select 
                        value={backupRetention} 
                        onValueChange={(value) => {
                          setBackupRetention(value)
                          saveSetting('backupRetention', value)
                          toast({
                            title: "Retention period updated",
                            description: `Backups kept for ${value} days.`,
                          })
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30 Days</SelectItem>
                          <SelectItem value="60">60 Days</SelectItem>
                          <SelectItem value="90">90 Days</SelectItem>
                          <SelectItem value="180">180 Days</SelectItem>
                          <SelectItem value="365">1 Year</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Cloud Backup</Label>
                        <p className="text-sm text-muted-foreground">
                          Store backups in cloud storage for extra security
                        </p>
                      </div>
                      <Switch 
                        checked={cloudBackup}
                        onCheckedChange={(checked) => {
                          setCloudBackup(checked)
                          saveSetting('cloudBackup', checked)
                          toast({
                            title: checked ? "Cloud backup enabled" : "Cloud backup disabled",
                            description: checked ? "Backups stored in cloud." : "Local backups only.",
                          })
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Data Retention</CardTitle>
                    <CardDescription>
                      Configure how long data is kept in the system
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="log-retention">Log Data Retention</Label>
                      <Select 
                        value={logRetention} 
                        onValueChange={(value) => {
                          setLogRetention(value)
                          saveSetting('logRetention', value)
                          toast({
                            title: "Log retention updated",
                            description: `Logs kept for ${value === 'forever' ? 'forever' : value + ' days'}.`,
                          })
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30 Days</SelectItem>
                          <SelectItem value="60">60 Days</SelectItem>
                          <SelectItem value="90">90 Days</SelectItem>
                          <SelectItem value="180">180 Days</SelectItem>
                          <SelectItem value="365">1 Year</SelectItem>
                          <SelectItem value="forever">Forever</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="report-retention">Report Retention</Label>
                      <Select 
                        value={reportRetention} 
                        onValueChange={(value) => {
                          setReportRetention(value)
                          saveSetting('reportRetention', value)
                          toast({
                            title: "Report retention updated",
                            description: `Reports kept for ${value === 'forever' ? 'forever' : value + ' days'}.`,
                          })
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="90">90 Days</SelectItem>
                          <SelectItem value="180">180 Days</SelectItem>
                          <SelectItem value="365">1 Year</SelectItem>
                          <SelectItem value="730">2 Years</SelectItem>
                          <SelectItem value="forever">Forever</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Auto-delete Old Data</Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically remove data older than retention period
                        </p>
                      </div>
                      <Switch 
                        checked={autoDeleteOldData}
                        onCheckedChange={(checked) => {
                          setAutoDeleteOldData(checked)
                          saveSetting('autoDeleteOldData', checked)
                          toast({
                            title: checked ? "Auto-delete enabled" : "Auto-delete disabled",
                            description: checked ? "Old data will be removed automatically." : "Manual deletion required.",
                          })
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="integrations" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>System Integrations</CardTitle>
                    <CardDescription>
                      Connect LOGS ANALYZER with your existing security tools
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Database className="h-8 w-8 text-primary" />
                          <div>
                            <h4 className="font-medium">SIEM Integration</h4>
                            <p className="text-sm text-muted-foreground">Connect to your SIEM platform</p>
                          </div>
                        </div>
                        <Button variant="outline">Configure</Button>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Smartphone className="h-8 w-8 text-primary" />
                          <div>
                            <h4 className="font-medium">Mobile App</h4>
                            <p className="text-sm text-muted-foreground">iOS/Android notifications</p>
                          </div>
                        </div>
                        <Button variant="outline">Setup</Button>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Users className="h-8 w-8 text-primary" />
                          <div>
                            <h4 className="font-medium">Team Chat</h4>
                            <p className="text-sm text-muted-foreground">Slack/Teams integration</p>
                          </div>
                        </div>
                        <Button variant="outline">Connect</Button>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Shield className="h-8 w-8 text-primary" />
                          <div>
                            <h4 className="font-medium">Firewall API</h4>
                            <p className="text-sm text-muted-foreground">Automated firewall rules</p>
                          </div>
                        </div>
                        <Button variant="outline">Setup</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="advanced" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5" />
                      API Configuration
                    </CardTitle>
                    <CardDescription>
                      Configure API access and authentication
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="api-key">OpenAI API Key</Label>
                      <div className="flex gap-2">
                        <Input 
                          id="api-key" 
                          type={apiKeyVisible ? "text" : "password"} 
                          placeholder="sk-••••••••••••••••••••••••••"
                          defaultValue="sk-proj-1234567890abcdef"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setApiKeyVisible(!apiKeyVisible)}
                        >
                          {apiKeyVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Used for AI-powered log analysis and threat detection
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="api-endpoint">API Endpoint</Label>
                      <Input 
                        id="api-endpoint" 
                        placeholder="https://api.openai.com/v1"
                        defaultValue="https://api.openai.com/v1"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="api-timeout">API Timeout (seconds)</Label>
                      <Input 
                        id="api-timeout" 
                        type="number" 
                        placeholder="30"
                        defaultValue="30"
                      />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-medium">API Status: Connected</span>
                      </div>
                      <Button variant="outline" size="sm">
                        Test Connection
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Performance Settings
                    </CardTitle>
                    <CardDescription>
                      Optimize system performance and resource usage
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="scan-frequency">Scan Frequency (minutes)</Label>
                      <Select defaultValue="5">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Every Minute (High Load)</SelectItem>
                          <SelectItem value="5">Every 5 Minutes (Recommended)</SelectItem>
                          <SelectItem value="15">Every 15 Minutes (Low Load)</SelectItem>
                          <SelectItem value="30">Every 30 Minutes</SelectItem>
                          <SelectItem value="60">Every Hour</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="max-threads">Maximum Processing Threads</Label>
                      <Input 
                        id="max-threads" 
                        type="number" 
                        placeholder="4"
                        defaultValue="4"
                        min="1"
                        max="16"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cache-size">Cache Size (MB)</Label>
                      <Input 
                        id="cache-size" 
                        type="number" 
                        placeholder="256"
                        defaultValue="256"
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Enable Caching</Label>
                        <p className="text-sm text-muted-foreground">
                          Cache results for faster performance
                        </p>
                      </div>
                      <Switch 
                        checked={enableCaching}
                        onCheckedChange={(checked) => {
                          setEnableCaching(checked)
                          saveSetting('enableCaching', checked)
                        }}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Parallel Processing</Label>
                        <p className="text-sm text-muted-foreground">
                          Process multiple logs simultaneously
                        </p>
                      </div>
                      <Switch 
                        checked={parallelProcessing}
                        onCheckedChange={(checked) => {
                          setParallelProcessing(checked)
                          saveSetting('parallelProcessing', checked)
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Audit & Logging
                    </CardTitle>
                    <CardDescription>
                      System audit logs and activity tracking
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Enable Audit Logs</Label>
                        <p className="text-sm text-muted-foreground">
                          Track all system activities and changes
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Debug Mode</Label>
                        <p className="text-sm text-muted-foreground">
                          Enable detailed logging for troubleshooting
                        </p>
                      </div>
                      <Switch 
                        checked={debugMode}
                        onCheckedChange={(checked) => {
                          setDebugMode(checked)
                          saveSetting('debugMode', checked)
                          toast({
                            title: checked ? "Debug mode enabled" : "Debug mode disabled",
                            description: checked ? "Verbose logging is now active." : "Normal logging restored.",
                          })
                        }}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Verbose Logging</Label>
                        <p className="text-sm text-muted-foreground">
                          Include detailed information in logs
                        </p>
                      </div>
                      <Switch />
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <Label htmlFor="log-level">Log Level</Label>
                      <Select defaultValue="info">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="error">Error Only</SelectItem>
                          <SelectItem value="warn">Warnings & Errors</SelectItem>
                          <SelectItem value="info">Info, Warnings & Errors (Default)</SelectItem>
                          <SelectItem value="debug">Debug (Verbose)</SelectItem>
                          <SelectItem value="trace">Trace (Very Verbose)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button variant="outline" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Download Audit Logs
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Experimental Features</CardTitle>
                    <CardDescription>
                      Try out new features before they're officially released
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Beta Features</Label>
                        <p className="text-sm text-muted-foreground">
                          Enable experimental features and updates
                        </p>
                      </div>
                      <Switch 
                        checked={betaFeatures}
                        onCheckedChange={(checked) => {
                          setBetaFeatures(checked)
                          saveSetting('betaFeatures', checked)
                          toast({
                            title: checked ? "Beta features enabled" : "Beta features disabled",
                            description: checked ? "🧪 Experimental features are now available." : "Beta features disabled.",
                          })
                        }}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>AI-Enhanced Detection</Label>
                        <p className="text-sm text-muted-foreground">
                          Use advanced AI models for threat detection
                        </p>
                      </div>
                      <Switch 
                        checked={aiEnhanced}
                        onCheckedChange={(checked) => {
                          setAiEnhanced(checked)
                          saveSetting('aiEnhanced', checked)
                        }}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Predictive Analytics</Label>
                        <p className="text-sm text-muted-foreground">
                          Predict potential security threats before they occur
                        </p>
                      </div>
                      <Switch />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Auto-remediation</Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically fix detected security issues
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-cyber-danger flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Danger Zone
                    </CardTitle>
                    <CardDescription>
                      Irreversible and destructive actions - proceed with caution
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 border border-cyber-danger/20 rounded-lg bg-cyber-danger/5">
                      <h4 className="font-medium text-cyber-danger mb-2 flex items-center gap-2">
                        <RefreshCw className="h-4 w-4" />
                        Reset All Settings
                      </h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        This will reset all configuration to default values. This action cannot be undone.
                      </p>
                      <Button variant="destructive" size="sm">Reset Settings</Button>
                    </div>
                    <div className="p-4 border border-cyber-danger/20 rounded-lg bg-cyber-danger/5">
                      <h4 className="font-medium text-cyber-danger mb-2 flex items-center gap-2">
                        <Database className="h-4 w-4" />
                        Clear All Data
                      </h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Permanently delete all logs, reports, and analysis data. This action cannot be undone.
                      </p>
                      <Button variant="destructive" size="sm">Clear All Data</Button>
                    </div>
                    <div className="p-4 border border-cyber-danger/20 rounded-lg bg-cyber-danger/5">
                      <h4 className="font-medium text-cyber-danger mb-2 flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Delete Organization
                      </h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Permanently delete this organization and all associated data. This action cannot be undone.
                      </p>
                      <Button variant="destructive" size="sm">Delete Organization</Button>
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

export default Settings

