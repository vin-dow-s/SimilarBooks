import Head from "next/head"
import Image from "next/image"
import { useState } from "react"

import BookSuggestions from "@/components/BookSuggestions"
import LoadingSkeleton from "@/components/LoadingSkeleton"
import SimilarBooks from "@/components/SimilarBooks"

import { useBookSuggestions } from "@/hooks/useBookSuggestions"
import { useSimilarBooks } from "@/hooks/useSimilarBooks"

const Home = () => {
    const [bookTitle, setBookTitle] = useState("")
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [selectedBook, setSelectedBook] = useState(null)

    const { suggestions, loading: loadingSuggestions } =
        useBookSuggestions(bookTitle)
    const { similarBooks, loading: loadingSimilarBooks } = useSimilarBooks(
        selectedBook?.volumeInfo?.description
    )

    // Function to handle book selection from dropdown
    const handleSelectBook = (book) => {
        setBookTitle(book.volumeInfo.title)
        setSelectedBook(book)
        setShowSuggestions(false)
    }

    return (
        <>
            <Head>
                <title>Find Similar Books</title>
                <meta
                    name="description"
                    content="Search for a book and get similar suggestions based on its description."
                />
            </Head>
            <div
                className={`relative flex flex-col items-center ${
                    loadingSimilarBooks || similarBooks.length > 0
                        ? "justify-center"
                        : "lg:justify-start lg:pt-44 justify-start"
                } min-h-dvh py-8 px-4 sm:px-6 lg:px-8`}
            >
                <h1 className="text-4xl lg:text-5xl font-bold lobster-two-regular mt-12">
                    Find Similar Books
                </h1>
                <form className="mt-6 w-full max-w-lg mb-12">
                    <div className="relative flex items-center w-full max-w-lg">
                        <input
                            type="text"
                            value={bookTitle}
                            onChange={(e) => {
                                setBookTitle(e.target.value)
                                setShowSuggestions(true)
                            }}
                            placeholder="Enter the title of a book..."
                            required
                            className="flex-1 px-6 py-3  border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
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
                                loading={loadingSuggestions}
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
                                        0
                                    )
                                }
                            }}
                            type="submit"
                            disabled={loadingSuggestions || loadingSimilarBooks}
                            className="relative flex justify-center items-center w-16 h-12 text-white bg-indigo-600 rounded-r-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50"
                        >
                            {loadingSuggestions || loadingSimilarBooks ? (
                                <div className="dot-flashing"></div>
                            ) : (
                                <Image
                                    src="/refresh-line.svg"
                                    alt="Refresh Icon"
                                    width={24}
                                    height={24}
                                />
                            )}
                        </button>
                    </div>
                    <p className="mt-2 text-sm text-gray-500 italic">
                        The results are English novels that share with the
                        provided book a common core theme, narrative style, or
                        setting/location.
                    </p>
                </form>

                {loadingSimilarBooks ? (
                    <LoadingSkeleton />
                ) : (
                    similarBooks.length > 0 && (
                        <SimilarBooks books={similarBooks} />
                    )
                )}
                <div className="absolute bottom-0 mb-2 text-sm">
                    © 2024- by{" "}
                    <a href="https://vindows.dev" className="italic">
                        Vindows
                    </a>
                    .
                </div>
            </div>
        </>
    )
}

export default Home
