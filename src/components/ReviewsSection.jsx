import React, { useState } from 'react';
import { Star, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { translations } from '../translations';

export default function ReviewsSection({ currentLang = 'en' }) {
  const t = translations[currentLang] || translations.en;
  const isAr = currentLang === 'ar';
  const reviews = t.reviewsList || [];

  const [slideIndex, setSlideIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const totalSlides = 3;

  const changeSlide = (newIndex) => {
    if (newIndex === slideIndex || isFading) return;
    setIsFading(true);
    setTimeout(() => {
      setSlideIndex(newIndex);
      setIsFading(false);
    }, 140);
  };

  const handlePrev = () => {
    const prev = slideIndex === 0 ? totalSlides - 1 : slideIndex - 1;
    changeSlide(prev);
  };

  const handleNext = () => {
    const next = slideIndex === totalSlides - 1 ? 0 : slideIndex + 1;
    changeSlide(next);
  };

  // Determine which 3 reviews to display for the current slide (9 reviews across 3 slides)
  const getVisibleReviews = () => {
    if (reviews.length <= 3) return reviews;
    const startIndex = (slideIndex * 3) % reviews.length;
    return reviews.slice(startIndex, startIndex + 3);
  };

  const currentCards = getVisibleReviews();

  return (
    <section 
      id="reviews-section" 
      className="relative w-full overflow-hidden bg-[#FAF6F0] border-t border-[#F5EBDD] py-14 sm:py-20 lg:py-24 px-4 sm:px-8 lg:px-12 min-h-[590px] sm:min-h-[640px] lg:min-h-[680px] flex flex-col justify-center transition-colors"
    >
      {/* Background Photography: Fixed and Stable Size across all reviews */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden">
        <img 
          src="/Elegant Dessert Cakes on Ivory Background.png" 
          alt="Elegant Dessert Cakes on Ivory Background"
          className="w-full h-full object-cover object-center select-none"
          loading="eager"
        />
        {/* Soft subtle tint for maximum card and text readability */}
        <div className="absolute inset-0 bg-[#FDFBF7]/30 sm:bg-transparent pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10 min-w-0">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-14 px-2">
          
          {/* Overline with Flanking Gold Lines */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-2.5 sm:mb-3">
            <div className="h-[1px] w-10 sm:w-14 bg-gradient-to-r from-transparent to-[#C58A19]" />
            <span className="font-poppins text-xs sm:text-sm font-medium text-[#C58A19] tracking-wider">
              {t.reviewsOverline}
            </span>
            <div className="h-[1px] w-10 sm:w-14 bg-gradient-to-l from-transparent to-[#C58A19]" />
          </div>

          {/* Main Title: What Our Customers Say (Upright Bold Gold) */}
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] tracking-tight leading-tight mb-2.5 sm:mb-3">
            <span className="font-bold text-[#4A2116]">{t.reviewsTitleLead}</span>
            <span className="font-bold text-[#C58A19]">{t.reviewsTitleHighlight}</span>
            <span className="font-bold text-[#4A2116]">{t.reviewsTitleTrail}</span>
          </h2>

          {/* Subtitle */}
          <p className="font-poppins text-xs sm:text-sm text-[#7D5B50] max-w-xl mx-auto leading-relaxed text-center px-4">
            {t.reviewsSubtitle}
          </p>
        </div>

        {/* Carousel Row with Side Arrow Buttons and 3 Equal-Height Review Cards */}
        <div className="relative flex items-center justify-center gap-3 sm:gap-6">
          
          {/* Left Arrow Button */}
          <button
            onClick={isAr ? handleNext : handlePrev}
            aria-label="Previous Review"
            className="hidden sm:flex w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 backdrop-blur-xs shadow-md border border-[#F5EBDD] items-center justify-center text-[#4A2116] hover:bg-[#FFF9F0] hover:text-[#C58A19] transition-all duration-200 shrink-0 cursor-pointer hover:scale-105 active:scale-95"
          >
            <ChevronLeft className="w-5 h-5 rtl:rotate-180 text-[#4A2116]" />
          </button>

          {/* 3 Review Cards Container with Fixed Equal Height */}
          <div className={`w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7 transition-opacity duration-200 ${isFading ? 'opacity-30' : 'opacity-100'}`}>
            {currentCards.map((review, idx) => (
              <div
                key={`${review.id}-${idx}`}
                className="bg-white/95 backdrop-blur-xs rounded-2xl sm:rounded-[24px] p-6 sm:p-7 shadow-lg shadow-black/[0.04] border border-[#F5EBDD] flex flex-col justify-between h-[235px] sm:h-[245px] md:h-[255px] transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative group"
              >
                <div className="flex flex-col h-full justify-between">
                  {/* Card Header: Avatar + Name + Verified Badge on Left, Double Quotes on Right */}
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="flex items-center gap-3">
                      {/* Avatar Circle */}
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#F5ECE3] flex items-center justify-center text-[#4A2116] font-serif font-bold text-base sm:text-lg shrink-0 shadow-xs select-none">
                        {review.avatarInitial}
                      </div>

                      {/* Name & Verified Badge */}
                      <div className="min-w-0">
                        <h3 className="font-serif font-bold text-sm sm:text-base text-[#4A2116] leading-tight truncate">
                          {review.name}
                        </h3>
                        <div className="flex items-center gap-1.5 text-[11px] sm:text-[11.5px] text-[#A07028] font-medium mt-0.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C58A19] shrink-0" />
                          <span>{t.verifiedCustomerBadge}</span>
                        </div>
                      </div>
                    </div>

                    {/* Quotation Mark Icon */}
                    <div className="text-[#E2CEBC] font-serif font-bold text-3xl sm:text-4xl leading-none select-none pr-1 rtl:pr-0 rtl:pl-1">
                      ”
                    </div>
                  </div>

                  {/* 5 Gold Stars */}
                  <div className="flex items-center gap-1 text-[#F5A623] mb-3">
                    {[...Array(review.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#F5A623] text-[#F5A623]" />
                    ))}
                  </div>

                  {/* Review Text - Locked min-height to guarantee ZERO container resize */}
                  <p className="font-poppins text-xs sm:text-[13.5px] text-[#4A2116] leading-relaxed font-normal flex-1 flex items-start overflow-hidden line-clamp-4">
                    {review.comment}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={isAr ? handlePrev : handleNext}
            aria-label="Next Review"
            className="hidden sm:flex w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 backdrop-blur-xs shadow-md border border-[#F5EBDD] items-center justify-center text-[#4A2116] hover:bg-[#FFF9F0] hover:text-[#C58A19] transition-all duration-200 shrink-0 cursor-pointer hover:scale-105 active:scale-95"
          >
            <ChevronRight className="w-5 h-5 rtl:rotate-180 text-[#4A2116]" />
          </button>
        </div>

        {/* Mobile Navigation Arrows (Visible below cards on mobile screens) */}
        <div className="flex sm:hidden items-center justify-center gap-4 mt-6">
          <button
            onClick={isAr ? handleNext : handlePrev}
            aria-label="Previous Review"
            className="w-10 h-10 rounded-full bg-white shadow-md border border-[#F5EBDD] flex items-center justify-center text-[#4A2116] cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 rtl:rotate-180 text-[#4A2116]" />
          </button>
          <button
            onClick={isAr ? handlePrev : handleNext}
            aria-label="Next Review"
            className="w-10 h-10 rounded-full bg-white shadow-md border border-[#F5EBDD] flex items-center justify-center text-[#4A2116] cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 rtl:rotate-180 text-[#4A2116]" />
          </button>
        </div>

        {/* 3 Centered Dot Indicators */}
        <div className="flex items-center justify-center gap-2.5 mt-7 sm:mt-10">
          {[...Array(totalSlides)].map((_, i) => (
            <button
              key={i}
              onClick={() => changeSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                slideIndex === i
                  ? 'w-3 h-3 bg-[#C58A19] scale-110 shadow-xs'
                  : 'w-2.5 h-2.5 bg-[#C58A19]/35 hover:bg-[#C58A19]/60'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
