import Link from 'next/link';
import { contactEmail, footerColumns } from '@/lib/site';

export function SiteFooter() {
  return (
    <footer className="site-footer" id="contact">
      <div className="wrap footer-grid">
        <div>
          <img className="brand-logo" src="/logo.png" alt="iBrary logo" />
          <p className="fine">iBrary — Learning that makes sense, for more learners.</p>
          <p className="fine">Inclusive learning. Clearer explanations. A more personal learning journey.</p>
          <p className="fine">
            <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
          </p>
        </div>
        {footerColumns.map((column) => (
          <div key={column.title}>
            <p className="footer-title">{column.title}</p>
            <ul className="footer-links">
              {column.links.map((item) => (
                <li key={item.label}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}
