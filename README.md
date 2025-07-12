# Pergamon — Visual Bookshelf

A beautiful, intelligent bookshelf catalog that turns your physical book collection into a searchable digital library using computer vision and OCR technology.

![Pergamon Screenshot](./docs/screenshot-placeholder.png)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyour-username%2Fpergamon)

## Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Open http://localhost:3000
```

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, TailwindCSS
- **UI**: Heroicons, React Table
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage
- **OCR**: OpenAI Vision API / Google Cloud Vision
- **Deployment**: Vercel

## Features

### 📚 Client-Only Demo (Track A)

- Static JSON bookshelf viewer
- Filterable table by genre, language
- Keyword search for titles and authors
- Goodreads integration
- Export functionality

### 🔍 Full-Stack MVP (Track B)

- User authentication
- Photo upload and OCR processing
- Automatic book metadata enrichment
- Personal library management
- Statistics and analytics
- Multi-format export (CSV, JSON)

## Project Structure

```
pergamon/
├── app/                    # Next.js 14 App Router
│   ├── (auth)/            # Auth-protected routes
│   ├── api/               # API routes & server actions
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components
│   ├── BookTable.tsx     # Main table component
│   └── ...
├── lib/                  # Utilities & configurations
│   ├── supabase.ts       # Supabase client
│   ├── utils.ts          # Helper functions
│   └── ...
├── types/                # TypeScript type definitions
├── public/               # Static assets
│   └── user_bookshelf.json # Demo data
├── docs/                 # Documentation
└── supabase/            # Database schema & migrations
```

## Development Tracks

This project supports two development paths:

1. **Track A**: Client-only static demo for quick prototyping
2. **Track B**: Full-stack application with authentication and OCR

## Contributing

1. Fork the repository
2. Create a feature branch
3. Follow the Cursor rules in `.cursorrules`
4. Use conventional commits
5. Submit a pull request

## License

[![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
