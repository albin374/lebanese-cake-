import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Sparkles, 
  ArrowLeft, 
  Check, 
  Users, 
  Scale,
  Layers,
  Phone, 
  MessageCircle, 
  ChevronRight, 
  Image as ImageIcon,
  Share2
} from 'lucide-react';
import { formatImageUrl } from './CategoryProductsSection';
import { 
  translateTitleToArabic, 
  translateFlavorToArabic, 
  translateServingsToArabic, 
  translateDescriptionToArabic,
  translateTiersToArabic,
  translateWeightToArabic
} from '../utils/arabicTranslator';
import { navigateTo } from '../utils/navigation';

import { API_BASE, API_SERVER_URL } from '../config/api';

const CATEGORY_NAMES = {
  'classic-wedding-cakes': { en: 'Classic Wedding Cakes', ar: 'كيك الأعراس الكلاسيكي', path: '/classic-wedding-cakes', hash: '/classic-wedding-cakes' },
  'novelty-wedding-cakes': { en: 'Novelty Wedding Cakes', ar: 'كيك الأعراس المبتكر', path: '/novelty-wedding-cakes', hash: '/novelty-wedding-cakes' },
  'bride-to-be-cakes': { en: 'Bride To Be Cakes', ar: 'كيك توديع العزوبية', path: '/bride-to-be-cakes', hash: '/bride-to-be-cakes' },
  'engagement-cakes': { en: 'Engagement Celebration Cakes', ar: 'كيك الخطوبة', path: '/engagement-cakes', hash: '/engagement-cakes' },
  'grooms-cakes': { en: 'Grooms Cakes', ar: 'كيك العريس', path: '/grooms-cakes', hash: '/grooms-cakes' },
  'wedding': { en: 'Wedding Cakes', ar: 'كيك الأعراس', path: '/classic-wedding-cakes', hash: '/classic-wedding-cakes' },
  'wedding-cakes': { en: 'Wedding Cakes', ar: 'كيك الأعراس', path: '/classic-wedding-cakes', hash: '/classic-wedding-cakes' },
  'corporate-cakes': { en: 'Corporate Cakes', ar: 'كيك الشركات', path: '/corporate-cakes', hash: '/corporate-cakes' },
  'corporate-cookies': { en: 'Corporate Cookies', ar: 'كوكيز الشركات', path: '/corporate-cookies', hash: '/corporate-cookies' },
  'cupcakes-with-logo': { en: 'Cupcakes with Logo', ar: 'كب كيك مع شعار', path: '/cupcakes-with-logo', hash: '/cupcakes-with-logo' },
  'cookies': { en: 'Cookies and Macarons', ar: 'كوكيز وماكرون', path: '/cookies', hash: '/cookies' },
  'cookies-cat': { en: 'Cookies and Macarons', ar: 'كوكيز وماكرون', path: '/cookies', hash: '/cookies' },
  'cake-pops': { en: 'Cake Pops', ar: 'كيك بوبس', path: '/cake-pops', hash: '/cake-pops' },
  'cake-pops-cat': { en: 'Cake Pops', ar: 'كيك بوبس', path: '/cake-pops', hash: '/cake-pops' },
  'cupcakes': { en: 'Cupcakes', ar: 'كب كيك', path: '/cupcakes', hash: '/cupcakes' },
  'cupcakes-cat': { en: 'Cupcakes', ar: 'كب كيك', path: '/cupcakes', hash: '/cupcakes' },
  'cakes-for-kids': { en: 'Cakes for Kids', ar: 'كيك للأطفال', path: '/cakes-for-kids', hash: '/cakes-for-kids' },
  'kids': { en: 'Cakes for Kids', ar: 'كيك للأطفال', path: '/cakes-for-kids', hash: '/cakes-for-kids' },
  'cakes-for-ladies': { en: 'Cakes for Ladies', ar: 'كيك للسيدات', path: '/cakes-for-ladies', hash: '/cakes-for-ladies' },
  'ladies': { en: 'Cakes for Ladies', ar: 'كيك للسيدات', path: '/cakes-for-ladies', hash: '/cakes-for-ladies' },
  'girls': { en: 'Cakes for Ladies', ar: 'كيك للسيدات', path: '/cakes-for-ladies', hash: '/cakes-for-ladies' },
  'cakes-for-guys': { en: 'Cakes for Guys', ar: 'كيك للرجال', path: '/cakes-for-guys', hash: '/cakes-for-guys' },
  'guys': { en: 'Cakes for Guys', ar: 'كيك للرجال', path: '/cakes-for-guys', hash: '/cakes-for-guys' },
  'boys': { en: 'Cakes for Guys', ar: 'كيك للرجال', path: '/cakes-for-guys', hash: '/cakes-for-guys' },
  'graduation-cakes': { en: 'Graduation Cakes', ar: 'كيك التخرج', path: '/graduation-cakes', hash: '/graduation-cakes' },
  'graduation': { en: 'Graduation Cakes', ar: 'كيك التخرج', path: '/graduation-cakes', hash: '/graduation-cakes' },
  'cars-ships-planes-cakes': { en: 'Cars, Ships and Planes Cakes', ar: 'كيك المركبات واليخوت', path: '/cars-ships-planes-cakes', hash: '/cars-ships-planes-cakes' },
  'vehicles': { en: 'Cars, Ships and Planes Cakes', ar: 'كيك المركبات واليخوت', path: '/cars-ships-planes-cakes', hash: '/cars-ships-planes-cakes' },
  'sporting-cakes': { en: 'Sporting Cakes', ar: 'كيك المناسبات الرياضية', path: '/sporting-cakes', hash: '/sporting-cakes' },
  'sporting': { en: 'Sporting Cakes', ar: 'كيك المناسبات الرياضية', path: '/sporting-cakes', hash: '/sporting-cakes' },
  'couture-cakes': { en: 'Couture Cakes', ar: 'كيك الأزياء الراقية', path: '/couture-cakes', hash: '/couture-cakes' },
  'couture': { en: 'Couture Cakes', ar: 'كيك الأزياء الراقية', path: '/couture-cakes', hash: '/couture-cakes' },
  '3d-cakes': { en: '3D Cakes', ar: 'كيك مجسم 3D', path: '/3d-cakes', hash: '/3d-cakes' },
  '3d-art': { en: '3D Cakes', ar: 'كيك مجسم 3D', path: '/3d-cakes', hash: '/3d-cakes' },
  'food-drink-illusion-cakes': { en: 'Food and Drink Illusion Cakes', ar: 'كيك الخداع البصري', path: '/food-drink-illusion-cakes', hash: '/food-drink-illusion-cakes' },
  'illusion': { en: 'Food and Drink Illusion Cakes', ar: 'كيك الخداع البصري', path: '/food-drink-illusion-cakes', hash: '/food-drink-illusion-cakes' },
  'doughnuts-cakes': { en: 'Doughnuts Cakes', ar: 'كيك الدونات المخصصة', path: '/doughnuts-cakes', hash: '/doughnuts-cakes' },
  'doughnuts': { en: 'Doughnuts Cakes', ar: 'كيك الدونات المخصصة', path: '/doughnuts-cakes', hash: '/doughnuts-cakes' },
  'photo-on-cake': { en: 'Photo on Cake', ar: 'كيك الصور المطبوعة', path: '/photo-on-cake', hash: '/photo-on-cake' },
  'photo': { en: 'Photo on Cake', ar: 'كيك الصور المطبوعة', path: '/photo-on-cake', hash: '/photo-on-cake' },
  'pet-animals-cakes': { en: 'Pet and Animals Cakes', ar: 'كيك الحيوانات الأليفة', path: '/pet-animals-cakes', hash: '/pet-animals-cakes' },
  'pets': { en: 'Pet and Animals Cakes', ar: 'كيك الحيوانات الأليفة', path: '/pet-animals-cakes', hash: '/pet-animals-cakes' },
  'superhero-cakes': { en: 'Superhero Cakes', ar: 'كيك الأبطال الخارقين', path: '/superhero-cakes', hash: '/superhero-cakes' },
  'superheroes': { en: 'Superhero Cakes', ar: 'كيك الأبطال الخارقين', path: '/superhero-cakes', hash: '/superhero-cakes' },
  'labubu-cakes': { en: 'Labubu Cakes', ar: 'كيك لابوبو العصري', path: '/labubu-cakes', hash: '/labubu-cakes' },
  'labubu': { en: 'Labubu Cakes', ar: 'كيك لابوبو العصري', path: '/labubu-cakes', hash: '/labubu-cakes' },
  'cake-baking-decorating': { en: 'Baking and Decorating Classes', ar: 'دورات الخبز والتزيين', path: '/cake-baking-decorating', hash: '/cake-baking-decorating' },
  'classes': { en: 'Baking and Decorating Classes', ar: 'دورات الخبز والتزيين', path: '/cake-baking-decorating', hash: '/cake-baking-decorating' }
};

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

const findProductInList = (list, identifier) => {
  if (!Array.isArray(list) || !identifier) return null;
  const clean = decodeURIComponent(identifier).toLowerCase().trim();

  // 1. Exact slug match
  let found = list.find(p => p.slug && p.slug.toLowerCase().trim() === clean);
  if (found) return found;

  // 2. Slugified English title match
  found = list.find(p => p.title && slugify(p.title) === clean);
  if (found) return found;

  // 3. Exact ID match (supports legacy #product-4 URLs)
  found = list.find(p => String(p.id) === clean);
  if (found) return found;

  // 4. Exact Title or Arabic title slug match
  found = list.find(p => 
    (p.title && p.title.toLowerCase().trim() === clean) ||
    (p.title_ar && slugify(p.title_ar) === clean)
  );
  return found || null;
};

export default function ProductDetailsPage({ 
  productId, 
  currentLang = 'en', 
  onAddToCart, 
  onCustomizeClick,
  onNavigate 
}) {
  const isAr = currentLang === 'ar';
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activePhotoSlot, setActivePhotoSlot] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [addedToast, setAddedToast] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Load product from cache or backend API
  useEffect(() => {
    let isMounted = true;

    const loadProductData = async () => {
      setLoading(true);
      setActivePhotoSlot(1);
      setQuantity(1);

      // 1. Try resolving immediately from localStorage cache
      try {
        const cachedStr = localStorage.getItem('ldb_cached_products');
        if (cachedStr) {
          const cachedList = JSON.parse(cachedStr);
          if (Array.isArray(cachedList)) {
            const match = findProductInList(cachedList, productId);
            if (match && isMounted) {
              setProduct(match);

              // Seamlessly upgrade URL from /product/4 to /product/slug
              const canonical = match.slug || slugify(match.title);
              if (canonical && window.location.pathname !== `/product/${canonical}`) {
                window.history.replaceState(null, '', `/product/${canonical}`);
              }

              // Find related items from same category
              const related = cachedList
                .filter(p => p.id !== match.id && p.category_slug === match.category_slug)
                .slice(0, 4);
              setRelatedProducts(related);
              setLoading(false);
            }
          }
        }
      } catch (_) {}

      // 2. Fetch fresh data from backend
      try {
        const res = await fetch(`${API_BASE}/products`);
        if (res.ok) {
          const data = await res.json();
          const list = Array.isArray(data) ? data : (data.products || []);
          if (isMounted && list.length > 0) {
            const match = findProductInList(list, productId);
            if (match) {
              setProduct(match);

              // Seamlessly upgrade URL from /product/4 to /product/slug
              const canonical = match.slug || slugify(match.title);
              if (canonical && window.location.pathname !== `/product/${canonical}`) {
                window.history.replaceState(null, '', `/product/${canonical}`);
              }

              const related = list
                .filter(p => p.id !== match.id && p.category_slug === match.category_slug)
                .slice(0, 4);
              setRelatedProducts(related);
            }
          }
        }
      } catch (err) {
        console.warn('Backend fetch note:', err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadProductData();

    // Listen for product catalog updates
    const handleUpdate = () => loadProductData();
    window.addEventListener('ldb_products_updated', handleUpdate);
    return () => {
      isMounted = false;
      window.removeEventListener('ldb_products_updated', handleUpdate);
    };
  }, [productId]);

  const categoryMeta = product?.category_slug ? CATEGORY_NAMES[product.category_slug] : null;
  const categoryTitle = categoryMeta ? (isAr ? categoryMeta.ar : categoryMeta.en) : (isAr ? 'التشكيلة الحصرية' : 'Exclusive Collection');
  const categoryPath = categoryMeta?.path || '/';

  const handleBackToCategory = () => {
    if (onNavigate && product?.category_slug) {
      onNavigate(product.category_slug);
    } else if (categoryPath) {
      navigateTo(categoryPath);
    } else {
      window.history.back();
    }
  };

  const displayTitle = isAr ? (product?.title_ar || translateTitleToArabic(product?.title)) : product?.title;
  const displayFlavor = isAr ? (product?.flavor_ar || translateFlavorToArabic(product?.flavor)) : product?.flavor;
  const displayServings = isAr ? (product?.servings_ar || translateServingsToArabic(product?.servings)) : product?.servings;
  const displayDescription = isAr ? (product?.description_ar || translateDescriptionToArabic(product?.description)) : product?.description;
  const displayWeight = isAr ? (product?.weight_ar || translateWeightToArabic(product?.weight)) : product?.weight;
  const displayTiers = isAr ? (product?.tiers_ar || translateTiersToArabic(product?.tiers)) : product?.tiers;

  const handleAddToCartClick = () => {
    if (!product) return;
    if (onAddToCart) {
      for (let i = 0; i < quantity; i++) {
        onAddToCart({
          id: product.id,
          title: displayTitle,
          price: Number(product.price) || 0,
          image: formatImageUrl(product.image_url),
          flavor: displayFlavor,
          servings: displayServings
        });
      }
    }
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2400);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Lebanese Dream Bakery! I would like to inquire about the cake: "${displayTitle || 'Custom Cake'}" (Price: AED ${product?.price || ''}). Link: ${window.location.href}`
  );

  if (loading && !product) {
    return (
      <div className={`min-h-[70vh] bg-[#FFF9F0] flex flex-col items-center justify-center p-8 ${isAr ? 'font-arabic' : 'font-poppins'}`}>
        <div className="w-12 h-12 border-3 border-[#C58A19] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm text-[#7A5846] font-medium">
          {isAr ? 'جاري تحميل تفاصيل الكيك...' : 'Loading bespoke cake specifications...'}
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className={`min-h-[70vh] bg-[#FFF9F0] flex flex-col items-center justify-center p-8 text-center ${isAr ? 'font-arabic' : 'font-poppins'}`}>
        <div className="w-16 h-16 rounded-2xl bg-[#FAF5ED] border border-[#EBDCC8] flex items-center justify-center text-[#C58A19] mb-4 shadow-sm">
          <ImageIcon className="w-8 h-8 opacity-60" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-[#4A2116] mb-2">
          {isAr ? 'المنتج غير متوفر' : 'Cake Item Not Found'}
        </h2>
        <p className="text-xs sm:text-sm text-[#8C6D62] max-w-md mb-6 leading-relaxed">
          {isAr 
            ? 'ربما تم تحديث هذا الصنف أو تم نقله. يمكنك تصفح باقي تشكيلات الكيك الفاخرة.'
            : 'This cake design may have been updated or moved. Explore our signature bespoke collections.'}
        </p>
        <button
          type="button"
          onClick={() => navigateTo('/')}
          className="bg-[#4A2116] hover:bg-[#C58A19] text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-full transition-colors cursor-pointer shadow-sm"
        >
          {isAr ? 'العودة للرئيسية' : 'Return to Home'}
        </button>
      </div>
    );
  }

  const priceNum = Number(product.price) || 0;
  const hasTwoPhotos = Boolean(product.secondary_image_url);
  const currentPhotoUrl = activePhotoSlot === 2 && product.secondary_image_url 
    ? product.secondary_image_url 
    : product.image_url;

  return (
    <div className={`w-full bg-[#FFF9F0] text-[#4A2116] min-h-screen ${isAr ? 'font-arabic' : 'font-poppins'}`}>
      
      {/* Toast Notification */}
      {addedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#2A160D] text-white border border-[#C58A19] px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 animate-fadeIn text-xs sm:text-sm font-medium">
          <Check className="w-4 h-4 text-[#C58A19] stroke-[2.5]" />
          <span>
            {isAr ? `تمت إضافة "${displayTitle}" إلى حقيبة التسوق!` : `Added "${displayTitle}" to your bag!`}
          </span>
        </div>
      )}

      {/* Breadcrumb & Navigation Bar */}
      <div className="bg-[#FAF5ED] border-b border-[#F2E5D5] py-3 px-4 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-[#8C6D62]">
          
          {/* Breadcrumb Trail */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => navigateTo('/')}
              className="hover:text-[#C58A19] transition-colors cursor-pointer"
            >
              {isAr ? 'الرئيسية' : 'Home'}
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-[#C58A19]/50 rtl:rotate-180" />
            <button
              type="button"
              onClick={handleBackToCategory}
              className="hover:text-[#C58A19] transition-colors cursor-pointer"
            >
              {categoryTitle}
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-[#C58A19]/50 rtl:rotate-180" />
            <span className="font-semibold text-[#4A2116] truncate max-w-[200px] sm:max-w-sm">
              {displayTitle}
            </span>
          </div>

          {/* Quick Back Button */}
          <button
            type="button"
            onClick={handleBackToCategory}
            className="hidden sm:inline-flex items-center gap-1.5 font-medium text-[#7A5846] hover:text-[#C58A19] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
            <span>{isAr ? `العودة إلى ${categoryTitle}` : `Back to ${categoryTitle}`}</span>
          </button>
        </div>
      </div>

      {/* Main Product Details Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-14">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* ========================================================= */}
          {/* LEFT COLUMN: HIGH-RES PHOTOGRAPHY & GALLERY (7 COLUMNS) */}
          {/* ========================================================= */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Primary Main Image Display */}
            <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-white border border-[#F2E5D5] shadow-sm group">
              <img
                src={formatImageUrl(currentPhotoUrl)}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Price Pill Overlay */}
              <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4 z-10">
                <span className="bg-[#4A2116]/90 backdrop-blur-md px-4 py-1.5 rounded-full shadow-md text-[#E6C783] font-sans font-bold text-sm sm:text-base tracking-tight border border-[#C58A19]/30">
                  AED {priceNum}
                </span>
              </div>

              {/* Multi-Photo Indicator Badge */}
              {hasTwoPhotos && (
                <div className="absolute bottom-4 left-4 rtl:left-auto rtl:right-4 z-10 bg-black/60 backdrop-blur-md text-white text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-[#E6C783]" />
                  <span>{isAr ? 'صورتان للكيك' : '2 High-Res Views'}</span>
                </div>
              )}
            </div>

            {/* Thumbnail Selectors (when secondary photo is present) */}
            {hasTwoPhotos && (
              <div className="flex items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setActivePhotoSlot(1)}
                  className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 cursor-pointer transition-all ${
                    activePhotoSlot === 1 
                      ? 'border-[#C58A19] shadow-md ring-2 ring-[#C58A19]/30' 
                      : 'border-[#EBDCC8] opacity-75 hover:opacity-100'
                  }`}
                  aria-label="View Photo 1"
                >
                  <img
                    src={formatImageUrl(product.image_url)}
                    alt="View 1"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 bg-black/70 text-white text-[9px] font-bold px-1.5 py-0.2 rounded">
                    #1
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActivePhotoSlot(2)}
                  className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 cursor-pointer transition-all ${
                    activePhotoSlot === 2 
                      ? 'border-[#C58A19] shadow-md ring-2 ring-[#C58A19]/30' 
                      : 'border-[#EBDCC8] opacity-75 hover:opacity-100'
                  }`}
                  aria-label="View Photo 2"
                >
                  <img
                    src={formatImageUrl(product.secondary_image_url)}
                    alt="View 2"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 bg-black/70 text-white text-[9px] font-bold px-1.5 py-0.2 rounded">
                    #2
                  </span>
                </button>
              </div>
            )}

          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: SPECIFICATIONS, QUANTITY & ACTIONS (5 COLS) */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              
              {/* Category Pill Tag */}
              <div>
                <button
                  type="button"
                  onClick={handleBackToCategory}
                  className="inline-block text-[11px] uppercase tracking-wider font-bold text-[#C58A19] bg-[#FAF5ED] hover:bg-[#F2E5D5] px-3 py-1 rounded-full border border-[#EBDCC8] transition-colors cursor-pointer"
                >
                  {categoryTitle}
                </button>
              </div>

              {/* Cake Headline Title */}
              <h1 className="font-serif font-bold text-3xl sm:text-4xl text-[#4A2116] tracking-tight leading-tight">
                {displayTitle}
              </h1>

              {/* Price Banner */}
              <div className="flex items-baseline gap-3 pb-3 border-b border-[#F2E5D5]">
                <span className="font-sans font-bold text-3xl sm:text-4xl text-[#C58A19] tracking-tight">
                  AED {priceNum}
                </span>
                <span className="text-xs text-[#8C6D62] font-medium">
                  {isAr ? 'شامل ضريبة القيمة المضافة' : 'VAT included'}
                </span>
              </div>

              {/* Product Attributes (Flavor, Servings, Weight & Tiers) */}
              <div className="space-y-2.5">
                {displayFlavor && (
                  <div className="bg-white p-3.5 rounded-2xl border border-[#F2E5D5] flex items-start gap-3">
                    <Sparkles className="w-4 h-4 text-[#C58A19] shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-[11px] font-bold uppercase tracking-wider text-[#8A6753]">
                        {isAr ? 'النكهة والحشوة' : 'Flavor & Filling'}
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-[#4A2116]">
                        {displayFlavor}
                      </span>
                    </div>
                  </div>
                )}

                {displayServings && (
                  <div className="bg-white p-3.5 rounded-2xl border border-[#F2E5D5] flex items-start gap-3">
                    <Users className="w-4 h-4 text-[#C58A19] shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-[11px] font-bold uppercase tracking-wider text-[#8A6753]">
                        {isAr ? 'عدد الحصص والضيوف' : 'Servings Capacity'}
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-[#4A2116]">
                        {displayServings}
                      </span>
                    </div>
                  </div>
                )}

                {displayWeight && (
                  <div className="bg-white p-3.5 rounded-2xl border border-[#F2E5D5] flex items-start gap-3">
                    <Scale className="w-4 h-4 text-[#C58A19] shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-[11px] font-bold uppercase tracking-wider text-[#8A6753]">
                        {isAr ? 'الوزن التقريبي' : 'Weight (kg)'}
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-[#4A2116]">
                        {displayWeight}
                      </span>
                    </div>
                  </div>
                )}

                {displayTiers && (
                  <div className="bg-white p-3.5 rounded-2xl border border-[#F2E5D5] flex items-start gap-3">
                    <Layers className="w-4 h-4 text-[#C58A19] shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-[11px] font-bold uppercase tracking-wider text-[#8A6753]">
                        {isAr ? 'عدد الأدوار / الطبقات' : 'Cake Tiers'}
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-[#4A2116]">
                        {displayTiers}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Description Body */}
              {displayDescription && (
                <div className="space-y-1.5 pt-1">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#7A5846]">
                    {isAr ? 'عن هذا التصميم' : 'Design Overview'}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#7A5846] leading-relaxed whitespace-pre-line bg-white/60 p-4 rounded-2xl border border-[#F2E5D5]">
                    {displayDescription}
                  </p>
                </div>
              )}

            </div>

            {/* Purchase & Action Controls */}
            <div className="space-y-3.5 pt-4 border-t border-[#F2E5D5]">
              
              {/* Quantity Selector + Add to Bag */}
              <div className="flex items-center gap-3">
                <div className="flex items-center bg-white border border-[#EBDCC8] rounded-2xl p-1 shadow-2xs">
                  <button
                    type="button"
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-[#4A2116] hover:bg-[#FAF5ED] transition-colors cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-bold text-sm text-[#4A2116]">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(q => q + 1)}
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-[#4A2116] hover:bg-[#FAF5ED] transition-colors cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAddToCartClick}
                  className="flex-1 bg-[#4A2116] hover:bg-[#C58A19] text-white font-semibold text-sm sm:text-base py-3.5 px-6 rounded-2xl transition-all duration-200 flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-[#E6C783]" />
                  <span>{isAr ? `إضافة إلى الحقيبة (AED ${priceNum * quantity})` : `Add to Bag • AED ${priceNum * quantity}`}</span>
                </button>
              </div>

              {/* Secondary Actions: Customize & WhatsApp Concierge */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => onCustomizeClick ? onCustomizeClick(product) : navigateTo('/customize')}
                  className="bg-[#FAF5ED] hover:bg-[#F2E6D5] text-[#4A2116] border border-[#E2D2BD] font-semibold text-xs sm:text-sm py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                >
                  <Sparkles className="w-4 h-4 text-[#C58A19]" />
                  <span>{isAr ? 'تخصيص هذا التصميم' : 'Customize This Cake'}</span>
                </button>

                <a
                  href={`https://wa.me/971506063631?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] border border-[#25D366]/30 font-semibold text-xs sm:text-sm py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{isAr ? 'استفسار عبر واتساب' : 'WhatsApp Concierge'}</span>
                </a>
              </div>

              {/* Share Button & Phone Support */}
              <div className="flex items-center justify-between pt-2 text-xs text-[#8C6D62]">
                <button
                  type="button"
                  onClick={handleShare}
                  className="inline-flex items-center gap-1.5 hover:text-[#C58A19] transition-colors cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copiedLink ? (isAr ? 'تم نسخ الرابط!' : 'Link Copied!') : (isAr ? 'مشاركة هذا الكيك' : 'Share this cake')}</span>
                </button>

                <a
                  href="tel:+971506063631"
                  className="inline-flex items-center gap-1.5 hover:text-[#C58A19] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C58A19]" />
                  <span>+971 506063631</span>
                </a>
              </div>

            </div>

          </div>

        </div>

        {/* ========================================================= */}
        {/* RELATED CAKES SECTION */}
        {/* ========================================================= */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 pt-12 border-t border-[#F2E5D5]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-[11px] uppercase tracking-wider font-bold text-[#C58A19] bg-[#FAF5ED] px-2.5 py-0.5 rounded-full border border-[#EBDCC8]">
                  {isAr ? 'المزيد من التشكيلة' : 'More Creations'}
                </span>
                <h3 className="font-serif font-bold text-2xl text-[#4A2116] mt-1">
                  {isAr ? `إبداعات أخرى في ${categoryTitle}` : `More in ${categoryTitle}`}
                </h3>
              </div>

              <button
                type="button"
                onClick={handleBackToCategory}
                className="text-xs font-semibold text-[#4A2116] hover:text-[#C58A19] transition-colors cursor-pointer"
              >
                {isAr ? 'عرض الكل ←' : 'View All →'}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(rel => {
                const relSlug = rel.slug || slugify(rel.title) || rel.id;
                const relTitle = isAr ? (rel.title_ar || translateTitleToArabic(rel.title)) : rel.title;
                const relFlavor = isAr ? (rel.flavor_ar || translateFlavorToArabic(rel.flavor)) : rel.flavor;

                return (
                  <div
                    key={rel.id}
                    onClick={() => navigateTo(`/product/${relSlug}`)}
                    className="group bg-white rounded-2xl overflow-hidden border border-[#F2E5D5] shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col"
                  >
                    <div className="aspect-square overflow-hidden bg-[#FAF5ED] relative">
                      <img
                        src={formatImageUrl(rel.image_url)}
                        alt={relTitle}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2.5 right-2.5 bg-[#4A2116]/90 text-[#E6C783] text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                        AED {rel.price}
                      </div>
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-serif font-bold text-sm text-[#4A2116] group-hover:text-[#C58A19] transition-colors line-clamp-1">
                          {relTitle}
                        </h4>
                        {relFlavor && (
                          <p className="text-[11px] text-[#8C6D62] mt-0.5 line-clamp-1">
                            {relFlavor}
                          </p>
                        )}
                      </div>
                      <span className="text-xs font-semibold text-[#C58A19] mt-3 block">
                        {isAr ? 'عرض التفاصيل ←' : 'View Details →'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
