// =======================================================
// Centralized API & Server Configuration
// Supports local development and production deployments (Render, Vercel)
// =======================================================

export const API_BASE = (
  import.meta.env.VITE_API_BASE ||
  import.meta.env.VITE_API_URL ||
  'http://localhost:5000/api'
).replace(/\/+$/, '');

export const API_SERVER_URL = API_BASE.replace(/\/api\/?$/, '');

export function getFullImageUrl(url) {
  if (!url) return '/Lebanese Dream Bakery Cake Display.png';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    return url;
  }
  if (url.startsWith('/uploads/')) {
    return `${API_SERVER_URL}${url}`;
  }
  return url;
}
