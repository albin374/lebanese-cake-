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
import { translations } from './translations';
import { Phone, Mail, Clock, X, Check, ShoppingBag, UserRound } from 'lucide-react';

export default function App() {
  const [currentLang, setCurrentLang] = useState('en');
  const [activeCategory, setActiveCategory] = useState('all-cakes');
  const [cartCount, setCartCount] = useState(2);
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

  const handleAddToCart = (item) => {
    setCartCount((prev) => prev + 1);
    const itemName = item.title || item.occasion || 'Cake';
    const detail = item.price ? `${item.price} AED` : item.flavor ? `(${item.flavor})` : '';
    setToastMessage(
      isAr 
        ? `تمت إضافة "${itemName}" إلى حقيبتك بنجاح!` 
        : `Added "${itemName}" to your bag!`
    );
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className={`min-h-screen bg-[#FFF9F0] text-[#4A2116] flex flex-col font-sans selection:bg-[#C58A19] selection:text-white ${isAr ? 'font-arabic' : 'font-poppins'}`}>
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 rtl:right-auto rtl:left-6 z-50 bg-[#4A2116] text-[#FFF9F0] px-5 py-3 rounded-xl shadow-2xl border border-[#C58A19] flex items-center gap-3 animate-fadeIn">
          <div className="w-6 h-6 rounded-full bg-[#C58A19] flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-xs sm:text-sm font-medium">{toastMessage}</span>
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
        onOpenAccount={() => setIsAccountOpen(true)}
        onOpenBag={() => setIsBagOpen(true)}
      />

      {/* 3. Level 3: Category Navigation Bar (Height ~48-52px, #FFFFFF, border-y #F5EBDD, Poppins, 14-15px, Hover gold underline, Dropdowns, Customize Cake Button in #C58A19) */}
      <Navbar 
        currentLang={currentLang}
        activeCategory={activeCategory}
        onSelectCategory={(id) => setActiveCategory(id)}
        onCustomizeClick={() => setIsCustomizeOpen(true)}
      />

      {/* 4. Level 4: Homepage Hero Section (Height 380-450px on desktop, original photography, slider transition) */}
      <main className="w-full flex-1">
        <BannerSection currentLang={currentLang} />
        
        {/* 5. Cake Categories Section (Matching style of reference image with empty image slots) */}
        <CakeCategoriesSection 
          currentLang={currentLang}
          onSelectCategory={(id) => setActiveCategory(id)}
          onCustomizeClick={() => setIsCustomizeOpen(true)}
        />

        {/* 6. Bestsellers Section (Our Favorites - 4 Featured Showcase Cards) */}
        <BestsellersSection
          currentLang={currentLang}
          onAddToCart={handleAddToCart}
          onCustomizeClick={() => setIsCustomizeOpen(true)}
        />

        {/* 7. Best Cakes in Dubai Section (Signature Dubai Showcase, Trust Pillars & Refrigerated Delivery) */}
        <BestCakesInDubaiSection
          currentLang={currentLang}
          onAddToCart={handleAddToCart}
          onCustomizeClick={() => setIsCustomizeOpen(true)}
        />

        {/* 8. Chef Saad Heritage Story Section (Strawberry Cream Cake Close-Up Background) */}
        <ChefStorySection currentLang={currentLang} />

        {/* 9. Client Stories & Reviews Section */}
        <ReviewsSection currentLang={currentLang} />
      </main>

      {/* 10. Luxury Bakery Footer Section */}
      <FooterSection 
        currentLang={currentLang} 
        onCustomizeClick={() => setIsCustomizeOpen(true)}
        onOpenHelp={() => setIsHelpOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
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
              <button 
                onClick={() => {
                  setIsAccountOpen(false);
                  setToastMessage(isAr ? 'أهلاً بك في حسابك' : 'Welcome back!');
                }}
                className="w-full bg-[#C58A19] hover:bg-[#4A2116] text-white py-2.5 rounded-[20px] text-xs font-semibold shadow transition-colors cursor-pointer"
              >
                {isAr ? 'تسجيل الدخول / إنشاء حساب' : 'Sign In / Register'}
              </button>
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
                {isAr ? `لديك ${cartCount} عناصر في حقيبتك` : `You currently have ${cartCount} handcrafted items in your bag.`}
              </p>
              <div className="bg-white p-3 rounded-xl border border-[#F5EBDD] text-left rtl:text-right text-xs mb-5 space-y-1">
                <div className="font-semibold text-[#4A2116] flex justify-between">
                  <span>{isAr ? 'كيك الكراميل المقطر الفاخر' : 'Signature Caramel Drip Cake'}</span>
                  <span className="text-[#72251F]">AED 290</span>
                </div>
                <div className="text-[11px] text-[#8C6D62]">2kg • Vanilla Bean • 24K Gold Leaf</div>
              </div>
              <button 
                onClick={() => {
                  setIsBagOpen(false);
                  setIsCustomizeOpen(true);
                }}
                className="w-full bg-[#C58A19] hover:bg-[#4A2116] text-white py-2.5 rounded-[20px] text-xs font-semibold shadow transition-colors cursor-pointer"
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
