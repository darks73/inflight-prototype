'use client'

import { useState } from 'react'
import FlightInfo from './FlightInfo'
import Navigation from './Navigation'
import ContentBrowser from './ContentBrowser'
import MediaPlayer from './MediaPlayer'
import { ContentItem, NavigationItem } from '../types'

export default function InflightSystem() {
  const [currentView, setCurrentView] = useState<string>('home')
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const navigationItems: NavigationItem[] = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'movies', label: 'Movies', icon: '🎬' },
    { id: 'tv', label: 'TV Shows', icon: '📺' },
    { id: 'music', label: 'Music', icon: '🎵' },
    { id: 'games', label: 'Games', icon: '🎮' },
    { id: 'shopping', label: 'Shopping', icon: '🛍️' },
    { id: 'messaging', label: 'Messages', icon: '💬' },
    { id: 'flight-info', label: 'Flight Info', icon: '✈️' },
  ]

  const handleNavigation = (viewId: string) => {
    setCurrentView(viewId)
    setSelectedContent(null)
    setIsPlaying(false)
  }

  const handleContentSelect = (content: ContentItem) => {
    setSelectedContent(content)
    setIsPlaying(true)
  }

  const handleBack = () => {
    if (isPlaying) {
      setIsPlaying(false)
      setSelectedContent(null)
    } else {
      setCurrentView('home')
    }
  }

  return (
    <div className="seat-back-screen">
      {/* Header with airline branding */}
      <header className="flex justify-between items-center p-4 bg-black bg-opacity-30">
        <div className="flex items-center space-x-4">
          <div className="text-airline-gold font-bold text-xl">THALES</div>
          <div className="text-white text-lg">AVANT Up</div>
        </div>
        <div className="text-sm text-gray-300">
          Seat 12A • Flight AI 101
        </div>
      </header>

      {/* Main content area */}
      <main className="flex h-full">
        {/* Left sidebar - Navigation */}
        <aside className="w-64 bg-black bg-opacity-40 p-4">
          <Navigation 
            items={navigationItems}
            currentView={currentView}
            onNavigate={handleNavigation}
          />
        </aside>

        {/* Center content */}
        <div className="flex-1 p-6">
          {isPlaying && selectedContent ? (
            <MediaPlayer 
              content={selectedContent}
              onBack={handleBack}
            />
          ) : (
            <ContentBrowser 
              view={currentView}
              onContentSelect={handleContentSelect}
            />
          )}
        </div>

        {/* Right sidebar - Flight info */}
        <aside className="w-80 p-4">
          <FlightInfo />
        </aside>
      </main>
    </div>
  )
}
