import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL || '';

const SUGGESTIONS = [
  { icon: '📦', text: 'What inventory is currently available?' },
  { icon: '💰', text: 'Show pole branding options with prices' },
  { icon: '📋', text: 'Which units are reserved and for whom?' },
  { icon: '📊', text: "What's our total revenue so far?" },
  { icon: '🏷️', text: 'Exhibitor vs Non-Exhibitor pricing?' },
  { icon: '📍', text: 'Show branding options near Hall 7' },
];

function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const sendMessage = async (text) => {
    if (!text.trim() || loading) return;

    const userMessage = { role: 'user', content: text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const history = messages
        .filter(m => m.role !== 'system')
        .slice(-10)
        .map(m => ({ role: m.role, content: m.content }));

      const res = await axios.post(`${API}/api/chat`, { message: text, history });
      setMessages(prev => [...prev, { role: 'assistant', content: res.data.response }]);
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'system',
        content: err.response?.data?.error || 'Connection error. Please check if the server is running.',
      }]);
    }

    setLoading(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const isEmpty = messages.length === 0;

  return (
    <div className="chat-page">
      {isEmpty ? (
        <div className="chat-welcome">
          <div className="welcome-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#e94560" strokeWidth="1.5">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </div>
          <h1>ITME Branding Assistant</h1>
          <p>Ask me anything about inventory, pricing, availability, or branding locations.</p>
          <div className="suggestions-grid">
            {SUGGESTIONS.map((s, i) => (
              <button key={i} className="suggestion-card" onClick={() => sendMessage(s.text)}>
                <span className="suggestion-icon">{s.icon}</span>
                <span>{s.text}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="chat-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`msg-row ${msg.role}`}>
              <div className="msg-avatar">
                {msg.role === 'user' ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                ) : msg.role === 'assistant' ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                )}
              </div>
              <div className={`msg-bubble ${msg.role}`}>
                {msg.role === 'assistant' ? (
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      table: ({ children }) => (
                        <div className="table-wrap">
                          <table>{children}</table>
                        </div>
                      ),
                    }}
                  >{msg.content}</ReactMarkdown>
                ) : (
                  <p>{msg.content}</p>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="msg-row assistant">
              <div className="msg-avatar">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              </div>
              <div className="msg-bubble assistant">
                <div className="typing-indicator">
                  <span></span><span></span><span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      )}

      <div className="chat-input-bar">
        <div className="input-container">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about inventory, pricing, availability..."
            disabled={loading}
          />
          <button
            className="send-btn"
            onClick={() => sendMessage(input)}
            disabled={loading || !input.trim()}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </div>
        <p className="input-hint">Press Enter to send. AI responses are based on uploaded documents.</p>
      </div>
    </div>
  );
}

export default ChatPage;
