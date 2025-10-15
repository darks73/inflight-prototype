'use client'

import { useState, useEffect } from 'react'

export default function Home() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-blue-900 text-white">
      {/* Top Header Bar */}
      <header className="bg-blue-900 px-4 py-2 flex items-center justify-between">
        {/* Left: Empty space */}
        <div className="flex items-center">
          <div className="w-6 h-6 mr-2">✈️</div>
        </div>

        {/* Center: Flight Time */}
        <div className="flex items-center">
          <div className="w-4 h-4 mr-1">✈️</div>
          <span className="text-sm font-medium">11h 23m left</span>
          <span className="ml-1 text-blue-300">&gt;</span>
        </div>

        {/* Right: User Controls */}
        <div className="flex items-center space-x-3">
          <div className="w-4 h-4">🔔</div>
          <div className="w-4 h-4">⚙️</div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-60px)]">
        {/* Left Column */}
        <div className="w-1/3 p-4 space-y-4">
          {/* Continue Watching */}
          <div className="border border-white rounded p-3">
            <div className="flex items-center mb-2">
              <div className="flex flex-col space-y-1 mr-3">
                <div className="w-3 h-3 bg-blue-400 rounded-sm"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-sm"></div>
                <div className="w-3 h-3 bg-red-400 rounded-sm"></div>
                <div className="w-3 h-3 bg-green-400 rounded-sm"></div>
                <div className="w-3 h-3 bg-purple-400 rounded-sm"></div>
                <div className="w-3 h-3 bg-red-600 rounded-sm"></div>
              </div>
              <h3 className="text-sm font-medium">Continue Watching</h3>
            </div>
            <div className="border border-white rounded p-2">
              <span className="text-sm">LIONESS</span>
            </div>
          </div>

          {/* Recommended For You */}
          <div className="border border-white rounded p-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium">Recommended For You</h3>
              <span className="text-blue-300">&gt;</span>
            </div>
            <div className="border border-white rounded p-2">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-sm mr-2"></div>
                <span className="text-sm">A Day in JapanPERFECT DAYSAMAZING RACE</span>
              </div>
            </div>
          </div>

          {/* Flight Status */}
          <div className="border border-white rounded p-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium">Flight Status</h3>
              <span className="text-blue-300">&gt;</span>
            </div>
            <div className="border border-white rounded p-2 relative">
              <div className="text-sm">
                <div className="font-medium">LAX + HND</div>
                <div className="text-xs opacity-80">Departure 10:19 am</div>
                <div className="text-xs opacity-80">Arrival 3:05 pm</div>
              </div>
              <div className="absolute bottom-0 left-0 w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-sm">N</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center Column */}
        <div className="w-1/3 p-4 space-y-4">
          {/* Paramount+ YouTube Music */}
          <div className="text-center">
            <span className="text-sm">Paramount+YouTube Music</span>
          </div>

          {/* Plan Your Tokyo Adventure */}
          <div className="border border-white rounded p-3">
            <h3 className="text-sm font-medium mb-2">Plan Your Tokyo Adventure</h3>
            <div className="border border-white rounded p-2">
              <span className="text-sm">Mount Fuji</span>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-1/3 p-4 space-y-4">
          {/* Your Onboard Experience */}
          <div className="border border-white rounded p-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium">Your Onboard Experience</h3>
              <span className="text-blue-300">&gt;</span>
            </div>
            <div className="border border-white rounded p-2">
              <div className="text-sm">
                <div className="text-xs opacity-80">Confirm Your Menu Selection</div>
                <div className="font-medium">Grilled Chicken with Garlic Miso</div>
                <div className="text-xs opacity-80">Chicken Dish</div>
              </div>
            </div>
          </div>

          {/* Weather/Cabin Info */}
          <div className="text-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="w-4 h-4">🚽</div>
              <div className="w-4 h-4">☂️</div>
            </div>
            <div className="flex justify-between">
              <div>
                <div>Beat</div>
                <div>Nap</div>
                <div className="text-xs opacity-60">01</div>
              </div>
              <div>
                <div>Cabin</div>
                <div className="text-xs opacity-60">7°</div>
              </div>
              <div>
                <div>Current</div>
              </div>
            </div>
          </div>

          {/* Million Miler Gift */}
          <div className="border border-white rounded p-3">
            <h3 className="text-sm font-medium mb-2">Your Million Miler Gift from Delta</h3>
            <div className="border border-white rounded p-2">
              <span className="text-sm font-bold">MISSONI</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}