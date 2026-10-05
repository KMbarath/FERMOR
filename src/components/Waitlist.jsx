import { useState } from 'react';
import { isEmail, joinWaitlist } from '../lib/waitlist.js';
import './Waitlist.css';

export default function Waitlist() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState('idle'); // idle | sending | done
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    if (!isEmail(email)) {
      setError('Enter a valid email address, like name@example.com.');
      return;
    }
    setError('');
    setState('sending');
    await joinWaitlist(email);
    setState('done');
  };

  return (
    <section className="waitlist" id="waitlist" aria-labelledby="waitlist-title">
      <div className="wrap waitlist__inner">
        <h2 id="waitlist-title" className="display waitlist__title">
          Know where you stand.
        </h2>
        <div className="waitlist__side">
          <p className="waitlist__lede">
            Join the waitlist for the Fermor app and get a free financial health check when it opens.
          </p>

          {state === 'done' ? (
            <p className="waitlist__done" role="status">
              You’re on the list. We’ll write to <strong>{email.trim()}</strong> when your turn comes.
            </p>
          ) : (
            <form className="waitlist__form" onSubmit={submit} noValidate>
              <label htmlFor="wl-email" className="sr-only">
                Email address
              </label>
              <input
                id="wl-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? 'wl-error' : undefined}
              />
              <button type="submit" className="btn btn--primary" disabled={state === 'sending'}>
                {state === 'sending' ? 'Joining…' : 'Join the waitlist'}
              </button>
              <p id="wl-error" className="waitlist__error" role="alert">
                {error}
              </p>
            </form>
          )}
          <p className="waitlist__fine">One email when the app opens. Nothing else.</p>
        </div>
      </div>
    </section>
  );
}
