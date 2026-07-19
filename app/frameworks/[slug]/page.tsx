import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getFrameworkBySlug, getPostsByFramework } from '@/lib/payload'
import { RichText } from '@/lib/richtext'

export const revalidate = 60

export default async function FrameworkPage({
  params,
}: {
  params: { slug: string }
}) {
  const framework = await getFrameworkBySlug(params.slug).catch(() => null)
  if (!framework) notFound()

  const posts = await getPostsByFramework(framework.id).catch(() => [])

  return (
    <>
      <section style={{ textAlign: 'center' }}>
        <div className="section-eyebrow">Framework</div>
        <h1 className="section-title" style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)' }}>
          {framework.name}
        </h1>
      </section>

      {framework.body && (
        <section>
          <div className="prose">
            <RichText content={framework.body} />
          </div>
        </section>
      )}

      {posts.length > 0 && (
        <section>
          <div className="section-head">
            <div className="section-eyebrow">Writings</div>
            <h2 className="section-title">From this framework</h2>
          </div>
          <div className="card-grid">
            {posts.map((post: any) => (
              <Link
                key={post.id}
                href={`/frameworks/${framework.slug}/${post.slug}`}
                className="simple-card"
                style={{ textDecoration: 'none' }}
              >
                <h3>{post.title}</h3>
                {post.excerpt && <p>{post.excerpt}</p>}
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  )
}
