import { getGlobal, mediaUrl } from '@/lib/payload'
import { RichText } from '@/lib/richtext'

export const runtime = 'edge'

export default async function AboutPage() {
  const about = await getGlobal('about-page').catch(() => null)
  const founder = about?.founder
  return (
    <>
      <section style={{ textAlign: 'center' }}>
        <div className="section-eyebrow">About Us</div>
        <h1 className="section-title" style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)' }}>
          The vision behind Wesworld
        </h1>
      </section>
      {about?.vision && (
        <section>
          <div className="section-head">
            <div className="section-eyebrow">Vision</div>
          </div>
          <div className="prose">
            <RichText content={about.vision} />
          </div>
        </section>
      )}
      {about?.mission && (
        <section>
          <div className="section-head">
            <div className="section-eyebrow">Mission</div>
          </div>
          <div className="prose">
            <RichText content={about.mission} />
          </div>
        </section>
      )}
      {about?.objectives?.length > 0 && (
        <section>
          <div className="section-head">
            <div className="section-eyebrow">Objectives</div>
          </div>
          <div className="prose">
            <ul>
              {about.objectives.map((obj: any, i: number) => (
                <li key={i}>{obj.text}</li>
              ))}
            </ul>
          </div>
        </section>
      )}
      {founder?.fullName && (
        <section style={{ textAlign: 'center' }}>
          <div className="section-head">
            <div className="section-eyebrow">Founder</div>
            <h2 className="section-title">{founder.fullName}</h2>
            {founder.title && (
              <p style={{ color: 'var(--gold)', marginTop: '0.5rem' }}>{founder.title}</p>
            )}
          </div>
          {founder.photo && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={mediaUrl(founder.photo, 'card')}
              alt={founder.fullName}
              style={{
                maxWidth: '280px',
                borderRadius: '12px',
                margin: '0 auto 2rem',
                display: 'block',
              }}
            />
          )}
          {founder.bio && (
            <div className="prose">
              <RichText content={founder.bio} />
            </div>
          )}
        </section>
      )}
    </>
  )
}