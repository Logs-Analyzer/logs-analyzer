import { ArrowRight, Shield, Zap, Eye, Bot, CheckCircle, Upload, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Link } from 'react-router-dom'
import { SignedIn, SignedOut, SignUpButton } from '@clerk/clerk-react'
import { Vortex } from '@/components/ui/vortex'

const Home = () => {
  const features = [
    {
      icon: Bot,
      title: 'AI-Powered Analysis',
      description: 'Advanced machine learning algorithms detect threats in real-time across your entire infrastructure.'
    },
    {
      icon: Eye,
      title: 'Real-time Monitoring',
      description: 'Continuous surveillance of your systems with instant alerts for suspicious activities.'
    },
    {
      icon: Zap,
      title: 'Rapid Response',
      description: 'Automated incident response protocols minimize damage and recovery time.'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Military-grade encryption and compliance with industry security standards.'
    }
  ]

  const benefits = [
    'Reduce threat detection time by 90%',
    'Automate 80% of incident response',
    'Zero false positives with AI precision',
    '24/7 automated monitoring',
    'SOC 2 & ISO 27001 compliant'
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section with Vortex Background */}
      <section className="relative overflow-hidden h-screen">
        <Vortex
          backgroundColor="transparent"
          rangeY={600}
          particleCount={300}
          baseHue={180}
          baseSpeed={0.1}
          rangeSpeed={0.5}
          baseRadius={1.5}
          rangeRadius={2}
          className="flex items-center justify-center px-2 md:px-10 py-4 w-full h-full"
        >
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent animate-pulse">
                  AI Powered Security Logger
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
                AI Powered Security Logger uses advanced artificial intelligence to detect, analyze, and respond to cyber threats before they impact your business.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <SignedOut>
                  <SignUpButton mode="modal">
                    <Button size="lg" className="text-lg px-8 py-4 bg-blue-600 hover:bg-blue-700">
                      Go to Dashboard
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </SignUpButton>
                </SignedOut>
                <SignedIn>
                  <Link to="/dashboard">
                    <Button size="lg" className="text-lg px-8 py-4 bg-blue-600 hover:bg-blue-700">
                      Go to Dashboard
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/log-analysis">
                    <Button size="lg" className="text-lg px-8 py-4 bg-green-600 hover:bg-green-700">
                      <Upload className="mr-2 h-5 w-5" />
                      Upload & Analyze Files
                    </Button>
                  </Link>
                </SignedIn>
              </div>

              <div className="mt-12 text-sm text-gray-400">
                Trusted by 1000+ security teams worldwide
              </div>
            </div>
          </div>
        </Vortex>
      </section>

      {/* Quick Upload Section */}
      <SignedIn>
        <section className="relative py-16 bg-background overflow-hidden">
          {/* Enhanced Matrix-style Background with Fading Effect */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Matrix Rain Effect */}
            <div className="absolute inset-0 opacity-20">
              {Array.from({ length: 15 }, (_, i) => (
                <div
                  key={i}
                  className="absolute top-0 text-green-400 text-sm font-mono animate-matrix-fall"
                  style={{
                    left: `${(i * 6.67)}%`,
                    animationDelay: `${i * 0.5}s`,
                    animationDuration: '8s',
                  }}
                >
                  {Array.from({ length: 20 }, (_, j) => (
                    <div
                      key={j}
                      className="block h-6 leading-6"
                      style={{
                        opacity: Math.max(0, 1 - (j * 0.1)),
                        color: j > 15 ? 'transparent' : 'inherit',
                      }}
                    >
                      {Math.random() > 0.5 ? '1' : '0'}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Subtle Circuit Pattern */}
            <div className="absolute inset-0 opacity-[0.02]">
              <svg
                className="absolute inset-0 h-full w-full text-cyan-400"
                viewBox="0 0 1200 800"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <pattern id="upload-circuit" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
                    <line x1="0" y1="30" x2="120" y2="30" stroke="currentColor" strokeWidth="0.5"/>
                    <line x1="0" y1="90" x2="120" y2="90" stroke="currentColor" strokeWidth="0.5"/>
                    <line x1="30" y1="0" x2="30" y2="120" stroke="currentColor" strokeWidth="0.5"/>
                    <line x1="90" y1="0" x2="90" y2="120" stroke="currentColor" strokeWidth="0.5"/>
                    <circle cx="30" cy="30" r="2" fill="currentColor"/>
                    <circle cx="90" cy="30" r="2" fill="currentColor"/>
                    <circle cx="30" cy="90" r="2" fill="currentColor"/>
                    <circle cx="90" cy="90" r="2" fill="currentColor"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#upload-circuit)"/>
              </svg>
            </div>

            {/* Floating Security Icons with Enhanced Effects */}
            <div className="absolute inset-0 opacity-[0.06] pointer-events-none overflow-hidden">
              <svg className="absolute top-10 left-10 h-6 w-6 text-blue-400 animate-float" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
              </svg>
              <svg className="absolute top-32 right-20 h-8 w-8 text-cyan-300 animate-float-delay-1" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10A2,2 0 0,1 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3M12,13A2,2 0 0,1 14,15A2,2 0 0,1 12,17A2,2 0 0,1 10,15A2,2 0 0,1 12,13Z" />
              </svg>
              <svg className="absolute bottom-16 left-1/3 h-7 w-7 text-green-400 animate-float-delay-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9" />
              </svg>
              <svg className="absolute bottom-32 right-1/4 h-6 w-6 text-purple-400 animate-float-delay-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9,16V10H5L12,3L19,10H15V16H9M5,20V18H19V20H5Z" />
              </svg>
            </div>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 relative">
                Quick File Analysis
                <div className="absolute -inset-4 bg-gradient-to-r from-transparent via-background/80 to-transparent blur-sm -z-10"></div>
              </h2>
              <p className="text-muted-foreground relative">
                Upload your log files, documents, or any files for instant AI-powered threat analysis
                <div className="absolute -inset-2 bg-gradient-to-r from-transparent via-background/60 to-transparent blur-sm -z-10"></div>
              </p>
            </div>
            
            <div className="relative">
              {/* Completely Borderless Card Content */}
              <div className="p-8 text-center relative">
                {/* Content Background Blur for Readability */}
                <div className="absolute inset-0 bg-background/30 backdrop-blur-sm rounded-lg -z-10"></div>
                
                <div className="flex justify-center mb-6 relative">
                  <div className="p-4 bg-primary/10 rounded-full backdrop-blur-sm">
                    <FileText className="h-12 w-12 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-foreground relative">
                  Analyze Any File Type
                </h3>
                <p className="text-muted-foreground mb-6 relative">
                  Supports .log, .txt, .csv, .pdf, .docx, .json, .xml and more
                </p>
                <Link to="/log-analysis" className="relative">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 shadow-xl hover:shadow-2xl transition-all duration-300 border-0 backdrop-blur-sm">
                    <Upload className="mr-2 h-5 w-5" />
                    Start Analysis Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </SignedIn>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Advanced Threat Detection
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered platform provides comprehensive cybersecurity solutions for modern enterprises.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-border hover:border-primary/50 transition-colors">
                <CardHeader>
                  <feature.icon className="h-12 w-12 text-primary mb-4 animate-float" />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Why Choose LOGS ANALYZER?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Our platform delivers unmatched security intelligence with automated threat response capabilities.
              </p>
              
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-cyber-secondary flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div className="bg-gradient-cyber p-8 rounded-lg">
                <h3 className="text-2xl font-bold text-background mb-6 text-center">
                  Project Contributors
                </h3>
                <div className="space-y-3 text-background/90">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">1. Tridash Srivastav</span>
                    <span className="text-background/70">(2205169)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">2. Shreyas Ekka</span>
                    <span className="text-background/70">(2205675)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">3. Salbirong Chukande Cheran Momin</span>
                    <span className="text-background/70">(2205410)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">4. Zails Pranav Kachhap</span>
                    <span className="text-background/70">(2205260)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">5. Shaksham Saini</span>
                    <span className="text-background/70">(2205156)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">6. Somsubhra Mukherjee</span>
                    <span className="text-background/70">(2205683)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home