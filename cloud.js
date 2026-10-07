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
  let authPromise = null;
  async function authenticate() {
    if (!session) {
      const response = await request('/auth/v1/signup', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: {} })
      });
      const next = await response.json();
      if (!next.access_token || !next.user?.id) throw new Error('Supabase에서 익명 로그인을 활성화해주세요');
      remember({ ...next, expires_at: Math.floor(Date.now() / 1000) + next.expires_in });
    }
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
  function authenticated() {
    if (!authPromise) authPromise = authenticate().finally(() => { authPromise = null; });
    return authPromise;
  }
  return {
    connect: authenticated,
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
