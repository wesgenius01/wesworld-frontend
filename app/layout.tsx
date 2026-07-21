import type { Metadata } from 'next'
import Starfield from '@/components/Starfield'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ChatWidget from '@/components/ChatWidget'
import './globals.css'

export const metadata: Metadata = {
  title: 'Wesworld — Where Consciousness Remembers Itself',
  description: 'One unified field. Consciousness remembrance, delivered.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Jost:wght@300;400;500;600&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Starfield />
        <div className="vignette" />
        <div className="noise" />
        <Header />
        <main>{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  )
}