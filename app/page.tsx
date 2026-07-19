import Link from 'next/link'
import { getGlobal, getFrameworks } from '@/lib/payload'

export const revalidate = 60

export default async function HomePage() {
  const [home, frameworks] = await Promise.all([
    getGlobal('home-page').catch(() => null),
    getFrameworks().catch(() => []),
  ])

  const heroEyebrow = home?.heroEyebrow || 'Consciousness Remembrance'
  const line1 = home?.heroTitleLine1 || 'Spirituality'
  const emphasis = home?.heroTitleEmphasis || 'and'
  const line2 = home?.heroTitleLine2 || 'Science'
  const tagline =
    home?.heroTagline || 'One unified field. Consciousness remembrance, delivered.'
  const primaryCta = home?.primaryCta || { label: 'Enter Academy', url: '/academy' }
  const secondaryCta = home?.secondaryCta || { label: 'Enter Frameworks', url: '/frameworks' }
  const remembranceQuote =
    home?.remembranceQuote ||
    'You are not becoming something new. You are remembering what you always were.'

  return (
    <>
      <section className="hero">
        <div className="hero-glow" />
        <div className="geometry-wrap">
          <svg className="geometry" viewBox="0 0 400 400">
            <g>
              <circle cx="200" cy="200" r="70" />
              <circle cx="200" cy="132" r="70" />
              <circle cx="200" cy="268" r="70" />
              <circle cx="139" cy="166" r="70" />
              <circle cx="139" cy="234" r="70" />
              <circle cx="261" cy="166" r="70" />
              <circle cx="261" cy="234" r="70" />
              <circle cx="200" cy="200" r="140" />
              <circle cx="200" cy="200" r="180" opacity={0.4} />
            </g>
          </svg>
        </div>

        <div className="eyebrow">{heroEyebrow}</div>
        <h1 className="title">
          {line1} <em>{emphasis}</em> {line2}
        </h1>
        <p className="tagline">{tagline}</p>
        <div className="cta-row">
          <Link href={primaryCta.url} className="btn primary">
            {primaryCta.label}
          </Link>
          <Link href={secondaryCta.url} className="btn ghost">
            {secondaryCta.label}
          </Link>
        </div>
      </section>

      <section id="frameworks">
        <div className="section-head">
          <div className="section-eyebrow">The Frameworks</div>
          <h2 className="section-title">Four keys to the same door</h2>
        </div>
        <div className="fw-grid">
          {frameworks.map((fw: any, i: number) => (
            <Link key={fw.id} href={`/frameworks/${fw.slug}`} className="fw-card">
              <span className="fw-index">{String(i + 1).padStart(2, '0')}</span>
              <div className="fw-name">{fw.name}</div>
              <div className="fw-desc">{fw.shortDescription}</div>
              <div className="fw-arrow">Read the field →</div>
            </Link>
          ))}
        </div>
      </section>

      <section style={{ textAlign: 'center' }}>
        <p
          className="prose"
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontStyle: 'italic',
            fontSize: 'clamp(1.5rem, 3vw, 2.4rem)',
            color: 'var(--starlight)',
          }}
        >
          {remembranceQuote}
        </p>
      </section>
    </>
  )
}
