// =======================================================
// Lebanese Dream Bakery - Clean HTML5 Path Navigation Engine
// Replaces hash routing (#product-royal, #cart, etc.)
// with clean URLs (/product/royal, /cart, /admin, etc.)
// =======================================================

export const PAGE_ROUTES = {
  cart: '/cart',
  'my-orders': '/my-orders',
  orders: '/my-orders',
  customize: '/customize',
  admin: '/admin',
  cookies: '/cookies',
  cupcakes: '/cupcakes',
  'cake-pops': '/cake-pops',
  'cakes-for-kids': '/cakes-for-kids',
  'cakes-for-guys': '/cakes-for-guys',
  'cakes-for-ladies': '/cakes-for-ladies',
  'classic-wedding-cakes': '/classic-wedding-cakes',
  'novelty-wedding-cakes': '/novelty-wedding-cakes',
  'bride-to-be-cakes': '/bride-to-be-cakes',
  'engagement-cakes': '/engagement-cakes',
  'grooms-cakes': '/grooms-cakes',
  'corporate-cakes': '/corporate-cakes',
  'corporate-cookies': '/corporate-cookies',
  'cupcakes-with-logo': '/cupcakes-with-logo',
  'graduation-cakes': '/graduation-cakes',
  'cars-ships-planes-cakes': '/cars-ships-planes-cakes',
  'sporting-cakes': '/sporting-cakes',
  'couture-cakes': '/couture-cakes',
  '3d-cakes': '/3d-cakes',
  'food-drink-illusion-cakes': '/food-drink-illusion-cakes',
  'doughnuts-cakes': '/doughnuts-cakes',
  'photo-on-cake': '/photo-on-cake',
  'pet-animals-cakes': '/pet-animals-cakes',
  'superhero-cakes': '/superhero-cakes',
  'labubu-cakes': '/labubu-cakes',
  'cake-baking-decorating': '/cake-baking-decorating'
};

export function parseCurrentRoute() {
  if (typeof window === 'undefined') return { page: 'home', productId: '' };

  let pathname = window.location.pathname.replace(/\/+$/, '') || '/';
  const hash = window.location.hash || '';

  // Automatic migration: If visitor comes with legacy hash URL (#product-royal, #cart), convert to clean path
  // (Do not alter admin dashboard sub-route hashes such as /admin#orders)
  if (hash && !pathname.startsWith('/admin')) {
    if (hash.startsWith('#product-')) {
      const slug = decodeURIComponent(hash.replace('#product-', '').trim());
      const cleanPath = `/product/${slug}`;
      window.history.replaceState(null, '', cleanPath);
      pathname = cleanPath;
    } else if (hash.startsWith('#')) {
      const cleanHash = hash.replace('#', '').trim();
      const mapped = PAGE_ROUTES[cleanHash] || (cleanHash === 'bag' ? '/cart' : `/${cleanHash}`);
      window.history.replaceState(null, '', mapped);
      pathname = mapped;
    }
  }

  // 1. Product Detail Page: /product/:slug
  if (pathname.startsWith('/product/')) {
    const slug = decodeURIComponent(pathname.replace('/product/', '').trim());
    return { page: 'product-detail', productId: slug };
  }

  // 2. Main Pages & Categories
  const cleanKey = pathname.replace(/^\//, '').trim();
  if (!cleanKey || cleanKey === 'home') {
    return { page: 'home', productId: '' };
  }

  if (cleanKey === 'cart' || cleanKey === 'bag') {
    return { page: 'cart', productId: '' };
  }

  if (cleanKey === 'my-orders' || cleanKey === 'orders' || cleanKey === 'track' || cleanKey === 'track-order') {
    return { page: 'my-orders', productId: '' };
  }

  if (cleanKey === 'admin' || cleanKey === 'admin-dashboard') {
    return { page: 'admin', productId: '' };
  }

  if (cleanKey === 'customize') {
    return { page: 'customize', productId: '' };
  }

  // Category aliases
  if (cleanKey === 'wedding' || cleanKey === 'wedding-cakes') {
    return { page: 'classic-wedding-cakes', productId: '' };
  }
  if (cleanKey === 'graduation') return { page: 'graduation-cakes', productId: '' };
  if (cleanKey === 'vehicles') return { page: 'cars-ships-planes-cakes', productId: '' };
  if (cleanKey === 'sporting') return { page: 'sporting-cakes', productId: '' };
  if (cleanKey === 'couture') return { page: 'couture-cakes', productId: '' };
  if (cleanKey === '3d-art') return { page: '3d-cakes', productId: '' };
  if (cleanKey === 'illusion') return { page: 'food-drink-illusion-cakes', productId: '' };
  if (cleanKey === 'doughnuts') return { page: 'doughnuts-cakes', productId: '' };
  if (cleanKey === 'photo') return { page: 'photo-on-cake', productId: '' };
  if (cleanKey === 'pets') return { page: 'pet-animals-cakes', productId: '' };
  if (cleanKey === 'superheroes') return { page: 'superhero-cakes', productId: '' };
  if (cleanKey === 'labubu') return { page: 'labubu-cakes', productId: '' };
  if (cleanKey === 'classes' || cleanKey === 'baking') return { page: 'cake-baking-decorating', productId: '' };

  if (PAGE_ROUTES[cleanKey]) {
    return { page: cleanKey, productId: '' };
  }

  return { page: 'home', productId: '' };
}

export function navigateTo(path) {
  if (typeof window === 'undefined') return;
  const targetPath = path.startsWith('/') ? path : `/${path}`;
  window.history.pushState({}, '', targetPath);
  window.dispatchEvent(new Event('popstate'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function getProductUrl(slugOrId) {
  if (!slugOrId) return '/';
  return `/product/${slugOrId}`;
}
