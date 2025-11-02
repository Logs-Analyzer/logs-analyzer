import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react'
import { Settings, Wrench, Shield, AlertTriangle } from 'lucide-react'
import CyberBackground from '@/components/ui/cyber-background'

const IncidentResponse = () => {
  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
        <CyberBackground>
          <div className="min-h-screen flex items-center justify-center p-6">
            <div className="max-w-2xl mx-auto text-center">
              {/* Animated Background Elements */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-orange-500/20 rounded-full animate-pulse"></div>
                <div className="absolute top-1/3 right-1/4 w-16 h-16 border border-blue-500/20 rotate-45 animate-bounce"></div>
                <div className="absolute bottom-1/4 left-1/3 w-24 h-1 bg-gradient-to-r from-orange-500/30 to-transparent animate-pulse"></div>
                <div className="absolute bottom-1/3 right-1/3 w-8 h-20 bg-gradient-to-t from-blue-500/20 to-transparent animate-pulse"></div>
                <div className="absolute top-1/2 left-1/6 w-4 h-4 bg-orange-400/40 rounded-full animate-ping"></div>
                <div className="absolute top-2/3 right-1/6 w-6 h-6 border-2 border-orange-400/30 rounded animate-spin"></div>
              </div>

              {/* Main Content */}
              <div className="relative z-10">
                {/* Animated Icon Container */}
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full blur-3xl animate-pulse"></div>
                  <div className="relative flex items-center justify-center w-32 h-32 mx-auto bg-gradient-to-br from-slate-900/80 to-slate-800/80 rounded-full border-2 border-orange-500/50 backdrop-blur-sm">
                    <div className="absolute inset-0 rounded-full border-2 border-orange-400/30 animate-ping"></div>
                    <div className="relative">
                      <Settings className="w-12 h-12 text-orange-500 animate-spin" style={{ animationDuration: '3s' }} />
                      <Wrench className="absolute -bottom-2 -right-2 w-6 h-6 text-orange-400 animate-bounce" />
                    </div>
                  </div>
                </div>

                {/* Main Heading */}
                <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-orange-400 via-red-500 to-orange-600 bg-clip-text text-transparent animate-pulse">
                  Under Maintenance
                </h1>

                {/* Subheading */}
                <p className="text-xl md:text-2xl text-slate-300 mb-8 font-light">
                  We're upgrading our{' '}
                  <span className="text-orange-400 font-semibold">Incident Response</span>{' '}
                  capabilities
                </p>

                {/* Description */}
                <div className="bg-gradient-to-br from-slate-900/70 to-slate-800/70 rounded-2xl p-8 border border-orange-500/20 backdrop-blur-sm mb-8">
                  <div className="flex items-center justify-center mb-4">
                    <Shield className="w-8 h-8 text-orange-400 mr-3 animate-pulse" />
                    <h2 className="text-2xl font-semibold text-orange-400">Security Enhancement in Progress</h2>
                  </div>
                  <p className="text-slate-300 text-lg leading-relaxed">
                    Our team is implementing advanced automated incident response protocols
                    and enhancing our security infrastructure to provide you with faster,
                    more reliable threat mitigation capabilities.
                  </p>
                </div>

                {/* Features Coming Soon */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {[
                    { icon: '🚀', title: 'AI-Powered Response', desc: 'Automated threat detection' },
                    { icon: '⚡', title: 'Real-time Alerts', desc: 'Instant notifications' },
                    { icon: '🛡️', title: 'Advanced Protection', desc: 'Enhanced security protocols' }
                  ].map((feature, index) => (
                    <div 
                      key={index} 
                      className="bg-slate-800/50 rounded-lg p-6 border border-orange-500/20 backdrop-blur-sm transform transition-all duration-300 hover:scale-105 hover:border-orange-500/40"
                      style={{ animationDelay: `${index * 0.2}s` }}
                    >
                      <div className="text-3xl mb-3 animate-bounce" style={{ animationDelay: `${index * 0.1}s` }}>
                        {feature.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-orange-400 mb-2">{feature.title}</h3>
                      <p className="text-slate-300 text-sm">{feature.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Status Indicator */}
                <div className="flex items-center justify-center space-x-3 text-orange-400">
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                    <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-lg font-medium">Upgrading Systems...</span>
                </div>

                {/* ETA */}
                <div className="mt-8 p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                  <div className="flex items-center justify-center space-x-2">
                    <AlertTriangle className="w-5 h-5 text-orange-400" />
                    <span className="text-orange-300 font-medium">
                      Expected completion: Soon™
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CyberBackground>
      </SignedIn>
    </>
  )
}

export default IncidentResponse