# Stephen's Personal Website

A modern, responsive personal website built with Next.js and TypeScript. This project serves as my digital portfolio and personal space on the web, featuring dynamic content integration and advanced performance optimizations.

🌐 Live at: [https://www.stephenc.dev](https://www.stephenc.dev)

## 🚀 Features

- **Modern, responsive design** with dark/light mode support
- **Interactive photo gallery** with AWS S3 integration and intelligent caching
- **Real-time Spotify integration** showing current music and listening history
- **Comprehensive project showcase** with detailed case studies
- **Advanced performance optimizations** including image optimization and caching
- **Type-safe development** with TypeScript and comprehensive error handling
- **Comprehensive testing suite** with unit and integration tests
- **Smooth animations and transitions** powered by Framer Motion

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) 16.0.0
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**:
  - [Tailwind CSS](https://tailwindcss.com/) 4.0.15
  - [shadcn/ui](https://ui.shadcn.com) components
- **Animation**: [Framer Motion](https://www.framer.com/motion/) 12.5.0
- **Cloud Storage**: [AWS S3](https://aws.amazon.com/s3/) for photo management
- **External APIs**: [Spotify Web API](https://developer.spotify.com/documentation/web-api/)
- **Deployment**: [Vercel](https://vercel.com/)

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes (photos, spotify)
│   ├── (home)/            # Home page
│   ├── about/             # About page
│   ├── photos/            # Photo gallery page
│   └── projects/          # Project showcase pages
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   └── __tests__/        # Component tests
├── lib/                  # Utility functions and services
│   ├── __tests__/        # Library tests
│   ├── s3-*.ts          # AWS S3 integration
│   ├── photo-cache.ts   # Photo caching system
│   └── performance-optimizer.ts
├── hooks/                # Custom React hooks
├── types/                # TypeScript type definitions
├── data/                 # Static data and project information
└── __tests__/           # End-to-end tests
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/StephenLHChan/stephenc.dev.git
cd stephenc.dev
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file and add your environment variables

```bash
# Required environment variables
# AWS S3 Configuration
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=your_region
AWS_S3_BUCKET_NAME=your_bucket_name

# Spotify API Configuration
SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret
SPOTIFY_REFRESH_TOKEN=your_refresh_token
```

4. Start the development server

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run prettier` - Format code with Prettier

### Code Quality

- **ESLint** for code linting with Next.js configuration
- **Prettier** for consistent code formatting
- **TypeScript** for type safety and better development experience
- **Comprehensive testing** with Jest and React Testing Library
- **Performance monitoring** with built-in optimization tools

## 🔧 Key Features Deep Dive

### Photo Gallery with AWS S3

- Intelligent photo caching system
- Automatic image optimization
- Metadata processing and error handling
- Performance monitoring and retry mechanisms

### Spotify Integration

- Real-time currently playing track display
- Recent tracks and top artists
- Automatic token refresh
- Graceful error handling for offline scenarios

### Performance Optimizations

- Advanced caching strategies
- Image optimization and lazy loading
- Bundle size optimization
- SEO and Core Web Vitals optimization

## 👨‍💻 Author

Stephen LH Chan - [GitHub](https://github.com/StephenLHChan)

---

Made with ❤️ using Next.js
