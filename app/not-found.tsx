import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <article className="article">
      <p className="eyebrow">404</p>
      <h1>That page is not here.</h1>
      <p className="lede">The link may be old. The home page is a safer place to start.</p>
      <div className="inline-actions">
        <Link className="button" href="/">
          Back home
        </Link>
      </div>
    </article>
  );
}
