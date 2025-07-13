import Link from 'next/link'

interface NavigationProps {
  /** Current active page */
  currentPage: 'home' | 'library' | 'statistics'
  /** Optional title to display */
  title?: string
  /** Optional subtitle to display */
  subtitle?: string
}

/**
 * Reusable navigation component for the app
 */
export default function Navigation({
  currentPage,
  title,
  subtitle,
}: NavigationProps) {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {title || 'Pergamon Bookshelf'}
            </h1>
            {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
          </div>
          <nav className="flex space-x-4">
            <Link
              href="/"
              className={`inline-flex items-center px-3 py-2 border text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                currentPage === 'home'
                  ? 'border-transparent text-indigo-700 bg-indigo-100'
                  : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
              }`}
            >
              Home
            </Link>
            <Link
              href="/demo"
              className={`inline-flex items-center px-3 py-2 border text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                currentPage === 'library'
                  ? 'border-transparent text-indigo-700 bg-indigo-100'
                  : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
              }`}
            >
              Library
            </Link>
            <Link
              href="/stats"
              className={`inline-flex items-center px-3 py-2 border text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                currentPage === 'statistics'
                  ? 'border-transparent text-indigo-700 bg-indigo-100'
                  : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
              }`}
            >
              Statistics
            </Link>
          </nav>
        </div>
      </div>
    </div>
  )
}
