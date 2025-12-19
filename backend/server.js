import express from "express" // Web framework for Node.js. Handles routes and requests
import cors from "cors" // Allows frontend (React) on a different port to call backend. Without it, browser blocks requests
import fetch from "node-fetch" // Lets backend make HTTP requests to OpenAI API
import dotenv from "dotenv" // Loads .env file variables into process.env
import path from "path"
import { fileURLToPath } from "url"

dotenv.config()

const app = express()
app.use(cors()) // Enable cross-origin requests
app.use(express.json()) // Parse incoming JSON request bodies (so req.body is a JS object)

app.post("/api/generate", async (req, res) => {
  const { prompt } = req.body // Extract prompt from request body

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
    const text = data.choices?.[0]?.message?.content || `No response from AI` // AI response text
    res.json({ text }) // Sends AI response back to React

  } catch (error) {
    console.error(`OpenAI Error:`, error)
    res.status(500).json({ error: `Server error` })
  }
})

const __filename = fileURLToPath(import.meta.url) // Full path to server.js
const __dirname = path.dirname(__filename) // Folder where server.js lives

if (process.env.NODE_ENV === `production`) { // This code only runs on deployed server, not when coding locally
  const distPath = path.join(__dirname, `../dist`)
  app.use(express.static(distPath)) // Serve the React static files

  app.use((req, res) => { // Whatever page user visits, serve React's index.html
    res.sendFile(path.join(distPath, `index.html`))
  })
}

const PORT = process.env.PORT || 3000 // Hosting platforms assign a port dynamically, local computer doesnt, so fallback to 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))