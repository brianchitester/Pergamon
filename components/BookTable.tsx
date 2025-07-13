'use client'

import { useMemo } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  ColumnDef,
  flexRender,
  SortingState,
} from '@tanstack/react-table'
import { ExternalLink, Search, Filter, X } from 'lucide-react'
import { Book } from '@/types/book'
import { useBooks } from '@/lib/useBooks'

/**
 * BookTable component for displaying and filtering books
 */
export default function BookTable() {
  const {
    books,
    loading,
    error,
    filters,
    uniqueGenres,
    uniqueLanguages,
    updateSearch,
    updateGenre,
    updateLanguage,
    clearFilters,
    totalBooks,
    filteredCount,
  } = useBooks()

  const columns = useMemo<ColumnDef<Book>[]>(
    () => [
      {
        accessorKey: 'Title',
        header: 'Title',
        cell: ({ row }) => (
          <div className="font-medium text-gray-900">{row.original.Title}</div>
        ),
      },
      {
        accessorKey: 'Author',
        header: 'Author',
        cell: ({ row }) => (
          <div className="text-gray-600">{row.original.Author}</div>
        ),
      },
      {
        accessorKey: 'Tags',
        header: 'Genres',
        cell: ({ row }) => (
          <div className="flex flex-wrap gap-1">
            {row.original.Tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {tag}
              </span>
            ))}
          </div>
        ),
      },
      {
        accessorKey: 'Language',
        header: 'Language',
        cell: ({ row }) => (
          <div className="text-gray-600">{row.original.Language}</div>
        ),
      },
      {
        accessorKey: 'Goodreads',
        header: 'Link',
        cell: ({ row }) => (
          <a
            href={row.original.Goodreads}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 transition-colors"
          >
            <ExternalLink className="w-4 h-4 mr-1" />
            Goodreads
          </a>
        ),
      },
    ],
    [],
  )

  const table = useReactTable({
    data: books,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 text-lg font-semibold">
          Error loading books
        </div>
        <div className="text-gray-600 mt-2">{error}</div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Your Library
        </h1>
        <p className="text-gray-600 text-sm sm:text-base">
          Showing {filteredCount} of {totalBooks} books
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
        <div className="space-y-4 sm:space-y-0 sm:flex sm:flex-wrap sm:gap-4 sm:items-center">
          {/* Search */}
          <div className="flex-1 min-w-0 sm:min-w-64">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by title or author..."
                value={filters.search}
                onChange={(e) => updateSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Genre and Language filters in a row on mobile */}
          <div className="flex gap-2 sm:gap-4">
            {/* Genre Filter */}
            <div className="flex-1 sm:min-w-48">
              <select
                value={filters.genre}
                onChange={(e) => updateGenre(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
              >
                <option value="">All Genres</option>
                {uniqueGenres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            </div>

            {/* Language Filter */}
            <div className="flex-1 sm:min-w-48">
              <select
                value={filters.language}
                onChange={(e) => updateLanguage(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
              >
                <option value="">All Languages</option>
                {uniqueLanguages.map((language) => (
                  <option key={language} value={language}>
                    {language}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Clear Filters */}
          {(filters.search || filters.genre || filters.language) && (
            <button
              onClick={clearFilters}
              className="w-full sm:w-auto inline-flex items-center justify-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <X className="w-4 h-4 mr-1" />
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="flex items-center space-x-1">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {{
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4">
        {books.map((book, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
          >
            <div className="space-y-3">
              {/* Title and Author */}
              <div>
                <h3 className="font-semibold text-gray-900 text-lg leading-tight">
                  {book.Title}
                </h3>
                <p className="text-gray-600 text-sm mt-1">by {book.Author}</p>
              </div>

              {/* Genres */}
              <div>
                <div className="flex flex-wrap gap-1">
                  {book.Tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Language and Link */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  Language: {book.Language}
                </span>
                <a
                  href={book.Goodreads}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 transition-colors"
                >
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Goodreads
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No results */}
      {filteredCount === 0 && (
        <div className="text-center py-12">
          <Filter className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No books found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search or filters
          </p>
        </div>
      )}
    </div>
  )
}
