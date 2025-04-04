'use client'

import { useBookSuggestions } from '@/hooks/useBookSuggestions'
import { useSimilarBooks } from '@/hooks/useSimilarBooks'
import { Book } from '@/lib/types'
import Image from 'next/image'
import { useState } from 'react'
import BookSuggestions from './BookSuggestions'
import LoadingSkeleton from './LoadingSkeleton'
import SimilarBooks from './SimilarBooks'

export default function SearchInterface() {
    const [bookTitle, setBookTitle] = useState('')
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [selectedBook, setSelectedBook] = useState<Book | null>(null)

    const { suggestions, loading: loadingSuggestions } =
        useBookSuggestions(bookTitle)
    const { similarBooks, loading: loadingSimilarBooks } = useSimilarBooks(
        selectedBook?.volumeInfo?.description || '',
    )

    const handleSelectBook = (book: Book) => {
        setBookTitle(book.volumeInfo.title)
        setSelectedBook(book)
        setShowSuggestions(false)
    }

    return (
        <div
            className={`relative flex flex-col items-center ${
                loadingSimilarBooks || similarBooks.length > 0
                    ? 'justify-center'
                    : 'justify-start lg:justify-start lg:pt-44'
            } min-h-dvh px-4 py-8 sm:px-6 lg:px-8`}
        >
            <h1 className="mt-12 text-4xl font-bold lg:text-5xl">
                Find Similar Books
            </h1>
            <form className="mt-6 mb-12 w-full max-w-lg">
                <div className="relative flex w-full max-w-lg items-center">
                    <input
                        type="text"
                        value={bookTitle}
                        onChange={(e) => {
                            setBookTitle(e.target.value)
                            setShowSuggestions(true)
                        }}
                        placeholder="Enter the title of a book..."
                        required
                        className="flex-1 rounded-l-md border-gray-300 bg-[#2B2A33] px-6 py-3 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600 focus:outline-hidden"
                        onBlur={() => {
                            setTimeout(() => setShowSuggestions(false), 100)
                        }}
                        onFocus={() => {
                            setShowSuggestions(true)
                        }}
                    />
                    {showSuggestions && suggestions.length > 0 && (
                        <BookSuggestions
                            suggestions={suggestions}
                            onSelect={handleSelectBook}
                        />
                    )}

                    <button
                        onClick={(event) => {
                            event.preventDefault()
                            if (selectedBook) {
                                const currentBook = selectedBook
                                setSelectedBook(null)
                                setTimeout(
                                    () => setSelectedBook(currentBook),
                                    0,
                                )
                                setHasSubmitted(true)
                            }
                        }}
                        type="submit"
                        disabled={loadingSuggestions || loadingSimilarBooks}
                        className="focus:ring-opacity-50 relative flex h-12 w-16 items-center justify-center rounded-r-md bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-600 focus:outline-hidden"
                    >
                        {loadingSuggestions || loadingSimilarBooks ? (
                            <div className="dot-flashing"></div>
                        ) : (
                            <Image
                                src="/icons/refresh-line.svg"
                                alt="Refresh Icon"
                                width={24}
                                height={24}
                            />
                        )}
                    </button>
                </div>
                <p className="mt-2 text-sm text-gray-500 italic">
                    The results are English novels that share with the provided
                    book a common core theme, narrative style, or
                    setting/location.
                </p>
            </form>

            {loadingSimilarBooks ? (
                <LoadingSkeleton />
            ) : hasSubmitted ? (
                similarBooks.length > 0 ? (
                    <SimilarBooks books={similarBooks} />
                ) : (
                    <p className="mt-8 text-lg text-gray-400">
                        😕 No results found. Try another title or check the
                        spelling.
                    </p>
                )
            ) : null}

            <div className="absolute bottom-0 mb-2 text-sm">
                © 2025- by{' '}
                <a href="mailto:vincent@vindows.dev" className="italic">
                    Vindows
                </a>
                .
            </div>
        </div>
    )
}
