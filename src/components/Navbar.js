'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// Daftar menu navbar
const menuItems = [
  { href: '/', label: 'Beranda' },
  { href: '/profil', label: 'Profil' },
  { href: '/visi-misi', label: 'Visi & Misi' },
  { href: '/struktur', label: 'Struktur' },
  { href: '/berita', label: 'Berita' },
  { href: '/kontak', label: 'Kontak' },
]

export default function Navbar() {
  const [menuTerbuka, setMenuTerbuka] = useState(false)
  const pathname = usePathname()

  return (
    <header>
      <nav className="navbar">
        <div className="navbar-inner">
          {/* Logo */}
<Link href="/" className="navbar-logo">
  <img
    src="/logo.jpg"
    alt="Logo Kota Tangerang Selatan"
    style={{ width: '42px', height: '42px', objectFit: 'contain', borderRadius: '4px' }}
  />
  <div className="logo-text">
    <strong>Kel. Pondok Pucung</strong>
    <span>Kec. Pondok Aren · Tangsel</span>
  </div>
</Link>

          {/* Menu Desktop */}
          <ul className="navbar-menu">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={pathname === item.href ? 'aktif' : ''}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Tombol Hamburger untuk Mobile */}
          <button
            className="hamburger"
            onClick={() => setMenuTerbuka(!menuTerbuka)}
            aria-label="Toggle menu"
          >
            {menuTerbuka ? '✕' : '☰'}
          </button>
        </div>

        {/* Menu Mobile */}
        <ul className={`mobile-menu ${menuTerbuka ? 'terbuka' : ''}`}>
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setMenuTerbuka(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
