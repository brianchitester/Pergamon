import BookTable from '@/components/BookTable'

/**
 * Homepage component that displays the bookshelf
 */
export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BookTable />
      </div>
    </main>
  )
}
