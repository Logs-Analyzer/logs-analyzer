import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react'
import { Save, Bell, Shield, Users, Database, Smartphone } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { } from '@/components/ui/separator'




const Settings = () => {
  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
        <div className="min-h-screen bg-background p-6">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Settings
              </h1>
              <p className="text-muted-foreground">
                Configure your LOGS ANALYZER security preferences
              </p>
            </div>

            <Tabs defaultValue="general" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="notifications">Alerts</TabsTrigger>
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
                        <Input id="org-name" placeholder="Enter organization name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="domain">Primary Domain</Label>
                        <Input id="domain" placeholder="example.com" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Input id="description" placeholder="Brief description of your organization" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="utc">UTC</SelectItem>
                          <SelectItem value="est">EST</SelectItem>
                          <SelectItem value="pst">PST</SelectItem>
                          <SelectItem value="cet">CET</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Display Preferences</CardTitle>
                    <CardDescription>
                      Customize your dashboard appearance
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Dark Mode</Label>
                        <p className="text-sm text-muted-foreground">
                          Use dark theme for the interface
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>High Contrast</Label>
                        <p className="text-sm text-muted-foreground">
                          Increase contrast for better visibility
                        </p>
                      </div>
                      <Switch />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Compact View</Label>
                        <p className="text-sm text-muted-foreground">
                          Show more content in less space
                        </p>
                      </div>
                      <Switch />
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
                      <Select>
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
                      <Switch defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Real-time Scanning</Label>
                        <p className="text-sm text-muted-foreground">
                          Continuous monitoring of all network traffic
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Incident Auto-response</Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically respond to detected incidents
                        </p>
                      </div>
                      <Switch defaultChecked />
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
                      <Input id="session-timeout" type="number" placeholder="30" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Require 2FA</Label>
                        <p className="text-sm text-muted-foreground">
                          Require two-factor authentication for all users
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>SSO Integration</Label>
                        <p className="text-sm text-muted-foreground">
                          Enable single sign-on integration
                        </p>
                      </div>
                      <Switch />
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
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">SMS notifications</span>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Push notifications</span>
                            <Switch defaultChecked />
                          </div>
                        </div>
                      </div>
                      <Separator />
                      <div>
                        <h4 className="font-medium text-foreground mb-3">Warning Alerts</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Email notifications</span>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">SMS notifications</span>
                            <Switch />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Push notifications</span>
                            <Switch defaultChecked />
                          </div>
                        </div>
                      </div>
                      <Separator />
                      <div>
                        <h4 className="font-medium text-foreground mb-3">Informational</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Email notifications</span>
                            <Switch />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">SMS notifications</span>
                            <Switch />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Push notifications</span>
                            <Switch />
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
                    <CardTitle>Advanced Configuration</CardTitle>
                    <CardDescription>
                      Advanced settings for power users
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="api-key">API Key</Label>
                      <Input id="api-key" type="password" placeholder="••••••••••••••••" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="log-retention">Log Retention Period (days)</Label>
                      <Input id="log-retention" type="number" placeholder="90" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="scan-frequency">Scan Frequency (minutes)</Label>
                      <Input id="scan-frequency" type="number" placeholder="5" />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Debug Mode</Label>
                        <p className="text-sm text-muted-foreground">
                          Enable detailed logging for troubleshooting
                        </p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Beta Features</Label>
                        <p className="text-sm text-muted-foreground">
                          Enable experimental features and updates
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-cyber-danger">Danger Zone</CardTitle>
                    <CardDescription>
                      Irreversible and destructive actions
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 border border-cyber-danger/20 rounded-lg bg-cyber-danger/5">
                      <h4 className="font-medium text-cyber-danger mb-2">Reset All Settings</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        This will reset all configuration to default values. This action cannot be undone.
                      </p>
                      <Button variant="destructive">Reset Settings</Button>
                    </div>
                    <div className="p-4 border border-cyber-danger/20 rounded-lg bg-cyber-danger/5">
                      <h4 className="font-medium text-cyber-danger mb-2">Delete Organization</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Permanently delete this organization and all associated data. This action cannot be undone.
                      </p>
                      <Button variant="destructive">Delete Organization</Button>
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

export default Settings

