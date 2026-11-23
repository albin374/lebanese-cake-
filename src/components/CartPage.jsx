import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  Sparkles, 
  Check, 
  Clock, 
  Calendar, 
  Truck, 
  ShieldCheck, 
  Phone, 
  MessageCircle, 
  Tag, 
  Cake, 
  X,
  CreditCard,
  Lock,
  RefreshCw,
  Package
} from 'lucide-react';
import { formatImageUrl } from './CategoryProductsSection';
import { navigateTo } from '../utils/navigation';

const API_BASE = 'http://localhost:5000/api';

export default function CartPage({
  cartItems = [],
  currentLang = 'en',
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onContinueShopping,
  onCustomizeClick
}) {
  const isAr = currentLang === 'ar';
  const bannerImage = '/Lebanese Dream Bakery Cake Display.png';

  const [cakeMessage, setCakeMessage] = useState('');
  const [deliveryDate, setDeliveryDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [deliveryTimeSlot, setDeliveryTimeSlot] = useState('afternoon');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  
  // Checkout modal state & Stripe payment state
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('stripe'); // 'stripe' | 'cod' | 'card'
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [isVerifyingPayment, setIsVerifyingPayment] = useState(false);
  const [stripeError, setStripeError] = useState('');
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);
  const [orderNumber, setOrderNumber] = useState('');

  // Handle return from Stripe hosted checkout session
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('session_id');
    const isCanceled = params.get('canceled') === 'true';

    if (sessionId) {
      // Verify payment with backend using session ID
      setIsVerifyingPayment(true);
      setShowCheckoutModal(true);
      fetch(`${API_BASE}/orders/verify-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId })
      })
        .then(async res => {
          const contentType = res.headers.get('content-type') || '';
          if (!contentType.includes('application/json')) {
            const text = await res.text();
            throw new Error(`Server returned non-JSON response (${res.status}): ${text.slice(0, 100)}`);
          }
          return res.json();
        })
        .then(data => {
          if (data?.success && data?.order) {
            setConfirmedOrder(data.order);
            setOrderNumber(data.order.order_number);
            setOrderSubmitted(true);
            setPaymentMethod('stripe');
            try {
              const existing = JSON.parse(localStorage.getItem('ldb_customer_orders') || '[]');
              const filtered = existing.filter(o => (typeof o === 'string' ? o : o.order_number) !== data.order.order_number);
              filtered.unshift({
                order_number: data.order.order_number,
                customer_name: data.order.customer_name,
                total_amount: data.order.total_amount,
                date: new Date().toISOString()
              });
              localStorage.setItem('ldb_customer_orders', JSON.stringify(filtered.slice(0, 20)));
            } catch (_) {}
            try {
              localStorage.removeItem('ldb_cart_items');
            } catch (_) {}
            if (onClearCart) onClearCart();
          } else {
            setStripeError(data?.message || (isAr ? 'لم يكتمل الدفع عبر سترايب. يرجى إعادة المحاولة.' : 'Payment was not completed. Please try again.'));
            setOrderSubmitted(false);
          }
        })
        .catch(err => {
          console.error('Session verification error:', err);
          setStripeError(isAr ? 'تعذر التحقق من عملية الدفع. يرجى التواصل مع الدعم.' : 'Could not verify payment session. Please contact support.');
          setOrderSubmitted(false);
        })
        .finally(() => {
          setIsVerifyingPayment(false);
          try {
            window.history.replaceState({}, document.title, window.location.pathname);
          } catch (_) {}
        });
    } else if (isCanceled) {
      setStripeError(isAr ? 'تم إلغاء عملية الدفع عبر سترايب. عناصر حقيبتك محفوظة.' : 'Stripe checkout was canceled. Your cart items are preserved.');
      setShowCheckoutModal(true);
      try {
        window.history.replaceState({}, document.title, window.location.pathname);
      } catch (_) {}
    }
  }, []);

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => {
    const itemPrice = Number(item.price) || 0;
    const qty = Number(item.quantity) || 1;
    return acc + (itemPrice * qty);
  }, 0);

  // Free delivery over 400 AED, otherwise 30 AED
  const deliveryFee = subtotal >= 400 || subtotal === 0 ? 0 : 30;
  const discountAmount = Math.round(subtotal * promoDiscount);
  const totalAmount = Math.max(0, subtotal - discountAmount + deliveryFee);
  const vatIncluded = Math.round((subtotal * 0.05) * 100) / 100;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');
    const code = promoCode.trim().toUpperCase();

    if (code === 'DREAM10' || code === 'LEBANESE10') {
      setPromoDiscount(0.10);
      setPromoSuccess(isAr ? 'تم تطبيق خصم 10% بنجاح!' : '10% discount applied successfully!');
    } else if (code === 'VIP15') {
      setPromoDiscount(0.15);
      setPromoSuccess(isAr ? 'تم تطبيق خصم 15% لكبار العملاء!' : 'VIP 15% discount applied successfully!');
    } else {
      setPromoError(isAr ? 'رمز ترويجي غير صالح' : 'Invalid promo code');
    }
  };

  const generateWhatsAppMessage = () => {
    const itemsList = cartItems.map((item, idx) => {
      const title = isAr ? (item.title_ar || item.title) : item.title;
      const flavor = item.flavor ? ` (${item.flavor})` : '';
      const servings = item.servings ? ` [${item.servings}]` : '';
      return `${idx + 1}. ${item.quantity}x ${title}${flavor}${servings} - AED ${item.price * item.quantity}`;
    }).join('\n');

    const lines = [
      `*Lebanese Dream Bakery Order Inquiry*`,
      `---------------------------------------`,
      itemsList,
      `---------------------------------------`,
      `*Subtotal:* AED ${subtotal}`,
      promoDiscount > 0 ? `*Promo Discount (${promoDiscount * 100}%):* -AED ${discountAmount}` : null,
      `*Refrigerated Delivery:* ${deliveryFee === 0 ? 'FREE' : `AED ${deliveryFee}`}`,
      `*Total Amount:* AED ${totalAmount}`,
      `---------------------------------------`,
      deliveryDate ? `*Preferred Delivery Date:* ${deliveryDate}` : null,
      deliveryTimeSlot ? `*Delivery Slot:* ${deliveryTimeSlot === 'morning' ? 'Morning (10:00 AM - 2:00 PM)' : deliveryTimeSlot === 'evening' ? 'Evening (6:00 PM - 10:00 PM)' : 'Afternoon (2:00 PM - 6:00 PM)'}` : null,
      cakeMessage ? `*Cake Plaque Message:* "${cakeMessage}"` : null,
      specialInstructions ? `*Instructions:* ${specialInstructions}` : null
    ].filter(Boolean).join('\n');

    return encodeURIComponent(lines);
  };

  // Submit checkout form (either Stripe official hosted checkout or Cash/Card on Delivery)
  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    setStripeError('');
    setIsProcessingPayment(true);

    if (paymentMethod === 'stripe') {
      try {
        // Request official Stripe Checkout Session from backend
        let endpoint = `${API_BASE}/orders/create-checkout-session`;
        const sessionPayload = {
          items: cartItems,
          promoCode,
          customerName: customerName.trim(),
          customerPhone: customerPhone.trim(),
          customerEmail: customerEmail.trim(),
          deliveryDate,
          deliveryTimeSlot,
          deliveryAddress: deliveryAddress.trim(),
          orderNotes: cakeMessage ? `Cake plaque: ${cakeMessage}` : specialInstructions
        };

        let res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(sessionPayload)
        });

        // If the primary endpoint returned 404, fallback to alias /stripe-session
        if (res.status === 404) {
          res = await fetch(`${API_BASE}/orders/stripe-session`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(sessionPayload)
          });
        }

        const contentType = res.headers.get('content-type') || '';
        if (!contentType.includes('application/json')) {
          const text = await res.text();
          throw new Error(`Backend server error (${res.status}). Please make sure the backend server on port 5000 is running.`);
        }

        const data = await res.json();
        if (data?.success && data?.url) {
          // Immediately redirect to official Stripe Hosted Checkout page
          window.location.href = data.url;
          return;
        } else {
          throw new Error(data?.message || 'Failed to initialize Stripe Checkout Session');
        }
      } catch (err) {
        console.error('Stripe Checkout Error:', err);
        setStripeError(err.message || 'Could not connect to Stripe payment gateway. Please try again.');
        setIsProcessingPayment(false);
      }
    } else {
      // Cash on Delivery or Card on Delivery
      const newOrdNum = `LDB-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const codTotal = totalAmount; // Snapshot total before clearing
      try {
        const orderData = {
          order_number: newOrdNum,
          customer_name: customerName.trim(),
          customer_phone: customerPhone.trim(),
          customer_email: customerEmail.trim(),
          delivery_date: deliveryDate,
          delivery_time_slot: deliveryTimeSlot,
          delivery_address: deliveryAddress.trim(),
          order_notes: cakeMessage ? `Cake plaque: ${cakeMessage}` : specialInstructions,
          cake_type: cartItems[0]?.title || 'Lebanese Cake',
          cake_details: { items: cartItems },
          total_amount: codTotal,
          payment_method: paymentMethod === 'cod' ? 'Cash on Delivery' : 'Card on Delivery'
        };

        const res = await fetch(`${API_BASE}/orders`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderData)
        });

        const data = await res.json();
        const finalOrder = data?.order || orderData;

        setConfirmedOrder(finalOrder);
        setOrderNumber(finalOrder.order_number || newOrdNum);
        setOrderSubmitted(true);
        try {
          const existing = JSON.parse(localStorage.getItem('ldb_customer_orders') || '[]');
          const filtered = existing.filter(o => (typeof o === 'string' ? o : o.order_number) !== (finalOrder.order_number || newOrdNum));
          filtered.unshift({
            order_number: finalOrder.order_number || newOrdNum,
            customer_name: finalOrder.customer_name,
            total_amount: finalOrder.total_amount,
            date: new Date().toISOString()
          });
          localStorage.setItem('ldb_customer_orders', JSON.stringify(filtered.slice(0, 20)));
        } catch (_) {}
        try {
          localStorage.removeItem('ldb_cart_items');
        } catch (_) {}
        if (onClearCart) {
          onClearCart();
        }
      } catch (err) {
        console.error('COD Order error:', err);
        setStripeError('Failed to place order. Please check your network and try again.');
      } finally {
        setIsProcessingPayment(false);
      }
    }
  };

  return (
    <div className={`w-full flex flex-col bg-[#FFF9F0] min-h-screen ${isAr ? 'font-arabic' : 'font-poppins'}`}>
      
      {/* 1. Hero Banner Section with Lebanese Dream Bakery Cake Display */}
      <section className="relative w-full overflow-hidden bg-[#24130A] select-none">
        
        {/* Banner Container matching exact banner height like /my-orders page */}
        <div className="relative w-full aspect-[2172/600] min-h-[170px] sm:min-h-[220px] md:min-h-[260px] flex items-center">
          
          {/* Banner Photography Background */}
          <div className="absolute inset-0 z-0">
            <img 
              src={bannerImage} 
              alt={isAr ? 'حقيبة تسوق مخبز الحلم اللبناني' : 'Lebanese Dream Bakery Shopping Bag'}
              className="w-full h-full object-cover object-center"
            />

            {/* Dark Chocolate & Warm Gold Contrast Gradients */}
            <div 
              className={`absolute inset-0 ${
                isAr
                  ? 'bg-gradient-to-l from-[#201007]/95 via-[#261208]/85 to-[#201007]/35 sm:to-transparent right-0'
                  : 'bg-gradient-to-r from-[#201007]/95 via-[#261208]/85 to-[#201007]/35 sm:to-transparent left-0'
              } w-full sm:w-[72%] pointer-events-none`} 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#201007]/85 via-transparent to-[#201007]/25 pointer-events-none" />
          </div>

          {/* Foreground Left-Aligned Typographic Overlay */}
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-4 sm:py-6 md:py-8 lg:py-10 flex">
            <div className="w-full sm:w-[68%] md:w-[60%] lg:w-[54%] flex flex-col items-start text-left rtl:items-end rtl:text-right">
              
              {/* Luxury Upright Headline */}
              <h1 className={`font-serif not-italic font-semibold text-2xl sm:text-3xl md:text-4xl leading-tight text-[#FFF9F0] tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)] ${
                isAr ? 'font-arabic font-bold text-2xl sm:text-3xl md:text-4xl' : ''
              }`}>
                <span>{isAr ? 'حقيبة' : 'Shopping'} </span>
                <span className="text-[#E6C783]">{isAr ? 'المشتريات' : 'Bag'}</span>
              </h1>
            </div>
          </div>

        </div>

      </section>

      {/* 2. Main Cart Content Area */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex-1">
        
        {cartItems.length === 0 ? (
          /* Empty Cart Showcase */
          <div className="bg-white rounded-3xl p-10 sm:p-16 border border-[#F2E5D5] shadow-xs text-center max-w-xl mx-auto flex flex-col items-center animate-fadeIn">
            <div className="w-20 h-20 rounded-3xl bg-[#FFF9F0] border border-[#EBDCC8] flex items-center justify-center text-[#C58A19] mb-5 shadow-sm">
              <ShoppingBag className="w-10 h-10 stroke-[1.6]" />
            </div>

            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#4A2116] mb-3">
              {isAr ? 'حقيبة التسوق فارغة حالياً' : 'Your Shopping Bag is Empty'}
            </h2>

            <p className="text-xs sm:text-sm text-[#8C6D62] leading-relaxed max-w-md mb-8">
              {isAr
                ? 'لم تقم بإضافة أي أصناف إلى حقيبتك بعد. استكشف تشكيلات الكيك المصنوعة يدوياً أو صمم كيكتك الخاصة الآن.'
                : 'You have not added any handcrafted cakes or sweet treats to your bag yet. Discover our signature Lebanese collections or build your custom cake.'}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center">
              <button
                type="button"
                onClick={() => {
                  if (onContinueShopping) onContinueShopping();
                  else navigateTo('/');
                }}
                className="w-full sm:w-auto bg-[#4A2116] hover:bg-[#C58A19] text-white font-semibold text-xs sm:text-sm px-6 py-3.5 rounded-full transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <span>{isAr ? 'تصفح قائمة الكيك' : 'Explore Cake Collections'}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </button>

              <button
                type="button"
                onClick={() => {
                  if (onCustomizeClick) onCustomizeClick();
                  else navigateTo('/customize');
                }}
                className="w-full sm:w-auto bg-[#FAF5ED] hover:bg-[#F2E5D5] text-[#7A5846] font-semibold text-xs sm:text-sm px-6 py-3.5 rounded-full border border-[#EBDCC8] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#C58A19]" />
                <span>{isAr ? 'تصميم كيك خاص' : 'Build Custom Cake'}</span>
              </button>
            </div>
          </div>
        ) : (
          /* Active Cart Grid (Items List on Left, Order Summary on Right) */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* Left Column: Cart Items List & Cake Customization Notes (8 Cols) */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-6">
              
              {/* Header with Items Count & Clear Cart */}
              <div className="flex items-center justify-between pb-4 border-b border-[#EBDCC8]">
                <div className="flex items-center gap-2.5">
                  <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#4A2116]">
                    {isAr ? 'الأصناف في حقيبتك' : 'Items in Your Bag'}
                  </h2>
                  <span className="bg-[#FAF5ED] text-[#C58A19] font-bold text-xs px-2.5 py-0.5 rounded-full border border-[#EBDCC8]">
                    {cartItems.reduce((acc, it) => acc + (it.quantity || 1), 0)} {isAr ? 'عنصر' : 'items'}
                  </span>
                </div>

                {onClearCart && (
                  <button
                    type="button"
                    onClick={onClearCart}
                    className="text-xs text-[#8C6D62] hover:text-[#72251F] font-medium transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>{isAr ? 'إفراغ الحقيبة' : 'Clear Bag'}</span>
                  </button>
                )}
              </div>

              {/* Items Card List */}
              <div className="space-y-4">
                {cartItems.map((item, index) => {
                  const itemTitle = isAr ? (item.title_ar || item.title) : item.title;
                  const itemFlavor = isAr ? (item.flavor_ar || item.flavor) : item.flavor;
                  const itemServings = isAr ? (item.servings_ar || item.servings) : item.servings;
                  const price = Number(item.price) || 0;
                  const qty = Number(item.quantity) || 1;
                  const lineTotal = price * qty;
                  const imgUrl = item.image || item.image_url || bannerImage;

                  return (
                    <div 
                      key={item.id || index}
                      className="bg-white rounded-2xl p-4 sm:p-5 border border-[#F2E5D5] shadow-xs flex flex-col sm:flex-row items-start sm:items-center gap-4 transition-all hover:border-[#E6C783]"
                    >
                      {/* Product Thumbnail */}
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-[#FAF5ED] shrink-0 border border-[#EBDCC8]">
                        <img 
                          src={formatImageUrl(imgUrl)} 
                          alt={itemTitle}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0 w-full sm:w-auto">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-serif font-bold text-base sm:text-lg text-[#4A2116] truncate">
                            {itemTitle}
                          </h3>

                          {/* Mobile Unit Price */}
                          <div className="sm:hidden text-right font-bold text-[#C58A19] text-sm">
                            AED {lineTotal}
                          </div>
                        </div>

                        {/* Flavor Tag */}
                        {itemFlavor && (
                          <p className="text-xs text-[#C58A19] font-medium mt-0.5 truncate">
                            {itemFlavor}
                          </p>
                        )}

                        {/* Servings Tag */}
                        {itemServings && (
                          <p className="text-[11px] text-[#8C6D62] mt-0.5">
                            {itemServings}
                          </p>
                        )}

                        {/* Unit Price on desktop */}
                        <div className="hidden sm:block text-xs text-[#8C6D62] mt-1">
                          AED {price} {isAr ? 'لكل قطعة' : 'each'}
                        </div>
                      </div>

                      {/* Quantity Controls & Line Total */}
                      <div className="flex items-center justify-between sm:justify-end gap-5 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-[#FAF5ED]">
                        
                        {/* Quantity Counter */}
                        <div className="flex items-center bg-[#FAF5ED] rounded-xl border border-[#EBDCC8] p-1">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity && onUpdateQuantity(item.id, qty - 1)}
                            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white text-[#7A5846] transition-colors cursor-pointer disabled:opacity-30"
                            disabled={qty <= 1}
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>

                          <span className="w-8 text-center text-xs font-bold text-[#4A2116] tabular-nums">
                            {qty}
                          </span>

                          <button
                            type="button"
                            onClick={() => onUpdateQuantity && onUpdateQuantity(item.id, qty + 1)}
                            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white text-[#7A5846] transition-colors cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Desktop Line Total */}
                        <div className="hidden sm:block text-right min-w-[85px]">
                          <span className="font-poppins font-bold text-base text-[#4A2116] tabular-nums">
                            AED {lineTotal}
                          </span>
                        </div>

                        {/* Remove Button */}
                        <button
                          type="button"
                          onClick={() => onRemoveItem && onRemoveItem(item.id)}
                          className="p-2 text-[#8C6D62] hover:text-[#72251F] hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                          title={isAr ? 'حذف من الحقيبة' : 'Remove item'}
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>

              {/* Special Order Customizations Box */}
              <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#F2E5D5] shadow-xs space-y-4">
                <div className="flex items-center gap-2 text-[#4A2116]">
                  <Sparkles className="w-5 h-5 text-[#C58A19]" />
                  <h3 className="font-serif font-bold text-base sm:text-lg">
                    {isAr ? 'ملاحظات وتفاصيل التزيين' : 'Cake Inscription & Special Requests'}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Inscription on Cake */}
                  <div>
                    <label className="block text-xs font-semibold text-[#4A2116] mb-1.5">
                      {isAr ? 'العبارة المكتوبة على لوح الشوكولاتة' : 'Message on Cake Plaque'}
                    </label>
                    <input 
                      type="text"
                      value={cakeMessage}
                      onChange={(e) => setCakeMessage(e.target.value)}
                      placeholder={isAr ? 'مثال: Happy Birthday Sarah!' : 'e.g., Happy Birthday Sarah!'}
                      className="w-full bg-[#FAF5ED] border border-[#E2D2BD] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#4A2116] outline-none focus:border-[#C58A19]"
                    />
                    <span className="text-[10.5px] text-[#8C6D62] mt-1 block">
                      {isAr ? 'كتابة يدوية أنيقة على لوح شوكولاتة بلجيكية مجاناً' : 'Complimentary hand-piped Belgian chocolate plaque'}
                    </span>
                  </div>

                  {/* Delivery Date */}
                  <div>
                    <label className="block text-xs font-semibold text-[#4A2116] mb-1.5 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#C58A19]" />
                      <span>{isAr ? 'تاريخ التوصيل المفضل' : 'Preferred Delivery Date'}</span>
                    </label>
                    <input 
                      type="date"
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      className="w-full bg-[#FAF5ED] border border-[#E2D2BD] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#4A2116] outline-none focus:border-[#C58A19]"
                    />
                  </div>
                </div>

                {/* Time Slot & Special Instructions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-[#4A2116] mb-1.5 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#C58A19]" />
                      <span>{isAr ? 'فترة التوصيل' : 'Delivery Window'}</span>
                    </label>
                    <select
                      value={deliveryTimeSlot}
                      onChange={(e) => setDeliveryTimeSlot(e.target.value)}
                      className="w-full bg-[#FAF5ED] border border-[#E2D2BD] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#4A2116] outline-none focus:border-[#C58A19] cursor-pointer"
                    >
                      <option value="morning">{isAr ? 'صباحاً: 10:00 ص - 2:00 م' : 'Morning: 10:00 AM – 2:00 PM'}</option>
                      <option value="afternoon">{isAr ? 'ظهراً: 2:00 م - 6:00 م' : 'Afternoon: 2:00 PM – 6:00 PM'}</option>
                      <option value="evening">{isAr ? 'مساءً: 6:00 م - 10:00 م' : 'Evening: 6:00 PM – 10:00 PM'}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#4A2116] mb-1.5">
                      {isAr ? 'ملاحظات إضافية للتوصيل أو الحفل' : 'Special Delivery Instructions'}
                    </label>
                    <input 
                      type="text"
                      value={specialInstructions}
                      onChange={(e) => setSpecialInstructions(e.target.value)}
                      placeholder={isAr ? 'مثال: فيلا رقم 14، رنين الجرس بلطف' : 'e.g., Villa 14, please call upon arrival'}
                      className="w-full bg-[#FAF5ED] border border-[#E2D2BD] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#4A2116] outline-none focus:border-[#C58A19]"
                    />
                  </div>
                </div>

              </div>

            </div>

            {/* Right Column: Order Summary & Checkout Actions (4-5 Cols) */}
            <div className="lg:col-span-5 xl:col-span-4 space-y-5">
              
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#F2E5D5] shadow-sm sticky top-24">
                
                <h3 className="font-serif font-bold text-xl text-[#4A2116] pb-4 border-b border-[#F2E5D5]">
                  {isAr ? 'ملخص الطلب' : 'Order Summary'}
                </h3>

                {/* Subtotal & Delivery Breakdown */}
                <div className="py-4 space-y-3 text-xs sm:text-sm text-[#6B4B3E]">
                  <div className="flex justify-between items-center">
                    <span>{isAr ? 'المجموع الفرعي' : 'Subtotal'}</span>
                    <span className="font-semibold text-[#4A2116] tabular-nums">AED {subtotal}</span>
                  </div>

                  {promoDiscount > 0 && (
                    <div className="flex justify-between items-center text-emerald-700 font-medium">
                      <span>{isAr ? `خصم الكوبون (${promoDiscount * 100}%)` : `Promo Discount (${promoDiscount * 100}%)`}</span>
                      <span className="tabular-nums">-AED {discountAmount}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5 text-[#C58A19]" />
                      <span>{isAr ? 'توصيل مبرد فاخر (دبي)' : 'Chilled Van Delivery (Dubai)'}</span>
                    </span>
                    <span className={`font-semibold tabular-nums ${deliveryFee === 0 ? 'text-emerald-700' : 'text-[#4A2116]'}`}>
                      {deliveryFee === 0 ? (isAr ? 'مجاني' : 'FREE') : `AED ${deliveryFee}`}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-[11px] text-[#8C6D62]">
                    <span>{isAr ? 'ضريبة القيمة المضافة (5% متضمنة)' : 'VAT (5% included)'}</span>
                    <span className="tabular-nums">AED {vatIncluded}</span>
                  </div>
                </div>

                {/* Delivery Threshold Notice */}
                {subtotal > 0 && subtotal < 400 && (
                  <div className="p-2.5 rounded-xl bg-[#FAF5ED] border border-[#EBDCC8] text-[11px] text-[#7A5846] mb-4">
                    {isAr ? (
                      <span>أضف منتجات بقيمة <strong>AED {400 - subtotal}</strong> للحصول على توصيل مجاني!</span>
                    ) : (
                      <span>Add <strong>AED {400 - subtotal}</strong> more for free refrigerated delivery!</span>
                    )}
                  </div>
                )}

                {/* Promo Code Input */}
                <form onSubmit={handleApplyPromo} className="pt-2 pb-4 border-t border-[#F2E5D5]">
                  <label className="block text-xs font-semibold text-[#4A2116] mb-1.5 flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5 text-[#C58A19]" />
                    <span>{isAr ? 'كوبون الخصم' : 'Have a Promo Code?'}</span>
                  </label>
                  <div className="flex gap-2">
                    <input 
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="DREAM10"
                      className="flex-1 bg-[#FAF5ED] border border-[#E2D2BD] rounded-xl px-3 py-2 text-xs uppercase text-[#4A2116] outline-none focus:border-[#C58A19]"
                    />
                    <button
                      type="submit"
                      className="bg-[#FAF5ED] hover:bg-[#F2E5D5] text-[#4A2116] font-semibold text-xs px-3.5 py-2 rounded-xl border border-[#EBDCC8] transition-colors cursor-pointer"
                    >
                      {isAr ? 'تطبيق' : 'Apply'}
                    </button>
                  </div>
                  {promoSuccess && <p className="text-[11px] text-emerald-700 mt-1.5 font-medium">{promoSuccess}</p>}
                  {promoError && <p className="text-[11px] text-rose-700 mt-1.5 font-medium">{promoError}</p>}
                </form>

                {/* Grand Total */}
                <div className="pt-4 border-t border-[#F2E5D5] flex justify-between items-baseline mb-6">
                  <div>
                    <span className="font-serif font-bold text-base sm:text-lg text-[#4A2116] block">
                      {isAr ? 'المجموع الإجمالي' : 'Total Amount'}
                    </span>
                    <span className="text-[10px] text-[#8C6D62]">
                      {isAr ? 'شامل الضريبة والتوصيل المبرد' : 'Includes all taxes & delivery'}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-serif font-bold text-2xl sm:text-3xl text-[#C58A19] tabular-nums">
                      AED {totalAmount}
                    </span>
                  </div>
                </div>

                {/* Primary Action 1: Direct WhatsApp Concierge Checkout */}
                <a
                  href={`https://wa.me/971506063631?text=${generateWhatsAppMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-semibold text-xs sm:text-sm py-3.5 px-4 rounded-full transition-all flex items-center justify-center gap-2.5 shadow-sm hover:shadow-md cursor-pointer mb-3"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>{isAr ? 'طلب سريع عبر واتساب كونسيرج' : 'Order via WhatsApp Concierge'}</span>
                </a>

                {/* Primary Action 2: Online Direct Order Confirmation */}
                <button
                  type="button"
                  onClick={() => setShowCheckoutModal(true)}
                  className="w-full bg-[#4A2116] hover:bg-[#C58A19] text-white font-semibold text-xs sm:text-sm py-3.5 px-4 rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-98"
                >
                  <CreditCard className="w-4 h-4 text-[#E6C783]" />
                  <span>{isAr ? 'إتمام الطلب الإلكتروني' : 'Proceed to Checkout'}</span>
                </button>

                {/* Trust Pillar Badges */}
                <div className="mt-6 pt-5 border-t border-[#F5EBDD] space-y-2 text-[11px] text-[#7A5846]">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#C58A19] shrink-0" />
                    <span>{isAr ? 'شاحنات تبريد مخصصة لضمان سلامة الكيك 100%' : 'Chilled delivery vans preserve pristine cake form'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#C58A19] shrink-0" />
                    <span>{isAr ? 'دفع آمن عند الاستلام أو بالبطاقة البنكية' : 'Cash or Card on Delivery and Secure Online Checkout'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#C58A19] shrink-0" />
                    <span>{isAr ? 'خدمة العملاء: +971 506063631' : 'Concierge line: +971 506063631'}</span>
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

      </main>

      {/* 3. Checkout Modal */}
      {showCheckoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-[#EBDCC8] shadow-2xl relative text-[#4A2116] max-h-[90vh] overflow-y-auto">
            
            <button 
              type="button"
              onClick={() => {
                setShowCheckoutModal(false);
                setOrderSubmitted(false);
              }}
              className="absolute top-5 right-5 rtl:right-auto rtl:left-5 text-[#8C6D62] hover:text-[#4A2116] p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {isVerifyingPayment ? (
              /* Payment Verification Spinner */
              <div className="text-center py-12 animate-fadeIn">
                <RefreshCw className="w-12 h-12 animate-spin text-[#C58A19] mx-auto mb-4" />
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#4A2116] mb-2">
                  {isAr ? 'جاري التحقق من عملية الدفع عبر سترايب...' : 'Verifying Stripe Payment...'}
                </h3>
                <p className="text-xs text-[#8C6D62] max-w-sm mx-auto">
                  {isAr 
                    ? 'يرجى الانتظار بضع ثوانٍ بينما نؤكد معاملتك البنكية مع بوابة Stripe.' 
                    : 'Please hold on for a moment while we confirm your verified transaction with Stripe.'}
                </p>
              </div>
            ) : orderSubmitted ? (
              /* Success Confirmation */
              <div className="text-center py-6 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 stroke-[2.5]" />
                </div>
                <span className="text-xs font-bold text-[#C58A19] uppercase tracking-wider block">
                  {isAr ? 'تم استلام وتأكيد طلبك بنجاح!' : 'Order Confirmed and Paid Successfully!'}
                </span>
                <h3 className="font-serif font-bold text-2xl text-[#4A2116] mt-1 mb-2">
                  #{confirmedOrder?.order_number || orderNumber}
                </h3>
                <p className="text-xs text-[#7D5B50] max-w-sm mx-auto mb-5 leading-relaxed">
                  {isAr
                    ? 'شكراً لثقتكم بمخبز دريم اللبناني. سيتواصل معكم فريق الكونسيرج لتأكيد تفاصيل التوصيل وتجهيز الكيك بأعلى درجات العناية.'
                    : 'Thank you for choosing Lebanese Dream Bakery. Your order is registered in our confectionery kitchen and our concierge team will reach out with delivery updates.'}
                </p>

                {/* Verified Order Receipt Details */}
                <div className="bg-[#FAF5ED] rounded-2xl p-4 sm:p-5 border border-[#EBDCC8] text-xs text-left rtl:text-right space-y-2.5 mb-6">
                  <div className="flex justify-between items-center pb-2 border-b border-[#EBDCC8]">
                    <span className="text-[#8C6D62]">{isAr ? 'رقم الطلب:' : 'Order ID:'}</span>
                    <span className="font-bold text-[#4A2116] font-mono">
                      #{confirmedOrder?.order_number || orderNumber}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-[#8C6D62]">{isAr ? 'اسم العميل:' : 'Customer Name:'}</span>
                    <span className="font-semibold text-[#4A2116]">
                      {confirmedOrder?.customer_name || customerName || (isAr ? 'عميل كرام' : 'Valued Customer')}
                    </span>
                  </div>

                  {/* Cake Items Summary */}
                  {confirmedOrder?.cake_details?.items && confirmedOrder.cake_details.items.length > 0 && (
                    <div className="py-2 border-y border-[#EBDCC8]/70 space-y-1.5">
                      <span className="text-[10px] uppercase font-bold text-[#8C6D62] block">
                        {isAr ? 'أصناف الكيك المطلوبة:' : 'Cake Details:'}
                      </span>
                      {confirmedOrder.cake_details.items.map((it, idx) => (
                        <div key={idx} className="flex justify-between text-[11px] text-[#4A2116]">
                          <span>
                            {it.quantity || 1}x {isAr ? (it.title_ar || it.title) : it.title} {it.flavor ? `(${it.flavor})` : ''}
                          </span>
                          <span className="font-semibold text-[#8C6D62]">
                            AED {(Number(it.price) || 0) * (Number(it.quantity) || 1)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Correct Amount in AED */}
                  <div className="flex justify-between items-center font-bold text-sm pt-1">
                    <span className="text-[#4A2116]">{isAr ? 'المبلغ الإجمالي المدفوع:' : 'Amount Paid:'}</span>
                    <span className="text-[#C58A19] font-serif text-lg">
                      AED {confirmedOrder?.total_amount != null ? confirmedOrder.total_amount : totalAmount}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-[#8C6D62]">
                    <span>{isAr ? 'تاريخ التوصيل:' : 'Delivery Date:'}</span>
                    <span className="font-medium text-[#4A2116]">
                      {confirmedOrder?.delivery_date || deliveryDate}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-[#8C6D62]">
                    <span>{isAr ? 'طريقة الدفع:' : 'Payment Method:'}</span>
                    <span className="font-semibold text-[#4A2116]">
                      {paymentMethod === 'stripe'
                        ? (isAr ? 'سترايب (Stripe)' : 'Stripe')
                        : paymentMethod === 'cod'
                          ? (isAr ? 'دفع نقدي عند الاستلام' : 'Cash on Delivery')
                          : (isAr ? 'بطاقة عند الاستلام' : 'Card on Delivery')}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-[#8C6D62]">
                    <span>{isAr ? 'حالة الدفع:' : 'Payment Status:'}</span>
                    <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 text-[10px]">
                      <Check className="w-3 h-3 stroke-[3]" />
                      {paymentMethod === 'stripe' ? (isAr ? 'مدفوع (Paid)' : 'Paid') : (isAr ? 'عند الاستلام' : 'Pending Delivery')}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      setShowCheckoutModal(false);
                      setOrderSubmitted(false);
                      setConfirmedOrder(null);
                      navigateTo('/my-orders');
                    }}
                    className="w-full sm:flex-1 bg-[#4A2116] hover:bg-[#C58A19] text-white py-3 rounded-full text-xs sm:text-sm font-semibold transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <Package className="w-4 h-4 text-[#E6C783]" />
                    <span>{isAr ? 'متابعة الطلب في "طلباتي"' : 'Track in My Orders'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setShowCheckoutModal(false);
                      setOrderSubmitted(false);
                      setConfirmedOrder(null);
                      if (onContinueShopping) onContinueShopping();
                      else navigateTo('/');
                    }}
                    className="w-full sm:w-auto bg-[#FAF5ED] hover:bg-[#F2E5D5] text-[#4A2116] border border-[#EBDCC8] py-3 px-5 rounded-full text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                  >
                    {isAr ? 'الرئيسية' : 'Return Home'}
                  </button>
                </div>
              </div>
            ) : (
              /* Checkout Details Form */
              <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                <div>
                  <span className="text-xs font-bold text-[#C58A19] uppercase tracking-wider block">
                    {isAr ? 'تأكيد الحجز والتوصيل' : 'Delivery and Contact Details'}
                  </span>
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#4A2116] mt-0.5">
                    {isAr ? 'معلومات العميل والدفع' : 'Complete Your Order'}
                  </h3>
                </div>

                {/* Stripe Error Alert */}
                {stripeError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-3.5 py-2.5 rounded-xl text-xs flex items-center justify-between">
                    <span>{stripeError}</span>
                    <button type="button" onClick={() => setStripeError('')} className="text-red-500 hover:text-red-700">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-[#4A2116] mb-1">
                    {isAr ? 'الاسم بالكامل *' : 'Full Name *'}
                  </label>
                  <input 
                    type="text" 
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g., Sarah Al Mansoori"
                    className="w-full bg-[#FAF5ED] border border-[#E2D2BD] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#4A2116] outline-none focus:border-[#C58A19]"
                  />
                </div>

                {/* Phone & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#4A2116] mb-1">
                      {isAr ? 'رقم الهاتف (واتساب) *' : 'Phone Number (WhatsApp) *'}
                    </label>
                    <input 
                      type="tel" 
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="+971 50 123 4567"
                      className="w-full bg-[#FAF5ED] border border-[#E2D2BD] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#4A2116] outline-none focus:border-[#C58A19]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#4A2116] mb-1">
                      {isAr ? 'البريد الإلكتروني' : 'Email Address (Optional)'}
                    </label>
                    <input 
                      type="email" 
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="client@example.com"
                      className="w-full bg-[#FAF5ED] border border-[#E2D2BD] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#4A2116] outline-none focus:border-[#C58A19]"
                    />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-xs font-semibold text-[#4A2116] mb-1">
                    {isAr ? 'عنوان التوصيل في الإمارات *' : 'Delivery Address (Dubai and UAE) *'}
                  </label>
                  <textarea 
                    rows="2"
                    required
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder={isAr ? 'المنطقة، اسم الشارع، رقم الفيلا أو المبنى والشقة' : 'Area, Street, Building / Villa name and number'}
                    className="w-full bg-[#FAF5ED] border border-[#E2D2BD] rounded-xl px-3.5 py-2 text-xs sm:text-sm text-[#4A2116] outline-none focus:border-[#C58A19] resize-none"
                  />
                </div>

                {/* Payment Method Selector */}
                <div>
                  <label className="block text-xs font-semibold text-[#4A2116] mb-1.5">
                    {isAr ? 'طريقة الدفع' : 'Payment Method'}
                  </label>
                  
                  {/* 3 Payment Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {/* 1. Stripe Official Card Payment */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('stripe')}
                      className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                        paymentMethod === 'stripe'
                          ? 'bg-[#4A2116] text-[#E6C783] border-[#4A2116] shadow-sm'
                          : 'bg-[#FAF5ED] text-[#4A2116] border-[#EBDCC8] hover:bg-[#F2E5D5]'
                      }`}
                    >
                      <CreditCard className="w-4 h-4 text-[#C58A19]" />
                      <span className="text-[11px] leading-tight font-bold">{isAr ? 'بطاقة بنكية (سترايب)' : 'Card (Stripe)'}</span>
                      <span className="text-[9px] opacity-80">{isAr ? 'بوابة رسمية' : 'Stripe Hosted'}</span>
                    </button>

                    {/* 2. Cash on Delivery */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cod')}
                      className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                        paymentMethod === 'cod'
                          ? 'bg-[#C58A19] text-white border-[#C58A19] shadow-sm'
                          : 'bg-[#FAF5ED] text-[#4A2116] border-[#EBDCC8] hover:bg-[#F2E5D5]'
                      }`}
                    >
                      <Truck className="w-4 h-4 text-[#C58A19]" />
                      <span className="text-[11px] leading-tight">{isAr ? 'دفع عند الاستلام' : 'Cash on Delivery'}</span>
                      <span className="text-[9px] opacity-80">COD</span>
                    </button>

                    {/* 3. Card on Delivery */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                        paymentMethod === 'card'
                          ? 'bg-[#C58A19] text-white border-[#C58A19] shadow-sm'
                          : 'bg-[#FAF5ED] text-[#4A2116] border-[#EBDCC8] hover:bg-[#F2E5D5]'
                      }`}
                    >
                      <ShieldCheck className="w-4 h-4 text-[#C58A19]" />
                      <span className="text-[11px] leading-tight">{isAr ? 'بطاقة عند الاستلام' : 'Card on Delivery'}</span>
                      <span className="text-[9px] opacity-80">POS Van</span>
                    </button>
                  </div>

                  {/* Stripe Official Checkout Information Card */}
                  {paymentMethod === 'stripe' && (
                    <div className="mt-3 p-4 rounded-2xl bg-[#FAF5ED] border border-[#EBDCC8] space-y-3 animate-fadeIn">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#4A2116] flex items-center gap-1.5">
                          <Lock className="w-4 h-4 text-[#C58A19]" />
                          <span>{isAr ? 'بوابة سترايب الآمنة الرسمية' : 'Official Stripe-Hosted Checkout'}</span>
                        </span>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                          Stripe Test Mode Active
                        </span>
                      </div>

                      <p className="text-xs text-[#7A5846] leading-relaxed">
                        {isAr
                          ? 'سيتم تحويلك إلى صفحة الدفع الرسمية لموقع Stripe لإتمام الدفع بأمان تام بواسطة البطاقة البنكية أو Apple Pay.'
                          : 'Clicking below will securely open the official Stripe payment page where you can enter your card details.'}
                      </p>

                      <div className="p-3 bg-white rounded-xl border border-[#EBDCC8] text-[11px] text-[#4A2116] space-y-1">
                        <div className="font-semibold text-[#C58A19] flex items-center gap-1">
                          <span>💳 {isAr ? 'بيانات البطاقة التجريبية الرسمية لـ Stripe:' : 'Stripe Official Test Card:'}</span>
                        </div>
                        <div className="font-mono text-[#4A2116] font-medium">
                          Card: <span className="font-bold">4242 4242 4242 4242</span>
                        </div>
                        <div className="text-[10.5px] text-[#8C6D62]">
                          Expiry: <span className="font-medium">Any future date (e.g. 12/28)</span> • CVC: <span className="font-medium">Any 3 digits (e.g. 123)</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Order Summary Line in Modal */}
                <div className="pt-2 flex justify-between items-center text-xs font-bold text-[#4A2116]">
                  <span>{isAr ? 'الإجمالي المطلوب دفعه:' : 'Total Payable:'}</span>
                  <span className="text-[#C58A19] text-base font-serif">AED {totalAmount}</span>
                </div>

                {/* Submit Order Button */}
                <button
                  type="submit"
                  disabled={isProcessingPayment}
                  className="w-full bg-[#4A2116] hover:bg-[#C58A19] text-white font-semibold text-xs sm:text-sm py-3.5 rounded-full transition-colors cursor-pointer shadow-md mt-2 flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {isProcessingPayment ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-[#E6C783]" />
                      <span>{isAr ? 'جاري تحويلك لبوابة سترايب الآمنة...' : 'Redirecting to Official Stripe Checkout...'}</span>
                    </>
                  ) : paymentMethod === 'stripe' ? (
                    <>
                      <Lock className="w-3.5 h-3.5 text-[#E6C783]" />
                      <span>{isAr ? `ادفع الآن عبر سترايب (AED ${totalAmount})` : `Pay Securely with Stripe (AED ${totalAmount})`}</span>
                    </>
                  ) : (
                    <span>{isAr ? `تأكيد الطلب بمبلغ AED ${totalAmount}` : `Confirm Order (AED ${totalAmount})`}</span>
                  )}
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
