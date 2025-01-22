import OpenAI from "openai"

// This API route is used to find 3 similar books to a given book description (provided by Google Books API)
export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" })
    }

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    })

    const { description } = req.body

    const prompt = `Given the following book description, give me the titles of 3 similar (not the exact same one) novels in English (similar in terms of core themes, narrative style, or settings and locations...), simply separated by a comma, nothing else. Description:\n\n${description}`

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4-0125-preview",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
            temperature: 0.7,
            max_tokens: 64,
            top_p: 1.0,
            frequency_penalty: 0.5,
            presence_penalty: 0.0,
        })

        const messageContent = response.choices[0].message.content
        const titles = messageContent.trim().split(", ")

        res.status(200).json({ titles })
    } catch (error) {
        console.error("Error finding similar books:", error)
        res.status(500).json({ error: "Failed to find similar books" })
    }
}
