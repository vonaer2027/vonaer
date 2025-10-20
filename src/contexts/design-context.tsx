'use client'

import { createContext, useContext, ReactNode } from 'react'

// Single design variant - Minimal-2
export type DesignVariant = 'minimal-2'

interface DesignContextType {
  design: DesignVariant
}

const DesignContext = createContext<DesignContextType | undefined>(undefined)

export function DesignProvider({ children }: { children: ReactNode }) {
  return (
    <DesignContext.Provider value={{ design: 'minimal-2' }}>
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
