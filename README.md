# Smart Study Buddy

A responsive, dark-themed AI-powered chat application built with React and Node.js. Users can interact with OpenAI's GPT-3.5 model, track session history, download conversations, and continue chats across page reloads.

## Demo Screenshot

![Demo Screenshot](screenshot.png)

## Features

* AI-powered chat using OpenAI GPT-3.5
* Session history preserved in localStorage
* Timestamps for each user and AI message
* Auto-scroll to latest message
* Download chat as a plain text file
* Clear chat functionality
* Responsive UI – works on mobile, tablet, laptop, and desktop
* Dark theme for comfortable night-time usage

## Technologies Used

* **Frontend:** React, HTML, CSS
* **Backend:** Node.js, Express
* **API:** OpenAI Chat Completions
* **State Management:** React Hooks (`useState`, `useEffect`, `useRef`)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/JANS66/study-buddy.git
cd study-buddy
```

2. Install backend dependencies:

```bash
cd backend
npm install
```

3. Install frontend dependencies:

```bash
cd ../
npm install
```

4. Create a `.env` file in the `backend` folder with your OpenAI API key:

```env
OPENAI_KEY=your_openai_api_key_here
```

5. Start the backend server:

```bash
cd backend
node server.js
```

6. Start the frontend app:

```bash
cd ../
npm run dev   # or npm start if using create-react-app
```

7. Open your browser at `http://localhost:5173` (or the port your dev server runs on).

## Usage

1. Type a question or prompt into the input field.
2. Press Enter or click the Send button.
3. The AI response will appear in the chat below.
4. Scroll through previous messages — the app persists history even after refresh.
5. Use **Download Chat** to save the conversation as a `.txt` file.
6. Use **Clear Chat** to reset the session.

## Folder Structure

```
smart-study-buddy/
│
├── backend/              # Express server
│   ├── server.js         # Backend API endpoint
│   └── .env              # OpenAI API key
│
├── src/                  # React frontend
│   ├── App.jsx
│   ├── components/
│   │   └── PromptForm.jsx
│   ├── api.js
│   └── index.css
│
├── package.json
└── README.md
```

## Customizations

* Change AI model in `server.js` (e.g., `gpt-3.5-turbo` → `gpt-4`).
* Adjust max tokens in `server.js` for longer or shorter responses.
* Modify CSS in `index.css` to customize dark theme, colors, or responsive layout.

## Future Improvements

* Dark/light theme toggle.
* Chat export in JSON format.
* AI typing animation for better UX.
* Message search or filtering.

## License

This project is MIT licensed.