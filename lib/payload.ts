const PAYLOAD_API_URL = process.env.PAYLOAD_API_URL || 'http://localhost:3000'

async function payloadFetch(path: string) {
  const res = await fetch(`${PAYLOAD_API_URL}${path}`, {
    cache: 'no-store',
  })
  if (!res.ok) {
    throw new Error(`Payload API error ${res.status} for ${path}`)
  }
  return res.json()
}

export async function getGlobal(slug: string) {
  return payloadFetch(`/api/globals/${slug}`)
}

export async function getCollection(
  slug: string,
  params: Record<string, string> = {},
) {
  const query = new URLSearchParams(params).toString()
  const data = await payloadFetch(`/api/${slug}${query ? `?${query}` : ''}`)
  return data.docs || []
}

export async function getCollectionItem(slug: string, where: string) {
  const data = await payloadFetch(`/api/${slug}?where${where}&limit=1`)
  return data.docs?.[0] || null
}

export async function getFrameworks() {
  return getCollection('frameworks', { sort: 'order', limit: '50' })
}

export async function getFrameworkBySlug(slug: string) {
  return getCollectionItem('frameworks', `[slug][equals]=${slug}`)
}

export async function getPostsByFramework(frameworkId: string) {
  return getCollection('posts', {
    'where[framework][equals]': frameworkId,
    'where[_status][equals]': 'published',
    sort: '-publishedDate',
  })
}

export async function getCourses() {
  return getCollection('courses', { limit: '50' })
}

export async function getServices() {
  return getCollection('services', { limit: '50' })
}

export async function getFeaturedTestimonials() {
  return getCollection('testimonials', {
    'where[featured][equals]': 'true',
    limit: '10',
  })
}

export function mediaUrl(mediaDoc: any, size?: string): string {
  if (!mediaDoc) return ''
  if (size && mediaDoc.sizes?.[size]?.url) {
    return `${PAYLOAD_API_URL}${mediaDoc.sizes[size].url}`
  }
  return mediaDoc.url ? `${PAYLOAD_API_URL}${mediaDoc.url}` : ''
}