export default function Logo({ size = 32, wordmark = true, className = '' }) {
  return (
    <span className={`logo ${className}`}>
      <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
        <rect width="32" height="32" rx="9" fill="#75FB90" />
        <path
          d="M9 19l7-7 7 7M9 25l7-7 7 7"
          stroke="#10231C"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
      {wordmark && <span className="logo__word">Fermor</span>}
    </span>
  );
}
