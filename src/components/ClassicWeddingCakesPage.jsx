import React from 'react';

export default function ClassicWeddingCakesPage({ currentLang = 'en' }) {
  const isAr = currentLang === 'ar';

  const bannerImage = '/Elegant Ivory Wedding Cake Banner.png';

  const titleLine1 = isAr ? 'كيك الأعراس الكلاسيكي' : 'Classic Wedding Cakes';
  const titleLine2 = isAr ? 'في دبي' : 'in Dubai';
  
  const description = isAr
    ? 'تحف كيك زفاف كلاسيكية متعددة الطبقات مصممة بعجينة السكر العاجية الفاخرة، وحبات اللؤلؤ السكرية المتقنة، وتفاصيل الزهور الملكية.'
    : 'Timeless multi-tiered wedding centerpieces crafted with pristine ivory fondant, handcrafted sugar pearls, and delicate floral artistry.';

  return (
    <div className={`w-full flex flex-col ${isAr ? 'font-arabic' : 'font-poppins'}`}>
      
      {/* Hero Banner Section */}
      <section className="relative w-full overflow-hidden bg-[#24130A] select-none">
        
        {/* Banner Container matching exact natural image aspect ratio (2172 x 724) */}
        <div className="relative w-full aspect-[2172/724] min-h-[240px] sm:min-h-[280px] md:min-h-[320px] flex items-center">
          
          {/* Banner Photography Background */}
          <div className="absolute inset-0 z-0">
            <img 
              src={bannerImage} 
              alt={`${titleLine1} ${titleLine2}`}
              className="w-full h-full object-cover object-center"
            />

            {/* Dark Chocolate & Gold Luxury Contrast Gradients */}
            <div 
              className={`absolute inset-0 ${
                isAr
                  ? 'bg-gradient-to-l from-[#201007]/95 via-[#261208]/85 to-[#201007]/35 sm:to-transparent right-0'
                  : 'bg-gradient-to-r from-[#201007]/95 via-[#261208]/85 to-[#201007]/35 sm:to-transparent left-0'
              } w-full sm:w-[72%] pointer-events-none`} 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#201007]/85 via-transparent to-[#201007]/25 pointer-events-none" />
          </div>

          {/* Foreground Left-Aligned Typographic Overlay matching Homepage Hero */}
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-4 sm:py-6 md:py-8 lg:py-10 flex">
            <div className="w-full sm:w-[65%] md:w-[58%] lg:w-[52%] flex flex-col items-start text-left rtl:items-end rtl:text-right">
              
              {/* Luxury Upright Headline in Playfair Display (One Line) */}
              <h1 className={`font-serif not-italic font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-[42px] leading-tight text-[#FFF9F0] tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)] ${
                isAr ? 'font-arabic font-bold text-2xl sm:text-3xl md:text-4xl' : ''
              }`}>
                <span>{titleLine1} </span>
                <span className="text-[#E6C783]">{titleLine2}</span>
              </h1>

              {/* Reduced Elegant Description with Gold Left Border */}
              <p className="font-poppins text-xs sm:text-[13px] md:text-sm lg:text-[14.5px] text-[#F5EBDD] font-light leading-relaxed max-w-md sm:max-w-lg tracking-wide mt-2 sm:mt-3 drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)] border-l-2 border-[#C58A19]/80 pl-3.5 rtl:border-l-0 rtl:border-r-2 rtl:pr-3.5">
                {description}
              </p>

            </div>
          </div>

        </div>

      </section>

    </div>
  );
}
