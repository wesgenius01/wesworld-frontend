import { notFound } from 'next/navigation'
import { getFrameworkBySlug, getCollectionItem } from '@/lib/payload'
import { RichText } from '@/lib/richtext'

export const runtime = 'edge'

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string; postSlug: string }>
}) {
  const { slug, postSlug } = await params
  const framework = await getFrameworkBySlug(slug).catch(() => null)
  if (!framework) notFound()
  const post = await getCollectionItem(
    'posts',
    `[slug][equals]=${postSlug}`,
  ).catch(() => null)
  if (!post) notFound()
  return (
    <section>
      <div className="section-head">
        <div className="section-eyebrow">{framework.name}</div>
        <h1 className="section-title" style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)' }}>
          {post.title}
        </h1>
      </div>
      <div className="prose">
        <RichText content={post.content} />
      </div>
    </section>
  )
}