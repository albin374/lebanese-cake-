import React from 'react';
import { 
  MapPin, 
  Mail, 
  Phone
} from 'lucide-react';
import { translations } from '../translations';

export default function FooterSection({ 
  currentLang = 'en', 
  onCustomizeClick,
  onOpenHelp,
  onSelectCategory
}) {
  const t = translations[currentLang] || translations.en;
  const isAr = currentLang === 'ar';

  const handleCategoryClick = (categoryId) => {
    if (onSelectCategory) {
      onSelectCategory(categoryId);
    }
    const el = document.getElementById('cake-categories-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 400, behavior: 'smooth' });
    }
  };

  return (
    <footer 
      id="main-footer" 
      className="bg-white text-[#4A2116] border-t border-[#F5EBDD] pt-12 sm:pt-14 lg:pt-16 pb-8 sm:pb-10 px-4 sm:px-8 lg:px-12 transition-colors relative w-full max-w-full overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full min-w-0">
        
        {/* 4 Columns Grid with Thin Gold Dividers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-0 w-full">
          
          {/* Column 1: Logo, Location, Phone & Email (4 Columns on LG) */}
          <div className="lg:col-span-4 lg:pr-8 lg:rtl:pr-0 lg:rtl:pl-8 lg:border-r lg:rtl:border-r-0 lg:rtl:border-l border-[#E5C583]/60 flex flex-col justify-start">
            
            {/* Circular Heritage Logo Emblem */}
            <div className="mb-4">
              <img 
                src="/Lebanese Dream Bakery Logo2.png" 
                alt="Lebanese Dream Bakery LLC" 
                className="w-22 h-22 sm:w-24 sm:h-24 object-contain select-none"
              />
            </div>

            {/* Single Official Location: Dubai Mirdif */}
            <div className="flex items-start gap-2.5 text-xs sm:text-[13px] text-[#4A2116]/85 leading-relaxed mb-3">
              <MapPin className="w-4 h-4 text-[#C58A19] shrink-0 mt-0.5" />
              <span>{t.footerLocation}</span>
            </div>

            {/* Single Official Phone */}
            <div className="flex items-center gap-2.5 text-xs sm:text-[13px] text-[#4A2116]/85 mb-3">
              <Phone className="w-4 h-4 text-[#C58A19] shrink-0" />
              <a 
                href={`tel:${t.footerPhone.replace(/\s+/g, '')}`} 
                dir="ltr"
                className="hover:text-[#C58A19] transition-colors font-semibold tracking-wide"
              >
                {t.footerPhone}
              </a>
            </div>

            {/* Official Lebanese Cake Email */}
            <div className="flex items-center gap-2.5 text-xs sm:text-[13px] text-[#4A2116]/85">
              <Mail className="w-4 h-4 text-[#C58A19] shrink-0" />
              <a 
                href={`mailto:${t.footerEmail}`} 
                className="hover:text-[#C58A19] transition-colors"
              >
                {t.footerEmail}
              </a>
            </div>

          </div>

          {/* Column 2: Navigation Menu Bar (Actual Navbar Menu Items) (3 Columns on LG) */}
          <div className="lg:col-span-3 lg:px-8 lg:border-r lg:rtl:border-r-0 lg:rtl:border-l border-[#E5C583]/60 flex flex-col justify-start">
            <h3 className="font-serif font-bold text-base sm:text-[17px] text-[#4A2116] tracking-tight">
              {t.footerNavigationTitle}
            </h3>
            <div className="w-10 h-[2px] bg-[#C58A19] mt-1.5 mb-3.5 rounded-full" />

            <ul className="space-y-2 sm:space-y-2.5 font-poppins text-xs sm:text-[13px] text-[#4A2116]">
              {t.footerNavLinks.map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => handleCategoryClick(link.id)}
                    className="flex items-center gap-2 hover:text-[#C58A19] transition-colors group cursor-pointer text-left rtl:text-right py-0.5"
                  >
                    <span className="text-[#C58A19] font-bold text-[11px] select-none group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform">
                      &gt;
                    </span>
                    <span>{link.text}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Customization Services (2.5 Columns on LG) */}
          <div className="lg:col-span-3 lg:px-8 lg:border-r lg:rtl:border-r-0 lg:rtl:border-l border-[#E5C583]/60 flex flex-col justify-start">
            <h3 className="font-serif font-bold text-base sm:text-[17px] text-[#4A2116] tracking-tight">
              {t.footerCustomizationTitle}
            </h3>
            <div className="w-10 h-[2px] bg-[#C58A19] mt-1.5 mb-3.5 rounded-full" />

            <div className="space-y-4 font-poppins">
              {/* Service 1: Design your own cake */}
              <button
                onClick={onCustomizeClick}
                className="flex items-center gap-3.5 hover:text-[#C58A19] transition-colors group cursor-pointer text-left rtl:text-right"
              >
                {/* Golden Line-Art Cake Icon with 3 Candles */}
                <div className="w-10 h-10 rounded-lg bg-[#FFF9F0] border border-[#E5C583]/60 flex items-center justify-center shrink-0 text-[#C58A19] group-hover:scale-105 transition-transform">
                  <svg className="w-5 h-5 stroke-[#C58A19]" viewBox="0 0 24 24" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8" />
                    <path d="M4 16s2-1 4-1 4 1 4 1 2-1 4-1 4 1 4 1" />
                    <path d="M2 21h20" />
                    <path d="M7 8v3" />
                    <path d="M12 8v3" />
                    <path d="M17 8v3" />
                    <circle cx="7" cy="4" r="0.5" fill="#C58A19" />
                    <circle cx="12" cy="4" r="0.5" fill="#C58A19" />
                    <circle cx="17" cy="4" r="0.5" fill="#C58A19" />
                  </svg>
                </div>
                <span className="text-xs sm:text-[13px] font-medium text-[#4A2116] group-hover:text-[#C58A19] transition-colors">
                  {t.footerDesignYourCake}
                </span>
              </button>

              {/* Service 2: Consultation and tasting */}
              <button
                onClick={onOpenHelp}
                className="flex items-center gap-3.5 hover:text-[#C58A19] transition-colors group cursor-pointer text-left rtl:text-right"
              >
                {/* Golden Line-Art Chef Hat Icon */}
                <div className="w-10 h-10 rounded-lg bg-[#FFF9F0] border border-[#E5C583]/60 flex items-center justify-center shrink-0 text-[#C58A19] group-hover:scale-105 transition-transform">
                  <svg className="w-5 h-5 stroke-[#C58A19]" viewBox="0 0 24 24" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 13.8a4.5 4.5 0 0 1-2.5-4 4.5 4.5 0 0 1 8-2.6A4.5 4.5 0 0 1 19.5 9.8 4.5 4.5 0 0 1 18 13.8" />
                    <path d="M6 14v4a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-4" />
                    <line x1="6" y1="17" x2="18" y2="17" />
                  </svg>
                </div>
                <span className="text-xs sm:text-[13px] font-medium text-[#4A2116] group-hover:text-[#C58A19] transition-colors">
                  {t.footerConsultation}
                </span>
              </button>
            </div>
          </div>

          {/* Column 4: The House of Cakes Dubai (2 Columns on LG) + Cupcake Art */}
          <div className="lg:col-span-2 lg:pl-8 lg:rtl:pl-0 lg:rtl:pr-8 flex flex-col justify-between relative min-h-[180px]">
            <div>
              <h3 className="font-serif font-bold text-base sm:text-[17px] text-[#4A2116] tracking-tight">
                {t.footerCompanyTitle}
              </h3>
              <div className="w-10 h-[2px] bg-[#C58A19] mt-1.5 mb-3.5 rounded-full" />

              <ul className="space-y-2 sm:space-y-2.5 font-poppins text-xs sm:text-[13px] text-[#4A2116]">
                {t.footerCompanyLinks.map((link, idx) => (
                  <li key={idx}>
                    <button
                      onClick={onOpenHelp}
                      className="flex items-center gap-2 hover:text-[#C58A19] transition-colors group cursor-pointer text-left rtl:text-right py-0.5"
                    >
                      <span className="text-[#C58A19] font-bold text-[11px] select-none group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform">
                        &gt;
                      </span>
                      <span>{link.text}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Illustrated Golden Cupcake with Cherry & Ribbon Swoosh */}
            <div className="absolute bottom-0 right-0 rtl:right-auto rtl:left-0 pointer-events-none select-none hidden sm:block">
              <svg className="w-22 h-22 stroke-[#C58A19]" viewBox="0 0 100 100" fill="none">
                {/* Cherry on top with stem */}
                <circle cx="50" cy="22" r="5" stroke="#C58A19" strokeWidth="1.5" />
                <path d="M50 17 C 55 10, 62 12, 65 14" stroke="#C58A19" strokeWidth="1.5" strokeLinecap="round" />
                
                {/* Swirled Frosting */}
                <path d="M40 32 C 40 25, 60 25, 60 32" stroke="#C58A19" strokeWidth="1.5" />
                <path d="M32 40 C 30 32, 70 32, 68 40" stroke="#C58A19" strokeWidth="1.5" />
                <path d="M26 48 C 24 40, 76 40, 74 48" stroke="#C58A19" strokeWidth="1.5" />
                
                {/* Cupcake Wrapper Base */}
                <path d="M28 49 L 34 76 L 66 76 L 72 49 Z" stroke="#C58A19" strokeWidth="1.5" strokeLinejoin="round" />
                {/* Fluted wrapper pleats */}
                <line x1="38" y1="50" x2="42" y2="76" stroke="#C58A19" strokeWidth="1.2" />
                <line x1="46" y1="50" x2="48" y2="76" stroke="#C58A19" strokeWidth="1.2" />
                <line x1="54" y1="50" x2="52" y2="76" stroke="#C58A19" strokeWidth="1.2" />
                <line x1="62" y1="50" x2="58" y2="76" stroke="#C58A19" strokeWidth="1.2" />
                
                {/* Elegant Ribbon Swoosh Underneath */}
                <path d="M10 82 C 35 78, 65 88, 90 74" stroke="#C58A19" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </div>

          </div>

        </div>

        {/* Full-Width Delicate Gold Divider Line */}
        <div className="w-full h-[1px] bg-[#E5C583]/70 mt-8 sm:mt-10 mb-5 sm:mb-6" />

        {/* Bottom Bar: Social Icons | Payment Badges | Copyright & Developed by Mostech */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-[13px] w-full min-w-0">
          
          {/* Left Group: Social Icons + Separator + Payment Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 max-w-full">
            
            {/* 4 Golden Social Media Buttons */}
            <div className="flex items-center gap-1.5">
              {/* Facebook */}
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Facebook"
                className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-md bg-[#C58A19] hover:bg-[#A87413] text-white flex items-center justify-center transition-colors shadow-xs"
              >
                <span className="font-bold text-xs leading-none">f</span>
              </a>

              {/* Instagram */}
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram"
                className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-md bg-[#C58A19] hover:bg-[#A87413] text-white flex items-center justify-center transition-colors shadow-xs"
              >
                <svg className="w-3.5 h-3.5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>

              {/* X (Twitter) */}
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="X (Twitter)"
                className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-md bg-[#C58A19] hover:bg-[#A87413] text-white flex items-center justify-center transition-colors shadow-xs"
              >
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>

              {/* YouTube */}
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="YouTube"
                className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-md bg-[#C58A19] hover:bg-[#A87413] text-white flex items-center justify-center transition-colors shadow-xs"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>

            {/* Vertical Separator */}
            <div className="h-4 w-[1px] bg-[#E5C583]/80 hidden sm:block" />

            {/* Official Payment Badges */}
            <div className="flex items-center gap-1.5">
              {/* Visa Badge */}
              <div className="h-5.5 px-2.5 bg-white border border-[#E5E0D8] rounded flex items-center justify-center shadow-xs">
                <span className="font-sans font-black italic text-[11px] tracking-wider text-[#1A1F71]">VISA</span>
              </div>

              {/* Mastercard Badge */}
              <div className="h-5.5 px-2.5 bg-white border border-[#E5E0D8] rounded flex items-center justify-center gap-0.5 shadow-xs">
                <div className="w-3 h-3 rounded-full bg-[#EB001B] opacity-90 -mr-1" />
                <div className="w-3 h-3 rounded-full bg-[#F79E1B] opacity-90" />
              </div>

              {/* Apple Pay Badge */}
              <div className="h-5.5 px-2 bg-white border border-[#E5E0D8] rounded flex items-center justify-center gap-0.5 shadow-xs font-sans text-[10px] font-semibold text-black">
                <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 170 170">
                  <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.74 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.66-7.85-11.88-14.42-6.19-9.59-11.05-20.45-14.58-32.58-3.53-12.13-5.3-23.75-5.3-34.85 0-14.04 3.7-25.56 11.09-34.56 7.39-9 16.64-13.62 27.75-13.87 5.23 0 10.66 1.34 16.29 4.02 5.63 2.68 9.5 4.09 11.61 4.23 1.96 0 6.08-1.54 12.37-4.63 6.29-3.09 11.97-4.46 17.04-4.12 12.63.78 22.84 5.43 30.64 13.95-10.98 6.64-16.37 15.53-16.16 26.68.22 8.71 3.58 15.99 10.09 21.84 6.51 5.86 14.3 9.17 23.36 9.94-2.13 6.53-4.74 13.31-7.83 20.35zM119.22 33.02c0-7.39 2.66-14.42 7.97-21.09 5.31-6.67 11.83-10.91 19.56-12.73.55 3.04.66 5.87.33 8.49-.65 6.08-3.26 12.3-7.83 18.66-4.57 6.36-10.45 10.44-17.64 12.24-.76-5.1-.96-9.2-.96-12.31z"/>
                </svg>
                <span>Pay</span>
              </div>
            </div>

            {/* Vertical Separator */}
            <div className="h-4 w-[1px] bg-[#E5C583]/80 hidden lg:block" />

          </div>

          {/* Right Group: Copyright & Developed by Mostech Business Solutions */}
          <div className="text-[#555555] text-xs font-poppins text-center sm:text-right rtl:sm:text-left">
            <span>{t.footerRights}</span>
          </div>

        </div>

      </div>
    </footer>
  );
}