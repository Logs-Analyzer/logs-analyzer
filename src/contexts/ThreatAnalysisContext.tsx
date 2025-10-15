import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface Threat {
  id: string
  type: string
  severity: string
  source: string
  target: string
  description: string
  timestamp: string
  status: string
  confidence: number
  recommendedAction?: string
  fileName?: string
  fileType?: string
  detailedAnalysis?: {
    isHomeFixable: boolean
    requiresExpert: boolean
    targetedPorts: string[]
    remediationSteps: string[]
    riskLevel: string
    businessImpact: string
    technicalDetails: string
  }
}

interface AnalysisResult {
  fileName: string
  fileSize: number
  fileType?: string
  threatsFound: number
  threats: Threat[]
  error?: string
}

interface ThreatAnalysisContextType {
  analysisResults: AnalysisResult[]
  setAnalysisResults: (results: AnalysisResult[]) => void
  selectedThreat: Threat | null
  setSelectedThreat: (threat: Threat | null) => void
  enhanceThreatsWithAI: (threats: Threat[]) => Promise<Threat[]>
  enhancedThreats: Threat[]
  setEnhancedThreats: (threats: Threat[]) => void
  isEnhancing: boolean
  clearAnalysisData: () => void
}

export const ThreatAnalysisContext = createContext<ThreatAnalysisContextType | undefined>(undefined)

export const ThreatAnalysisProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize state from localStorage if available
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>(() => {
    try {
      const saved = localStorage.getItem('threatAnalysis_results')
      const parsed = saved ? JSON.parse(saved) : []
      return parsed
    } catch (error) {
      return []
    }
  })
  
  const [selectedThreat, setSelectedThreat] = useState<Threat | null>(null)
  const [enhancedThreats, setEnhancedThreats] = useState<Threat[]>(() => {
    try {
      const saved = localStorage.getItem('threatAnalysis_enhanced')
      const parsed = saved ? JSON.parse(saved) : []
      return parsed
    } catch (error) {
      return []
    }
  })
  const [isEnhancing, setIsEnhancing] = useState(false)

  // Save to localStorage whenever analysisResults change
  useEffect(() => {
    localStorage.setItem('threatAnalysis_results', JSON.stringify(analysisResults))
  }, [analysisResults])

  // Save to localStorage whenever enhancedThreats change
  useEffect(() => {
    localStorage.setItem('threatAnalysis_enhanced', JSON.stringify(enhancedThreats))
  }, [enhancedThreats])

  // Sync enhancedThreats when analysisResults change
  useEffect(() => {
    const allThreats = analysisResults.flatMap(result => result.threats || [])
    
    console.log('Sync useEffect triggered:', {
      analysisResultsCount: analysisResults.length,
      allThreatsCount: allThreats.length,
      enhancedThreatsCount: enhancedThreats.length
    })
    
    // Update enhancedThreats whenever we have new threats from analysis
    if (allThreats.length > 0) {
      console.log('Setting enhanced threats:', allThreats.length)
      setEnhancedThreats(allThreats)
    } else if (allThreats.length === 0 && analysisResults.length === 0) {
      // Clear enhanced threats when analysis results are cleared
      console.log('Clearing enhanced threats')
      setEnhancedThreats([])
    }
  }, [analysisResults])

  const enhanceThreatsWithAI = async (threats: Threat[]): Promise<Threat[]> => {
    setIsEnhancing(true)
    const enhancedThreats = await Promise.all(
      threats.map(async (threat) => {
        try {
          const response = await fetch('/api/enhance-threat', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ threat }),
          })

          if (!response.ok) {
            throw new Error('Failed to enhance threat')
          }

          const enhancedData = await response.json()
          return {
            ...threat,
            detailedAnalysis: enhancedData.detailedAnalysis,
          }
        } catch (error) {
          console.error('Failed to enhance threat:', threat.id, error)
          // Return threat with fallback detailed analysis
          return {
            ...threat,
            detailedAnalysis: {
              isHomeFixable: threat.severity === 'Low' || threat.severity === 'Medium',
              requiresExpert: threat.severity === 'Critical' || threat.severity === 'High',
              targetedPorts: ['Unknown'],
              remediationSteps: ['Contact IT security team for further analysis'],
              riskLevel: threat.severity,
              businessImpact: threat.severity === 'Critical' ? 'High' : threat.severity === 'High' ? 'Medium' : 'Low',
              technicalDetails: 'Enhanced analysis unavailable - fallback data used',
            },
          }
        }
      })
    )

    setEnhancedThreats(enhancedThreats)
    setIsEnhancing(false)
    return enhancedThreats
  }

  const clearAnalysisData = () => {
    setAnalysisResults([])
    setSelectedThreat(null)
    setEnhancedThreats([])
    // Clear localStorage as well
    localStorage.removeItem('threatAnalysis_results')
    localStorage.removeItem('threatAnalysis_enhanced')
  }

  return (
    <ThreatAnalysisContext.Provider
      value={{
        analysisResults,
        setAnalysisResults,
        selectedThreat,
        setSelectedThreat,
        enhanceThreatsWithAI,
        enhancedThreats,
        setEnhancedThreats,
        isEnhancing,
        clearAnalysisData,
      }}
    >
      {children}
    </ThreatAnalysisContext.Provider>
  )
}

export const useThreatAnalysis = () => {
  const context = useContext(ThreatAnalysisContext)
  if (context === undefined) {
    throw new Error('useThreatAnalysis must be used within a ThreatAnalysisProvider')
  }
  return context
}
