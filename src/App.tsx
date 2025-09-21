// src/App.tsx
import { useState } from "react";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("I am ready. Ask me anything.");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!prompt || isLoading) return;

    setIsLoading(true);
    setResponse("Thinking...");

    // This is a placeholder for now. We will connect this to a real AI brain in the next steps.
    setTimeout(() => {
      setResponse(`This is a placeholder response for: "${prompt}"`);
      setIsLoading(false);
      setPrompt("");
    }, 2000);
  };

  return (
    <div className="container">
      <h1>Jarvis Online</h1>
      <div className="response-box">{response}</div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask anything..."
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Thinking..." : "Send"}
        </button>
      </form>
    </div>
  );
}

export default App;
