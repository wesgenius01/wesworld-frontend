import Link from 'next/link'
import Logo from './Logo'
import { getGlobal } from '@/lib/payload'

export default async function Header() {
  const settings = await getGlobal('site-settings').catch(() => null)

  const navLinks = settings?.primaryNav?.length
    ? settings.primaryNav
    : [
        { label: 'Homepage', url: '/' },
        { label: 'Frameworks', url: '/frameworks' },
        { label: 'Academy', url: '/academy' },
        { label: 'About Us', url: '/about' },
      ]

  return (
    <header className="site-header">
      <Link href="/" className="brand">
        <Logo />
        <div className="wordmark">
          WES<span>WORLD</span>
        </div>
      </Link>
      <nav className="site-nav">
        {navLinks.map((link: any) => (
          <Link key={link.url} href={link.url}>
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  )
}
