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

## License

MIT

## Author

Built as a pixel-perfect replica of Axiom Trade's token discovery interface.

