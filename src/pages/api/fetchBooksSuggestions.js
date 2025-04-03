import fetchWithTimeout from "@/lib/fetchWithTimeout"

// This API route fetches book suggestions from the Google Books API based on the title of the book entered by the user
export default async function handler(req, res) {
    if (req.method === "GET") {
        const { title } = req.query
        const suggestionsURL = `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(
            title
        )}&langRestrict=en&maxResults=5&key=${process.env.GOOGLE_BOOKS_API_KEY}`

        try {
            const response = await fetchWithTimeout(suggestionsURL)
            const data = await response.json()

            res.status(200).json(data.items || [])
        } catch (error) {
            console.error("Error fetching book suggestions:", error)
            res.status(500).json({ error: "Error fetching book suggestions" })
        }
    } else {
        res.setHeader("Allow", ["GET"])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}
