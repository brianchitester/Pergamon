import Navigation from '@/components/Navigation'
import BookTable from '@/components/BookTable'

/**
 * Demo page that displays the bookshelf
 */
export default function DemoPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation
        currentPage="library"
        title="Pergamon Bookshelf"
        subtitle="Your personal book collection"
      />

      {/* Main content */}
      <div className="py-8">
        <BookTable />
      </div>
    </main>
  )
}
