import PromptForm from "./components/PromptForm.jsx"
import React from "react"

function App() {

  const handlePromptSubmit = prompt => {
    setCurrentPrompt(prompt)
    console.log("stored prompt:", prompt)
  }
  
  const [currentPrompt, setCurrentPrompt] = React.useState(``)
  const [currentResponse, setCurrentResponse] = React.useState(``)
  const [isLoading, setIsLoading] = React.useState(false)

  console.log("currentPrompt state:", currentPrompt)

  return (
    <main>
      <h1>Smart Study Buddy</h1>
      <PromptForm onSubmit={handlePromptSubmit} />
    </main>
  )
}

export default App
