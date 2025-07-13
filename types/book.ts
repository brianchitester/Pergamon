/**
 * Represents a book in the user's bookshelf
 * @interface Book
 */
export interface Book {
  /** The title of the book */
  Title: string

  /** The author(s) of the book */
  Author: string

  /** The language(s) the book is written in */
  Language: string

  /** URL to the book's Goodreads page */
  Goodreads: string

  /** Array of tags/genres associated with the book */
  Tags: string[]
}

/**
 * Type for filtering books by various criteria
 * @interface BookFilter
 */
export interface BookFilter {
  /** Filter by search term in title or author */
  search?: string

  /** Filter by specific genre/tag */
  genre?: string

  /** Filter by language */
  language?: string
}

/**
 * Type for sorting books
 * @type BookSortKey
 */
export type BookSortKey = 'Title' | 'Author' | 'Language'

/**
 * Type for sort direction
 * @type SortDirection
 */
export type SortDirection = 'asc' | 'desc'
