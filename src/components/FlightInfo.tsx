'use client'

import { useState, useEffect } from 'react'
import { ContentItem } from '@/types'

interface FlightInfoProps {}

export default function FlightInfo({}: FlightInfoProps) {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [flightData] = useState({
    flightNumber: 'AI 101',
    route: 'New York → London',
    departure: 'JFK',
    arrival: 'LHR',
    duration: '7h 45m',
    altitude: '37,000 ft',
    speed: '520 mph',
    weather: 'Clear',
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="space-y-4">
      <h2 className="text-airline-gold font-bold text-lg mb-4">Flight Information</h2>
      
      {/* Current time */}
      <div className="flight-info-panel">
        <h3 className="text-white font-semibold mb-2">Current Time</h3>
        <p className="text-2xl font-mono text-airline-gold">
          {currentTime.toLocaleTimeString()}
        </p>
      </div>

      {/* Flight details */}
      <div className="flight-info-panel">
        <h3 className="text-white font-semibold mb-3">Flight Details</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-300">Flight:</span>
            <span className="text-white">{flightData.flightNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">Route:</span>
            <span className="text-white">{flightData.route}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">Duration:</span>
            <span className="text-white">{flightData.duration}</span>
          </div>
        </div>
      </div>

      {/* Flight status */}
      <div className="flight-info-panel">
        <h3 className="text-white font-semibold mb-3">Flight Status</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-300">Altitude:</span>
            <span className="text-white">{flightData.altitude}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">Speed:</span>
            <span className="text-white">{flightData.speed}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">Weather:</span>
            <span className="text-white">{flightData.weather}</span>
          </div>
        </div>
      </div>

      {/* Map placeholder */}
      <div className="flight-info-panel">
        <h3 className="text-white font-semibold mb-3">Flight Path</h3>
        <div className="bg-gray-800 rounded-lg h-32 flex items-center justify-center">
          <div className="text-gray-400 text-sm">Interactive Map</div>
        </div>
      </div>
    </div>
  )
}
