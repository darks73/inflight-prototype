'use client'

import { ContentItem } from '../types'

interface ContentBrowserProps {
  view: string
  onContentSelect: (content: ContentItem) => void
}

export default function ContentBrowser({ view, onContentSelect }: ContentBrowserProps) {
  // Mock data for different content categories
  const mockContent: Record<string, ContentItem[]> = {
    home: [
      {
        id: '1',
        title: 'Featured Movie',
        description: 'Latest blockbuster release',
        category: 'Action',
        duration: '2h 15m',
        year: 2024,
        rating: 'PG-13',
        thumbnail: '/api/placeholder/300/200',
        type: 'movie'
      },
      {
        id: '2',
        title: 'Popular TV Show',
        description: 'Binge-worthy series',
        category: 'Drama',
        duration: '45m',
        year: 2024,
        rating: 'TV-14',
        thumbnail: '/api/placeholder/300/200',
        type: 'tv'
      }
    ],
    movies: [
      {
        id: '3',
        title: 'Action Adventure',
        description: 'High-octane thriller',
        category: 'Action',
        duration: '2h 30m',
        year: 2024,
        rating: 'R',
        thumbnail: '/api/placeholder/300/200',
        type: 'movie'
      },
      {
        id: '4',
        title: 'Romantic Comedy',
        description: 'Heartwarming story',
        category: 'Romance',
        duration: '1h 45m',
        year: 2024,
        rating: 'PG-13',
        thumbnail: '/api/placeholder/300/200',
        type: 'movie'
      },
      {
        id: '5',
        title: 'Sci-Fi Epic',
        description: 'Futuristic adventure',
        category: 'Sci-Fi',
        duration: '2h 45m',
        year: 2024,
        rating: 'PG-13',
        thumbnail: '/api/placeholder/300/200',
        type: 'movie'
      }
    ],
    tv: [
      {
        id: '6',
        title: 'Crime Drama',
        description: 'Gripping detective series',
        category: 'Crime',
        duration: '50m',
        year: 2024,
        rating: 'TV-MA',
        thumbnail: '/api/placeholder/300/200',
        type: 'tv'
      },
      {
        id: '7',
        title: 'Comedy Series',
        description: 'Laugh-out-loud comedy',
        category: 'Comedy',
        duration: '30m',
        year: 2024,
        rating: 'TV-PG',
        thumbnail: '/api/placeholder/300/200',
        type: 'tv'
      }
    ],
    music: [
      {
        id: '8',
        title: 'Pop Hits 2024',
        description: 'Latest chart-toppers',
        category: 'Pop',
        duration: '45m',
        year: 2024,
        rating: 'E',
        thumbnail: '/api/placeholder/300/200',
        type: 'music'
      },
      {
        id: '9',
        title: 'Classical Collection',
        description: 'Timeless masterpieces',
        category: 'Classical',
        duration: '2h 15m',
        year: 2024,
        rating: 'E',
        thumbnail: '/api/placeholder/300/200',
        type: 'music'
      }
    ],
    games: [
      {
        id: '10',
        title: 'Puzzle Adventure',
        description: 'Mind-bending challenges',
        category: 'Puzzle',
        duration: '30m',
        year: 2024,
        rating: 'E',
        thumbnail: '/api/placeholder/300/200',
        type: 'game'
      }
    ],
    shopping: [],
    messaging: [],
    'flight-info': []
  }

  const content = mockContent[view] || []

  const getViewTitle = (view: string) => {
    const titles: Record<string, string> = {
      home: 'Welcome to AVANT Up',
      movies: 'Movies',
      tv: 'TV Shows',
      music: 'Music',
      games: 'Games',
      shopping: 'Shopping',
      messaging: 'Messages',
      'flight-info': 'Flight Information'
    }
    return titles[view] || view
  }

  if (view === 'shopping') {
    return (
      <div>
        <h1 className="text-3xl font-bold text-white mb-6">{getViewTitle(view)}</h1>
        <div className="bg-gray-800 rounded-lg p-8 text-center">
          <div className="text-6xl mb-4">🛍️</div>
          <h2 className="text-xl font-semibold text-white mb-2">Duty-Free Shopping</h2>
          <p className="text-gray-300">Browse our exclusive inflight catalog</p>
        </div>
      </div>
    )
  }

  if (view === 'messaging') {
    return (
      <div>
        <h1 className="text-3xl font-bold text-white mb-6">{getViewTitle(view)}</h1>
        <div className="bg-gray-800 rounded-lg p-8 text-center">
          <div className="text-6xl mb-4">💬</div>
          <h2 className="text-xl font-semibold text-white mb-2">Seat-to-Seat Messaging</h2>
          <p className="text-gray-300">Connect with fellow passengers</p>
        </div>
      </div>
    )
  }

  if (view === 'flight-info') {
    return (
      <div>
        <h1 className="text-3xl font-bold text-white mb-6">{getViewTitle(view)}</h1>
        <div className="bg-gray-800 rounded-lg p-8 text-center">
          <div className="text-6xl mb-4">✈️</div>
          <h2 className="text-xl font-semibold text-white mb-2">Detailed Flight Information</h2>
          <p className="text-gray-300">Real-time flight tracking and updates</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">{getViewTitle(view)}</h1>
      
      {content.length === 0 ? (
        <div className="text-center text-gray-400 py-12">
          <div className="text-6xl mb-4">📺</div>
          <p>No content available in this category</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {content.map((item) => (
            <div
              key={item.id}
              onClick={() => onContentSelect(item)}
              className="content-card group"
            >
              <div className="aspect-video bg-gray-700 rounded-lg mb-3 flex items-center justify-center">
                <div className="text-4xl">🎬</div>
              </div>
              <h3 className="font-semibold text-white mb-1 group-hover:text-airline-gold transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-gray-300 mb-2">{item.description}</p>
              <div className="flex justify-between text-xs text-gray-400">
                <span>{item.category}</span>
                {item.duration && <span>{item.duration}</span>}
              </div>
              {item.rating && (
                <div className="mt-2">
                  <span className="px-2 py-1 bg-gray-600 text-xs rounded">
                    {item.rating}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
