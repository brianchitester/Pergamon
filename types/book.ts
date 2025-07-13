/**
 * Represents a book in the bookshelf
 */
export interface Book {
  /** The title of the book */
  Title: string
  /** The author(s) of the book */
  Author: string
  /** The language the book is written in */
  Language: string
  /** URL to the book's Goodreads page */
  Goodreads: string
  /** Array of genre/topic tags for the book */
  Tags: string[]
}

/**
 * Represents the filters that can be applied to the book list
 */
export interface BookFilters {
  /** Search query for title and author */
  search: string
  /** Filter by specific genre/tag */
  genre: string
  /** Filter by language */
  language: string
}
