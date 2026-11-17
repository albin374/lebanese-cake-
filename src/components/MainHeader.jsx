import React, { useState } from 'react';
import { Search, CircleHelp, UserRound, ShoppingBag, X } from 'lucide-react';
import { translations } from '../translations';

export default function MainHeader({ 
  currentLang = 'en', 
  cartCount = 2, 
  onOpenHelp, 
  onOpenAccount, 
  onOpenBag,
  onLogoClick
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const t = translations[currentLang] || translations.en;
  const isAr = currentLang === 'ar';

  const filteredSuggestions = t.searchSuggestions.filter(item => 
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectSuggestion = (item) => {
    setSearchQuery(item);
    setSearchFocused(false);
  };

  return (
    <header className="bg-[#FFF9F0] border-b border-[#F5EBDD] min-h-[82px] md:h-[92px] px-4 sm:px-8 lg:px-12 flex items-center transition-colors">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-4 md:gap-8 py-2 md:py-0">
        
        {/* Left Section: Bakery Logo (Slightly increased size, preserved original aspect ratio) */}
        <div className="flex items-center shrink min-w-0">
          <button 
            type="button" 
            onClick={onLogoClick} 
            className="flex items-center group focus:outline-none cursor-pointer text-left rtl:text-right"
          >
            <img 
              src="/Lebanese Dream Bakery Logo.png" 
              alt="Lebanese Dream Bakery LLC - مخبز الحلم اللبناني"
              className="h-10 sm:h-14 md:h-18 lg:h-[80px] w-auto max-w-[170px] sm:max-w-[240px] md:max-w-[340px] lg:max-w-[440px] object-contain transition-transform duration-200 group-hover:scale-[1.01]"
            />
          </button>
        </div>

        {/* Center Section: Taller Search Bar (Cream bg #FFFDF8, Thin gold border #E6C783, Rounded 10px, Antique gold button #C58A19) */}
        <div className="relative flex-1 max-w-lg lg:max-w-xl hidden md:block">
          <div className="relative flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
              placeholder={t.searchPlaceholder}
              className={`w-full h-11 sm:h-12 bg-[#FFFDF8] text-[#4A2116] placeholder-[#8C6D62] text-xs sm:text-[13.5px] font-poppins rounded-[10px] border border-[#E6C783] focus:border-[#C58A19] focus:ring-1 focus:ring-[#C58A19] focus:outline-none transition-all shadow-sm ${
                isAr ? 'pr-4 pl-16 text-right' : 'pl-4 pr-16 text-left'
              }`}
            />

            {/* Clear Input Button */}
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className={`absolute text-[#8C6D62] hover:text-[#4A2116] p-1 ${
                  isAr ? 'left-14' : 'right-14'
                }`}
                title="Clear"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Antique-Gold Search Button with White Search Icon */}
            <button
              type="button"
              className={`absolute w-10 sm:w-11 h-9 sm:h-10 bg-[#C58A19] hover:bg-[#A36F11] active:bg-[#4A2116] text-white rounded-[8px] flex items-center justify-center transition-colors cursor-pointer shadow-sm ${
                isAr ? 'left-1' : 'right-1'
              }`}
              title="Search"
            >
              <Search className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Autocomplete / Search Results Dropdown */}
          {searchFocused && (
            <div className="absolute left-0 right-0 top-full mt-1.5 bg-white rounded-[10px] shadow-lg border border-[#F5EBDD] p-3 z-50 animate-fadeIn">
              <div className="text-[11px] font-semibold text-[#8C6D62] uppercase tracking-wider mb-2 px-1">
                {isAr ? 'نتائج البحث المقترحة' : 'Popular Suggestions'}
              </div>
              <ul className="space-y-1">
                {filteredSuggestions.length > 0 ? (
                  filteredSuggestions.map((item, idx) => (
                    <li key={idx}>
                      <button
                        type="button"
                        onMouseDown={() => handleSelectSuggestion(item)}
                        className="w-full text-left rtl:text-right px-2.5 py-1.5 rounded-md hover:bg-[#F8F1E6] text-xs sm:text-[13px] text-[#4A2116] hover:text-[#C58A19] flex items-center gap-2 group transition-colors cursor-pointer font-poppins"
                      >
                        <Search className="w-3.5 h-3.5 text-[#C58A19] opacity-70 group-hover:opacity-100 shrink-0" />
                        <span>{item}</span>
                      </button>
                    </li>
                  ))
                ) : (
                  <li className="px-2.5 py-2 text-xs text-[#8C6D62]">
                    {isAr ? 'لا توجد نتائج مطابقة' : 'No matching cakes found'}
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Right Section: Header Actions (Help Center, Account, Bag with Responsive Spacing) */}
        <div className="flex items-center gap-3 sm:gap-6 md:gap-8 lg:gap-11 shrink-0">
          
          {/* Mobile Search Icon Trigger */}
          <button 
            type="button"
            className="md:hidden text-[#C58A19] hover:text-[#4A2116] p-1.5 cursor-pointer"
            title="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* 1. Help Center */}
          <button 
            type="button"
            onClick={onOpenHelp}
            className="flex flex-col items-center group text-[#4A2116] hover:text-[#C58A19] transition-colors cursor-pointer"
            title={t.helpCenter}
          >
            <CircleHelp className="w-5 h-5 text-[#C58A19] group-hover:scale-105 transition-transform stroke-[1.8]" />
            <span className="hidden sm:inline text-[11px] sm:text-xs font-poppins font-medium text-[#4A2116] group-hover:text-[#C58A19] transition-colors leading-none tracking-tight mt-1.5">
              {t.helpCenter}
            </span>
          </button>

          {/* 2. Account */}
          <button 
            type="button"
            onClick={onOpenAccount}
            className="flex flex-col items-center group text-[#4A2116] hover:text-[#C58A19] transition-colors cursor-pointer"
            title={t.account}
          >
            <UserRound className="w-5 h-5 text-[#C58A19] group-hover:scale-105 transition-transform stroke-[1.8]" />
            <span className="hidden sm:inline text-[11px] sm:text-xs font-poppins font-medium text-[#4A2116] group-hover:text-[#C58A19] transition-colors leading-none tracking-tight mt-1.5">
              {t.account}
            </span>
          </button>

          {/* 3. Bag */}
          <button 
            type="button"
            onClick={onOpenBag}
            className="flex flex-col items-center group text-[#4A2116] hover:text-[#C58A19] transition-colors relative cursor-pointer"
            title={t.bag}
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 text-[#C58A19] group-hover:scale-105 transition-transform stroke-[1.8]" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 rtl:-right-auto rtl:-left-2 bg-[#72251F] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline text-[11px] sm:text-xs font-poppins font-medium text-[#4A2116] group-hover:text-[#C58A19] transition-colors leading-none tracking-tight mt-1.5">
              {t.bag}
            </span>
          </button>

        </div>

      </div>
    </header>
  );
}
