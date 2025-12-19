// Why do i use a backend? Browsers cannot safely call OpenAI API 
// directly (CORS issues + exposing API key). Backend acts as a proxy

export async function getAIResponse(prompt) {
    const response = await fetch(`/api/generate`, { // http://localhost:3000/api/generate
        method: `POST`,
        headers: { "Content-Type": "application/json"}, // Tells backend that the request body is JSON
        body: JSON.stringify({ prompt })  // Converts JS object to stirng so it can be sent over HTTP
    })
    const data = await response.json() // Waits for backend to respond and parses it as JSON
    return data.text // EXtract AIs response from the backend JSON
}