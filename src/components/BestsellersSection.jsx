import React, { useState } from 'react';
import { ShoppingCart, Sparkles, X, Clock, Users, Scale } from 'lucide-react';
import { translations } from '../translations';

export default function BestsellersSection({ 
  currentLang = 'en', 
  onAddToCart, 
  onCustomizeClick 
}) {
  const t = translations[currentLang] || translations.en;
  const isAr = currentLang === 'ar';

  const [selectedCake, setSelectedCake] = useState(null);

  const handleShopNow = (cake, e) => {
    if (e) e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(cake);
    }
  };

  const handleOpenCustomize = (cake, e) => {
    if (e) e.stopPropagation();
    setSelectedCake(null);
    if (onCustomizeClick) {
      onCustomizeClick(cake);
    }
  };

  return (
    <section 
      id="bestsellers-section" 
      className="pt-6 sm:pt-10 pb-14 sm:pb-20 px-4 sm:px-8 lg:px-12 bg-[#FFF9F0] transition-colors relative"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Header Block */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-14">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-normal text-[#4A2116] tracking-tight">
            {t.bestsellersTitle}
          </h2>
          {t.bestsellersSubtitle && (
            <p className="font-poppins text-xs sm:text-sm text-[#8C6D62] mt-2.5 max-w-lg leading-relaxed">
              {t.bestsellersSubtitle}
            </p>
          )}
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 lg:gap-8">
          {t.bestsellersList.map((cake) => (
            <div 
              key={cake.id} 
              className="group flex flex-col cursor-pointer"
              onClick={() => setSelectedCake(cake)}
            >
              {/* Soft Rounded Card Box */}
              <div className="relative bg-white rounded-[26px] sm:rounded-[28px] overflow-hidden aspect-[1/1.05] flex flex-col items-center justify-center border border-[#F5EBDD] shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">
                
                {/* Price Tag in Top Right Corner */}
                <div className="absolute top-3.5 right-4 sm:top-4 sm:right-5 rtl:right-auto rtl:left-4 sm:rtl:left-5 z-10 pointer-events-none">
                  <span className="bg-white/95 backdrop-blur-md px-3 py-1 rounded-full shadow-sm border border-[#F5EBDD]/70 font-sans font-bold text-xs sm:text-sm text-[#4A2116] tracking-tight">
                    {cake.price} {cake.currency}
                  </span>
                </div>

                {/* Cake Image with Gentle Hover Zoom */}
                <div className="w-full h-full relative overflow-hidden">
                  <img 
                    src={cake.image} 
                    alt={cake.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out select-none"
                    loading="lazy"
                  />
                  {/* Subtle soft gradient at the bottom for button contrast */}
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/30 via-black/10 to-transparent pointer-events-none" />
                </div>

                {/* Shop Now Pill Button */}
                <button
                  type="button"
                  onClick={(e) => handleShopNow(cake, e)}
                  className="absolute bottom-3.5 sm:bottom-4 left-1/2 -translate-x-1/2 z-10 bg-[#FCE5C2] hover:bg-[#F9DCA7] active:scale-95 text-[#4A2116] font-semibold text-xs sm:text-[13px] px-5 py-2 rounded-full shadow-md hover:shadow-lg flex items-center gap-2 transition-all duration-200 cursor-pointer whitespace-nowrap"
                  title={t.shopNow}
                >
                  <ShoppingCart className="w-3.5 h-3.5 text-[#4A2116] stroke-[2.2]" />
                  <span>{t.shopNow}</span>
                </button>
              </div>

              {/* Title & Description below the card box */}
              <div className="mt-3.5 sm:mt-4 text-center px-1 flex-1 flex flex-col items-center">
                <h3 className="font-serif font-bold text-base sm:text-[17px] text-[#4A2116] group-hover:text-[#C58A19] transition-colors leading-snug">
                  {cake.title}
                </h3>
                <p className="font-poppins text-xs sm:text-[13px] text-[#8C6D62] mt-1 sm:mt-1.5 leading-relaxed">
                  {cake.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Quick View Modal */}
      {selectedCake && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
          onClick={() => setSelectedCake(null)}
        >
          <div 
            className="bg-[#FFF9F0] rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-[#F5EBDD] shadow-2xl relative text-[#4A2116] animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={() => setSelectedCake(null)}
              className="absolute top-4 right-4 rtl:right-auto rtl:left-4 text-[#8C6D62] hover:text-[#4A2116] p-1.5 rounded-full hover:bg-black/5 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Cake Image Box */}
            <div className="bg-white rounded-2xl overflow-hidden flex items-center justify-center border border-[#F5EBDD] mb-5 aspect-[4/3]">
              <img 
                src={selectedCake.image} 
                alt={selectedCake.title} 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Cake Details */}
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[11px] font-semibold tracking-wider text-[#C58A19] uppercase">
                    {t.bestsellersTitle}
                  </span>
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#341810]">
                    {selectedCake.title}
                  </h3>
                </div>
                <div className="text-right rtl:text-left shrink-0">
                  <span className="font-serif font-bold text-lg sm:text-xl text-[#72251F]">
                    {selectedCake.price} {selectedCake.currency}
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#7D5B50] leading-relaxed">
                {selectedCake.desc}
              </p>

              {/* Attributes Chips */}
              <div className="grid grid-cols-3 gap-2 pt-2 pb-1">
                <div className="bg-white rounded-xl p-2.5 border border-[#F5EBDD] text-center">
                  <Users className="w-4 h-4 text-[#C58A19] mx-auto mb-1" />
                  <span className="block text-[10px] text-[#8C6D62] font-medium">
                    {isAr ? 'الحصص' : 'Servings'}
                  </span>
                  <span className="block text-xs font-semibold text-[#4A2116]">
                    {selectedCake.servings}
                  </span>
                </div>
                <div className="bg-white rounded-xl p-2.5 border border-[#F5EBDD] text-center">
                  <Scale className="w-4 h-4 text-[#C58A19] mx-auto mb-1" />
                  <span className="block text-[10px] text-[#8C6D62] font-medium">
                    {isAr ? 'الوزن التقريبي' : 'Weight'}
                  </span>
                  <span className="block text-xs font-semibold text-[#4A2116]">
                    {selectedCake.weight}
                  </span>
                </div>
                <div className="bg-white rounded-xl p-2.5 border border-[#F5EBDD] text-center">
                  <Clock className="w-4 h-4 text-[#C58A19] mx-auto mb-1" />
                  <span className="block text-[10px] text-[#8C6D62] font-medium">
                    {isAr ? 'مدة التحضير' : 'Lead Time'}
                  </span>
                  <span className="block text-xs font-semibold text-[#4A2116]">
                    {selectedCake.leadTime}
                  </span>
                </div>
              </div>

              {/* Flavor info */}
              <div className="bg-white/80 p-3 rounded-xl border border-[#F5EBDD] text-xs text-[#6E574B] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C58A19] shrink-0" />
                <span>
                  <strong>{isAr ? 'النكهة الملكية:' : 'Signature Flavor:'}</strong> {selectedCake.flavor}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => {
                    handleShopNow(selectedCake);
                    setSelectedCake(null);
                  }}
                  className="flex-1 bg-[#C58A19] hover:bg-[#A97415] text-white py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold shadow hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingCart className="w-4 h-4 text-white" />
                  <span>{t.addToCart}</span>
                </button>
                <button
                  type="button"
                  onClick={(e) => handleOpenCustomize(selectedCake, e)}
                  className="flex-1 bg-white hover:bg-[#F8F1E6] text-[#4A2116] border border-[#C58A19] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#C58A19]" />
                  <span>{t.customizeThisCake}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
