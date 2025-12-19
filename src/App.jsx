import PromptForm from "./components/PromptForm.jsx"
import React from "react"
import { getAIResponse } from "./api.js"
import "./index.css"

function App() {

  const [isLoading, setIsLoading] = React.useState(false)
  const [sessionHistory, setSessionHistory] = React.useState([])
  const chatEndRef = React.useRef(null) // Gives direct access to a DOM node

  async function handlePromptSubmit(prompt) {
    setIsLoading(true)

    setSessionHistory(previous => [
      ...previous,
      { role: `user`, content: prompt, time: new Date() }
    ])

    try {
      const text = await getAIResponse(prompt)
      setSessionHistory(previous => [
        ...previous,
        { role: `ai`, content: text, time: new Date() }
      ])
    } catch {
      setSessionHistory(previous => [
        ...previous,
        { role: `ai`, content: `Error calling AI`, time: new Date() }
      ])
    } finally {
      setIsLoading(false)
    }
  }

  React.useEffect(() => { // Reacts to updates in messages or loading,
    // and smoothly scrolls chat to bottom
    chatEndRef.current?.scrollIntoView({ behavior: `smooth` })
  }, [sessionHistory, isLoading])

  const formatTime = date => date.toLocaleTimeString([], { hour: `2-digit`, minute: `2-digit`, month: `short`, day: `numeric` })

  return (
    <main>
      <h1>Smart Study Buddy</h1>
      <PromptForm onSubmit={handlePromptSubmit} />
      <div className="chat">
        {sessionHistory.map((message, index) => (
          <p key={index} className={message.role === `user` ? `user` : `ai`}>
            <strong>{message.role === `user` ? `You` : `AI`}:</strong> {message.content}
            <span className="timestamp">{formatTime(message.time)}</span>
          </p>
        ))}

        {isLoading && <p><em>Thinking...</em></p>}
        <div ref={chatEndRef} />
      </div>
    </main>
  )
}

export default App
