import React from 'react';
import { translations } from '../translations';

export default function ChefStorySection({ currentLang = 'en' }) {
  const t = translations[currentLang] || translations.en;
  const isAr = currentLang === 'ar';

  return (
    <section 
      id="chef-story-section" 
      className="relative w-full overflow-hidden bg-[#FAF4EC] border-t border-[#F5EBDD] min-h-[460px] sm:min-h-[520px] lg:min-h-[580px] flex items-center transition-colors"
    >
      {/* Background Photography (Strawberry Cream Cake Close-Up) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none">
        <img 
          src="/Strawberry Cream Cake Close-Up.png" 
          alt="Lebanese Dream Bakery Strawberry Cream Cake"
          className="w-full h-full object-cover object-right rtl:object-left rtl:scale-x-[-1] transition-transform duration-700"
          loading="lazy"
        />

        {/* Soft, Seamless Gradient Overlay for Flawless Readability */}
        {/* On desktop: gentle fade from warm cream on the text side to transparent where the cake is */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FFFDF9]/95 via-[#FFFDF9]/85 via-40% md:via-45% to-transparent rtl:bg-gradient-to-l rtl:from-[#FFFDF9]/95 rtl:via-[#FFFDF9]/85 rtl:via-40% md:rtl:via-45% rtl:to-transparent" />
        
        {/* Extra soft mobile overlay so text remains 100% legible on small screens */}
        <div className="absolute inset-0 bg-[#FFFDF9]/50 md:hidden" />
      </div>

      {/* Content Container */}
      <div className="max-w-7xl mx-auto w-full px-5 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-20 relative z-10">
        <div className="max-w-2xl flex flex-col items-start rtl:items-start text-left rtl:text-right">
          
          {/* Circular Heritage Logo Emblem */}
          <div className="mb-4 sm:mb-5">
            <img 
              src="/Lebanese Dream Bakery Logo2.png" 
              alt={t.chefStoryEmblemAlt || 'Lebanese Dream Bakery - Est. 2020'}
              className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-contain drop-shadow-sm select-none"
            />
          </div>

          {/* Unified One-Line Heading: Lebanese Dream Bakery by Chef Saad */}
          <h2 className="flex flex-wrap items-baseline gap-x-2.5 sm:gap-x-3.5 gap-y-1">
            <span className="font-serif font-bold text-2xl sm:text-3xl lg:text-[40px] text-[#4A2116] tracking-tight leading-tight">
              {t.chefStoryTitle}
            </span>
            <span className="font-serif not-italic font-semibold text-xl sm:text-2xl lg:text-[32px] text-[#C58A19] leading-tight whitespace-normal sm:whitespace-nowrap">
              {t.chefStoryChef}
            </span>
          </h2>

          {/* Golden Horizontal Accent Divider */}
          <div className="w-24 sm:w-32 h-[2.5px] bg-[#C58A19] mt-3 sm:mt-3.5 mb-5 sm:mb-6 rounded-full" />

          {/* Brand & Chef Story Text */}
          <p className="font-poppins text-xs sm:text-sm md:text-[14.5px] text-[#4A2116]/90 leading-relaxed sm:leading-[1.75] font-normal max-w-lg sm:max-w-xl">
            {t.chefStoryText}
          </p>

        </div>
      </div>
    </section>
  );
}
