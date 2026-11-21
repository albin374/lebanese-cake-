import React, { useState } from 'react';
import { Cake, ChevronDown, Menu, X } from 'lucide-react';
import { translations } from '../translations';

export default function Navbar({ currentLang = 'en', onCustomizeClick, activeCategory, onSelectCategory }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState({});
  const t = translations[currentLang] || translations.en;
  const isAr = currentLang === 'ar';

  const toggleMobileSubmenu = (id) => {
    setMobileExpanded(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const weddingSubcategoryIds = [
    'wedding-cakes',
    'classic-wedding-cakes',
    'novelty-wedding-cakes',
    'bride-to-be-cakes',
    'engagement-cakes',
    'grooms-cakes'
  ];

  const corporateSubcategoryIds = [
    'corporate-cakes',
    'corporate-cookies',
    'cupcakes-with-logo'
  ];

  const isItemActive = (itemId) => {
    if (activeCategory === itemId) return true;
    if (itemId === 'wedding-cakes' && weddingSubcategoryIds.includes(activeCategory)) return true;
    if (itemId === 'corporate-cakes' && corporateSubcategoryIds.includes(activeCategory)) return true;
    return false;
  };

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
    <nav className="bg-[#FFFFFF] border-y border-[#F5EBDD] h-[50px] sm:h-[58px] px-3 sm:px-6 lg:px-8 xl:px-10 relative z-30 transition-colors w-full">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between min-w-0 w-full">
        
        {/* Mobile Hamburger Drawer Trigger */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg text-[#4A2116] hover:text-[#C58A19] hover:bg-[#F8F1E6] focus:outline-none transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#C58A19]" /> : <Menu className="w-5 h-5" />}
          </button>
          <span className="font-poppins font-medium text-xs sm:text-sm text-[#4A2116]">
            {isAr ? 'تصفح الأقسام' : 'Menu'}
          </span>
        </div>

        {/* Desktop Navigation Links with Balanced Gap */}
        <div className="hidden lg:flex items-center gap-3.5 xl:gap-4.5 2xl:gap-6 h-full">
          {navCategories.map((item) => {
            const isActive = isItemActive(item.id);
            const isMenuOpen = openDropdown === item.id;
            return (
              <div
                key={item.id}
                className="relative h-full flex items-center"
                onMouseEnter={() => item.hasDropdown && setOpenDropdown(item.id)}
                onMouseLeave={() => item.hasDropdown && setOpenDropdown(null)}
              >
                <button
                  type="button"
                  onClick={() => {
                    if (item.hasDropdown) {
                      setOpenDropdown(prev => prev === item.id ? null : item.id);
                    }
                    if (onSelectCategory) onSelectCategory(item.id);
                  }}
                  className={`nav-link flex items-center gap-1.5 h-full font-poppins text-[14.5px] xl:text-[15.5px] font-medium transition-colors duration-200 cursor-pointer whitespace-nowrap ${
                    isActive || isMenuOpen
                      ? 'active text-[#C58A19] font-semibold'
                      : 'text-[#4A2116] hover:text-[#C58A19]'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.hasDropdown && (
                    <ChevronDown className={`w-3.5 h-3.5 text-[#C58A19] transition-transform duration-200 stroke-[2.2] ${
                      isMenuOpen ? 'rotate-180' : ''
                    }`} />
                  )}
                </button>

                {/* Dropdown Menu */}
                {item.hasDropdown && isMenuOpen && (
                  <div 
                    className={`absolute top-full mt-0 w-72 bg-white rounded-b-2xl shadow-[0_12px_36px_rgba(74,33,22,0.14)] border border-[#F2E5D5] py-2.5 z-50 animate-fadeIn before:content-[''] before:absolute before:-top-3 before:left-0 before:right-0 before:h-3 ${
                      isAr ? 'right-0' : 'left-0'
                    }`}
                  >
                    {item.children.map((sub, idx) => {
                      const subLabel = typeof sub === 'string' ? sub : sub.label;
                      const subId = typeof sub === 'object' && sub?.id ? sub.id : item.id;
                      const isSubActive = activeCategory === subId;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setOpenDropdown(null);
                            if (onSelectCategory) onSelectCategory(subId);
                          }}
                          className={`w-full text-left rtl:text-right px-5 py-3 font-poppins text-[15px] font-medium transition-colors cursor-pointer block leading-snug ${
                            isSubActive
                              ? 'bg-[#FAF5ED] text-[#C58A19] font-semibold'
                              : 'text-[#381E14] hover:bg-[#FAF5ED] hover:text-[#C58A19]'
                          }`}
                        >
                          {subLabel}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Customize Cake Button: Moved to the right with responsive spacing */}
        <button
          type="button"
          onClick={onCustomizeClick}
          className="flex items-center gap-1.5 sm:gap-2 bg-[#C58A19] hover:bg-[#4A2116] text-white font-poppins font-semibold text-xs sm:text-[14px] px-3 sm:px-5 py-2 sm:py-2.5 rounded-[22px] shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group shrink-0 lg:ml-6 xl:ml-10 2xl:ml-12 lg:rtl:ml-0 lg:rtl:mr-6 lg:rtl:xl:mr-10 lg:rtl:2xl:mr-12"
        >
          <Cake className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white group-hover:scale-110 transition-transform duration-200" />
          <span className="leading-none whitespace-nowrap">{t.customizeCake}</span>
        </button>

      </div>

      {/* Mobile Drawer Menu & Overlay */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop overlay */}
          <div 
            onClick={() => setMobileMenuOpen(false)}
            className="lg:hidden fixed inset-0 top-[110px] sm:top-[125px] bg-black/40 backdrop-blur-xs z-40 transition-opacity"
            aria-hidden="true"
          />

          {/* Drawer Dropdown Content */}
          <div className="lg:hidden absolute top-full left-0 right-0 bg-[#FFFDF8] border-b border-[#EADCC8] px-5 py-5 shadow-2xl z-50 animate-fadeIn max-h-[75vh] overflow-y-auto">
            <div className="space-y-1 mb-5">
              {navCategories.map((item) => {
                const isActive = isItemActive(item.id);
                const isExpanded = !!mobileExpanded[item.id];

                return (
                  <div key={item.id} className="border-b border-[#F2E7D5]/70 py-2">
                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => {
                          if (onSelectCategory) onSelectCategory(item.id);
                          setMobileMenuOpen(false);
                        }}
                        className={`text-left rtl:text-right font-poppins text-[15px] font-medium py-1 transition-colors cursor-pointer flex-1 ${
                          isActive ? 'text-[#C58A19] font-bold' : 'text-[#4A2116] hover:text-[#C58A19]'
                        }`}
                      >
                        {item.label}
                      </button>

                      {item.hasDropdown && (
                        <button
                          type="button"
                          onClick={() => toggleMobileSubmenu(item.id)}
                          className="p-2 text-[#C58A19] hover:text-[#4A2116] cursor-pointer"
                          aria-label={`Toggle ${item.label} subcategories`}
                        >
                          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                        </button>
                      )}
                    </div>

                    {/* Subcategories for items with dropdown */}
                    {item.hasDropdown && isExpanded && (
                      <div className="mt-2 pl-4 rtl:pl-0 rtl:pr-4 space-y-1.5 py-1 border-l-2 rtl:border-l-0 rtl:border-r-2 border-[#C58A19]/30">
                        {item.children.map((sub, idx) => {
                          const subLabel = typeof sub === 'string' ? sub : sub.label;
                          const subId = typeof sub === 'object' && sub?.id ? sub.id : item.id;
                          return (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => {
                                if (onSelectCategory) onSelectCategory(subId);
                                setMobileMenuOpen(false);
                              }}
                              className="block w-full text-left rtl:text-right py-1.5 text-xs text-[#7D5B50] hover:text-[#C58A19] font-medium cursor-pointer"
                            >
                              {subLabel}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Customize Cake Action Button */}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                if (onCustomizeClick) onCustomizeClick();
              }}
              className="w-full flex items-center justify-center gap-2.5 bg-[#C58A19] hover:bg-[#4A2116] text-white font-poppins font-semibold text-sm sm:text-base py-3.5 px-6 rounded-full shadow-md transition-colors cursor-pointer"
            >
              <Cake className="w-5 h-5 text-white" />
              <span>{t.customizeCake}</span>
            </button>
          </div>
        </>
      )}
    </nav>
  );
}
