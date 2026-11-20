import React from 'react';

export default function CupcakesPage({ currentLang = 'en' }) {
  const isAr = currentLang === 'ar';

  const bannerImage = '/Colorful Cupcakes on a Wooden Table.png';

  const title = isAr ? 'أفضل كب كيك في دبي' : 'Best Cupcakes in Dubai';
  
  const description = isAr
    ? 'استمتع بتشكيلة الكب كيك الحرفية الفاخرة، المخبوزة طازجة يومياً بأفخر أنواع الشوكولاتة البلجيكية، كريمة الزبدة الفرنسية الحريرية وفانيليا مدغشقر. كل قطعة كب كيك هي تحفة فنية مصغرة مصممة خصيصاً لتناسب مناسباتك السعيدة وحفلاتك الخاصة بأشهى النكهات.'
    : 'Delight in our handcrafted artisanal cupcakes, freshly baked daily using pure Belgian chocolate, silky French buttercream, and Madagascar vanilla. Each cupcake is a miniature work of art, custom designed to match your celebration themes, weddings, and joyful gatherings. Handcrafted with love to bring sweetness to every moment.';

  return (
    <div className={`w-full flex flex-col ${isAr ? 'font-arabic' : 'font-poppins'}`}>
      
      {/* Hero Banner Section */}
      <section className="relative w-full overflow-hidden bg-[#24130A] select-none">
        
        {/* Banner Container matching exact natural image aspect ratio (2172 x 724) */}
        <div className="relative w-full aspect-[2172/724] min-h-[260px] sm:min-h-[300px] md:min-h-[340px] flex items-center">
          
          {/* Banner Photography Background */}
          <div className="absolute inset-0 z-0">
            <img 
              src={bannerImage} 
              alt={title}
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

          {/* Foreground Text & Description Content Only */}
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-4 sm:py-6 md:py-8 lg:py-10">
            <div className="w-full sm:w-[70%] md:w-[62%] lg:w-[56%] flex flex-col items-start text-left rtl:items-end rtl:text-right">
              
              {/* Banner Headline */}
              <h1 className="font-serif not-italic font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[44px] leading-[1.15] text-[#FFF9F0] tracking-tight drop-shadow-[0_3px_14px_rgba(0,0,0,0.85)] mb-2 sm:mb-3">
                {title}
              </h1>

              {/* Banner Description */}
              <p className="font-poppins text-xs sm:text-[13px] md:text-sm lg:text-[15px] text-[#F5ECE0] leading-relaxed font-normal max-w-xl drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)]">
                {description}
              </p>

            </div>
          </div>

        </div>

      </section>

    </div>
  );
}
