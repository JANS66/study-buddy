import PromptForm from "./components/PromptForm.jsx"

function App() {

  const handlePromptSubmit = prompt => console.log(prompt)

  return (
    <main>
      <h1>Smart Study Buddy</h1>
      <PromptForm onSubmit={handlePromptSubmit} />
    </main>
  )
}

export default App
