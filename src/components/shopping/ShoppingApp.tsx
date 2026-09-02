import React, { useState } from 'react';
import { SHOPPING_PRODUCTS } from '../../data/shoppingData';
import { ShopProduct } from '../../types';
import { 
  ShoppingBag, 
  Search, 
  ArrowLeft, 
  Star, 
  Truck, 
  ShieldCheck, 
  Clock, 
  Zap, 
  Sparkles,
  ChevronRight,
  ShoppingCart,
  X,
  CreditCard,
  CheckCircle2,
  Lock,
  Smartphone
} from 'lucide-react';
import { playSound } from '../../utils/soundEffects';

interface ShoppingAppProps {
  onBackToHome: () => void;
  onPaymentCompleted: (product: ShopProduct) => void;
}

export const ShoppingApp: React.FC<ShoppingAppProps> = ({
  onBackToHome,
  onPaymentCompleted,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<ShopProduct | null>(null);
  const [cart, setCart] = useState<ShopProduct[]>([]);
  const [showCartModal, setShowCartModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Apple Pay Sheet State
  const [showApplePaySheet, setShowApplePaySheet] = useState(false);
  const [payingProduct, setPayingProduct] = useState<ShopProduct | null>(null);
  const [applePayProcessing, setApplePayProcessing] = useState(false);
  const [applePaySuccess, setApplePaySuccess] = useState(false);

  const filteredProducts = SHOPPING_PRODUCTS.filter(p => {
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesQuery = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const handleAddToCart = (p: ShopProduct) => {
    playSound.pop();
    setCart(prev => [...prev, p]);
  };

  const handleInitiateApplePay = (p: ShopProduct) => {
    playSound.pop();
    setPayingProduct(p);
    setSelectedProduct(null);
    setShowCartModal(false);
    setShowApplePaySheet(true);
    setApplePayProcessing(false);
    setApplePaySuccess(false);
  };

  const handleConfirmApplePay = () => {
    if (!payingProduct) return;
    setApplePayProcessing(true);
    playSound.pop();

    setTimeout(() => {
      setApplePayProcessing(false);
      setApplePaySuccess(true);
      playSound.coin();

      setTimeout(() => {
        setShowApplePaySheet(false);
        onPaymentCompleted(payingProduct);
      }, 1200);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-hidden select-none">
      {/* Top E-Commerce Header Bar */}
      <div className="bg-gradient-to-r from-orange-600 to-amber-600 text-white px-4 pt-3 pb-3 shadow-md shrink-0">
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={onBackToHome}
            className="p-1.5 bg-white/20 hover:bg-white/30 rounded-xl transition-colors text-white"
            title="Back to Phone Home"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="flex-1 relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-orange-900/60" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Sony, Labubu, iPad..."
              className="w-full pl-8 pr-3 py-1.5 bg-white text-slate-900 rounded-xl text-xs font-medium focus:outline-none placeholder:text-slate-400"
            />
          </div>

          <button
            onClick={() => setShowCartModal(true)}
            className="p-2 bg-white/20 hover:bg-white/30 rounded-xl relative transition-colors"
          >
            <ShoppingCart className="w-4 h-4 text-white" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-orange-600">
                {cart.length}
              </span>
            )}
          </button>
        </div>

        {/* Categories Bar */}
        <div className="flex gap-2 overflow-x-auto pt-3 pb-0.5 scrollbar-none text-xs">
          {[
            { id: 'all', label: 'All Deals' },
            { id: 'electronics', label: '⚡ Electronics' },
            { id: 'lifestyle', label: '🧸 Pop Mart & Toys' },
            { id: 'fashion', label: '👟 Fashion' },
            { id: 'gaming', label: '🎮 Gaming' },
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1 rounded-full font-bold whitespace-nowrap text-[11px] transition-all ${
                selectedCategory === cat.id
                  ? 'bg-white text-orange-700 shadow-xs'
                  : 'bg-orange-700/50 text-orange-100 hover:bg-orange-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Free Delivery Banner */}
      <div className="bg-orange-100/90 border-b border-orange-200 px-4 py-1.5 flex items-center justify-between text-[11px] text-orange-950 font-bold shrink-0">
        <div className="flex items-center gap-1.5">
          <Truck className="w-3.5 h-3.5 text-orange-700" />
          <span>Free Express Delivery on orders above S$50 · Singapore Direct</span>
        </div>
        <span className="text-[10px] text-orange-700 font-extrabold uppercase">Official</span>
      </div>

      {/* Product Grid */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 pb-16">
        <div className="grid grid-cols-2 gap-3">
          {filteredProducts.map(prod => (
            <div
              key={prod.id}
              onClick={() => setSelectedProduct(prod)}
              className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-2">
                {/* Product Emoji & Image Badge */}
                <div className="w-full h-28 bg-gradient-to-tr from-orange-50 via-slate-50 to-pink-50 rounded-xl flex items-center justify-center text-4xl relative overflow-hidden group-hover:scale-[1.02] transition-transform">
                  <span>{prod.emoji}</span>
                  {prod.tag && (
                    <span className="absolute top-1.5 left-1.5 bg-orange-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded shadow-xs">
                      {prod.tag}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-xs font-bold text-slate-900 line-clamp-2 leading-snug">
                    {prod.name}
                  </h3>
                  <div className="flex items-center gap-1 mt-1 text-[10px] text-slate-500 font-medium">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                    <span>{prod.rating}</span>
                    <span>· {prod.soldCount} sold</span>
                  </div>
                </div>
              </div>

              {/* Price & Action */}
              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-sm font-extrabold text-orange-600">
                    S${prod.price}
                  </span>
                  {prod.originalPrice && (
                    <span className="text-[10px] text-slate-400 line-through">
                      S${prod.originalPrice}
                    </span>
                  )}
                </div>

                <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-lg group-hover:bg-orange-50 group-hover:text-orange-600 transition-colors">
                  View
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
          <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-5 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-3xl">{selectedProduct.emoji}</span>
                <div>
                  <span className="text-[10px] font-extrabold text-orange-600 uppercase tracking-wider">
                    {selectedProduct.category}
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm leading-snug">
                    {selectedProduct.name}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="text-slate-400 hover:text-slate-600 font-bold text-xl p-1"
              >
                ×
              </button>
            </div>

            {/* Price & Rating */}
            <div className="flex items-center justify-between bg-orange-50/60 p-3 rounded-2xl border border-orange-100">
              <div>
                <span className="text-xl font-black text-orange-600">
                  S${selectedProduct.price}
                </span>
                {selectedProduct.originalPrice && (
                  <span className="text-xs text-slate-400 line-through ml-2">
                    S${selectedProduct.originalPrice}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-slate-700">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>{selectedProduct.rating} / 5.0</span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1 text-xs text-slate-600">
              <span className="font-bold text-slate-800 uppercase text-[11px] block">Item Overview</span>
              <p>{selectedProduct.description}</p>
            </div>

            {/* Guaranteed Seller Badge */}
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex items-center gap-2 text-xs text-slate-600">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>100% Authentic Guarantee · 15-Day Free Returns in Singapore</span>
            </div>

            {/* Checkout Action Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => {
                  handleAddToCart(selectedProduct);
                  setSelectedProduct(null);
                }}
                className="py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors"
              >
                Add to Cart
              </button>
              <button
                onClick={() => handleInitiateApplePay(selectedProduct)}
                className="py-3 bg-black hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
              >
                <span> Pay</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cart Modal */}
      {showCartModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
          <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-5 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-orange-600" /> Shopping Cart ({cart.length})
              </h3>
              <button
                onClick={() => setShowCartModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-xl p-1"
              >
                ×
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="py-8 text-center text-slate-400 space-y-2">
                <ShoppingBag className="w-10 h-10 mx-auto opacity-40" />
                <p className="text-xs">Your shopping cart is empty.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{item.emoji}</span>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{item.name}</h4>
                        <span className="text-xs font-extrabold text-orange-600">S${item.price}</span>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="pt-2 border-t border-slate-100 space-y-2">
                  <div className="flex justify-between text-sm font-bold text-slate-900">
                    <span>Total Amount:</span>
                    <span className="text-orange-600">
                      S${cart.reduce((a, b) => a + b.price, 0)}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      if (cart.length > 0) {
                        handleInitiateApplePay(cart[0]);
                      }
                    }}
                    className="w-full py-3 bg-black hover:bg-slate-800 text-white font-extrabold text-sm rounded-xl shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Pay with  Pay</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= REALISTIC APPLE PAY SHEET ================= */}
      {showApplePaySheet && payingProduct && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-end justify-center p-0 sm:p-4 animate-fade-in">
          <div className="bg-slate-900 text-white w-full max-w-md rounded-t-[32px] p-6 space-y-4 shadow-2xl border-t border-slate-700">
            {/* Apple Pay Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-lg font-black tracking-tight flex items-center gap-1">
                 Pay
              </span>
              <button
                onClick={() => setShowApplePaySheet(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {applePaySuccess ? (
              /* Success Checkmark State */
              <div className="py-6 text-center space-y-2 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                  <CheckCircle2 className="w-10 h-10 animate-pulse" />
                </div>
                <h4 className="text-base font-bold text-white">Payment Successful</h4>
                <p className="text-xs text-slate-400">
                  S${payingProduct.price}.00 paid with DBS Visa Debit (*4921)
                </p>
              </div>
            ) : (
              /* Standard Apple Pay Sheet */
              <div className="space-y-4">
                {/* Item & Merchant Info */}
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-bold text-white line-clamp-1">{payingProduct.name}</h4>
                    <span className="text-xs text-slate-400">Merchant: ShopLah SG</span>
                  </div>
                  <span className="text-lg font-black text-white">S${payingProduct.price}.00</span>
                </div>

                {/* Card Selector: DBS Visa Debit */}
                <div className="bg-slate-800/80 rounded-2xl p-3.5 border border-slate-700 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-7 bg-red-700 rounded-md flex items-center justify-center text-[10px] font-bold text-white shadow-xs">
                      DBS
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block">DBS Visa Debit</span>
                      <span className="text-[11px] text-slate-400">•••• 4921</span>
                    </div>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">Default</span>
                </div>

                {/* Billing / Shipping */}
                <div className="text-xs text-slate-400 space-y-1">
                  <div className="flex justify-between">
                    <span>Shipping To:</span>
                    <span className="text-slate-200 font-medium">Bryan Tan (Tengah, SG)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Contact:</span>
                    <span className="text-slate-200 font-medium">bryan.tan@email.sg</span>
                  </div>
                </div>

                {/* Face ID / Pay Button */}
                <div className="pt-2">
                  <button
                    onClick={handleConfirmApplePay}
                    disabled={applePayProcessing}
                    className="w-full py-3.5 bg-white hover:bg-slate-100 text-black font-extrabold text-sm rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    {applePayProcessing ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        Verifying Face ID...
                      </span>
                    ) : (
                      <>
                        <Smartphone className="w-4 h-4" /> Double-Click or Tap to Pay
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
