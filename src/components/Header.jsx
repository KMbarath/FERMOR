import { useEffect, useRef, useState } from 'react';
import Logo from './Logo.jsx';
import './Header.css';

const PRODUCTS = [
  { name: 'Market', text: 'Stocks, funds and news in one feed' },
  { name: 'Portfolio', text: 'Everything you own, in one view' },
  { name: 'ACT', text: 'Start and manage SIPs' },
  { name: 'Ask', text: 'Plain answers about your money' },
  { name: 'For Kids', text: 'Money habits, early' },
];

const LINKS = [
  { href: '#calculators', label: 'Calculators' },
  { href: '#analysis', label: 'Analysis' },
  { href: '#faq', label: 'FAQ' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [products, setProducts] = useState(false);
  const productsRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setProducts(false);
        setMenu(false);
      }
    };
    const onClick = (e) => {
      if (productsRef.current && !productsRef.current.contains(e.target)) setProducts(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menu ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menu]);

  const close = () => {
    setMenu(false);
    setProducts(false);
  };

  return (
    <header className={`header ${scrolled || menu ? 'header--solid' : ''}`}>
      <div className="wrap header__bar">
        <a href="#top" className="header__brand" aria-label="Fermor home" onClick={close}>
          <Logo />
        </a>

        <nav className="header__nav" aria-label="Primary">
          <div className="header__products" ref={productsRef}>
            <button
              type="button"
              className="header__link header__trigger"
              aria-expanded={products}
              aria-controls="products-menu"
              onClick={() => setProducts((v) => !v)}
            >
              Products
              <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                <path d="M2 4.5l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
            {products && (
              <ul id="products-menu" className="menu">
                {PRODUCTS.map((p) => (
                  <li key={p.name}>
                    <a href="#products" onClick={close}>
                      <strong>{p.name}</strong>
                      <span>{p.text}</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="header__link">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="header__actions">
          <a href="https://fermor.in/sign-in" className="header__link header__login" target="_blank" rel="noopener noreferrer">
            Log in
          </a>
          <a href="#waitlist" className="btn btn--primary btn--sm">
            Join the waitlist
          </a>
        </div>

        <button
          type="button"
          className="header__burger"
          aria-expanded={menu}
          aria-controls="mobile-menu"
          aria-label={menu ? 'Close menu' : 'Open menu'}
          onClick={() => setMenu((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>

      <div id="mobile-menu" className="drawer" hidden={!menu}>
        <div className="wrap">
          <p className="drawer__title">Products</p>
          <ul className="drawer__products">
            {PRODUCTS.map((p) => (
              <li key={p.name}>
                <a href="#products" onClick={close}>
                  {p.name}
                </a>
              </li>
            ))}
          </ul>
          <ul className="drawer__links">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={close}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="drawer__cta">
            <a href="#waitlist" className="btn btn--primary" onClick={close}>
              Join the waitlist
            </a>
            <a href="https://fermor.in/sign-in" className="btn btn--ghost" target="_blank" rel="noopener noreferrer">
              Log in
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
