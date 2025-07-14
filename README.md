# Pergamon Bookshelf

A beautiful bookshelf application built with Next.js, TypeScript, and Tailwind CSS. Browse and filter your personal book collection with an elegant, responsive interface.

## Features

- 🌟 **Beautiful Landing Page**: Engaging homepage that showcases the vision and links to the demo
- 📚 **Beautiful Book Display**: Clean, modern interface to showcase your book collection
- 🔍 **Advanced Filtering**: Search by title/author, filter by genre and language
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- ⚡ **Fast Performance**: Client-side rendering with optimized static generation
- 🎨 **Modern UI**: Built with Tailwind CSS and Lucide React icons
- 📊 **Sortable Table**: Click column headers to sort your books

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **React Table** - Powerful table library for sorting and filtering
- **Lucide React** - Beautiful icons

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd Pergamon
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) to see the landing page, or [http://localhost:3000/demo](http://localhost:3000/demo) to go directly to the bookshelf demo

### Building for Production

1. Build the application:

   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

## Data Format

The application reads book data from `public/user_bookshelf.json`. Each book should have the following structure:

```json
{
  "Title": "Book Title",
  "Author": "Author Name",
  "Language": "English",
  "Goodreads": "https://www.goodreads.com/book/show/...",
  "Tags": ["Fiction", "Sci-Fi"]
}
```

## Deployment

This application is configured for static export and can be deployed to:

- **Vercel** (recommended): Connect your repository and deploy automatically
- **Netlify**: Deploy the `out` folder after running `npm run build`
- **GitHub Pages**: Deploy the static files from the `out` folder

### Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically with each push

## Project Structure

```
Pergamon/
├── app/
│   ├── demo/
│   │   └── page.tsx         # Demo page with bookshelf
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Landing page
├── components/
│   ├── ui/
│   │   └── Button.tsx       # Reusable button component
│   └── BookTable.tsx        # Main table component
├── lib/
│   └── useBooks.ts          # Data fetching hook
├── types/
│   └── book.ts              # TypeScript interfaces
├── public/
│   └── user_bookshelf.json  # Book data
└── package.json             # Dependencies
```

## Technical Design

For detailed technical specifications and future development plans, see our [Technical Design Document](docs/Technical%20Design.md).

## Coming Soon

We're actively working on exciting new features to enhance your bookshelf experience:

### 🚀 Full-Stack Version

- **User Authentication**: Secure login with Supabase Auth
- **Cloud Storage**: Store your books and images in the cloud
- **Multi-User Support**: Each user gets their own personal library

### 📸 Smart Book Recognition

- **Photo Upload**: Take pictures of your bookshelves
- **OCR Technology**: Automatic book spine recognition using OpenAI Vision
- **Smart Enrichment**: Automatically fetch genres, languages, and Goodreads ratings

### 📊 Advanced Library Management

- **Visual Stats**: Beautiful charts showing your reading patterns
- **Export Options**: Download your library as CSV or JSON
- **Enhanced Filtering**: More sophisticated search and organization tools

### 🎧 Audible Integration

- **CLI Export Tool**: Command-line utility to export your Audible library
- **Cross-Platform**: Works on Windows, macOS, and Linux
- **Multiple Formats**: Export to CSV, JSON, or sync with Supabase

### 🔄 Sync & Backup

- **Cloud Sync**: Keep your library synchronized across devices
- **Backup & Restore**: Never lose your carefully curated collection
- **Import Tools**: Easy migration from other book management systems

Stay tuned for these exciting updates! Follow our progress in the [Technical Design Document](docs/Technical%20Design.md).

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
