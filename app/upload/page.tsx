'use client'

import { useState } from 'react'
import { Upload, Camera, BookOpen, Sparkles, ArrowRight } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Button from '@/components/ui/Button'

/**
 * Upload page for adding bookshelf photos to update the library
 */
export default function UploadPage() {
  const [dragActive, setDragActive] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [isProcessing, setIsProcessing] = useState(false)

  /**
   * Handle drag events for file upload
   */
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  /**
   * Handle file drop
   */
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const droppedFiles = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith('image/'),
    )
    setFiles((prev) => [...prev, ...droppedFiles])
  }

  /**
   * Handle file input change
   */
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files)
      setFiles((prev) => [...prev, ...selectedFiles])
    }
  }

  /**
   * Remove file from selection
   */
  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  /**
   * Process uploaded images (placeholder)
   */
  const processImages = async () => {
    setIsProcessing(true)

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // TODO: Implement actual image processing
    // - Upload to Supabase Storage
    // - Call OpenAI Vision API for OCR
    // - Extract book titles and authors
    // - Enrich with Goodreads data
    // - Save to database

    setIsProcessing(false)
    alert('Processing complete! (This is a placeholder)')
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation
        currentPage="upload"
        title="Add Books to Library"
        subtitle="Upload photos of your bookshelf to automatically catalog your collection"
      />

      <div className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* How it works */}
          <div className="mb-8 bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              How it works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Camera className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Upload Photos
                </h3>
                <p className="text-sm text-gray-600">
                  Take photos of your bookshelf and upload them here
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Sparkles className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  AI Processing
                </h3>
                <p className="text-sm text-gray-600">
                  Our AI extracts book titles, authors, and enriches with
                  metadata
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <BookOpen className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Organized Library
                </h3>
                <p className="text-sm text-gray-600">
                  Your books are automatically organized and searchable
                </p>
              </div>
            </div>
          </div>

          {/* Upload Area */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Upload Bookshelf Photos
            </h2>

            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-lg text-gray-600 mb-2">
                Drag and drop your bookshelf photos here
              </p>
              <p className="text-sm text-gray-500 mb-4">
                or click to select files
              </p>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                id="file-input"
              />
              <label htmlFor="file-input">
                <Button className="cursor-pointer">Select Photos</Button>
              </label>
            </div>

            {/* File List */}
            {files.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  Selected Files ({files.length})
                </h3>
                <div className="space-y-2">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                          <Camera className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {file.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFile(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Process Button */}
            {files.length > 0 && (
              <div className="mt-6 flex justify-center">
                <Button
                  onClick={processImages}
                  disabled={isProcessing}
                  size="lg"
                  className="flex items-center"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      Process Images
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>

          {/* Technical Details */}
          <div className="mt-8 bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              🚧 Coming Soon: Full Implementation
            </h3>
            <div className="text-sm text-gray-600 space-y-2">
              <p>
                <strong>Current:</strong> This is a placeholder UI demonstrating
                the upload flow.
              </p>
              <p>
                <strong>Next:</strong> Integration with Supabase Storage, OpenAI
                Vision API, and automatic book enrichment.
              </p>
              <p>
                <strong>Features:</strong> OCR text extraction, Goodreads
                metadata, auto-tagging, and database storage.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
