
import React, { useState } from 'react';
import axios from 'axios';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (input.trim()) {
      const newMessage = { text: input, sender: 'user' };
      setMessages([...messages, newMessage]);
      
      // Clear input field
      setInput('');
      
      // Send the message to the AI backend
      try {
        const response = await axios.post('YOUR_BACKEND_API_ENDPOINT', { message: input });
        const botMessage = { text: response.data.reply, sender: 'bot' };
        setMessages([...messages, newMessage, botMessage]);
      } catch (error) {
        console.error('Error fetching the response:', error);
      }
    }
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatBot;
