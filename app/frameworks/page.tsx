import Link from 'next/link'
import { getFrameworks } from '@/lib/payload'

export const revalidate = 60

export default async function FrameworksPage() {
  const frameworks = await getFrameworks().catch(() => [])

  return (
    <section>
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
  )
}
