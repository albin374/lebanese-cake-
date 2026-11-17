import React, { useState } from 'react';
import { 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Cake, 
  Heart, 
  GraduationCap, 
  Building2, 
  Gift, 
  Sparkles, 
  Baby, 
  Cross, 
  CircleDot,
  ShoppingBag,
  MessageCircle,
  HelpCircle,
  Layers,
  Shapes,
  Scale,
  UtensilsCrossed,
  Sparkle,
  Type,
  ClipboardCheck,
  ChevronRight
} from 'lucide-react';
import { translations } from '../translations';

export default function CustomizePage({ 
  currentLang = 'en', 
  onBackToHome, 
  onAddToCart,
  onOpenHelp 
}) {
  const isAr = currentLang === 'ar';
  const t = translations[currentLang] || translations.en;

  // Wizard state: 1 to 8
  const [currentStep, setCurrentStep] = useState(1);

  // Form state
  const [selectedOccasion, setSelectedOccasion] = useState('birthday');
  const [selectedLayers, setSelectedLayers] = useState('1-tier');
  const [selectedShape, setSelectedShape] = useState('round');
  const [selectedSize, setSelectedSize] = useState('2kg');
  const [selectedSponge, setSelectedSponge] = useState('vanilla');
  const [selectedFilling, setSelectedFilling] = useState('caramel-buttercream');
  const [selectedToppings, setSelectedToppings] = useState(['gold-leaf', 'candles']);
  const [cakeMessage, setCakeMessage] = useState('Happy Birthday!');
  const [messageStyle, setMessageStyle] = useState('piped-gold');
  const [specialInstructions, setSpecialInstructions] = useState('');

  // 8 Steps Definition
  const steps = [
    { number: 1, id: 'cake-type', label: isAr ? 'نوع الكيك' : 'Cake Type' },
    { number: 2, id: 'layers', label: isAr ? 'الطبقات' : 'Layers' },
    { number: 3, id: 'shape', label: isAr ? 'الشكل' : 'Shape' },
    { number: 4, id: 'size', label: isAr ? 'الحجم' : 'Size' },
    { number: 5, id: 'flavors', label: isAr ? 'النكهات' : 'Flavors' },
    { number: 6, id: 'toppings', label: isAr ? 'التصميم' : 'Design & Toppings' },
    { number: 7, id: 'message', label: isAr ? 'الرسالة' : 'Message' },
    { number: 8, id: 'review', label: isAr ? 'المراجعة' : 'Review' },
  ];

  // 6 Occasions matching user request
  const occasions = [
    {
      id: 'birthday',
      title: isAr ? 'كيك أعياد الميلاد' : 'Birthday Cake',
      image: '/customize/birthday.png',
      icon: (
        <svg className="w-4 h-4 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="1.8">
          <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8" />
          <path d="M4 16s2-1 4-1 4 1 4 1 2-1 4-1 4 1 4 1" />
          <path d="M2 21h20" />
          <path d="M7 8v3" />
          <path d="M12 8v3" />
          <path d="M17 8v3" />
          <circle cx="7" cy="4" r="0.5" fill="currentColor" />
          <circle cx="12" cy="4" r="0.5" fill="currentColor" />
          <circle cx="17" cy="4" r="0.5" fill="currentColor" />
        </svg>
      )
    },
    {
      id: 'wedding',
      title: isAr ? 'كيك الأعراس' : 'Wedding Cake',
      image: '/customize/Wedding Cake.png',
      icon: (
        <svg className="w-4 h-4 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="1.8">
          <circle cx="9" cy="12" r="5" />
          <circle cx="15" cy="12" r="5" />
        </svg>
      )
    },
    {
      id: 'graduation',
      title: isAr ? 'كيك التخرج' : 'Graduation Cake',
      image: '/customize/graduation.png',
      icon: <GraduationCap className="w-4 h-4" />
    },
    {
      id: 'superhero',
      title: isAr ? 'كيك الأبطال الخارقين' : 'Superhero Cake',
      image: '/customize/Superhero Cake.png',
      icon: <Sparkles className="w-4 h-4" />
    },
    {
      id: 'boys',
      title: isAr ? 'كيك للأولاد' : 'Boys Cake',
      image: '/customize/boys cake.png',
      icon: (
        <svg className="w-4 h-4 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="1.8">
          <circle cx="12" cy="12" r="8" />
          <path d="M12 8v8" />
          <path d="M8 12h8" />
        </svg>
      )
    },
    {
      id: 'girls',
      title: isAr ? 'كيك للبنات' : 'Girls Cake',
      image: '/customize/girls cake.png',
      icon: <Heart className="w-4 h-4" />
    }
  ];

  // Layers options
  const layerOptions = [
    { id: '1-tier', title: isAr ? 'طبقة واحدة كلاسيكية' : 'Single Tier', desc: isAr ? 'مناسبة للاحتفالات العائلية حتى 15 شخصاً' : 'Classic single tier, perfect for gatherings up to 15 guests', extraPrice: 0 },
    { id: '2-tier', title: isAr ? 'طبقتان فاخرتان' : '2 Tiers Grand', desc: isAr ? 'ارتفاع ملكي أنيق لحفلات الأعراس والذكرى السنوية' : 'Elegant stacked tiers for weddings, engagements & birthdays', extraPrice: 150 },
    { id: '3-tier', title: isAr ? '3 طبقات ملكية' : '3 Tiers Royal', desc: isAr ? 'تحفة فنية تخطف الأنظار في كبرى المناسبات' : 'Majestic centerpiece designed for grand ballroom banquets', extraPrice: 350 },
    { id: '4-tier', title: isAr ? '4 طبقات قصور فاخرة' : '4+ Tiers Palace Edition', desc: isAr ? 'تصميم حصري ضخم لحفلات الزفاف الملكية' : 'Monumental luxury gala showpiece with structural supports', extraPrice: 650 },
  ];

  // Shape options
  const shapeOptions = [
    { id: 'round', title: isAr ? 'دائري كلاسيكي' : 'Classic Round', desc: isAr ? 'الشكل الأكثر طلباً وفخامة' : 'Timeless circular silhouette with balanced proportions' },
    { id: 'square', title: isAr ? 'مربع عصري' : 'Modern Square', desc: isAr ? 'حواف حادة وأناقة عصرية راقية' : 'Sharp geometric edges with contemporary architectural appeal' },
    { id: 'heart', title: isAr ? 'قلب رومانسي' : 'Romantic Heart', desc: isAr ? 'مثالي لذكرى الزواج والمناسبات العاطفية' : 'Sweet sculptural heart for anniversaries & proposals' },
    { id: 'hexagon', title: isAr ? 'سداسي ملكي' : 'Hexagon Royale', desc: isAr ? 'تصميم هندسي فخم ومميز' : 'Unique 6-sided faceted geometry for couture celebrations' },
  ];

  // Size options
  const sizeOptions = [
    { id: '1kg', title: isAr ? '1 كجم (6-8 حصص)' : '1 kg (6-8 servings)', basePrice: 180, desc: isAr ? 'قطر 16 سم • احتفال مصغر' : '16cm diameter • Intimate celebration' },
    { id: '2kg', title: isAr ? '2 كجم (12-15 حصة)' : '2 kg (12-15 servings)', basePrice: 290, desc: isAr ? 'قطر 22 سم • الخيار الأكثر طلباً' : '22cm diameter • Most Popular Choice', popular: true },
    { id: '3kg', title: isAr ? '3 كجم (20-25 حصة)' : '3 kg (20-25 servings)', basePrice: 420, desc: isAr ? 'قطر 26 سم • حفلات الأصدقاء' : '26cm diameter • Family & party gatherings' },
    { id: '5kg', title: isAr ? '5 كجم (40-50 حصة)' : '5 kg (40-50 servings)', basePrice: 680, desc: isAr ? 'مناسبات كبرى وحفلات تخرج' : 'Generous feast for corporate & milestone parties' },
    { id: 'grand', title: isAr ? 'حجم ملكي (60-80 حصة)' : 'Grand Gala (60-80 servings)', basePrice: 1150, desc: isAr ? 'حفلات زفاف واستقبال فخم' : 'Spectacular scale for wedding banquets' },
  ];

  // Sponge Flavors
  const spongeOptions = [
    { id: 'vanilla', name: isAr ? 'فانيليا مدغشقر العضوية' : 'Madagascar Vanilla Bean', desc: isAr ? 'إسفنجة طرية خفيفة غنية بحبوب الفانيليا الطبيعية' : 'Light, tender golden sponge infused with aromatic natural vanilla bean' },
    { id: 'belgian-chocolate', name: isAr ? 'شوكولاتة بلجيكية فاخرة' : 'Rich Belgian Dark Chocolate', desc: isAr ? 'طبقات شوكولاتة كاكاو 70% عميقة وغنية' : 'Decadent 70% dark cocoa sponge with moist velvet crumb' },
    { id: 'pistachio-kunafa', name: isAr ? 'فستق حلبي وكنافة محمصة' : 'Dubai Pistachio & Kunafa', desc: isAr ? 'نكهة المخبز التوقيعية مع فستق حلبي محمص' : 'Signature Lebanese cake sponge with roasted green pistachios' },
    { id: 'red-velvet', name: isAr ? 'ريد فيلفيت كلاسيك' : 'Signature Red Velvet', desc: isAr ? 'كاكاو مخملي أحمر مع نكهة لا تقاوم' : 'Crimson cocoa velvet layers with delicate buttermilk essence' },
    { id: 'saffron-cardamom', name: isAr ? 'زعفران ملكي وهيل' : 'Royal Saffron & Cardamom', desc: isAr ? 'أصالة عربية فاخرة بماء الورد والزعفران النقي' : 'Exquisite Emirati-Lebanese blend with pure golden saffron threads' },
  ];

  // Fillings
  const fillingOptions = [
    { id: 'caramel-buttercream', name: isAr ? 'كريمة الزبدة السويسرية والكراميل المملح' : 'Salted Caramel & Swiss Buttercream', desc: isAr ? 'كراميل ناعم محضر يدوياً مع كريمة مخملية' : 'Silky smooth caramel drip with French vanilla buttercream' },
    { id: 'dark-ganache-hazelnut', name: isAr ? 'غاناش الشوكولاتة وبرالين البندق' : 'Dark Chocolate Ganache & Hazelnut Praline', desc: isAr ? 'شوكولاتة بلجيكية غنية مع بندق محمص مقرمش' : 'Rich dark chocolate ganache layered with crisp roasted praline crunch' },
    { id: 'strawberry-chantilly', name: isAr ? 'توت وفراولة طازجة مع الشانتيي' : 'Fresh Berries & Chantilly Cream', desc: isAr ? 'طبقات فواكه طبيعية مع كريمة شانتيي فرنسية' : 'Sweet wild strawberry coulis with light whipped Chantilly cream' },
    { id: 'pistachio-crunch-cream', name: isAr ? 'كريمة الفستق وخيوط الكنافة المقرمشة' : 'Pistachio Cream & Crispy Kunafa Threads', desc: isAr ? 'حشوة الحلم اللبناني الأصلية بطعم مقرمش وفاخر' : 'Rich emerald pistachio silk layered with golden roasted kunafa crunch' },
  ];

  // Design & Toppings
  const toppingOptions = [
    { id: 'gold-leaf', name: isAr ? 'ورق الذهب عيار 24 الصالح للأكل' : '24K Edible Gold Leaf Accents', price: 50, desc: isAr ? 'لمسات ذهبية ملكية فاخرة على أطراف الكيك' : 'Hand-applied pure edible 24K gold foil for royal elegance' },
    { id: 'fresh-flowers', name: isAr ? 'ورود طبيعية منسقة يدوياً' : 'Fresh Organic Floral Cascade', price: 80, desc: isAr ? 'ورود وبراعم منتقاة بعناية للأعراس والاحتفال' : 'Handcrafted arrangement of edible organic roses & eucalyptus' },
    { id: 'chocolate-drip', name: isAr ? 'صوص شوكولاتة أو كراميل مقطر' : 'Artisanal Caramel / Chocolate Drip', price: 30, desc: isAr ? 'تقطير احترافي ناعم على حواف الكيك' : 'Glossy, warm Belgian ganache drip cascading over the tiers' },
    { id: 'wild-berries', name: isAr ? 'توت وتوت بري وفراولة طازجة' : 'Gourmet Wild Seasonal Berries', price: 40, desc: isAr ? 'توت أحمر وتوت أزرق طازج يومياً' : 'Sweet raspberries, blackberries, and glazed garden strawberries' },
    { id: 'macarons', name: isAr ? 'ماكرون فرنسي فاخر (6 حبات)' : 'Handcrafted French Macarons (6 pcs)', price: 45, desc: isAr ? 'حبات ماكرون مقرمشة محشوة بالغاناش' : 'Crisp Parisian almond shells filled with pistachio & chocolate' },
    { id: 'candles', name: isAr ? 'طقم شموع ذهبية فاخرة' : 'Luxury Golden Candle Set', price: 0, desc: isAr ? 'شموع راقية مجانية مع الكيك' : 'Complimentary metallic gold celebration candles' },
  ];

  const toggleTopping = (id) => {
    setSelectedToppings(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Price Calculation
  const baseSizePrice = sizeOptions.find(s => s.id === selectedSize)?.basePrice || 290;
  const extraLayerPrice = layerOptions.find(l => l.id === selectedLayers)?.extraPrice || 0;
  const toppingsPrice = selectedToppings.reduce((total, topId) => {
    const item = toppingOptions.find(t => t.id === topId);
    return total + (item ? item.price : 0);
  }, 0);
  const acrylicTopperPrice = messageStyle === 'acrylic-topper' ? 35 : 0;
  const totalPrice = baseSizePrice + extraLayerPrice + toppingsPrice + acrylicTopperPrice;

  // Next step label helper
  const getNextStepLabel = () => {
    if (currentStep === 1) return isAr ? 'التالي: اختر الطبقات' : 'Next: Choose Layers';
    if (currentStep === 2) return isAr ? 'التالي: اختر الشكل' : 'Next: Choose Shape';
    if (currentStep === 3) return isAr ? 'التالي: اختر الحجم' : 'Next: Choose Size';
    if (currentStep === 4) return isAr ? 'التالي: اختر النكهات' : 'Next: Choose Flavors';
    if (currentStep === 5) return isAr ? 'التالي: التصميم والإضافات' : 'Next: Design & Toppings';
    if (currentStep === 6) return isAr ? 'التالي: كتابة الرسالة' : 'Next: Custom Message';
    if (currentStep === 7) return isAr ? 'التالي: مراجعة الطلب' : 'Next: Review Order';
    return isAr ? 'تأكيد وإضافة للحقيبة' : 'Add to Bag & Confirm';
  };

  const handleNext = () => {
    if (currentStep < 8) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    } else {
      // Step 8 Confirm
      const customCakeItem = {
        title: `${occasions.find(o => o.id === selectedOccasion)?.title || 'Custom Cake'} (${selectedSize})`,
        price: totalPrice.toFixed(2),
        flavor: `${spongeOptions.find(s => s.id === selectedSponge)?.name} with ${fillingOptions.find(f => f.id === selectedFilling)?.name}`,
        occasion: occasions.find(o => o.id === selectedOccasion)?.title,
        message: cakeMessage,
        layers: selectedLayers,
        shape: selectedShape,
        toppings: selectedToppings
      };
      if (onAddToCart) onAddToCart(customCakeItem);
      if (onBackToHome) onBackToHome();
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF8] text-[#4A2116] py-6 sm:py-10 px-3 sm:px-6 lg:px-12 relative overflow-hidden transition-colors selection:bg-[#C58A19] selection:text-white w-full max-w-full">
      
      {/* Decorative Golden Line Art Flourishes (Matching Reference Image) */}
      
      {/* 1. Top-Left Golden Laurel Leaves */}
      <div className="absolute top-2 left-2 rtl:left-auto rtl:right-2 w-28 sm:w-40 pointer-events-none opacity-80 select-none">
        <svg viewBox="0 0 160 120" fill="none" className="w-full stroke-[#C58A19]" strokeWidth="1.5">
          <path d="M10 20 C 30 15, 60 25, 90 50 C 110 68, 140 100, 150 115" strokeLinecap="round" />
          {/* Leaves along vine */}
          <path d="M25 18 C 30 5, 45 8, 40 22 C 35 25, 25 22, 25 18 Z" fill="#FFF9F0" />
          <path d="M50 25 C 60 12, 75 16, 70 30 C 65 33, 52 30, 50 25 Z" fill="#FFF9F0" />
          <path d="M75 42 C 85 28, 100 32, 95 46 C 90 50, 78 47, 75 42 Z" fill="#FFF9F0" />
          <path d="M100 60 C 112 48, 126 54, 120 68 C 115 72, 102 68, 100 60 Z" fill="#FFF9F0" />
          <path d="M125 82 C 138 72, 150 78, 145 92 C 140 96, 128 90, 125 82 Z" fill="#FFF9F0" />
        </svg>
      </div>

      {/* 2. Top-Right Golden Elegant Curves */}
      <div className="absolute top-0 right-0 rtl:right-auto rtl:left-0 w-32 sm:w-48 pointer-events-none opacity-60 select-none">
        <svg viewBox="0 0 180 140" fill="none" className="w-full stroke-[#C58A19]" strokeWidth="1.6">
          <path d="M180 0 C 120 10, 80 50, 50 110 C 35 140, 20 150, 0 160" strokeLinecap="round" />
          <path d="M180 30 C 135 40, 105 75, 80 130" strokeLinecap="round" strokeDasharray="3 3" />
        </svg>
      </div>

      {/* 3. Bottom-Left Golden Whisk & Rolling Pin */}
      <div className="absolute bottom-2 left-3 rtl:left-auto rtl:right-3 w-28 sm:w-36 pointer-events-none opacity-75 select-none hidden sm:block">
        <svg viewBox="0 0 140 100" fill="none" className="w-full stroke-[#C58A19]" strokeWidth="1.5">
          {/* Whisk wires */}
          <path d="M10 80 C 15 50, 45 40, 70 50 C 95 60, 105 85, 10 80 Z" />
          <path d="M15 78 C 30 55, 60 50, 80 62" />
          <path d="M22 75 C 40 60, 65 58, 85 70" />
          {/* Whisk handle */}
          <line x1="85" y1="62" x2="130" y2="40" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>

      {/* 4. Bottom-Right Golden Cupcake with Cherry */}
      <div className="absolute bottom-2 right-3 rtl:right-auto rtl:left-3 w-24 sm:w-32 pointer-events-none opacity-75 select-none hidden sm:block">
        <svg viewBox="0 0 100 100" fill="none" className="w-full stroke-[#C58A19]" strokeWidth="1.5">
          <circle cx="50" cy="22" r="5" />
          <path d="M50 17 C 55 10, 62 12, 65 14" strokeLinecap="round" />
          <path d="M40 32 C 40 25, 60 25, 60 32" />
          <path d="M32 40 C 30 32, 70 32, 68 40" />
          <path d="M26 48 C 24 40, 76 40, 74 48" />
          <path d="M28 49 L 34 76 L 66 76 L 72 49 Z" strokeLinejoin="round" />
          <line x1="38" y1="50" x2="42" y2="76" strokeWidth="1.2" />
          <line x1="46" y1="50" x2="48" y2="76" strokeWidth="1.2" />
          <line x1="54" y1="50" x2="52" y2="76" strokeWidth="1.2" />
          <line x1="62" y1="50" x2="58" y2="76" strokeWidth="1.2" />
          <path d="M10 82 C 35 78, 65 88, 90 74" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Back to Home Breadcrumb & Button */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBackToHome}
            className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[#7D5B50] hover:text-[#C58A19] transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 rtl:rotate-180 group-hover:-translate-x-1 rtl:group-hover:translate-x-1 transition-transform" />
            <span>{isAr ? 'العودة إلى المتجر الرئيسي' : 'Back to Home'}</span>
          </button>
          
          <div className="text-xs text-[#8C6D62] font-medium hidden sm:block">
            <span>{isAr ? 'الرئيسية' : 'Home'}</span>
            <span className="mx-2 text-[#C58A19]">/</span>
            <span className="text-[#C58A19] font-semibold">{isAr ? 'صمّم كيكتك' : 'Customize Your Cake'}</span>
          </div>
        </div>

        {/* Header Section (Centered Title with Gold Accent Lines) */}
        <div className="text-center mb-8 sm:mb-10">
          
          {/* Centered Golden Cake Icon */}
          <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-[#FFF9F0] border border-[#E5C583] flex items-center justify-center text-[#C58A19] shadow-xs">
            <svg className="w-5 h-5 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="1.8">
              <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8" />
              <path d="M4 16s2-1 4-1 4 1 4 1 2-1 4-1 4 1 4 1" />
              <path d="M2 21h20" />
              <path d="M7 8v3" />
              <path d="M12 8v3" />
              <path d="M17 8v3" />
              <circle cx="7" cy="4" r="0.5" fill="currentColor" />
              <circle cx="12" cy="4" r="0.5" fill="currentColor" />
              <circle cx="17" cy="4" r="0.5" fill="currentColor" />
            </svg>
          </div>

          {/* Title Flanked by Thin Golden Lines */}
          <div className="flex items-center justify-center gap-3 sm:gap-6">
            <div className="h-[1.5px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-[#C58A19]" />
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#4A2116] tracking-tight">
              {isAr ? 'صمّم كيكتك الخاصة' : 'Customize Your Cake'}
            </h1>
            <div className="h-[1.5px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-[#C58A19]" />
          </div>

          {/* Subtitle */}
          <p className="font-poppins text-xs sm:text-sm text-[#7D5B50] mt-1.5 max-w-md mx-auto">
            {isAr ? 'اصنع كعكة فريدة تعبّر عن ذوقك وتناسب مناسبتك السعيدة' : "Create a cake that's uniquely yours"}
          </p>

        </div>

        {/* 8-Step Stepper Bar (Horizontal Progress Bar Matching Reference Image) */}
        <div className="mb-8 sm:mb-10 overflow-x-auto pb-3 sm:pb-0 scrollbar-none">
          <div className="min-w-[700px] flex items-center justify-between relative px-4">
            
            {/* Connecting Gold Line */}
            <div className="absolute top-[15px] left-8 right-8 h-[1.5px] bg-[#E8D6B5] -z-0" />

            {steps.map((st) => {
              const isCurrent = currentStep === st.number;
              const isCompleted = currentStep > st.number;

              return (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => setCurrentStep(st.number)}
                  className="flex flex-col items-center group cursor-pointer focus:outline-none relative z-10"
                >
                  {/* Step Bubble */}
                  {isCurrent ? (
                    /* Active filled pill/circle with gold background */
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C58A19] text-white shadow-md text-xs font-semibold animate-scaleIn">
                      <span className="w-4 h-4 rounded-full bg-white text-[#C58A19] flex items-center justify-center text-[10px] font-bold">
                        {st.number}
                      </span>
                      <span className="whitespace-nowrap font-medium text-[11px] sm:text-xs">
                        {st.label}
                      </span>
                    </div>
                  ) : (
                    /* Inactive / Completed step circle */
                    <div className="flex flex-col items-center">
                      <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                        isCompleted 
                          ? 'bg-[#4A2116] text-[#E6C783] shadow-xs' 
                          : 'bg-white border border-[#E5C583] text-[#7D5B50] hover:border-[#C58A19]'
                      }`}>
                        {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : st.number}
                      </div>
                      <span className={`text-[11px] sm:text-xs font-medium mt-1.5 whitespace-nowrap ${
                        isCompleted ? 'text-[#4A2116] font-semibold' : 'text-[#8C6D62]'
                      }`}>
                        {st.label}
                      </span>
                    </div>
                  )}
                </button>
              );
            })}

          </div>
        </div>

        {/* STEP 1: Cake Type / Occasions (Identical to reference image) */}
        {currentStep === 1 && (
          <div className="animate-fadeIn">
            
            {/* Section Heading with Left Gold Bar */}
            <div className="flex items-start gap-3 mb-6 sm:mb-8">
              <div className="w-1 sm:w-1.5 h-10 sm:h-12 bg-[#C58A19] rounded-full shrink-0 mt-0.5" />
              <div>
                <h2 className="font-serif text-xl sm:text-2xl md:text-[26px] font-bold text-[#4A2116]">
                  {isAr ? 'ما هو نوع الكيك الذي ترغب به؟' : 'What type of cake do you want?'}
                </h2>
                <p className="font-poppins text-xs sm:text-sm text-[#8C6D62] mt-0.5">
                  {isAr ? 'اختر مناسبة الكيك الخاصة بك.' : 'Choose the occasion for your cake.'}
                </p>
              </div>
            </div>

            {/* 6 Cake Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-3.5 sm:gap-4.5 mb-8">
              {occasions.map((occ) => {
                const isSelected = selectedOccasion === occ.id;

                return (
                  <div
                    key={occ.id}
                    onClick={() => setSelectedOccasion(occ.id)}
                    className={`bg-white rounded-2xl border transition-all duration-200 cursor-pointer p-3 sm:p-3.5 flex flex-col justify-between relative group hover:-translate-y-1 hover:shadow-lg ${
                      isSelected 
                        ? 'border-2 border-[#C58A19] shadow-md ring-2 ring-[#C58A19]/20' 
                        : 'border-[#F0E4D2] hover:border-[#C58A19]/70 shadow-xs'
                    }`}
                  >
                    {/* Checkmark Badge on Top Right when selected */}
                    {isSelected && (
                      <div className="absolute top-2.5 right-2.5 rtl:right-auto rtl:left-2.5 w-6 h-6 rounded-full bg-[#C58A19] text-white flex items-center justify-center shadow-xs z-10 animate-scaleIn">
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                    )}

                    {/* Cake Image Box */}
                    <div className="w-full aspect-[4/3] flex items-center justify-center overflow-hidden mb-2.5 pt-1">
                      <img 
                        src={encodeURI(occ.image)} 
                        alt={occ.title} 
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 select-none" 
                      />
                    </div>

                    {/* Card Footer: Icon + Title */}
                    <div className="flex items-center gap-2 pt-2 border-t border-[#F8F1E6]">
                      <span className={`text-base shrink-0 ${isSelected ? 'text-[#C58A19]' : 'text-[#8C6D62]'}`}>
                        {occ.icon}
                      </span>
                      <span className={`font-poppins text-xs sm:text-[13px] font-medium leading-tight truncate ${
                        isSelected ? 'text-[#4A2116] font-semibold' : 'text-[#4A2116]'
                      }`}>
                        {occ.title}
                      </span>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* STEP 2: Layers */}
        {currentStep === 2 && (
          <div className="animate-fadeIn">
            <div className="flex items-start gap-3 mb-6 sm:mb-8">
              <div className="w-1 sm:w-1.5 h-10 sm:h-12 bg-[#C58A19] rounded-full shrink-0 mt-0.5" />
              <div>
                <h2 className="font-serif text-xl sm:text-2xl md:text-[26px] font-bold text-[#4A2116]">
                  {isAr ? 'كم عدد الطبقات التي تفضلها؟' : 'How many layers or tiers?'}
                </h2>
                <p className="font-poppins text-xs sm:text-sm text-[#8C6D62] mt-0.5">
                  {isAr ? 'اختر هيكل وارتفاع الكعكة المناسب لعدد ضيوفك.' : 'Select the tier structure for your celebration centerpiece.'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {layerOptions.map((layer) => {
                const isSelected = selectedLayers === layer.id;
                return (
                  <div
                    key={layer.id}
                    onClick={() => setSelectedLayers(layer.id)}
                    className={`bg-white rounded-2xl border p-5 cursor-pointer transition-all duration-200 flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 relative ${
                      isSelected
                        ? 'border-2 border-[#C58A19] shadow-md ring-2 ring-[#C58A19]/20'
                        : 'border-[#F0E4D2] hover:border-[#C58A19]/70'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-3 right-3 rtl:right-auto rtl:left-3 w-6 h-6 rounded-full bg-[#C58A19] text-white flex items-center justify-center shadow-xs">
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                    )}
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-[#FFF9F0] border border-[#E5C583]/60 flex items-center justify-center text-[#C58A19] mb-4">
                        <Layers className="w-6 h-6" />
                      </div>
                      <h3 className="font-serif font-bold text-base text-[#4A2116] mb-1">
                        {layer.title}
                      </h3>
                      <p className="text-xs text-[#8C6D62] leading-relaxed mb-4">
                        {layer.desc}
                      </p>
                    </div>
                    <div className="text-xs font-semibold text-[#C58A19] pt-2 border-t border-[#F8F1E6]">
                      {layer.extraPrice > 0 ? `+AED ${layer.extraPrice}` : (isAr ? 'السعر الأساسي' : 'Standard Tier')}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3: Shape */}
        {currentStep === 3 && (
          <div className="animate-fadeIn">
            <div className="flex items-start gap-3 mb-6 sm:mb-8">
              <div className="w-1 sm:w-1.5 h-10 sm:h-12 bg-[#C58A19] rounded-full shrink-0 mt-0.5" />
              <div>
                <h2 className="font-serif text-xl sm:text-2xl md:text-[26px] font-bold text-[#4A2116]">
                  {isAr ? 'اختر شكل الكيك' : 'Choose Cake Shape'}
                </h2>
                <p className="font-poppins text-xs sm:text-sm text-[#8C6D62] mt-0.5">
                  {isAr ? 'اختر التصميم الهندسي لقاعدة الكيك.' : 'Select the geometric foundation for your cake.'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {shapeOptions.map((shape) => {
                const isSelected = selectedShape === shape.id;
                return (
                  <div
                    key={shape.id}
                    onClick={() => setSelectedShape(shape.id)}
                    className={`bg-white rounded-2xl border p-5 cursor-pointer transition-all duration-200 flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 relative ${
                      isSelected
                        ? 'border-2 border-[#C58A19] shadow-md ring-2 ring-[#C58A19]/20'
                        : 'border-[#F0E4D2] hover:border-[#C58A19]/70'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-3 right-3 rtl:right-auto rtl:left-3 w-6 h-6 rounded-full bg-[#C58A19] text-white flex items-center justify-center shadow-xs">
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                    )}
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-[#FFF9F0] border border-[#E5C583]/60 flex items-center justify-center text-[#C58A19] mb-4">
                        <Shapes className="w-6 h-6" />
                      </div>
                      <h3 className="font-serif font-bold text-base text-[#4A2116] mb-1">
                        {shape.title}
                      </h3>
                      <p className="text-xs text-[#8C6D62] leading-relaxed">
                        {shape.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 4: Size */}
        {currentStep === 4 && (
          <div className="animate-fadeIn">
            <div className="flex items-start gap-3 mb-6 sm:mb-8">
              <div className="w-1 sm:w-1.5 h-10 sm:h-12 bg-[#C58A19] rounded-full shrink-0 mt-0.5" />
              <div>
                <h2 className="font-serif text-xl sm:text-2xl md:text-[26px] font-bold text-[#4A2116]">
                  {isAr ? 'اختر الحجم وعدد الحصص' : 'Select Size & Guest Count'}
                </h2>
                <p className="font-poppins text-xs sm:text-sm text-[#8C6D62] mt-0.5">
                  {isAr ? 'نضمن لك حصصاً وافرة ومقادير فاخرة لكل ضيف.' : 'We ensure generous portions baked to perfection.'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
              {sizeOptions.map((sz) => {
                const isSelected = selectedSize === sz.id;
                return (
                  <div
                    key={sz.id}
                    onClick={() => setSelectedSize(sz.id)}
                    className={`bg-white rounded-2xl border p-4 sm:p-5 cursor-pointer transition-all duration-200 flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 relative ${
                      isSelected
                        ? 'border-2 border-[#C58A19] shadow-md ring-2 ring-[#C58A19]/20'
                        : 'border-[#F0E4D2] hover:border-[#C58A19]/70'
                    }`}
                  >
                    {sz.popular && (
                      <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#C58A19] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-xs">
                        {isAr ? 'الأكثر طلباً' : 'Popular'}
                      </span>
                    )}
                    {isSelected && (
                      <div className="absolute top-3 right-3 rtl:right-auto rtl:left-3 w-5 h-5 rounded-full bg-[#C58A19] text-white flex items-center justify-center shadow-xs">
                        <Check className="w-3 h-3 stroke-[2.5]" />
                      </div>
                    )}
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-[#FFF9F0] border border-[#E5C583]/60 flex items-center justify-center text-[#C58A19] mb-3">
                        <Scale className="w-5 h-5" />
                      </div>
                      <h3 className="font-serif font-bold text-sm sm:text-base text-[#4A2116] mb-1">
                        {sz.title}
                      </h3>
                      <p className="text-xs text-[#8C6D62] leading-relaxed mb-3">
                        {sz.desc}
                      </p>
                    </div>
                    <div className="text-sm font-bold text-[#C58A19] pt-2 border-t border-[#F8F1E6]">
                      AED {sz.basePrice}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 5: Flavors */}
        {currentStep === 5 && (
          <div className="animate-fadeIn">
            <div className="flex items-start gap-3 mb-6 sm:mb-8">
              <div className="w-1 sm:w-1.5 h-10 sm:h-12 bg-[#C58A19] rounded-full shrink-0 mt-0.5" />
              <div>
                <h2 className="font-serif text-xl sm:text-2xl md:text-[26px] font-bold text-[#4A2116]">
                  {isAr ? 'اختر نكهة الكيك والحشوة' : 'Choose Sponge & Gourmet Filling'}
                </h2>
                <p className="font-poppins text-xs sm:text-sm text-[#8C6D62] mt-0.5">
                  {isAr ? 'مخبوزة بأجود أنواع الكاكاو البلجيكي والفستق والزعفران الطبيعي.' : 'Mastercrafted with Belgian chocolate, Tahitian vanilla, and Dubai pistachios.'}
                </p>
              </div>
            </div>

            {/* Sub-section: Sponge Cake Base */}
            <div className="mb-6">
              <h3 className="font-serif font-bold text-base text-[#4A2116] mb-3">
                {isAr ? '1. نكهة الإسفنجة الأساسية' : '1. Sponge Base Flavor'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {spongeOptions.map((sp) => {
                  const isSelected = selectedSponge === sp.id;
                  return (
                    <div
                      key={sp.id}
                      onClick={() => setSelectedSponge(sp.id)}
                      className={`bg-white rounded-xl border p-4 cursor-pointer transition-all flex items-start justify-between ${
                        isSelected
                          ? 'border-2 border-[#C58A19] bg-[#FFFBF5] shadow-xs'
                          : 'border-[#F0E4D2] hover:border-[#C58A19]/60'
                      }`}
                    >
                      <div>
                        <div className="font-semibold text-sm text-[#4A2116] mb-1">{sp.name}</div>
                        <div className="text-xs text-[#8C6D62]">{sp.desc}</div>
                      </div>
                      <div className={`w-5 h-5 rounded-full border shrink-0 mt-0.5 flex items-center justify-center ${
                        isSelected ? 'border-[#C58A19] bg-[#C58A19] text-white' : 'border-[#D4C3A3]'
                      }`}>
                        {isSelected && <Check className="w-3 h-3 stroke-[2.5]" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Sub-section: Gourmet Filling */}
            <div>
              <h3 className="font-serif font-bold text-base text-[#4A2116] mb-3">
                {isAr ? '2. الحشوة والكريمة الفاخرة' : '2. Gourmet Filling & Layering Cream'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
                {fillingOptions.map((fl) => {
                  const isSelected = selectedFilling === fl.id;
                  return (
                    <div
                      key={fl.id}
                      onClick={() => setSelectedFilling(fl.id)}
                      className={`bg-white rounded-xl border p-4 cursor-pointer transition-all flex items-start justify-between ${
                        isSelected
                          ? 'border-2 border-[#C58A19] bg-[#FFFBF5] shadow-xs'
                          : 'border-[#F0E4D2] hover:border-[#C58A19]/60'
                      }`}
                    >
                      <div>
                        <div className="font-semibold text-sm text-[#4A2116] mb-1">{fl.name}</div>
                        <div className="text-xs text-[#8C6D62]">{fl.desc}</div>
                      </div>
                      <div className={`w-5 h-5 rounded-full border shrink-0 mt-0.5 flex items-center justify-center ${
                        isSelected ? 'border-[#C58A19] bg-[#C58A19] text-white' : 'border-[#D4C3A3]'
                      }`}>
                        {isSelected && <Check className="w-3 h-3 stroke-[2.5]" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* STEP 6: Design & Toppings */}
        {currentStep === 6 && (
          <div className="animate-fadeIn">
            <div className="flex items-start gap-3 mb-6 sm:mb-8">
              <div className="w-1 sm:w-1.5 h-10 sm:h-12 bg-[#C58A19] rounded-full shrink-0 mt-0.5" />
              <div>
                <h2 className="font-serif text-xl sm:text-2xl md:text-[26px] font-bold text-[#4A2116]">
                  {isAr ? 'التصميم الخارجي واللمسات الفاخرة' : 'Finishing, Accents & Toppings'}
                </h2>
                <p className="font-poppins text-xs sm:text-sm text-[#8C6D62] mt-0.5">
                  {isAr ? 'اختر الإضافات الملكية لتزيين كعكتك (يمكنك اختيار أكثر من خيار).' : 'Select luxury handcrafted details to crown your celebration cake.'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {toppingOptions.map((top) => {
                const isSelected = selectedToppings.includes(top.id);
                return (
                  <div
                    key={top.id}
                    onClick={() => toggleTopping(top.id)}
                    className={`bg-white rounded-2xl border p-5 cursor-pointer transition-all flex flex-col justify-between hover:shadow-md relative ${
                      isSelected
                        ? 'border-2 border-[#C58A19] bg-[#FFFBF5] shadow-xs'
                        : 'border-[#F0E4D2] hover:border-[#C58A19]/60'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <h3 className="font-semibold text-sm sm:text-base text-[#4A2116] mb-1">
                          {top.name}
                        </h3>
                        <p className="text-xs text-[#8C6D62] leading-relaxed">
                          {top.desc}
                        </p>
                      </div>
                      <div className={`w-5 h-5 rounded-md border shrink-0 flex items-center justify-center transition-colors ${
                        isSelected ? 'border-[#C58A19] bg-[#C58A19] text-white' : 'border-[#D4C3A3] bg-white'
                      }`}>
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                      </div>
                    </div>
                    <div className="text-xs font-bold text-[#C58A19] pt-2 border-t border-[#F8F1E6]">
                      {top.price > 0 ? `+AED ${top.price}` : (isAr ? 'مجاني' : 'Complimentary')}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 7: Message */}
        {currentStep === 7 && (
          <div className="animate-fadeIn">
            <div className="flex items-start gap-3 mb-6 sm:mb-8">
              <div className="w-1 sm:w-1.5 h-10 sm:h-12 bg-[#C58A19] rounded-full shrink-0 mt-0.5" />
              <div>
                <h2 className="font-serif text-xl sm:text-2xl md:text-[26px] font-bold text-[#4A2116]">
                  {isAr ? 'رسالة الإهداء وكتابة الكيك' : 'Custom Inscription & Message'}
                </h2>
                <p className="font-poppins text-xs sm:text-sm text-[#8C6D62] mt-0.5">
                  {isAr ? 'أضف عبارة الاحتفال التي ستُكتب على الكيك أو على لوح السكر الفاخر.' : 'Personalize your cake with a piped message or luxury acrylic topper.'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
              
              {/* Form Input */}
              <div className="lg:col-span-7 space-y-5 bg-white p-6 rounded-2xl border border-[#F0E4D2] shadow-xs">
                
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#C58A19] mb-1.5">
                    {isAr ? 'نص الرسالة على الكيك' : 'Piped Inscription Message'}
                  </label>
                  <input
                    type="text"
                    value={cakeMessage}
                    onChange={(e) => setCakeMessage(e.target.value)}
                    placeholder={isAr ? 'مثال: مبروك التخرج يا سارة!' : 'e.g., Happy Birthday Sarah!'}
                    className="w-full px-4 py-3 rounded-xl border border-[#E5D7C3] focus:border-[#C58A19] focus:ring-2 focus:ring-[#C58A19]/20 outline-none text-sm transition-all"
                  />
                  <span className="text-[11px] text-[#8C6D62] mt-1 block">
                    {isAr ? 'الحد الأقصى 45 حرفاً لضمان أفضل تنسيق جمالي.' : 'Up to 45 characters recommended for best aesthetic piping.'}
                  </span>
                </div>

                {/* Inscription Style */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#C58A19] mb-2">
                    {isAr ? 'نمط الكتابة والتنسيق' : 'Inscription Style'}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setMessageStyle('piped-gold')}
                      className={`p-3 rounded-xl border text-left rtl:text-right cursor-pointer transition-all ${
                        messageStyle === 'piped-gold'
                          ? 'border-2 border-[#C58A19] bg-[#FFFBF5]'
                          : 'border-[#F0E4D2] hover:border-[#C58A19]/50'
                      }`}
                    >
                      <div className="font-semibold text-xs text-[#4A2116]">
                        {isAr ? 'كتابة يدوية بالشوكولاتة أو الذهب' : 'Hand-Piped Chocolate / Gold Script'}
                      </div>
                      <div className="text-[11px] text-[#C58A19] font-medium mt-0.5">
                        {isAr ? 'مجاني' : 'Complimentary'}
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setMessageStyle('acrylic-topper')}
                      className={`p-3 rounded-xl border text-left rtl:text-right cursor-pointer transition-all ${
                        messageStyle === 'acrylic-topper'
                          ? 'border-2 border-[#C58A19] bg-[#FFFBF5]'
                          : 'border-[#F0E4D2] hover:border-[#C58A19]/50'
                      }`}
                    >
                      <div className="font-semibold text-xs text-[#4A2116]">
                        {isAr ? 'مجسم توبر أكريليك ذهبي مرآة' : 'Custom Gold Mirror Acrylic Topper'}
                      </div>
                      <div className="text-[11px] text-[#C58A19] font-medium mt-0.5">
                        +AED 35
                      </div>
                    </button>
                  </div>
                </div>

                {/* Special Instructions */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#C58A19] mb-1.5">
                    {isAr ? 'ملاحظات وتفضيلات خاصة للشيف' : 'Special Baker Instructions or Color Theme'}
                  </label>
                  <textarea
                    rows="3"
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    placeholder={isAr ? 'أي حساسية طعام، درجات ألوان محددة، أو ترتيب معين...' : 'Any color palette, dietary requests, or specific delivery timing notes...'}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E5D7C3] focus:border-[#C58A19] focus:ring-2 focus:ring-[#C58A19]/20 outline-none text-xs leading-relaxed transition-all resize-none"
                  />
                </div>

              </div>

              {/* Live Visual Preview of Inscription */}
              <div className="lg:col-span-5 bg-gradient-to-b from-[#FFF9F0] to-[#F8F1E6] rounded-2xl border border-[#E8D6B5] p-6 flex flex-col items-center justify-center text-center shadow-xs">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#C58A19] mb-3">
                  {isAr ? 'معاينة لوحة الإهداء' : 'Live Plaque Preview'}
                </span>
                
                <div className="w-full max-w-xs bg-white rounded-2xl border-2 border-dashed border-[#C58A19]/60 p-6 shadow-sm flex flex-col items-center justify-center min-h-[140px]">
                  <div className="font-serif italic font-bold text-lg sm:text-xl text-[#C58A19] tracking-wide break-words max-w-full">
                    {cakeMessage || (isAr ? 'رسالتك هنا' : 'Your Message Here')}
                  </div>
                  <div className="text-[10px] text-[#8C6D62] mt-2 font-poppins">
                    {messageStyle === 'acrylic-topper' 
                      ? (isAr ? 'مجسم توبر أكريليك ذهبي' : 'Gold Acrylic Topper') 
                      : (isAr ? 'كتابة يدوية أنيقة على السطح' : 'Piped on White Sugar Ribbon Plaque')}
                  </div>
                </div>

                <p className="text-[11px] text-[#7D5B50] mt-4 leading-relaxed max-w-xs">
                  {isAr 
                    ? 'سيقوم شيف المخبز اللبناني بكتابة الرسالة بكل دقة وأناقة مطابقة للصورة.' 
                    : 'Our pastry chef Saad will hand-pipe your message with artisanal precision.'}
                </p>
              </div>

            </div>
          </div>
        )}

        {/* STEP 8: Review & Order */}
        {currentStep === 8 && (
          <div className="animate-fadeIn">
            <div className="flex items-start gap-3 mb-6 sm:mb-8">
              <div className="w-1 sm:w-1.5 h-10 sm:h-12 bg-[#C58A19] rounded-full shrink-0 mt-0.5" />
              <div>
                <h2 className="font-serif text-xl sm:text-2xl md:text-[26px] font-bold text-[#4A2116]">
                  {isAr ? 'مراجعة وتأكيد طلب الكيك المخصص' : 'Review Your Custom Cake'}
                </h2>
                <p className="font-poppins text-xs sm:text-sm text-[#8C6D62] mt-0.5">
                  {isAr ? 'تأكد من اختياراتك ومكونات الكعكة قبل تأكيد الطلب.' : 'Review your customized selections and proceed to checkout or concierge WhatsApp.'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
              
              {/* Summary Card */}
              <div className="lg:col-span-8 bg-white rounded-2xl border border-[#F0E4D2] p-6 sm:p-8 shadow-sm space-y-6">
                
                <div className="flex items-center justify-between pb-4 border-b border-[#F8F1E6]">
                  <div>
                    <h3 className="font-serif font-bold text-xl text-[#4A2116]">
                      {occasions.find(o => o.id === selectedOccasion)?.title}
                    </h3>
                    <p className="text-xs text-[#C58A19] font-medium mt-0.5">
                      {isAr ? 'تصميم مخصص حسب الطلب' : 'Bespoke Custom Cake Creation'}
                    </p>
                  </div>
                  <div className="w-14 h-14 rounded-xl bg-[#FFF9F0] border border-[#E5C583]/60 flex items-center justify-center shrink-0">
                    <img 
                      src={encodeURI(occasions.find(o => o.id === selectedOccasion)?.image || '/customize/birthday.png')} 
                      alt="Occasion" 
                      className="w-10 h-10 object-contain select-none"
                    />
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 rounded-xl bg-[#FFFBF5] border border-[#F5EBDD]">
                    <span className="text-[#8C6D62] block mb-1 font-medium">{isAr ? 'الهيكل والطبقات' : 'Tiers & Structure'}</span>
                    <span className="font-semibold text-[#4A2116] text-sm">{layerOptions.find(l => l.id === selectedLayers)?.title}</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#FFFBF5] border border-[#F5EBDD]">
                    <span className="text-[#8C6D62] block mb-1 font-medium">{isAr ? 'الشكل الهندسي' : 'Shape'}</span>
                    <span className="font-semibold text-[#4A2116] text-sm">{shapeOptions.find(s => s.id === selectedShape)?.title}</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#FFFBF5] border border-[#F5EBDD]">
                    <span className="text-[#8C6D62] block mb-1 font-medium">{isAr ? 'الحجم وعدد الحصص' : 'Size & Servings'}</span>
                    <span className="font-semibold text-[#4A2116] text-sm">{sizeOptions.find(s => s.id === selectedSize)?.title}</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#FFFBF5] border border-[#F5EBDD]">
                    <span className="text-[#8C6D62] block mb-1 font-medium">{isAr ? 'نكهة الإسفنجة' : 'Sponge Flavor'}</span>
                    <span className="font-semibold text-[#4A2116] text-sm">{spongeOptions.find(s => s.id === selectedSponge)?.name}</span>
                  </div>

                  <div className="sm:col-span-2 p-3.5 rounded-xl bg-[#FFFBF5] border border-[#F5EBDD]">
                    <span className="text-[#8C6D62] block mb-1 font-medium">{isAr ? 'الحشوة والكريمة' : 'Gourmet Filling'}</span>
                    <span className="font-semibold text-[#4A2116] text-sm">{fillingOptions.find(f => f.id === selectedFilling)?.name}</span>
                  </div>

                  <div className="sm:col-span-2 p-3.5 rounded-xl bg-[#FFFBF5] border border-[#F5EBDD]">
                    <span className="text-[#8C6D62] block mb-1 font-medium">{isAr ? 'الإضافات والتزيين' : 'Selected Toppings & Accents'}</span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {selectedToppings.map(topId => {
                        const item = toppingOptions.find(t => t.id === topId);
                        return (
                          <span key={topId} className="px-2.5 py-1 rounded-full bg-white border border-[#E5C583] text-[#4A2116] text-[11px] font-medium">
                            {item?.name}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {cakeMessage && (
                    <div className="sm:col-span-2 p-3.5 rounded-xl bg-[#FFFBF5] border border-[#F5EBDD]">
                      <span className="text-[#8C6D62] block mb-1 font-medium">{isAr ? 'رسالة الكيك المكتوبة' : 'Piped Inscription'}</span>
                      <span className="font-serif italic font-bold text-[#C58A19] text-base">"{cakeMessage}"</span>
                    </div>
                  )}
                </div>

              </div>

              {/* Price Breakdown & Actions */}
              <div className="lg:col-span-4 bg-white rounded-2xl border border-[#F0E4D2] p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#4A2116] mb-4 pb-3 border-b border-[#F8F1E6]">
                    {isAr ? 'ملخص التكلفة' : 'Order Pricing'}
                  </h3>

                  <div className="space-y-2.5 text-xs text-[#7D5B50] mb-6">
                    <div className="flex justify-between">
                      <span>{isAr ? 'الحجم الأساسي:' : 'Base Cake Size:'}</span>
                      <span className="font-semibold text-[#4A2116]">AED {baseSizePrice}</span>
                    </div>
                    {extraLayerPrice > 0 && (
                      <div className="flex justify-between">
                        <span>{isAr ? 'إضافة الطبقات:' : 'Tier Upgrade:'}</span>
                        <span className="font-semibold text-[#4A2116]">+AED {extraLayerPrice}</span>
                      </div>
                    )}
                    {toppingsPrice > 0 && (
                      <div className="flex justify-between">
                        <span>{isAr ? 'الإضافات والتزيين:' : 'Luxury Toppings:'}</span>
                        <span className="font-semibold text-[#4A2116]">+AED {toppingsPrice}</span>
                      </div>
                    )}
                    {acrylicTopperPrice > 0 && (
                      <div className="flex justify-between">
                        <span>{isAr ? 'توبر الأكريليك:' : 'Gold Acrylic Topper:'}</span>
                        <span className="font-semibold text-[#4A2116]">+AED {acrylicTopperPrice}</span>
                      </div>
                    )}
                    <div className="pt-3 border-t border-[#F8F1E6] flex justify-between items-baseline">
                      <span className="font-bold text-sm text-[#4A2116]">{isAr ? 'المجموع الإجمالي:' : 'Total Price:'}</span>
                      <span className="font-serif font-bold text-xl text-[#C58A19]">AED {totalPrice}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-[#F8F1E6]">
                  <button
                    onClick={handleNext}
                    className="w-full flex items-center justify-center gap-2 bg-[#C58A19] hover:bg-[#A87413] text-white font-semibold py-3.5 px-6 rounded-full shadow-md transition-all cursor-pointer text-sm"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{isAr ? 'إضافة للحقيبة ومتابعة الطلب' : 'Add to Bag & Proceed'}</span>
                  </button>

                  <a
                    href={`https://wa.me/971506063631?text=${encodeURIComponent(
                      `Hello Lebanese Dream Bakery! I would like to order a custom cake:\nOccasion: ${occasions.find(o => o.id === selectedOccasion)?.title}\nSize: ${sizeOptions.find(s => s.id === selectedSize)?.title}\nFlavor: ${spongeOptions.find(s => s.id === selectedSponge)?.name}\nMessage: "${cakeMessage}"\nTotal: AED ${totalPrice}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-semibold py-3 px-6 rounded-full shadow-xs transition-all text-xs"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{isAr ? 'تأكيد مباشر عبر الواتساب' : 'Direct WhatsApp Order (+971 506063631)'}</span>
                  </a>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* Bottom Action Footer (Back on left, Next Button on right) */}
        <div className="mt-8 pt-6 border-t border-[#E8D6B5] flex items-center justify-between">
          
          {/* Back Button */}
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handlePrev}
              className="flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full border border-[#C58A19] text-[#C58A19] hover:bg-[#FFF9F0] text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
              <span>{isAr ? 'السابق' : 'Previous Step'}</span>
            </button>
          ) : (
            <div />
          )}

          {/* Right Group: Estimated Price + Next Action Button */}
          <div className="flex items-center gap-4">
            <div className="text-right rtl:text-left hidden sm:block">
              <span className="text-[11px] text-[#8C6D62] block font-medium">
                {isAr ? 'السعر التقديري:' : 'Estimated Price:'}
              </span>
              <span className="font-serif font-bold text-base text-[#C58A19]">
                AED {totalPrice}
              </span>
            </div>

            {/* Next Step Button (Golden Pill Button Matching Reference Image) */}
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-2.5 bg-[#C58A19] hover:bg-[#A87413] text-white font-poppins font-semibold text-xs sm:text-sm px-6 sm:px-8 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer group"
            >
              <span>{getNextStepLabel()}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}