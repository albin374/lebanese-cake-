import React, { useState, useEffect } from 'react';
import { ShoppingBag, Sparkles, X, Clock, Users, Check, ArrowRight, Eye, Image as ImageIcon } from 'lucide-react';

const API_BASE = 'http://localhost:5000/api';

export const slugify = (text) => {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const formatImageUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('/uploads/')) {
    return `http://localhost:5000${url}`;
  }
  return url;
};

const WEDDING_SUB_TABS = [
  { id: 'classic-wedding-cakes', nameEn: 'Classic Wedding Cakes', nameAr: 'كيك الأعراس الكلاسيكي', hash: '#classic-wedding-cakes' },
  { id: 'novelty-wedding-cakes', nameEn: 'Novelty Wedding Cakes', nameAr: 'كيك الأعراس المبتكر', hash: '#novelty-wedding-cakes' },
  { id: 'bride-to-be-cakes', nameEn: 'Bride To Be Cakes', nameAr: 'كيك توديع العزوبية', hash: '#bride-to-be-cakes' },
  { id: 'engagement-cakes', nameEn: 'Engagement Celebration Cakes', nameAr: 'كيك حفلات الخطوبة', hash: '#engagement-cakes' },
  { id: 'grooms-cakes', nameEn: 'Grooms Cakes', nameAr: 'كيك العريس', hash: '#grooms-cakes' }
];

const CORPORATE_SUB_TABS = [
  { id: 'corporate-cakes', nameEn: 'Corporate cakes', nameAr: 'كيك الشركات', hash: '#corporate-cakes' },
  { id: 'corporate-cookies', nameEn: 'Corporate Cookies', nameAr: 'كوكيز الشركات', hash: '#corporate-cookies' },
  { id: 'cupcakes-with-logo', nameEn: 'Cupcakes with logo', nameAr: 'كب كيك مع شعار الشركة', hash: '#cupcakes-with-logo' }
];

export default function CategoryProductsSection({
  categorySlug,
  categoryName = 'Collection',
  currentLang = 'en',
  onAddToCart,
  onCustomizeClick
}) {
  const isAr = currentLang === 'ar';
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Normalize category slugs for matching
  const targetSlugs = (Array.isArray(categorySlug) ? categorySlug : [categorySlug]).map(s => (s || '').toLowerCase().trim());

  // Determine active subcategory pills list
  const isWeddingCategory = targetSlugs.some(s => 
    ['wedding', 'wedding-cakes', 'classic-wedding-cakes', 'novelty-wedding-cakes', 'bride-to-be-cakes', 'engagement-cakes', 'grooms-cakes'].includes(s)
  );
  const isCorporateCategory = targetSlugs.some(s => 
    ['corporate-cakes', 'corporate', 'corporate-cookies', 'cupcakes-with-logo'].includes(s)
  );

  const subcategoryPills = isWeddingCategory 
    ? WEDDING_SUB_TABS 
    : isCorporateCategory 
      ? CORPORATE_SUB_TABS 
      : [];

  const matchesCategory = (p) => {
    if (!p || !p.category_slug) return false;
    const pCat = p.category_slug.toLowerCase().trim();

    return targetSlugs.some(target => {
      if (pCat === target) return true;

      // Handle common aliases and parent-child categories
      if (target === 'wedding' || target === 'wedding-cakes') {
        return [
          'wedding', 
          'wedding-cakes', 
          'classic-wedding-cakes', 
          'novelty-wedding-cakes', 
          'bride-to-be-cakes', 
          'engagement-cakes', 
          'grooms-cakes'
        ].includes(pCat);
      }

      if (target === 'classic-wedding-cakes') {
        return ['classic-wedding-cakes', 'wedding', 'wedding-cakes'].includes(pCat);
      }

      if (target === 'corporate-cakes') {
        return ['corporate-cakes', 'corporate'].includes(pCat);
      }

      if (target === 'cookies' && (pCat === 'cookies' || pCat === 'cookies-cat')) return true;
      if (target === 'cake-pops' && (pCat === 'cake-pops' || pCat === 'cake-pops-cat')) return true;
      if (target === 'cupcakes' && (pCat === 'cupcakes' || pCat === 'cupcakes-cat')) return true;
      if (target === 'cakes-for-kids' && (pCat === 'cakes-for-kids' || pCat === 'kids' || pCat === 'boys' || pCat === 'girls')) return true;
      if (target === 'cakes-for-ladies' && (pCat === 'cakes-for-ladies' || pCat === 'ladies' || pCat === 'girls')) return true;
      if (target === 'cakes-for-guys' && (pCat === 'cakes-for-guys' || pCat === 'guys' || pCat === 'boys')) return true;
      if (target === 'graduation-cakes' && (pCat === 'graduation-cakes' || pCat === 'graduation')) return true;
      if (target === 'cars-ships-planes-cakes' && (pCat === 'cars-ships-planes-cakes' || pCat === 'vehicles')) return true;
      if (target === 'sporting-cakes' && (pCat === 'sporting-cakes' || pCat === 'sporting')) return true;
      if (target === 'couture-cakes' && (pCat === 'couture-cakes' || pCat === 'couture')) return true;
      if (target === '3d-cakes' && (pCat === '3d-cakes' || pCat === '3d-art')) return true;
      if (target === 'food-drink-illusion-cakes' && (pCat === 'food-drink-illusion-cakes' || pCat === 'illusion')) return true;
      if (target === 'doughnuts-cakes' && (pCat === 'doughnuts-cakes' || pCat === 'doughnuts')) return true;
      if (target === 'photo-on-cake' && (pCat === 'photo-on-cake' || pCat === 'photo')) return true;
      if (target === 'pet-animals-cakes' && (pCat === 'pet-animals-cakes' || pCat === 'pets')) return true;
      if (target === 'superhero-cakes' && (pCat === 'superhero-cakes' || pCat === 'superheroes')) return true;
      if (target === 'labubu-cakes' && (pCat === 'labubu-cakes' || pCat === 'labubu')) return true;
      if (target === 'cake-baking-decorating' && (pCat === 'cake-baking-decorating' || pCat === 'classes' || pCat === 'baking')) return true;

      return false;
    });
  };

  const loadProducts = async () => {
    // 1. First check local storage for instant zero-latency render
    try {
      const cached = localStorage.getItem('ldb_cached_products');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProducts(parsed);
          setLoading(false);
        }
      }
    } catch (_) {}

    // 2. Fetch fresh products from backend API
    try {
      const res = await fetch(`${API_BASE}/products`);
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.products)) {
          setProducts(data.products);
          localStorage.setItem('ldb_cached_products', JSON.stringify(data.products));
        }
      }
    } catch (err) {
      console.warn('Notice loading category products:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();

    // Re-sync when admin adds or deletes products from admin portal
    const handleUpdate = () => loadProducts();
    window.addEventListener('ldb_products_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener('ldb_products_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, [categorySlug]);

  const categoryProducts = products.filter(matchesCategory);

  const handleAddProductToCart = (prod, e) => {
    if (e) e.stopPropagation();
    if (onAddToCart) {
      const activeTitle = isAr ? (prod.title_ar || prod.title) : prod.title;
      const activeFlavor = isAr ? (prod.flavor_ar || prod.flavor) : prod.flavor;
      const activeServings = isAr ? (prod.servings_ar || prod.servings) : prod.servings;

      onAddToCart({
        id: prod.id,
        title: activeTitle,
        price: Number(prod.price) || 0,
        image: formatImageUrl(prod.image_url),
        flavor: activeFlavor,
        servings: activeServings
      });
    }
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  const handleCustomizeProduct = (prod, e) => {
    if (e) e.stopPropagation();
    setSelectedProduct(null);
    if (onCustomizeClick) {
      onCustomizeClick(prod);
    } else {
      window.location.hash = '#customize';
    }
  };

  return (
    <section className="py-8 sm:py-12 px-4 sm:px-8 lg:px-12 bg-[#FFF9F0] transition-colors relative">
      <div className="max-w-7xl mx-auto w-full min-w-0">

        {/* Subcategories Pill Navigation for Wedding and Corporate Collections */}
        {subcategoryPills.length > 0 && (
          <div className="mb-8 sm:mb-10 flex items-center justify-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-2 p-1.5 bg-white/90 backdrop-blur-xs rounded-2xl border border-[#EBDCC8] shadow-xs max-w-full">
              {subcategoryPills.map((sub) => {
                const isActive = targetSlugs.includes(sub.id) || (sub.id === 'classic-wedding-cakes' && targetSlugs.includes('wedding'));
                return (
                  <button
                    key={sub.id}
                    type="button"
                    onClick={() => {
                      window.location.hash = sub.hash;
                    }}
                    className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-[#C58A19] text-white font-semibold shadow-xs'
                        : 'text-[#4A2116] hover:bg-[#FAF5ED] hover:text-[#C58A19]'
                    }`}
                  >
                    {isAr ? sub.nameAr : sub.nameEn}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Loading Spinner */}
        {loading && categoryProducts.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center justify-center">
            <div className="w-10 h-10 border-3 border-[#C58A19] border-t-transparent rounded-full animate-spin mb-3" />
            <p className="text-xs text-[#8C6D62] font-medium">
              {isAr ? 'جاري تحميل التشكيلة الفاخرة...' : 'Loading artisanal creations...'}
            </p>
          </div>
        ) : categoryProducts.length === 0 ? (
          /* Empty State Showcase */
          <div className="bg-white rounded-3xl p-10 sm:p-14 border border-[#F2E5D5] shadow-xs text-center max-w-2xl mx-auto flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-[#FFF9F0] border border-[#EBDCC8] flex items-center justify-center text-[#C58A19] mb-4 shadow-sm">
              <Sparkles className="w-8 h-8 stroke-[1.7]" />
            </div>
            
            <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#4A2116] mb-2">
              {isAr ? `تشكيلة ${categoryName} الحصرية` : `Exclusive ${categoryName} Collection`}
            </h3>
            
            <p className="text-xs sm:text-sm text-[#8C6D62] leading-relaxed max-w-lg mb-6">
              {isAr
                ? 'كل تحفة في هذا القسم تُصمم خصيصاً على أيدي كبار شيفات الحلويات بعناية فائقة. اختر نكهاتك وطبقات الكيك ولمساتك المفضلة لنصنع لك تصميماً استثنائياً.'
                : 'Every bespoke design in this collection is custom baked to order by our master confectionery team. Select your sponge layers, artisan fillings, and personal sugarcraft.'}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 w-full">
              <button
                type="button"
                onClick={() => onCustomizeClick ? onCustomizeClick(null) : (window.location.hash = '#customize')}
                className="bg-[#4A2116] hover:bg-[#C58A19] text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-full transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#E6C783]" />
                <span>{isAr ? 'طلب تصميم خاص مخصص' : `Order Custom ${categoryName}`}</span>
              </button>
            </div>
          </div>
        ) : (
          /* Products Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7 lg:gap-8">
            {categoryProducts.map((cake) => {
              const priceNum = Number(cake.price) || 0;
              const hasTwoPhotos = Boolean(cake.secondary_image_url);

              const activeTitle = isAr ? (cake.title_ar || cake.title) : cake.title;
              const activeFlavor = isAr ? (cake.flavor_ar || cake.flavor) : cake.flavor;
              const activeServings = isAr ? (cake.servings_ar || cake.servings) : cake.servings;
              const activeDescription = isAr ? (cake.description_ar || cake.description) : cake.description;
              const productSlug = cake.slug || slugify(cake.title) || cake.id;

              return (
                <div
                  key={cake.id}
                  onClick={() => {
                    window.location.hash = `#product-${productSlug}`;
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="group bg-white rounded-[26px] overflow-hidden border border-[#F5EBDD] shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col cursor-pointer"
                >
                  {/* Image Presentation Container */}
                  <div className="relative aspect-[1/1] overflow-hidden bg-[#FAF5ED]">
                    <img
                      src={formatImageUrl(cake.image_url)}
                      alt={activeTitle}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out select-none"
                      loading="lazy"
                    />

                    {/* Secondary Image Badge */}
                    {hasTwoPhotos && (
                      <div className="absolute bottom-3 left-3 rtl:left-auto rtl:right-3 bg-black/60 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1 z-10">
                        <ImageIcon className="w-3 h-3 text-[#E6C783]" />
                        <span>2 Photos</span>
                      </div>
                    )}

                    {/* Price Pill Tag in Top Right */}
                    <div className="absolute top-3.5 right-3.5 rtl:right-auto rtl:left-3.5 z-10 pointer-events-none">
                      <span className="bg-[#4A2116]/90 backdrop-blur-md px-3 py-1 rounded-full shadow-sm text-[#E6C783] font-sans font-bold text-xs sm:text-sm tracking-tight border border-[#C58A19]/30">
                        AED {priceNum}
                      </span>
                    </div>

                    {/* Soft gradient bottom overlay */}
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Card Content Details */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Servings Badge */}
                      {activeServings && (
                        <div className="flex items-center gap-1.5 flex-wrap mb-2">
                          <span className="text-[10px] font-semibold bg-[#FAF5ED] text-[#7A5846] px-2 py-0.5 rounded-md border border-[#EBDCC8] flex items-center gap-1">
                            <Users className="w-3 h-3 text-[#C58A19]" />
                            <span>{activeServings}</span>
                          </span>
                        </div>
                      )}

                      {/* Cake Title */}
                      <h3 className="font-serif font-bold text-base sm:text-[17px] text-[#4A2116] group-hover:text-[#C58A19] transition-colors line-clamp-1 leading-snug">
                        {activeTitle}
                      </h3>

                      {/* Flavor Note */}
                      {activeFlavor && (
                        <p className="text-[11px] font-medium text-[#C58A19] line-clamp-1 mt-1">
                          {activeFlavor}
                        </p>
                      )}

                      {/* Description Excerpt */}
                      {activeDescription && (
                        <p className="text-xs text-[#8C6D62] mt-1.5 line-clamp-2 leading-relaxed">
                          {activeDescription}
                        </p>
                      )}
                    </div>

                    {/* Bottom Action Buttons */}
                    <div className="pt-4 mt-3 border-t border-[#F5EBDD] flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => handleAddProductToCart(cake, e)}
                        className="flex-1 bg-[#FCE5C2] hover:bg-[#C58A19] hover:text-white text-[#4A2116] font-semibold text-xs py-2 px-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs active:scale-95"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 stroke-[2.2]" />
                        <span>{isAr ? 'أضف للحقيبة' : 'Add to Bag'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={(e) => handleCustomizeProduct(cake, e)}
                        className="p-2 bg-[#FAF5ED] hover:bg-[#F2E6D5] text-[#7A5846] hover:text-[#4A2116] rounded-xl border border-[#EBDCC8] transition-colors cursor-pointer"
                        title={isAr ? 'تخصيص هذا التصميم' : 'Customize this cake'}
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#C58A19]" />
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

    </section>
  );
}
