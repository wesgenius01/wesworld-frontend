import { getCourses, getServices, getGlobal } from '@/lib/payload'

export const revalidate = 60

export default async function AcademyPage() {
  const [courses, services, settings] = await Promise.all([
    getCourses().catch(() => []),
    getServices().catch(() => []),
    getGlobal('site-settings').catch(() => null),
  ])

  const discordUrl = settings?.community?.discordUrl
  const whatsappUrl = settings?.community?.whatsappUrl

  return (
    <>
      <section style={{ textAlign: 'center' }}>
        <div className="section-eyebrow">Academy</div>
        <h1 className="section-title" style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)' }}>
          Courses, sessions, and community
        </h1>
      </section>

      {courses.length > 0 && (
        <section>
          <div className="section-head">
            <div className="section-eyebrow">Courses</div>
            <h2 className="section-title">Structured paths</h2>
          </div>
          <div className="card-grid">
            {courses.map((course: any) => (
              <div key={course.id} className="simple-card">
                <h3>{course.title}</h3>
                <p>{course.summary}</p>
                {course.price != null && (
                  <p style={{ color: 'var(--gold)' }}>${course.price}</p>
                )}
                {course.enrollmentUrl && (
                  <a href={course.enrollmentUrl} className="btn primary" style={{ alignSelf: 'flex-start' }}>
                    Enroll
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {services.length > 0 && (
        <section>
          <div className="section-head">
            <div className="section-eyebrow">Services</div>
            <h2 className="section-title">One-on-one</h2>
          </div>
          <div className="card-grid">
            {services.map((service: any) => (
              <div key={service.id} className="simple-card">
                <h3>{service.title}</h3>
                <p>{service.summary}</p>
                {service.price && <p style={{ color: 'var(--gold)' }}>{service.price}</p>}
                {service.bookingUrl && (
                  <a href={service.bookingUrl} className="btn ghost" style={{ alignSelf: 'flex-start' }}>
                    Book
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {(discordUrl || whatsappUrl) && (
        <section style={{ textAlign: 'center' }}>
          <div className="section-head">
            <div className="section-eyebrow">Community</div>
            <h2 className="section-title">Join the circle</h2>
          </div>
          <div className="cta-row" style={{ justifyContent: 'center' }}>
            {discordUrl && (
              <a href={discordUrl} className="btn primary">
                Join Discord
              </a>
            )}
            {whatsappUrl && (
              <a href={whatsappUrl} className="btn ghost">
                Join WhatsApp
              </a>
            )}
          </div>
        </section>
      )}
    </>
  )
}
