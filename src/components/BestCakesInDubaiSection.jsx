import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { translations } from '../translations';

export default function BestCakesInDubaiSection({ 
  currentLang = 'en', 
  onAddToCart, 
  onCustomizeClick 
}) {
  const t = translations[currentLang] || translations.en;
  const isAr = currentLang === 'ar';
  const cakes = t.dubaiCakesList || [];

  return (
    <section 
      id="best-cakes-in-dubai" 
      className="py-14 sm:py-20 px-4 sm:px-8 lg:px-12 bg-white border-t border-[#F5EBDD] relative transition-colors"
    >
      <div className="max-w-7xl mx-auto w-full min-w-0">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-14">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-normal text-[#4A2116] tracking-tight">
            {t.bestCakesDubaiTitle}
          </h2>
          <p className="font-poppins text-xs sm:text-sm text-[#8C6D62] mt-2.5 max-w-lg leading-relaxed">
            {t.bestCakesDubaiSubtitle}
          </p>
        </div>

        {/* Dubai Featured Cakes Grid (3 Columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {cakes.map((cake) => (
            <div
              key={cake.id}
              className="bg-white rounded-3xl border border-[#F5EBDD] shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col group"
            >
              {/* Photo Area with Badges */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FFF9F0]">
                <img
                  src={cake.image}
                  alt={cake.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out select-none"
                  loading="lazy"
                />

                {/* Top Badge */}
                <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3 z-10">
                  <span className="bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-semibold text-[#4A2116] border border-[#F5EBDD] shadow-sm">
                    {cake.tag}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#4A2116] group-hover:text-[#C58A19] transition-colors leading-snug">
                    {cake.title}
                  </h3>
                  
                  <p className="text-xs sm:text-[13px] text-[#C58A19] font-medium mt-1">
                    {cake.flavor}
                  </p>
                </div>

                {/* Bottom Price & Action Row */}
                <div className="pt-4 mt-4 border-t border-[#F5EBDD] flex items-center justify-between gap-3">
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-[#8C6D62] font-medium">
                      {isAr ? 'السعر التقديري' : 'Starting from'}
                    </span>
                    <span className="font-serif font-bold text-base sm:text-lg text-[#72251F]">
                      {cake.price} {cake.currency}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (onAddToCart) onAddToCart(cake);
                    }}
                    className="bg-[#C58A19] hover:bg-[#A97415] active:scale-95 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-sm hover:shadow flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap"
                  >
                    <ShoppingCart className="w-3.5 h-3.5 text-white" />
                    <span>{t.addToCart}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
