import React from 'react';
import { Phone } from 'lucide-react';

export default function TopHeader({ currentLang, onLanguageChange }) {
  const isAr = currentLang === 'ar';

  return (
    <div className="bg-[#F8F1E6] border-b border-[#F5EBDD] text-[#4A2116] h-[34px] px-3 sm:px-8 lg:px-12 text-xs flex items-center transition-colors w-full">
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

        {/* Direct Language Switcher (English | العربية) */}
        <div className="flex items-center gap-1.5 text-xs">
          <button
            type="button"
            onClick={() => onLanguageChange('en')}
            className={`px-2 py-0.5 rounded transition-all cursor-pointer font-medium ${
              currentLang === 'en'
                ? 'font-bold text-[#C58A19] bg-[#FAF3E8] border border-[#E5C583]/60 shadow-2xs'
                : 'text-[#7D5B50] hover:text-[#4A2116] hover:bg-[#F0E6D6]'
            }`}
            title="Switch to English"
          >
            English
          </button>

          <span className="text-[#C58A19]/50 select-none">|</span>

          <button
            type="button"
            onClick={() => onLanguageChange('ar')}
            className={`px-2.5 py-0.5 font-arabic text-[13px] rounded transition-all cursor-pointer ${
              currentLang === 'ar'
                ? 'font-bold text-[#C58A19] bg-[#FAF3E8] border border-[#E5C583]/60 shadow-2xs'
                : 'text-[#7D5B50] hover:text-[#4A2116] hover:bg-[#F0E6D6]'
            }`}
            title="التحويل إلى اللغة العربية"
          >
            العربية
          </button>
        </div>

      </div>
    </div>
  );
}
