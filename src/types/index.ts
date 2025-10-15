export interface ContentItem {
  id: string
  title: string
  description: string
  category: string
  duration?: string
  year?: number
  rating?: string
  thumbnail: string
  type: 'movie' | 'tv' | 'music' | 'game'
}

export interface NavigationItem {
  id: string
  label: string
  icon: string
}

export interface FlightData {
  flightNumber: string
  route: string
  departure: string
  arrival: string
  duration: string
  altitude: string
  speed: string
  weather: string
}
