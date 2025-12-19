import PromptForm from "./components/PromptForm.jsx"
import React from "react"
import { getAIResponse } from "./api.js"
import "./index.css"

function App() {

  const [currentPrompt, setCurrentPrompt] = React.useState(``)
  const [currentResponse, setCurrentResponse] = React.useState(``)
  const [isLoading, setIsLoading] = React.useState(false)

  async function handlePromptSubmit(prompt) {
    setCurrentPrompt(prompt)
    setCurrentResponse(``)
    setIsLoading(true)
    try {
      const text = await getAIResponse(prompt)
      setCurrentResponse(text)
    } catch {
      setCurrentResponse(`Error calling AI`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main>
      <h1>Smart Study Buddy</h1>
      <PromptForm onSubmit={handlePromptSubmit} />
      <div className="chat">
        {currentPrompt && <p><strong>You:</strong> {currentPrompt}</p>}
        {isLoading && <p><em>Thinking...</em></p>}
        {currentResponse && <p><strong>AI:</strong> {currentResponse}</p>}
      </div>
    </main>
  )
}

export default App
