import PromptForm from "./components/PromptForm.jsx"
import React from "react"
import { getAIResponse } from "./api.js"
import "./index.css"

function App() {

  const [isLoading, setIsLoading] = React.useState(false)
  const [sessionHistory, setSessionHistory] = React.useState(() => { // Using the lazy initializer function () => {} ensures it only reads localStorage once on mount
    const saved = localStorage.getItem(`sessionHistory`) // Gets saved JSON string
    if (saved) {
      const parsed = JSON.parse(saved) // Converts it back to JS array
      return parsed.map(message => ({
        ...message,
        time: new Date(message.time) // Convert string back to Date
      }))
    }
    return [] // If nothing is saved yet, default to []
  })

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

  React.useEffect(() => {
    localStorage.setItem(`sessionHistory`, JSON.stringify(sessionHistory))
  }, [sessionHistory])

  const formatTime = date => date.toLocaleTimeString([], { hour: `2-digit`, minute: `2-digit`, month: `short`, day: `numeric` })

  const downloadChat = () => { // Convert sessionHistory array into a single plain text string
    // Format each message as `You [HH:MM]: message` or `AI [HH:MM]: message`
    const text = sessionHistory.map(message => {
      const time = message.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

      return `${message.role === `user` ? `You` : `AI`} [${time}]: ${message.content}`
    })
      // Join all messages with newline characters so each message appears on a new line
      .join(`\n`)

    const blob = new Blob([text], { type: `text/plain` })
    const url = URL.createObjectURL(blob)

    const anchor = document.createElement(`a`)
    anchor.href = url
    anchor.download = `chat_history.txt`
    anchor.click()

    URL.revokeObjectURL(url)
  }

  return (
    <main>
      <h1>Smart Study Buddy</h1>
      <PromptForm onSubmit={handlePromptSubmit} />
      <button onClick={() => setSessionHistory([])}>Clear Chat</button>
      <button onClick={downloadChat}>Download Chat</button>
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
