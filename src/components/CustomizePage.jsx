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

  // Wizard state: 1 to 7
  const [currentStep, setCurrentStep] = useState(1);

  // Form state
  const [selectedOccasion, setSelectedOccasion] = useState('birthday');
  const [selectedShapeLayer, setSelectedShapeLayer] = useState('round-1-tier');
  const [selectedLayers, setSelectedLayers] = useState('1-tier');
  const [selectedShape, setSelectedShape] = useState('round');
  const [selectedSize, setSelectedSize] = useState('2kg');
  const [selectedSponge, setSelectedSponge] = useState('vanilla');
  const [selectedFilling, setSelectedFilling] = useState('caramel-buttercream');
  const [selectedToppings, setSelectedToppings] = useState(['gold-leaf', 'candles']);
  const [cakeMessage, setCakeMessage] = useState('Happy Birthday!');
  const [messageStyle, setMessageStyle] = useState('piped-gold');
  const [specialInstructions, setSpecialInstructions] = useState('');

  // 7 Steps Definition (Unified Shape & Layers)
  const steps = [
    { number: 1, id: 'cake-type', label: isAr ? 'نوع الكيك' : 'Cake Type' },
    { number: 2, id: 'shape-layers', label: isAr ? 'الشكل والطبقات' : 'Shape & Layers' },
    { number: 3, id: 'size', label: isAr ? 'الحجم' : 'Size' },
    { number: 4, id: 'flavors', label: isAr ? 'النكهات' : 'Flavors' },
    { number: 5, id: 'toppings', label: isAr ? 'التصميم' : 'Design & Toppings' },
    { number: 6, id: 'message', label: isAr ? 'الرسالة' : 'Message' },
    { number: 7, id: 'review', label: isAr ? 'المراجعة' : 'Review' },
  ];

  // 6 Occasions matching user request
  const occasions = [
    {
      id: 'birthday',
      title: isAr ? 'كيك أعياد الميلاد' : 'Birthday Cake',
      image: '/customize/birthday.png',
      icon: (
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
      )
    },
    {
      id: 'wedding',
      title: isAr ? 'كيك الأعراس' : 'Wedding Cake',
      image: '/customize/Elegant Ivory Wedding Cake Cutout.png',
      icon: (
        <svg className="w-5 h-5 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="1.8">
          <circle cx="9" cy="12" r="5" />
          <circle cx="15" cy="12" r="5" />
        </svg>
      )
    },
    {
      id: 'graduation',
      title: isAr ? 'كيك التخرج' : 'Graduation Cake',
      image: '/customize/graduation.png',
      icon: <GraduationCap className="w-5 h-5" />
    },
    {
      id: 'superhero',
      title: isAr ? 'كيك الأبطال الخارقين' : 'Superhero Cake',
      image: '/customize/Superhero Cake.png',
      icon: <Sparkles className="w-5 h-5" />
    },
    {
      id: 'boys',
      title: isAr ? 'كيك للأولاد' : 'Boys Cake',
      image: '/customize/boys cake.png',
      icon: (
        <svg className="w-5 h-5 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="1.8">
          <circle cx="12" cy="12" r="8" />
          <path d="M12 8v8" />
          <path d="M8 12h8" />
        </svg>
      )
    },
    {
      id: 'girls',
      title: isAr ? 'كيك للبنات' : 'Girls Cake',
      image: '/customize/Frozen-Style Elsa Birthday Cake Cutout.png',
      icon: <Heart className="w-5 h-5" />
    }
  ];

  // 9 Shape & Layer Options matching user provided 3D cake images
  const shapeLayerOptions = [
    {
      id: 'round-1-tier',
      title: isAr ? 'كيك دائري كلاسيكي (طبقة واحدة)' : 'Classic Round (1 Tier)',
      shape: 'round',
      layers: '1-tier',
      desc: isAr ? 'تصميم دائري متوازن وأنيق لجميع المناسبات' : 'Timeless balanced circular silhouette for any celebration',
      extraPrice: 0,
      image: '/customize/shapes/round cake.png'
    },
    {
      id: 'round-tall',
      title: isAr ? 'كيك دائري طويل (طبقة ممتدة)' : 'Round Tall Cake (Extended Tier)',
      shape: 'round',
      layers: 'tall-1-tier',
      desc: isAr ? 'ارتفاع مضاعف أنيق يمنح الكعكة فخامة وحضوراً عصرياً' : 'Double-height modern profile with sleek contemporary appeal',
      extraPrice: 50,
      image: '/customize/shapes/round tall cake.png'
    },
    {
      id: 'round-2-tier',
      title: isAr ? 'كيك دائري من طبقتين' : 'Two-Tier Round Cake',
      shape: 'round',
      layers: '2-tier',
      desc: isAr ? 'طبقتان دائريتان متناسقتان للأعراس وحفلات الخطوبة' : 'Two stacked circular tiers for weddings & engagements',
      extraPrice: 150,
      image: '/customize/shapes/Two-Tier round Cake.png'
    },
    {
      id: 'round-3-tier',
      title: isAr ? 'كيك دائري ملكي من 3 طبقات' : 'Three-Tier Royal Round',
      shape: 'round',
      layers: '3-tier',
      desc: isAr ? 'تحفة فنية بارتفاع مهيب لأفخم مناسبات الزفاف والفعاليات' : 'Majestic three-tier centerpiece designed for grand ballroom galas',
      extraPrice: 350,
      image: '/customize/shapes/Three-Tier round  Cake.png'
    },
    {
      id: 'square-1-tier',
      title: isAr ? 'كيك مربع كلاسيكي (طبقة واحدة)' : 'Classic Square (1 Tier)',
      shape: 'square',
      layers: '1-tier',
      desc: isAr ? 'حواف هندسية حادة وأناقة عصرية راقية' : 'Sharp geometric lines with clean, modern architectural styling',
      extraPrice: 0,
      image: '/customize/shapes/square cake.png'
    },
    {
      id: 'square-tall',
      title: isAr ? 'كيك مربع طويل عصري' : 'Square Tall Cake (Cube Edition)',
      shape: 'square',
      layers: 'tall-1-tier',
      desc: isAr ? 'مكعب بارتفاع إضافي مميز لحفلات أعياد الميلاد والشركات' : 'Sculptural tall cube silhouette for chic modern celebrations',
      extraPrice: 50,
      image: '/customize/shapes/sqaure cake.png'
    },
    {
      id: 'square-2-tier',
      title: isAr ? 'كيك مربع من طبقتين' : 'Two-Tier Square Cake',
      shape: 'square',
      layers: '2-tier',
      desc: isAr ? 'طبقتان هندسيتان متدرجتان لحفلات التخرج والأعراس' : 'Stacked geometric tiers with striking modern architectural presence',
      extraPrice: 180,
      image: '/customize/shapes/two tier sqaure cake .png'
    },
    {
      id: 'heart-1-tier',
      title: isAr ? 'كيك القلب الرومانسي' : 'Romantic Heart Cake',
      shape: 'heart',
      layers: '1-tier',
      desc: isAr ? 'شكل قلب رومانسي مميز لذكرى الزواج والمناسبات الخاصة' : 'Romantic sculpted heart silhouette for anniversaries & proposals',
      extraPrice: 40,
      image: '/customize/shapes/herat cake .png'
    },
    {
      id: 'rectangular-1-tier',
      title: isAr ? 'كيك مستطيل للعائلات والشركات' : 'Celebration Rectangle (Sheet)',
      shape: 'rectangle',
      layers: '1-tier',
      desc: isAr ? 'مساحة واسعة وسهلة التقطيع للمناسبات الكبيرة والشركات' : 'Spacious sheet cake optimized for clean serving & grand crowds',
      extraPrice: 60,
      image: '/customize/shapes/recatanglur .png'
    }
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

  // Selected shape & layer object
  const selectedShapeLayerItem = shapeLayerOptions.find(item => item.id === selectedShapeLayer) || shapeLayerOptions[0];

  // Price Calculation
  const baseSizePrice = sizeOptions.find(s => s.id === selectedSize)?.basePrice || 290;
  const extraLayerPrice = selectedShapeLayerItem?.extraPrice || 0;
  const toppingsPrice = selectedToppings.reduce((total, topId) => {
    const item = toppingOptions.find(t => t.id === topId);
    return total + (item ? item.price : 0);
  }, 0);
  const acrylicTopperPrice = messageStyle === 'acrylic-topper' ? 35 : 0;
  const totalPrice = baseSizePrice + extraLayerPrice + toppingsPrice + acrylicTopperPrice;

  // Next step label helper
  const getNextStepLabel = () => {
    if (currentStep === 1) return isAr ? 'التالي: الشكل والطبقات' : 'Next: Shape & Layers';
    if (currentStep === 2) return isAr ? 'التالي: اختر الحجم' : 'Next: Choose Size';
    if (currentStep === 3) return isAr ? 'التالي: اختر النكهات' : 'Next: Choose Flavors';
    if (currentStep === 4) return isAr ? 'التالي: التصميم والإضافات' : 'Next: Design & Toppings';
    if (currentStep === 5) return isAr ? 'التالي: كتابة الرسالة' : 'Next: Custom Message';
    if (currentStep === 6) return isAr ? 'التالي: مراجعة الطلب' : 'Next: Review Order';
    return isAr ? 'تأكيد وإضافة للحقيبة' : 'Add to Bag & Confirm';
  };

  const handleNext = () => {
    if (currentStep < 7) {
      setCurrentStep(prev => prev - 1 >= 0 ? prev + 1 : 2);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    } else {
      // Step 7 Confirm
      const customCakeItem = {
        title: `${occasions.find(o => o.id === selectedOccasion)?.title || 'Custom Cake'} (${selectedSize})`,
        price: totalPrice.toFixed(2),
        flavor: `${spongeOptions.find(s => s.id === selectedSponge)?.name} with ${fillingOptions.find(f => f.id === selectedFilling)?.name}`,
        occasion: occasions.find(o => o.id === selectedOccasion)?.title,
        message: cakeMessage,
        layers: selectedShapeLayerItem?.title || selectedLayers,
        shape: selectedShapeLayerItem?.shape || selectedShape,
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

            {/* 6 Cake Cards Grid: 3 in a row, enlarged size */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-7 md:gap-8 mb-10">
              {occasions.map((occ) => {
                const isSelected = selectedOccasion === occ.id;

                return (
                  <div
                    key={occ.id}
                    onClick={() => setSelectedOccasion(occ.id)}
                    className={`bg-white rounded-3xl border-2 transition-all duration-300 cursor-pointer p-5 sm:p-6 flex flex-col justify-between relative group hover:-translate-y-1.5 hover:shadow-xl ${
                      isSelected 
                        ? 'border-[#C58A19] shadow-lg ring-4 ring-[#C58A19]/15 bg-[#FFFDF9]' 
                        : 'border-[#EEDECB] hover:border-[#C58A19]/70 shadow-sm'
                    }`}
                  >
                    {/* Checkmark Badge on Top Right when selected */}
                    {isSelected && (
                      <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#C58A19] text-white flex items-center justify-center shadow-md z-10 animate-scaleIn">
                        <Check className="w-4 h-4 stroke-[2.5]" />
                      </div>
                    )}

                    {/* Cake Image Box (Enlarged) */}
                    <div className="w-full aspect-[4/3] sm:h-52 md:h-60 flex items-center justify-center overflow-hidden mb-4 p-3 bg-[#FAF7F2]/60 rounded-2xl group-hover:bg-[#FAF7F2] transition-colors">
                      <img 
                        src={encodeURI(occ.image)} 
                        alt={occ.title} 
                        className="w-full h-full object-contain drop-shadow-sm group-hover:scale-108 transition-transform duration-300 select-none" 
                      />
                    </div>

                    {/* Card Footer: Icon + Title */}
                    <div className="flex items-center justify-center gap-2.5 pt-3.5 border-t border-[#F2E7D5]">
                      <span className={`shrink-0 transition-colors ${isSelected ? 'text-[#C58A19]' : 'text-[#8C6D62] group-hover:text-[#C58A19]'}`}>
                        {occ.icon}
                      </span>
                      <span className="font-serif text-base sm:text-lg md:text-xl font-bold tracking-tight text-[#4A2116] text-center">
                        {occ.title}
                      </span>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* STEP 2: Cake Shape & Layers (3 in a row with 9 3D Cake Shape Models) */}
        {currentStep === 2 && (
          <div className="animate-fadeIn">
            {/* Section Heading with Left Gold Bar */}
            <div className="flex items-start gap-3 mb-6 sm:mb-8">
              <div className="w-1 sm:w-1.5 h-10 sm:h-12 bg-[#C58A19] rounded-full shrink-0 mt-0.5" />
              <div>
                <h2 className="font-serif text-xl sm:text-2xl md:text-[26px] font-bold text-[#4A2116]">
                  {isAr ? 'شكل الكيك والطبقات' : 'Cake Shape & Layers'}
                </h2>
                <p className="font-poppins text-xs sm:text-sm text-[#8C6D62] mt-0.5">
                  {isAr ? 'اختر شكل الكيك وهيكل الطبقات المناسب لمركز احتفالك.' : 'Select the tier structure and shape for your celebration centerpiece.'}
                </p>
              </div>
            </div>

            {/* 9 Cake Shape & Layer Cards Grid: 3 in a row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-7 md:gap-8 mb-10">
              {shapeLayerOptions.map((item) => {
                const isSelected = selectedShapeLayer === item.id;

                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      setSelectedShapeLayer(item.id);
                      setSelectedShape(item.shape);
                      setSelectedLayers(item.layers);
                    }}
                    className={`bg-white rounded-3xl border-2 transition-all duration-300 cursor-pointer p-5 sm:p-6 flex flex-col justify-between relative group hover:-translate-y-1.5 hover:shadow-xl ${
                      isSelected 
                        ? 'border-[#C58A19] shadow-lg ring-4 ring-[#C58A19]/15 bg-[#FFFDF9]' 
                        : 'border-[#EEDECB] hover:border-[#C58A19]/70 shadow-sm'
                    }`}
                  >
                    {/* Checkmark Badge on Top Right when selected */}
                    {isSelected && (
                      <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#C58A19] text-white flex items-center justify-center shadow-md z-10 animate-scaleIn">
                        <Check className="w-4 h-4 stroke-[2.5]" />
                      </div>
                    )}

                    {/* Cake Shape Image Box */}
                    <div className="w-full aspect-[4/3] sm:h-52 md:h-60 flex items-center justify-center overflow-hidden mb-4 p-3 bg-[#FAF7F2]/60 rounded-2xl group-hover:bg-[#FAF7F2] transition-colors">
                      <img 
                        src={encodeURI(item.image)} 
                        alt={item.title} 
                        className="w-full h-full object-contain drop-shadow-sm group-hover:scale-108 transition-transform duration-300 select-none" 
                      />
                    </div>

                    {/* Card Footer: Title, Description & Tier Price Badge */}
                    <div className="pt-3.5 border-t border-[#F2E7D5] text-center flex flex-col items-center">
                      <h3 className="font-serif text-base sm:text-lg md:text-xl font-bold tracking-tight text-[#4A2116] mb-1">
                        {item.title}
                      </h3>
                      <p className="font-poppins text-xs text-[#8C6D62] leading-relaxed line-clamp-2 mb-3">
                        {item.desc}
                      </p>
                      <span className="inline-block text-xs font-bold text-[#C58A19] bg-[#FFF8EE] px-3.5 py-1 rounded-full border border-[#EACD9B]/60 shadow-xs">
                        {item.extraPrice > 0 ? `+AED ${item.extraPrice}` : (isAr ? 'السعر الأساسي' : 'Included in Base Price')}
                      </span>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3: Size */}
        {currentStep === 3 && (
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

        {/* STEP 4: Flavors */}
        {currentStep === 4 && (
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

        {/* STEP 5: Design & Toppings */}
        {currentStep === 5 && (
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

        {/* STEP 6: Message */}
        {currentStep === 6 && (
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
                  <div className="font-serif not-italic font-bold text-lg sm:text-xl text-[#C58A19] tracking-wide break-words max-w-full">
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

        {/* STEP 7: Review & Order */}
        {currentStep === 7 && (
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
                  <div className="sm:col-span-2 p-3.5 rounded-xl bg-[#FFFBF5] border border-[#F5EBDD] flex items-center justify-between">
                    <div>
                      <span className="text-[#8C6D62] block mb-1 font-medium">{isAr ? 'الشكل وهيكل الطبقات' : 'Shape & Tier Structure'}</span>
                      <span className="font-semibold text-[#4A2116] text-sm">{selectedShapeLayerItem?.title}</span>
                      <p className="text-[11px] text-[#8C6D62] mt-0.5">{selectedShapeLayerItem?.desc}</p>
                    </div>
                    {selectedShapeLayerItem?.image && (
                      <div className="w-14 h-14 rounded-xl bg-white border border-[#E5C583]/60 flex items-center justify-center shrink-0 p-1">
                        <img src={encodeURI(selectedShapeLayerItem.image)} alt="" className="w-full h-full object-contain select-none" />
                      </div>
                    )}
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
                      <span className="font-serif not-italic font-bold text-[#C58A19] text-base">"{cakeMessage}"</span>
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
                      <span className="font-poppins font-bold text-xl text-[#C58A19] tabular-nums lining-nums">AED {totalPrice}</span>
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
                      `Hello Lebanese Dream Bakery! I would like to order a custom cake:\nOccasion: ${occasions.find(o => o.id === selectedOccasion)?.title}\nShape & Layers: ${selectedShapeLayerItem?.title}\nSize: ${sizeOptions.find(s => s.id === selectedSize)?.title}\nFlavor: ${spongeOptions.find(s => s.id === selectedSponge)?.name}\nMessage: "${cakeMessage}"\nTotal: AED ${totalPrice}`
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
              <span className="font-poppins font-bold text-base text-[#C58A19] tabular-nums lining-nums">
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