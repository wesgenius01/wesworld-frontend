import Link from 'next/link'
import { getGlobal } from '@/lib/payload'

export default async function Footer() {
  const settings = await getGlobal('site-settings').catch(() => null)

  const footerLinks = settings?.footerLinks?.length
    ? settings.footerLinks
    : [
        { label: 'Privacy Policy', url: '/privacy-policy' },
        { label: 'Terms and Conditions', url: '/terms' },
      ]

  const siteName = settings?.siteName || 'Wesworld'
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div>
        © {year} {siteName}. Where consciousness remembers itself.
      </div>
      <div className="footer-links">
        {footerLinks.map((link: any) => (
          <Link key={link.url} href={link.url}>
            {link.label}
          </Link>
        ))}
        <Link href="/frameworks">Frameworks</Link>
        <Link href="/academy">Academy</Link>
        <Link href="/about">About Us</Link>
      </div>
    </footer>
  )
}
