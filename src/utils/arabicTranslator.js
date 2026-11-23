// =======================================================
// Lebanese Dream Bakery - Automatic Arabic Translator Engine
// Automatically translates English product specifications
// (Title, Flavor, Servings, Description) into natural Arabic
// for the customer-facing frontend.
// =======================================================

const hasArabic = (text) => /[\u0600-\u06FF]/.test(text || '');

// --- 1. FLAVOR & FILLINGS DICTIONARY ---
const FLAVOR_DICTIONARY = [
  // Compound expressions (longer matches first)
  { en: /belgian chocolate & french vanilla/i, ar: 'شوكولاتة بلجيكية وفانيلا فرنسية' },
  { en: /belgian chocolate ganache/i, ar: 'جناش الشوكولاتة البلجيكية' },
  { en: /dark chocolate ganache/i, ar: 'جناش الشوكولاتة الداكنة' },
  { en: /white chocolate ganache/i, ar: 'جناش الشوكولاتة البيضاء' },
  { en: /salted caramel/i, ar: 'كراميل مملح' },
  { en: /red velvet with cream cheese/i, ar: 'ريد فيلفيت بكريمة الجبن' },
  { en: /red velvet & cream cheese/i, ar: 'ريد فيلفيت وكريمة الجبن' },
  { en: /red velvet cream cheese/i, ar: 'ريد فيلفيت بكريمة الجبن' },
  { en: /red velvet/i, ar: 'ريد فيلفيت' },
  { en: /cream cheese/i, ar: 'كريمة الجبن' },
  { en: /pistachio & kunafa crunch/i, ar: 'فستق حلبي وكنافة مقرمشة' },
  { en: /pistachio kunafa crunch/i, ar: 'فستق وكنافة مقرمشة' },
  { en: /pistachio cream/i, ar: 'كريمة الفستق الحلبي' },
  { en: /pistachio/i, ar: 'فستق حلبي' },
  { en: /lotus biscoff cream/i, ar: 'كريمة لوتس بسكوف' },
  { en: /lotus biscoff/i, ar: 'لوتس بسكوف' },
  { en: /lotus/i, ar: 'لوتس' },
  { en: /nutella hazelnut/i, ar: 'نوتيلا وبندق' },
  { en: /nutella/i, ar: 'نوتيلا' },
  { en: /ferrero rocher/i, ar: 'فيريرو روشيه' },
  { en: /kinder/i, ar: 'كيندر' },
  { en: /oreo crunch/i, ar: 'أوريو مقرمش' },
  { en: /oreo cream/i, ar: 'كريمة أوريو' },
  { en: /oreo/i, ar: 'أوريو' },
  { en: /french vanilla/i, ar: 'فانيلا فرنسية' },
  { en: /madagascar vanilla/i, ar: 'فانيلا مدغشقر' },
  { en: /vanilla sponge/i, ar: 'كيك إسفنجي بالفانيلا' },
  { en: /chocolate sponge/i, ar: 'كيك إسفنجي بالشوكولاتة' },
  { en: /belgian chocolate/i, ar: 'شوكولاتة بلجيكية' },
  { en: /dark chocolate mousse/i, ar: 'موس الشوكولاتة الداكنة' },
  { en: /dark chocolate/i, ar: 'شوكولاتة داكنة' },
  { en: /white chocolate raspberry/i, ar: 'شوكولاتة بيضاء وتوت العليق' },
  { en: /white chocolate/i, ar: 'شوكولاتة بيضاء' },
  { en: /milk chocolate/i, ar: 'شوكولاتة بالحليب' },
  { en: /chocolate fudge/i, ar: 'فدج الشوكولاتة الغني' },
  { en: /chocolate truffle/i, ar: 'ترافل الشوكولاتة' },
  { en: /chocolate/i, ar: 'شوكولاتة' },
  { en: /fresh strawberry cream/i, ar: 'كريمة الفراولة الطازجة' },
  { en: /strawberry & cream/i, ar: 'فراولة وكريمة' },
  { en: /strawberry/i, ar: 'فراولة' },
  { en: /mango passionfruit/i, ar: 'مانجو وباشن فروت' },
  { en: /mango/i, ar: 'مانجو' },
  { en: /passion fruit|passionfruit/i, ar: 'باشن فروت' },
  { en: /blueberry/i, ar: 'توت أزرق' },
  { en: /raspberry/i, ar: 'توت العليق' },
  { en: /mixed berries/i, ar: 'توت مشكل' },
  { en: /lemon curd/i, ar: 'كرد الليمون المنعش' },
  { en: /lemon/i, ar: 'ليمون' },
  { en: /coconut/i, ar: 'جوز الهند' },
  { en: /hazelnut praline/i, ar: 'برالين البندق' },
  { en: /hazelnut/i, ar: 'بندق' },
  { en: /almond/i, ar: 'لوز' },
  { en: /walnut/i, ar: 'عين الجمل (جوز)' },
  { en: /rose water/i, ar: 'ماء الورد' },
  { en: /orange blossom/i, ar: 'ماء الزهر' },
  { en: /cardamom/i, ar: 'هيل' },
  { en: /saffron/i, ar: 'زعفران' },
  { en: /tiramisu & espresso/i, ar: 'تيراميسو وإسبريسو' },
  { en: /tiramisu/i, ar: 'تيراميسو' },
  { en: /coffee/i, ar: 'قهوة' },
  { en: /espresso/i, ar: 'إسبريسو' },
  { en: /caramel drizzle/i, ar: 'صلصة الكراميل' },
  { en: /caramel/i, ar: 'كراميل' },
  { en: /vanilla/i, ar: 'فانيلا' },
  { en: /buttercream/i, ar: 'كريمة الزبدة' },
  { en: /ganache/i, ar: 'جناش' }
];

// --- 2. TITLE & VOCABULARY DICTIONARY ---
const TITLE_DICTIONARY = [
  // Full titles & common matches
  { en: /^royal cake$/i, ar: 'كيك ملكي فاخر' },
  { en: /^royal wedding cake$/i, ar: 'كيك زفاف ملكي' },
  { en: /^classic wedding cake$/i, ar: 'كيك زفاف كلاسيكي' },
  { en: /^novelty wedding cake$/i, ar: 'كيك زفاف مبتكر ومميز' },
  { en: /^bride to be cake$/i, ar: 'كيك حفلة توديع العزوبية' },
  { en: /^engagement cake$/i, ar: 'كيك احتفال الخطوبة' },
  { en: /^engagement celebration cake$/i, ar: 'كيك احتفال الخطوبة الفاخر' },
  { en: /^groom'?s? cake$/i, ar: 'كيك العريس الفاخر' },
  { en: /^corporate cake$/i, ar: 'كيك الشركات والفعاليات' },
  { en: /^corporate cookies$/i, ar: 'كوكيز الشركات الفاخر' },
  { en: /^cupcakes with logo$/i, ar: 'كب كيك بشعار الشركة' },
  { en: /^graduation cake$/i, ar: 'كيك التخرج والنجاح' },
  { en: /^birthday cake$/i, ar: 'كيك عيد ميلاد فاخر' },
  { en: /^celebration cake$/i, ar: 'كيك مناسبات واحتفالات' },
  { en: /^chocolate cake$/i, ar: 'كيك الشوكولاتة الفاخر' },
  { en: /^red velvet cake$/i, ar: 'كيك ريد فيلفيت الفاخر' },
  { en: /^pistachio cake$/i, ar: 'كيك الفستق الحلبي' },
  { en: /^3-tier wedding cake$/i, ar: 'كيك زفاف 3 طبقات ملكي' },
  { en: /^2-tier celebration cake$/i, ar: 'كيك احتفال من طبقتين' }
];

const WORDS_MAP = {
  royal: 'ملكي',
  golden: 'ذهبي',
  gold: 'ذهبي',
  silver: 'فضي',
  luxury: 'فاخر',
  luxurious: 'فاخر',
  classic: 'كلاسيكي',
  modern: 'عصري',
  vintage: 'كلاسيكي عتيق',
  elegant: 'أنيق',
  cake: 'كيك',
  cakes: 'كيك',
  wedding: 'الأعراس والزفاف',
  novelty: 'مبتكر ومميز',
  bride: 'العروس',
  groom: 'العريس',
  grooms: 'العريس',
  engagement: 'الخطوبة',
  corporate: 'الشركات',
  cookies: 'كوكيز',
  cookie: 'كوكيز',
  cupcake: 'كب كيك',
  cupcakes: 'كب كيك',
  logo: 'شعار',
  graduation: 'التخرج',
  birthday: 'عيد ميلاد',
  celebration: 'احتفال',
  anniversary: 'ذكرى سنوية',
  baby: 'مواليد',
  shower: 'حفلة استقبال',
  kids: 'أطفال',
  boys: 'أولاد',
  girls: 'بنات',
  ladies: 'سيدات',
  guys: 'رجال',
  photo: 'صورة',
  tier: 'طبقات',
  tiered: 'متعدد الطبقات',
  chocolate: 'شوكولاتة',
  vanilla: 'فانيلا',
  pistachio: 'فستق',
  caramel: 'كراميل',
  velvet: 'فيلفيت',
  red: 'ريد',
  white: 'أبيض',
  ivory: 'عاجي',
  pink: 'وردي',
  black: 'أسود',
  blue: 'أزرق',
  floral: 'زهور',
  flower: 'ورد',
  flowers: 'زهور',
  pearl: 'لؤلؤ',
  pearls: 'لآلئ',
  rose: 'روز',
  truffle: 'ترافل',
  cream: 'كريمة',
  sponge: 'إسفنجي',
  drip: 'دريب سائل',
  delight: 'بهجة',
  dream: 'دريم (حلم)',
  crown: 'تاج',
  tuxedo: 'تكسيدو',
  ring: 'خاتم',
  rings: 'خواتم',
  love: 'حب',
  sweet: 'حلوى',
  custom: 'مخصص',
  bespoke: 'مصمم خصيصاً',
  masterpiece: 'تحفة فنية'
};

// --- 3. SERVINGS PARSER & TRANSLATOR ---
export function translateTiersToArabic(tiers) {
  if (!tiers) return '';
  if (hasArabic(tiers)) return tiers;

  const clean = tiers.trim().toLowerCase();
  if (/^1\s*tiers?$/i.test(clean) || /single\s*tier/i.test(clean)) return 'طبقة واحدة (دور واحد)';
  if (/^2\s*tiers?$/i.test(clean) || /two\s*tiers?/i.test(clean) || /double\s*tier/i.test(clean)) return 'طبقتان (دوران)';
  if (/^3\s*tiers?$/i.test(clean) || /three\s*tiers?/i.test(clean)) return '3 طبقات (3 أدوار)';
  if (/^4\s*tiers?$/i.test(clean) || /four\s*tiers?/i.test(clean)) return '4 طبقات (4 أدوار)';
  if (/^5\s*tiers?$/i.test(clean) || /five\s*tiers?/i.test(clean)) return '5 طبقات (5 أدوار)';

  const match = clean.match(/(\d+)\s*tiers?/i);
  if (match) return `${match[1]} طبقات`;
  return `${tiers} طبقات`;
}

export function translateWeightToArabic(weight) {
  if (!weight) return '';
  if (hasArabic(weight)) return weight;

  return weight
    .replace(/\bkg\b|\bkgs\b|\bkilos?\b/gi, 'كغ')
    .replace(/\bg\b|\bgrams?\b/gi, 'غرام')
    .trim();
}

export function translateServingsToArabic(servings) {
  if (!servings) return '';
  if (hasArabic(servings)) return servings;

  const clean = servings.trim().toLowerCase();

  // Match range like "15-20 servings", "10 - 15 people", "20-25 slices", "15 to 20 guests"
  const rangeMatch = clean.match(/(\d+)\s*[-to]+\s*(\d+)/i);
  if (rangeMatch) {
    const min = rangeMatch[1];
    const max = rangeMatch[2];
    if (clean.includes('slice') || clean.includes('piece')) {
      return `${min} إلى ${max} قطعة`;
    }
    return `من ${min} إلى ${max} شخص`;
  }

  // Match single count like "15 servings", "20 guests", "50+ people"
  const singleMatch = clean.match(/(\d+\+?)/);
  if (singleMatch) {
    const num = singleMatch[1];
    if (clean.includes('slice') || clean.includes('piece')) {
      return `${num} قطعة`;
    }
    return `${num} شخص / ضيف`;
  }

  if (clean.includes('serving') || clean.includes('person') || clean.includes('guest')) {
    return 'حسب الطلب والضيوف';
  }

  return servings;
}

// --- 4. FLAVOR TRANSLATOR ---
export function translateFlavorToArabic(flavor) {
  if (!flavor) return '';
  if (hasArabic(flavor)) return flavor;

  let text = flavor.trim();

  // 1. Direct dictionary matches
  for (const item of FLAVOR_DICTIONARY) {
    if (item.en.test(text)) {
      text = text.replace(item.en, item.ar);
    }
  }

  // 2. Handle conjunctions
  text = text
    .replace(/\s*&\s*/g, ' و ')
    .replace(/\s+and\s+/gi, ' و ')
    .replace(/\s+with\s+/gi, ' مع ')
    .replace(/\s*,\s*/g, '، ')
    .replace(/\s*\/\s*/g, ' / ')
    .replace(/\s+/g, ' ')
    .trim();

  return text;
}

// --- 5. TITLE TRANSLATOR ---
export function translateTitleToArabic(title) {
  if (!title) return '';
  if (hasArabic(title)) return title;

  const cleanTitle = title.trim();

  // 1. Check exact title patterns
  for (const item of TITLE_DICTIONARY) {
    if (item.en.test(cleanTitle)) {
      return item.ar;
    }
  }

  // 2. Word-by-word intelligent substitution
  const words = cleanTitle.split(/[\s-]+/);
  const translatedWords = [];

  for (let i = 0; i < words.length; i++) {
    const w = words[i].toLowerCase().replace(/[^\w]/g, '');
    if (WORDS_MAP[w]) {
      translatedWords.push(WORDS_MAP[w]);
    } else {
      // Keep number or capitalization if not recognized
      translatedWords.push(words[i]);
    }
  }

  // If word replacement yielded mostly Arabic, arrange gracefully
  if (translatedWords.length > 0) {
    // If "كيك" appears, ensure it flows well at the beginning
    const cakeIdx = translatedWords.indexOf('كيك');
    if (cakeIdx > 0) {
      translatedWords.splice(cakeIdx, 1);
      translatedWords.unshift('كيك');
    } else if (!translatedWords.includes('كيك') && cleanTitle.toLowerCase().includes('cake')) {
      translatedWords.unshift('كيك');
    }
    return translatedWords.join(' ');
  }

  return cleanTitle;
}

// --- 6. DESCRIPTION TRANSLATOR ---
const SENTENCE_DICTIONARY = [
  {
    en: /timeless tiered white and ivory wedding cakes with royal icing and delicate sugar flora/i,
    ar: 'تحفة كيك زفاف كلاسيكية ملكية متعددة الطبقات مصممة بعجينة السكر العاجية الفاخرة، واللؤلؤ السكري، وتفاصيل الزهور المصنوعة يدوياً.'
  },
  {
    en: /creative, whimsical, and personalized bespoke wedding cake designs/i,
    ar: 'تصاميم كيك زفاف مبتكرة ومخصصة تدمج اللمسات الفنية الساحرة والتفاصيل الرومانسية الراقية.'
  },
  {
    en: /chic bridal shower and bachelorette party cakes with pink florals and champagne accents/i,
    ar: 'كيكات أنيقة ومميزة لحفلات توديع العزوبية بلمسات الورود الوردية الناعمة وتفاصيل الاحتفال الراقية.'
  },
  {
    en: /romantic engagement cakes adorned with edible gold rings and floral wreaths/i,
    ar: 'كيكات خطوبة استثنائية مزينة بمجسمات خواتم ذهبية فاخرة ولمسات الزهور الملكية للاحتفال بقصة حبكم.'
  },
  {
    en: /tailored tuxedo, hobby, and masculine celebration cakes for the groom/i,
    ar: 'كيكات راقية ومخصصة للعريس بتفاصيل البدلة الرسمية والتكسيدو ولمسات الفخامة المصنوعة بعناية.'
  },
  {
    en: /executive event cakes & branded desserts/i,
    ar: 'كيك احتفالي فاخر للشركات والفعاليات الرسمية بتصاميم أفق المدينة وشعارات العلامات التجارية.'
  },
  {
    en: /(?:artisanal|lebanese) cookies with precision edible logo prints for PR and brand activations/i,
    ar: 'كوكيز فاخر ومطبوع بشعار الشركة بدقة عالية ومخبوز طازجاً لتقديم ضيافة استثنائية في فعالياتكم.'
  },
  {
    en: /gourmet French buttercream cupcakes crowned with customized corporate logos/i,
    ar: 'كب كيك فاخر بكريمة الزبدة الفرنسية ومزين بشعارات الشركات القابلة للأكل للمؤتمرات والاحتفالات.'
  },
  {
    en: /detailed description of cake design, sponge layers, fillings, and custom handcrafted toppings/i,
    ar: 'كيك فاخر مخبوز طازجاً بعناية فائقة، بطبقات إسفنجية طرية وحشوات غنية بنكهات بلجيكية أصلية، ومزين يدوياً بأرقى اللمسات الفنية.'
  },
  {
    en: /baked to order/i,
    ar: 'مخبوز طازجاً حسب الطلب'
  },
  {
    en: /freshly baked/i,
    ar: 'طازج من الفرن'
  },
  {
    en: /pure butter/i,
    ar: 'زبدة نقية 100%'
  },
  {
    en: /belgian chocolate/i,
    ar: 'شوكولاتة بلجيكية فاخرة'
  },
  {
    en: /chilled delivery/i,
    ar: 'توصيل مبرد وسريع'
  }
];

export function translateDescriptionToArabic(description) {
  if (!description) return '';
  if (hasArabic(description)) return description;

  let text = description.trim();

  // Try matching full phrases / sentences
  for (const item of SENTENCE_DICTIONARY) {
    if (item.en.test(text)) {
      text = text.replace(item.en, item.ar);
    }
  }

  // Also replace key flavor names inside descriptions
  for (const item of FLAVOR_DICTIONARY) {
    if (item.en.test(text)) {
      text = text.replace(item.en, item.ar);
    }
  }

  // If after replacements no Arabic is found, provide a luxury bakery Arabic summary
  if (!hasArabic(text)) {
    return `تحفة كيك فاخرة من مخبز دريم اللبناني، مخبوزة طازجة حسب الطلب بمكونات فاخرة، مع حشوات غنية وطبقات إسفنجية شهية وتفاصيل تزيينية يدوية متقنة تناسب جميع احتفالاتكم ومناسباتكم الخاصة. (${text})`;
  }

  return text;
}
