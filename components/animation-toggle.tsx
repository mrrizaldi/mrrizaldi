"use client"

import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { useAnimationSettings } from "@/components/animation-settings-context"
import { Sparkles, X } from "lucide-react"

export function AnimationToggle() {
  const { animationsEnabled, setAnimationsEnabled } = useAnimationSettings()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Floating toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="Animation settings"
      >
        {isOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <Sparkles className="w-5 h-5" />
        )}
      </button>

      {/* Settings panel */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 z-50 bg-zinc-900/95 backdrop-blur-sm border border-zinc-700 rounded-xl p-4 shadow-2xl min-w-[200px]">
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-white">Animations</span>
              <span className="text-xs text-zinc-400">
                {animationsEnabled ? "Enabled" : "Disabled"}
              </span>
            </div>
            <Switch
              checked={animationsEnabled}
              onCheckedChange={setAnimationsEnabled}
              aria-label="Toggle animations"
            />
          </div>
          <p className="text-xs text-zinc-500 mt-3 pt-3 border-t border-zinc-800">
            Disable for better performance on slower devices
          </p>
        </div>
      )}
    </>
  )
}
