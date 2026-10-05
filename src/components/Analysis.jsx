import './Analysis.css';

const BASE = 'https://fermor.in/blogs/';

const POSTS = [
  {
    slug: 'sensex-nifty-crash-september-2026',
    topic: 'Stock market',
    date: 'Sep 29, 2026',
    read: '13 min',
    title: 'Why the Nifty has fallen seven weeks in a row',
    text: 'Crude oil, rising bond yields, a weak rupee and heavy foreign selling: what each one means for an Indian investor, and what could turn the flows.',
  },
  {
    slug: 'upi-charges-above-2000',
    topic: 'Regulation',
    date: 'Sep 22, 2026',
    read: '12 min',
    title: 'UPI payments above ₹2,000: what the new fee means for you',
    text: 'Who pays the merchant fee, which payments stay free, and worked examples on real bills.',
  },
  {
    slug: 'pm-kisan-samman-nidhi-scheme',
    topic: 'Government schemes',
    date: 'Sep 28, 2026',
    read: '13 min',
    title: 'PM-KISAN: eligibility, eKYC and how to check your status',
    text: 'The full checklist for farmer families, plus what to do when an instalment doesn’t arrive.',
  },
  {
    slug: 'section-87a-rebate',
    topic: 'Income tax',
    date: 'Jul 30, 2026',
    read: '11 min',
    title: 'Section 87A rebate: limits and marginal relief, worked through',
    text: 'Why ₹12 lakh and ₹12.75 lakh are not the same number, with a step-by-step example.',
  },
];

function Meta({ post }) {
  return (
    <p className="post__meta">
      {post.topic}
      <span aria-hidden="true"> / </span>
      <span className="sr-only">, </span>
      {post.date}
      <span aria-hidden="true"> / </span>
      <span className="sr-only">, </span>
      {post.read} read
    </p>
  );
}

export default function Analysis() {
  const [lead, ...rest] = POSTS;
  return (
    <section className="analysis section" id="analysis" aria-labelledby="analysis-title">
      <div className="wrap">
        <header className="analysis__head">
          <h2 id="analysis-title" className="h2">
            What’s changing, explained for your wallet
          </h2>
          <a className="btn btn--ghost btn--sm" href="https://fermor.in/blogs" target="_blank" rel="noopener noreferrer">
            All analysis
          </a>
        </header>

        <div className="analysis__grid">
          <a className="post post--lead" href={BASE + lead.slug} target="_blank" rel="noopener noreferrer">
            <Meta post={lead} />
            <h3>{lead.title}</h3>
            <p>{lead.text}</p>
            <span className="post__read">Read the analysis</span>
          </a>
          <ul className="analysis__rest">
            {rest.map((p) => (
              <li key={p.slug}>
                <a className="post" href={BASE + p.slug} target="_blank" rel="noopener noreferrer">
                  <Meta post={p} />
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
