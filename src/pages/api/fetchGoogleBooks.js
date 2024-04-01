// pages/api/fetchGoogleBooks.js

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" })
    }

    const { titles } = req.body

    if (!titles || !Array.isArray(titles) || titles.length === 0) {
        return res.status(400).json({ error: "No titles received" })
    }

    const fetchedBooks = await Promise.all(
        titles.map(async (title) => {
            const API_URL = `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(
                title
            )}&key=${process.env.GOOGLE_BOOKS_API_KEY}`
            try {
                const response = await fetch(API_URL)
                const data = await response.json()
                if (data.items && data.items.length > 0) {
                    const book = data.items[0]
                    return book
                }
            } catch (error) {
                console.error(`Error fetching book: ${title}`, error)
                return null
            }
        })
    )

    const fictionBooks = fetchedBooks.filter((book) => book !== null)

    res.status(200).json({ items: fictionBooks })
}
