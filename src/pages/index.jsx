import { useState } from "react"
import Image from "next/image"
import "../app/styles/globals.css"

export default function Home() {
    const [bookTitle, setBookTitle] = useState("")
    const [bookSuggestions, setBookSuggestions] = useState([])
    const [selectedBook, setSelectedBook] = useState(null)
    const [similarBooks, setSimilarBooks] = useState([])
    const [loading, setLoading] = useState(false)

    // Function to handle form submission
    async function handleSubmit(event) {
        event.preventDefault()
        setLoading(true)

        // Step 1: Fetch the book's description based on the title
        const bookToFindURL = `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(
            bookTitle
        )}&langRestrict=en&maxResults=5&key=${
            process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY
        }`

        try {
            const bookToFindRes = await fetch(bookToFindURL)
            const bookToFindData = await bookToFindRes.json()

            const filteredBooks =
                bookToFindData.items?.filter(
                    (book) => book.volumeInfo.description
                ) || []

            if (filteredBooks.length === 0) {
                throw new Error("No suitable books found with descriptions.")
            }

            const bookDescription = filteredBooks[0].volumeInfo.description

            // Fetch titles of similar books based on the description
            const similarBooksRes = await fetch("/api/getSimilarBooks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ description: bookDescription }),
            })
            const { titles: similarBooksTitles } = await similarBooksRes.json()

            // Fetch data of similar books based on titles
            const booksDataRes = await fetch("/api/fetchGoogleBooks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ titles: similarBooksTitles }),
            })
            const booksData = await booksDataRes.json()
            console.log("🚀 ~ handleSubmit ~ booksData:", booksData)

            setSimilarBooks(booksData.items || [])
        } catch (error) {
            console.error("Error:", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl font-bold">Find Similar Books</h1>
            <form onSubmit={handleSubmit} className="mt-4 w-full max-w-lg mb-4">
                <div className="flex items-center">
                    <input
                        type="text"
                        value={bookTitle}
                        onChange={(e) => setBookTitle(e.target.value)}
                        placeholder="Enter the title of a book..."
                        required
                        className="flex-1 px-4 py-2  border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2 text-white bg-indigo-600 rounded-r-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50"
                    >
                        {loading ? (
                            "Loading..."
                        ) : (
                            <Image
                                src="/search-line.svg"
                                alt="Search Icon"
                                width={24}
                                height={24}
                            />
                        )}
                    </button>
                </div>
            </form>
            {similarBooks.length > 0 && (
                <div className="mt-8 w-full max-w-6xl">
                    <ul className="list-none flex -mx-2">
                        {" "}
                        {similarBooks.map((book, index) => (
                            <li
                                key={index}
                                className="flex flex-col items-center space-x-4 p-2"
                            >
                                {book.volumeInfo.imageLinks?.thumbnail && (
                                    <div className="relative w-32 h-48 rounded">
                                        <Image
                                            src={book.volumeInfo.imageLinks.thumbnail.replace(
                                                "http:",
                                                "https:"
                                            )}
                                            alt={`Cover of the book ${book.volumeInfo.title}`}
                                            layout="fill"
                                            objectFit="cover"
                                            className="rounded"
                                        />
                                    </div>
                                )}
                                <div className="content-center text-center">
                                    <h3 className="text-xl font-semibold pt-4">
                                        {book.volumeInfo.title}
                                    </h3>
                                    <p className="text-gray-300 text-sm">
                                        {book.volumeInfo.authors[0]}
                                    </p>
                                    <p className="text-gray-400 text-sm pt-4 text-left">
                                        {book.volumeInfo.description?.substring(
                                            0,
                                            150
                                        )}
                                        ...
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}
