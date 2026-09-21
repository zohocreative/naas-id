/* Thin wrapper over the Apps Script Web App (see config.js). Every call is
 * a plain GET (query-string params) — the API is read-only, so there's
 * nothing to POST, and GET avoids CORS preflight headaches entirely. */
async function apiCall(action, params){
  if (!API_URL || API_URL.indexOf('PASTE_YOUR') === 0){
    throw new Error('The portal isn\'t connected to your Sheet yet — open config.js and paste your Apps Script Web App URL.');
  }
  const url = new URL(API_URL);
  url.searchParams.set('action', action);
  Object.keys(params || {}).forEach(function(k){
    if (params[k] !== undefined && params[k] !== null) url.searchParams.set(k, params[k]);
  });
  let res;
  try {
    res = await fetch(url.toString());
  } catch (e) {
    throw new Error('Couldn\'t reach the server. Check your internet connection and the API URL in config.js.');
  }
  let data;
  try { data = await res.json(); }
  catch (e) { throw new Error('Server sent back something unexpected. Make sure the Apps Script Web App is deployed with "Anyone" access.'); }
  if (!data.ok) throw new Error(data.error || 'Something went wrong.');
  return data;
}

function apiProfilePin(id, pin){ return apiCall('profile', { id: id, pin: pin }); }
function apiLogin(id, phone){ return apiCall('login', { id: id, phone: phone }); }
function apiAdminList(key, type, q){ return apiCall('adminList', { key: key, type: type || 'all', q: q || '' }); }
function apiAdminStudent(key, id){ return apiCall('adminStudent', { key: key, id: id }); }

function qs(name){
  return new URLSearchParams(window.location.search).get(name);
}
function money(n){
  n = Number(n || 0);
  return 'LKR ' + n.toLocaleString('en-LK', { maximumFractionDigits: 0 });
}
function initials(name){
  return String(name||'').trim().split(/\s+/).slice(0,2).map(function(w){ return w[0]||''; }).join('').toUpperCase();
}
function statusClass(status){
  status = String(status||'').toLowerCase();
  if (status === 'paid') return 'status-paid';
  if (status === 'partial') return 'status-partial';
  if (status === 'overdue') return 'status-overdue';
  return 'status-pending';
}
