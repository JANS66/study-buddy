import React from "react"

export default function PromptForm(properties) {
    // React state to store the current value of the input 
    // This is the `single source of truth` for the input 
    const [input, setInput] = React.useState(``)

    const handleSubmit = event => {
        event.preventDefault()
        properties.onSubmit(input)
        setInput(``)
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={input} // Controlled input: input field always shows the state value
                onChange={event => setInput(event.target.value)} 
                /*
                    onChange updates state whenever user types.
                    This keeps the state in sync with the UI.
                    Without value={input}, clearing input programmatically (setInput(``)) wont update the field.
                    Controlled input allows us to filter, validate, or transform input as it is typed.
                */
                placeholder="Type your prompt..." 
            />
            <button type="submit">Ask</button>
        </form>
    )
}