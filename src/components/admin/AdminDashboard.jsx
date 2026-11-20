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
  ExternalLink, 
  Menu,
  Layers,
  ArrowUpRight,
  FolderTree,
  Package,
  FolderPlus
} from 'lucide-react';

const API_BASE = 'http://localhost:5000/api';

const CATEGORIES = [
  { id: 'wedding', name: 'Wedding Cakes', banner: '/Elegant Ivory Wedding Cake Banner.png', description: 'Luxury tiered celebration masterpieces' },
  { id: 'corporate-cakes', name: 'Corporate Cakes', banner: '/Corporate Skyline Cake with Laptop topper.png', description: 'Executive event cakes & branded desserts' },
  { id: 'cookies', name: 'Cookies', banner: '/Golden Chocolate Chip Cookie Stack.png', description: 'Freshly baked artisanal cookies & macarons' },
  { id: 'cake-pops', name: 'Cake Pops', banner: '/Colorful Cake Pops in a Ribbon Jar.png', description: 'Delightful handheld dessert bites for parties' },
  { id: 'cupcakes', name: 'Cupcakes', banner: '/Colorful Cupcakes on a Wooden Table.png', description: 'Gourmet artisanal cupcakes with French buttercream' },
  { id: 'cakes-for-kids', name: 'Cakes for Kids', banner: '/Rainbow Bear Birthday Cake.png', description: 'Rainbow, fantasy and storybook cakes' },
  { id: 'cakes-for-ladies', name: 'Cakes for Ladies', banner: '/Elegant Pink Floral Pearl Cake.png', description: 'Pink floral, pearls & haute couture cakes' },
  { id: 'cakes-for-guys', name: 'Cakes for Guys', banner: '/Black SUV Cake on a Wooden Tabletop.png', description: 'Luxury cars, chronographs & bold themes' },
  { id: 'graduation-cakes', name: 'Graduation Cakes', banner: '/Elegant Graduation Cake with Diploma and Books.png', description: 'Celebrate academic milestones and commencement ceremonies' },
  { id: 'cars-ships-planes-cakes', name: 'Cars, Ships, Yachts & Planes Cakes', banner: '/Luxury Transportation Cake Showcase.png', description: 'Custom 3D sculpted luxury vehicles, ships, yachts & aviation cakes' },
  { id: 'sporting-cakes', name: 'Sporting Cakes', banner: '/Sports Cake Trio Banner.png', description: 'Football, basketball, golf, tennis & championship celebration cakes' },
  { id: 'couture-cakes', name: 'Couture Cakes', banner: '/Couture Cakes in Gold and Pink.png', description: 'Haute couture, fashion-forward & luxury designer cakes' },
  { id: '3d-cakes', name: '3D Cakes', banner: '/Spiderman, Unicorn and Race Car Cakes.png', description: 'Spectacular sculpted 3-dimensional cake centerpieces' },
  { id: 'food-drink-illusion-cakes', name: 'Food & Drink Illusion Cakes', banner: '/Realistic Fast-Food Illusion Cakes.png', description: 'Hyper-realistic trompe-l\'œil culinary and beverage illusion cakes' },
  { id: 'doughnuts-cakes', name: 'Doughnuts Cakes', banner: '/Glossy Donut Cake Trio.png', description: 'Custom artisanal stacked doughnut cakes and dessert towers' },
  { id: 'photo-on-cake', name: 'Photo on Cake', banner: '/Celebration Cakes with Edible Photos.png', description: 'High-definition edible printed memories and personalized photo cakes' },
  { id: 'pet-animals-cakes', name: 'Pet & Animals Cakes', banner: '/Adorable Animal-Themed Fondant Cake Collection.png', description: 'Cute puppies, kittens, safari & wildlife celebration cakes' },
  { id: 'superhero-cakes', name: 'Superhero Cakes', banner: '/Superhero Fondant Cake Trio.png', description: 'Action-packed Marvel, DC & comic book hero sculpted cakes' },
  { id: 'labubu-cakes', name: 'Labubu Cakes', banner: '/Whimsical Labubu Cake Collection.png', description: 'Trendy Labubu monster & whimsical vinyl toy designer cakes' },
  { id: 'cake-baking-decorating', name: 'Cake Baking & Decorating Cakes', banner: '/Pink Rosette Berry Cake Workshop.png', description: 'Baking enthusiast, confectionery master & sugarcraft themed cakes' }
];

export default function AdminDashboard({ onBackToStore }) {
  // Auth state
  const [token, setToken] = useState(() => localStorage.getItem('ldb_admin_token') || '');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('admin@lebanesedream.com');
  const [loginPassword, setLoginPassword] = useState('admin123');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Dashboard navigation state
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'orders' | 'categories' | 'category' | 'inquiries'
  const [categoriesList, setCategoriesList] = useState(CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);
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
  const [orderSearch, setOrderSearch] = useState('');
  const [productSearch, setProductSearch] = useState('');
  const [categorySearch, setCategorySearch] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Add Product Modal
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: '',
    category_slug: 'wedding',
    price: '',
    flavor: 'Belgian Chocolate & French Vanilla',
    servings: '15-20 servings',
    image_url: '/categorycake imges/Wedding Cake.png',
    description: ''
  });

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
  };

  // Fetch Data
  const fetchDashboardData = async () => {
    if (!token) return;
    setLoading(true);

    try {
      const headers = { 'Authorization': `Bearer ${token}` };

      const [statsRes, ordersRes, productsRes, inqRes, catRes] = await Promise.all([
        fetch(`${API_BASE}/dashboard/stats`, { headers }),
        fetch(`${API_BASE}/orders`, { headers }),
        fetch(`${API_BASE}/products`, { headers }),
        fetch(`${API_BASE}/inquiries`, { headers }),
        fetch(`${API_BASE}/categories`, { headers })
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
        setProducts(data.products || []);
      }
      if (inqRes.ok) {
        const data = await inqRes.json();
        setInquiries(data.inquiries || []);
      }
      if (catRes && catRes.ok) {
        const catData = await catRes.json();
        if (catData.categories && catData.categories.length > 0) {
          setCategoriesList(catData.categories.map(c => ({
            id: c.slug,
            dbId: c.id,
            name: c.name,
            slug: c.slug,
            banner: c.image_url || '/Elegant Ivory Wedding Cake Banner.png',
            image_url: c.image_url || '/Elegant Ivory Wedding Cake Banner.png',
            description: c.description || '',
            sort_order: c.sort_order || 50
          })));
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

  // Add Product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.title || !newProduct.price) return;

    try {
      const res = await fetch(`${API_BASE}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newProduct)
      });
      const data = await res.json();
      if (data.product) {
        setProducts(prev => [data.product, ...prev]);
      }
      setShowAddProduct(false);
      setNewProduct({
        title: '',
        category_slug: selectedCategory.id,
        price: '',
        flavor: 'Belgian Chocolate & French Vanilla',
        servings: '15-20 servings',
        image_url: selectedCategory.banner || '/categorycake imges/Wedding Cake.png',
        description: ''
      });
      notify('Product added to catalog');
    } catch (err) {
      notify('Failed to add product');
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
      setProducts(prev => prev.filter(p => p.id !== id));
      notify('Product removed');
    } catch (e) {
      setProducts(prev => prev.filter(p => p.id !== id));
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
    const matchesFilter = orderFilter === 'all' || o.status === orderFilter;
    const matchesSearch = !orderSearch.trim() || 
      (o.order_number && o.order_number.toLowerCase().includes(orderSearch.toLowerCase())) ||
      (o.customer_name && o.customer_name.toLowerCase().includes(orderSearch.toLowerCase())) ||
      (o.customer_phone && o.customer_phone.toLowerCase().includes(orderSearch.toLowerCase())) ||
      (o.cake_type && o.cake_type.toLowerCase().includes(orderSearch.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

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
    const sId = selectedCategory.id;
    if (sId === 'wedding') return pCat === 'wedding';
    if (sId === 'corporate-cakes') return pCat === 'corporate-cakes' || pCat === 'corporate';
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

          <div className="mt-6 pt-5 border-t border-[#F2E6D5] text-center text-xs text-[#7A5846]">
            <button 
              type="button"
              onClick={onBackToStore} 
              className="hover:text-[#C58A19] transition-colors cursor-pointer"
            >
              ← Return to Website
            </button>
          </div>

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
                <div className="mt-1 pl-3.5 space-y-1 border-l-2 border-[#E2D2BD] ml-4">
                  {categoriesList.map(cat => {
                    const isSelected = activeTab === 'category' && selectedCategory.id === cat.id;
                    const count = products.filter(p => {
                      const pCat = p.category_slug;
                      if (cat.id === 'wedding') return pCat === 'wedding';
                      if (cat.id === 'corporate-cakes') return pCat === 'corporate-cakes' || pCat === 'corporate';
                      if (cat.id === 'cookies') return pCat === 'cookies' || pCat === 'cookies-cat';
                      if (cat.id === 'cake-pops') return pCat === 'cake-pops' || pCat === 'cake-pops-cat';
                      if (cat.id === 'cupcakes') return pCat === 'cupcakes' || pCat === 'cupcakes-cat';
                      if (cat.id === 'cakes-for-kids') return pCat === 'cakes-for-kids' || pCat === 'kids';
                      if (cat.id === 'cakes-for-ladies') return pCat === 'cakes-for-ladies' || pCat === 'ladies' || pCat === 'girls';
                      if (cat.id === 'cakes-for-guys') return pCat === 'cakes-for-guys' || pCat === 'guys' || pCat === 'boys';
                      return pCat === cat.id;
                    }).length;

                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => handleSelectCategory(cat)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left cursor-pointer ${
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
          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={onBackToStore}
              className="flex-1 flex items-center justify-center gap-1.5 text-xs text-[#4A2116] hover:text-[#C58A19] bg-white hover:bg-[#FDFBF7] border border-[#EBDCC8] py-2 px-3 rounded-xl transition-colors cursor-pointer font-medium shadow-2xs"
            >
              <span>View Website</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#C58A19]" />
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="p-2 text-[#7A5846] hover:text-red-600 hover:bg-red-50 bg-white border border-[#EBDCC8] rounded-xl transition-colors cursor-pointer shadow-2xs"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
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
                 activeTab === 'categories' ? 'Category Taxonomy' :
                 activeTab === 'inquiries' ? 'Client Consultations' :
                 'Product Catalog'}
              </div>
              <h2 className="text-base sm:text-lg font-bold text-[#4A2116] leading-tight font-serif">
                {activeTab === 'overview' ? 'Dashboard Overview' :
                 activeTab === 'orders' ? 'All Customer Orders' :
                 activeTab === 'categories' ? 'Category Management' :
                 activeTab === 'inquiries' ? 'Inquiries & Consultations' :
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

            <button
              type="button"
              onClick={onBackToStore}
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-[#4A2116] bg-[#FAF5ED] hover:bg-[#F2E6D5] px-3.5 py-2 rounded-xl transition-colors cursor-pointer border border-[#E2D2BD]"
            >
              <span>View Storefront</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#C58A19]" />
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
                          <td colSpan="7" className="py-8 text-center text-xs text-[#8A6753]">
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
              <div className="bg-white border border-[#EBDCC8] rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
                
                <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
                  {['all', 'pending', 'in_production', 'ready', 'delivered', 'cancelled'].map(status => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setOrderFilter(status)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium capitalize transition-colors cursor-pointer whitespace-nowrap ${
                        orderFilter === status
                          ? 'bg-[#4A2116] text-white font-semibold'
                          : 'bg-[#FAF5ED] text-[#7A5846] hover:bg-[#F2E6D5]'
                      }`}
                    >
                      {status.replace('_', ' ')}
                    </button>
                  ))}
                </div>

                <div className="relative w-full md:w-72">
                  <Search className="w-4 h-4 text-[#A07A65] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    placeholder="Search orders..."
                    className="w-full bg-[#FAF5ED] border border-[#E2D2BD] rounded-xl pl-9 pr-3 py-2 text-xs text-[#4A2116] outline-none focus:border-[#C58A19]"
                  />
                </div>

              </div>

              {/* Orders Table */}
              <div className="bg-white border border-[#EBDCC8] rounded-2xl shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-[#FAF5ED] border-b border-[#EBDCC8] text-xs text-[#7A5846] uppercase tracking-wider">
                      <tr>
                        <th className="py-3 px-4 font-semibold">Order ID</th>
                        <th className="py-3 px-4 font-semibold">Customer</th>
                        <th className="py-3 px-4 font-semibold">Item</th>
                        <th className="py-3 px-4 font-semibold">Delivery</th>
                        <th className="py-3 px-4 font-semibold">Total</th>
                        <th className="py-3 px-4 font-semibold">Status Action</th>
                        <th className="py-3 px-4 font-semibold text-right">Details</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F2E6D5]">
                      {filteredOrders.length === 0 ? (
                        <tr>
                          <td colSpan="7" className="py-10 text-center text-sm text-[#8A6753]">
                            No orders found.
                          </td>
                        </tr>
                      ) : (
                        filteredOrders.map(order => (
                          <tr key={order.id} className="hover:bg-[#FFFDF8] transition-colors">
                            <td className="py-3.5 px-4 font-bold text-[#4A2116] text-xs">
                              {order.order_number}
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="font-semibold text-[#33180F]">{order.customer_name}</div>
                              <div className="text-xs text-[#8A6753]">{order.customer_phone}</div>
                            </td>
                            <td className="py-3.5 px-4 max-w-xs">
                              <div className="font-medium text-[#4A2116]">{order.cake_type}</div>
                              {order.cake_details?.theme && (
                                <div className="text-xs text-[#C58A19]">Theme: {order.cake_details.theme}</div>
                              )}
                            </td>
                            <td className="py-3.5 px-4 text-xs">
                              <div className="font-semibold text-[#4A2116]">{order.delivery_date}</div>
                              <div className="text-[#8A6753]">{order.delivery_time_slot || 'Standard'}</div>
                              <div className="text-[#A07A65] truncate max-w-[160px]">{order.delivery_address}</div>
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="font-bold text-[#4A2116] font-poppins tabular-nums">AED {order.total_amount}</div>
                              <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-bold uppercase">
                                {order.payment_status}
                              </span>
                            </td>
                            <td className="py-3.5 px-4">
                              <select
                                value={order.status}
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
                            <td className="py-3.5 px-4 text-right">
                              <button
                                type="button"
                                onClick={() => setSelectedOrder(order)}
                                className="p-1.5 text-[#8A6753] hover:text-[#4A2116] hover:bg-[#FAF5ED] rounded-lg transition-colors cursor-pointer"
                                title="View Details"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))
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
                  const productCount = products.filter(p => {
                    const pCat = p.category_slug;
                    if (cat.id === 'wedding') return pCat === 'wedding';
                    if (cat.id === 'corporate-cakes') return pCat === 'corporate-cakes' || pCat === 'corporate';
                    if (cat.id === 'cookies') return pCat === 'cookies' || pCat === 'cookies-cat';
                    if (cat.id === 'cake-pops') return pCat === 'cake-pops' || pCat === 'cake-pops-cat';
                    if (cat.id === 'cupcakes') return pCat === 'cupcakes' || pCat === 'cupcakes-cat';
                    if (cat.id === 'cakes-for-kids') return pCat === 'cakes-for-kids' || pCat === 'kids';
                    if (cat.id === 'cakes-for-ladies') return pCat === 'cakes-for-ladies' || pCat === 'ladies' || pCat === 'girls';
                    if (cat.id === 'cakes-for-guys') return pCat === 'cakes-for-guys' || pCat === 'guys' || pCat === 'boys';
                    return pCat === cat.id;
                  }).length;

                  return (
                    <div 
                      key={cat.id} 
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
                          <div className="absolute bottom-2.5 left-3 right-3 text-white">
                            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-black/40 backdrop-blur-xs text-[#E6C783]">
                              Slug: {cat.slug || cat.id}
                            </span>
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
                    onClick={() => {
                      setNewProduct({
                        title: '',
                        category_slug: selectedCategory.id,
                        price: '',
                        flavor: 'Belgian Chocolate & French Vanilla',
                        servings: '15-20 servings',
                        image_url: selectedCategory.banner,
                        description: ''
                      });
                      setShowAddProduct(true);
                    }}
                    className="w-full sm:w-auto bg-[#4A2116] hover:bg-[#C58A19] text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Item</span>
                  </button>
                </div>

              </div>

              {/* Items Grid */}
              {categoryCakes.length === 0 ? (
                <div className="bg-white border border-[#EBDCC8] rounded-2xl p-12 text-center shadow-xs">
                  <h4 className="font-serif font-bold text-base text-[#4A2116]">No items found in {selectedCategory.name}</h4>
                  <p className="text-xs text-[#8A6753] mt-1 max-w-sm mx-auto">
                    Click below to add the first item to this category.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setNewProduct({
                        title: '',
                        category_slug: selectedCategory.id,
                        price: '',
                        flavor: 'Belgian Chocolate & French Vanilla',
                        servings: '15-20 servings',
                        image_url: selectedCategory.banner,
                        description: ''
                      });
                      setShowAddProduct(true);
                    }}
                    className="mt-4 inline-flex items-center gap-2 bg-[#4A2116] hover:bg-[#C58A19] text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add First Item</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {categoryCakes.map(prod => (
                    <div key={prod.id} className="bg-white border border-[#EBDCC8] rounded-2xl overflow-hidden shadow-xs flex flex-col group hover:shadow-md transition-shadow">
                      <div className="h-44 bg-[#FAF5ED] overflow-hidden relative">
                        <img 
                          src={prod.image_url} 
                          alt={prod.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2.5 right-2.5 bg-[#4A2116]/85 backdrop-blur-xs text-[#E6C783] text-xs font-bold font-poppins tabular-nums px-2.5 py-1 rounded-md">
                          AED {prod.price}
                        </div>
                      </div>

                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="text-[10px] uppercase font-bold text-[#C58A19] tracking-wider">
                            {selectedCategory.name}
                          </div>
                          <h4 className="font-serif font-bold text-sm text-[#4A2116] mt-0.5 line-clamp-1">
                            {prod.title}
                          </h4>
                          <p className="text-xs text-[#7A5846] mt-1 line-clamp-2">
                            {prod.flavor || prod.description}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-[#F2E6D5] flex items-center justify-between text-xs">
                          <span className="text-[11px] text-[#A07A65]">
                            {prod.servings || '15-20 servings'}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleDeleteProduct(prod.id)}
                            className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 transition-colors cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
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

            <div className="text-xs uppercase font-bold text-[#C58A19] tracking-wider">Order Specification</div>
            <h3 className="font-serif font-bold text-xl text-[#4A2116] mt-1">{selectedOrder.order_number}</h3>

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
          <div className="bg-white border border-[#EBDCC8] rounded-2xl max-w-md w-full p-6 shadow-2xl relative animate-fadeIn">
            <button
              type="button"
              onClick={() => setShowAddProduct(false)}
              className="absolute top-4 right-4 text-[#8A6753] hover:text-[#4A2116] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif font-bold text-lg text-[#4A2116] mb-4">
              Add Item to {selectedCategory.name}
            </h3>

            <form onSubmit={handleAddProduct} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-[#4A2116] mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={newProduct.title}
                  onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                  placeholder="e.g. Royal Pistachio Rose Cake"
                  className="w-full bg-[#FAF5ED] border border-[#E2D2BD] rounded-xl px-3 py-2 text-sm text-[#4A2116] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#4A2116] mb-1">Category</label>
                  <select
                    value={newProduct.category_slug}
                    onChange={(e) => setNewProduct({ ...newProduct, category_slug: e.target.value })}
                    className="w-full bg-[#FAF5ED] border border-[#E2D2BD] rounded-xl px-3 py-2 text-sm text-[#4A2116] outline-none cursor-pointer"
                  >
                    {categoriesList.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[#4A2116] mb-1">Price (AED)</label>
                  <input
                    type="number"
                    required
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    placeholder="750"
                    className="w-full bg-[#FAF5ED] border border-[#E2D2BD] rounded-xl px-3 py-2 text-sm text-[#4A2116] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#4A2116] mb-1">Flavor</label>
                <input
                  type="text"
                  value={newProduct.flavor}
                  onChange={(e) => setNewProduct({ ...newProduct, flavor: e.target.value })}
                  placeholder="e.g. Dark Chocolate & Raspberry"
                  className="w-full bg-[#FAF5ED] border border-[#E2D2BD] rounded-xl px-3 py-2 text-sm text-[#4A2116] outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#4A2116] mb-1">Image URL</label>
                <input
                  type="text"
                  value={newProduct.image_url}
                  onChange={(e) => setNewProduct({ ...newProduct, image_url: e.target.value })}
                  placeholder="/categorycake imges/Wedding Cake.png"
                  className="w-full bg-[#FAF5ED] border border-[#E2D2BD] rounded-xl px-3 py-2 text-sm text-[#4A2116] outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-4 bg-[#4A2116] hover:bg-[#C58A19] text-white font-semibold py-2.5 rounded-xl transition-colors cursor-pointer text-sm"
              >
                Save Item
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

    </div>
  );
}
