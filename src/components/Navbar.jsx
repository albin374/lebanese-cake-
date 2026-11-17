import React, { useState } from 'react';
import { Cake, ChevronDown, Menu, X } from 'lucide-react';
import { translations } from '../translations';

export default function Navbar({ currentLang = 'en', onCustomizeClick, activeCategory, onSelectCategory }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const t = translations[currentLang] || translations.en;
  const isAr = currentLang === 'ar';

  const navCategories = [
    { id: 'all-cakes', label: t.allCakes, hasDropdown: false },
    { 
      id: 'wedding-cakes', 
      label: t.weddingCakes, 
      hasDropdown: true,
      children: t.weddingDropdown
    },
    { 
      id: 'corporate-cakes', 
      label: t.corporateCakes, 
      hasDropdown: true,
      children: t.corporateDropdown
    },
    { id: 'cookies', label: t.cookies, hasDropdown: false },
    { id: 'cake-pops', label: t.cakePops, hasDropdown: false },
    { id: 'cupcakes', label: t.cupcakes, hasDropdown: false },
    { id: 'cakes-for-kids', label: t.cakesForKids, hasDropdown: false },
    { id: 'cakes-for-ladies', label: t.cakesForLadies, hasDropdown: false },
    { id: 'cakes-for-guys', label: t.cakesForGuys, hasDropdown: false },
  ];

  return (
    <nav className="bg-[#FFFFFF] border-y border-[#F5EBDD] h-[52px] sm:h-[58px] px-4 sm:px-6 lg:px-8 xl:px-10 relative z-30 transition-colors">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
        
        {/* Mobile Hamburger Drawer Trigger */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-[#4A2116] hover:text-[#C58A19] focus:outline-none cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <span className="font-poppins font-medium text-sm text-[#4A2116]">
            {isAr ? 'الأقسام' : 'Categories'}
          </span>
        </div>

        {/* Desktop Navigation Links with Balanced Gap */}
        <div className="hidden lg:flex items-center gap-3.5 xl:gap-4.5 2xl:gap-6 h-full">
          {navCategories.map((item) => {
            const isActive = activeCategory === item.id;
            return (
              <div
                key={item.id}
                className="relative h-full flex items-center"
                onMouseEnter={() => item.hasDropdown && setOpenDropdown(item.id)}
                onMouseLeave={() => item.hasDropdown && setOpenDropdown(null)}
              >
                <button
                  type="button"
                  onClick={() => onSelectCategory && onSelectCategory(item.id)}
                  className={`nav-link flex items-center gap-1.5 h-full font-poppins text-[14.5px] xl:text-[15.5px] font-medium text-[#4A2116] hover:text-[#C58A19] transition-colors duration-200 cursor-pointer whitespace-nowrap ${
                    isActive ? 'active text-[#C58A19] font-semibold' : ''
                  }`}
                >
                  <span>{item.label}</span>
                  {item.hasDropdown && (
                    <ChevronDown className="w-3.5 h-3.5 text-[#C58A19] transition-transform duration-200 stroke-[2]" />
                  )}
                </button>

                {/* Dropdown Menu */}
                {item.hasDropdown && openDropdown === item.id && (
                  <div 
                    className={`absolute top-full mt-0 w-64 bg-white rounded-b-md shadow-lg border border-[#F5EBDD] py-2 z-50 animate-fadeIn ${
                      isAr ? 'right-0' : 'left-0'
                    }`}
                  >
                    {item.children.map((sub, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setOpenDropdown(null);
                          if (onSelectCategory) onSelectCategory(item.id);
                        }}
                        className="w-full text-left rtl:text-right px-4 py-2.5 font-poppins text-[14px] font-medium text-[#4A2116] hover:bg-[#F8F1E6] hover:text-[#C58A19] transition-colors cursor-pointer"
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Customize Cake Button: Moved to the right with generous distinct separation from Cakes for Guys */}
        <button
          type="button"
          onClick={onCustomizeClick}
          className="flex items-center gap-2 bg-[#C58A19] hover:bg-[#4A2116] text-white font-poppins font-semibold text-[14px] sm:text-[14.5px] px-5 sm:px-6 py-2.5 sm:py-3 rounded-[22px] shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group shrink-0 ml-6 xl:ml-10 2xl:ml-12 rtl:ml-0 rtl:mr-6 rtl:xl:mr-10 rtl:2xl:mr-12"
        >
          <Cake className="w-4 h-4 text-white group-hover:scale-110 transition-transform duration-200" />
          <span className="leading-none whitespace-nowrap">{t.customizeCake}</span>
        </button>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-[#FFF9F0] border-b border-[#F5EBDD] px-6 py-6 shadow-xl z-50 animate-fadeIn">
          <div className="space-y-2.5 mb-5">
            {navCategories.map((item) => (
              <div key={item.id} className="border-b border-[#F5EBDD]/60 py-2.5">
                <button
                  type="button"
                  onClick={() => {
                    if (onSelectCategory) onSelectCategory(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left rtl:text-right flex items-center justify-between font-poppins text-base font-medium text-[#4A2116] hover:text-[#C58A19]"
                >
                  <span>{item.label}</span>
                  {item.hasDropdown && <ChevronDown className="w-4 h-4 text-[#C58A19]" />}
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onCustomizeClick();
            }}
            className="w-full flex items-center justify-center gap-2.5 bg-[#C58A19] hover:bg-[#4A2116] text-white font-poppins font-semibold text-base py-3.5 px-6 rounded-[22px] shadow transition-colors"
          >
            <Cake className="w-5 h-5 text-white" />
            <span>{t.customizeCake}</span>
          </button>
        </div>
      )}
    </nav>
  );
}
