'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

interface NavigationProps {
  /** Current active page */
  currentPage: 'home' | 'library' | 'statistics' | 'upload'
  /** Optional title to display */
  title?: string
  /** Optional subtitle to display */
  subtitle?: string
}

/**
 * Reusable navigation component for the app with mobile responsiveness
 */
export default function Navigation({
  currentPage,
  title,
  subtitle,
}: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  /**
   * Navigation links configuration
   */
  const navLinks = [
    { href: '/', label: 'Home', page: 'home' as const },
    { href: '/demo', label: 'Library', page: 'library' as const },
    { href: '/upload', label: 'Upload', page: 'upload' as const },
    { href: '/stats', label: 'Statistics', page: 'statistics' as const },
  ]

  /**
   * Get link classes based on current page
   */
  const getLinkClasses = (page: string, isMobile = false) => {
    const baseClasses = isMobile
      ? 'block px-3 py-2 text-base font-medium rounded-md'
      : 'inline-flex items-center px-3 py-2 border text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'

    const activeClasses = isMobile
      ? 'text-indigo-700 bg-indigo-100'
      : 'border-transparent text-indigo-700 bg-indigo-100'

    const inactiveClasses = isMobile
      ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
      : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'

    return `${baseClasses} ${
      currentPage === page ? activeClasses : inactiveClasses
    }`
  }

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">
              {title || 'Pergamon Bookshelf'}
            </h1>
            {subtitle && (
              <p className="text-sm text-gray-600 truncate">{subtitle}</p>
            )}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.page}
                href={link.href}
                className={getLinkClasses(link.page)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
              {navLinks.map((link) => (
                <Link
                  key={link.page}
                  href={link.href}
                  className={getLinkClasses(link.page, true)}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
