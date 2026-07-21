'use client'

import { useState } from 'react'

const FAQ: { keywords: string[]; answer: string }[] = [
  {
    keywords: ['hello', 'hi', 'hey'],
    answer:
      "Hi, I'm Mums 🌙 — here to help you find your way around Wesworld. Ask me about our frameworks, the Academy, or how to get in touch.",
  },
  {
    keywords: ['framework', 'frameworks'],
    answer:
      "The Frameworks are Wesworld's core lenses on consciousness and spirituality. Explore them all on the Frameworks page — just click 'Frameworks' in the menu.",
  },
  {
    keywords: ['academy', 'course', 'courses', 'class', 'classes'],
    answer:
      "The Academy is where you'll find our courses, one-on-one sessions, and community spaces. Head to the Academy page from the menu to see what's currently open.",
  },
  {
    keywords: ['price', 'pricing', 'cost', 'how much'],
    answer:
      "Pricing varies by course and service — you'll find exact prices listed on each course or service card in the Academy section.",
  },
  {
    keywords: ['refund', 'cancel', 'cancellation'],
    answer:
      "We offer refunds within 14 days of purchase, as long as the course hasn't been substantially completed. Full details are in our Terms and Conditions page.",
  },
  {
    keywords: ['privacy', 'data'],
    answer: 'You can read exactly how we handle your data in our Privacy Policy, linked in the footer.',
  },
  {
    keywords: ['contact', 'email', 'reach', 'support', 'help'],
    answer: 'You can reach the Wesworld team directly at enlightenment@wesworld.org.',
  },
  {
    keywords: ['about', 'founder', 'who'],
    answer: 'You can learn about the vision, mission, and founder of Wesworld on the About Us page.',
  },
]

const DEFAULT_ANSWER =
  "I don't have an answer for that just yet — but you can reach the Wesworld team directly at enlightenment@wesworld.org and they'll help you out."

function findAnswer(input: string): string {
  const lower = input.toLowerCase()
  for (const entry of FAQ) {
    if (entry.keywords.some((k) => lower.includes(k))) {
      return entry.answer
    }
  }
  return DEFAULT_ANSWER
}

type Message = { role: 'user' | 'bot'; text: string }

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'bot',
      text: "Hi, I'm Mums 🌙 Ask me about our frameworks, the Academy, or how to reach us.",
    },
  ])

  function handleSend() {
    const trimmed = input.trim()
    if (!trimmed) return
    const answer = findAnswer(trimmed)
    setMessages((prev) => [...prev, { role: 'user', text: trimmed }, { role: 'bot', text: answer }])
    setInput('')
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
          </div>
          <div className="mums-input-row">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask Mums something..."
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
      <button className="mums-toggle" onClick={() => setOpen((o) => !o)}>
        {open ? 'Close' : 'Ask Mums'}
      </button>
    </div>
  )
}