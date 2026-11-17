import React from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { translations } from '../translations';

export default function CakeCategoriesSection({ currentLang = 'en', onSelectCategory, onCustomizeClick }) {
  const t = translations[currentLang] || translations.en;

  return (
    <section id="cake-categories-section" className="py-14 sm:py-20 px-4 sm:px-8 lg:px-12 bg-[#FFF9F0] border-t border-[#F5EBDD] transition-colors relative">
      <div className="max-w-7xl mx-auto w-full min-w-0">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-14">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-normal text-[#4A2116] tracking-tight">
            {t.categoriesTitle}
          </h2>
          <p className="font-poppins text-xs sm:text-sm text-[#8C6D62] mt-2.5 max-w-lg leading-relaxed">
            {t.categoriesSubtitle}
          </p>
        </div>

        {/* Unified 4-in-a-Row Categories Grid (Using Slider Card Style) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {t.categoriesList.map((category, index) => {
            // Center the final 2 cards on 4-column desktop layout (Columns 2 & 3)
            const isSecondToLast = index === t.categoriesList.length - 2;

            return (
              <div
                key={category.id}
                onClick={() => {
                  if (onSelectCategory) onSelectCategory(category.id);
                  if (onCustomizeClick) onCustomizeClick();
                }}
                className={`bg-white rounded-2xl border border-[#F5EBDD] shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col group cursor-pointer ${
                  isSecondToLast ? 'lg:col-start-2' : ''
                }`}
              >
                {/* Card Image Display */}
                <div className="aspect-[4/3] w-full bg-[#F8F1E6]/40 relative overflow-hidden">
                  {category.image ? (
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    /* Luxury Placeholder Fallback */
                    <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center">
                      <div className="w-12 h-12 rounded-full bg-white/80 border border-[#E6C783] flex items-center justify-center text-[#C58A19] shadow-sm mb-2 group-hover:scale-110 transition-transform duration-200">
                        <ImageIcon className="w-5 h-5 stroke-[1.8]" />
                      </div>
                      <span className="font-poppins text-xs font-medium text-[#8C6D62] tracking-wide">
                        {t.spaceForImage}
                      </span>
                    </div>
                  )}
                </div>

                {/* Category Details */}
                <div className="pt-5 pb-6 px-4 sm:px-5 flex-1 flex flex-col items-center justify-center text-center">
                  <h3 className="font-serif font-bold text-lg sm:text-[19px] text-[#4A2116] group-hover:text-[#C58A19] transition-colors leading-snug">
                    {category.title}
                  </h3>
                  <p className="font-poppins text-xs sm:text-[13px] text-[#8C6D62] mt-2 leading-relaxed line-clamp-2 max-w-[250px]">
                    {category.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
