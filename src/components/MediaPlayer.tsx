'use client'

import { useState, useEffect } from 'react'
import { ContentItem } from '../types'

interface MediaPlayerProps {
  content: ContentItem
  onBack: () => void
}

export default function MediaPlayer({ content, onBack }: MediaPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration] = useState(120) // Mock duration in seconds

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            setIsPlaying(false)
            return duration
          }
          return prev + 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, duration])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseInt(e.target.value)
    setCurrentTime(newTime)
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-white hover:text-airline-gold transition-colors"
        >
          <span className="text-xl">←</span>
          <span>Back</span>
        </button>
        <h1 className="text-2xl font-bold text-white">{content.title}</h1>
        <div className="w-20"></div> {/* Spacer for centering */}
      </div>

      {/* Video Player Area */}
      <div className="flex-1 bg-black rounded-lg relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-8xl mb-4">
              {content.type === 'movie' ? '🎬' : 
               content.type === 'tv' ? '📺' : 
               content.type === 'music' ? '🎵' : '🎮'}
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">{content.title}</h2>
            <p className="text-gray-300">{content.description}</p>
          </div>
        </div>

        {/* Play/Pause Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={handlePlayPause}
            className="bg-black bg-opacity-50 rounded-full p-4 hover:bg-opacity-70 transition-all"
          >
            <span className="text-4xl text-white">
              {isPlaying ? '⏸️' : '▶️'}
            </span>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4">
          <div className="flex items-center space-x-4">
            <span className="text-white text-sm">{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={handleSeek}
              className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-white text-sm">{formatTime(duration)}</span>
          </div>
        </div>
      </div>

      {/* Content Info */}
      <div className="mt-6 bg-gray-800 rounded-lg p-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-400">Category:</span>
            <span className="text-white ml-2">{content.category}</span>
          </div>
          <div>
            <span className="text-gray-400">Duration:</span>
            <span className="text-white ml-2">{content.duration}</span>
          </div>
          {content.year && (
            <div>
              <span className="text-gray-400">Year:</span>
              <span className="text-white ml-2">{content.year}</span>
            </div>
          )}
          {content.rating && (
            <div>
              <span className="text-gray-400">Rating:</span>
              <span className="text-white ml-2">{content.rating}</span>
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-4 flex justify-center space-x-4">
        <button
          onClick={handlePlayPause}
          className="px-6 py-2 bg-airline-blue hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors">
          Subtitles
        </button>
        <button className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors">
          Audio
        </button>
      </div>
    </div>
  )
}
