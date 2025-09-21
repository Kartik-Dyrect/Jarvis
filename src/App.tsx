import { useState } from 'react';
import './App.css';

// This line reads the environment variable you set in Vercel
const JARVIS_BRAIN_URL = import.meta.env.VITE_SUPABASE_FUNCTION_URL;

function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('I am online and ready. Ask me anything.');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!prompt || isLoading) return;

    setIsLoading(true);
    setResponse('Thinking...');

    if (!JARVIS_BRAIN_URL) {
      setResponse("Configuration error: The function URL is not set in Vercel's environment variables.");
      setIsLoading(false);
      return;
    }

    try {
      // This is the REAL API call to your Supabase function
      const res = await fetch(JARVIS_BRAIN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: prompt }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || `HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      setResponse(data.response);

    } catch (error) {
      console.error('Fetch Error:', error);
      // Check if error is an instance of Error before accessing message
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
      setResponse(`Sorry, an error occurred: ${errorMessage}`);
    } finally {
      setIsLoading(false);
      setPrompt('');
    }
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
          {isLoading ? 'Thinking...' : 'Send'}
        </button>
      </form>
    </div>
  );
}

export default App;