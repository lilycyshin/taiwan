/* Public browser key. Storage access is enforced by Supabase Auth and RLS. */
window.TripCloud = (() => {
  const base = 'https://dcrqvfzlxjvoiwklavsq.supabase.co';
  const key = 'sb_publishable_jKA7ixmKjyRKCyk8p29cOQ_4jPrkUaV';
  let session = null;
  try { session = JSON.parse(localStorage.getItem('trip-cloud-session')); } catch {}
  async function request(path, options = {}) {
    const response = await fetch(base + path, {
      ...options,
      headers: { apikey: key, Authorization: `Bearer ${session?.access_token || key}`, ...options.headers }
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.msg || error.message || error.error_description || `HTTP ${response.status}`);
    }
    return response;
  }
  function remember(value) {
    session = value;
    if (value) localStorage.setItem('trip-cloud-session', JSON.stringify(value));
    else localStorage.removeItem('trip-cloud-session');
  }
  async function authenticated() {
    if (!session) throw new Error('먼저 이메일로 로그인해주세요');
    if (!session.expires_at || session.expires_at * 1000 < Date.now() + 60000) {
      const response = await request('/auth/v1/token?grant_type=refresh_token', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: session.refresh_token })
      });
      const next = await response.json();
      remember({ ...next, expires_at: Math.floor(Date.now() / 1000) + next.expires_in });
    }
    return session.user.id;
  }
  return {
    email: () => session?.user?.email || '',
    async sendCode(email) {
      await request('/auth/v1/otp', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, create_user: true }) });
    },
    async verify(email, token) {
      const response = await request('/auth/v1/verify', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, token, type: 'email' }) });
      const next = await response.json();
      remember({ ...next, expires_at: Math.floor(Date.now() / 1000) + next.expires_in });
    },
    async upload(data) {
      const id = await authenticated();
      await request(`/storage/v1/object/trip-backups/${id}/backup.json`, {
        method: 'POST', headers: { 'Content-Type': 'application/json', 'x-upsert': 'true' }, body: JSON.stringify(data)
      });
    },
    async download() {
      const id = await authenticated();
      return (await request(`/storage/v1/object/authenticated/trip-backups/${id}/backup.json`)).json();
    },
    async logout() {
      try { if (session) await request('/auth/v1/logout', { method: 'POST' }); }
      finally { remember(null); }
    }
  };
})();
