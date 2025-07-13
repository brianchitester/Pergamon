'use client'

import { useState, useEffect, useMemo } from 'react'
import { Book, BookFilter } from '@/types/book'

/**
 * Custom hook for fetching and filtering book data
 * @returns Object containing books, loading state, error, and filter functions
 */
export function useBooks() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<BookFilter>({
    search: '',
    genre: '',
    language: '',
  })

  // Fetch books from the JSON file
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true)
        const response = await fetch('/user_bookshelf.json')
        if (!response.ok) {
          throw new Error('Failed to fetch books')
        }
        const data: Book[] = await response.json()
        setBooks(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()
  }, [])

  // Get unique genres from all books
  const uniqueGenres = useMemo(() => {
    const genres = new Set<string>()
    books.forEach((book) => {
      book.Tags.forEach((tag) => genres.add(tag))
    })
    return Array.from(genres).sort()
  }, [books])

  // Get unique languages from all books
  const uniqueLanguages = useMemo(() => {
    const languages = new Set<string>()
    books.forEach((book) => {
      languages.add(book.Language)
    })
    return Array.from(languages).sort()
  }, [books])

  // Filter books based on current filters
  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      // Search filter (title and author)
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase()
        const titleMatch = book.Title.toLowerCase().includes(searchTerm)
        const authorMatch = book.Author.toLowerCase().includes(searchTerm)
        if (!titleMatch && !authorMatch) return false
      }

      // Genre filter
      if (filters.genre && !book.Tags.includes(filters.genre)) {
        return false
      }

      // Language filter
      if (filters.language && book.Language !== filters.language) {
        return false
      }

      return true
    })
  }, [books, filters])

  // Update search filter
  const updateSearch = (search: string) => {
    setFilters((prev: BookFilter) => ({ ...prev, search }))
  }

  // Update genre filter
  const updateGenre = (genre: string) => {
    setFilters((prev: BookFilter) => ({ ...prev, genre }))
  }

  // Update language filter
  const updateLanguage = (language: string) => {
    setFilters((prev: BookFilter) => ({ ...prev, language }))
  }

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      search: '',
      genre: '',
      language: '',
    })
  }

  return {
    books: filteredBooks,
    loading,
    error,
    filters,
    uniqueGenres,
    uniqueLanguages,
    updateSearch,
    updateGenre,
    updateLanguage,
    clearFilters,
    totalBooks: books.length,
    filteredCount: filteredBooks.length,
  }
}
