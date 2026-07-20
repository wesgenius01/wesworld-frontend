export const runtime = 'edge'

export default function NotFound() {
  return (
    <section style={{ textAlign: 'center' }}>
      <div className="section-eyebrow">404</div>
      <h1 className="section-title" style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)' }}>
        Page not found
      </h1>
      <p className="prose">This page doesn't exist, or has moved.</p>
    </section>
  )
}