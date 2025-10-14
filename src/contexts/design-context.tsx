'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

export type DesignVariant = 'minimal-1' | 'minimal-2' | 'minimal-3' | 'original'

interface DesignContextType {
  design: DesignVariant
  setDesign: (design: DesignVariant) => void
}

const DesignContext = createContext<DesignContextType | undefined>(undefined)

export function DesignProvider({ children }: { children: ReactNode }) {
  const [design, setDesign] = useState<DesignVariant>('minimal-1')

  return (
    <DesignContext.Provider value={{ design, setDesign }}>
      {children}
    </DesignContext.Provider>
  )
}

export function useDesign() {
  const context = useContext(DesignContext)
  if (!context) {
    throw new Error('useDesign must be used within a DesignProvider')
  }
  return context
}
