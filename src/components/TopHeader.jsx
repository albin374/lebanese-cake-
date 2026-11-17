import React, { useState } from 'react';
import { Phone, ChevronDown, Check } from 'lucide-react';

export default function TopHeader({ currentLang, onLanguageChange }) {
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  return (
    <div className="bg-[#F8F1E6] border-b border-[#F5EBDD] text-[#4A2116] h-[32px] sm:h-[34px] px-3 sm:px-8 lg:px-12 text-xs flex items-center transition-colors w-full overflow-hidden">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between min-w-0">
        
        {/* Contact Phone (Gold phone icon #C58A19, Text #4A2116) */}
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
          <Phone className="w-3.5 h-3.5 text-[#C58A19] shrink-0" />
          <a 
            href="tel:+971506063631" 
            dir="ltr"
            className="font-medium text-[#4A2116] hover:text-[#C58A19] transition-colors tracking-wide text-[11px] sm:text-xs truncate"
          >
            +971 506063631
          </a>
        </div>

        {/* Language Selector (English | العربية ∨) */}
        <div className="relative">
          <button
            onClick={() => setLangMenuOpen(!langMenuOpen)}
            className="flex items-center gap-1.5 text-xs font-medium text-[#4A2116] hover:text-[#C58A19] transition-colors focus:outline-none cursor-pointer py-1"
            aria-expanded={langMenuOpen}
          >
            <span className={currentLang === 'en' ? 'font-semibold text-[#4A2116]' : 'text-[#7D5B50]'}>
              English
            </span>
            <span className="text-[#C58A19]/50">|</span>
            <span className={`font-arabic text-sm ${currentLang === 'ar' ? 'font-bold text-[#4A2116]' : 'text-[#7D5B50]'}`}>
              العربية
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-[#C58A19] transition-transform duration-200" />
          </button>

          {/* Language Dropdown Menu */}
          {langMenuOpen && (
            <div 
              className={`absolute mt-1 w-32 bg-white rounded-md shadow-md border border-[#F5EBDD] py-1 z-50 text-xs ${
                currentLang === 'ar' ? 'left-0' : 'right-0'
              }`}
            >
              <button
                onClick={() => {
                  onLanguageChange('en');
                  setLangMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-1.5 hover:bg-[#F8F1E6] flex items-center justify-between transition-colors ${
                  currentLang === 'en' ? 'text-[#C58A19] font-semibold' : 'text-[#4A2116]'
                }`}
              >
                <span>English</span>
                {currentLang === 'en' && <Check className="w-3.5 h-3.5 text-[#C58A19]" />}
              </button>
              <button
                onClick={() => {
                  onLanguageChange('ar');
                  setLangMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-1.5 hover:bg-[#F8F1E6] flex items-center justify-between font-arabic transition-colors ${
                  currentLang === 'ar' ? 'text-[#C58A19] font-bold' : 'text-[#4A2116]'
                }`}
              >
                <span>العربية</span>
                {currentLang === 'ar' && <Check className="w-3.5 h-3.5 text-[#C58A19]" />}
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
