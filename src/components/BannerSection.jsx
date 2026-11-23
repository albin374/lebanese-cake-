import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { translations } from '../translations';

export default function BannerSection({ currentLang = 'en' }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const t = translations[currentLang] || translations.en;

  const slides = [
    {
      id: 1,
      image: '/Elegant Golden Berry Dessert Display - Copy.png',
      alt: 'Indulgent Cakes for Every Celebration - Lebanese Dream Bakery LLC',
      titleLine1: t.slides[0].titleLine1,
      titleLine2: t.slides[0].titleLine2,
      subtitleLine1: t.slides[0].subtitleLine1,
      subtitleLine2: t.slides[0].subtitleLine2,
      overlayGradient: 'from-[#201007]/80 via-[#261208]/45 to-transparent',
    },
    {
      id: 2,
      image: '/Luxurious Lebanese Dessert Display.png',
      alt: 'Authentic Lebanese Sweets and Confectionery - Lebanese Dream Bakery LLC',
      titleLine1: t.slides[1].titleLine1,
      titleLine2: t.slides[1].titleLine2,
      subtitleLine1: t.slides[1].subtitleLine1,
      subtitleLine2: t.slides[1].subtitleLine2,
      overlayGradient: 'from-[#200A0E]/85 via-[#2E1015]/50 to-transparent',
    },
  ];

  // Auto-advance slides every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#24130A] select-none group">
      
      {/* Balanced Luxury Banner Height */}
      <div className="relative w-full h-[400px] sm:h-[470px] md:h-[520px] lg:h-[560px] xl:h-[590px]">
        
        {/* Slides Crossfade Images (Preserving realistic photography & cake details) */}
        {slides.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <img 
                src={slide.image} 
                alt={slide.alt} 
                className="w-full h-full object-cover object-right sm:object-[center_35%] transform scale-100 transition-transform duration-[8000ms] ease-out group-hover:scale-102"
              />

              {/* Contrast Vignette for Left/Right Typography */}
              <div 
                className={`absolute inset-0 ${
                  currentLang === 'ar'
                    ? 'bg-gradient-to-l from-[#201007]/90 via-[#261208]/50 to-transparent right-0'
                    : 'bg-gradient-to-r from-[#201007]/90 via-[#261208]/50 to-transparent left-0'
                } w-full sm:w-[65%] pointer-events-none`} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#201007]/50 via-transparent to-transparent pointer-events-none sm:hidden" />
            </div>
          );
        })}

        {/* Foreground Left-Aligned Typographic Overlay */}
        <div className="absolute inset-0 z-20 flex items-center pointer-events-none">
          <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 flex">
            
            {/* Left-Aligned Text Content Group */}
            <div className="w-full sm:w-[56%] md:w-[50%] lg:w-[46%] flex flex-col items-start text-left rtl:items-end rtl:text-right py-6 sm:py-8">
              
              {/* Refined Gold Category Tag */}
              <div className="inline-flex items-center gap-2.5 mb-3 sm:mb-4">
                <span className="h-[1px] w-6 sm:w-8 bg-[#C58A19] rtl:order-2" />
                <span className="font-poppins text-xs sm:text-[13px] font-semibold tracking-[0.2em] uppercase text-[#E6C783]">
                  {currentLang === 'ar' ? 'حلويات وكيك فاخر' : 'Luxury Celebration Cakes'}
                </span>
              </div>

              {/* Luxury Upright Headline in Playfair Display (Non-italic) */}
              <h1 className={`font-serif not-italic font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-[52px] xl:text-[56px] leading-[1.12] text-[#FFF9F0] tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)] ${
                currentLang === 'ar' ? 'font-arabic font-bold text-3xl sm:text-4xl md:text-5xl' : ''
              }`}>
                <span className="block">{slides[currentSlide].titleLine1}</span>
                <span className="block mt-1 sm:mt-1.5 text-[#E6C783]">
                  {slides[currentSlide].titleLine2}
                </span>
              </h1>

              {/* Redesigned Elegant Description */}
              <p className="font-poppins text-xs sm:text-sm md:text-[15px] lg:text-base text-[#F5EBDD] font-light leading-relaxed max-w-md sm:max-w-lg tracking-wide mt-4 sm:mt-5 drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)] border-l-2 border-[#C58A19]/80 pl-3.5 rtl:border-l-0 rtl:border-r-2 rtl:pr-3.5">
                {slides[currentSlide].subtitleLine1}
                <span className="block mt-0.5">{slides[currentSlide].subtitleLine2}</span>
              </p>

            </div>

          </div>
        </div>

        {/* Previous Slide Navigation Arrow Button */}
        <button
          type="button"
          onClick={prevSlide}
          className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/40 hover:bg-[#C58A19] text-white/90 hover:text-white flex items-center justify-center backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 cursor-pointer shadow-md"
          title="Previous Banner"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Next Slide Navigation Arrow Button */}
        <button
          type="button"
          onClick={nextSlide}
          className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/40 hover:bg-[#C58A19] text-white/90 hover:text-white flex items-center justify-center backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 cursor-pointer shadow-md"
          title="Next Banner"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Bottom Pagination Dots */}
        <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentSlide(idx)}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                idx === currentSlide
                  ? 'w-6 sm:w-7 h-1.5 bg-[#C58A19] shadow-sm'
                  : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/80'
              }`}
              title={`Go to Slide ${idx + 1}`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>

    </section>
  );
}
