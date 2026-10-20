'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { primaryNav } from '@/lib/site';

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="site-header">
      <div className="wrap header-bar">
        <Link href="/" className="brand">
          <span className="brand-mark">iBrary</span>
        </Link>
        <div className="header-tools">
          <button
            type="button"
            className={open ? 'nav-toggle open' : 'nav-toggle'}
            aria-expanded={open}
            aria-controls="site-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="nav-toggle-bars" />
          </button>
        </div>
        <ul id="site-nav" className={open ? 'nav-links open' : 'nav-links'}>
          {primaryNav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} aria-current={pathname === item.href ? 'page' : undefined}>
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/#waitlist" className="button">
              Join
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
