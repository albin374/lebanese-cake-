import React, { useState } from 'react';
import { X, Cake, ArrowRight } from 'lucide-react';

export default function CustomizeCakeModal({ isOpen, onClose, onAddToCart, currentLang = 'en' }) {
  if (!isOpen) return null;

  const [occasion, setOccasion] = useState('Birthday');
  const [flavor, setFlavor] = useState('Salted Caramel & Vanilla');
  const [size, setSize] = useState('2kg (12-15 servings)');
  const [message, setMessage] = useState('Happy Birthday Sarah!');
  const [candles, setCandles] = useState(true);
  const [goldLeaf, setGoldLeaf] = useState(true);

  const isAr = currentLang === 'ar';

  const occasions = isAr ? [
    'عيد ميلاد', 'حفل زفاف', 'ذكرى سنوية', 'مناسبة شركة', 'استقبال مولود', 'تخرج'
  ] : [
    'Birthday', 'Wedding', 'Anniversary', 'Corporate Milestone', 'Baby Shower', 'Graduation'
  ];
  
  const flavors = isAr ? [
    { id: 'caramel-vanilla', name: 'كراميل مملح وفانيليا مدغشقر', desc: 'طبقات فانيليا مع صوص كراميل مقطر وتوت طازج.' },
    { id: 'red-velvet', name: 'ريد فيلفيت كلاسيك', desc: 'كيك الكاكاو المخملي مع كريمة الجبن الفاخرة.' },
    { id: 'belgian-choc', name: 'ترافل الشوكولاتة البلجيكية 70%', desc: 'غاناش شوكولاتة داكنة غنية مع برالين البندق.' },
    { id: 'pistachio-kunafa', name: 'فستق حلبي وكنافة مقرمشة', desc: 'كنافة محمصة ذهبية مقرمشة مع كريمة الفستق.' },
  ] : [
    { id: 'caramel-vanilla', name: 'Salted Caramel & Vanilla', desc: 'Madagascar vanilla bean sponge with rich caramel drip and fresh berries.' },
    { id: 'red-velvet', name: 'Signature Red Velvet', desc: 'Crimson cocoa layers with silky cream cheese frosting and strawberry garnish.' },
    { id: 'belgian-choc', name: 'Belgian Chocolate Truffle', desc: 'Deep 70% dark chocolate ganache with crisp hazelnut praline.' },
    { id: 'pistachio-kunafa', name: 'Dubai Pistachio & Kunafa', desc: 'Crispy golden roasted kunafa threads layered with pistachio cream.' },
  ];

  const sizes = isAr ? [
    { label: '1 كجم (6-8 حصص)', price: '180 د.إ' },
    { label: '2 كجم (12-15 حصة)', price: '290 د.إ' },
    { label: 'طبقتان فاخرتان (25-30 حصة)', price: '540 د.إ' },
    { label: '3 طبقات ملكية (50+ حصة)', price: '980 د.إ' },
  ] : [
    { label: '1kg (6-8 servings)', price: 'AED 180' },
    { label: '2kg (12-15 servings)', price: 'AED 290' },
    { label: '2-Tier Luxury (25-30 servings)', price: 'AED 540' },
    { label: '3-Tier Grand Gala (50+ servings)', price: 'AED 980' },
  ];

  const currentPrice = sizes.find(s => s.label === size)?.price || (isAr ? '290 د.إ' : 'AED 290');

  const handleFinish = () => {
    onAddToCart({
      occasion,
      flavor,
      size,
      message,
      candles,
      goldLeaf,
      price: currentPrice
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-[#FFF9F0] rounded-2xl shadow-2xl border border-[#F5EBDD] overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#4A2116] px-6 py-4 text-white flex items-center justify-between border-b border-[#C58A19]/30">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#C58A19] flex items-center justify-center text-white">
              <Cake className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold tracking-wide text-[#FFF9F0]">
                {isAr ? 'صمّم كعكتك الخاصة' : 'Design Your Celebration Cake'}
              </h3>
              <p className="text-xs text-[#E6C783]">
                {isAr ? 'مخبوزة يدوياً في مخبز الحلم اللبناني' : 'Customized by Master Bakers at Lebanese Dream Bakery LLC'}
              </p>
            </div>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-[#4A2116]">
          
          {/* Step 1: Occasion */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#C58A19] mb-2">
              {isAr ? '1. اختر المناسبة' : '1. Select Celebration Occasion'}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {occasions.map((occ) => (
                <button
                  type="button"
                  key={occ}
                  onClick={() => setOccasion(occ)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium border text-center transition-all cursor-pointer ${
                    occasion === occ 
                      ? 'bg-[#C58A19] text-white border-[#C58A19] shadow-sm font-semibold' 
                      : 'bg-white text-[#4A2116] border-[#F5EBDD] hover:border-[#C58A19]'
                  }`}
                >
                  {occ}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Flavor Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#C58A19] mb-2">
              {isAr ? '2. نكهة الكيك والحشوة' : '2. Signature Cake Recipe & Flavor'}
            </label>
            <div className="space-y-2">
              {flavors.map((f) => (
                <div
                  key={f.id}
                  onClick={() => setFlavor(f.name)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                    flavor === f.name 
                      ? 'bg-[#F8F1E6] border-[#C58A19] shadow-sm ring-1 ring-[#C58A19]' 
                      : 'bg-white border-[#F5EBDD] hover:border-[#C58A19]/60'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full mt-0.5 border flex items-center justify-center shrink-0 ${
                    flavor === f.name ? 'border-[#C58A19] bg-[#C58A19]' : 'border-[#E6C783]'
                  }`}>
                    {flavor === f.name && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-[#4A2116]">{f.name}</div>
                    <div className="text-[11px] text-[#7D5B50] mt-0.5 leading-snug">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Step 3: Size & Portions */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#C58A19] mb-2">
              {isAr ? '3. الحجم وعدد الحصص' : '3. Size & Servings'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {sizes.map((s) => (
                <button
                  type="button"
                  key={s.label}
                  onClick={() => setSize(s.label)}
                  className={`p-3 rounded-xl border text-left rtl:text-right transition-all flex items-center justify-between cursor-pointer ${
                    size === s.label
                      ? 'bg-[#C58A19] text-white border-[#C58A19] shadow'
                      : 'bg-white text-[#4A2116] border-[#F5EBDD] hover:border-[#C58A19]'
                  }`}
                >
                  <span className="text-xs font-semibold">{s.label}</span>
                  <span className={`text-xs font-bold ${size === s.label ? 'text-white' : 'text-[#72251F]'}`}>
                    {s.price}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 4: Custom Message */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#C58A19] mb-2">
              {isAr ? '4. العبارة المكتوبة على الشوكولاتة' : '4. Custom Chocolate Plaque Message'}
            </label>
            <input 
              type="text" 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={isAr ? "مثال: مبروك التخرج يا سارة!" : "e.g. Happy Anniversary Mum & Dad!"}
              maxLength={45}
              className="w-full px-4 py-2.5 rounded-xl border border-[#E6C783] bg-white text-sm text-[#4A2116] focus:outline-none focus:ring-1 focus:ring-[#C58A19]"
            />
          </div>

          {/* Complimentary Options */}
          <div className="bg-[#F8F1E6] p-4 rounded-xl border border-[#F5EBDD] space-y-2 text-xs">
            <div className="font-semibold text-[#4A2116] mb-1">
              {isAr ? 'إضافات مجانية فاخرة:' : 'Complimentary Inclusions:'}
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={goldLeaf} 
                onChange={(e) => setGoldLeaf(e.target.checked)} 
                className="accent-[#C58A19] w-4 h-4 rounded"
              />
              <span>{isAr ? 'إضافة لمسات ورق الذهب عيار 24 الصالح للأكل' : 'Include 24K Edible Gold Leaf Accents'}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={candles} 
                onChange={(e) => setCandles(e.target.checked)} 
                className="accent-[#C58A19] w-4 h-4 rounded"
              />
              <span>{isAr ? 'شموع أعياد ميلاد وعلبة كبريت فاخرة' : 'Complimentary Birthday Candles & Luxury Matchbox'}</span>
            </label>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-[#F8F1E6] px-6 py-4 border-t border-[#F5EBDD] flex items-center justify-between">
          <div>
            <div className="text-[10px] text-[#7D5B50] uppercase tracking-wider">
              {isAr ? 'المجموع التقديري' : 'Estimated Total'}
            </div>
            <div className="text-xl font-bold text-[#72251F]">{currentPrice}</div>
          </div>

          <button
            type="button"
            onClick={handleFinish}
            className="bg-[#C58A19] hover:bg-[#4A2116] text-white px-6 py-2.5 rounded-[20px] text-sm font-semibold shadow transition-all flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <span>{isAr ? 'إضافة إلى الحقيبة' : 'Add to Bag'}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </button>
        </div>

      </div>
    </div>
  );
}
