
import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { type: 'user', content: userMessage }]);

    try {
      const response = await axios.post('/api/chat', { message: userMessage });
      setMessages(prev => [...prev, { type: 'bot', content: response.data.message }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { type: 'error', content: 'Error processing request' }]);
    }
  };

  return (
    <div className="container">
      <div className="chat-container">
        {messages.map((msg, idx) => (
          <div key={idx} className={msg.type}>
            {msg.content}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
