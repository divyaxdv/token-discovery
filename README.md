# Axiom Trade Token Discovery Table

A pixel-perfect replica of Axiom Trade's token discovery table built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

### Core Features
- ✅ All token columns (New pairs, Final Stretch, Migrated)
- ✅ Multiple UI patterns: Popover, Tooltip, Modal, Sorting
- ✅ Different interaction patterns: Hover effects, Click actions
- ✅ Real-time price updates (WebSocket mock) with smooth color transitions
- ✅ Loading states: Skeleton, Shimmer, Progressive loading, Error boundaries

### Technical Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Data Fetching**: React Query (TanStack Query)
- **UI Components**: Radix UI primitives
- **Charts**: Recharts

## Project Structure

```
eterna/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Main page
│   ├── providers.tsx      # Context providers
│   └── globals.css        # Global styles
├── components/
│   ├── ui/                # Base UI components (atoms)
│   │   ├── button.tsx
│   │   ├── dialog.tsx
│   │   ├── popover.tsx
│   │   ├── tooltip.tsx
│   │   ├── skeleton.tsx
│   │   └── shimmer.tsx
│   ├── molecules/         # Composite components
│   │   ├── PriceDisplay.tsx
│   │   ├── TokenImage.tsx
│   │   ├── MiniChart.tsx
│   │   ├── TransactionDisplay.tsx
│   │   ├── TokenInfo.tsx
│   │   └── TableHeader.tsx
│   └── organisms/         # Complex components
│       ├── TokenTable.tsx
│       ├── TokenTableRow.tsx
│       ├── NavigationBar.tsx
│       ├── TokenModal.tsx
│       └── TableSkeleton.tsx
├── hooks/                 # Custom React hooks
│   ├── useTokens.ts       # Token data fetching
│   └── useWebSocket.ts    # Real-time updates
├── store/                 # Redux store
│   ├── store.ts
│   ├── hooks.ts
│   └── slices/
│       ├── tokenSlice.ts
│       └── uiSlice.ts
├── types/                 # TypeScript types
│   └── token.ts
└── lib/                   # Utilities
    └── utils.ts
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Performance Optimizations

- **Memoization**: All components are memoized using `React.memo` to prevent unnecessary re-renders
- **Code Splitting**: Next.js automatic code splitting
- **Lazy Loading**: Images and components loaded on demand
- **Optimized Re-renders**: Redux selectors prevent unnecessary updates
- **Smooth Animations**: CSS transitions for color changes (< 100ms)

## Responsive Design

The application is fully responsive and tested down to 320px width:
- Mobile: 320px - 640px
- Tablet: 641px - 1024px
- Desktop: 1025px+

## Key Features Explained

### Real-time Updates
- Mock WebSocket updates every 2 seconds
- Smooth color transitions for price changes
- Visual indicators for trend (up/down/neutral)

### Sorting
- Click column headers to sort
- Visual indicators show sort direction
- Supports: Market Cap, Liquidity, Volume, Transactions, Price Change

### Filtering
- Filter by category: All, New Pairs, Final Stretch, Migrated
- Instant filtering with no loading states

### Loading States
- **Skeleton**: Initial page load
- **Shimmer**: Progressive loading effect
- **Error Boundary**: Graceful error handling

### Interactions
- **Hover Effects**: Row highlighting on hover
- **Tooltips**: Contextual information on icon hover
- **Popovers**: Detailed information panels
- **Modals**: Token purchase dialogs

## Lighthouse Score Target

- Performance: ≥ 90
- Accessibility: ≥ 90
- Best Practices: ≥ 90
- SEO: ≥ 90

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Deploy automatically

The application is configured for Vercel deployment with optimal settings.

**Quick Deploy:**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Environment Variables

No environment variables are required for basic functionality. The app uses mock data for demonstration.

## Responsive Breakpoints

- **Mobile**: 320px - 640px (sm)
- **Tablet**: 641px - 1024px (md, lg)
- **Desktop**: 1025px+ (xl)

### Mobile Optimizations
- Horizontal scroll for table on small screens
- Hidden columns on mobile (Liquidity, TXNS, Token Info, Chart)
- Compact navigation bar
- Touch-friendly button sizes

## Development

### Type Checking
```bash
npm run type-check
```

### Linting
```bash
npm run lint
```

## Architecture Decisions

### Atomic Design
- **Atoms**: Basic UI components (Button, Input, etc.)
- **Molecules**: Composite components (PriceDisplay, TokenImage, etc.)
- **Organisms**: Complex components (TokenTable, NavigationBar, etc.)

### State Management
- **Redux Toolkit**: Complex state (tokens, sorting, filtering)
- **React Query**: Server state and caching
- **Local State**: Component-specific state (hover, modal)

### Performance
- Memoized components prevent unnecessary re-renders
- Optimized selectors in Redux
- Efficient data structures
- Minimal bundle size

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Author

Built as a pixel-perfect replica of Axiom Trade's token discovery interface.

