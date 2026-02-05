"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface AnimationSettings {
  animationsEnabled: boolean
  setAnimationsEnabled: (enabled: boolean) => void
}

const AnimationSettingsContext = createContext<AnimationSettings | undefined>(undefined)

export function AnimationSettingsProvider({ children }: { children: ReactNode }) {
  const [animationsEnabled, setAnimationsEnabled] = useState(true)

  // Persist preference in localStorage
  useEffect(() => {
    const stored = localStorage.getItem("animationsEnabled")
    if (stored !== null) {
      setAnimationsEnabled(stored === "true")
    }
  }, [])

  const handleSetAnimationsEnabled = (enabled: boolean) => {
    setAnimationsEnabled(enabled)
    localStorage.setItem("animationsEnabled", String(enabled))
  }

  return (
    <AnimationSettingsContext.Provider
      value={{
        animationsEnabled,
        setAnimationsEnabled: handleSetAnimationsEnabled,
      }}
    >
      {children}
    </AnimationSettingsContext.Provider>
  )
}

export function useAnimationSettings() {
  const context = useContext(AnimationSettingsContext)
  if (context === undefined) {
    throw new Error("useAnimationSettings must be used within an AnimationSettingsProvider")
  }
  return context
}
