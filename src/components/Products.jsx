import './Products.css';

const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };

const ITEMS = [
  {
    name: 'Market',
    text: 'Follow indices, stocks and funds, with the news that moves them.',
    icon: <path d="M3 17l5-6 4 3 8-9M15 5h5v5" {...stroke} />,
  },
  {
    name: 'Portfolio',
    text: 'Bring every holding into one view and see how it’s spread.',
    icon: (
      <>
        <path d="M12 3v9h9" {...stroke} />
        <path d="M20.5 15.5A9 9 0 1111 3.1" {...stroke} />
      </>
    ),
  },
  {
    name: 'ACT',
    text: 'Start a SIP, change it, pause it. All in a couple of taps.',
    icon: <path d="M13 3L5 13h6l-1 8 8-10h-6l1-8z" {...stroke} />,
  },
  {
    name: 'Ask',
    text: 'Ask a question about your money and get a plain answer.',
    icon: <path d="M4 5h16v11H9l-5 4V5z" {...stroke} />,
  },
  {
    name: 'For Kids',
    text: 'Help children learn to save, spend and wait for compounding.',
    icon: (
      <>
        <circle cx="12" cy="8" r="3.5" {...stroke} />
        <path d="M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5" {...stroke} />
      </>
    ),
  },
];

export default function Products() {
  return (
    <section className="products section" id="products" aria-labelledby="products-title">
      <div className="wrap">
        <h2 id="products-title" className="h2">
          Everything in the app
        </h2>
        <ul className="products__grid">
          {ITEMS.map((it) => (
            <li key={it.name} className="product">
              <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true">
                {it.icon}
              </svg>
              <h3>{it.name}</h3>
              <p>{it.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
