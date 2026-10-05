import Logo from './Logo.jsx';
import './Footer.css';

const NAV = [
  { href: '#how-it-works', label: 'How it works' },
  { href: '#calculators', label: 'Calculators' },
  { href: '#analysis', label: 'Analysis' },
  { href: '#faq', label: 'FAQ' },
];
const CALCS = [
  ['SIP calculator', 'sip-calculator'],
  ['EMI calculator', 'emi-calculator'],
  ['FD calculator', 'fd-calculator'],
  ['Income tax', 'income-tax-calculator'],
];
const COMPANY = [
  ['About', 'https://fermor.in/about'],
  ['Contact', 'https://fermor.in/contact'],
  ['Privacy policy', 'https://fermor.in/privacy'],
  ['Terms of use', 'https://fermor.in/terms'],
];

const ext = { target: '_blank', rel: 'noopener noreferrer' };

export default function Footer() {
  return (
    <footer className="footer on-dark">
      <div className="wrap">
        <div className="footer__top">
          <div className="footer__brand">
            <Logo />
            <p>Understand. Act. Grow.</p>
          </div>
          <nav className="footer__cols" aria-label="Footer">
            <div>
              <h2>Explore</h2>
              <ul>
                {NAV.map((n) => (
                  <li key={n.href}>
                    <a href={n.href}>{n.label}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2>Calculators</h2>
              <ul>
                {CALCS.map(([label, slug]) => (
                  <li key={slug}>
                    <a href={`https://fermor.in/calculators/${slug}`} {...ext}>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2>Company</h2>
              <ul>
                {COMPANY.map(([label, href]) => (
                  <li key={href}>
                    <a href={href} {...ext}>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
        <p className="footer__legal">
          Fermor Technologies Pvt. Ltd. is registered in India. Fermor is not a SEBI-registered investment adviser and
          does not provide personalised financial, investment or tax advice. Calculators, content and tools are for
          educational and informational purposes only. Results are illustrations based on the inputs you give, and
          investments are subject to market risk.
        </p>
        <p className="footer__copy">© {new Date().getFullYear()} Fermor. This page is a design exercise.</p>
      </div>
    </footer>
  );
}
