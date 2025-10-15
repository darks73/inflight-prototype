'use client'

import { NavigationItem } from '../types'

interface NavigationProps {
  items: NavigationItem[]
  currentView: string
  onNavigate: (viewId: string) => void
}

export default function Navigation({ items, currentView, onNavigate }: NavigationProps) {
  return (
    <nav className="space-y-2">
      <h2 className="text-airline-gold font-bold text-lg mb-4">Menu</h2>
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onNavigate(item.id)}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
            currentView === item.id
              ? 'bg-airline-blue text-white shadow-lg'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white'
          }`}
        >
          <span className="text-xl">{item.icon}</span>
          <span className="font-medium">{item.label}</span>
        </button>
      ))}
    </nav>
  )
}
