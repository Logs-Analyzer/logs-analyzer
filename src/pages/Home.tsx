import { ArrowRight, Shield, Zap, Eye, Bot, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Link } from 'react-router-dom'
import { SignedIn, SignedOut, SignUpButton } from '@clerk/clerk-react'

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
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-dark py-20 lg:py-32">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxLjUiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              <span className="bg-gradient-cyber bg-clip-text text-transparent animate-glow">
                AI-Powered
              </span>
              <br />
              Cybersecurity Defense
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              LOGS ANALYZER uses advanced artificial intelligence to detect, analyze, and respond to cyber threats before they impact your business.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <SignedOut>
                <SignUpButton mode="modal">
                  <Button size="lg" className="text-lg px-8 py-4">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <Link to="/dashboard">
                  <Button size="lg" className="text-lg px-8 py-4">
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </SignedIn>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                Watch Demo
              </Button>
            </div>

            <div className="mt-12 text-sm text-muted-foreground">
              Trusted by 1000+ security teams worldwide
            </div>
          </div>
        </div>
      </section>

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
              <div className="bg-gradient-cyber p-8 rounded-lg text-center">
                <h3 className="text-2xl font-bold text-background mb-4">
                  Start Your Free Trial
                </h3>
                <p className="text-background/80 mb-6">
                  Experience enterprise-grade cybersecurity with no commitment required.
                </p>
                <SignedOut>
                  <SignUpButton mode="modal">
                    <Button variant="secondary" size="lg" className="w-full">
                      Get Started Now
                    </Button>
                  </SignUpButton>
                </SignedOut>
                <SignedIn>
                  <Link to="/dashboard">
                    <Button variant="secondary" size="lg" className="w-full">
                      Access Dashboard
                    </Button>
                  </Link>
                </SignedIn>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home