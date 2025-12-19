import express from "express" // Web framework for Node.js. Handles routes and requests
import cors from "cors" // Allows frontend (React) on a different port to call backend. Without it, browser blocks requests
import fetch from "node-fetch" // Lets backend make HTTP requests to OpenAI API
import dotenv from "dotenv" // Loads .env file variables into process.env

dotenv.config()
const app = express()
app.use(cors()) // Enable cross-origin requests
app.use(express.json()) // Parse incoming JSON request bodies (so req.body is a JS object)

app.post("/api/generate", async (req, req) => {
  const { prompt } = request.body // Extract prompt from request body

  try { // Ensures server doesnt crash and returns an error to frontend
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_KEY}`, // Sends API key
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "user", content: prompt } // OpenAI Chat API requires messaged with roles
        ],
        max_tokens: 300
      })
    })

    const data = await response.json()
    console.log("OpenAI API returned:", data)
    const text = data.choices?.[0]?.message?.content || "No response from AI" // AI response text
    res.json({ text }) // Sends AI response back to React
  } catch (error) {
    console.error(`Error calling OpenAI API:`, error)
    res.status(500).json({ error: error.message || "Server error" })
  }
})

app.listen(3000, () => console.log("Server running on port 3000")) // Starts backend on port 3000
