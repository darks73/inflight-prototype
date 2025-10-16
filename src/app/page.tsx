'use client'

import { useState, useEffect } from 'react'

export default function Home() {
  const [isOn, setIsOn] = useState(true)
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
        setIsOn(!isOn)
      }
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
        
        {/* Logo - behind the monitor */}
        {isOn && (
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
              zIndex: 1
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