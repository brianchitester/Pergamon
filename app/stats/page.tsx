'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import { Book } from '@/types/book'

/**
 * Stats page that displays bookshelf statistics
 */
export default function StatsPage() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    /**
     * Fetch books from the JSON file
     */
    const fetchBooks = async () => {
      try {
        const response = await fetch('/user_bookshelf.json')
        const data = await response.json()
        setBooks(data)
      } catch (error) {
        console.error('Error fetching books:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()
  }, [])

  /**
   * Calculate tag statistics
   */
  const getTagStats = () => {
    const tagCounts: Record<string, number> = {}
    books.forEach((book) => {
      book.Tags.forEach((tag) => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1
      })
    })
    return Object.entries(tagCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10) // Top 10 tags
  }

  /**
   * Calculate language statistics
   */
  const getLanguageStats = () => {
    const languageCounts: Record<string, number> = {}
    books.forEach((book) => {
      const languages = book.Language.split('/').map((lang) => lang.trim())
      languages.forEach((lang) => {
        languageCounts[lang] = (languageCounts[lang] || 0) + 1
      })
    })
    return Object.entries(languageCounts).sort(([, a], [, b]) => b - a)
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading stats...</div>
      </main>
    )
  }

  const tagStats = getTagStats()
  const languageStats = getLanguageStats()

  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation
        currentPage="statistics"
        title="Bookshelf Statistics"
        subtitle="Overview of your book collection"
      />

      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Total Books
              </h3>
              <p className="text-3xl font-bold text-indigo-600">
                {books.length}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Unique Tags
              </h3>
              <p className="text-3xl font-bold text-green-600">
                {tagStats.length}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Languages
              </h3>
              <p className="text-3xl font-bold text-purple-600">
                {languageStats.length}
              </p>
            </div>
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Top Tags */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  Top Tags
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {tagStats.map(([tag, count], index) => (
                    <div
                      key={tag}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-500 w-6">
                          {index + 1}.
                        </span>
                        <span className="ml-3 text-gray-900">{tag}</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                          <div
                            className="bg-indigo-600 h-2 rounded-full"
                            style={{
                              width: `${
                                (count /
                                  Math.max(...tagStats.map(([, c]) => c))) *
                                100
                              }%`,
                            }}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-900 w-8 text-right">
                          {count}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Languages */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  Languages
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {languageStats.map(([language, count], index) => (
                    <div
                      key={language}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-500 w-6">
                          {index + 1}.
                        </span>
                        <span className="ml-3 text-gray-900">{language}</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                          <div
                            className="bg-purple-600 h-2 rounded-full"
                            style={{
                              width: `${
                                (count /
                                  Math.max(
                                    ...languageStats.map(([, c]) => c),
                                  )) *
                                100
                              }%`,
                            }}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-900 w-8 text-right">
                          {count}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Reading Insights */}
          <div className="mt-8 bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Reading Insights
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    Most Popular Authors
                  </h3>
                  <div className="space-y-2">
                    {Object.entries(
                      books.reduce((acc, book) => {
                        acc[book.Author] = (acc[book.Author] || 0) + 1
                        return acc
                      }, {} as Record<string, number>),
                    )
                      .sort(([, a], [, b]) => b - a)
                      .slice(0, 5)
                      .map(([author, count]) => (
                        <div
                          key={author}
                          className="flex justify-between items-center"
                        >
                          <span className="text-gray-900 truncate">
                            {author}
                          </span>
                          <span className="text-sm text-gray-500">
                            {count} book{count > 1 ? 's' : ''}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    Collection Breakdown
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-900">Fiction</span>
                      <span className="text-sm text-gray-500">
                        {
                          books.filter((book) =>
                            book.Tags.some((tag) =>
                              tag.toLowerCase().includes('fiction'),
                            ),
                          ).length
                        }{' '}
                        books
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-900">Non-Fiction</span>
                      <span className="text-sm text-gray-500">
                        {
                          books.filter((book) =>
                            book.Tags.some((tag) =>
                              tag.toLowerCase().includes('non-fiction'),
                            ),
                          ).length
                        }{' '}
                        books
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-900">Multi-language</span>
                      <span className="text-sm text-gray-500">
                        {
                          books.filter((book) => book.Language.includes('/'))
                            .length
                        }{' '}
                        books
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
