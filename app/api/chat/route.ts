import { getRequestContext } from '@cloudflare/next-on-pages'
import { getFrameworks, getCourses, getServices, getGlobal } from '@/lib/payload'

export const runtime = 'edge'

async function buildContext(): Promise<string> {
  const [frameworks, courses, services, about, siteSettings] = await Promise.all([
    getFrameworks().catch(() => []),
    getCourses().catch(() => []),
    getServices().catch(() => []),
    getGlobal('about-page').catch(() => null),
    getGlobal('site-settings').catch(() => null),
  ])

  const frameworksText = frameworks
    .map((f: any) => `- ${f.name}: ${f.shortDescription || ''}`)
    .join('\n')

  const coursesText = courses
    .map(
      (c: any) =>
        `- ${c.title}: ${c.summary || ''}${c.price != null ? ` (Price: $${c.price})` : ''}`,
    )
    .join('\n')

  const servicesText = services
    .map(
      (s: any) => `- ${s.title}: ${s.summary || ''}${s.price ? ` (Price: ${s.price})` : ''}`,
    )
    .join('\n')

  const founderName = about?.founder?.fullName
  const founderTitle = about?.founder?.title

  return `
Site name: ${siteSettings?.siteName || 'Wesworld'}
Tagline: ${siteSettings?.tagline || ''}

Frameworks offered:
${frameworksText || 'No frameworks listed yet.'}

Courses offered:
${coursesText || 'No courses listed yet.'}

Services offered:
${servicesText || 'No services listed yet.'}

Founder: ${founderName || 'Not specified'} ${founderTitle ? `(${founderTitle})` : ''}

Contact email: enlightenment@wesworld.org
Refund policy: Refunds within 14 days of purchase if the course hasn't been substantially completed.
`.trim()
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { message?: string }
    const message = body.message
    if (!message || typeof message !== 'string') {
      return new Response(JSON.stringify({ error: 'Missing message' }), { status: 400 })
    }

    const context = await buildContext()
    const { env } = getRequestContext()

    const systemPrompt = `You are Mums, the warm and welcoming assistant for Wesworld, a spirituality and consciousness education website. Answer visitor questions using ONLY the information below. Keep answers short (2-4 sentences), warm, and specific. If you don't know something from the info below, tell them to email enlightenment@wesworld.org.

SITE INFORMATION:
${context}`

    const response: any = await (env as any).AI.run('@cf/meta/llama-3.1-8b-instruct-fast', {
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message },
      ],
    })

    const answer =
      response?.response || "I'm not sure about that — try emailing enlightenment@wesworld.org."

    return new Response(JSON.stringify({ answer }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: 'Something went wrong', detail: err.message }),
      { status: 500 },
    )
  }
}
