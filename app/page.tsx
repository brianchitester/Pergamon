import Link from 'next/link'
import {
  BookOpen,
  Search,
  BarChart3,
  Globe,
  Download,
  Camera,
} from 'lucide-react'
import Button from '@/components/ui/Button'

/**
 * Landing page for Pergamon - The Personal Library OS
 */
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <header className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <BookOpen className="h-12 w-12 text-blue-600 mr-3" />
              <h1 className="text-4xl font-bold text-gray-900">Pergamon</h1>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              The Personal
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {' '}
                Library OS
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              In an age of algorithmic feeds and fleeting digital content, your
              bookshelf is still your most personal archive — but it's stuck in
              the analog world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demo">
                <Button size="lg" className="text-lg px-8 py-4">
                  View Demo
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Visual Cataloging Platform for Readers
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Snap a photo of your shelf, and we instantly return a beautifully
              organized digital library
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors">
              <Camera className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                Visual Recognition
              </h4>
              <p className="text-gray-600">
                No barcode scanning. No manual entry. Just one photo.
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors">
              <BarChart3 className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                Smart Organization
              </h4>
              <p className="text-gray-600">
                Auto-tagged by genre, language, and author with AI.
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-green-50 hover:bg-green-100 transition-colors">
              <Globe className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                Rich Metadata
              </h4>
              <p className="text-gray-600">
                Enriched with Goodreads links and summaries.
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-yellow-50 hover:bg-yellow-100 transition-colors">
              <Search className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                Advanced Search
              </h4>
              <p className="text-gray-600">
                Find that book you loaned out years ago with semantic search.
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-red-50 hover:bg-red-100 transition-colors">
              <BarChart3 className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                Reading Insights
              </h4>
              <p className="text-gray-600">
                Stats and insights on your reading habits and preferences.
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-indigo-50 hover:bg-indigo-100 transition-colors">
              <Download className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                Export Anywhere
              </h4>
              <p className="text-gray-600">
                Export to JSON, CSV, or sync with Notion. Your data, your way.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Historical Context */}
      <section className="py-20 bg-gradient-to-r from-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold mb-8">Why Pergamon?</h3>
          <div className="text-lg leading-relaxed space-y-4">
            <p>
              Pergamon was an ancient Greek city that became a major center of
              learning, culture, and science, second only to Alexandria in
              intellectual prestige.
            </p>
            <p>
              Home to the Library of Pergamon with over 200,000 scrolls, it
              rivaled Alexandria's great library. When Egypt banned papyrus
              exports to stop their growth, Pergamon invented parchment—
              <em> literally creating a new way to preserve knowledge</em>.
            </p>
            <p className="text-blue-300 font-semibold">
              Today, we're doing the same thing: turning your physical library
              into a new form of organized, searchable knowledge.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-4xl font-bold mb-6">
            Ready to Transform Your Library?
          </h3>
          <p className="text-xl mb-8 opacity-90">
            This isn't just a book tracker. It's a personal knowledge graph,
            starting with your shelf.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo">
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-4 bg-white text-blue-600 hover:bg-gray-100"
              >
                Try the Demo
              </Button>
            </Link>
            <Button
              variant="secondary"
              size="lg"
              className="text-lg px-8 py-4 bg-white/20 hover:bg-white/30"
            >
              Join Waitlist
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <BookOpen className="h-8 w-8 text-blue-400 mr-2" />
              <span className="text-xl font-bold">Pergamon</span>
            </div>
            <div className="flex space-x-6">
              <Link
                href="/demo"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Demo
              </Link>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                About
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>
              &copy; 2024 Pergamon. Turning shelves into searchable knowledge.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
