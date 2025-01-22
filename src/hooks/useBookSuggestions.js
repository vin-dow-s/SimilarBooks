import { useEffect, useRef, useState } from "react"

// Custom hook to fetch book suggestions from Google Books API based on the user's input
export const useBookSuggestions = (bookTitle) => {
    const [suggestions, setSuggestions] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const abortController = useRef(new AbortController())

    useEffect(() => {
        if (!bookTitle) {
            setSuggestions([])
            return
        }

        const fetchSuggestions = async () => {
            abortController.current.abort()
            abortController.current = new AbortController()

            setLoading(true)

            try {
                const suggestions = await fetchBooksSuggestions(
                    bookTitle,
                    abortController.current
                )
                setSuggestions(suggestions || [])
            } catch (err) {
                if (err.name !== "AbortError") {
                    setError(
                        `Failed to fetch suggestions: ${
                            err.message || err.toString()
                        }`
                    )
                }
            } finally {
                setLoading(false)
            }
        }

        const debounceTimeout = setTimeout(fetchSuggestions, 700)
        return () => {
            clearTimeout(debounceTimeout)
            abortController.current.abort()
        }
    }, [bookTitle])

    const fetchBooksSuggestions = async (bookTitle, controller) => {
        try {
            const response = await fetch(
                `/api/fetchBooksSuggestions?title=${encodeURIComponent(
                    bookTitle
                )}`,
                { signal: controller.signal }
            )
            if (!response.ok) {
                throw new Error("Fetching books suggestions failed")
            }
            const data = await response.json()
            return data
        } catch (error) {
            if (error.name === "AbortError") {
                console.log("Previous request was aborted")
            } else {
                console.error("Error fetching book suggestions:", error)
            }
        }
    }

    return { suggestions, loading, error }
}
