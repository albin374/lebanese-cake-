import React, { useState, useEffect } from 'react';
import TopHeader from './components/TopHeader';
import MainHeader from './components/MainHeader';
import Navbar from './components/Navbar';
import BannerSection from './components/BannerSection';
import CakeCategoriesSection from './components/CakeCategoriesSection';
import BestsellersSection from './components/BestsellersSection';
import BestCakesInDubaiSection from './components/BestCakesInDubaiSection';
import ChefStorySection from './components/ChefStorySection';
import ReviewsSection from './components/ReviewsSection';
import FooterSection from './components/FooterSection';
import CustomizeCakeModal from './components/CustomizeCakeModal';
import CustomizePage from './components/CustomizePage';
import CookiesPage from './components/CookiesPage';
import CupcakesPage from './components/CupcakesPage';
import CakePopsPage from './components/CakePopsPage';
import CakesForKidsPage from './components/CakesForKidsPage';
import CakesForGuysPage from './components/CakesForGuysPage';
import CakesForLadiesPage from './components/CakesForLadiesPage';
import ClassicWeddingCakesPage from './components/ClassicWeddingCakesPage';
import NoveltyWeddingCakesPage from './components/NoveltyWeddingCakesPage';
import BrideToBeCakesPage from './components/BrideToBeCakesPage';
import EngagementCakesPage from './components/EngagementCakesPage';
import GroomsCakesPage from './components/GroomsCakesPage';
import CorporateCakesPage from './components/CorporateCakesPage';
import CorporateCookiesPage from './components/CorporateCookiesPage';
import CupcakesWithLogoPage from './components/CupcakesWithLogoPage';
import GraduationCakesPage from './components/GraduationCakesPage';
import VehiclesCakesPage from './components/VehiclesCakesPage';
import SportingCakesPage from './components/SportingCakesPage';
import CoutureCakesPage from './components/CoutureCakesPage';
import ThreeDCakesPage from './components/ThreeDCakesPage';
import IllusionCakesPage from './components/IllusionCakesPage';
import DoughnutsCakesPage from './components/DoughnutsCakesPage';
import PhotoOnCakePage from './components/PhotoOnCakePage';
import PetAnimalsCakesPage from './components/PetAnimalsCakesPage';
import SuperheroCakesPage from './components/SuperheroCakesPage';
import LabubuCakesPage from './components/LabubuCakesPage';
import BakingDecoratingPage from './components/BakingDecoratingPage';
import ProductDetailsPage from './components/ProductDetailsPage';
import CartPage from './components/CartPage';
import MyOrdersPage from './components/MyOrdersPage';
import AdminDashboard from './components/admin/AdminDashboard';
import { parseCurrentRoute, navigateTo } from './utils/navigation';
import { translations } from './translations';
import { Phone, Mail, Clock, X, Check, ShoppingBag, UserRound, ArrowRight, Package } from 'lucide-react';

export default function App() {
  const [currentLang, setCurrentLang] = useState('en');
  const initialRoute = parseCurrentRoute();
  const [currentPage, setCurrentPage] = useState(initialRoute.page);
  const [selectedProductId, setSelectedProductId] = useState(initialRoute.productId);
  const [activeCategory, setActiveCategory] = useState('all-cakes');
  const [cartItems, setCartItems] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('ldb_cart_items');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            // Filter out any old static placeholder items so user starts clean
            return parsed.filter(item => !item.id?.toString().startsWith('cart-init-'));
          }
        }
      } catch (_) {}
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('ldb_cart_items', JSON.stringify(cartItems));
    } catch (_) {}
  }, [cartItems]);

  const cartCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);

  const handleUpdateQuantity = (itemId, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    setCartItems(prev => prev.map(item => item.id === itemId ? { ...item, quantity: newQty } : item));
  };

  const handleRemoveItem = (itemId) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
    try {
      localStorage.removeItem('ldb_cart_items');
    } catch (_) {}
  };

  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const t = translations[currentLang] || translations.en;
  const isAr = currentLang === 'ar';

  // Synchronize HTML dir attribute for full RTL support
  useEffect(() => {
    document.documentElement.dir = isAr ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLang;
  }, [currentLang, isAr]);

  // Synchronize clean URL path and popstate with page state
  useEffect(() => {
    const handleLocationChange = () => {
      const route = parseCurrentRoute();
      setCurrentPage(route.page);
      setSelectedProductId(route.productId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const openCartPage = () => navigateTo('/cart');
  const openMyOrdersPage = () => navigateTo('/my-orders');
  const openCustomizePage = () => navigateTo('/customize');
  const openCookiesPage = () => navigateTo('/cookies');
  const openCupcakesPage = () => navigateTo('/cupcakes');
  const openCakePopsPage = () => navigateTo('/cake-pops');
  const openCakesForKidsPage = () => navigateTo('/cakes-for-kids');
  const openCakesForGuysPage = () => navigateTo('/cakes-for-guys');
  const openCakesForLadiesPage = () => navigateTo('/cakes-for-ladies');
  const openClassicWeddingCakesPage = () => navigateTo('/classic-wedding-cakes');
  const openNoveltyWeddingCakesPage = () => navigateTo('/novelty-wedding-cakes');
  const openBrideToBeCakesPage = () => navigateTo('/bride-to-be-cakes');
  const openEngagementCakesPage = () => navigateTo('/engagement-cakes');
  const openGroomsCakesPage = () => navigateTo('/grooms-cakes');
  const openCorporateCakesPage = () => navigateTo('/corporate-cakes');
  const openCorporateCookiesPage = () => navigateTo('/corporate-cookies');
  const openCupcakesWithLogoPage = () => navigateTo('/cupcakes-with-logo');
  const openGraduationCakesPage = () => navigateTo('/graduation-cakes');
  const openVehiclesCakesPage = () => navigateTo('/cars-ships-planes-cakes');
  const openSportingCakesPage = () => navigateTo('/sporting-cakes');
  const openCoutureCakesPage = () => navigateTo('/couture-cakes');
  const openThreeDCakesPage = () => navigateTo('/3d-cakes');
  const openIllusionCakesPage = () => navigateTo('/food-drink-illusion-cakes');
  const openDoughnutsCakesPage = () => navigateTo('/doughnuts-cakes');
  const openPhotoOnCakePage = () => navigateTo('/photo-on-cake');
  const openPetAnimalsCakesPage = () => navigateTo('/pet-animals-cakes');
  const openSuperheroCakesPage = () => navigateTo('/superhero-cakes');
  const openLabubuCakesPage = () => navigateTo('/labubu-cakes');
  const openBakingDecoratingPage = () => navigateTo('/cake-baking-decorating');

  const handleCategoryNavigation = (id) => {
    if (id === 'cookies' || id === 'cookies-cat') {
      openCookiesPage();
      return;
    }
    if (id === 'cupcakes' || id === 'cupcakes-cat') {
      openCupcakesPage();
      return;
    }
    if (id === 'cake-pops' || id === 'cake-pops-cat') {
      openCakePopsPage();
      return;
    }
    if (id === 'cakes-for-kids' || id === 'kids-cat') {
      openCakesForKidsPage();
      return;
    }
    if (id === 'cakes-for-guys' || id === 'guys' || id === 'boys') {
      openCakesForGuysPage();
      return;
    }
    if (id === 'cakes-for-ladies' || id === 'ladies' || id === 'girls') {
      openCakesForLadiesPage();
      return;
    }
    if (id === 'classic-wedding-cakes' || id === 'wedding-cakes' || id === 'wedding') {
      openClassicWeddingCakesPage();
      return;
    }
    if (id === 'novelty-wedding-cakes') {
      openNoveltyWeddingCakesPage();
      return;
    }
    if (id === 'bride-to-be-cakes') {
      openBrideToBeCakesPage();
      return;
    }
    if (id === 'engagement-cakes') {
      openEngagementCakesPage();
      return;
    }
    if (id === 'grooms-cakes') {
      openGroomsCakesPage();
      return;
    }
    if (id === 'corporate-cakes') {
      openCorporateCakesPage();
      return;
    }
    if (id === 'corporate-cookies') {
      openCorporateCookiesPage();
      return;
    }
    if (id === 'cupcakes-with-logo') {
      openCupcakesWithLogoPage();
      return;
    }
    if (id === 'graduation' || id === 'graduation-cakes') {
      openGraduationCakesPage();
      return;
    }
    if (id === 'vehicles' || id === 'cars-ships-planes-cakes') {
      openVehiclesCakesPage();
      return;
    }
    if (id === 'sporting' || id === 'sporting-cakes') {
      openSportingCakesPage();
      return;
    }
    if (id === 'couture' || id === 'couture-cakes') {
      openCoutureCakesPage();
      return;
    }
    if (id === '3d-art' || id === '3d-cakes') {
      openThreeDCakesPage();
      return;
    }
    if (id === 'illusion' || id === 'food-drink-illusion-cakes') {
      openIllusionCakesPage();
      return;
    }
    if (id === 'doughnuts' || id === 'doughnuts-cakes') {
      openDoughnutsCakesPage();
      return;
    }
    if (id === 'photo' || id === 'photo-on-cake') {
      openPhotoOnCakePage();
      return;
    }
    if (id === 'pets' || id === 'pet-animals-cakes') {
      openPetAnimalsCakesPage();
      return;
    }
    if (id === 'superheroes' || id === 'superhero-cakes') {
      openSuperheroCakesPage();
      return;
    }
    if (id === 'labubu' || id === 'labubu-cakes') {
      openLabubuCakesPage();
      return;
    }
    if (id === 'classes' || id === 'cake-baking-decorating') {
      openBakingDecoratingPage();
      return;
    }
    if (currentPage !== 'home') goToHome();
    setActiveCategory(id);
    const el = document.getElementById('cake-categories-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 400, behavior: 'smooth' });
    }
  };

  const goToHome = () => {
    navigateTo('/');
  };

  const handleAddToCart = (item) => {
    if (!item) return;
    setCartItems(prev => {
      const existingIndex = prev.findIndex(ci => ci.id === item.id && ci.flavor === item.flavor);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: (updated[existingIndex].quantity || 1) + (item.quantity || 1)
        };
        return updated;
      }
      return [
        ...prev,
        {
          id: item.id || `item-${Date.now()}`,
          title: item.title || item.occasion || 'Handcrafted Cake',
          title_ar: item.title_ar,
          price: Number(item.price) || 0,
          quantity: item.quantity || 1,
          image: item.image || item.image_url || '/Lebanese Dream Bakery Cake Display.png',
          flavor: item.flavor || '',
          flavor_ar: item.flavor_ar || '',
          servings: item.servings || '',
          servings_ar: item.servings_ar || ''
        }
      ];
    });

    const itemName = item.title || item.occasion || 'Cake';
    setToastMessage(
      isAr 
        ? `تمت إضافة "${itemName}" إلى حقيبتك بنجاح!` 
        : `Added "${itemName}" to your bag!`
    );
    setTimeout(() => setToastMessage(null), 4000);
  };

  if (currentPage === 'admin') {
    return <AdminDashboard onBackToStore={goToHome} />;
  }

  return (
    <div className={`min-h-screen bg-[#FFF9F0] text-[#4A2116] flex flex-col font-sans selection:bg-[#C58A19] selection:text-white w-full max-w-full overflow-x-hidden relative ${isAr ? 'font-arabic' : 'font-poppins'}`}>
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 rtl:right-auto rtl:left-6 z-50 bg-[#4A2116] text-[#FFF9F0] px-5 py-3.5 rounded-2xl shadow-2xl border border-[#C58A19] flex items-center gap-3 animate-fadeIn">
          <div className="w-6 h-6 rounded-full bg-[#C58A19] flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5 text-white stroke-[2.5]" />
          </div>
          <span className="text-xs sm:text-sm font-medium">{toastMessage}</span>
          <button
            type="button"
            onClick={openCartPage}
            className="ml-2 rtl:ml-0 rtl:mr-2 text-xs font-bold text-[#E6C783] hover:underline cursor-pointer flex items-center gap-1"
          >
            <span>{isAr ? 'عرض الحقيبة' : 'View Bag'}</span>
          </button>
        </div>
      )}

      {/* 1. Level 1: Top Contact Bar (Height ~30-35px, #F8F1E6, Phone + Language RTL toggle) */}
      <TopHeader 
        currentLang={currentLang} 
        onLanguageChange={(lang) => setCurrentLang(lang)} 
      />

      {/* 2. Level 2: Main Header (Height ~75-85px, #FFF9F0, Logo ~350-400px, Search with gold button & 10px rounded, CircleHelp, UserRound, ShoppingBag) */}
      <MainHeader 
        currentLang={currentLang}
        cartCount={cartCount}
        onOpenHelp={() => setIsHelpOpen(true)}
        onOpenAccount={openMyOrdersPage}
        onOpenBag={openCartPage}
        onLogoClick={goToHome}
      />

      {/* 3. Level 3: Category Navigation Bar (Height ~48-52px, #FFFFFF, border-y #F5EBDD, Poppins, 14-15px, Hover gold underline, Dropdowns, Customize Cake Button in #C58A19) */}
      <Navbar 
        currentLang={currentLang}
        activeCategory={
          [
            'cookies',
            'cupcakes',
            'cake-pops',
            'cakes-for-kids',
            'cakes-for-guys',
            'cakes-for-ladies',
            'classic-wedding-cakes',
            'novelty-wedding-cakes',
            'bride-to-be-cakes',
            'engagement-cakes',
            'grooms-cakes',
            'corporate-cakes',
            'corporate-cookies',
            'cupcakes-with-logo'
          ].includes(currentPage)
            ? currentPage
            : activeCategory
        }
        onSelectCategory={handleCategoryNavigation}
        onCustomizeClick={openCustomizePage}
      />

      {/* Page View: Dedicated Cart Page OR My Orders OR Dedicated Multi-Step Customize Page OR Dedicated Category Pages OR Homepage */}
      {currentPage === 'my-orders' ? (
        <main className="w-full flex-1">
          <MyOrdersPage
            currentLang={currentLang}
            onAddToCart={handleAddToCart}
            onContinueShopping={goToHome}
          />
        </main>
      ) : currentPage === 'cart' ? (
        <main className="w-full flex-1">
          <CartPage
            cartItems={cartItems}
            currentLang={currentLang}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
            onContinueShopping={goToHome}
            onCustomizeClick={openCustomizePage}
          />
        </main>
      ) : currentPage === 'customize' ? (
        <main className="w-full flex-1">
          <CustomizePage
            currentLang={currentLang}
            onBackToHome={goToHome}
            onAddToCart={handleAddToCart}
            onOpenHelp={() => setIsHelpOpen(true)}
          />
        </main>
      ) : currentPage === 'cookies' ? (
        <main className="w-full flex-1">
          <CookiesPage currentLang={currentLang} onAddToCart={handleAddToCart} onCustomizeClick={openCustomizePage} />
        </main>
      ) : currentPage === 'cupcakes' ? (
        <main className="w-full flex-1">
          <CupcakesPage currentLang={currentLang} onAddToCart={handleAddToCart} onCustomizeClick={openCustomizePage} />
        </main>
      ) : currentPage === 'cake-pops' ? (
        <main className="w-full flex-1">
          <CakePopsPage currentLang={currentLang} onAddToCart={handleAddToCart} onCustomizeClick={openCustomizePage} />
        </main>
      ) : currentPage === 'cakes-for-kids' ? (
        <main className="w-full flex-1">
          <CakesForKidsPage currentLang={currentLang} onAddToCart={handleAddToCart} onCustomizeClick={openCustomizePage} />
        </main>
      ) : currentPage === 'cakes-for-guys' ? (
        <main className="w-full flex-1">
          <CakesForGuysPage currentLang={currentLang} onAddToCart={handleAddToCart} onCustomizeClick={openCustomizePage} />
        </main>
      ) : currentPage === 'cakes-for-ladies' ? (
        <main className="w-full flex-1">
          <CakesForLadiesPage currentLang={currentLang} onAddToCart={handleAddToCart} onCustomizeClick={openCustomizePage} />
        </main>
      ) : currentPage === 'classic-wedding-cakes' ? (
        <main className="w-full flex-1">
          <ClassicWeddingCakesPage currentLang={currentLang} onAddToCart={handleAddToCart} onCustomizeClick={openCustomizePage} />
        </main>
      ) : currentPage === 'novelty-wedding-cakes' ? (
        <main className="w-full flex-1">
          <NoveltyWeddingCakesPage currentLang={currentLang} onAddToCart={handleAddToCart} onCustomizeClick={openCustomizePage} />
        </main>
      ) : currentPage === 'bride-to-be-cakes' ? (
        <main className="w-full flex-1">
          <BrideToBeCakesPage currentLang={currentLang} onAddToCart={handleAddToCart} onCustomizeClick={openCustomizePage} />
        </main>
      ) : currentPage === 'engagement-cakes' ? (
        <main className="w-full flex-1">
          <EngagementCakesPage currentLang={currentLang} onAddToCart={handleAddToCart} onCustomizeClick={openCustomizePage} />
        </main>
      ) : currentPage === 'grooms-cakes' ? (
        <main className="w-full flex-1">
          <GroomsCakesPage currentLang={currentLang} onAddToCart={handleAddToCart} onCustomizeClick={openCustomizePage} />
        </main>
      ) : currentPage === 'corporate-cakes' ? (
        <main className="w-full flex-1">
          <CorporateCakesPage currentLang={currentLang} onAddToCart={handleAddToCart} onCustomizeClick={openCustomizePage} />
        </main>
      ) : currentPage === 'corporate-cookies' ? (
        <main className="w-full flex-1">
          <CorporateCookiesPage currentLang={currentLang} onAddToCart={handleAddToCart} onCustomizeClick={openCustomizePage} />
        </main>
      ) : currentPage === 'cupcakes-with-logo' ? (
        <main className="w-full flex-1">
          <CupcakesWithLogoPage currentLang={currentLang} onAddToCart={handleAddToCart} onCustomizeClick={openCustomizePage} />
        </main>
      ) : currentPage === 'graduation-cakes' ? (
        <main className="w-full flex-1">
          <GraduationCakesPage currentLang={currentLang} onAddToCart={handleAddToCart} onCustomizeClick={openCustomizePage} />
        </main>
      ) : currentPage === 'cars-ships-planes-cakes' ? (
        <main className="w-full flex-1">
          <VehiclesCakesPage currentLang={currentLang} onAddToCart={handleAddToCart} onCustomizeClick={openCustomizePage} />
        </main>
      ) : currentPage === 'sporting-cakes' ? (
        <main className="w-full flex-1">
          <SportingCakesPage currentLang={currentLang} onAddToCart={handleAddToCart} onCustomizeClick={openCustomizePage} />
        </main>
      ) : currentPage === 'couture-cakes' ? (
        <main className="w-full flex-1">
          <CoutureCakesPage currentLang={currentLang} onAddToCart={handleAddToCart} onCustomizeClick={openCustomizePage} />
        </main>
      ) : currentPage === '3d-cakes' ? (
        <main className="w-full flex-1">
          <ThreeDCakesPage currentLang={currentLang} onAddToCart={handleAddToCart} onCustomizeClick={openCustomizePage} />
        </main>
      ) : currentPage === 'food-drink-illusion-cakes' ? (
        <main className="w-full flex-1">
          <IllusionCakesPage currentLang={currentLang} onAddToCart={handleAddToCart} onCustomizeClick={openCustomizePage} />
        </main>
      ) : currentPage === 'doughnuts-cakes' ? (
        <main className="w-full flex-1">
          <DoughnutsCakesPage currentLang={currentLang} onAddToCart={handleAddToCart} onCustomizeClick={openCustomizePage} />
        </main>
      ) : currentPage === 'photo-on-cake' ? (
        <main className="w-full flex-1">
          <PhotoOnCakePage currentLang={currentLang} onAddToCart={handleAddToCart} onCustomizeClick={openCustomizePage} />
        </main>
      ) : currentPage === 'pet-animals-cakes' ? (
        <main className="w-full flex-1">
          <PetAnimalsCakesPage currentLang={currentLang} onAddToCart={handleAddToCart} onCustomizeClick={openCustomizePage} />
        </main>
      ) : currentPage === 'superhero-cakes' ? (
        <main className="w-full flex-1">
          <SuperheroCakesPage currentLang={currentLang} onAddToCart={handleAddToCart} onCustomizeClick={openCustomizePage} />
        </main>
      ) : currentPage === 'labubu-cakes' ? (
        <main className="w-full flex-1">
          <LabubuCakesPage currentLang={currentLang} onAddToCart={handleAddToCart} onCustomizeClick={openCustomizePage} />
        </main>
      ) : currentPage === 'cake-baking-decorating' ? (
        <main className="w-full flex-1">
          <BakingDecoratingPage currentLang={currentLang} onAddToCart={handleAddToCart} onCustomizeClick={openCustomizePage} />
        </main>
      ) : currentPage === 'product-detail' ? (
        <main className="w-full flex-1">
          <ProductDetailsPage
            productId={selectedProductId}
            currentLang={currentLang}
            onAddToCart={handleAddToCart}
            onCustomizeClick={openCustomizePage}
            onNavigate={handleCategoryNavigation}
          />
        </main>
      ) : (
        <main className="w-full flex-1">
          {/* 4. Level 4: Homepage Hero Section (Height 380-450px on desktop, original photography, slider transition) */}
          <BannerSection currentLang={currentLang} />
          
          {/* 5. Cake Categories Section (Matching style of reference image with empty image slots) */}
          <CakeCategoriesSection 
            currentLang={currentLang}
            onSelectCategory={handleCategoryNavigation}
            onCustomizeClick={openCustomizePage}
          />

          {/* 6. Bestsellers Section (Our Favorites - 4 Featured Showcase Cards) */}
          <BestsellersSection
            currentLang={currentLang}
            onAddToCart={handleAddToCart}
            onCustomizeClick={openCustomizePage}
          />

          {/* 7. Best Cakes in Dubai Section (Signature Dubai Showcase, Trust Pillars & Refrigerated Delivery) */}
          <BestCakesInDubaiSection
            currentLang={currentLang}
            onAddToCart={handleAddToCart}
            onCustomizeClick={openCustomizePage}
          />

          {/* 8. Chef Saad Heritage Story Section (Strawberry Cream Cake Close-Up Background) */}
          <ChefStorySection currentLang={currentLang} />

          {/* 9. Client Stories & Reviews Section */}
          <ReviewsSection currentLang={currentLang} />
        </main>
      )}

      {/* 10. Luxury Bakery Footer Section */}
      <FooterSection 
        currentLang={currentLang} 
        onCustomizeClick={openCustomizePage}
        onOpenHelp={() => setIsHelpOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        onSelectCategory={handleCategoryNavigation}
      />

      {/* Cake Customization Modal (Preserved existing builder functionality) */}
      <CustomizeCakeModal
        isOpen={isCustomizeOpen}
        onClose={() => setIsCustomizeOpen(false)}
        onAddToCart={handleAddToCart}
        currentLang={currentLang}
      />

      {/* Help Center Concierge Modal */}
      {isHelpOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#FFF9F0] rounded-2xl max-w-md w-full p-6 border border-[#F5EBDD] shadow-2xl relative text-[#4A2116]">
            <button 
              onClick={() => setIsHelpOpen(false)}
              className="absolute top-4 right-4 rtl:right-auto rtl:left-4 text-[#8C6D62] hover:text-[#4A2116] p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#F8F1E6] border border-[#E6C783] flex items-center justify-center text-[#C58A19]">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-[#4A2116]">
                  {t.helpModalTitle}
                </h3>
                <p className="text-xs text-[#C58A19] font-medium">
                  {isAr ? 'الخدمة الفاخرة للاستفسارات والطلبات' : 'Luxury Cake Concierge & Orders'}
                </p>
              </div>
            </div>
            <p className="text-xs text-[#7D5B50] leading-relaxed mb-6">
              {t.helpModalDesc}
            </p>
            <div className="space-y-2.5 text-xs">
              <a 
                href="tel:+971506063631" 
                className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#F5EBDD] hover:border-[#C58A19] transition-colors font-medium"
              >
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#C58A19]" />
                  <span>+971 506063631</span>
                </div>
                <span className="text-[#C58A19] font-semibold">{t.callUs}</span>
              </a>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-white border border-[#F5EBDD] text-[#7D5B50]">
                <Clock className="w-4 h-4 text-[#C58A19]" />
                <span>{isAr ? 'مفتوح يومياً: 8:00 صباحاً – 11:00 مساءً' : 'Open Daily: 8:00 AM – 11:00 PM'}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Account Info Modal */}
      {isAccountOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#FFF9F0] rounded-2xl max-w-sm w-full p-6 border border-[#F5EBDD] shadow-2xl relative text-[#4A2116]">
            <button 
              onClick={() => setIsAccountOpen(false)}
              className="absolute top-4 right-4 rtl:right-auto rtl:left-4 text-[#8C6D62] hover:text-[#4A2116] p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="text-center py-2">
              <div className="w-12 h-12 rounded-full bg-[#F8F1E6] border border-[#E6C783] flex items-center justify-center text-[#C58A19] mx-auto mb-3">
                <UserRound className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#4A2116] mb-1">
                {isAr ? 'حساب العميل' : 'Client Account'}
              </h3>
              <p className="text-xs text-[#7D5B50] mb-5">
                {isAr ? 'سجل دخولك لتتبع طلبات الكيك المخصصة وحفظ تصاميمك' : 'Sign in to track custom cake orders and view saved celebration designs.'}
              </p>
              <div className="space-y-2.5">
                <button 
                  onClick={() => {
                    setIsAccountOpen(false);
                    openMyOrdersPage();
                  }}
                  className="w-full bg-[#4A2116] hover:bg-[#C58A19] text-white py-2.5 rounded-[20px] text-xs font-semibold shadow transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <Package className="w-4 h-4 text-[#E6C783]" />
                  <span>{isAr ? 'طلباتي ومتابعة التوصيل' : 'My Orders & Live Tracking'}</span>
                </button>

                <button 
                  onClick={() => {
                    setIsAccountOpen(false);
                    setToastMessage(isAr ? 'أهلاً بك في حسابك' : 'Welcome back!');
                  }}
                  className="w-full bg-[#FAF5ED] hover:bg-[#F2E5D5] text-[#4A2116] border border-[#EBDCC8] py-2.5 rounded-[20px] text-xs font-semibold transition-colors cursor-pointer"
                >
                  {isAr ? 'تسجيل الدخول / إنشاء حساب' : 'Sign In / Register'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bag / Cart Drawer Modal */}
      {isBagOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#FFF9F0] rounded-2xl max-w-sm w-full p-6 border border-[#F5EBDD] shadow-2xl relative text-[#4A2116]">
            <button 
              onClick={() => setIsBagOpen(false)}
              className="absolute top-4 right-4 rtl:right-auto rtl:left-4 text-[#8C6D62] hover:text-[#4A2116] p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="text-center py-2">
              <div className="w-12 h-12 rounded-full bg-[#F8F1E6] border border-[#E6C783] flex items-center justify-center text-[#C58A19] mx-auto mb-3">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#4A2116] mb-1">
                {isAr ? 'حقيبة المشتريات' : 'Your Shopping Bag'}
              </h3>
              <p className="text-xs text-[#7D5B50] mb-4">
                {cartItems.length === 0
                  ? (isAr ? 'حقيبة التسوق فارغة حالياً' : 'Your bag is currently empty.')
                  : (isAr ? `لديك ${cartCount} عناصر في حقيبتك` : `You currently have ${cartCount} handcrafted items in your bag.`)}
              </p>
              {cartItems.length > 0 && (
                <div className="max-h-48 overflow-y-auto space-y-2 mb-4 text-left rtl:text-right">
                  {cartItems.slice(0, 3).map((item, idx) => (
                    <div key={item.id || idx} className="bg-white p-2.5 rounded-xl border border-[#F5EBDD] text-xs">
                      <div className="font-semibold text-[#4A2116] flex justify-between">
                        <span className="truncate max-w-[170px]">{isAr ? (item.title_ar || item.title) : item.title}</span>
                        <span className="text-[#72251F] shrink-0">AED {item.price * (item.quantity || 1)}</span>
                      </div>
                      <div className="text-[10px] text-[#8C6D62] truncate">
                        {[item.quantity ? `${item.quantity}x` : null, item.flavor, item.servings].filter(Boolean).join(' • ')}
                      </div>
                    </div>
                  ))}
                  {cartItems.length > 3 && (
                    <p className="text-[11px] text-[#C58A19] text-center font-medium">
                      +{cartItems.length - 3} {isAr ? 'أصناف أخرى' : 'more items'}
                    </p>
                  )}
                </div>
              )}
              <button 
                onClick={() => {
                  setIsBagOpen(false);
                  openCartPage();
                }}
                className="w-full bg-[#4A2116] hover:bg-[#C58A19] text-white py-2.5 rounded-[20px] text-xs font-semibold shadow transition-colors cursor-pointer mb-2"
              >
                {isAr ? 'عرض صفحة حقيبة التسوق الكاملة' : 'View Full Shopping Bag'}
              </button>
              <button 
                onClick={() => {
                  setIsBagOpen(false);
                  setIsCustomizeOpen(true);
                }}
                className="w-full bg-[#FAF5ED] hover:bg-[#F2E5D5] text-[#7A5846] py-2 rounded-[20px] text-xs font-semibold border border-[#EBDCC8] transition-colors cursor-pointer"
              >
                {isAr ? 'إضافة تصميم كيك آخر' : 'Customize Another Cake'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
