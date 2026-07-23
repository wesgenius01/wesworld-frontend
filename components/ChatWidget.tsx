'use client'

import { useState } from 'react'

type Message = { role: 'user' | 'bot'; text: string }

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'bot',
      text: "Hi, I'm Mums 🌙 Ask me anything about Wesworld's frameworks, courses, or how to reach us.",
    },
  ])

  async function handleSend() {
    const trimmed = input.trim()
    if (!trimmed || loading) return
    setMessages((prev) => [...prev, { role: 'user', text: trimmed }])
    setInput('')
    setLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed }),
      })
      const data = await res.json()
      const answer = data.answer || "I'm having trouble answering right now — please try again or email enlightenment@wesworld.org."
      setMessages((prev) => [...prev, { role: 'bot', text: answer }])
    } catch (e: any) {
      setMessages((prev) => [
        ...prev,
        { role: 'bot', text: "Something went wrong connecting — please try again in a moment." },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mums-widget">
      {open && (
        <div className="mums-panel">
          <div className="mums-header">
            <span>Mums</span>
            <button onClick={() => setOpen(false)} aria-label="Close chat">
              ×
            </button>
          </div>
          <div className="mums-messages">
            {messages.map((m, i) => (
              <div key={i} className={`mums-msg mums-msg-${m.role}`}>
                {m.text}
              </div>
            ))}
            {loading && <div className="mums-msg mums-msg-bot">...</div>}
          </div>
          <div className="mums-input-row">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask Mums something..."
              disabled={loading}
            />
            <button onClick={handleSend} disabled={loading}>
              Send
            </button>
          </div>
        </div>
      )}
      <button className="mums-toggle" onClick={() => setOpen((o) => !o)}>
        {open ? 'Close' : 'Ask Mums'}
      </button>
    </div>
  )
}