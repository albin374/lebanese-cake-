import React, { useState } from 'react';
import { 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Cake, 
  Heart, 
  GraduationCap, 
  Sparkles, 
  Scale, 
  Users, 
  UtensilsCrossed, 
  Layers,
  ShoppingBag, 
  MessageCircle, 
  HelpCircle
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
  const [selectedShapeLayer, setSelectedShapeLayer] = useState('round-1-tier');
  const [selectedLayers, setSelectedLayers] = useState('1-tier');
  const [selectedShape, setSelectedShape] = useState('round');
  const [selectedSize, setSelectedSize] = useState('2kg');
  const [selectedSponge, setSelectedSponge] = useState('vanilla-flower-beans');
  const [selectedFilling, setSelectedFilling] = useState(null);
  const [selectedToppings, setSelectedToppings] = useState(['gold-leaf', 'candles']);
  const [cakeMessage, setCakeMessage] = useState('Happy Birthday!');
  const [messageStyle, setMessageStyle] = useState('piped-gold');
  const [specialInstructions, setSpecialInstructions] = useState('');

  // 8 Steps Definition (Clean sequence)
  const steps = [
    { number: 1, id: 'shape-layers', label: isAr ? 'الشكل والطبقات' : 'Shape and Layers' },
    { number: 2, id: 'size', label: isAr ? 'الحجم وعدد الضيوف' : 'Size and Portions' },
    { number: 3, id: 'sponge', label: isAr ? 'اختر الإسفنجة' : 'Choose Sponge' },
    { number: 4, id: 'filling', label: isAr ? 'اختر الحشوة' : 'Choose Gourmet Filling' },
    { number: 5, id: 'cake-type', label: isAr ? 'نوع الكيك والمناسبة' : 'Cake Type and Occasion' },
    { number: 6, id: 'toppings', label: isAr ? 'التصميم واللمسات' : 'Design and Toppings' },
    { number: 7, id: 'message', label: isAr ? 'رسالة الإهداء' : 'Custom Inscription' },
    { number: 8, id: 'review', label: isAr ? 'المراجعة والتأكيد' : 'Review Your Cake' },
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
      desc: isAr ? 'طبقتان دائريتان متناسقتان للأعراس وحفلات الخطوبة' : 'Two stacked circular tiers for weddings and engagements',
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
      desc: isAr ? 'شكل قلب رومانسي مميز لذكرى الزواج والمناسبات الخاصة' : 'Romantic sculpted heart silhouette for anniversaries and proposals',
      extraPrice: 40,
      image: '/customize/shapes/herat cake .png'
    },
    {
      id: 'rectangular-1-tier',
      title: isAr ? 'كيك مستطيل للعائلات والشركات' : 'Celebration Rectangle (Sheet)',
      shape: 'rectangle',
      layers: '1-tier',
      desc: isAr ? 'مساحة واسعة وسهلة التقطيع للمناسبات الكبيرة والشركات' : 'Spacious sheet cake optimized for clean serving and grand crowds',
      extraPrice: 60,
      image: '/customize/shapes/recatanglur .png'
    }
  ];

  // 6 Size & Guest Count Options (3 in a row layout)
  const sizeOptions = [
    { 
      id: '1kg', 
      title: isAr ? '1 كجم (6-8 حصص)' : '1 kg (6-8 servings)', 
      basePrice: 180, 
      servings: isAr ? '6-8 ضيوف' : '6-8 Guests',
      diameter: isAr ? 'قطر 16 سم' : '16 cm Diameter',
      desc: isAr ? 'قطر 16 سم • احتفال مصغر وأعياد ميلاد حميمة' : '16cm diameter • Perfect for intimate family birthdays',
      image: '/customize/shapes/round cake.png'
    },
    { 
      id: '2kg', 
      title: isAr ? '2 كجم (12-15 حصة)' : '2 kg (12-15 servings)', 
      basePrice: 290, 
      servings: isAr ? '12-15 ضيفاً' : '12-15 Guests',
      diameter: isAr ? 'قطر 22 سم' : '22 cm Diameter',
      desc: isAr ? 'قطر 22 سم • الخيار الأكثر طلباً لمختلف المناسبات' : '22cm diameter • Most Popular choice for all celebrations', 
      popular: true,
      image: '/customize/shapes/round cake.png'
    },
    { 
      id: '3kg', 
      title: isAr ? '3 كجم (20-25 حصة)' : '3 kg (20-25 servings)', 
      basePrice: 420, 
      servings: isAr ? '20-25 ضيفاً' : '20-25 Guests',
      diameter: isAr ? 'قطر 26 سم' : '26 cm Diameter',
      desc: isAr ? 'قطر 26 سم • حفلات الأصدقاء واحتفالات التخرج' : '26cm diameter • Family feasts and joyful party gatherings',
      image: '/customize/shapes/round tall cake.png'
    },
    { 
      id: '4kg', 
      title: isAr ? '4 كجم (30-35 حصة)' : '4 kg (30-35 servings)', 
      basePrice: 540, 
      servings: isAr ? '30-35 ضيفاً' : '30-35 Guests',
      diameter: isAr ? 'قطر 28 سم' : '28 cm Diameter',
      desc: isAr ? 'قطر 28 سم • مناسبات كبرى وتجمعات عائلية واسعة' : '28cm diameter • Large milestone events and gatherings',
      image: '/customize/shapes/round tall cake.png'
    },
    { 
      id: '5kg', 
      title: isAr ? '5 كجم (40-50 حصة)' : '5 kg (40-50 servings)', 
      basePrice: 680, 
      servings: isAr ? '40-50 ضيفاً' : '40-50 Guests',
      diameter: isAr ? 'طبقتان فاخرتان' : 'Two-Tier Structure',
      desc: isAr ? 'طبقتان فاخرتان للمناسبات الكبرى وحفلات الشركات' : 'Generous two-tier feast for corporate and luxury parties',
      image: '/customize/shapes/Two-Tier round Cake.png'
    },
    { 
      id: 'grand', 
      title: isAr ? 'حجم ملكي (60-80 حصة)' : 'Grand Gala (60-80 servings)', 
      basePrice: 1150, 
      servings: isAr ? '60-80 ضيفاً' : '60-80 Guests',
      diameter: isAr ? '3 طبقات ملكية' : 'Three-Tier Royal Centerpiece',
      desc: isAr ? '3 طبقات ملكية شاهقة لحفلات الزفاف والاستقبال الفخم' : 'Spectacular three-tier centerpiece for royal wedding banquets',
      image: '/customize/shapes/Three-Tier round  Cake.png'
    },
  ];

  // 9 Sponge Flavor Options matching user provided slice cutout images
  const spongeOptions = [
    {
      id: 'vanilla-flower-beans',
      name: isAr ? 'فانيليا مدغشقر والزهور الطبيعية' : 'Vanilla Layer with Flower and Beans',
      desc: isAr ? 'إسفنجة فانيليا نقية مع حبوب الفانيليا العطرية وكريمة خفيفة' : 'Tender golden sponge infused with natural aromatic vanilla beans',
      image: '/customize/sponge/Vanilla Layer Cake with Flower and Beans.png'
    },
    {
      id: 'glossy-chocolate-4layer',
      name: isAr ? 'شوكولاتة بلجيكية فاخرة من 4 طبقات' : 'Glossy Four-Layer Chocolate',
      desc: isAr ? 'طبقات شوكولاتة كاكاو 70% داكنة مع غاناش بلجيكي لامع' : 'Decadent 70% dark cocoa sponge with rich glossy ganache layers',
      image: '/customize/sponge/Glossy Four-Layer Chocolate Cake Slice.png'
    },
    {
      id: 'red-velvet',
      name: isAr ? 'ريد فيلفيت كلاسيكي فاخر' : 'Classic Red Velvet',
      desc: isAr ? 'طبقات مخملية حمراء غنية مع كريمة الجبن الناعمة المتوازنة' : 'Crimson cocoa velvet layers paired with silky cream cheese frosting',
      image: '/customize/sponge/Red Velvet Cake Slice Cutout.png'
    },
    {
      id: 'layered-carrot-walnut',
      name: isAr ? 'كيك الجزر مع الجوز المحمص' : 'Layered Carrot Cake with Walnuts',
      desc: isAr ? 'جزر طازج مع قرفة دافئة وجوز محمص مقرمش وكريمة فاخرة' : 'Spiced moist carrot sponge packed with toasted walnuts and cream frosting',
      image: '/customize/sponge/Layered Carrot Cake with Walnuts.png'
    },
    {
      id: 'marbled-choco-chip',
      name: isAr ? 'ماربلد تشوكليت تشيب' : 'Marbled Chocolate Chip',
      desc: isAr ? 'مزيج رخامي مميز بين الفانيليا والكاكاو مع رقائق الشوكولاتة' : 'Artisanal vanilla and dark cocoa marble swirl with melted chocolate chips',
      image: '/customize/sponge/Marbled Chocolate Chip Cake Slice.png'
    },
    {
      id: 'rainbow-sprinkle',
      name: isAr ? 'رينبو سبرينكلز للاحتفالات' : 'Rainbow Sprinkle Layer Cake',
      desc: isAr ? 'إسفنجة فانيليا ملونة مبهجة مفعمة بحبيبات السكر المقرمشة' : 'Celebration funfetti sponge baked with vibrant rainbow sugar sprinkles',
      image: '/customize/sponge/Rainbow Sprinkle Layer Cake Slice.png'
    },
    {
      id: 'vanilla-chocolate-duo',
      name: isAr ? 'مزدوج الفانيليا والشوكولاتة' : 'Vanilla Chocolate Layered Duo',
      desc: isAr ? 'تناغم مثالي بين طبقات الفانيليا الذهبية والشوكولاتة الغنية' : 'Alternating layers of delicate vanilla sponge and rich cocoa fudge',
      image: '/customize/sponge/Vanilla Chocolate Layered Cake Slice.png'
    },
    {
      id: 'blue-white-velvet',
      name: isAr ? 'بلو آند وايت لير كيك' : 'Blue and White Layered Velvet',
      desc: isAr ? 'طبقات زرقاء وبيضاء ساحرة بنكهة التوت البري والفانيليا' : 'Striking sapphire and ivory layers with subtle blueberry cream notes',
      image: '/customize/sponge/Blue and White Layered Cake Slice.png'
    },
    {
      id: 'colorful-pastel-vanilla',
      name: isAr ? 'فانيليا الباستيل الملونة' : 'Colorful Vanilla Layer Cake',
      desc: isAr ? 'طبقات ألوان باستيل ناعمة بنكهة الفانيليا العضوية الفرنسية' : 'Dreamy multicolored pastel sponge layers with French vanilla essence',
      image: '/customize/sponge/Colorful Vanilla Layer Cake Slice.png'
    }
  ];

  // 16 Gourmet Filling Options matching user reference (no 'bowl' in names, aligned)
  const fillingOptions = [
    {
      id: 'pineapple-cream-filling',
      name: isAr ? 'حشوة كريمة الأناناس' : 'Pineapple cream filling',
      image: '/customize/filling/Pineapple Cream Bowl with Leaves.png'
    },
    {
      id: 'lotus-cream-filling',
      name: isAr ? 'حشوة كريمة اللوتس' : 'Lotus cream filling',
      image: '/customize/filling/Lotus Biscuit Cream Bowl.png'
    },
    {
      id: 'red-cherry-cream-filling',
      name: isAr ? 'حشوة كريمة الكرز الأحمر' : 'Red cherry cream filling',
      image: '/customize/filling/Pink Cream Bowl with Cherries.png'
    },
    {
      id: 'peach-cream-filling',
      name: isAr ? 'حشوة كريمة الخوخ' : 'Peach cream filling',
      image: '/customize/filling/Peach Cream Swirl with Fresh Peach.png'
    },
    {
      id: 'mocca-cream-filling',
      name: isAr ? 'حشوة كريمة الموكا' : 'Mocca cream filling',
      image: '/customize/filling/Mocha Cream Swirl with Coffee Beans.png'
    },
    {
      id: 'lemon-cream-filling',
      name: isAr ? 'حشوة كريمة الليمون' : 'Lemon cream filling',
      image: '/customize/filling/Lemon Cream Mousse with Fresh Citrus.png'
    },
    {
      id: 'cheese-cream',
      name: isAr ? 'كريمة الجبن' : 'Cheese cream',
      image: '/customize/filling/Whipped Cream Bowl with White Chocolate Cubes.png'
    },
    {
      id: 'toffee-caramel-filling',
      name: isAr ? 'حشوة كراميل التوفي' : 'Toffee caramel filling',
      image: '/customize/filling/Glossy Caramel Cream Bowl with Cubes.png'
    },
    {
      id: 'oreos-and-cream-filling',
      name: isAr ? 'حشوة أوريو آند كريم' : "Oreo's and cream filling",
      image: '/customize/filling/Cookies and Cream Whipped Cream Bowl.png'
    },
    {
      id: 'nutella-filling',
      name: isAr ? 'حشوة النوتيلا' : 'Nutella filling',
      image: '/customize/filling/Hazelnut Chocolate Cream Bowl.png'
    },
    {
      id: 'mango-filling',
      name: isAr ? 'حشوة المانجو' : 'Mango filling',
      image: '/customize/filling/Mango Cream Swirl with Fresh Cubes.png'
    },
    {
      id: 'caramelized-hazelnut-praline-filling',
      name: isAr ? 'حشوة برالين البندق المكرمل' : 'Caramelized hazelnut praline filling',
      image: '/customize/filling/Glossy Hazelnut Cream Swirl.png'
    },
    {
      id: 'chocolate-ganache-filling',
      name: isAr ? 'حشوة غاناش الشوكولاتة' : 'Chocolate ganache filling',
      image: '/customize/filling/Glossy Chocolate Mousse Bowl with Chunks.png'
    },
    {
      id: 'blueberry-filling',
      name: isAr ? 'حشوة التوت الأزرق' : 'Blueberry filling',
      image: '/customize/filling/Blueberry Yogurt Swirl Bowl.png'
    },
    {
      id: 'raspberry-filling',
      name: isAr ? 'حشوة توت العليق' : 'Raspberry filling',
      image: '/customize/filling/Raspberry Cream Swirl Bowl.png'
    },
    {
      id: 'fresh-whipped-cream-plain',
      name: isAr ? 'كريمة مخفوقة طازجة سادة' : 'Fresh whipped cream plain',
      image: '/customize/filling/Creamy Whipped Cream Swirl in Bowl.png'
    }
  ];

  // Base Sponge Cutouts Map (public/customize/base/)
  const spongeBaseMap = {
    'vanilla-flower-beans': '/customize/base/Vanilla Layer with Flower and Beans base.png',
    'glossy-chocolate-4layer': '/customize/base/chocolate-sponge-bottom.png',
    'red-velvet': '/customize/base/Classic Red Velvet base.png',
    'layered-carrot-walnut': '/customize/base/Layered Carrot Cake with Walnuts base.png',
    'marbled-choco-chip': '/customize/base/Marbled Chocolate Chip base.png',
    'rainbow-sprinkle': '/customize/base/Rainbow Sprinkle Layer Cake base.png',
    'vanilla-chocolate-duo': '/customize/base/Vanilla Chocolate Layered Duo base.png',
    'blue-white-velvet': '/customize/base/Blue and White Layered Velvet base .png',
    'colorful-pastel-vanilla': '/customize/base/Colorful Vanilla Layer Cake Base.png'
  };

  // Chocolate Cake Gourmet Frosting Map (public/customize/chocalte froesting/)
  const fillingFrostingMap = {
    'pineapple-cream-filling': '/customize/chocalte froesting/Chocolate Cake with pineapple  Frosting.png',
    'lotus-cream-filling': '/customize/chocalte froesting/Chocolate Cake with Lotus cream froseting.png',
    'red-cherry-cream-filling': '/customize/chocalte froesting/Chocolate Cake with Red cherry cream Frosting.png',
    'peach-cream-filling': '/customize/chocalte froesting/Chocolate Cake with Peach Cream Frosting.png',
    'mocca-cream-filling': '/customize/chocalte froesting/Chocolate Cake with Mocha Frosted .png',
    'lemon-cream-filling': '/customize/chocalte froesting/Chocolate Cake with Lemon froesting.png',
    'cheese-cream': '/customize/chocalte froesting/Chocolate Cake with Cheese  froesting.png',
    'toffee-caramel-filling': '/customize/chocalte froesting/Chocolate Cake with Toffee Caramel froesting.png',
    'oreos-and-cream-filling': '/customize/chocalte froesting/Chocolate Cake with oreo froesting .png',
    'nutella-filling': '/customize/chocalte froesting/Chocolate Cake with nutella foresting .png',
    'mango-filling': '/customize/chocalte froesting/Chocolate  Cake with mago foresting.png',
    'caramelized-hazelnut-praline-filling': '/customize/chocalte froesting/Chocolate Cakewith Hazelnut forsting.png',
    'chocolate-ganache-filling': '/customize/chocalte froesting/Chocolate  Cake  with Ganache froesting .png',
    'blueberry-filling': '/customize/chocalte froesting/chocalte  Cake with  Blueberry Cream foresting .png',
    'raspberry-filling': '/customize/chocalte froesting/chocalte  Cake with Raspberry Cream foresting.png',
    'fresh-whipped-cream-plain': '/customize/chocalte froesting/chocalte cream with white froesting .png'
  };

  // Design & Toppings
  const toppingOptions = [
    { id: 'gold-leaf', name: isAr ? 'ورق الذهب عيار 24 الصالح للأكل' : '24K Edible Gold Leaf Accents', price: 50, desc: isAr ? 'لمسات ذهبية ملكية فاخرة على أطراف الكيك' : 'Hand-applied pure edible 24K gold foil for royal elegance' },
    { id: 'fresh-flowers', name: isAr ? 'ورود طبيعية منسقة يدوياً' : 'Fresh Organic Floral Cascade', price: 80, desc: isAr ? 'ورود وبراعم منتقاة بعناية للأعراس والاحتفال' : 'Handcrafted arrangement of edible organic roses and eucalyptus' },
    { id: 'chocolate-drip', name: isAr ? 'صوص شوكولاتة أو كراميل مقطر' : 'Artisanal Caramel / Chocolate Drip', price: 30, desc: isAr ? 'تقطير احترافي ناعم على حواف الكيك' : 'Glossy, warm Belgian ganache drip cascading over the tiers' },
    { id: 'wild-berries', name: isAr ? 'توت وتوت بري وفراولة طازجة' : 'Gourmet Wild Seasonal Berries', price: 40, desc: isAr ? 'توت أحمر وتوت أزرق طازج يومياً' : 'Sweet raspberries, blackberries, and glazed garden strawberries' },
    { id: 'macarons', name: isAr ? 'ماكرون فرنسي فاخر (6 حبات)' : 'Handcrafted French Macarons (6 pcs)', price: 45, desc: isAr ? 'حبات ماكرون مقرمشة محشوة بالغاناش' : 'Crisp Parisian almond shells filled with pistachio and chocolate' },
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
    if (currentStep === 1) return isAr ? 'التالي: اختر الحجم' : 'Next: Choose Size';
    if (currentStep === 2) return isAr ? 'التالي: نكهة الإسفنجة' : 'Next: Choose Sponge';
    if (currentStep === 3) return isAr ? 'التالي: حشوة الكيك' : 'Next: Choose Filling';
    if (currentStep === 4) return isAr ? 'التالي: نوع الكيك' : 'Next: Cake Type';
    if (currentStep === 5) return isAr ? 'التالي: التصميم والإضافات' : 'Next: Design and Toppings';
    if (currentStep === 6) return isAr ? 'التالي: كتابة الرسالة' : 'Next: Custom Message';
    if (currentStep === 7) return isAr ? 'التالي: مراجعة الطلب' : 'Next: Review Order';
    return isAr ? 'تأكيد وإضافة للحقيبة' : 'Add to Bag and Confirm';
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
        flavor: `${spongeOptions.find(s => s.id === selectedSponge)?.name || 'Signature Vanilla'}${selectedFilling ? ` with ${fillingOptions.find(f => f.id === selectedFilling)?.name}` : ''}`,
        sponge: spongeOptions.find(s => s.id === selectedSponge)?.name,
        filling: fillingOptions.find(f => f.id === selectedFilling)?.name || (isAr ? 'حشوة كلاسيكية فاخرة' : 'Signature Bakery Filling'),
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

  const isChocolateSponge = selectedSponge === 'glossy-chocolate-4layer';

  // Frosting Layer Map for Other Sponge Bases (public/customize/froesting layer/ & /pineapply foresting layer.png)
  const otherBaseFrostingLayerMap = {
    'pineapple-cream-filling': '/pineapply foresting layer.png',
    'lotus-cream-filling': '/customize/froesting layer/lotus forsting layer.png',
    'red-cherry-cream-filling': '/customize/froesting layer/Red cherry froesting.png',
    'peach-cream-filling': '/customize/froesting layer/peach forestng layer.png',
    'mocca-cream-filling': '/customize/froesting layer/mocha froesting layer .png',
    'lemon-cream-filling': '/customize/froesting layer/Lemon froesting.png',
    'cheese-cream': '/customize/froesting layer/cheese froesting.png',
    'toffee-caramel-filling': '/customize/froesting layer/toffie carmel froesting.png',
    'oreos-and-cream-filling': '/customize/froesting layer/oreo froesting.png',
    'nutella-filling': '/customize/froesting layer/nutella froesting layer.png',
    'mango-filling': '/customize/froesting layer/Mango foresting .png',
    'caramelized-hazelnut-praline-filling': '/customize/froesting layer/hazelenut froesting layer.png',
    'chocolate-ganache-filling': '/customize/froesting layer/Ganache froesting layer.png',
    'blueberry-filling': '/customize/froesting layer/Blueberry Frosting layer.png',
    'raspberry-filling': '/customize/froesting layer/rasbery Frosting layer.png',
    'fresh-whipped-cream-plain': '/customize/froesting layer/white  Frosting layer.png'
  };

  const selectedFrostingLayer = selectedFilling ? otherBaseFrostingLayerMap[selectedFilling] : null;

  // Dimensions and bounds of each sponge base (in 1774 x 887 canvas)
  const spongeMeta = {
    'classic-red-velvet': { width: 1589, center: 886.5, rim: 815 },
    'colorful-pastel-vanilla': { width: 1476, center: 884.0, rim: 820 },
    'vanilla-flower-beans': { width: 1550, center: 874.0, rim: 805 },
    'layered-carrot-walnut': { width: 1560, center: 882.0, rim: 810 },
    'marbled-chocolate-chip': { width: 1503, center: 884.5, rim: 815 },
    'rainbow-sprinkle': { width: 1561, center: 872.5, rim: 815 },
    'blue-white-velvet': { width: 1540, center: 880.0, rim: 815 },
    'vanilla-choco-duo': { width: 1552, center: 887.0, rim: 815 },
  };

  // Dimensions and bounds of each frosting swirl layer (in 1774 x 887 canvas)
  const frostingLayerMeta = {
    'pineapple-cream-filling': { swirlWidth: 1672, centerBottom: 842 },
    'lotus-cream-filling': { swirlWidth: 1744, centerBottom: 886 },
    'red-cherry-cream-filling': { swirlWidth: 1709, centerBottom: 867 },
    'peach-cream-filling': { swirlWidth: 1704, centerBottom: 857 },
    'mocca-cream-filling': { swirlWidth: 1744, centerBottom: 854 },
    'lemon-cream-filling': { swirlWidth: 1755, centerBottom: 872 },
    'cheese-cream': { swirlWidth: 1720, centerBottom: 875 },
    'toffee-caramel-filling': { swirlWidth: 1750, centerBottom: 878 },
    'oreos-and-cream-filling': { swirlWidth: 1737, centerBottom: 874 },
    'nutella-filling': { swirlWidth: 1718, centerBottom: 857 },
    'mango-filling': { swirlWidth: 1678, centerBottom: 874 },
    'caramelized-hazelnut-praline-filling': { swirlWidth: 1736, centerBottom: 871 },
    'chocolate-ganache-filling': { swirlWidth: 1683, centerBottom: 856 },
    'blueberry-filling': { swirlWidth: 1682, centerBottom: 865 },
    'raspberry-filling': { swirlWidth: 1719, centerBottom: 875 },
    'fresh-whipped-cream-plain': { swirlWidth: 1659, centerBottom: 850 },
  };

  // Dynamically compute positioning and scaling for any sponge + frosting combination
  // so the swirl fits flush without overhanging the sides or leaving gaps
  const getFrostingLayerStyle = () => {
    const sp = spongeMeta[selectedSponge] || { width: 1550, center: 884, rim: 814 };
    const fr = (selectedFilling && frostingLayerMeta[selectedFilling]) || { swirlWidth: 1700, centerBottom: 865 };

    const s = sp.width / fr.swirlWidth;
    const renderedW = 1774 * s;
    const renderedH = 887 * s;
    const leftPx = sp.center - (renderedW / 2);
    const topPx = Math.max(0, sp.rim - (fr.centerBottom * s) + 6);

    return {
      top: `${((topPx / 1112) * 100).toFixed(2)}%`,
      left: `${((leftPx / 1774) * 100).toFixed(2)}%`,
      width: `${((renderedW / 1774) * 100).toFixed(2)}%`,
      height: `${((renderedH / 1112) * 100).toFixed(2)}%`,
    };
  };

  // Should we show chocolate 2-tier assembled cake? (Step 5+ and Chocolate Sponge)
  const showChocolateTopLayer = currentStep >= 5 && isChocolateSponge;

  // Should we show gourmet frosting layer placed on top of other bases? (Step >= 4, Not Chocolate, Any Filling selected)
  const showFrostingLayerOnOtherBase = currentStep >= 4 && !isChocolateSponge && !!selectedFrostingLayer;

  // Determine current preview data based on step and selections
  const getPreviewData = () => {
    if (currentStep === 1) {
      return {
        image: selectedShapeLayerItem?.image || '/customize/shapes/round cake.png',
        stage: isAr ? 'معاينة الشكل والطبقات' : 'Shape & Tier Preview',
        title: selectedShapeLayerItem?.title || '',
        badge: selectedShapeLayerItem?.extraPrice > 0 ? `+AED ${selectedShapeLayerItem.extraPrice}` : (isAr ? 'السعر الأساسي' : 'Included in Base')
      };
    }
    if (currentStep === 2) {
      const sz = sizeOptions.find(s => s.id === selectedSize) || sizeOptions[1];
      return {
        image: sz.image || selectedShapeLayerItem?.image,
        stage: isAr ? 'معاينة الحجم والحصص' : 'Size & Servings Preview',
        title: sz.title,
        badge: sz.servings
      };
    }
    if (currentStep === 3) {
      const sp = spongeOptions.find(s => s.id === selectedSponge) || spongeOptions[0];
      return {
        image: spongeBaseMap[selectedSponge] || sp.image,
        stage: isAr ? 'معاينة قاعدة الإسفنجة' : 'Sponge Base Preview',
        title: sp.name,
        badge: isAr ? 'إسفنجة طازجة' : 'Baked Base'
      };
    }
    if (currentStep === 4) {
      const fi = fillingOptions.find(f => f.id === selectedFilling);
      const sp = spongeOptions.find(s => s.id === selectedSponge) || spongeOptions[0];

      let previewImg = spongeBaseMap[selectedSponge];
      if (isChocolateSponge && fi) {
        previewImg = fillingFrostingMap[selectedFilling] || spongeBaseMap[selectedSponge];
      } else if (!isChocolateSponge && selectedFrostingLayer) {
        previewImg = selectedFrostingLayer;
      }

      return {
        image: previewImg,
        stage: isAr ? 'اختر حشوة الكيك' : 'Choose Gourmet Filling',
        title: fi ? fi.name : sp.name,
        badge: fi ? (isAr ? 'حشوة مختارة' : 'Filling Selected') : (isAr ? 'قاعدة الإسفنجة' : 'Sponge Base')
      };
    }
    if (currentStep === 5) {
      const occ = occasions.find(o => o.id === selectedOccasion) || occasions[0];
      let previewImg = spongeBaseMap[selectedSponge];
      if (isChocolateSponge) {
        previewImg = (selectedFilling && fillingFrostingMap[selectedFilling]) || spongeBaseMap[selectedSponge];
      } else if (selectedFrostingLayer) {
        previewImg = selectedFrostingLayer;
      }

      return {
        image: previewImg,
        stage: isAr ? 'نوع الكيك والمناسبة' : 'Cake Type and Occasion',
        title: `${occ.title}`,
        badge: isChocolateSponge
          ? (isAr ? 'الطبقة العلوية مثبتة' : 'Top Layer Placed')
          : (selectedFrostingLayer ? (isAr ? 'حشوة الكريمة مثبتة' : 'Gourmet Layer Assembled') : (isAr ? 'تصميم مخصص' : 'Bespoke Theme'))
      };
    }
    if (currentStep === 6) {
      let previewImg = spongeBaseMap[selectedSponge];
      if (isChocolateSponge) {
        previewImg = (selectedFilling && fillingFrostingMap[selectedFilling]) || spongeBaseMap[selectedSponge];
      } else if (selectedFrostingLayer) {
        previewImg = selectedFrostingLayer;
      }

      return {
        image: previewImg,
        stage: isAr ? 'التزيين واللمسات الفاخرة' : 'Gourmet Toppings & Accents',
        title: isAr ? `${selectedToppings.length} إضافات تزيين` : `${selectedToppings.length} Accents Selected`,
        badge: toppingsPrice > 0 ? `+AED ${toppingsPrice}` : (isAr ? 'مجاني' : 'Complimentary')
      };
    }
    if (currentStep === 7) {
      let previewImg = spongeBaseMap[selectedSponge];
      if (isChocolateSponge) {
        previewImg = (selectedFilling && fillingFrostingMap[selectedFilling]) || spongeBaseMap[selectedSponge];
      } else if (selectedFrostingLayer) {
        previewImg = selectedFrostingLayer;
      }

      return {
        image: previewImg,
        stage: isAr ? 'معاينة رسالة الإهداء' : 'Live Inscription Plaque',
        title: cakeMessage ? `"${cakeMessage}"` : (isAr ? 'رسالتك هنا' : 'Your Inscription'),
        badge: messageStyle === 'acrylic-topper' ? '+AED 35' : (isAr ? 'مجاني' : 'Complimentary')
      };
    }
    // Step 8: Review
    let reviewImg = spongeBaseMap[selectedSponge];
    if (isChocolateSponge) {
      reviewImg = (selectedFilling && fillingFrostingMap[selectedFilling]) || spongeBaseMap[selectedSponge];
    } else if (selectedFrostingLayer) {
      reviewImg = selectedFrostingLayer;
    }

    return {
      image: reviewImg,
      stage: isAr ? 'التحفة النهائية المكتملة' : 'Masterpiece Preview',
      title: `${occasions.find(o => o.id === selectedOccasion)?.title} (${sizeOptions.find(s => s.id === selectedSize)?.title})`,
      badge: `AED ${totalPrice}`
    };
  };

  const previewData = getPreviewData();

  return (
    <div className="min-h-screen bg-[#FFFDF8] text-[#4A2116] py-6 sm:py-10 px-3 sm:px-6 lg:px-10 relative overflow-hidden transition-colors selection:bg-[#C58A19] selection:text-white w-full max-w-full">
      <div className="max-w-7xl mx-auto relative z-10">

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
        <div className="text-center mb-6 sm:mb-8">
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

          <div className="flex items-center justify-center gap-3 sm:gap-6">
            <div className="h-[1.5px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-[#C58A19]" />
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#4A2116] tracking-tight">
              {isAr ? 'صمّم كيكتك الخاصة' : 'Customize Your Cake'}
            </h1>
            <div className="h-[1.5px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-[#C58A19]" />
          </div>

          <p className="font-poppins text-xs sm:text-sm text-[#7D5B50] mt-1.5 max-w-md mx-auto">
            {isAr ? 'اصنع كعكة فريدة تعبّر عن ذوقك وتناسب مناسبتك السعيدة' : "Create a cake that's uniquely yours"}
          </p>
        </div>

        {/* Streamlined Step Header (Focuses strictly on the active step) */}
        <div className="mb-6 bg-white border border-[#EEDECB] rounded-2xl p-3.5 sm:p-4 shadow-xs">
          <div className="flex items-center justify-between gap-3">
            
            {/* Previous Step Button */}
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handlePrev}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#E5C583] text-[#7D5B50] hover:text-[#C58A19] hover:bg-[#FFF9F0] text-xs font-semibold transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
                <span className="hidden sm:inline">{isAr ? 'السابق' : 'Previous'}</span>
              </button>
            ) : (
              <div className="w-8 sm:w-20" />
            )}

            {/* Active Step Indicator Pill & Title */}
            <div className="flex flex-col items-center text-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FFF8EE] border border-[#EACD9B] text-[#C58A19] text-xs font-bold mb-1">
                <span>{isAr ? `الخطوة ${currentStep} من 8` : `Step ${currentStep} of 8`}</span>
              </div>
              <h2 className="font-serif text-base sm:text-lg md:text-xl font-bold text-[#4A2116]">
                {steps.find(s => s.number === currentStep)?.label}
              </h2>
            </div>

            {/* Next Step Button */}
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#C58A19] hover:bg-[#A87413] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <span className="hidden sm:inline">{currentStep === 8 ? (isAr ? 'إنهاء' : 'Finish') : (isAr ? 'التالي' : 'Next')}</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </button>

          </div>

          {/* Progress Bar (Gold gradient) */}
          <div className="w-full bg-[#F3E8D8] h-2 rounded-full mt-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-[#C58A19] to-[#E5A832] h-full rounded-full transition-all duration-300 ease-out"
              style={{ width: `${(currentStep / 8) * 100}%` }}
            />
          </div>

          {/* Compact Step Dots (1 to 8) without cluttered labels */}
          <div className="flex items-center justify-between mt-2.5 px-1 sm:px-2">
            {steps.map((st) => {
              const isCurrent = currentStep === st.number;
              const isCompleted = currentStep > st.number;

              return (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => setCurrentStep(st.number)}
                  className={`flex items-center justify-center transition-all cursor-pointer ${
                    isCurrent
                      ? 'w-6 h-6 rounded-full bg-[#C58A19] text-white font-bold text-xs shadow-xs ring-2 ring-[#C58A19]/30'
                      : isCompleted
                      ? 'w-5 h-5 rounded-full bg-[#4A2116] text-[#E6C783] text-[10px] font-semibold'
                      : 'w-5 h-5 rounded-full bg-[#FAF5EC] border border-[#E5D7C3] text-[#8C6D62] text-[10px] hover:border-[#C58A19]'
                  }`}
                  title={st.label}
                >
                  {isCompleted ? <Check className="w-3 h-3 stroke-[2.5]" /> : st.number}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main 2-Column Studio Grid: Left is Sticky Live Cake Preview Studio, Right is the Selected Step */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start mb-10">
          
          {/* LEFT COLUMN: Atelier Live Cake Studio Showcase (Sticky on desktop) */}
          <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-20 z-20">
            <div className="bg-gradient-to-b from-[#FFFDF9] via-[#FAF6EE] to-[#F5ECE0] border-2 border-[#E5C583]/70 rounded-3xl p-4 sm:p-5 shadow-xl shadow-[#4A2116]/8 relative overflow-hidden transition-all duration-300">
              
              {/* Studio Header Bar */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E8D6B5]">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#FFF9F0] border border-[#E5C583] flex items-center justify-center text-[#C58A19] shadow-xs">
                    <Sparkles className="w-3.5 h-3.5 text-[#C58A19] animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-serif text-sm font-bold text-[#4A2116] leading-tight">
                      {isAr ? 'استوديو الكيك المباشر' : 'Live Cake Studio'}
                    </h3>
                    <p className="text-[10px] text-[#8C6D62]">
                      {previewData.stage}
                    </p>
                  </div>
                </div>

                {/* Live Pulse Badge */}
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/80 border border-[#E5C583]/60 shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span className="w-2 h-2 rounded-full bg-emerald-500 -ml-3.5" />
                  <span className="text-[10px] font-bold text-[#4A2116] tracking-wider uppercase">
                    {isAr ? 'مباشر' : 'Live'}
                  </span>
                </div>
              </div>

              {/* Turntable / Cake Stage Pedestal */}
              <div className="relative w-full aspect-[4/3] min-h-[220px] sm:min-h-[250px] md:min-h-[270px] rounded-2xl bg-[radial-gradient(circle_at_center,_#FFF9EE_0%,_#F7ECE0_65%,_#EBD9C1_100%)] border border-[#E5CFA8] flex items-center justify-center p-3.5 overflow-hidden shadow-inner group">
                
                {/* Soft pedestal glow */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(197,138,25,0.18)_0%,_transparent_70%)] pointer-events-none" />

                {/* Pedestal Ellipse Shadow */}
                <div className="absolute bottom-4 w-3/4 h-7 bg-[#4A2116]/12 rounded-full blur-md -z-0" />

                {/* 1. Chocolate Sponge: When Step >= 5, show frosted cake with top layer placed above */}
                {showChocolateTopLayer ? (
                  <div 
                    className="relative w-full h-full max-h-full max-w-full flex items-center justify-center group-hover:scale-105 transition-transform duration-500 z-10 animate-fadeIn"
                    style={{ aspectRatio: '1774 / 1112' }}
                  >
                    {/* Base Cake with Gourmet Frosting Layer */}
                    <img
                      src={encodeURI((selectedFilling && fillingFrostingMap[selectedFilling]) || spongeBaseMap[selectedSponge])}
                      alt="Base Cake and Gourmet Filling"
                      className="absolute left-0 w-full object-contain drop-shadow-[0_16px_22px_rgba(74,33,22,0.22)] select-none z-10"
                      style={{
                        top: '20.2%',
                        height: '79.8%'
                      }}
                    />

                    {/* Top Chocolate Sponge Layer precisely matched in size to the frosting/base layer (88.5% width, centered) */}
                    <img
                      src="/chocolate-sponge-top.png"
                      alt="Top Cake Sponge Layer"
                      className="absolute object-contain drop-shadow-[0_14px_18px_rgba(74,33,22,0.25)] select-none z-20 pointer-events-none animate-fadeIn"
                      style={{
                        top: '0%',
                        left: '5.75%',
                        width: '88.5%',
                        height: '70.6%'
                      }}
                    />
                  </div>
                ) : showFrostingLayerOnOtherBase ? (
                  /* 2. Other Sponge Bases: When any Gourmet filling chosen, place matching frosting layer correctly on the chosen base */
                  <div 
                    className="relative w-full h-full max-h-full max-w-full flex items-center justify-center group-hover:scale-105 transition-transform duration-500 z-10 animate-fadeIn"
                    style={{ aspectRatio: '1774 / 1112' }}
                  >
                    {/* Chosen Sponge Base (e.g. Classic Red Velvet base) */}
                    <img
                      src={encodeURI(spongeBaseMap[selectedSponge])}
                      alt="Chosen Sponge Base"
                      className="absolute left-0 w-full object-contain drop-shadow-[0_16px_22px_rgba(74,33,22,0.22)] select-none z-10"
                      style={{
                        top: '20.2%',
                        height: '79.8%'
                      }}
                    />

                    {/* Gourmet Filling Layer positioned flush on top of the chosen base without gap or overhang */}
                    <img
                      src={encodeURI(selectedFrostingLayer)}
                      alt="Gourmet Filling Layer"
                      className="absolute object-contain drop-shadow-[0_14px_18px_rgba(74,33,22,0.25)] select-none z-20 pointer-events-none animate-fadeIn"
                      style={getFrostingLayerStyle()}
                    />
                  </div>
                ) : (
                  /* 3. Single Cutout Image (Shape, Size, Sponge Base, Chocolate Frosting, etc.) */
                  <img
                    key={previewData.image}
                    src={encodeURI(previewData.image)}
                    alt={previewData.title}
                    className="max-h-full max-w-full object-contain drop-shadow-[0_16px_22px_rgba(74,33,22,0.22)] group-hover:scale-105 transition-transform duration-500 select-none relative z-10 animate-fadeIn"
                  />
                )}

                {/* Inscription Plaque Overlay (Steps 7 & 8) */}
                {(currentStep === 7 || currentStep === 8) && cakeMessage && (
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 w-[90%] max-w-xs animate-scaleIn">
                    <div className="bg-white/95 backdrop-blur-md border-2 border-[#C58A19] rounded-xl px-3 py-1.5 shadow-lg text-center">
                      <span className="text-[9px] uppercase font-bold text-[#8C6D62] tracking-wider block">
                        {messageStyle === 'acrylic-topper' 
                          ? (isAr ? 'توبر أكريليك ذهبي' : 'Gold Acrylic Topper') 
                          : (isAr ? 'كتابة شكر وإهداء' : 'Hand-Piped Inscription')}
                      </span>
                      <span className="font-serif font-bold text-xs sm:text-sm text-[#C58A19] block truncate">
                        "{cakeMessage}"
                      </span>
                    </div>
                  </div>
                )}

                {/* Stage Tag Ribbon at top */}
                <div className="absolute top-2.5 left-2.5 rtl:left-auto rtl:right-2.5 z-20">
                  <span className="text-[10px] font-bold text-[#4A2116] bg-white/95 backdrop-blur-xs border border-[#E5C583] px-2.5 py-0.5 rounded-full shadow-xs">
                    {previewData.badge}
                  </span>
                </div>
              </div>

              {/* Active Selection Title */}
              <div className="mt-3 text-center">
                <h4 className="font-serif font-bold text-sm sm:text-base text-[#4A2116] line-clamp-1">
                  {previewData.title}
                </h4>
              </div>

              {/* Quick Recipe Specs Pills */}
              <div className="grid grid-cols-2 gap-1.5 mt-2.5 text-[11px]">
                <div className="bg-white/80 border border-[#EEDECB] rounded-xl p-2 flex items-center gap-1.5 truncate">
                  <Layers className="w-3.5 h-3.5 text-[#C58A19] shrink-0" />
                  <span className="text-[#4A2116] font-medium truncate">{selectedShapeLayerItem?.title}</span>
                </div>
                <div className="bg-white/80 border border-[#EEDECB] rounded-xl p-2 flex items-center gap-1.5 truncate">
                  <Scale className="w-3.5 h-3.5 text-[#C58A19] shrink-0" />
                  <span className="text-[#4A2116] font-medium truncate">{sizeOptions.find(s => s.id === selectedSize)?.title}</span>
                </div>
                <div className="bg-white/80 border border-[#EEDECB] rounded-xl p-2 flex items-center gap-1.5 truncate">
                  <Cake className="w-3.5 h-3.5 text-[#C58A19] shrink-0" />
                  <span className="text-[#4A2116] font-medium truncate">{spongeOptions.find(s => s.id === selectedSponge)?.name}</span>
                </div>
                <div className="bg-white/80 border border-[#EEDECB] rounded-xl p-2 flex items-center gap-1.5 truncate">
                  <UtensilsCrossed className="w-3.5 h-3.5 text-[#C58A19] shrink-0" />
                  <span className="text-[#4A2116] font-medium truncate">
                    {fillingOptions.find(f => f.id === selectedFilling)?.name || (isAr ? 'اختر الحشوة' : 'Choose Filling')}
                  </span>
                </div>
              </div>

              {/* Live Total & Quick Next Action */}
              <div className="mt-3.5 pt-3 border-t border-[#E8D6B5] flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#8C6D62] tracking-wider block">
                    {isAr ? 'الإجمالي التقديري' : 'Estimated Total'}
                  </span>
                  <span className="font-poppins font-bold text-lg text-[#C58A19] lining-nums tabular-nums">
                    AED {totalPrice}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center gap-1.5 bg-[#C58A19] hover:bg-[#A87413] text-white text-xs font-semibold px-4 py-2 rounded-full shadow-md transition-all cursor-pointer group"
                >
                  <span>{currentStep === 8 ? (isAr ? 'تأكيد الطلب' : 'Confirm Order') : (isAr ? 'الخطوة التالية' : 'Next Step')}</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform" />
                </button>
              </div>

            </div>
          </div>

          {/* RIGHT COLUMN: Only the Selected Step Options */}
          <div className="lg:col-span-7 xl:col-span-8">

            {/* STEP 1: Shape and Layers */}
            {currentStep === 1 && (
              <div className="animate-fadeIn">
                <div className="flex items-start gap-3 mb-6">
                  <div className="w-1.5 h-10 bg-[#C58A19] rounded-full shrink-0 mt-0.5" />
                  <div>
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#4A2116]">
                      {isAr ? 'شكل الكيك والطبقات' : 'Cake Shape and Layers'}
                    </h2>
                    <p className="font-poppins text-xs sm:text-sm text-[#8C6D62] mt-0.5">
                      {isAr ? 'اختر شكل الكيك وهيكل الطبقات المناسب لمركز احتفالك.' : 'Select the tier structure and shape for your celebration centerpiece.'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mb-8">
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
                        className={`bg-white rounded-3xl border-2 transition-all duration-300 cursor-pointer p-4 sm:p-5 flex flex-col justify-between relative group hover:-translate-y-1 hover:shadow-xl ${
                          isSelected 
                            ? 'border-[#C58A19] shadow-lg ring-4 ring-[#C58A19]/15 bg-[#FFFDF9]' 
                            : 'border-[#EEDECB] hover:border-[#C58A19]/70 shadow-sm'
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute top-3 right-3 rtl:right-auto rtl:left-3 w-7 h-7 rounded-full bg-[#C58A19] text-white flex items-center justify-center shadow-md z-10 animate-scaleIn">
                            <Check className="w-4 h-4 stroke-[2.5]" />
                          </div>
                        )}

                        <div className="w-full aspect-[4/3] sm:h-44 xl:h-48 flex items-center justify-center overflow-hidden mb-3 p-2 bg-[#FAF7F2]/60 rounded-2xl group-hover:bg-[#FAF7F2] transition-colors">
                          <img 
                            src={encodeURI(item.image)} 
                            alt={item.title} 
                            className="w-full h-full object-contain drop-shadow-sm group-hover:scale-108 transition-transform duration-300 select-none" 
                          />
                        </div>

                        <div className="pt-3 border-t border-[#F2E7D5] text-center flex flex-col items-center">
                          <h3 className="font-serif text-sm sm:text-base font-bold tracking-tight text-[#4A2116] mb-1">
                            {item.title}
                          </h3>
                          <p className="font-poppins text-xs text-[#8C6D62] leading-relaxed line-clamp-2 mb-2.5">
                            {item.desc}
                          </p>
                          <span className="inline-block text-xs font-bold text-[#C58A19] bg-[#FFF8EE] px-3 py-0.5 rounded-full border border-[#EACD9B]/60 shadow-xs">
                            {item.extraPrice > 0 ? `+AED ${item.extraPrice}` : (isAr ? 'السعر الأساسي' : 'Included in Base')}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 2: Size and Portions */}
            {currentStep === 2 && (
              <div className="animate-fadeIn">
                <div className="flex items-start gap-3 mb-6">
                  <div className="w-1.5 h-10 bg-[#C58A19] rounded-full shrink-0 mt-0.5" />
                  <div>
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#4A2116]">
                      {isAr ? 'اختر الحجم وعدد الحصص' : 'Select Size and Guest Count'}
                    </h2>
                    <p className="font-poppins text-xs sm:text-sm text-[#8C6D62] mt-0.5">
                      {isAr ? 'نضمن لك حصصاً وافرة ومقادير فاخرة لكل ضيف.' : 'We ensure generous portions baked to perfection.'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mb-8">
                  {sizeOptions.map((sz) => {
                    const isSelected = selectedSize === sz.id;
                    return (
                      <div
                        key={sz.id}
                        onClick={() => setSelectedSize(sz.id)}
                        className={`bg-white rounded-3xl border-2 transition-all duration-300 cursor-pointer p-4 sm:p-5 flex flex-col justify-between relative group hover:-translate-y-1 hover:shadow-xl ${
                          isSelected 
                            ? 'border-[#C58A19] shadow-lg ring-4 ring-[#C58A19]/15 bg-[#FFFDF9]' 
                            : 'border-[#EEDECB] hover:border-[#C58A19]/70 shadow-sm'
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute top-3 right-3 rtl:right-auto rtl:left-3 w-7 h-7 rounded-full bg-[#C58A19] text-white flex items-center justify-center shadow-md z-10 animate-scaleIn">
                            <Check className="w-4 h-4 stroke-[2.5]" />
                          </div>
                        )}

                        {sz.popular && (
                          <span className="absolute top-3 left-3 rtl:left-auto rtl:right-3 bg-[#C58A19] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-sm z-10 select-none">
                            {isAr ? 'الأكثر طلباً' : 'Most Popular'}
                          </span>
                        )}

                        <div className="w-full aspect-[4/3] sm:h-44 xl:h-48 flex items-center justify-center overflow-hidden mb-3 p-2 bg-[#FAF7F2]/60 rounded-2xl group-hover:bg-[#FAF7F2] transition-colors relative">
                          <img 
                            src={encodeURI(sz.image)} 
                            alt={sz.title} 
                            className={`w-full h-full object-contain drop-shadow-sm group-hover:scale-108 transition-transform duration-300 select-none ${
                              sz.id === '1kg' ? 'scale-75' : 
                              sz.id === '2kg' ? 'scale-85' : 
                              sz.id === '3kg' ? 'scale-95' : 
                              sz.id === '4kg' ? 'scale-100' : 
                              sz.id === '5kg' ? 'scale-100' : 'scale-105'
                            }`} 
                          />
                          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-xs border border-[#E5C583]/70 px-3 py-0.5 rounded-full shadow-xs flex items-center gap-1.5 whitespace-nowrap">
                            <Users className="w-3 h-3 text-[#C58A19]" />
                            <span className="font-poppins font-semibold text-xs text-[#4A2116] lining-nums tabular-nums">
                              {sz.servings}
                            </span>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-[#F2E7D5] text-center flex flex-col items-center">
                          <h3 className="font-serif text-sm sm:text-base font-bold tracking-tight text-[#4A2116] mb-1">
                            {sz.title}
                          </h3>
                          <p className="font-poppins text-xs text-[#8C6D62] leading-relaxed line-clamp-2 mb-2.5">
                            {sz.desc}
                          </p>
                          <span className="inline-block text-xs font-bold text-[#C58A19] bg-[#FFF8EE] px-3.5 py-0.5 rounded-full border border-[#EACD9B]/60 shadow-xs lining-nums tabular-nums">
                            AED {sz.basePrice}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 3: Choose Sponge (9 Sponge Cutouts, live preview shows Base image from /customize/base/) */}
            {currentStep === 3 && (
              <div className="animate-fadeIn">
                <div className="flex items-start gap-3 mb-6">
                  <div className="w-1.5 h-10 bg-[#C58A19] rounded-full shrink-0 mt-0.5" />
                  <div>
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#4A2116]">
                      {isAr ? 'اختر نكهة الإسفنجة' : 'Choose Sponge'}
                    </h2>
                    <p className="font-poppins text-xs sm:text-sm text-[#8C6D62] mt-0.5">
                      {isAr 
                        ? 'مخبوزة بأجود أنواع الشوكولاتة البلجيكية، الفانيليا التاهيتية والفستق الفاخر.' 
                        : 'Mastercrafted with Belgian chocolate, Tahitian vanilla, and Dubai pistachios.'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mb-8">
                  {spongeOptions.map((sp) => {
                    const isSelected = selectedSponge === sp.id;
                    return (
                      <div
                        key={sp.id}
                        onClick={() => {
                          setSelectedSponge(sp.id);
                          setSelectedFilling(null);
                        }}
                        className={`bg-white rounded-3xl border-2 transition-all duration-300 cursor-pointer p-4 sm:p-5 flex flex-col justify-between relative group hover:-translate-y-1 hover:shadow-xl ${
                          isSelected 
                            ? 'border-[#C58A19] shadow-lg ring-4 ring-[#C58A19]/15 bg-[#FFFDF9]' 
                            : 'border-[#EEDECB] hover:border-[#C58A19]/70 shadow-sm'
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute top-3 right-3 rtl:right-auto rtl:left-3 w-7 h-7 rounded-full bg-[#C58A19] text-white flex items-center justify-center shadow-md z-10 animate-scaleIn">
                            <Check className="w-4 h-4 stroke-[2.5]" />
                          </div>
                        )}

                        <div className="w-full aspect-[4/3] sm:h-44 xl:h-48 flex items-center justify-center overflow-hidden mb-3 p-2 bg-[#FAF7F2]/60 rounded-2xl group-hover:bg-[#FAF7F2] transition-colors">
                          <img 
                            src={encodeURI(sp.image)} 
                            alt={sp.name} 
                            className="w-full h-full object-contain drop-shadow-sm group-hover:scale-108 transition-transform duration-300 select-none" 
                          />
                        </div>

                        <div className="pt-3 border-t border-[#F2E7D5] text-center flex flex-col items-center">
                          <h3 className="font-serif text-sm sm:text-base font-bold tracking-tight text-[#4A2116] mb-1">
                            {sp.name}
                          </h3>
                          <p className="font-poppins text-xs text-[#8C6D62] leading-relaxed line-clamp-2">
                            {sp.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 4: Choose Gourmet Filling (16 Fillings, live preview shows Frosted Chocolate Cake from /customize/chocalte froesting/) */}
            {currentStep === 4 && (
              <div className="animate-fadeIn">
                <div className="flex items-start gap-3 mb-6">
                  <div className="w-1.5 h-10 bg-[#C58A19] rounded-full shrink-0 mt-0.5" />
                  <div>
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#4A2116]">
                      {isAr ? 'اختر حشوة وتغليف الكيك الفاخر' : 'Choose Gourmet Filling'}
                    </h2>
                    <p className="font-poppins text-xs sm:text-sm text-[#8C6D62] mt-0.5">
                      {isAr 
                        ? 'محضرة طازجة يومياً من أجود أنواع الكريمة، الشوكولاتة والفاكهة الطبيعية.' 
                        : 'Artisanal silky fillings handcrafted daily with Belgian chocolates, fresh fruits and organic creams.'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
                  {fillingOptions.map((fi) => {
                    const isSelected = selectedFilling === fi.id;
                    return (
                      <div
                        key={fi.id}
                        onClick={() => setSelectedFilling(fi.id)}
                        className={`bg-white rounded-2xl sm:rounded-3xl border-2 transition-all duration-300 cursor-pointer p-3 sm:p-4 flex flex-col justify-between h-full relative group hover:-translate-y-1 hover:shadow-xl ${
                          isSelected 
                            ? 'border-[#C58A19] shadow-lg ring-4 ring-[#C58A19]/15 bg-[#FFFDF9]' 
                            : 'border-[#EEDECB] hover:border-[#C58A19]/70 shadow-sm'
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute top-2.5 right-2.5 rtl:right-auto rtl:left-2.5 w-6 h-6 rounded-full bg-[#C58A19] text-white flex items-center justify-center shadow-md z-10 animate-scaleIn">
                            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                          </div>
                        )}

                        <div className="w-full h-32 sm:h-36 flex items-center justify-center overflow-hidden mb-2.5 p-2 bg-[#FAF7F2]/60 rounded-xl group-hover:bg-[#FAF7F2] transition-colors">
                          <img 
                            src={encodeURI(fi.image)} 
                            alt={fi.name} 
                            className="w-full h-full object-contain drop-shadow-sm group-hover:scale-108 transition-transform duration-300 select-none" 
                          />
                        </div>

                        <div className="pt-2 border-t border-[#F2E7D5] w-full min-h-[44px] flex items-center justify-center">
                          <div className={`w-full py-1.5 px-2 rounded-xl font-serif text-xs font-bold tracking-tight text-center leading-snug transition-all ${
                            isSelected 
                              ? 'bg-[#C58A19] text-white shadow-xs' 
                              : 'text-[#4A2116] group-hover:text-[#C58A19]'
                          }`}>
                            {fi.name}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 5: Cake Type / Occasion */}
            {currentStep === 5 && (
              <div className="animate-fadeIn">
                <div className="flex items-start gap-3 mb-6">
                  <div className="w-1.5 h-10 bg-[#C58A19] rounded-full shrink-0 mt-0.5" />
                  <div>
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#4A2116]">
                      {isAr ? 'ما هو نوع الكيك والمناسبة؟' : 'What type of cake do you want?'}
                    </h2>
                    <p className="font-poppins text-xs sm:text-sm text-[#8C6D62] mt-0.5">
                      {isAr ? 'اختر مناسبة الكيك الخاصة بك.' : 'Choose the occasion for your celebration cake.'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mb-8">
                  {occasions.map((occ) => {
                    const isSelected = selectedOccasion === occ.id;
                    return (
                      <div
                        key={occ.id}
                        onClick={() => setSelectedOccasion(occ.id)}
                        className={`bg-white rounded-3xl border-2 transition-all duration-300 cursor-pointer p-4 sm:p-5 flex flex-col justify-between relative group hover:-translate-y-1 hover:shadow-xl ${
                          isSelected 
                            ? 'border-[#C58A19] shadow-lg ring-4 ring-[#C58A19]/15 bg-[#FFFDF9]' 
                            : 'border-[#EEDECB] hover:border-[#C58A19]/70 shadow-sm'
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute top-3 right-3 rtl:right-auto rtl:left-3 w-7 h-7 rounded-full bg-[#C58A19] text-white flex items-center justify-center shadow-md z-10 animate-scaleIn">
                            <Check className="w-4 h-4 stroke-[2.5]" />
                          </div>
                        )}

                        <div className="w-full aspect-[4/3] sm:h-44 xl:h-48 flex items-center justify-center overflow-hidden mb-3 p-2 bg-[#FAF7F2]/60 rounded-2xl group-hover:bg-[#FAF7F2] transition-colors">
                          <img 
                            src={encodeURI(occ.image)} 
                            alt={occ.title} 
                            className="w-full h-full object-contain drop-shadow-sm group-hover:scale-108 transition-transform duration-300 select-none" 
                          />
                        </div>

                        <div className="flex items-center justify-center gap-2 pt-3 border-t border-[#F2E7D5]">
                          <span className={`shrink-0 transition-colors ${isSelected ? 'text-[#C58A19]' : 'text-[#8C6D62] group-hover:text-[#C58A19]'}`}>
                            {occ.icon}
                          </span>
                          <span className="font-serif text-sm sm:text-base font-bold tracking-tight text-[#4A2116] text-center">
                            {occ.title}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 6: Finishing & Toppings */}
            {currentStep === 6 && (
              <div className="animate-fadeIn">
                <div className="flex items-start gap-3 mb-6">
                  <div className="w-1.5 h-10 bg-[#C58A19] rounded-full shrink-0 mt-0.5" />
                  <div>
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#4A2116]">
                      {isAr ? 'التصميم الخارجي واللمسات الفاخرة' : 'Finishing, Accents and Toppings'}
                    </h2>
                    <p className="font-poppins text-xs sm:text-sm text-[#8C6D62] mt-0.5">
                      {isAr ? 'اختر الإضافات الملكية لتزيين كعكتك (يمكنك اختيار أكثر من خيار).' : 'Select luxury handcrafted details to crown your celebration cake.'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {toppingOptions.map((top) => {
                    const isSelected = selectedToppings.includes(top.id);
                    return (
                      <div
                        key={top.id}
                        onClick={() => toggleTopping(top.id)}
                        className={`bg-white rounded-2xl border p-4 sm:p-5 cursor-pointer transition-all flex flex-col justify-between hover:shadow-md relative ${
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

            {/* STEP 7: Custom Inscription */}
            {currentStep === 7 && (
              <div className="animate-fadeIn">
                <div className="flex items-start gap-3 mb-6">
                  <div className="w-1.5 h-10 bg-[#C58A19] rounded-full shrink-0 mt-0.5" />
                  <div>
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#4A2116]">
                      {isAr ? 'رسالة الإهداء وكتابة الكيك' : 'Custom Inscription and Message'}
                    </h2>
                    <p className="font-poppins text-xs sm:text-sm text-[#8C6D62] mt-0.5">
                      {isAr ? 'أضف عبارة الاحتفال التي ستُكتب على الكيك أو على لوح السكر الفاخر.' : 'Personalize your cake with a piped message or luxury acrylic topper.'}
                    </p>
                  </div>
                </div>

                <div className="space-y-5 bg-white p-5 sm:p-6 rounded-2xl border border-[#F0E4D2] shadow-xs mb-8">
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
              </div>
            )}

            {/* STEP 8: Review & Confirm */}
            {currentStep === 8 && (
              <div className="animate-fadeIn">
                <div className="flex items-start gap-3 mb-6">
                  <div className="w-1.5 h-10 bg-[#C58A19] rounded-full shrink-0 mt-0.5" />
                  <div>
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#4A2116]">
                      {isAr ? 'مراجعة وتأكيد طلب الكيك المخصص' : 'Review Your Custom Cake'}
                    </h2>
                    <p className="font-poppins text-xs sm:text-sm text-[#8C6D62] mt-0.5">
                      {isAr ? 'تأكد من اختياراتك ومكونات الكعكة قبل تأكيد الطلب.' : 'Review your customized selections and proceed to checkout or concierge WhatsApp.'}
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-[#F0E4D2] p-5 sm:p-6 shadow-sm space-y-5 mb-8">
                  <div className="flex items-center justify-between pb-3.5 border-b border-[#F8F1E6]">
                    <div>
                      <h3 className="font-serif font-bold text-lg sm:text-xl text-[#4A2116]">
                        {occasions.find(o => o.id === selectedOccasion)?.title}
                      </h3>
                      <p className="text-xs text-[#C58A19] font-medium mt-0.5">
                        {isAr ? 'تصميم مخصص حسب الطلب' : 'Bespoke Custom Cake Creation'}
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-[#FFF9F0] border border-[#E5C583]/60 flex items-center justify-center shrink-0">
                      <img 
                        src={encodeURI(occasions.find(o => o.id === selectedOccasion)?.image || '/customize/birthday.png')} 
                        alt="Occasion" 
                        className="w-9 h-9 object-contain select-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-[#FFFBF5] border border-[#F5EBDD] flex items-center justify-between">
                      <div>
                        <span className="text-[#8C6D62] block mb-0.5 font-medium">{isAr ? 'الشكل والطبقات' : 'Shape and Tiers'}</span>
                        <span className="font-semibold text-[#4A2116] text-sm">{selectedShapeLayerItem?.title}</span>
                      </div>
                      {selectedShapeLayerItem?.image && (
                        <div className="w-10 h-10 rounded-lg bg-white border border-[#E5C583]/60 flex items-center justify-center shrink-0 p-1">
                          <img src={encodeURI(selectedShapeLayerItem.image)} alt="" className="w-full h-full object-contain select-none" />
                        </div>
                      )}
                    </div>

                    <div className="p-3 rounded-xl bg-[#FFFBF5] border border-[#F5EBDD] flex items-center justify-between">
                      <div>
                        <span className="text-[#8C6D62] block mb-0.5 font-medium">{isAr ? 'الحجم والضيوف' : 'Size & Servings'}</span>
                        <span className="font-semibold text-[#4A2116] text-sm">{sizeOptions.find(s => s.id === selectedSize)?.title}</span>
                      </div>
                      {sizeOptions.find(s => s.id === selectedSize)?.image && (
                        <div className="w-10 h-10 rounded-lg bg-white border border-[#E5C583]/60 flex items-center justify-center shrink-0 p-1">
                          <img src={encodeURI(sizeOptions.find(s => s.id === selectedSize)?.image)} alt="" className="w-full h-full object-contain select-none" />
                        </div>
                      )}
                    </div>

                    <div className="p-3 rounded-xl bg-[#FFFBF5] border border-[#F5EBDD] flex items-center justify-between">
                      <div>
                        <span className="text-[#8C6D62] block mb-0.5 font-medium">{isAr ? 'نكهة الإسفنجة' : 'Sponge Flavor'}</span>
                        <span className="font-semibold text-[#4A2116] text-sm">{spongeOptions.find(s => s.id === selectedSponge)?.name}</span>
                      </div>
                      {spongeOptions.find(s => s.id === selectedSponge)?.image && (
                        <div className="w-10 h-10 rounded-lg bg-white border border-[#E5C583]/60 flex items-center justify-center shrink-0 p-1">
                          <img src={encodeURI(spongeOptions.find(s => s.id === selectedSponge)?.image)} alt="" className="w-full h-full object-contain select-none" />
                        </div>
                      )}
                    </div>

                    <div className="p-3 rounded-xl bg-[#FFFBF5] border border-[#F5EBDD] flex items-center justify-between">
                      <div>
                        <span className="text-[#8C6D62] block mb-0.5 font-medium">{isAr ? 'حشوة وتغليف الكيك' : 'Frosting & Filling'}</span>
                        <span className="font-semibold text-[#4A2116] text-sm">
                          {fillingOptions.find(f => f.id === selectedFilling)?.name || (isAr ? 'حشوة كلاسيكية فاخرة' : 'Signature Bakery Filling')}
                        </span>
                      </div>
                      {fillingOptions.find(f => f.id === selectedFilling)?.image && (
                        <div className="w-10 h-10 rounded-lg bg-white border border-[#E5C583]/60 flex items-center justify-center shrink-0 p-1">
                          <img src={encodeURI(fillingOptions.find(f => f.id === selectedFilling)?.image)} alt="" className="w-full h-full object-contain select-none" />
                        </div>
                      )}
                    </div>

                    <div className="sm:col-span-2 p-3 rounded-xl bg-[#FFFBF5] border border-[#F5EBDD]">
                      <span className="text-[#8C6D62] block mb-1 font-medium">{isAr ? 'الإضافات والتزيين' : 'Selected Accents'}</span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedToppings.map(topId => {
                          const item = toppingOptions.find(t => t.id === topId);
                          return (
                            <span key={topId} className="px-2.5 py-0.5 rounded-full bg-white border border-[#E5C583] text-[#4A2116] text-[11px] font-medium">
                              {item?.name}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    {cakeMessage && (
                      <div className="sm:col-span-2 p-3 rounded-xl bg-[#FFFBF5] border border-[#F5EBDD]">
                        <span className="text-[#8C6D62] block mb-0.5 font-medium">{isAr ? 'رسالة الكيك المكتوبة' : 'Piped Inscription'}</span>
                        <span className="font-serif not-italic font-bold text-[#C58A19] text-base">"{cakeMessage}"</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2 pt-3 border-t border-[#F8F1E6] text-xs text-[#7D5B50]">
                    <div className="flex justify-between">
                      <span>{isAr ? 'الحجم الأساسي:' : 'Base Cake Size:'}</span>
                      <span className="font-semibold text-[#4A2116]">AED {baseSizePrice}</span>
                    </div>
                    {extraLayerPrice > 0 && (
                      <div className="flex justify-between">
                        <span>{isAr ? 'ترقية الطبقات:' : 'Tier Upgrade:'}</span>
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
                    <div className="pt-2.5 border-t border-[#F8F1E6] flex justify-between items-baseline">
                      <span className="font-bold text-sm text-[#4A2116]">{isAr ? 'المجموع الإجمالي:' : 'Total Price:'}</span>
                      <span className="font-poppins font-bold text-xl text-[#C58A19] tabular-nums lining-nums">AED {totalPrice}</span>
                    </div>
                  </div>

                  <div className="space-y-2.5 pt-3 border-t border-[#F8F1E6]">
                    <button
                      onClick={handleNext}
                      className="w-full flex items-center justify-center gap-2 bg-[#C58A19] hover:bg-[#A87413] text-white font-semibold py-3.5 px-6 rounded-full shadow-md transition-all cursor-pointer text-sm"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>{isAr ? 'إضافة للحقيبة ومتابعة الطلب' : 'Add to Bag and Proceed'}</span>
                    </button>

                    <a
                      href={`https://wa.me/971506063631?text=${encodeURIComponent(
                        `Hello Lebanese Dream Bakery! I would like to order a custom cake:
Occasion: ${occasions.find(o => o.id === selectedOccasion)?.title}
Shape and Layers: ${selectedShapeLayerItem?.title}
Size: ${sizeOptions.find(s => s.id === selectedSize)?.title}
Sponge: ${spongeOptions.find(s => s.id === selectedSponge)?.name}
Filling: ${fillingOptions.find(f => f.id === selectedFilling)?.name || 'Signature Bakery Filling'}
Message: "${cakeMessage}"
Total: AED ${totalPrice}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-semibold py-2.5 px-6 rounded-full shadow-xs transition-all text-xs"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>{isAr ? 'تأكيد مباشر عبر الواتساب' : 'Direct WhatsApp Order (+971 506063631)'}</span>
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Action Footer for Option Pane */}
            <div className="pt-4 border-t border-[#E8D6B5] flex items-center justify-between">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#C58A19] text-[#C58A19] hover:bg-[#FFF9F0] text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
                  <span>{isAr ? 'السابق' : 'Previous Step'}</span>
                </button>
              ) : (
                <div />
              )}

              <div className="flex items-center gap-4">
                <div className="text-right rtl:text-left hidden sm:block">
                  <span className="text-[10px] uppercase font-bold text-[#8C6D62] block">
                    {isAr ? 'السعر التقديري:' : 'Estimated Price:'}
                  </span>
                  <span className="font-poppins font-bold text-base text-[#C58A19] tabular-nums lining-nums">
                    AED {totalPrice}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center gap-2 bg-[#C58A19] hover:bg-[#A87413] text-white font-poppins font-semibold text-xs sm:text-sm px-6 py-2.5 sm:py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer group"
                >
                  <span>{getNextStepLabel()}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
