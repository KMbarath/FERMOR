/**
 * Waitlist submission.
 *
 * There is no backend in this assignment, so submissions are validated and
 * kept in localStorage. To go live, replace the body of `joinWaitlist` with a
 * fetch() to your endpoint (Formspree, a Vercel function, Supabase, etc.).
 */
const KEY = 'fermor:waitlist';

export const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());

export async function joinWaitlist(email) {
  await new Promise((resolve) => setTimeout(resolve, 700));
  try {
    const existing = JSON.parse(localStorage.getItem(KEY) || '[]');
    const clean = email.trim().toLowerCase();
    if (!existing.includes(clean)) existing.push(clean);
    localStorage.setItem(KEY, JSON.stringify(existing));
  } catch {
    /* storage can be unavailable (private mode); the UI still confirms */
  }
  return { ok: true };
}
