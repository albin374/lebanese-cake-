import React, { useState, useEffect } from 'react';
import { 
  Package, 
  Search, 
  Clock, 
  Calendar, 
  MapPin, 
  Truck, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  ChefHat, 
  ShieldCheck, 
  ArrowRight, 
  Copy, 
  Check, 
  Printer, 
  MessageCircle, 
  Sparkles, 
  ShoppingBag,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { navigateTo } from '../utils/navigation';

const API_BASE = 'http://localhost:5000/api';

export default function MyOrdersPage({ currentLang = 'en', onAddToCart, onContinueShopping }) {
  const isAr = currentLang === 'ar';

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'active' | 'delivered'
  const [copiedId, setCopiedId] = useState(null);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch orders on load (combines local saved orders + recent API lookup)
  const fetchOrders = async (query = '') => {
    setLoading(true);
    setErrorMessage('');
    try {
      // 1. Get locally saved order numbers
      let localNumbers = [];
      try {
        const stored = localStorage.getItem('ldb_customer_orders');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            localNumbers = parsed.map(o => typeof o === 'string' ? o : o.order_number).filter(Boolean);
          }
        }
      } catch (_) {}

      // 2. Build query URL
      const params = new URLSearchParams();
      if (query.trim()) {
        params.append('search', query.trim());
      } else if (localNumbers.length > 0) {
        params.append('numbers', localNumbers.join(','));
      }

      const res = await fetch(`${API_BASE}/orders/track?${params.toString()}`);
      if (!res.ok) {
        throw new Error(`Failed to load orders (${res.status})`);
      }
      const data = await res.json();

      if (data?.success && Array.isArray(data.orders)) {
        setOrders(data.orders);
        if (data.orders.length > 0 && !expandedOrder) {
          setExpandedOrder(data.orders[0].id || data.orders[0].order_number);
        }
      } else {
        setOrders([]);
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
      setErrorMessage(isAr ? 'تعذر جلب تفاصيل الطلبات حالياً. يرجى إعادة المحاولة.' : 'Could not retrieve orders at this time. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchOrders(searchQuery);
  };

  const handleCopy = (orderNum) => {
    if (!orderNum) return;
    navigator.clipboard?.writeText(orderNum);
    setCopiedId(orderNum);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Tracking stages helper
  const getOrderStage = (status = '') => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 1;
      case 'in_production':
        return 2;
      case 'ready':
        return 3;
      case 'out_for_delivery':
        return 4;
      case 'delivered':
        return 5;
      case 'cancelled':
        return -1;
      default:
        return 1;
    }
  };

  // Filter orders
  const filteredOrders = orders.filter(ord => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'delivered') return ord.status === 'delivered';
    if (activeFilter === 'active') return ord.status !== 'delivered' && ord.status !== 'cancelled';
    return true;
  });

  const bannerImage = '/Elegant Strawberry Cake Box.png';

  return (
    <div className={`w-full flex flex-col bg-[#FFF9F0] min-h-screen ${isAr ? 'font-arabic' : 'font-poppins'}`}>
      
      {/* 1. Hero Header Banner */}
      <section className="relative w-full overflow-hidden bg-[#24130A] select-none">
        <div className="relative w-full aspect-[2172/600] min-h-[170px] sm:min-h-[220px] md:min-h-[260px] flex items-center">
          
          <div className="absolute inset-0 z-0">
            <img 
              src={bannerImage} 
              alt="Lebanese Dream Bakery Confectionery" 
              className="w-full h-full object-cover object-center opacity-85"
            />
            <div 
              className={`absolute inset-0 ${
                isAr
                  ? 'bg-gradient-to-l from-[#201007]/95 via-[#261208]/85 to-[#201007]/40'
                  : 'bg-gradient-to-r from-[#201007]/95 via-[#261208]/85 to-[#201007]/40'
              }`} 
            />
          </div>

          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-6">
            <div className="max-w-xl text-left rtl:text-right">
              <h1 className="font-serif font-bold text-2xl sm:text-3xl md:text-4xl text-[#FFF9F0] leading-tight">
                {isAr ? 'طلباتي وتتبع التوصيل' : 'My Orders and Tracking'}
              </h1>
              <p className="text-xs sm:text-sm text-[#E2D2BD] mt-2 leading-relaxed">
                {isAr
                  ? 'تابع مراحل تصنيع كيكتك يدوياً في مطبخنا، وتتبع أسطول شاحنات التبريد حتى وصولها طازجة إلى موقعك.'
                  : 'Track your Lebanese cakes through kitchen mastercrafting and refrigerated chilled van delivery across Dubai and the UAE in real time.'}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Main Tracking Content */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex-1">
        
        {/* Search & Lookup Bar */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 border border-[#EBDCC8] shadow-sm mb-8">
          <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className={`w-4 h-4 text-[#C58A19] absolute top-1/2 -translate-y-1/2 ${isAr ? 'right-4' : 'left-4'}`} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isAr ? 'ابحث برقم الطلب (مثال: LDB-2026-...) أو رقم الهاتف أو البريد الإلكتروني' : 'Search by Order Number (e.g. LDB-2026-...), Phone (+971...), or Email'}
                className={`w-full bg-[#FAF5ED] border border-[#E2D2BD] rounded-2xl py-3 text-xs sm:text-sm text-[#4A2116] placeholder-[#8C6D62] outline-none focus:border-[#C58A19] transition-all ${
                  isAr ? 'pr-11 pl-4 text-right' : 'pl-11 pr-4 text-left'
                }`}
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 sm:flex-none bg-[#4A2116] hover:bg-[#C58A19] text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-2xl transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs"
              >
                {loading ? <RefreshCw className="w-4 h-4 animate-spin text-[#E6C783]" /> : <Search className="w-4 h-4" />}
                <span>{isAr ? 'تتبع الطلب' : 'Track Order'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  fetchOrders('');
                }}
                title={isAr ? 'تحديث الطلبات' : 'Refresh orders'}
                className="p-3 bg-[#FAF5ED] hover:bg-[#F2E5D5] text-[#4A2116] rounded-2xl border border-[#E2D2BD] transition-colors cursor-pointer"
              >
                <RefreshCw className={`w-4 h-4 text-[#C58A19] ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </form>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 pt-4 mt-4 border-t border-[#F5EBDD] flex-wrap">
            <span className="text-xs font-semibold text-[#8C6D62] mr-2 rtl:mr-0 rtl:ml-2">
              {isAr ? 'التصنيف:' : 'Filter:'}
            </span>

            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-[#4A2116] text-[#E6C783] shadow-xs'
                  : 'bg-[#FAF5ED] text-[#4A2116] hover:bg-[#F2E5D5] border border-[#EBDCC8]'
              }`}
            >
              {isAr ? `كل الطلبات (${orders.length})` : `All Orders (${orders.length})`}
            </button>

            <button
              type="button"
              onClick={() => setActiveFilter('active')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeFilter === 'active'
                  ? 'bg-[#C58A19] text-white shadow-xs'
                  : 'bg-[#FAF5ED] text-[#4A2116] hover:bg-[#F2E5D5] border border-[#EBDCC8]'
              }`}
            >
              {isAr ? 'طلبات قيد التجهيز / التوصيل' : 'Active / In Kitchen'}
            </button>

            <button
              type="button"
              onClick={() => setActiveFilter('delivered')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeFilter === 'delivered'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-[#FAF5ED] text-[#4A2116] hover:bg-[#F2E5D5] border border-[#EBDCC8]'
              }`}
            >
              {isAr ? 'تم تسليمها' : 'Delivered'}
            </button>
          </div>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl text-xs sm:text-sm flex items-center justify-between mb-6 animate-fadeIn">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{errorMessage}</span>
            </div>
            <button
              type="button"
              onClick={() => fetchOrders()}
              className="font-semibold underline hover:text-red-900 cursor-pointer text-xs"
            >
              {isAr ? 'إعادة المحاولة' : 'Retry'}
            </button>
          </div>
        )}

        {/* Loading Spinner */}
        {loading ? (
          <div className="bg-white rounded-3xl p-16 border border-[#EBDCC8] text-center max-w-md mx-auto my-12 shadow-sm animate-fadeIn">
            <RefreshCw className="w-10 h-10 animate-spin text-[#C58A19] mx-auto mb-4" />
            <h3 className="font-serif font-bold text-xl text-[#4A2116] mb-1">
              {isAr ? 'جاري تحميل سجل الطلبات...' : 'Loading Your Orders...'}
            </h3>
            <p className="text-xs text-[#8C6D62]">
              {isAr ? 'نتحقق من أحدث تحديثات التوصيل وحالة الكيك في المطبخ.' : 'Connecting to the confectionery kitchen system.'}
            </p>
          </div>
        ) : filteredOrders.length === 0 ? (
          /* Empty Orders View */
          <div className="bg-white rounded-3xl p-10 sm:p-14 border border-[#EBDCC8] shadow-sm text-center max-w-xl mx-auto my-8 animate-fadeIn">
            <div className="w-16 h-16 rounded-2xl bg-[#FAF5ED] border border-[#EBDCC8] flex items-center justify-center text-[#C58A19] mx-auto mb-4 shadow-xs">
              <Package className="w-8 h-8 stroke-[1.8]" />
            </div>

            <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#4A2116] mb-2">
              {isAr ? 'لم يتم العثور على طلبات' : 'No Orders Found'}
            </h3>

            <p className="text-xs sm:text-sm text-[#8C6D62] max-w-md mx-auto mb-6 leading-relaxed">
              {searchQuery
                ? (isAr
                    ? `لم يتم العثور على نتائج للبحث عن "${searchQuery}". تأكد من صحة رقم الطلب أو رقم الهاتف المسجل.`
                    : `No orders match "${searchQuery}". Please verify your order number or phone number and try again.`)
                : (isAr
                    ? 'لم تقم بتسجيل أي طلبات بعد على هذا الجهاز. يمكنك استعراض تشكيلات الكيك الفاخرة أو تصميم كيكتك الخاصة.'
                    : 'You do not have any active orders recorded on this device yet. Discover our signature cakes or build a bespoke celebration piece.')}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
              <button
                type="button"
                onClick={() => {
                  if (onContinueShopping) onContinueShopping();
                  else navigateTo('/');
                }}
                className="w-full sm:w-auto bg-[#4A2116] hover:bg-[#C58A19] text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-full transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <span>{isAr ? 'تصفح قائمة الكيك' : 'Explore Cakes'}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </button>

              <button
                type="button"
                onClick={() => navigateTo('/customize')}
                className="w-full sm:w-auto bg-[#FAF5ED] hover:bg-[#F2E5D5] text-[#4A2116] font-semibold text-xs sm:text-sm px-6 py-3 rounded-full border border-[#EBDCC8] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#C58A19]" />
                <span>{isAr ? 'تصميم كيك خاص' : 'Build Custom Cake'}</span>
              </button>
            </div>
          </div>
        ) : (
          /* Orders Cards List */
          <div className="space-y-6">
            {filteredOrders.map((order) => {
              const stage = getOrderStage(order.status);
              const isExpanded = expandedOrder === (order.id || order.order_number);
              const itemsList = order.cake_details?.items || [];
              const isPaid = order.payment_status === 'paid';

              return (
                <div 
                  key={order.id || order.order_number}
                  className="bg-white rounded-3xl border border-[#EBDCC8] shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                >
                  {/* Order Card Header */}
                  <div className="p-5 sm:p-6 border-b border-[#F5EBDD] bg-[#FFFDF8] flex flex-col md:flex-row md:items-center justify-between gap-4">
                    
                    <div className="flex items-start sm:items-center gap-3">
                      <div className="w-11 h-11 rounded-2xl bg-[#FAF5ED] border border-[#E2D2BD] flex items-center justify-center text-[#C58A19] shrink-0 shadow-2xs">
                        <Package className="w-5 h-5 stroke-[2]" />
                      </div>

                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-serif font-bold text-lg text-[#4A2116] font-mono">
                            #{order.order_number}
                          </span>
                          
                          <button
                            type="button"
                            onClick={() => handleCopy(order.order_number)}
                            title={isAr ? 'نسخ رقم الطلب' : 'Copy order number'}
                            className="p-1 text-[#8C6D62] hover:text-[#C58A19] transition-colors cursor-pointer"
                          >
                            {copiedId === order.order_number ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>

                          {/* Status Badge */}
                          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                            order.status === 'delivered'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : order.status === 'in_production'
                                ? 'bg-amber-50 text-amber-800 border-amber-200'
                                : order.status === 'cancelled'
                                  ? 'bg-red-50 text-red-700 border-red-200'
                                  : 'bg-[#FAF5ED] text-[#C58A19] border-[#EBDCC8]'
                          }`}>
                            {order.status === 'in_production' 
                              ? (isAr ? 'قيد التجهيز في المطبخ' : 'In Kitchen Production')
                              : order.status === 'ready'
                                ? (isAr ? 'جاهز للتوصيل' : 'Ready for Dispatch')
                                : order.status === 'delivered'
                                  ? (isAr ? 'تم التسليم' : 'Delivered')
                                  : order.status === 'cancelled'
                                    ? (isAr ? 'ملغي' : 'Cancelled')
                                    : (isAr ? 'تم تأكيد الحجز' : 'Order Confirmed')}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 text-xs text-[#8C6D62] mt-1 flex-wrap">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-[#C58A19]" />
                            <span>{new Date(order.created_at || Date.now()).toLocaleDateString()}</span>
                          </span>
                          <span>•</span>
                          <span>{order.customer_name}</span>
                          <span>•</span>
                          <span className="font-semibold text-emerald-700">
                            {isPaid 
                              ? (isAr ? 'مدفوع (Stripe)' : 'Paid Online (Stripe)') 
                              : (order.payment_method || (isAr ? 'دفع عند الاستلام' : 'Cash on Delivery'))}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Price and Action */}
                    <div className="flex items-center justify-between md:justify-end gap-4 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-[#F5EBDD]">
                      <div className="text-left md:text-right rtl:text-right md:rtl:text-left">
                        <span className="text-[10px] uppercase font-bold text-[#8C6D62] block leading-none mb-1">
                          {isAr ? 'المبلغ الإجمالي' : 'Total Amount'}
                        </span>
                        <span className="font-serif font-bold text-xl text-[#C58A19]">
                          AED {order.total_amount}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => setExpandedOrder(isExpanded ? null : (order.id || order.order_number))}
                        className="bg-[#FAF5ED] hover:bg-[#F2E5D5] border border-[#EBDCC8] text-[#4A2116] px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>{isExpanded ? (isAr ? 'إخفاء التفاصيل' : 'Hide Details') : (isAr ? 'عرض التفاصيل' : 'View Details')}</span>
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                  </div>

                  {/* 5-Stage Live Visual Progress Tracker */}
                  <div className="p-5 sm:p-6 bg-white border-b border-[#F5EBDD]">
                    <div className="text-xs font-bold text-[#4A2116] mb-4 flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#C58A19]" />
                        <span>{isAr ? 'مسار تجهيز وتسليم الكيك' : 'Lebanese Preparation & Delivery Journey'}</span>
                      </span>
                      <span className="text-[11px] font-normal text-[#8C6D62]">
                        {isAr ? `تاريخ التوصيل المطلوب: ${order.delivery_date}` : `Scheduled Delivery: ${order.delivery_date}`}
                      </span>
                    </div>

                    {/* Stepper Bar */}
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-2 relative">
                      
                      {/* Step 1: Confirmed */}
                      <div className={`p-3 rounded-2xl border text-center transition-all ${
                        stage >= 1 
                          ? 'bg-[#FAF5ED] border-[#C58A19] shadow-2xs' 
                          : 'bg-white border-[#EBDCC8]/60 opacity-50'
                      }`}>
                        <div className={`w-8 h-8 rounded-full mx-auto mb-1.5 flex items-center justify-center ${
                          stage >= 1 ? 'bg-[#C58A19] text-white' : 'bg-[#EBDCC8] text-[#8C6D62]'
                        }`}>
                          <Check className="w-4 h-4 stroke-[2.5]" />
                        </div>
                        <div className="font-semibold text-xs text-[#4A2116]">{isAr ? 'تأكيد الحجز' : 'Confirmed'}</div>
                        <div className="text-[9.5px] text-[#8C6D62] mt-0.5">{isAr ? 'في النظام' : 'Registered'}</div>
                      </div>

                      {/* Step 2: In Kitchen */}
                      <div className={`p-3 rounded-2xl border text-center transition-all ${
                        stage >= 2 
                          ? 'bg-[#FAF5ED] border-[#C58A19] shadow-2xs' 
                          : 'bg-white border-[#EBDCC8]/60 opacity-50'
                      }`}>
                        <div className={`w-8 h-8 rounded-full mx-auto mb-1.5 flex items-center justify-center ${
                          stage >= 2 ? 'bg-[#C58A19] text-white' : 'bg-[#EBDCC8] text-[#8C6D62]'
                        }`}>
                          <ChefHat className="w-4 h-4 stroke-[2]" />
                        </div>
                        <div className="font-semibold text-xs text-[#4A2116]">{isAr ? 'في المطبخ' : 'Kitchen Bake'}</div>
                        <div className="text-[9.5px] text-[#8C6D62] mt-0.5">{isAr ? 'صنع يدوي طازج' : 'Lebanese Crafting'}</div>
                      </div>

                      {/* Step 3: Inspected & Packaged */}
                      <div className={`p-3 rounded-2xl border text-center transition-all ${
                        stage >= 3 
                          ? 'bg-[#FAF5ED] border-[#C58A19] shadow-2xs' 
                          : 'bg-white border-[#EBDCC8]/60 opacity-50'
                      }`}>
                        <div className={`w-8 h-8 rounded-full mx-auto mb-1.5 flex items-center justify-center ${
                          stage >= 3 ? 'bg-[#C58A19] text-white' : 'bg-[#EBDCC8] text-[#8C6D62]'
                        }`}>
                          <Sparkles className="w-4 h-4 stroke-[2]" />
                        </div>
                        <div className="font-semibold text-xs text-[#4A2116]">{isAr ? 'فحص الجودة' : 'Quality Check'}</div>
                        <div className="text-[9.5px] text-[#8C6D62] mt-0.5">{isAr ? 'تغليف فاخر' : 'Luxury Packaging'}</div>
                      </div>

                      {/* Step 4: Chilled Van Dispatch */}
                      <div className={`p-3 rounded-2xl border text-center transition-all ${
                        stage >= 4 
                          ? 'bg-[#FAF5ED] border-[#C58A19] shadow-2xs' 
                          : 'bg-white border-[#EBDCC8]/60 opacity-50'
                      }`}>
                        <div className={`w-8 h-8 rounded-full mx-auto mb-1.5 flex items-center justify-center ${
                          stage >= 4 ? 'bg-[#C58A19] text-white' : 'bg-[#EBDCC8] text-[#8C6D62]'
                        }`}>
                          <Truck className="w-4 h-4 stroke-[2]" />
                        </div>
                        <div className="font-semibold text-xs text-[#4A2116]">{isAr ? 'في شاحنة التبريد' : 'Chilled Van'}</div>
                        <div className="text-[9.5px] text-[#8C6D62] mt-0.5">{isAr ? 'توصيل مبرد' : 'En Route'}</div>
                      </div>

                      {/* Step 5: Delivered */}
                      <div className={`p-3 rounded-2xl border text-center col-span-2 sm:col-span-1 transition-all ${
                        stage >= 5 
                          ? 'bg-emerald-50 border-emerald-500 shadow-2xs' 
                          : 'bg-white border-[#EBDCC8]/60 opacity-50'
                      }`}>
                        <div className={`w-8 h-8 rounded-full mx-auto mb-1.5 flex items-center justify-center ${
                          stage >= 5 ? 'bg-emerald-600 text-white' : 'bg-[#EBDCC8] text-[#8C6D62]'
                        }`}>
                          <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                        </div>
                        <div className="font-semibold text-xs text-[#4A2116]">{isAr ? 'تم التسليم' : 'Delivered'}</div>
                        <div className="text-[9.5px] text-emerald-700 mt-0.5">{isAr ? 'بكل سرور' : 'Enjoy & Celebrate'}</div>
                      </div>

                    </div>
                  </div>

                  {/* Expandable Order Details Drawer */}
                  {isExpanded && (
                    <div className="p-5 sm:p-6 bg-[#FAF5ED]/50 space-y-6 animate-fadeIn">
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* Delivery Destination & Schedule */}
                        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#EBDCC8] text-xs space-y-2.5">
                          <span className="font-bold text-[#4A2116] text-xs uppercase tracking-wider block pb-2 border-b border-[#F5EBDD] flex items-center gap-1.5">
                            <MapPin className="w-4 h-4 text-[#C58A19]" />
                            <span>{isAr ? 'تفاصيل وموقع التوصيل' : 'Delivery and Recipient Information'}</span>
                          </span>

                          <div className="flex justify-between">
                            <span className="text-[#8C6D62]">{isAr ? 'المستلم:' : 'Recipient:'}</span>
                            <span className="font-semibold text-[#4A2116]">{order.customer_name}</span>
                          </div>

                          <div className="flex justify-between">
                            <span className="text-[#8C6D62]">{isAr ? 'رقم الهاتف:' : 'Phone Number:'}</span>
                            <span className="font-mono text-[#4A2116]" dir="ltr">{order.customer_phone}</span>
                          </div>

                          <div className="flex justify-between">
                            <span className="text-[#8C6D62]">{isAr ? 'موعد التوصيل:' : 'Delivery Window:'}</span>
                            <span className="font-medium text-[#4A2116]">
                              {order.delivery_date} • {order.delivery_time_slot || 'Afternoon (2-6 PM)'}
                            </span>
                          </div>

                          <div className="flex justify-between">
                            <span className="text-[#8C6D62]">{isAr ? 'عنوان التوصيل:' : 'Address:'}</span>
                            <span className="font-medium text-[#4A2116] max-w-[60%] text-right rtl:text-left">
                              {order.delivery_address}
                            </span>
                          </div>

                          {order.order_notes && (
                            <div className="pt-2 border-t border-[#F5EBDD] text-[11px] text-[#7A5846]">
                              <span className="font-semibold block mb-0.5">{isAr ? 'ملاحظات / كتابة اللوحة:' : 'Custom Notes / Cake Plaque:'}</span>
                              <p className="bg-[#FAF5ED] p-2 rounded-xl italic">"{order.order_notes}"</p>
                            </div>
                          )}
                        </div>

                        {/* Payment & Security Breakdown */}
                        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#EBDCC8] text-xs space-y-2.5">
                          <span className="font-bold text-[#4A2116] text-xs uppercase tracking-wider block pb-2 border-b border-[#F5EBDD] flex items-center gap-1.5">
                            <ShieldCheck className="w-4 h-4 text-[#C58A19]" />
                            <span>{isAr ? 'بيانات الفاتورة والدفع' : 'Payment and Invoice Summary'}</span>
                          </span>

                          <div className="flex justify-between">
                            <span className="text-[#8C6D62]">{isAr ? 'طريقة الدفع:' : 'Payment Method:'}</span>
                            <span className="font-semibold text-[#4A2116]">{order.payment_method || 'Stripe Online'}</span>
                          </div>

                          <div className="flex justify-between">
                            <span className="text-[#8C6D62]">{isAr ? 'حالة السداد:' : 'Payment Status:'}</span>
                            <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 text-[10.5px]">
                              {isPaid ? (isAr ? 'تم الدفع بنجاح' : 'Paid and Verified') : (isAr ? 'عند الاستلام' : 'Pending on Delivery')}
                            </span>
                          </div>

                          <div className="flex justify-between">
                            <span className="text-[#8C6D62]">{isAr ? 'شاحنة التبريد:' : 'Cold-Chain Delivery:'}</span>
                            <span className="font-medium text-[#4A2116]">{isAr ? 'مضمونة 100%' : 'Chilled Refrigerator Van (Free)'}</span>
                          </div>

                          <div className="flex justify-between items-center pt-2 border-t border-[#F5EBDD] font-bold text-sm">
                            <span className="text-[#4A2116]">{isAr ? 'الإجمالي المدفوع:' : 'Total Amount:'}</span>
                            <span className="text-[#C58A19] font-serif text-base">AED {order.total_amount}</span>
                          </div>
                        </div>

                      </div>

                      {/* Items Ordered Table */}
                      {itemsList.length > 0 && (
                        <div className="bg-white rounded-2xl border border-[#EBDCC8] p-4 sm:p-5">
                          <span className="font-bold text-[#4A2116] text-xs uppercase tracking-wider block mb-3">
                            {isAr ? 'أصناف الكيك المطلوبة في هذا الحجز:' : 'Cakes and Sweet Treats in This Order:'}
                          </span>

                          <div className="divide-y divide-[#F5EBDD]">
                            {itemsList.map((item, idx) => (
                              <div key={idx} className="py-2.5 flex items-center justify-between text-xs gap-3">
                                <div className="flex items-center gap-3">
                                  <div className="w-7 h-7 rounded-lg bg-[#FAF5ED] border border-[#E2D2BD] flex items-center justify-center font-bold text-[#C58A19] text-xs">
                                    {item.quantity || 1}x
                                  </div>
                                  <div>
                                    <div className="font-semibold text-[#4A2116]">
                                      {isAr ? (item.title_ar || item.title) : item.title}
                                    </div>
                                    {(item.flavor || item.servings || item.weight) && (
                                      <div className="text-[11px] text-[#8C6D62]">
                                        {[item.flavor, item.servings, item.weight].filter(Boolean).join(' • ')}
                                      </div>
                                    )}
                                  </div>
                                </div>

                                <div className="font-serif font-bold text-[#C58A19] text-sm shrink-0">
                                  AED {(Number(item.price) || 0) * (Number(item.quantity) || 1)}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Customer Action Bar */}
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                        
                        {/* WhatsApp Concierge Chat */}
                        <a
                          href={`https://wa.me/971506063631?text=${encodeURIComponent(
                            `Hello Lebanese Dream Bakery! I am inquiring regarding my Order #${order.order_number} for ${order.customer_name}.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>{isAr ? 'مراسلة خدمة العملاء عبر واتساب' : 'Chat with Concierge on WhatsApp'}</span>
                        </a>

                        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                          {/* Print Receipt */}
                          <button
                            type="button"
                            onClick={() => window.print()}
                            className="flex-1 sm:flex-none bg-[#FAF5ED] hover:bg-[#F2E5D5] text-[#4A2116] border border-[#EBDCC8] text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Printer className="w-3.5 h-3.5 text-[#C58A19]" />
                            <span>{isAr ? 'طباعة الفاتورة' : 'Print Receipt'}</span>
                          </button>

                          {/* Reorder / Add to Bag */}
                          {itemsList.length > 0 && onAddToCart && (
                            <button
                              type="button"
                              onClick={() => {
                                itemsList.forEach(it => onAddToCart(it));
                                navigateTo('/cart');
                              }}
                              className="flex-1 sm:flex-none bg-[#4A2116] hover:bg-[#C58A19] text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                            >
                              <ShoppingBag className="w-3.5 h-3.5 text-[#E6C783]" />
                              <span>{isAr ? 'إعادة الطلب' : 'Reorder Items'}</span>
                            </button>
                          )}
                        </div>

                      </div>

                    </div>
                  )}

                </div>
              );
            })}
          </div>
        )}

      </main>

    </div>
  );
}
