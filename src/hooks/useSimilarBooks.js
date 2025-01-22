import { useEffect, useState } from "react"

// Custom hook to fetch similar books based on the selected book's description
export const useSimilarBooks = (description) => {
    const [similarBooks, setSimilarBooks] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!description) return

        const fetchSimilarBooks = async () => {
            setLoading(true)

            try {
                const titles = await fetchSimilarBookTitles(description)
                const bookDetails = await fetchBookDetails(titles)
                setSimilarBooks(bookDetails)
            } catch (err) {
                setError(
                    `Failed to fetch similar books: ${
                        err.message || err.toString()
                    }`
                )
            } finally {
                setLoading(false)
            }
        }

        fetchSimilarBooks()
    }, [description])

    const fetchSimilarBookTitles = async (description) => {
        const response = await fetch("/api/getThreeSimilarBooksTitles", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ description }),
        })
        if (!response.ok) {
            throw new Error("Fetching similar books titles failed")
        }
        const { titles } = await response.json()
        return titles
    }

    const fetchBookDetails = async (titles) => {
        const response = await fetch("/api/fetchGoogleBooks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ titles }),
        })
        if (!response.ok) {
            throw new Error("Fetching similar books details failed")
        }
        const data = await response.json()
        const firstThreeBooks = data.items.slice(0, 3)
        return firstThreeBooks
    }

    return { similarBooks, loading, error }
}
