'use client'

import { useState, useEffect } from 'react'
import YouTube from 'react-youtube'

export default function Home() {
  const [isOn, setIsOn] = useState(false) // Start with monitor off
  const [showLogo, setShowLogo] = useState(false)
  const [showVideo, setShowVideo] = useState(false)
  const [videoFadeIn, setVideoFadeIn] = useState(false)
  const [videoReady, setVideoReady] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const [screenDimensions, setScreenDimensions] = useState({ width: 0, height: 0, x: 0, y: 0 })

  useEffect(() => {
    const calculateScreenDimensions = () => {
      const container = document.querySelector('.monitor-container') as HTMLElement
      if (!container) return
      
      const rect = container.getBoundingClientRect()
      const containerAspectRatio = rect.width / rect.height
      const monitorAspectRatio = 1.43
      
      let monitorWidth, monitorHeight, monitorX, monitorY
      
      if (containerAspectRatio > monitorAspectRatio) {
        monitorHeight = rect.height
        monitorWidth = monitorHeight * monitorAspectRatio
        monitorX = (rect.width - monitorWidth) / 2
        monitorY = 0
      } else {
        monitorWidth = rect.width
        monitorHeight = monitorWidth / monitorAspectRatio
        monitorX = 0
        monitorY = (rect.height - monitorHeight) / 2
      }
      
      // Calculate screen area within monitor (approximate based on monitor bezels)
      const screenWidth = monitorWidth * 1.05 // 105% of monitor width for screen
      const screenHeight = monitorHeight * 0.88 // 88% of monitor height for screen
      const screenX = monitorX + (monitorWidth - screenWidth) / 2
      const screenY = monitorY + (monitorHeight - screenHeight) / 2 - monitorHeight * 0.01 // Offset for bottom bezel
      
      setScreenDimensions({
        width: screenWidth,
        height: screenHeight,
        x: screenX,
        y: screenY
      })
    }
    
    calculateScreenDimensions()
    window.addEventListener('resize', calculateScreenDimensions)
    
    return () => window.removeEventListener('resize', calculateScreenDimensions)
  }, [])

  const handlePowerButtonClick = (e: React.MouseEvent) => {
    const container = e.currentTarget as HTMLElement
    const rect = container.getBoundingClientRect()
    
    // Calculate the actual monitor image dimensions and position
    const containerAspectRatio = rect.width / rect.height
    const monitorAspectRatio = 1.43 // Based on the actual monitor image (roughly 1000x700)
    
    let monitorWidth, monitorHeight, monitorX, monitorY
    
    if (containerAspectRatio > monitorAspectRatio) {
      // Container is wider than monitor, monitor is height-constrained
      monitorHeight = rect.height
      monitorWidth = monitorHeight * monitorAspectRatio
      monitorX = (rect.width - monitorWidth) / 2
      monitorY = 0
    } else {
      // Container is taller than monitor, monitor is width-constrained
      monitorWidth = rect.width
      monitorHeight = monitorWidth / monitorAspectRatio
      monitorX = 0
      monitorY = (rect.height - monitorHeight) / 2
    }
    
    // Calculate click position relative to the monitor image
    const clickX = e.clientX - rect.left - monitorX
    const clickY = e.clientY - rect.top - monitorY
    
    // Power button is positioned more accurately based on the actual button location
    // The button is on the thick bottom bezel, positioned horizontally centered
    const powerButtonArea = {
      centerX: monitorWidth * 0.5, // Center horizontally within monitor
      centerY: monitorHeight * 0.92, // Near the bottom of the monitor (in the thick bezel)
      radius: monitorWidth * 0.04 // 4% of monitor width as click radius
    }
    
    // Only check if click is within the monitor image bounds
    if (clickX >= 0 && clickX <= monitorWidth && clickY >= 0 && clickY <= monitorHeight) {
      const distance = Math.sqrt(
        Math.pow(clickX - powerButtonArea.centerX, 2) + 
        Math.pow(clickY - powerButtonArea.centerY, 2)
      )
      
      if (distance <= powerButtonArea.radius) {
        if (!isOn) {
          // Turning on - show logo first, then video after delay
          setIsOn(true)
          setShowLogo(true)
          setShowVideo(false)
          setVideoFadeIn(false)
          setVideoReady(false)
          setVideoError(false)
          
          // After 3 seconds, hide logo and show video with fade-in
          setTimeout(() => {
            setShowLogo(false)
            setShowVideo(true)
          }, 3000)
        } else {
          // Turning off - hide everything
          setIsOn(false)
          setShowLogo(false)
          setShowVideo(false)
          setVideoFadeIn(false)
          setVideoReady(false)
          setVideoError(false)
        }
      }
    }
  }

  // YouTube player event handlers
  const onYouTubePlayerReady = () => {
    setVideoReady(true)
    setVideoError(false)
    
    // Start fade-in when video is ready
    setTimeout(() => {
      setVideoFadeIn(true)
    }, 200)
  }

  const onYouTubePlayerError = () => {
    setVideoError(true)
    setVideoReady(false)
    // Try to fade in anyway after a delay
    setTimeout(() => {
      setVideoFadeIn(true)
    }, 1000)
  }

  // Simple YouTube player options
  const youtubeOptions = {
    width: '100%',
    height: '100%',
    playerVars: {
      autoplay: 1,
      controls: 1,
      modestbranding: 1,
      rel: 0,
      showinfo: 0
    }
  }

  return (
    <div 
      className="w-full h-screen overflow-hidden flex items-center justify-center relative cursor-pointer"
      style={{
        backgroundColor: 'white'
      }}
      onClick={handlePowerButtonClick}
    >
      <div 
        className="monitor-container"
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {/* Black screen background - behind the monitor */}
        {!isOn && (
          <div 
            style={{
              position: 'absolute',
              left: `${screenDimensions.x}px`,
              top: `${screenDimensions.y}px`,
              width: `${screenDimensions.width}px`,
              height: `${screenDimensions.height}px`,
              backgroundColor: 'black',
              borderRadius: '8px',
              zIndex: 1
            }}
          />
        )}
        
        {/* Emirates Logo with fade transition - behind the monitor */}
        {showLogo && (
          <div 
            style={{
              position: 'absolute',
              left: `${screenDimensions.x}px`,
              top: `${screenDimensions.y}px`,
              width: `${screenDimensions.width}px`,
              height: `${screenDimensions.height}px`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1,
              opacity: 1,
              transition: 'opacity 1s ease-in-out'
            }}
          >
            <img 
              src="/images/Emirates_Logo.png" 
              alt="Emirates Logo"
              className="object-contain"
              style={{
                width: 'auto',
                height: 'auto',
                maxWidth: '60%',
                maxHeight: '60%',
                objectFit: 'contain'
              }}
            />
          </div>
        )}

        {/* Simple Video Player - behind the monitor */}
        {showVideo && (
          <div 
            style={{
              position: 'absolute',
              left: `${screenDimensions.x}px`,
              top: `${screenDimensions.y}px`,
              width: `${screenDimensions.width}px`,
              height: `${screenDimensions.height}px`,
              zIndex: 1,
              borderRadius: '8px',
              overflow: 'hidden',
              backgroundColor: 'white',
              opacity: videoFadeIn ? 1 : 0,
              transition: 'opacity 1.5s ease-in-out'
            }}
          >
            <YouTube
              videoId="qSqVVswa420" // Top Gun: Maverick Official Trailer
              opts={youtubeOptions}
              onReady={onYouTubePlayerReady}
              onError={onYouTubePlayerError}
              style={{
                width: '100%',
                height: '100%'
              }}
            />
            
            {/* Simple error message */}
            {videoError && (
              <div 
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 3,
                  color: '#333',
                  fontSize: '16px'
                }}
              >
                Video unavailable
              </div>
            )}
          </div>
        )}
        
        {/* Monitor image - always in foreground */}
        <div 
          style={{
            backgroundImage: 'url(/images/Emirates_Monitor_Transparent.png)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            width: '100%',
            height: '100%',
            position: 'relative',
            zIndex: 2
          }}
        />
      </div>
    </div>
  )
}