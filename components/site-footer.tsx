import Link from 'next/link';
import { contactEmail, footerColumns } from '@/lib/site';

export function SiteFooter() {
  return (
    <footer className="site-footer" id="contact">
      <div className="wrap footer-grid">
        <div>
          <p className="brand-mark">iBrary</p>
          <p className="fine">
            Secondary school for every student and teacher, from JSS1 to SS3.
          </p>
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
