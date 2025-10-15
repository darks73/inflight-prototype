# Thales AVANT Up - Inflight Entertainment Prototype

An interactive web-based prototype simulating the Thales inflight entertainment system for rapid UX/UI feature simulation and testing.

## Features

- **Seat-back Screen Simulation**: Full-screen immersive interface mimicking actual inflight entertainment displays
- **Multi-category Navigation**: Movies, TV Shows, Music, Games, Shopping, Messaging, and Flight Information
- **Interactive Media Player**: Simulated video/audio playback with controls
- **Real-time Flight Information**: Live flight status, route tracking, and weather updates
- **Responsive Design**: Optimized for various screen sizes and orientations
- **Modern UI/UX**: Clean, airline-themed interface with smooth animations

## Technology Stack

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **React** for component architecture

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd inflight-prototype
```

2. Install dependencies:
```bash
npm install --legacy-peer-deps
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

The project includes a `vercel.json` configuration file for optimal deployment settings.

### Manual Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── globals.css     # Global styles and Tailwind imports
│   ├── layout.tsx      # Root layout component
│   └── page.tsx        # Home page
├── components/         # React components
│   ├── InflightSystem.tsx    # Main application component
│   ├── Navigation.tsx        # Sidebar navigation
│   ├── ContentBrowser.tsx    # Content grid/list views
│   ├── MediaPlayer.tsx       # Video/audio player simulation
│   └── FlightInfo.tsx        # Flight information panel
├── types/              # TypeScript type definitions
│   └── index.ts        # Content and navigation types
└── lib/                # Utility functions (future)
```

## Customization

### Adding New Content Categories

1. Update the `NavigationItem[]` array in `InflightSystem.tsx`
2. Add corresponding content data in `ContentBrowser.tsx`
3. Implement category-specific UI in the `ContentBrowser` component

### Styling

The project uses Tailwind CSS with custom airline-themed colors defined in `tailwind.config.js`:

- `airline-blue`: Primary airline color
- `airline-gold`: Accent color
- `seat-back`: Dark background
- `screen-glow`: Interactive element glow

### Mock Data

Content is currently mocked in the `ContentBrowser` component. Replace with real API calls or data sources as needed.

## Contributing

This is a prototype for UX/UI simulation. Feel free to:

- Add new interactive features
- Improve the visual design
- Add more realistic content data
- Implement additional inflight entertainment features

## License

This project is for prototyping and demonstration purposes.
