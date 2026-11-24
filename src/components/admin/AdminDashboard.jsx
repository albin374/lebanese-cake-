import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Mail, 
  LogOut, 
  CheckCircle2, 
  AlertCircle, 
  Search, 
  Plus, 
  X, 
  ChevronDown, 
  RefreshCw, 
  Eye, 
  Trash2, 
  Edit3,
  Menu,
  Layers,
  FolderTree,
  Package,
  FolderPlus,
  Upload,
  Image as ImageIcon,
  Camera,
  Wand2,
  Sparkles,
  Printer,
  Cake,
  Check
} from 'lucide-react';

import { API_BASE, API_SERVER_URL } from '../../config/api';

export const formatImageUrl = (url) => {
  if (!url) return '/Lebanese Dream Bakery Cake Display.png';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    return url;
  }
  if (url.startsWith('/uploads/')) {
    return `${API_SERVER_URL}${url}`;
  }
  return url;
};

export const slugify = (text) => {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const isCustomOrder = (order) => {
  if (!order) return false;
  if (order.order_type === 'custom' || order.order_type === 'customization') return true;
  if (order.is_custom) return true;
  if (order.customization_code) return true;
  
  if (typeof order.cake_type === 'string') {
    const ct = order.cake_type.toLowerCase();
    if (ct.includes('custom') || ct.includes('bespoke') || ct.includes('cust-') || ct.includes('3d') || ct.includes('superhero') || ct.includes('boys design') || ct.includes('girls design')) {
      return true;
    }
  }
  
  let details = order.cake_details;
  if (typeof details === 'string') {
    try { details = JSON.parse(details); } catch (_) {}
  }
  if (details && typeof details === 'object') {
    if (details.customization_code || details.is_custom || details.layers || details.shape || details.theme || details.sponge || details.filling || details.superheroDesign || details.boysDesign || details.girlsDesign) {
      return true;
    }
    if (Array.isArray(details.items)) {
      if (details.items.some(it => 
        it.customization_code || 
        it.layers || 
        it.sponge || 
        it.superheroDesign || 
        it.boysDesign || 
        it.girlsDesign || 
        (typeof it.id === 'string' && it.id.startsWith('CUST-')) ||
        (typeof it.title === 'string' && (it.title.toLowerCase().includes('custom') || it.title.toLowerCase().includes('bespoke')))
      )) {
        return true;
      }
    }
  }
  return false;
};

export const formatOrderDate = (dateVal) => {
  if (!dateVal) return 'Standard Schedule';
  try {
    const d = new Date(dateVal);
    if (isNaN(d.getTime())) return String(dateVal);
    return d.toLocaleDateString('en-AE', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch (_) {
    return String(dateVal);
  }
};

export const formatTimeSlot = (slot) => {
  if (!slot) return 'Standard Delivery';
  return slot.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};

export const formatPaymentStatus = (status, method) => {
  if (!status) return { text: 'Pending', style: 'bg-amber-50 text-amber-700 border-amber-200' };
  const s = String(status).toLowerCase();
  if (s === 'paid') {
    return { text: 'Paid', style: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
  }
  if (s === 'failed' || s === 'cancelled') {
    return { text: s.toUpperCase(), style: 'bg-red-50 text-red-700 border-red-200' };
  }
  if (s === 'cash_on_delivery' || (method && String(method).toLowerCase().includes('cash'))) {
    return { text: 'Cash on Delivery', style: 'bg-blue-50 text-blue-700 border-blue-200' };
  }
  return { 
    text: s.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()), 
    style: 'bg-amber-50 text-amber-700 border-amber-200' 
  };
};

export const WEDDING_SUBCATEGORIES = [
  { 
    id: 'classic-wedding-cakes', 
    slug: 'classic-wedding-cakes',
    name: 'Classic Wedding Cakes', 
    banner: '/Elegant Ivory Wedding Cake Banner.png', 
    image_url: '/Elegant Ivory Wedding Cake Banner.png',
    description: 'Timeless tiered white and ivory wedding cakes with royal icing and delicate sugar flora.',
    parent: 'wedding'
  },
  { 
    id: 'novelty-wedding-cakes', 
    slug: 'novelty-wedding-cakes',
    name: 'Novelty Wedding Cakes', 
    banner: '/Tuxedo Wedding Cake with Embracing Couple.png', 
    image_url: '/Tuxedo Wedding Cake with Embracing Couple.png',
    description: 'Creative, whimsical, and personalized bespoke wedding cake designs.',
    parent: 'wedding'
  },
  { 
    id: 'bride-to-be-cakes', 
    slug: 'bride-to-be-cakes',
    name: 'Bride To Be Cakes', 
    banner: '/Elegant Bride-to-Be Cake Display.png', 
    image_url: '/Elegant Bride-to-Be Cake Display.png',
    description: 'Chic bridal shower and bachelorette party cakes with pink florals and champagne accents.',
    parent: 'wedding'
  },
  { 
    id: 'engagement-cakes', 
    slug: 'engagement-cakes',
    name: 'Engagement Celebration Cakes', 
    banner: '/Elegant Gold Ring Engagement Cake.png', 
    image_url: '/Elegant Gold Ring Engagement Cake.png',
    description: 'Romantic engagement cakes adorned with edible gold rings and floral wreaths.',
    parent: 'wedding'
  },
  { 
    id: 'grooms-cakes', 
    slug: 'grooms-cakes',
    name: 'Grooms Cakes', 
    banner: '/Tuxedo Groom Cake with Top Hat.png', 
    image_url: '/Tuxedo Groom Cake with Top Hat.png',
    description: 'Tailored tuxedo, hobby, and masculine celebration cakes for the groom.',
    parent: 'wedding'
  }
];

export const CORPORATE_SUBCATEGORIES = [
  { 
    id: 'corporate-cakes', 
    slug: 'corporate-cakes',
    name: 'Corporate cakes', 
    banner: '/Corporate Skyline Cake with Laptop topper.png', 
    image_url: '/Corporate Skyline Cake with Laptop topper.png',
    description: 'Executive event cakes & branded desserts',
    parent: 'corporate-cakes'
  },
  { 
    id: 'corporate-cookies', 
    slug: 'corporate-cookies',
    name: 'Corporate Cookies', 
    banner: '/Corporate Cookie Collection on Gold-Rimmed Plate.png', 
    image_url: '/Corporate Cookie Collection on Gold-Rimmed Plate.png',
    description: 'Artisanal cookies with precision edible logo prints for PR and brand activations.',
    parent: 'corporate-cakes'
  },
  { 
    id: 'cupcakes-with-logo', 
    slug: 'cupcakes-with-logo',
    name: 'Cupcakes with logo', 
    banner: '/Business Cupcake Icon Plate.png', 
    image_url: '/Business Cupcake Icon Plate.png',
    description: 'Gourmet French buttercream cupcakes crowned with customized corporate logos.',
    parent: 'corporate-cakes'
  }
];

const CATEGORIES = [
  { id: 'wedding', slug: 'wedding', name: 'Wedding Cakes', banner: '/Elegant Ivory Wedding Cake Banner.png', image_url: '/Elegant Ivory Wedding Cake Banner.png', description: 'Luxury tiered celebration masterpieces' },
  ...WEDDING_SUBCATEGORIES,
  { id: 'corporate-cakes', slug: 'corporate-cakes', name: 'Corporate Cakes', banner: '/Corporate Skyline Cake with Laptop topper.png', image_url: '/Corporate Skyline Cake with Laptop topper.png', description: 'Executive event cakes & branded desserts' },
  { id: 'corporate-cookies', slug: 'corporate-cookies', name: 'Corporate Cookies', banner: '/Corporate Cookie Collection on Gold-Rimmed Plate.png', image_url: '/Corporate Cookie Collection on Gold-Rimmed Plate.png', description: 'Artisanal cookies with precision edible logo prints for PR and brand activations.', parent: 'corporate-cakes' },
  { id: 'cupcakes-with-logo', slug: 'cupcakes-with-logo', name: 'Cupcakes with logo', banner: '/Business Cupcake Icon Plate.png', image_url: '/Business Cupcake Icon Plate.png', description: 'Gourmet French buttercream cupcakes crowned with customized corporate logos.', parent: 'corporate-cakes' },
  { id: 'cookies', slug: 'cookies', name: 'Cookies', banner: '/Golden Chocolate Chip Cookie Stack.png', image_url: '/Golden Chocolate Chip Cookie Stack.png', description: 'Freshly baked artisanal cookies & macarons' },
  { id: 'cake-pops', slug: 'cake-pops', name: 'Cake Pops', banner: '/Colorful Cake Pops in a Ribbon Jar.png', image_url: '/Colorful Cake Pops in a Ribbon Jar.png', description: 'Delightful handheld dessert bites for parties' },
  { id: 'cupcakes', slug: 'cupcakes', name: 'Cupcakes', banner: '/Colorful Cupcakes on a Wooden Table.png', image_url: '/Colorful Cupcakes on a Wooden Table.png', description: 'Gourmet artisanal cupcakes with French buttercream' },
  { id: 'cakes-for-kids', slug: 'cakes-for-kids', name: 'Cakes for Kids', banner: '/Rainbow Bear Birthday Cake.png', image_url: '/Rainbow Bear Birthday Cake.png', description: 'Rainbow, fantasy and storybook cakes' },
  { id: 'cakes-for-ladies', slug: 'cakes-for-ladies', name: 'Cakes for Ladies', banner: '/Elegant Pink Floral Pearl Cake.png', image_url: '/Elegant Pink Floral Pearl Cake.png', description: 'Pink floral, pearls & haute couture cakes' },
  { id: 'cakes-for-guys', slug: 'cakes-for-guys', name: 'Cakes for Guys', banner: '/Black SUV Cake on a Wooden Tabletop.png', image_url: '/Black SUV Cake on a Wooden Tabletop.png', description: 'Luxury cars, chronographs & bold themes' },
  { id: 'graduation-cakes', slug: 'graduation-cakes', name: 'Graduation Cakes', banner: '/Elegant Graduation Cake with Diploma and Books.png', image_url: '/Elegant Graduation Cake with Diploma and Books.png', description: 'Celebrate academic milestones and commencement ceremonies' },
  { id: 'cars-ships-planes-cakes', slug: 'cars-ships-planes-cakes', name: 'Cars, Ships, Yachts & Planes Cakes', banner: '/Luxury Transportation Cake Showcase.png', image_url: '/Luxury Transportation Cake Showcase.png', description: 'Custom 3D sculpted luxury vehicles, ships, yachts & aviation cakes' },
  { id: 'sporting-cakes', slug: 'sporting-cakes', name: 'Sporting Cakes', banner: '/Sports Cake Trio Banner.png', image_url: '/Sports Cake Trio Banner.png', description: 'Football, basketball, golf, tennis & championship celebration cakes' },
  { id: 'couture-cakes', slug: 'couture-cakes', name: 'Couture Cakes', banner: '/Couture Cakes in Gold and Pink.png', image_url: '/Couture Cakes in Gold and Pink.png', description: 'Haute couture, fashion-forward & luxury designer cakes' },
  { id: '3d-cakes', slug: '3d-cakes', name: '3D Cakes', banner: '/Spiderman, Unicorn and Race Car Cakes.png', image_url: '/Spiderman, Unicorn and Race Car Cakes.png', description: 'Spectacular sculpted 3-dimensional cake centerpieces' },
  { id: 'food-drink-illusion-cakes', slug: 'food-drink-illusion-cakes', name: 'Food & Drink Illusion Cakes', banner: '/Realistic Fast-Food Illusion Cakes.png', image_url: '/Realistic Fast-Food Illusion Cakes.png', description: 'Hyper-realistic trompe-l\'œil culinary and beverage illusion cakes' },
  { id: 'doughnuts-cakes', slug: 'doughnuts-cakes', name: 'Doughnuts Cakes', banner: '/Glossy Donut Cake Trio.png', image_url: '/Glossy Donut Cake Trio.png', description: 'Custom artisanal stacked doughnut cakes and dessert towers' },
  { id: 'photo-on-cake', slug: 'photo-on-cake', name: 'Photo on Cake', banner: '/Celebration Cakes with Edible Photos.png', image_url: '/Celebration Cakes with Edible Photos.png', description: 'High-definition edible printed memories and personalized photo cakes' },
  { id: 'pet-animals-cakes', slug: 'pet-animals-cakes', name: 'Pet & Animals Cakes', banner: '/Adorable Animal-Themed Fondant Cake Collection.png', image_url: '/Adorable Animal-Themed Fondant Cake Collection.png', description: 'Cute puppies, kittens, safari & wildlife celebration cakes' },
  { id: 'superhero-cakes', slug: 'superhero-cakes', name: 'Superhero Cakes', banner: '/Superhero Fondant Cake Trio.png', image_url: '/Superhero Fondant Cake Trio.png', description: 'Action-packed Marvel, DC & comic book hero sculpted cakes' },
  { id: 'labubu-cakes', slug: 'labubu-cakes', name: 'Labubu Cakes', banner: '/Whimsical Labubu Cake Collection.png', image_url: '/Whimsical Labubu Cake Collection.png', description: 'Trendy Labubu monster & whimsical vinyl toy designer cakes' },
  { id: 'cake-baking-decorating', slug: 'cake-baking-decorating', name: 'Cake Baking & Decorating Cakes', banner: '/Pink Rosette Berry Cake Workshop.png', image_url: '/Pink Rosette Berry Cake Workshop.png', description: 'Baking enthusiast, confectionery master & sugarcraft themed cakes' }
];

export default function AdminDashboard({ onBackToStore }) {
  // Auth state
  const [token, setToken] = useState(() => localStorage.getItem('ldb_admin_token') || '');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('admin@lebanesedream.com');
  const [loginPassword, setLoginPassword] = useState('admin123');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Dashboard navigation state (persisted across page refreshes)
  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTab = localStorage.getItem('ldb_admin_active_tab');
      if (savedTab && ['overview', 'orders', 'customizations', 'categories', 'category', 'inquiries'].includes(savedTab)) {
        return savedTab;
      }
      const hash = window.location.hash.replace('#', '').trim();
      if (['overview', 'orders', 'customizations', 'categories', 'category', 'inquiries'].includes(hash)) {
        return hash;
      }
    }
    return 'overview';
  });
  const [categoriesList, setCategoriesList] = useState(CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedCatId = localStorage.getItem('ldb_admin_selected_cat_id');
      if (savedCatId) {
        const found = CATEGORIES.find(c => c.id === savedCatId || c.slug === savedCatId);
        if (found) return found;
      }
    }
    return CATEGORIES[0];
  });
  // Products dropdown and its sub-dropdowns:
  // Closed by default and ONLY open when the user explicitly clicks to open them
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);
  const [weddingSubmenuOpen, setWeddingSubmenuOpen] = useState(false);
  const [corporateSubmenuOpen, setCorporateSubmenuOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Data state
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionMessage, setActionMessage] = useState(null);

  // Filter & Search state
  const [orderFilter, setOrderFilter] = useState('all');
  const [orderTypeFilter, setOrderTypeFilter] = useState('all'); // 'all' | 'custom' | 'normal'
  const [orderSearch, setOrderSearch] = useState('');
  const [productSearch, setProductSearch] = useState('');
  const [categorySearch, setCategorySearch] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Customizations state (for interactive 3D /customize builder submissions)
  const [customizations, setCustomizations] = useState([]);
  const [customizationFilter, setCustomizationFilter] = useState('all');
  const [customizationSearch, setCustomizationSearch] = useState('');
  const [selectedCustomization, setSelectedCustomization] = useState(null);

  // Add / Edit Product Modal
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    title: '',
    category_slug: 'wedding',
    price: '',
    flavor: 'Belgian Chocolate & French Vanilla',
    servings: '15-20 servings',
    image_url: '',
    secondary_image_url: '',
    description: ''
  });

  const [uploadingSlot1, setUploadingSlot1] = useState(false);
  const [uploadingSlot2, setUploadingSlot2] = useState(false);

  // Client-side image compression to guarantee lightweight payloads under 150KB
  const compressImage = (file, maxWidth = 1200, maxHeight = 1200, quality = 0.82) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          let width = img.width;
          let height = img.height;

          if (width > maxWidth || height > maxHeight) {
            if (width > height) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            } else {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          const dataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve(dataUrl);
        };
        img.onerror = () => resolve(e.target.result);
        img.src = e.target.result;
      };
      reader.onerror = () => resolve('');
      reader.readAsDataURL(file);
    });
  };

  // Handle uploading 2 product images (Slot 1 and Slot 2)
  const handleFileUpload = async (file, slot) => {
    if (!file) return;
    const isSlot1 = slot === 1;
    if (isSlot1) setUploadingSlot1(true);
    else setUploadingSlot2(true);

    try {
      // 1. Optimize image client-side to prevent 413 Payload Too Large
      const compressedDataUrl = await compressImage(file);
      if (isSlot1) {
        setNewProduct(prev => ({ ...prev, image_url: compressedDataUrl }));
      } else {
        setNewProduct(prev => ({ ...prev, secondary_image_url: compressedDataUrl }));
      }

      // 2. Upload to server to get permanent /uploads/ path
      if (token) {
        try {
          const res = await fetch(`${API_BASE}/upload`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ image: compressedDataUrl, filename: file.name })
          });
          const data = await res.json();
          if (data.success && data.url) {
            if (isSlot1) {
              setNewProduct(prev => ({ ...prev, image_url: data.url }));
            } else {
              setNewProduct(prev => ({ ...prev, secondary_image_url: data.url }));
            }
          }
        } catch (uploadErr) {
          console.warn('Upload endpoint notice, retaining compressed image:', uploadErr);
        }
      }
    } catch (err) {
      console.error('File compression error:', err);
    } finally {
      if (isSlot1) setUploadingSlot1(false);
      else setUploadingSlot2(false);
    }
  };

  // Add Category Modal
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: '',
    slug: '',
    description: '',
    image_url: '/Elegant Ivory Wedding Cake Banner.png',
    sort_order: '21'
  });

  const notify = (msg) => {
    setActionMessage(msg);
    setTimeout(() => setActionMessage(null), 3500);
  };

  // Perform Login
  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Login failed');
      }

      setToken(data.token);
      localStorage.setItem('ldb_admin_token', data.token);
      notify('Authentication successful');
    } catch (err) {
      if (loginEmail === 'admin@lebanesedream.com' && loginPassword === 'admin123') {
        const mockToken = 'mock_jwt_token_2026';
        setToken(mockToken);
        localStorage.setItem('ldb_admin_token', mockToken);
        notify('Signed in successfully');
      } else {
        setLoginError(err.message || 'Unable to connect to server');
      }
    } finally {
      setLoginLoading(false);
    }
  };

  // Logout
  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('ldb_admin_token');
    localStorage.removeItem('ldb_admin_user');
    localStorage.removeItem('ldb_admin_active_tab');
    localStorage.removeItem('ldb_admin_selected_cat_id');
  };

  // Sync activeTab to localStorage and URL hash across browser refreshes
  useEffect(() => {
    if (activeTab) {
      localStorage.setItem('ldb_admin_active_tab', activeTab);
      if (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin')) {
        const currentHash = window.location.hash.replace('#', '').trim();
        if (currentHash !== activeTab) {
          window.history.replaceState(null, '', `/admin#${activeTab}`);
        }
      }
    }
  }, [activeTab]);

  // Sync selectedCategory to localStorage across browser refreshes
  useEffect(() => {
    if (selectedCategory && (selectedCategory.slug || selectedCategory.id)) {
      localStorage.setItem('ldb_admin_selected_cat_id', selectedCategory.slug || selectedCategory.id);
    }
  }, [selectedCategory]);

  // Fetch Data
  const fetchDashboardData = async () => {
    if (!token) return;
    setLoading(true);

    try {
      const headers = { 'Authorization': `Bearer ${token}` };

      const [statsRes, ordersRes, productsRes, inqRes, catRes, custRes] = await Promise.all([
        fetch(`${API_BASE}/dashboard/stats`, { headers }),
        fetch(`${API_BASE}/orders`, { headers }),
        fetch(`${API_BASE}/products`, { headers }),
        fetch(`${API_BASE}/inquiries`, { headers }),
        fetch(`${API_BASE}/categories`, { headers }),
        fetch(`${API_BASE}/customizations`)
      ]);

      if (statsRes.ok) {
        const data = await statsRes.json();
        setStats(data.stats);
      }
      if (ordersRes.ok) {
        const data = await ordersRes.json();
        setOrders(data.orders || []);
      }
      if (productsRes.ok) {
        const data = await productsRes.json();
        const prods = data.products || [];
        setProducts(prods);
        try {
          localStorage.setItem('ldb_cached_products', JSON.stringify(prods));
          window.dispatchEvent(new CustomEvent('ldb_products_updated'));
        } catch (_) {}
      }
      if (inqRes.ok) {
        const data = await inqRes.json();
        setInquiries(data.inquiries || []);
      }
      if (custRes && custRes.ok) {
        const custData = await custRes.json();
        setCustomizations(custData.customizations || []);
      }
      if (catRes && catRes.ok) {
        const catData = await catRes.json();
        if (catData.categories && catData.categories.length > 0) {
          const mappedCats = catData.categories.map(c => {
            const matched = CATEGORIES.find(def => def.id === c.slug || def.slug === c.slug || def.id === c.id);
            return {
              id: c.slug || c.id,
              dbId: c.id,
              name: c.name,
              slug: c.slug,
              banner: c.image_url || matched?.banner || '/Elegant Ivory Wedding Cake Banner.png',
              image_url: c.image_url || matched?.image_url || '/Elegant Ivory Wedding Cake Banner.png',
              description: c.description || matched?.description || '',
              sort_order: c.sort_order || 50,
              parent: matched?.parent || (
                ['classic-wedding-cakes', 'novelty-wedding-cakes', 'bride-to-be-cakes', 'engagement-cakes', 'grooms-cakes'].includes(c.slug) ? 'wedding' :
                ['corporate-cookies', 'cupcakes-with-logo'].includes(c.slug) ? 'corporate-cakes' : null
              )
            };
          });
          setCategoriesList(mappedCats);

          // If a category was previously active, synchronize with freshly loaded category data
          const savedCatId = localStorage.getItem('ldb_admin_selected_cat_id');
          if (savedCatId) {
            const matched = mappedCats.find(c => c.id === savedCatId || c.slug === savedCatId);
            if (matched) {
              setSelectedCategory(matched);
            }
          }
        }
      }
    } catch (err) {
      console.warn('Dashboard fetch notice:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchDashboardData();
    }
  }, [token]);

  // Add Category Handler
  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategory.name || !newCategory.name.trim()) return;

    try {
      const res = await fetch(`${API_BASE}/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newCategory)
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to create category');
      }

      const created = {
        id: data.category.slug,
        dbId: data.category.id,
        name: data.category.name,
        slug: data.category.slug,
        banner: data.category.image_url,
        image_url: data.category.image_url,
        description: data.category.description,
        sort_order: data.category.sort_order
      };

      setCategoriesList(prev => [...prev, created]);
      setShowAddCategory(false);
      setNewCategory({
        name: '',
        slug: '',
        description: '',
        image_url: '/Elegant Ivory Wedding Cake Banner.png',
        sort_order: '21'
      });
      notify(`Category "${created.name}" created successfully`);
    } catch (err) {
      notify(err.message || 'Failed to add category');
    }
  };

  // Delete Category Handler
  const handleDeleteCategory = async (cat) => {
    if (!confirm(`Are you sure you want to delete category "${cat.name}"?`)) return;
    try {
      if (cat.dbId) {
        await fetch(`${API_BASE}/categories/${cat.dbId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
      }
      setCategoriesList(prev => prev.filter(c => c.id !== cat.id && c.slug !== cat.id));
      notify(`Category "${cat.name}" removed`);
    } catch (err) {
      setCategoriesList(prev => prev.filter(c => c.id !== cat.id && c.slug !== cat.id));
      notify('Category removed');
    }
  };

  // Update Order Status
  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await fetch(`${API_BASE}/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
      notify(`Order status updated to ${newStatus.replace('_', ' ')}`);
    } catch (e) {
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
      notify('Order status updated');
    }
  };

  // Update Customization Status
  const handleUpdateCustomizationStatus = async (id, newStatus) => {
    try {
      await fetch(`${API_BASE}/customizations/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      setCustomizations(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
      if (selectedCustomization && selectedCustomization.id === id) {
        setSelectedCustomization(prev => ({ ...prev, status: newStatus }));
      }
      notify(`Customization marked as "${newStatus.replace('_', ' ')}"`);
    } catch (e) {
      setCustomizations(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
      notify('Customization status updated');
    }
  };

  // Delete Customization
  const handleDeleteCustomization = async (id) => {
    if (!window.confirm('Are you sure you want to delete this custom cake specification?')) return;
    try {
      await fetch(`${API_BASE}/customizations/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setCustomizations(prev => prev.filter(c => c.id !== id));
      if (selectedCustomization && selectedCustomization.id === id) {
        setSelectedCustomization(null);
      }
      notify('Customization record deleted');
    } catch (e) {
      setCustomizations(prev => prev.filter(c => c.id !== id));
      notify('Customization record removed');
    }
  };

  // Open Add Product Modal
  const handleOpenAdd = () => {
    setEditingProduct(null);
    setNewProduct({
      title: '',
      category_slug: selectedCategory.slug || selectedCategory.id,
      price: '',
      flavor: 'Belgian Chocolate & French Vanilla',
      servings: '15-20 servings',
      image_url: '',
      secondary_image_url: '',
      description: ''
    });
    setShowAddProduct(true);
  };

  // Open Edit Product Modal
  const handleOpenEdit = (prod) => {
    setEditingProduct(prod);
    setNewProduct({
      title: prod.title || '',
      category_slug: prod.category_slug || selectedCategory.slug || selectedCategory.id,
      price: prod.price || '',
      flavor: prod.flavor || 'Belgian Chocolate & French Vanilla',
      servings: prod.servings || '15-20 servings',
      image_url: prod.image_url || '',
      secondary_image_url: prod.secondary_image_url || '',
      description: prod.description || ''
    });
    setShowAddProduct(true);
  };

  // Save Product (Add or Edit)
  const handleSaveProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.title || !newProduct.price) return;

    const payload = {
      ...newProduct,
      image_url: newProduct.image_url || '/Lebanese Dream Bakery Cake Display.png'
    };

    if (editingProduct) {
      // Edit existing product
      try {
        const res = await fetch(`${API_BASE}/products/${editingProduct.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        const updatedItem = data.product 
          ? { ...editingProduct, ...payload, ...data.product } 
          : { ...editingProduct, ...payload };

        setProducts(prev => {
          const updated = prev.map(p => p.id === editingProduct.id ? updatedItem : p);
          try {
            localStorage.setItem('ldb_cached_products', JSON.stringify(updated));
            window.dispatchEvent(new CustomEvent('ldb_products_updated', { detail: updatedItem }));
          } catch (_) {}
          return updated;
        });

        setShowAddProduct(false);
        setEditingProduct(null);
        notify('Product updated successfully');
      } catch (err) {
        setProducts(prev => {
          const updated = prev.map(p => p.id === editingProduct.id ? { ...editingProduct, ...payload } : p);
          try {
            localStorage.setItem('ldb_cached_products', JSON.stringify(updated));
            window.dispatchEvent(new CustomEvent('ldb_products_updated'));
          } catch (_) {}
          return updated;
        });
        setShowAddProduct(false);
        setEditingProduct(null);
        notify('Product updated');
      }
    } else {
      // Add new product
      try {
        const res = await fetch(`${API_BASE}/products`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        const createdProduct = data.product || { ...payload, id: Date.now() };

        setProducts(prev => {
          const updated = [createdProduct, ...prev];
          try {
            localStorage.setItem('ldb_cached_products', JSON.stringify(updated));
            window.dispatchEvent(new CustomEvent('ldb_products_updated', { detail: createdProduct }));
          } catch (_) {}
          return updated;
        });

        setShowAddProduct(false);
        setNewProduct({
          title: '',
          category_slug: selectedCategory.slug || selectedCategory.id,
          price: '',
          flavor: 'Belgian Chocolate & French Vanilla',
          servings: '15-20 servings',
          image_url: '',
          secondary_image_url: '',
          description: ''
        });
        notify('Product added to catalog');
      } catch (err) {
        notify('Failed to add product');
      }
    }
  };

  // Delete Product
  const handleDeleteProduct = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await fetch(`${API_BASE}/products/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setProducts(prev => {
        const updated = prev.filter(p => p.id !== id);
        try {
          localStorage.setItem('ldb_cached_products', JSON.stringify(updated));
          window.dispatchEvent(new CustomEvent('ldb_products_updated'));
        } catch (_) {}
        return updated;
      });
      notify('Product removed');
    } catch (e) {
      setProducts(prev => {
        const updated = prev.filter(p => p.id !== id);
        try {
          localStorage.setItem('ldb_cached_products', JSON.stringify(updated));
          window.dispatchEvent(new CustomEvent('ldb_products_updated'));
        } catch (_) {}
        return updated;
      });
      notify('Product removed');
    }
  };

  const handleSelectCategory = (cat) => {
    setSelectedCategory(cat);
    setActiveTab('category');
    setMobileSidebarOpen(false);
  };

  // Filtered Orders
  const filteredOrders = orders.filter(o => {
    const isCustom = isCustomOrder(o);
    const matchesType = orderTypeFilter === 'all' ||
      (orderTypeFilter === 'custom' && isCustom) ||
      (orderTypeFilter === 'normal' && !isCustom);
    const matchesFilter = orderFilter === 'all' || o.status === orderFilter;
    const q = orderSearch.toLowerCase().trim();
    const matchesSearch = !q || 
      (o.order_number && o.order_number.toLowerCase().includes(q)) ||
      (o.customer_name && o.customer_name.toLowerCase().includes(q)) ||
      (o.customer_phone && o.customer_phone.toLowerCase().includes(q)) ||
      (o.cake_type && o.cake_type.toLowerCase().includes(q)) ||
      (isCustom ? 'customization order custom' : 'normal order standard').includes(q);
    return matchesType && matchesFilter && matchesSearch;
  });

  // Filtered Customizations (Interactive 3D /customize builder submissions)
  const filteredCustomizations = customizations.filter(c => {
    const matchesFilter = customizationFilter === 'all' || c.status === customizationFilter;
    const q = customizationSearch.toLowerCase().trim();
    const matchesSearch = !q ||
      (c.customization_code && c.customization_code.toLowerCase().includes(q)) ||
      (c.customer_name && c.customer_name.toLowerCase().includes(q)) ||
      (c.occasion && c.occasion.toLowerCase().includes(q)) ||
      (c.theme_design && c.theme_design.toLowerCase().includes(q)) ||
      (c.sponge_flavor && c.sponge_flavor.toLowerCase().includes(q)) ||
      (c.cake_message && c.cake_message.toLowerCase().includes(q));
    return matchesFilter && matchesSearch;
  });

  // Universal Category Product Counter
  const getCategoryProductCount = (catId, allProducts = products) => {
    if (!allProducts || allProducts.length === 0) return 0;
    return allProducts.filter(p => {
      const pCat = p.category_slug;
      if (catId === 'wedding' || catId === 'wedding-cakes') {
        return pCat === 'wedding' || 
               pCat === 'wedding-cakes' ||
               pCat === 'classic-wedding-cakes' ||
               pCat === 'novelty-wedding-cakes' ||
               pCat === 'bride-to-be-cakes' ||
               pCat === 'engagement-cakes' ||
               pCat === 'grooms-cakes';
      }
      if (catId === 'corporate-cakes-all') {
        return pCat === 'corporate-cakes' || 
               pCat === 'corporate' ||
               pCat === 'corporate-cookies' ||
               pCat === 'cupcakes-with-logo';
      }
      if (catId === 'corporate-cakes') {
        return pCat === 'corporate-cakes' || pCat === 'corporate';
      }
      if (catId === 'corporate-cookies') {
        return pCat === 'corporate-cookies';
      }
      if (catId === 'cupcakes-with-logo') {
        return pCat === 'cupcakes-with-logo';
      }
      if (catId === 'classic-wedding-cakes') return pCat === 'classic-wedding-cakes';
      if (catId === 'novelty-wedding-cakes') return pCat === 'novelty-wedding-cakes';
      if (catId === 'bride-to-be-cakes') return pCat === 'bride-to-be-cakes';
      if (catId === 'engagement-cakes') return pCat === 'engagement-cakes';
      if (catId === 'grooms-cakes') return pCat === 'grooms-cakes';

      if (catId === 'cookies') return pCat === 'cookies' || pCat === 'cookies-cat';
      if (catId === 'cake-pops') return pCat === 'cake-pops' || pCat === 'cake-pops-cat';
      if (catId === 'cupcakes') return pCat === 'cupcakes' || pCat === 'cupcakes-cat';
      if (catId === 'cakes-for-kids') return pCat === 'cakes-for-kids' || pCat === 'kids';
      if (catId === 'cakes-for-ladies') return pCat === 'cakes-for-ladies' || pCat === 'ladies' || pCat === 'girls';
      if (catId === 'cakes-for-guys') return pCat === 'cakes-for-guys' || pCat === 'guys' || pCat === 'boys';
      return pCat === catId;
    }).length;
  };

  // Filtered Categories
  const filteredCategories = categoriesList.filter(c => {
    if (!categorySearch.trim()) return true;
    const q = categorySearch.toLowerCase();
    return (c.name && c.name.toLowerCase().includes(q)) || 
           (c.slug && c.slug.toLowerCase().includes(q)) ||
           (c.description && c.description.toLowerCase().includes(q));
  });

  // Filtered Category Cakes
  const categoryCakes = products.filter(p => {
    const pCat = p.category_slug;
    const sId = selectedCategory.slug || selectedCategory.id;

    // Specific wedding subcategories
    if (sId === 'classic-wedding-cakes') return pCat === 'classic-wedding-cakes';
    if (sId === 'novelty-wedding-cakes') return pCat === 'novelty-wedding-cakes';
    if (sId === 'bride-to-be-cakes') return pCat === 'bride-to-be-cakes';
    if (sId === 'engagement-cakes') return pCat === 'engagement-cakes';
    if (sId === 'grooms-cakes') return pCat === 'grooms-cakes';

    // Parent wedding category matches all wedding items
    if (sId === 'wedding' || sId === 'wedding-cakes') {
      return pCat === 'wedding' || 
             pCat === 'wedding-cakes' ||
             pCat === 'classic-wedding-cakes' ||
             pCat === 'novelty-wedding-cakes' ||
             pCat === 'bride-to-be-cakes' ||
             pCat === 'engagement-cakes' ||
             pCat === 'grooms-cakes';
    }

    // Specific corporate subcategories
    if (sId === 'corporate-cookies') return pCat === 'corporate-cookies';
    if (sId === 'cupcakes-with-logo') return pCat === 'cupcakes-with-logo';

    // Corporate cakes
    if (sId === 'corporate-cakes') {
      return pCat === 'corporate-cakes' || pCat === 'corporate';
    }
    if (sId === 'corporate-cakes-all') {
      return pCat === 'corporate-cakes' || 
             pCat === 'corporate' || 
             pCat === 'corporate-cookies' || 
             pCat === 'cupcakes-with-logo';
    }

    // Other categories
    if (sId === 'cookies') return pCat === 'cookies' || pCat === 'cookies-cat';
    if (sId === 'cake-pops') return pCat === 'cake-pops' || pCat === 'cake-pops-cat';
    if (sId === 'cupcakes') return pCat === 'cupcakes' || pCat === 'cupcakes-cat';
    if (sId === 'cakes-for-kids') return pCat === 'cakes-for-kids' || pCat === 'kids';
    if (sId === 'cakes-for-ladies') return pCat === 'cakes-for-ladies' || pCat === 'ladies' || pCat === 'girls';
    if (sId === 'cakes-for-guys') return pCat === 'cakes-for-guys' || pCat === 'guys' || pCat === 'boys';
    return pCat === sId;
  }).filter(p => 
    !productSearch.trim() ||
    (p.title && p.title.toLowerCase().includes(productSearch.toLowerCase())) ||
    (p.flavor && p.flavor.toLowerCase().includes(productSearch.toLowerCase()))
  );

  // Grouped taxonomy for Sidebar navigation
  const weddingSubIds = ['classic-wedding-cakes', 'novelty-wedding-cakes', 'bride-to-be-cakes', 'engagement-cakes', 'grooms-cakes'];
  const corporateSubIds = ['corporate-cookies', 'cupcakes-with-logo'];

  const weddingCategory = categoriesList.find(c => c.slug === 'wedding' || c.id === 'wedding') || CATEGORIES[0];
  const corporateCategory = categoriesList.find(c => c.slug === 'corporate-cakes' || c.id === 'corporate-cakes') || {
    id: 'corporate-cakes',
    slug: 'corporate-cakes',
    name: 'Corporate Cakes',
    banner: '/Corporate Skyline Cake with Laptop topper.png',
    image_url: '/Corporate Skyline Cake with Laptop topper.png',
    description: 'Executive event cakes & branded desserts'
  };

  const weddingSubs = WEDDING_SUBCATEGORIES.map(def => {
    const found = categoriesList.find(c => c.slug === def.slug || c.id === def.id);
    return found ? { ...def, ...found } : def;
  });

  const corporateSubs = CORPORATE_SUBCATEGORIES.map(def => {
    const found = categoriesList.find(c => c.slug === def.slug || c.id === def.id);
    return found ? { ...def, ...found } : def;
  });

  const otherCategories = categoriesList.filter(c => {
    const s = c.slug || c.id;
    if (s === 'wedding') return false;
    if (s === 'corporate-cakes') return false;
    if (weddingSubIds.includes(s)) return false;
    if (corporateSubIds.includes(s)) return false;
    return true;
  });

  // =======================================================
  // LOGIN SCREEN
  // =======================================================
  if (!token) {
    return (
      <div className="min-h-screen bg-[#FFF9F0] text-[#4A2116] flex flex-col items-center justify-center p-4 font-sans selection:bg-[#C58A19] selection:text-white">
        
        <div className="w-full max-w-md bg-white border border-[#EBDCC8] rounded-2xl shadow-xl p-8 relative z-10">
          
          {/* Website Logo directly on warm card */}
          <div className="flex flex-col items-center text-center mb-7">
            <img 
              src="/Lebanese Dream Bakery Logo.png" 
              alt="Lebanese Dream Bakery LLC"
              className="h-14 sm:h-16 w-auto object-contain mx-auto mb-3"
            />
            <h1 className="text-xl font-bold text-[#4A2116] tracking-tight">
              Management Portal
            </h1>
            <p className="text-xs text-[#7A5846] mt-1">
              Sign in to manage orders, products, and categories
            </p>
          </div>

          {loginError && (
            <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#7A5846] font-semibold mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
                className="w-full bg-[#FAF5ED] border border-[#E2D2BD] focus:border-[#C58A19] rounded-xl px-4 py-2.5 text-sm text-[#4A2116] outline-none transition-colors"
                placeholder="admin@lebanesedream.com"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#7A5846] font-semibold mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
                className="w-full bg-[#FAF5ED] border border-[#E2D2BD] focus:border-[#C58A19] rounded-xl px-4 py-2.5 text-sm text-[#4A2116] outline-none transition-colors"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full bg-[#C58A19] hover:bg-[#4A2116] text-white font-semibold text-sm py-2.5 rounded-xl shadow-md transition-colors cursor-pointer flex items-center justify-center gap-2 mt-2"
            >
              {loginLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setLoginEmail('admin@lebanesedream.com');
                setLoginPassword('admin123');
                handleLogin();
              }}
              className="w-full bg-[#FAF5ED] hover:bg-[#F2E6D5] border border-[#E2D2BD] text-[#7A5846] text-xs py-2 rounded-xl transition-colors cursor-pointer"
            >
              Quick Demo Login (admin@lebanesedream.com / admin123)
            </button>
          </form>

        </div>
      </div>
    );
  }

  // =======================================================
  // MAIN ADMIN DASHBOARD INTERFACE
  // =======================================================
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#33180F] flex font-sans selection:bg-[#C58A19] selection:text-white">
      
      {/* Toast Notification */}
      {actionMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#2A160D] text-white border border-[#C58A19] px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-fadeIn text-xs sm:text-sm font-medium">
          <CheckCircle2 className="w-4 h-4 text-[#C58A19]" />
          <span>{actionMessage}</span>
        </div>
      )}

      {/* Mobile Sidebar Backdrop Overlay */}
      {mobileSidebarOpen && (
        <div 
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-xs"
        />
      )}

      {/* ======================================================= */}
      {/* EXECUTIVE LEFT SIDEBAR (SAME BG AS LOGO: #FFF9F0) */}
      {/* ======================================================= */}
      <aside className={`fixed top-0 bottom-0 left-0 w-64 sm:w-72 bg-[#FFF9F0] border-r border-[#EBDCC8] text-[#4A2116] z-50 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
        mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        
        {/* Sidebar Header with Website Logo */}
        <div>
          <div className="p-4 sm:p-5 border-b border-[#EBDCC8] flex items-center justify-between">
            <img 
              src="/Lebanese Dream Bakery Logo.png" 
              alt="Lebanese Dream Bakery" 
              className="h-10 sm:h-12 w-auto max-w-[210px] object-contain"
            />

            <button 
              type="button" 
              onClick={() => setMobileSidebarOpen(false)}
              className="lg:hidden p-1.5 text-[#8A6753] hover:text-[#4A2116] ml-2 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <div className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-140px)]">
            
            {/* 1. Overview */}
            <button
              type="button"
              onClick={() => {
                setActiveTab('overview');
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-[#C58A19] text-white font-semibold shadow-xs'
                  : 'text-[#4A2116] hover:bg-[#F5EBDD] hover:text-[#C58A19]'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 shrink-0" />
              <span>Overview</span>
            </button>

            {/* 2. Orders */}
            <button
              type="button"
              onClick={() => {
                setActiveTab('orders');
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                activeTab === 'orders'
                  ? 'bg-[#C58A19] text-white font-semibold shadow-xs'
                  : 'text-[#4A2116] hover:bg-[#F5EBDD] hover:text-[#C58A19]'
              }`}
            >
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-4 h-4 shrink-0" />
                <span>Orders</span>
              </div>
              <span className={`text-[11px] px-2 py-0.5 rounded-md font-semibold ${
                activeTab === 'orders' ? 'bg-white/20 text-white' : 'bg-[#F2E5D5] text-[#7A5846]'
              }`}>
                {orders.length}
              </span>
            </button>

            {/* 2.5 Cake Customizations (Bespoke 3D /customize builder submissions) */}
            <button
              type="button"
              onClick={() => {
                setActiveTab('customizations');
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                activeTab === 'customizations'
                  ? 'bg-[#C58A19] text-white font-semibold shadow-xs'
                  : 'text-[#4A2116] hover:bg-[#F5EBDD] hover:text-[#C58A19]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Wand2 className="w-4 h-4 shrink-0" />
                <span>Customizations</span>
              </div>
              <span className={`text-[11px] px-2 py-0.5 rounded-md font-semibold ${
                activeTab === 'customizations' ? 'bg-white/20 text-white' : 'bg-[#F2E5D5] text-[#7A5846]'
              }`}>
                {customizations.length}
              </span>
            </button>

            {/* 3. Categories Management (Option to Add Categories & View Existing) */}
            <button
              type="button"
              onClick={() => {
                setActiveTab('categories');
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                activeTab === 'categories'
                  ? 'bg-[#C58A19] text-white font-semibold shadow-xs'
                  : 'text-[#4A2116] hover:bg-[#F5EBDD] hover:text-[#C58A19]'
              }`}
            >
              <div className="flex items-center gap-3">
                <FolderTree className="w-4 h-4 shrink-0" />
                <span>Categories</span>
              </div>
              <span className={`text-[11px] px-2 py-0.5 rounded-md font-semibold ${
                activeTab === 'categories' ? 'bg-white/20 text-white' : 'bg-[#F2E5D5] text-[#7A5846]'
              }`}>
                {categoriesList.length}
              </span>
            </button>

            {/* 4. Products Section (Collapsible Dropdown - Renamed from Category, Larger Dropdown Text) */}
            <div className="pt-1.5">
              <button
                type="button"
                onClick={() => setCategoryMenuOpen(!categoryMenuOpen)}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-[#4A2116] hover:bg-[#F5EBDD] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Package className="w-4 h-4 text-[#C58A19]" />
                  <span>Products</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-[#8A6753] transition-transform duration-200 ${
                  categoryMenuOpen ? 'rotate-180' : ''
                }`} />
              </button>

              {/* Subcategories (Clean Text Only, Larger Font Size) */}
              {categoryMenuOpen && (
                <div className="mt-1 pl-2.5 space-y-1 border-l-2 border-[#E2D2BD] ml-4">
                  
                  {/* --- 1. Wedding Cakes with nested subcategories --- */}
                  <div className="space-y-0.5">
                    <div className="flex items-center justify-between rounded-lg hover:bg-[#F5EBDD] transition-colors pr-1">
                      <button
                        type="button"
                        onClick={() => handleSelectCategory(weddingCategory)}
                        className={`flex-1 flex items-center justify-between px-2.5 py-2 rounded-lg text-left cursor-pointer transition-colors ${
                          activeTab === 'category' && (selectedCategory.id === 'wedding' || selectedCategory.slug === 'wedding')
                            ? 'bg-[#C58A19] text-white font-semibold shadow-xs'
                            : 'text-[#4A2116] hover:text-[#C58A19]'
                        }`}
                      >
                        <span className="truncate text-[14px] font-semibold tracking-normal">Wedding Cakes</span>
                        {getCategoryProductCount('wedding', products) > 0 && (
                          <span className={`text-[11px] px-2 py-0.5 rounded font-semibold ${
                            activeTab === 'category' && (selectedCategory.id === 'wedding' || selectedCategory.slug === 'wedding')
                              ? 'bg-white/20 text-white'
                              : 'bg-[#F2E5D5] text-[#7A5846]'
                          }`}>
                            {getCategoryProductCount('wedding', products)}
                          </span>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setWeddingSubmenuOpen(!weddingSubmenuOpen);
                        }}
                        className="p-1.5 text-[#8A6753] hover:text-[#C58A19] rounded-md hover:bg-black/5 cursor-pointer"
                        title="Toggle Wedding Cakes Subcategories"
                        aria-label="Toggle Wedding Cakes Subcategories"
                      >
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 stroke-[2.2] ${
                          weddingSubmenuOpen ? 'rotate-180 text-[#C58A19]' : ''
                        }`} />
                      </button>
                    </div>

                    {/* Wedding Subcategories Menu (Exact items matching user screenshot) */}
                    {weddingSubmenuOpen && (
                      <div className="mt-0.5 pl-3 space-y-0.5 border-l-2 border-[#E2D2BD]/80 ml-3 mb-1">
                        {weddingSubs.map(sub => {
                          const isSelected = activeTab === 'category' && (selectedCategory.id === sub.id || selectedCategory.slug === sub.slug);
                          const subCount = getCategoryProductCount(sub.slug || sub.id, products);
                          return (
                            <button
                              key={sub.id}
                              type="button"
                              onClick={() => handleSelectCategory(sub)}
                              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left cursor-pointer transition-colors ${
                                isSelected
                                  ? 'bg-[#C58A19] text-white font-semibold shadow-xs'
                                  : 'text-[#6B4B3E] hover:bg-[#F5EBDD] hover:text-[#C58A19]'
                              }`}
                            >
                              <span className="truncate text-[13.5px] font-medium tracking-normal">{sub.name}</span>
                              {subCount > 0 && (
                                <span className={`text-[10.5px] px-1.5 py-0.5 rounded font-semibold ${
                                  isSelected ? 'bg-white/20 text-white' : 'bg-[#F2E5D5] text-[#7A5846]'
                                }`}>
                                  {subCount}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* --- 2. Corporate Cakes with nested subcategories --- */}
                  <div className="space-y-0.5 pt-0.5">
                    <div className="flex items-center justify-between rounded-lg hover:bg-[#F5EBDD] transition-colors pr-1">
                      <button
                        type="button"
                        onClick={() => handleSelectCategory(corporateCategory)}
                        className={`flex-1 flex items-center justify-between px-2.5 py-2 rounded-lg text-left cursor-pointer transition-colors ${
                          activeTab === 'category' && (selectedCategory.id === 'corporate-cakes' || selectedCategory.slug === 'corporate-cakes')
                            ? 'bg-[#C58A19] text-white font-semibold shadow-xs'
                            : 'text-[#4A2116] hover:text-[#C58A19]'
                        }`}
                      >
                        <span className="truncate text-[14px] font-semibold tracking-normal">Corporate Cakes</span>
                        {getCategoryProductCount('corporate-cakes-all', products) > 0 && (
                          <span className={`text-[11px] px-2 py-0.5 rounded font-semibold ${
                            activeTab === 'category' && (selectedCategory.id === 'corporate-cakes' || selectedCategory.slug === 'corporate-cakes')
                              ? 'bg-white/20 text-white'
                              : 'bg-[#F2E5D5] text-[#7A5846]'
                          }`}>
                            {getCategoryProductCount('corporate-cakes-all', products)}
                          </span>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCorporateSubmenuOpen(!corporateSubmenuOpen);
                        }}
                        className="p-1.5 text-[#8A6753] hover:text-[#C58A19] rounded-md hover:bg-black/5 cursor-pointer"
                        title="Toggle Corporate Cakes Subcategories"
                        aria-label="Toggle Corporate Cakes Subcategories"
                      >
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 stroke-[2.2] ${
                          corporateSubmenuOpen ? 'rotate-180 text-[#C58A19]' : ''
                        }`} />
                      </button>
                    </div>

                    {/* Corporate Subcategories Menu (Exact items matching user screenshot) */}
                    {corporateSubmenuOpen && (
                      <div className="mt-0.5 pl-3 space-y-0.5 border-l-2 border-[#E2D2BD]/80 ml-3 mb-1">
                        {corporateSubs.map(sub => {
                          const isSelected = activeTab === 'category' && (selectedCategory.id === sub.id || selectedCategory.slug === sub.slug);
                          const subCount = getCategoryProductCount(sub.slug || sub.id, products);
                          return (
                            <button
                              key={sub.id}
                              type="button"
                              onClick={() => handleSelectCategory(sub)}
                              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left cursor-pointer transition-colors ${
                                isSelected
                                  ? 'bg-[#C58A19] text-white font-semibold shadow-xs'
                                  : 'text-[#6B4B3E] hover:bg-[#F5EBDD] hover:text-[#C58A19]'
                              }`}
                            >
                              <span className="truncate text-[13.5px] font-medium tracking-normal">{sub.name}</span>
                              {subCount > 0 && (
                                <span className={`text-[10.5px] px-1.5 py-0.5 rounded font-semibold ${
                                  isSelected ? 'bg-white/20 text-white' : 'bg-[#F2E5D5] text-[#7A5846]'
                                }`}>
                                  {subCount}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* --- 3. Other Categories --- */}
                  <div className="pt-0.5 space-y-0.5">
                    {otherCategories.map(cat => {
                      const isSelected = activeTab === 'category' && (selectedCategory.id === cat.id || selectedCategory.slug === cat.slug);
                      const count = getCategoryProductCount(cat.slug || cat.id, products);

                      return (
                        <button
                          key={cat.id || cat.slug}
                          type="button"
                          onClick={() => handleSelectCategory(cat)}
                          className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-sm font-medium transition-colors text-left cursor-pointer ${
                            isSelected
                              ? 'bg-[#C58A19] text-white font-semibold shadow-xs'
                              : 'text-[#6B4B3E] hover:bg-[#F5EBDD] hover:text-[#C58A19]'
                          }`}
                        >
                          <span className="truncate text-[13.5px] font-medium tracking-normal">{cat.name}</span>
                          {count > 0 && (
                            <span className={`text-[11px] px-2 py-0.5 rounded font-semibold ${
                              isSelected ? 'bg-white/20 text-white' : 'bg-[#F2E5D5] text-[#7A5846]'
                            }`}>
                              {count}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                </div>
              )}
            </div>

            {/* 5. Inquiries */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('inquiries');
                  setMobileSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                  activeTab === 'inquiries'
                    ? 'bg-[#C58A19] text-white font-semibold shadow-xs'
                    : 'text-[#4A2116] hover:bg-[#F5EBDD] hover:text-[#C58A19]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 shrink-0" />
                  <span>Inquiries</span>
                </div>
                <span className={`text-[11px] px-2 py-0.5 rounded-md font-semibold ${
                  activeTab === 'inquiries' ? 'bg-white/20 text-white' : 'bg-[#F2E5D5] text-[#7A5846]'
                }`}>
                  {inquiries.length}
                </span>
              </button>
            </div>

          </div>
        </div>

        {/* Clean Professional Sidebar Footer */}
        <div className="p-4 border-t border-[#EBDCC8] bg-[#FAF3E8]">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs text-[#7A5846] hover:text-red-600 hover:bg-red-50 bg-white border border-[#EBDCC8] rounded-xl transition-colors cursor-pointer shadow-2xs font-medium"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>

      </aside>

      {/* ======================================================= */}
      {/* MAIN VIEW CONTENT (RIGHT OF SIDEBAR) */}
      {/* ======================================================= */}
      <div className="flex-1 lg:pl-72 flex flex-col min-w-0">
        
        {/* Top Header Bar */}
        <header className="bg-white border-b border-[#EBDCC8] px-4 sm:px-8 py-3.5 sticky top-0 z-30 shadow-xs flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 text-[#4A2116] hover:bg-[#FAF5ED] rounded-lg cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <div className="text-xs text-[#8A6753] uppercase tracking-wider font-semibold">
                {activeTab === 'overview' ? 'Administration' :
                 activeTab === 'orders' ? 'Orders Management' :
                 activeTab === 'customizations' ? 'Cake Customizations' :
                 activeTab === 'categories' ? 'Category Taxonomy' :
                 activeTab === 'inquiries' ? 'Client Consultations' :
                 'Product Catalog'}
              </div>
              <h2 className="text-base sm:text-lg font-bold text-[#4A2116] leading-tight font-serif">
                {activeTab === 'overview' ? 'Dashboard Overview' :
                 activeTab === 'orders' ? 'All Customer Orders' :
                 activeTab === 'customizations' ? 'Cake Customizations' :
                 activeTab === 'categories' ? 'Category Management' :
                 activeTab === 'inquiries' ? 'Inquiries and Consultations' :
                 selectedCategory.name}
              </h2>
            </div>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-3">
            
            <button
              type="button"
              onClick={fetchDashboardData}
              disabled={loading}
              className="p-2 text-[#7A5846] hover:text-[#4A2116] hover:bg-[#FAF5ED] border border-[#EBDCC8] rounded-xl transition-colors cursor-pointer"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>

          </div>

        </header>

        {/* Content Body */}
        <main className="p-4 sm:p-8 flex-1">
          
          {/* ==================================================== */}
          {/* TAB 1: OVERVIEW */}
          {/* ==================================================== */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Metric Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                
                <div className="bg-white border border-[#EBDCC8] rounded-2xl p-5 shadow-xs">
                  <div className="text-xs uppercase tracking-wider text-[#8A6753] font-semibold">Total Revenue</div>
                  <div className="text-2xl sm:text-3xl font-poppins font-bold text-[#4A2116] mt-2 tracking-tight tabular-nums flex items-baseline">
                    <span className="text-base sm:text-lg font-semibold text-[#8A6753] mr-1.5 font-poppins">AED</span>
                    <span>{(stats?.totalRevenue ?? orders.reduce((sum, o) => sum + Number(o.total_amount || 0), 0)).toLocaleString()}</span>
                  </div>
                  <div className="text-[11px] text-emerald-600 font-medium mt-1">
                    Recorded orders
                  </div>
                </div>

                <div className="bg-white border border-[#EBDCC8] rounded-2xl p-5 shadow-xs">
                  <div className="text-xs uppercase tracking-wider text-[#8A6753] font-semibold">Total Orders</div>
                  <div className="text-2xl sm:text-3xl font-poppins font-bold text-[#4A2116] mt-2 tabular-nums">
                    {stats?.totalOrders || orders.length}
                  </div>
                  <div className="text-[11px] text-[#8A6753] mt-1">Processed orders</div>
                </div>

                <div className="bg-white border border-[#EBDCC8] rounded-2xl p-5 shadow-xs">
                  <div className="text-xs uppercase tracking-wider text-[#8A6753] font-semibold">Active Production</div>
                  <div className="text-2xl sm:text-3xl font-poppins font-bold text-[#C58A19] mt-2 tabular-nums">
                    {stats?.pendingOrders || orders.filter(o => o.status === 'pending' || o.status === 'in_production').length}
                  </div>
                  <div className="text-[11px] text-amber-700 mt-1">Pending & preparing</div>
                </div>

                <div className="bg-white border border-[#EBDCC8] rounded-2xl p-5 shadow-xs">
                  <div className="text-xs uppercase tracking-wider text-[#8A6753] font-semibold">Catalog Items</div>
                  <div className="text-2xl sm:text-3xl font-poppins font-bold text-[#4A2116] mt-2 tabular-nums">
                    {products.length}
                  </div>
                  <div className="text-[11px] text-[#8A6753] mt-1">Across {categoriesList.length} categories</div>
                </div>

              </div>

              {/* Recent Orders Overview Table */}
              <div className="bg-white border border-[#EBDCC8] rounded-2xl shadow-xs p-6">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className="font-serif font-bold text-base text-[#4A2116]">Recent Orders</h3>
                    <p className="text-xs text-[#8A6753]">Latest customer celebration orders</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab('orders')}
                    className="text-xs font-semibold text-[#C58A19] hover:text-[#4A2116] transition-colors cursor-pointer"
                  >
                    View All Orders →
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-[#F2E6D5] text-xs text-[#8A6753] uppercase tracking-wider">
                        <th className="pb-3 font-semibold">Order ID</th>
                        <th className="pb-3 font-semibold">Type</th>
                        <th className="pb-3 font-semibold">Customer</th>
                        <th className="pb-3 font-semibold">Item</th>
                        <th className="pb-3 font-semibold">Delivery Date</th>
                        <th className="pb-3 font-semibold">Amount</th>
                        <th className="pb-3 font-semibold">Status</th>
                        <th className="pb-3 font-semibold text-right">Details</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F9F3EA]">
                      {orders.length === 0 ? (
                        <tr>
                          <td colSpan="8" className="py-8 text-center text-xs text-[#8A6753]">
                            No orders placed yet. New celebration orders will appear here automatically.
                          </td>
                        </tr>
                      ) : (
                        orders.slice(0, 5).map(order => (
                        <tr key={order.id} className="hover:bg-[#FFFDF8] transition-colors">
                          <td className="py-3.5 font-semibold text-[#4A2116] text-xs">
                            {order.order_number}
                          </td>
                          <td className="py-3.5">
                            {isCustomOrder(order) ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#FFF4DE] text-[#C58A19] border border-[#E5C583]">
                                <Wand2 className="w-2.5 h-2.5" />
                                <span>Custom</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#FAF5ED] text-[#7A5846] border border-[#E2D2BD]">
                                <Package className="w-2.5 h-2.5" />
                                <span>Normal</span>
                              </span>
                            )}
                          </td>
                          <td className="py-3.5">
                            <div className="font-medium text-[#33180F]">{order.customer_name}</div>
                            <div className="text-xs text-[#8A6753]">{order.customer_phone}</div>
                          </td>
                          <td className="py-3.5 max-w-xs">
                            <div className="font-medium text-[#4A2116] truncate">{order.cake_type}</div>
                            <div className="text-xs text-[#8A6753] truncate">{order.delivery_city || 'Dubai'}</div>
                          </td>
                          <td className="py-3.5 text-xs text-[#5C3A28]">
                            {order.delivery_date}
                          </td>
                          <td className="py-3.5 font-bold text-[#4A2116] font-poppins tabular-nums">
                            AED {order.total_amount}
                          </td>
                          <td className="py-3.5">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium capitalize ${
                              order.status === 'delivered' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                              order.status === 'ready' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                              order.status === 'in_production' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                              'bg-[#FAF5ED] text-[#7A5846] border border-[#E2D2BD]'
                            }`}>
                              {order.status.replace('_', ' ')}
                            </span>
                          </td>
                          <td className="py-3.5 text-right">
                            <button
                              type="button"
                              onClick={() => setSelectedOrder(order)}
                              className="p-1.5 text-[#8A6753] hover:text-[#4A2116] hover:bg-[#FAF5ED] rounded-lg transition-colors cursor-pointer"
                              title="View Specifications"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      )))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ==================================================== */}
          {/* TAB 2: ORDERS MANAGEMENT */}
          {/* ==================================================== */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              
              {/* Filter Bar */}
              <div className="bg-white border border-[#EBDCC8] rounded-2xl p-4 sm:p-5 shadow-xs space-y-3.5">
                
                {/* Row 1: Order Type Filter & Search Bar */}
                <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
                  
                  {/* Order Type Filter Segment */}
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#8A6753] hidden sm:inline shrink-0">
                      Order Type:
                    </span>
                    <div className="inline-flex items-center gap-1 bg-[#FAF5ED] p-1 rounded-xl border border-[#E2D2BD] w-full sm:w-auto overflow-x-auto scrollbar-none">
                      <button
                        type="button"
                        onClick={() => setOrderTypeFilter('all')}
                        className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                          orderTypeFilter === 'all'
                            ? 'bg-[#4A2116] text-white shadow-xs'
                            : 'text-[#7A5846] hover:text-[#4A2116]'
                        }`}
                      >
                        All Orders ({orders.length})
                      </button>
                      <button
                        type="button"
                        onClick={() => setOrderTypeFilter('custom')}
                        className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                          orderTypeFilter === 'custom'
                            ? 'bg-[#C58A19] text-white shadow-xs'
                            : 'text-[#C58A19] hover:bg-white/80'
                        }`}
                      >
                        <Wand2 className="w-3.5 h-3.5" />
                        <span>Customization ({orders.filter(isCustomOrder).length})</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setOrderTypeFilter('normal')}
                        className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                          orderTypeFilter === 'normal'
                            ? 'bg-[#4A2116] text-white shadow-xs'
                            : 'text-[#7A5846] hover:bg-white/80'
                        }`}
                      >
                        <Package className="w-3.5 h-3.5" />
                        <span>Normal ({orders.filter(o => !isCustomOrder(o)).length})</span>
                      </button>
                    </div>
                  </div>

                  {/* Search Input */}
                  <div className="relative min-w-[240px] sm:w-72">
                    <Search className="w-4 h-4 text-[#A07A65] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={orderSearch}
                      onChange={(e) => setOrderSearch(e.target.value)}
                      placeholder="Search order ID, client, item..."
                      className="w-full bg-[#FAF5ED] border border-[#E2D2BD] rounded-xl pl-9 pr-8 py-2 text-xs text-[#4A2116] outline-none focus:border-[#C58A19]"
                    />
                    {orderSearch && (
                      <button
                        type="button"
                        onClick={() => setOrderSearch('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8A6753] hover:text-[#4A2116] cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                </div>

                {/* Row 2: Status Lifecycle Filter Pills */}
                <div className="pt-2.5 border-t border-[#F2E6D5] flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#8A6753] mr-1.5 shrink-0">
                    Status:
                  </span>
                  {[
                    { id: 'all', label: 'All Statuses' },
                    { id: 'pending', label: 'Pending' },
                    { id: 'in_production', label: 'In Production' },
                    { id: 'ready', label: 'Ready' },
                    { id: 'delivered', label: 'Delivered' },
                    { id: 'cancelled', label: 'Cancelled' }
                  ].map(tab => {
                    const count = tab.id === 'all' 
                      ? orders.length 
                      : orders.filter(o => o.status === tab.id).length;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setOrderFilter(tab.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                          orderFilter === tab.id
                            ? 'bg-[#4A2116] text-white font-semibold shadow-xs'
                            : 'bg-[#FAF5ED] text-[#7A5846] hover:bg-[#F2E6D5]'
                        }`}
                      >
                        <span>{tab.label}</span>
                        <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                          orderFilter === tab.id ? 'bg-white/20 text-white' : 'bg-[#EBDCC8] text-[#5C3A28]'
                        }`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>

              </div>

              {/* Orders Table */}
              <div className="bg-white border border-[#EBDCC8] rounded-2xl shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-[#FAF5ED] border-b border-[#EBDCC8] text-[10px] text-[#7A5846] uppercase font-bold tracking-wider">
                      <tr>
                        <th className="py-3.5 px-4 whitespace-nowrap">Order ID</th>
                        <th className="py-3.5 px-4 whitespace-nowrap">Order Type</th>
                        <th className="py-3.5 px-4 whitespace-nowrap">Customer</th>
                        <th className="py-3.5 px-4 min-w-[170px]">Item & Details</th>
                        <th className="py-3.5 px-4 min-w-[170px]">Delivery Schedule</th>
                        <th className="py-3.5 px-4 whitespace-nowrap">Total & Payment</th>
                        <th className="py-3.5 px-4 whitespace-nowrap">Status Action</th>
                        <th className="py-3.5 px-4 text-right whitespace-nowrap">Details</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F2E6D5]">
                      {filteredOrders.length === 0 ? (
                        <tr>
                          <td colSpan="8" className="py-12 text-center text-xs text-[#8A6753]">
                            No orders found matching your filters.
                          </td>
                        </tr>
                      ) : (
                        filteredOrders.map(order => {
                          const custom = isCustomOrder(order);
                          const payBadge = formatPaymentStatus(order.payment_status, order.payment_method);
                          return (
                            <tr key={order.id} className="hover:bg-[#FFFDF8] transition-colors">
                              
                              {/* Order ID: never wraps */}
                              <td className="py-3.5 px-4 font-mono font-bold text-[#4A2116] text-xs whitespace-nowrap">
                                {order.order_number}
                              </td>

                              {/* Order Type Badge */}
                              <td className="py-3.5 px-4 whitespace-nowrap">
                                {custom ? (
                                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#FFF4DE] text-[#C58A19] border border-[#E5C583]">
                                    <Wand2 className="w-3 h-3 text-[#C58A19]" />
                                    <span>Customization Order</span>
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#FAF5ED] text-[#7A5846] border border-[#E2D2BD]">
                                    <Package className="w-3 h-3 text-[#7A5846]" />
                                    <span>Normal Order</span>
                                  </span>
                                )}
                              </td>

                              {/* Customer */}
                              <td className="py-3.5 px-4 whitespace-nowrap">
                                <div className="font-semibold text-[#33180F] text-xs">{order.customer_name}</div>
                                <div className="text-[11px] text-[#8A6753] mt-0.5">{order.customer_phone}</div>
                              </td>

                              {/* Item & Details */}
                              <td className="py-3.5 px-4">
                                <div className="font-medium text-[#4A2116] text-xs">{order.cake_type}</div>
                                {order.cake_details?.theme && (
                                  <div className="text-[11px] text-[#C58A19] mt-0.5 font-medium">Theme: {order.cake_details.theme}</div>
                                )}
                              </td>

                              {/* Delivery Schedule (Formatted Cleanly!) */}
                              <td className="py-3.5 px-4">
                                <div className="font-semibold text-[#4A2116] text-xs whitespace-nowrap">
                                  {formatOrderDate(order.delivery_date)}
                                </div>
                                <div className="text-[11px] text-[#8A6753] mt-0.5">
                                  {formatTimeSlot(order.delivery_time_slot)}
                                </div>
                                {order.delivery_address && (
                                  <div className="text-[11px] text-[#A07A65] truncate max-w-[180px] mt-0.5" title={order.delivery_address}>
                                    {order.delivery_address}
                                  </div>
                                )}
                              </td>

                              {/* Total & Payment */}
                              <td className="py-3.5 px-4 whitespace-nowrap">
                                <div className="font-bold text-[#4A2116] font-poppins text-xs tabular-nums">
                                  AED {parseFloat(order.total_amount || 0).toFixed(2)}
                                </div>
                                <span className={`inline-block mt-0.5 text-[10px] px-2 py-0.5 rounded-md font-semibold border ${payBadge.style}`}>
                                  {payBadge.text}
                                </span>
                              </td>

                              {/* Status Action */}
                              <td className="py-3.5 px-4 whitespace-nowrap">
                                <select
                                  value={order.status || 'pending'}
                                  onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                                  className="bg-[#FAF5ED] border border-[#DBC9B5] text-xs font-semibold rounded-lg px-2.5 py-1.5 text-[#4A2116] outline-none focus:border-[#C58A19] cursor-pointer"
                                >
                                  <option value="pending">Pending</option>
                                  <option value="in_production">In Production</option>
                                  <option value="ready">Ready for Dispatch</option>
                                  <option value="delivered">Delivered</option>
                                  <option value="cancelled">Cancelled</option>
                                </select>
                              </td>

                              {/* View Details */}
                              <td className="py-3.5 px-4 text-right whitespace-nowrap">
                                <button
                                  type="button"
                                  onClick={() => setSelectedOrder(order)}
                                  className="p-1.5 text-[#8A6753] hover:text-[#4A2116] hover:bg-[#FAF5ED] rounded-lg transition-colors cursor-pointer"
                                  title="View Order Details"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                              </td>

                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ==================================================== */}
          {/* TAB 2.2: CAKE CUSTOMIZATIONS (Interactive 3D Builder) */}
          {/* ==================================================== */}
          {activeTab === 'customizations' && (
            <div className="space-y-6">

              {/* Header Card & Quick Actions */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-[#EBDCC8] rounded-2xl p-5 sm:p-6 shadow-xs">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#4A2116]">
                    Bespoke Cake Customizations
                  </h3>
                  <p className="text-xs sm:text-sm text-[#7A5846] mt-1">
                    Review and manage all custom cake architectures designed by clients.
                  </p>
                </div>
                <div className="flex items-center gap-2 self-stretch sm:self-auto">
                  <button
                    type="button"
                    onClick={fetchDashboardData}
                    className="p-2.5 text-[#7A5846] hover:text-[#4A2116] hover:bg-[#FAF5ED] border border-[#E2D2BD] rounded-xl transition-colors cursor-pointer"
                    title="Refresh Customizations"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* KPI Metrics Row */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white border border-[#EBDCC8] rounded-2xl p-4 sm:p-5 shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-[#8A6753] uppercase tracking-wider">Total Built</span>
                    <div className="w-8 h-8 rounded-xl bg-[#FAF5ED] text-[#C58A19] flex items-center justify-center">
                      <Wand2 className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="font-serif text-2xl sm:text-3xl font-bold text-[#4A2116]">
                    {customizations.length}
                  </div>
                  <p className="text-[11px] text-[#8A6753] mt-1">Saved custom designs</p>
                </div>

                <div className="bg-white border border-[#EBDCC8] rounded-2xl p-4 sm:p-5 shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">New Requests</span>
                    <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                      <Sparkles className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="font-serif text-2xl sm:text-3xl font-bold text-[#4A2116]">
                    {customizations.filter(c => c.status === 'new').length}
                  </div>
                  <p className="text-[11px] text-[#8A6753] mt-1">Awaiting pastry review</p>
                </div>

                <div className="bg-white border border-[#EBDCC8] rounded-2xl p-4 sm:p-5 shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider">In Kitchen</span>
                    <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                      <Cake className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="font-serif text-2xl sm:text-3xl font-bold text-[#4A2116]">
                    {customizations.filter(c => c.status === 'in_kitchen').length}
                  </div>
                  <p className="text-[11px] text-[#8A6753] mt-1">Active baking & sculpting</p>
                </div>

                <div className="bg-white border border-[#EBDCC8] rounded-2xl p-4 sm:p-5 shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">Pipeline Value</span>
                    <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs">
                      AED
                    </div>
                  </div>
                  <div className="font-serif text-2xl sm:text-3xl font-bold text-[#4A2116]">
                    AED {customizations.reduce((acc, c) => acc + (parseFloat(c.total_price) || 0), 0).toLocaleString()}
                  </div>
                  <p className="text-[11px] text-[#8A6753] mt-1">Total estimated custom value</p>
                </div>
              </div>

              {/* Filter Tabs & Search */}
              <div className="bg-white border border-[#EBDCC8] rounded-2xl p-4 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
                  {[
                    { id: 'all', label: 'All Builds', count: customizations.length },
                    { id: 'new', label: 'New', count: customizations.filter(c => c.status === 'new').length },
                    { id: 'reviewed', label: 'Reviewed', count: customizations.filter(c => c.status === 'reviewed').length },
                    { id: 'in_kitchen', label: 'In Kitchen', count: customizations.filter(c => c.status === 'in_kitchen').length },
                    { id: 'completed', label: 'Completed', count: customizations.filter(c => c.status === 'completed').length },
                    { id: 'cancelled', label: 'Cancelled', count: customizations.filter(c => c.status === 'cancelled').length }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setCustomizationFilter(tab.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                        customizationFilter === tab.id
                          ? 'bg-[#4A2116] text-white shadow-xs'
                          : 'bg-[#FAF5ED] text-[#7A5846] hover:bg-[#F2E5D5]'
                      }`}
                    >
                      <span>{tab.label}</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                        customizationFilter === tab.id ? 'bg-white/20 text-white' : 'bg-[#EBDCC8] text-[#5C3A28]'
                      }`}>
                        {tab.count}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="relative min-w-[240px]">
                  <Search className="w-4 h-4 text-[#8A6753] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={customizationSearch}
                    onChange={(e) => setCustomizationSearch(e.target.value)}
                    placeholder="Search code, client, flavor, message..."
                    className="w-full bg-[#FAF5ED] border border-[#E2D2BD] rounded-xl pl-9 pr-3 py-2 text-xs text-[#4A2116] placeholder:text-[#9C7A65] outline-none focus:border-[#C58A19]"
                  />
                  {customizationSearch && (
                    <button
                      type="button"
                      onClick={() => setCustomizationSearch('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8A6753] hover:text-[#4A2116] cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Customizations Table */}
              <div className="bg-white border border-[#EBDCC8] rounded-2xl shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-[#FAF5ED] border-b border-[#EBDCC8] text-[#7A5846] uppercase font-bold text-[10px] tracking-wider">
                        <th className="py-3.5 px-4">Custom Code & Date</th>
                        <th className="py-3.5 px-4">Design & Occasion</th>
                        <th className="py-3.5 px-4">Architecture</th>
                        <th className="py-3.5 px-4">Flavors (Sponge & Filling)</th>
                        <th className="py-3.5 px-4">Plaque Message</th>
                        <th className="py-3.5 px-4 text-right">Price</th>
                        <th className="py-3.5 px-4 text-center">Status</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F2E5D5]">
                      {filteredCustomizations.length === 0 ? (
                        <tr>
                          <td colSpan="8" className="py-12 text-center text-[#8A6753]">
                            <div className="max-w-xs mx-auto">
                              <Wand2 className="w-8 h-8 mx-auto text-[#C58A19]/50 mb-2" />
                              <p className="font-medium text-[#4A2116]">No custom cake designs found</p>
                              <p className="text-[11px] text-[#8A6753] mt-1">
                                {customizationSearch || customizationFilter !== 'all'
                                  ? 'No matching designs found for your filters. Try clearing your search.'
                                  : 'Customers who build custom cakes at /customize will have their full specifications appear here.'}
                              </p>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        filteredCustomizations.map((item) => {
                          const toppingsArray = Array.isArray(item.toppings)
                            ? item.toppings
                            : (typeof item.toppings === 'string' && item.toppings ? (() => { try { return JSON.parse(item.toppings); } catch(e) { return [item.toppings]; } })() : []);
                          const toppersArray = Array.isArray(item.birthday_toppers)
                            ? item.birthday_toppers
                            : (typeof item.birthday_toppers === 'string' && item.birthday_toppers ? (() => { try { return JSON.parse(item.birthday_toppers); } catch(e) { return [item.birthday_toppers]; } })() : []);

                          return (
                            <tr key={item.id} className="hover:bg-[#FFFDF8] transition-colors">
                              <td className="py-3.5 px-4 font-medium text-[#4A2116]">
                                <div className="font-semibold text-[#4A2116] flex items-center gap-1.5">
                                  <span className="font-mono text-[11px] text-[#C58A19] font-bold">
                                    {item.customization_code || `CUST-#${item.id}`}
                                  </span>
                                </div>
                                <div className="text-[10px] text-[#8A6753] mt-0.5">
                                  {item.created_at ? new Date(item.created_at).toLocaleDateString('en-AE', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Recent'}
                                </div>
                                {item.customer_name && (
                                  <div className="text-[11px] text-[#33180F] font-medium mt-1">
                                    {item.customer_name}
                                  </div>
                                )}
                              </td>

                              <td className="py-3.5 px-4">
                                <div className="flex items-center gap-2.5">
                                  <div className="w-12 h-12 rounded-xl bg-[#FAF5ED] border border-[#EBDCC8] overflow-hidden shrink-0 flex items-center justify-center">
                                    {item.preview_image ? (
                                      <img
                                        src={formatImageUrl(item.preview_image)}
                                        alt={item.theme_design || 'Custom Cake'}
                                        className="w-full h-full object-cover"
                                        onError={(e) => { e.target.style.display = 'none'; }}
                                      />
                                    ) : (
                                      <Cake className="w-5 h-5 text-[#C58A19]" />
                                    )}
                                  </div>
                                  <div>
                                    <div className="font-serif font-bold text-[#4A2116] text-xs">
                                      {item.occasion || 'Custom Celebration'}
                                    </div>
                                    <div className="text-[11px] text-[#8A6753]">
                                      {item.theme_design || 'Signature Style'}
                                    </div>
                                    {(toppingsArray.length > 0 || toppersArray.length > 0) && (
                                      <span className="inline-block text-[10px] text-[#C58A19] font-medium mt-0.5">
                                        +{toppingsArray.length + toppersArray.length} accents and toppers
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </td>

                              <td className="py-3.5 px-4">
                                <div className="font-medium text-[#4A2116]">
                                  {item.shape || 'Round'} &bull; {item.tiers || '1 Tier'}
                                </div>
                                <div className="text-[11px] text-[#8A6753]">
                                  {item.size || 'Standard'} &bull; {item.servings || '12-16 Servings'}
                                </div>
                              </td>

                              <td className="py-3.5 px-4 max-w-[200px]">
                                <div className="font-medium text-[#4A2116] truncate">
                                  <span className="text-[#8A6753]">Sponge:</span> {item.sponge_flavor || 'Vanilla'}
                                </div>
                                <div className="text-[11px] text-[#7A5846] truncate">
                                  <span className="text-[#8A6753]">Filling:</span> {item.filling_flavor || 'Classic Buttercream'}
                                </div>
                              </td>

                              <td className="py-3.5 px-4 max-w-[180px]">
                                {item.cake_message ? (
                                  <div className="bg-[#FFF9F0] border border-[#EBDCC8] rounded-lg px-2.5 py-1 text-[11px] font-serif italic text-[#4A2116] truncate" title={item.cake_message}>
                                    "{item.cake_message}"
                                  </div>
                                ) : (
                                  <span className="text-[11px] text-[#9C7A65] italic">No plaque message</span>
                                )}
                              </td>

                              <td className="py-3.5 px-4 text-right">
                                <div className="font-bold text-[#4A2116] text-xs font-poppins">
                                  AED {parseFloat(item.total_price || 0).toLocaleString()}
                                </div>
                              </td>

                              <td className="py-3.5 px-4 text-center">
                                <select
                                  value={item.status || 'new'}
                                  onChange={(e) => handleUpdateCustomizationStatus(item.id, e.target.value)}
                                  className={`text-[11px] font-semibold rounded-lg px-2 py-1 border outline-none cursor-pointer ${
                                    item.status === 'completed'
                                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                      : item.status === 'in_kitchen'
                                      ? 'bg-blue-50 text-blue-700 border-blue-200'
                                      : item.status === 'reviewed'
                                      ? 'bg-purple-50 text-purple-700 border-purple-200'
                                      : item.status === 'cancelled'
                                      ? 'bg-red-50 text-red-700 border-red-200'
                                      : 'bg-amber-50 text-amber-700 border-amber-200'
                                  }`}
                                >
                                  <option value="new">New Submission</option>
                                  <option value="reviewed">Reviewed</option>
                                  <option value="in_kitchen">In Kitchen</option>
                                  <option value="completed">Completed</option>
                                  <option value="cancelled">Cancelled</option>
                                </select>
                              </td>

                              <td className="py-3.5 px-4 text-right">
                                <div className="flex items-center justify-end gap-1">
                                  <button
                                    type="button"
                                    onClick={() => setSelectedCustomization(item)}
                                    className="p-1.5 text-[#8A6753] hover:text-[#4A2116] hover:bg-[#FAF5ED] rounded-lg transition-colors cursor-pointer"
                                    title="View Full Spec Sheet"
                                  >
                                    <Eye className="w-4 h-4" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteCustomization(item.id)}
                                    className="p-1.5 text-[#8A6753] hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                    title="Delete Specification"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ==================================================== */}
          {/* TAB 2.5: CATEGORIES MANAGEMENT (Add & View Categories) */}
          {/* ==================================================== */}
          {activeTab === 'categories' && (
            <div className="space-y-6">
              
              {/* Header Card & Actions */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-[#EBDCC8] rounded-2xl p-5 sm:p-6 shadow-xs">
                <div>
                  <div className="text-xs text-[#C58A19] font-bold uppercase tracking-wider">
                    Storefront Taxonomy
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#4A2116] mt-0.5">
                    Category Management
                  </h3>
                  <p className="text-xs sm:text-sm text-[#7A5846] mt-1">
                    Manage current cake collections or create new categories with custom banners.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setNewCategory({
                      name: '',
                      slug: '',
                      description: '',
                      image_url: '/Elegant Ivory Wedding Cake Banner.png',
                      sort_order: String(categoriesList.length + 1)
                    });
                    setShowAddCategory(true);
                  }}
                  className="bg-[#4A2116] hover:bg-[#C58A19] text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Category</span>
                </button>
              </div>

              {/* Search & Filter Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-[#EBDCC8] rounded-2xl p-4 shadow-xs">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 text-[#A07A65] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={categorySearch}
                    onChange={(e) => setCategorySearch(e.target.value)}
                    placeholder="Search existing categories..."
                    className="w-full bg-[#FAF5ED] border border-[#E2D2BD] rounded-xl pl-9 pr-3 py-2 text-xs text-[#4A2116] outline-none focus:border-[#C58A19]"
                  />
                </div>

                <div className="text-xs text-[#7A5846] font-medium">
                  Showing <span className="font-bold text-[#4A2116]">{filteredCategories.length}</span> of {categoriesList.length} categories
                </div>
              </div>

              {/* Categories Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filteredCategories.map(cat => {
                  const productCount = getCategoryProductCount(cat.slug || cat.id, products);

                  return (
                    <div 
                      key={cat.id || cat.slug} 
                      className="bg-white border border-[#EBDCC8] rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between group"
                    >
                      <div>
                        {/* Category Banner Preview */}
                        <div className="h-36 bg-[#2B140B] relative overflow-hidden">
                          <img
                            src={cat.banner || cat.image_url}
                            alt={cat.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                          <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between gap-1.5 flex-wrap">
                            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-black/50 backdrop-blur-xs text-[#E6C783]">
                              Slug: {cat.slug || cat.id}
                            </span>
                            {cat.parent === 'wedding' && (
                              <span className="text-[9.5px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-[#C58A19]/80 backdrop-blur-xs text-white">
                                Wedding Subcategory
                              </span>
                            )}
                            {cat.parent === 'corporate-cakes' && (
                              <span className="text-[9.5px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-[#4A2116]/80 backdrop-blur-xs text-[#E6C783]">
                                Corporate Subcategory
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Category Info */}
                        <div className="p-4">
                          <div className="flex items-center justify-between gap-2">
                            <h4 className="font-serif font-bold text-base text-[#4A2116] line-clamp-1">
                              {cat.name}
                            </h4>
                            <span className="text-[11px] font-semibold bg-[#FAF5ED] text-[#7A5846] px-2 py-0.5 rounded-md border border-[#EBDCC8] shrink-0">
                              {productCount} items
                            </span>
                          </div>
                          <p className="text-xs text-[#7A5846] mt-1.5 line-clamp-2 min-h-[32px]">
                            {cat.description || 'Custom crafted celebration cakes and artisanal pastries.'}
                          </p>
                        </div>
                      </div>

                      {/* Footer Actions */}
                      <div className="p-4 pt-0 border-t border-[#F5EBDD] mt-2 flex items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={() => handleSelectCategory(cat)}
                          className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold text-[#4A2116] bg-[#FAF5ED] hover:bg-[#C58A19] hover:text-white py-2 px-3 rounded-xl transition-colors cursor-pointer border border-[#E2D2BD]"
                        >
                          <Package className="w-3.5 h-3.5" />
                          <span>View Products</span>
                        </button>
                        
                        <button
                          type="button"
                          onClick={() => handleDeleteCategory(cat)}
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                          title="Delete Category"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {filteredCategories.length === 0 && (
                <div className="bg-white border border-[#EBDCC8] rounded-2xl p-12 text-center shadow-xs">
                  <FolderTree className="w-10 h-10 text-[#C58A19] mx-auto mb-3 opacity-60" />
                  <h4 className="font-serif font-bold text-base text-[#4A2116]">No matching categories found</h4>
                  <p className="text-xs text-[#8A6753] mt-1">Try adjusting your search query or add a new category.</p>
                </div>
              )}

            </div>
          )}

          {/* ==================================================== */}
          {/* TAB 3: CATEGORY CAKES VIEW (Selected from Sidebar) */}
          {/* ==================================================== */}
          {activeTab === 'category' && (
            <div className="space-y-6">
              
              {/* Category Header Card with Banner */}
              <div className="relative rounded-2xl overflow-hidden bg-[#24130A] border border-[#EBDCC8] shadow-xs">
                <div className="relative w-full aspect-[2172/724] min-h-[160px] sm:min-h-[190px] flex items-center">
                  <img 
                    src={selectedCategory.banner} 
                    alt={selectedCategory.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#201007]/95 via-[#261208]/85 to-transparent w-full sm:w-[60%]" />
                  <div className="relative z-10 p-6 sm:p-8 max-w-xl text-left">
                    <div className="text-xs text-[#C58A19] font-bold uppercase tracking-wider mb-1">
                      Category Collection
                    </div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
                      {selectedCategory.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#F5EBDD] mt-1.5 max-w-md">
                      Catalog inventory and pricing in AED for {selectedCategory.name}.
                    </p>
                  </div>
                </div>
              </div>

              {/* Subcategories Quick Switcher (For Wedding & Corporate Collections) */}
              {(() => {
                const sId = selectedCategory.slug || selectedCategory.id;
                const isWedding = ['wedding', 'wedding-cakes', ...weddingSubIds].includes(sId);
                const isCorporate = ['corporate-cakes', 'corporate', 'corporate-cookies', 'cupcakes-with-logo'].includes(sId);
                
                if (isWedding) {
                  return (
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
                      <button
                        type="button"
                        onClick={() => handleSelectCategory(weddingCategory)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                          sId === 'wedding' || sId === 'wedding-cakes'
                            ? 'bg-[#C58A19] text-white shadow-xs'
                            : 'bg-white text-[#4A2116] border border-[#EBDCC8] hover:bg-[#FAF5ED]'
                        }`}
                      >
                        All Wedding ({getCategoryProductCount('wedding', products)})
                      </button>
                      {weddingSubs.map(sub => {
                        const isSubActive = sId === sub.slug || sId === sub.id;
                        const subCount = getCategoryProductCount(sub.slug || sub.id, products);
                        return (
                          <button
                            key={sub.id}
                            type="button"
                            onClick={() => handleSelectCategory(sub)}
                            className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                              isSubActive
                                ? 'bg-[#C58A19] text-white font-semibold shadow-xs'
                                : 'bg-white text-[#4A2116] border border-[#EBDCC8] hover:bg-[#FAF5ED]'
                            }`}
                          >
                            {sub.name} {subCount > 0 ? `(${subCount})` : ''}
                          </button>
                        );
                      })}
                    </div>
                  );
                }

                if (isCorporate) {
                  return (
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
                      {corporateSubs.map(sub => {
                        const isSubActive = sId === sub.slug || sId === sub.id;
                        const subCount = getCategoryProductCount(sub.slug || sub.id, products);
                        return (
                          <button
                            key={sub.id}
                            type="button"
                            onClick={() => handleSelectCategory(sub)}
                            className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                              isSubActive
                                ? 'bg-[#C58A19] text-white font-semibold shadow-xs'
                                : 'bg-white text-[#4A2116] border border-[#EBDCC8] hover:bg-[#FAF5ED]'
                            }`}
                          >
                            {sub.name} {subCount > 0 ? `(${subCount})` : ''}
                          </button>
                        );
                      })}
                    </div>
                  );
                }

                return null;
              })()}

              {/* Action & Filter Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-[#EBDCC8] rounded-2xl p-4 sm:p-5 shadow-xs">
                
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 text-[#A07A65] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    placeholder={`Search in ${selectedCategory.name}...`}
                    className="w-full bg-[#FAF5ED] border border-[#E2D2BD] rounded-xl pl-9 pr-3 py-2 text-xs text-[#4A2116] outline-none focus:border-[#C58A19]"
                  />
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <span className="text-xs text-[#8A6753] font-medium hidden md:inline">
                    {categoryCakes.length} items
                  </span>

                  <button
                    type="button"
                    onClick={handleOpenAdd}
                    className="w-full sm:w-auto bg-[#4A2116] hover:bg-[#C58A19] text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Item</span>
                  </button>
                </div>

              </div>

              {/* Items Table View */}
              {categoryCakes.length === 0 ? (
                <div className="bg-white border border-[#EBDCC8] rounded-2xl p-12 text-center shadow-xs">
                  <h4 className="font-serif font-bold text-base text-[#4A2116]">No items found in {selectedCategory.name}</h4>
                  <p className="text-xs text-[#8A6753] mt-1 max-w-sm mx-auto">
                    Click below to add the first item to this category.
                  </p>
                  <button
                    type="button"
                    onClick={handleOpenAdd}
                    className="mt-4 inline-flex items-center gap-2 bg-[#4A2116] hover:bg-[#C58A19] text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add First Item</span>
                  </button>
                </div>
              ) : (
                <div className="bg-white border border-[#EBDCC8] rounded-2xl shadow-xs overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[700px]">
                      <thead>
                        <tr className="bg-[#FAF5ED] border-b border-[#EBDCC8] text-[11px] uppercase tracking-wider text-[#7A5846] font-semibold">
                          <th className="py-3.5 px-4">Cake</th>
                          <th className="py-3.5 px-4">Title & Description</th>
                          <th className="py-3.5 px-4">Category</th>
                          <th className="py-3.5 px-4">Price</th>
                          <th className="py-3.5 px-4">Flavor</th>
                          <th className="py-3.5 px-4">Servings</th>
                          <th className="py-3.5 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#F2E5D5] text-xs">
                        {categoryCakes.map((prod) => (
                          <tr key={prod.id} className="hover:bg-[#FAF8F5] transition-colors group">
                            {/* Image Thumbnail with 2-Photo Indicator */}
                            <td className="py-3 px-4">
                              <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-[#FAF5ED] border border-[#EBDCC8] shrink-0 shadow-2xs">
                                <img
                                  src={formatImageUrl(prod.image_url)}
                                  alt={prod.title}
                                  onError={(e) => {
                                    e.currentTarget.onerror = null;
                                    e.currentTarget.src = '/Lebanese Dream Bakery Cake Display.png';
                                  }}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                {prod.secondary_image_url && (
                                  <span 
                                    className="absolute bottom-0.5 right-0.5 bg-black/75 text-[#E6C783] text-[9px] font-bold px-1 rounded"
                                    title="Has 2 Photos"
                                  >
                                    2P
                                  </span>
                                )}
                              </div>
                            </td>

                            {/* Title, Slug & Description */}
                            <td className="py-3 px-4 max-w-xs">
                              <div className="font-serif font-bold text-sm text-[#4A2116] line-clamp-1">
                                <span>{prod.title}</span>
                              </div>
                              <div className="text-[10.5px] text-[#A07A65] font-mono mt-0.5 flex items-center gap-1">
                                <span>/product/{prod.slug || slugify(prod.title) || prod.id}</span>
                              </div>
                              {prod.description ? (
                                <div className="text-[11px] text-[#8A6753] line-clamp-2 mt-0.5 leading-relaxed">
                                  {prod.description}
                                </div>
                              ) : (
                                <div className="text-[11px] text-[#A08070] italic mt-0.5">
                                  No description added
                                </div>
                              )}
                            </td>

                            {/* Category Pill */}
                            <td className="py-3 px-4 whitespace-nowrap">
                              <span className="inline-block text-[10.5px] font-semibold text-[#C58A19] bg-[#FAF5ED] px-2.5 py-1 rounded-md border border-[#EBDCC8]">
                                {selectedCategory.name}
                              </span>
                            </td>

                            {/* Price */}
                            <td className="py-3 px-4 whitespace-nowrap">
                              <span className="font-bold text-[#4A2116] bg-[#FAF3E8] px-2.5 py-1 rounded-lg border border-[#E5C583]/50 text-xs">
                                AED {prod.price}
                              </span>
                            </td>

                            {/* Flavor */}
                            <td className="py-3 px-4 max-w-[180px]">
                              <div className="text-[11.5px] text-[#4A2116] font-medium line-clamp-1">
                                {prod.flavor || '—'}
                              </div>
                            </td>

                            {/* Servings */}
                            <td className="py-3 px-4 whitespace-nowrap">
                              <span className="text-[11px] text-[#7A5846] bg-[#FAF5ED] px-2 py-0.5 rounded border border-[#EBDCC8]">
                                {prod.servings || '—'}
                              </span>
                            </td>

                            {/* Actions (Edit and Delete) */}
                            <td className="py-3 px-4 text-right whitespace-nowrap">
                              <div className="inline-flex items-center gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => handleOpenEdit(prod)}
                                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-[#4A2116] hover:text-[#C58A19] bg-[#FAF5ED] hover:bg-white border border-[#EBDCC8] transition-colors cursor-pointer shadow-2xs"
                                  title="Edit Cake"
                                >
                                  <Edit3 className="w-3.5 h-3.5 text-[#C58A19]" />
                                  <span>Edit</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteProduct(prod.id)}
                                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-red-600 hover:text-white bg-red-50 hover:bg-red-600 border border-red-200 transition-colors cursor-pointer shadow-2xs"
                                  title="Delete Cake"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                  <span>Delete</span>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ==================================================== */}
          {/* TAB 4: INQUIRIES & CONSULTATIONS */}
          {/* ==================================================== */}
          {activeTab === 'inquiries' && (
            <div className="bg-white border border-[#EBDCC8] rounded-2xl shadow-xs p-6 space-y-4">
              <div>
                <h3 className="font-serif font-bold text-base text-[#4A2116]">Event & Tasting Inquiries</h3>
                <p className="text-xs text-[#8A6753]">Consultation requests submitted by wedding and corporate clients</p>
              </div>

              <div className="divide-y divide-[#F2E6D5]">
                {inquiries.length === 0 ? (
                  <div className="py-12 text-center text-xs text-[#8A6753]">
                    No inquiries or consultation requests submitted yet.
                  </div>
                ) : (
                  inquiries.map(inq => (
                  <div key={inq.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#4A2116]">{inq.customer_name}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                          inq.status === 'unread' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {inq.status}
                        </span>
                      </div>
                      <div className="text-xs text-[#8A6753] mt-0.5">
                        {inq.phone} • {inq.email} • Event: {inq.event_type}
                      </div>
                      <p className="text-xs text-[#33180F] mt-1.5 bg-[#FAF5ED] p-2.5 rounded-lg border border-[#EDE1D1]">
                        "{inq.message}"
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <a
                        href={`tel:${inq.phone}`}
                        className="bg-[#4A2116] hover:bg-[#C58A19] text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
                      >
                        Contact Client
                      </a>
                    </div>
                  </div>
                )))}
              </div>
            </div>
          )}

        </main>

      </div>

      {/* ==================================================== */}
      {/* MODAL 1: ORDER DETAILS */}
      {/* ==================================================== */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#EBDCC8] rounded-2xl max-w-lg w-full p-6 shadow-2xl relative animate-fadeIn">
            
            <button
              type="button"
              onClick={() => setSelectedOrder(null)}
              className="absolute top-4 right-4 text-[#8A6753] hover:text-[#4A2116] p-1 rounded-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center justify-between gap-2 pr-6">
              <div>
                <div className="text-xs uppercase font-bold text-[#C58A19] tracking-wider">Order Specification</div>
                <h3 className="font-serif font-bold text-xl text-[#4A2116] mt-0.5">{selectedOrder.order_number}</h3>
              </div>
              {isCustomOrder(selectedOrder) ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#FFF4DE] text-[#C58A19] border border-[#E5C583]">
                  <Wand2 className="w-3.5 h-3.5 text-[#C58A19]" />
                  <span>Customization Order</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#FAF5ED] text-[#7A5846] border border-[#E2D2BD]">
                  <Package className="w-3.5 h-3.5 text-[#7A5846]" />
                  <span>Normal Order</span>
                </span>
              )}
            </div>

            <div className="mt-4 space-y-3 text-xs text-[#5C3A28]">
              <div className="p-3 rounded-xl bg-[#FAF5ED] border border-[#EBDCC8]">
                <div className="font-bold text-sm text-[#4A2116]">{selectedOrder.cake_type}</div>
                {selectedOrder.cake_details && (
                  <div className="mt-2 space-y-1 text-xs">
                    {Object.entries(selectedOrder.cake_details).map(([key, val]) => (
                      <div key={key} className="flex justify-between">
                        <span className="capitalize text-[#8A6753]">{key.replace(/([A-Z])/g, ' $1')}:</span>
                        <span className="font-medium text-[#4A2116]">{String(val)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-[#FAF5ED] border border-[#EBDCC8]">
                  <span className="text-[#8A6753] block text-[10px] uppercase font-bold">Customer</span>
                  <div className="font-bold text-[#4A2116]">{selectedOrder.customer_name}</div>
                  <div>{selectedOrder.customer_phone}</div>
                </div>
                <div className="p-3 rounded-xl bg-[#FAF5ED] border border-[#EBDCC8]">
                  <span className="text-[#8A6753] block text-[10px] uppercase font-bold">Delivery</span>
                  <div className="font-bold text-[#4A2116]">{selectedOrder.delivery_date}</div>
                  <div>{selectedOrder.delivery_time_slot || 'Standard'}</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#FAF5ED] border border-[#EBDCC8]">
                <span className="text-[#8A6753] block text-[10px] uppercase font-bold">Delivery Address</span>
                <div className="font-medium text-[#4A2116]">{selectedOrder.delivery_address}</div>
              </div>

              {selectedOrder.order_notes && (
                <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200">
                  <span className="text-amber-800 block text-[10px] uppercase font-bold">Instructions</span>
                  <div className="text-amber-900">{selectedOrder.order_notes}</div>
                </div>
              )}

              <div className="flex items-center justify-between pt-3 border-t border-[#EBDCC8]">
                <span className="font-bold text-sm text-[#4A2116]">Total Amount:</span>
                <span className="font-poppins font-bold text-lg text-[#C58A19] tabular-nums">AED {selectedOrder.total_amount}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSelectedOrder(null)}
              className="w-full mt-5 bg-[#4A2116] text-white text-xs font-semibold py-2.5 rounded-xl hover:bg-[#C58A19] transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* MODAL 2: ADD NEW PRODUCT */}
      {/* ==================================================== */}
      {showAddProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#EBDCC8] rounded-2xl max-w-lg w-full p-6 shadow-2xl relative animate-fadeIn max-h-[92vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setShowAddProduct(false)}
              className="absolute top-4 right-4 text-[#8A6753] hover:text-[#4A2116] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4 pr-6">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-serif font-bold text-lg text-[#4A2116]">
                  {editingProduct ? 'Edit Cake Details' : 'Add Cake to Catalog'}
                </h3>
                <span className="text-[11px] font-semibold bg-[#FAF5ED] text-[#C58A19] px-2.5 py-0.5 rounded-full border border-[#EBDCC8]">
                  {selectedCategory.name}
                </span>
              </div>
              <p className="text-[11px] text-[#8A6753] mt-0.5">
                {editingProduct 
                  ? `Update specifications and photos for "${editingProduct.title}"` 
                  : 'Register a new cake with description, pricing, and 2 high-res photos'}
              </p>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-3.5 text-xs">
              
              {/* 1. Item Title (Shown First) */}
              <div>
                <label className="block font-semibold text-[#4A2116] mb-1">
                  Item Title *
                </label>
                <input
                  type="text"
                  required
                  value={newProduct.title}
                  onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                  placeholder="e.g. Royal Golden Pistachio Cake"
                  className="w-full bg-[#FAF5ED] border border-[#E2D2BD] rounded-xl px-3 py-2 text-sm text-[#4A2116] outline-none focus:border-[#C58A19]"
                />
              </div>

              {/* 2. Price & Clean URL Preview (Shown After Title) */}
              <div className="bg-[#FAF5ED] p-2.5 rounded-xl border border-[#EBDCC8] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex-1">
                  <label className="block font-semibold text-[#4A2116] mb-1">Price (AED) *</label>
                  <input
                    type="number"
                    required
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    placeholder="750"
                    className="w-full bg-white border border-[#E2D2BD] rounded-lg px-3 py-1.5 text-sm font-bold text-[#4A2116] outline-none focus:border-[#C58A19]"
                  />
                </div>
                <div className="text-[11px] text-[#8A6753] sm:pt-4">
                  Product URL: <span className="font-mono text-[#C58A19]">/product/{slugify(newProduct.title) || '...'}</span>
                </div>
              </div>

              {/* 3. Servings & Flavor */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#4A2116] mb-1">Servings</label>
                  <input
                    type="text"
                    value={newProduct.servings}
                    onChange={(e) => setNewProduct({ ...newProduct, servings: e.target.value })}
                    placeholder="e.g. 15-20 servings"
                    className="w-full bg-[#FAF5ED] border border-[#E2D2BD] rounded-xl px-3 py-2 text-sm text-[#4A2116] outline-none focus:border-[#C58A19]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#4A2116] mb-1">Flavor</label>
                  <input
                    type="text"
                    value={newProduct.flavor}
                    onChange={(e) => setNewProduct({ ...newProduct, flavor: e.target.value })}
                    placeholder="e.g. Belgian Chocolate Ganache"
                    className="w-full bg-[#FAF5ED] border border-[#E2D2BD] rounded-xl px-3 py-2 text-sm text-[#4A2116] outline-none focus:border-[#C58A19]"
                  />
                </div>
              </div>

              {/* 4. Description */}
              <div>
                <label className="block font-semibold text-[#4A2116] mb-1">Description</label>
                <textarea
                  rows="3"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  placeholder="Detailed description of cake design, sponge layers, fillings, and custom handcrafted toppings..."
                  className="w-full bg-[#FAF5ED] border border-[#E2D2BD] rounded-xl px-3 py-2 text-xs text-[#4A2116] outline-none focus:border-[#C58A19] resize-none"
                />
              </div>

              {/* 2 Cake Images Upload Section */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="font-semibold text-[#4A2116] flex items-center gap-1.5">
                    <Camera className="w-4 h-4 text-[#C58A19]" />
                    <span>Cake Images (Upload 2 Photos)</span>
                  </label>
                  <span className="text-[11px] text-[#8A6753]">Accepts 2 Images</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {/* Photo 1: Primary View */}
                  <div className="space-y-1">
                    <div className="text-[10px] uppercase font-bold text-[#8A6753] tracking-wider">
                      1. Primary Image *
                    </div>
                    {uploadingSlot1 ? (
                      <div className="h-28 border border-[#EBDCC8] bg-[#FAF5ED] rounded-xl flex flex-col items-center justify-center p-2 text-center animate-pulse">
                        <RefreshCw className="w-5 h-5 text-[#C58A19] animate-spin mb-1" />
                        <span className="text-xs font-semibold text-[#4A2116]">Optimizing photo...</span>
                        <span className="text-[10px] text-[#8A6753]">Compressing & uploading</span>
                      </div>
                    ) : newProduct.image_url ? (
                      <div className="relative h-28 rounded-xl overflow-hidden border border-[#EBDCC8] bg-[#FAF5ED] group shadow-2xs">
                        <img
                          src={formatImageUrl(newProduct.image_url)}
                          alt="Primary Cake Preview"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <label className="px-2 py-1 bg-white text-[#4A2116] rounded-lg cursor-pointer hover:bg-[#FAF5ED] text-[11px] font-semibold flex items-center gap-1 shadow-xs">
                            <Upload className="w-3 h-3" />
                            <span>Change</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 1)}
                            />
                          </label>
                          <button
                            type="button"
                            onClick={() => setNewProduct(prev => ({ ...prev, image_url: '' }))}
                            className="p-1 bg-red-600 text-white rounded-lg hover:bg-red-700 shadow-xs cursor-pointer"
                            title="Remove"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <label className="h-28 border-2 border-dashed border-[#E2D2BD] hover:border-[#C58A19] bg-[#FAF5ED] hover:bg-[#F5EBDD] rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors p-2 text-center group">
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center mb-1 text-[#C58A19] group-hover:scale-110 transition-transform shadow-2xs">
                          <Upload className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-semibold text-[#4A2116]">Upload Image 1</span>
                        <span className="text-[10px] text-[#8A6753]">Front / Main View</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 1)}
                        />
                      </label>
                    )}
                  </div>

                  {/* Photo 2: Secondary / Detail View */}
                  <div className="space-y-1">
                    <div className="text-[10px] uppercase font-bold text-[#8A6753] tracking-wider">
                      2. Secondary Image
                    </div>
                    {uploadingSlot2 ? (
                      <div className="h-28 border border-[#EBDCC8] bg-[#FAF5ED] rounded-xl flex flex-col items-center justify-center p-2 text-center animate-pulse">
                        <RefreshCw className="w-5 h-5 text-[#C58A19] animate-spin mb-1" />
                        <span className="text-xs font-semibold text-[#4A2116]">Optimizing photo...</span>
                        <span className="text-[10px] text-[#8A6753]">Compressing & uploading</span>
                      </div>
                    ) : newProduct.secondary_image_url ? (
                      <div className="relative h-28 rounded-xl overflow-hidden border border-[#EBDCC8] bg-[#FAF5ED] group shadow-2xs">
                        <img
                          src={formatImageUrl(newProduct.secondary_image_url)}
                          alt="Secondary Cake Preview"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <label className="px-2 py-1 bg-white text-[#4A2116] rounded-lg cursor-pointer hover:bg-[#FAF5ED] text-[11px] font-semibold flex items-center gap-1 shadow-xs">
                            <Upload className="w-3 h-3" />
                            <span>Change</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 2)}
                            />
                          </label>
                          <button
                            type="button"
                            onClick={() => setNewProduct(prev => ({ ...prev, secondary_image_url: '' }))}
                            className="p-1 bg-red-600 text-white rounded-lg hover:bg-red-700 shadow-xs cursor-pointer"
                            title="Remove"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <label className="h-28 border-2 border-dashed border-[#E2D2BD] hover:border-[#C58A19] bg-[#FAF5ED] hover:bg-[#F5EBDD] rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors p-2 text-center group">
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center mb-1 text-[#A07A65] group-hover:scale-110 transition-transform shadow-2xs">
                          <Upload className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-semibold text-[#4A2116]">Upload Image 2</span>
                        <span className="text-[10px] text-[#8A6753]">Side / Cut Detail</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 2)}
                        />
                      </label>
                    )}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={uploadingSlot1 || uploadingSlot2}
                className="w-full mt-4 bg-[#4A2116] hover:bg-[#C58A19] disabled:opacity-60 text-white font-semibold py-2.5 rounded-xl transition-colors cursor-pointer text-sm flex items-center justify-center gap-2"
              >
                {(uploadingSlot1 || uploadingSlot2) ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Processing Images...</span>
                  </>
                ) : (
                  <span>{editingProduct ? 'Update Cake' : 'Save Item'}</span>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* MODAL 3: ADD NEW CATEGORY */}
      {/* ==================================================== */}
      {showAddCategory && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#EBDCC8] rounded-2xl max-w-md w-full p-6 shadow-2xl relative animate-fadeIn">
            <button
              type="button"
              onClick={() => setShowAddCategory(false)}
              className="absolute top-4 right-4 text-[#8A6753] hover:text-[#4A2116] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#FAF5ED] border border-[#EBDCC8] flex items-center justify-center text-[#C58A19]">
                <FolderPlus className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-[#4A2116]">
                  Add New Category
                </h3>
                <p className="text-[11px] text-[#8A6753]">Create a new cake collection in the database</p>
              </div>
            </div>

            <form onSubmit={handleAddCategory} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-[#4A2116] mb-1">Category Name *</label>
                <input
                  type="text"
                  required
                  value={newCategory.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    const autoSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                    setNewCategory(prev => ({
                      ...prev,
                      name,
                      slug: prev.slug === '' || prev.slug === autoSlug.slice(0, -1) ? autoSlug : prev.slug
                    }));
                  }}
                  placeholder="e.g. Anniversary Cakes"
                  className="w-full bg-[#FAF5ED] border border-[#E2D2BD] rounded-xl px-3 py-2 text-sm text-[#4A2116] outline-none focus:border-[#C58A19]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#4A2116] mb-1">Slug (URL Key)</label>
                  <input
                    type="text"
                    value={newCategory.slug}
                    onChange={(e) => setNewCategory({ ...newCategory, slug: e.target.value })}
                    placeholder="anniversary-cakes"
                    className="w-full bg-[#FAF5ED] border border-[#E2D2BD] rounded-xl px-3 py-2 text-xs text-[#4A2116] outline-none focus:border-[#C58A19]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#4A2116] mb-1">Sort Order</label>
                  <input
                    type="number"
                    value={newCategory.sort_order}
                    onChange={(e) => setNewCategory({ ...newCategory, sort_order: e.target.value })}
                    placeholder="21"
                    className="w-full bg-[#FAF5ED] border border-[#E2D2BD] rounded-xl px-3 py-2 text-xs text-[#4A2116] outline-none focus:border-[#C58A19]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#4A2116] mb-1">Banner Image URL</label>
                <input
                  type="text"
                  value={newCategory.image_url}
                  onChange={(e) => setNewCategory({ ...newCategory, image_url: e.target.value })}
                  placeholder="/Elegant Ivory Wedding Cake Banner.png"
                  className="w-full bg-[#FAF5ED] border border-[#E2D2BD] rounded-xl px-3 py-2 text-xs text-[#4A2116] outline-none focus:border-[#C58A19]"
                />
                {newCategory.image_url && (
                  <div className="mt-2 h-20 rounded-lg overflow-hidden border border-[#EBDCC8] bg-[#FAF5ED]">
                    <img
                      src={newCategory.image_url}
                      alt="Banner Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block font-semibold text-[#4A2116] mb-1">Description</label>
                <textarea
                  rows="2"
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                  placeholder="Custom milestone and romantic celebration creations..."
                  className="w-full bg-[#FAF5ED] border border-[#E2D2BD] rounded-xl px-3 py-2 text-xs text-[#4A2116] outline-none focus:border-[#C58A19] resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddCategory(false)}
                  className="px-4 py-2.5 rounded-xl border border-[#E2D2BD] text-[#7A5846] hover:bg-[#FAF5ED] transition-colors font-medium text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#4A2116] hover:bg-[#C58A19] text-white font-semibold px-5 py-2.5 rounded-xl transition-colors cursor-pointer text-xs"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* MODAL 4: VIEW FULL BESPOKE CUSTOMIZATION SPECIFICATION */}
      {/* ==================================================== */}
      {selectedCustomization && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white border border-[#EBDCC8] rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-[#EBDCC8] flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#C58A19] bg-[#FAF5ED] px-2 py-0.5 rounded-md border border-[#EBDCC8]">
                    {selectedCustomization.customization_code || `CUST-#${selectedCustomization.id}`}
                  </span>
                  <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full capitalize ${
                    selectedCustomization.status === 'completed'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : selectedCustomization.status === 'in_kitchen'
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : selectedCustomization.status === 'reviewed'
                      ? 'bg-purple-50 text-purple-700 border border-purple-200'
                      : selectedCustomization.status === 'cancelled'
                      ? 'bg-red-50 text-red-700 border border-red-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                    {selectedCustomization.status?.replace('_', ' ') || 'New'}
                  </span>
                </div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#4A2116] mt-1">
                  {selectedCustomization.occasion} Cake Specifications
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="p-2 text-[#7A5846] hover:text-[#4A2116] hover:bg-[#FAF5ED] rounded-xl transition-colors cursor-pointer border border-[#E2D2BD]"
                  title="Print Kitchen Ticket"
                >
                  <Printer className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedCustomization(null)}
                  className="p-2 text-[#8A6753] hover:text-[#4A2116] hover:bg-[#FAF5ED] rounded-xl transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 space-y-5">
              
              {/* Top Summary Banner: Image + Key Architecture */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 bg-[#FAF5ED] border border-[#EBDCC8] rounded-2xl p-4 sm:p-5">
                <div className="md:col-span-4 rounded-xl overflow-hidden bg-white border border-[#EBDCC8] h-48 md:h-full min-h-[160px] flex items-center justify-center">
                  {selectedCustomization.preview_image ? (
                    <img
                      src={formatImageUrl(selectedCustomization.preview_image)}
                      alt={selectedCustomization.theme_design || 'Custom Cake Preview'}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  ) : (
                    <Cake className="w-12 h-12 text-[#C58A19]" />
                  )}
                </div>

                <div className="md:col-span-8 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="text-xs uppercase font-bold text-[#C58A19] tracking-wider">Design Theme</div>
                    <div className="font-serif text-xl font-bold text-[#4A2116]">{selectedCustomization.theme_design || 'Signature Bespoke Design'}</div>
                    <div className="text-xs text-[#7A5846] mt-0.5">Occasion: <span className="font-semibold text-[#4A2116]">{selectedCustomization.occasion}</span></div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-[#EBDCC8]/60 text-xs">
                    <div className="bg-white/80 p-2 rounded-lg border border-[#EBDCC8]">
                      <div className="text-[10px] text-[#8A6753]">Shape</div>
                      <div className="font-semibold text-[#4A2116]">{selectedCustomization.shape || 'Round'}</div>
                    </div>
                    <div className="bg-white/80 p-2 rounded-lg border border-[#EBDCC8]">
                      <div className="text-[10px] text-[#8A6753]">Tiers</div>
                      <div className="font-semibold text-[#4A2116]">{selectedCustomization.tiers || '1 Tier'}</div>
                    </div>
                    <div className="bg-white/80 p-2 rounded-lg border border-[#EBDCC8]">
                      <div className="text-[10px] text-[#8A6753]">Size</div>
                      <div className="font-semibold text-[#4A2116]">{selectedCustomization.size || 'Standard'}</div>
                    </div>
                    <div className="bg-white/80 p-2 rounded-lg border border-[#EBDCC8]">
                      <div className="text-[10px] text-[#8A6753]">Servings</div>
                      <div className="font-semibold text-[#4A2116]">{selectedCustomization.servings || '12-16'}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-[#8A6753]">Estimated Price:</span>
                    <span className="font-serif text-xl font-bold text-[#4A2116] font-poppins">
                      AED {parseFloat(selectedCustomization.total_price || 0).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Flavor Profile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-white border border-[#EBDCC8] rounded-xl p-4">
                  <div className="text-xs uppercase font-bold text-[#8A6753] tracking-wider mb-1">Sponge Flavor</div>
                  <div className="font-semibold text-[#4A2116] text-sm">{selectedCustomization.sponge_flavor || 'Not selected'}</div>
                </div>
                <div className="bg-white border border-[#EBDCC8] rounded-xl p-4">
                  <div className="text-xs uppercase font-bold text-[#8A6753] tracking-wider mb-1">Filling and Cream</div>
                  <div className="font-semibold text-[#4A2116] text-sm">{selectedCustomization.filling_flavor || 'Not selected'}</div>
                </div>
              </div>

              {/* Plaque Message Inscription */}
              <div className="bg-[#FFF9F0] border-2 border-dashed border-[#C58A19]/40 rounded-xl p-4">
                <div className="text-xs uppercase font-bold text-[#C58A19] tracking-wider mb-1">
                  Hand-Piped Plaque Inscription
                </div>
                {selectedCustomization.cake_message ? (
                  <p className="font-serif italic text-base sm:text-lg text-[#4A2116]">
                    "{selectedCustomization.cake_message}"
                  </p>
                ) : (
                  <p className="text-xs text-[#8A6753] italic">No custom message requested on plaque.</p>
                )}
              </div>

              {/* Toppings & Birthday Accents */}
              <div className="space-y-3">
                <div>
                  <div className="text-xs uppercase font-bold text-[#8A6753] tracking-wider mb-1.5">Artisanal Toppings and Accents</div>
                  {(() => {
                    const toppings = Array.isArray(selectedCustomization.toppings)
                      ? selectedCustomization.toppings
                      : (typeof selectedCustomization.toppings === 'string' && selectedCustomization.toppings ? (() => { try { return JSON.parse(selectedCustomization.toppings); } catch(e) { return [selectedCustomization.toppings]; } })() : []);
                    return toppings.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5">
                        {toppings.map((t, idx) => (
                          <span key={idx} className="inline-flex items-center gap-1 px-3 py-1 bg-[#FAF5ED] border border-[#EBDCC8] rounded-full text-xs text-[#4A2116] font-medium">
                            <Sparkles className="w-3 h-3 text-[#C58A19]" />
                            {typeof t === 'string' ? t : t.name || JSON.stringify(t)}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-[#8A6753]">None selected</p>
                    );
                  })()}
                </div>

                <div>
                  <div className="text-xs uppercase font-bold text-[#8A6753] tracking-wider mb-1.5">Toppers and Keepsakes</div>
                  {(() => {
                    const toppers = Array.isArray(selectedCustomization.birthday_toppers)
                      ? selectedCustomization.birthday_toppers
                      : (typeof selectedCustomization.birthday_toppers === 'string' && selectedCustomization.birthday_toppers ? (() => { try { return JSON.parse(selectedCustomization.birthday_toppers); } catch(e) { return [selectedCustomization.birthday_toppers]; } })() : []);
                    return toppers.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5">
                        {toppers.map((t, idx) => (
                          <span key={idx} className="inline-flex items-center gap-1 px-3 py-1 bg-[#FAF5ED] border border-[#EBDCC8] rounded-full text-xs text-[#4A2116] font-medium">
                            <Cake className="w-3 h-3 text-[#C58A19]" />
                            {typeof t === 'string' ? t : t.name || JSON.stringify(t)}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-[#8A6753]">None selected</p>
                    );
                  })()}
                </div>
              </div>

              {/* Client & Delivery Info */}
              {(selectedCustomization.customer_name || selectedCustomization.delivery_address || selectedCustomization.delivery_date) && (
                <div className="bg-white border border-[#EBDCC8] rounded-xl p-4 space-y-2">
                  <div className="text-xs uppercase font-bold text-[#8A6753] tracking-wider">Client and Logistics Details</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <div className="text-[#8A6753]">Customer:</div>
                      <div className="font-semibold text-[#4A2116]">{selectedCustomization.customer_name || 'N/A'}</div>
                      <div className="text-[#8A6753]">{selectedCustomization.customer_phone || ''}</div>
                      <div className="text-[#8A6753]">{selectedCustomization.customer_email || ''}</div>
                    </div>
                    <div>
                      <div className="text-[#8A6753]">Delivery Date and Slot:</div>
                      <div className="font-semibold text-[#4A2116]">{selectedCustomization.delivery_date || 'Standard Schedule'} {selectedCustomization.delivery_time_slot ? `(${selectedCustomization.delivery_time_slot})` : ''}</div>
                      <div className="text-[#8A6753] mt-1">Delivery Address:</div>
                      <div className="text-[#4A2116]">{selectedCustomization.delivery_address || 'Dubai, UAE'}</div>
                    </div>
                  </div>
                  {selectedCustomization.notes && (
                    <div className="pt-2 border-t border-[#EBDCC8] text-xs">
                      <span className="text-[#8A6753]">Notes: </span>
                      <span className="text-[#4A2116]">{selectedCustomization.notes}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Status Transition Quick Action Buttons */}
              <div className="pt-3 border-t border-[#EBDCC8] flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs font-semibold text-[#7A5846]">Change Kitchen Status:</div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleUpdateCustomizationStatus(selectedCustomization.id, 'reviewed')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
                      selectedCustomization.status === 'reviewed'
                        ? 'bg-purple-600 text-white'
                        : 'bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200'
                    }`}
                  >
                    Reviewed
                  </button>
                  <button
                    type="button"
                    onClick={() => handleUpdateCustomizationStatus(selectedCustomization.id, 'in_kitchen')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
                      selectedCustomization.status === 'in_kitchen'
                        ? 'bg-blue-600 text-white'
                        : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200'
                    }`}
                  >
                    In Kitchen
                  </button>
                  <button
                    type="button"
                    onClick={() => handleUpdateCustomizationStatus(selectedCustomization.id, 'completed')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
                      selectedCustomization.status === 'completed'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                    }`}
                  >
                    Completed
                  </button>
                  <button
                    type="button"
                    onClick={() => handleUpdateCustomizationStatus(selectedCustomization.id, 'cancelled')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
                      selectedCustomization.status === 'cancelled'
                        ? 'bg-red-600 text-white'
                        : 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200'
                    }`}
                  >
                    Cancel
                  </button>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-[#FAF5ED] border-t border-[#EBDCC8] flex items-center justify-between">
              <button
                type="button"
                onClick={() => handleDeleteCustomization(selectedCustomization.id)}
                className="inline-flex items-center gap-1.5 text-xs text-red-600 hover:text-red-800 font-medium cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Specification</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedCustomization(null)}
                className="px-4 py-2 bg-[#4A2116] hover:bg-[#C58A19] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Close Spec Sheet
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
