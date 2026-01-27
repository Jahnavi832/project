
import React, { useState } from 'react';
import { MOCK_MEDICINES } from '../../constants';
import { ShoppingCart, Search, Filter, Plus, Minus, Check, Truck, CreditCard } from 'lucide-react';
import { CartItem } from '../../types';

interface MedicinesProps {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const Medicines: React.FC<MedicinesProps> = ({ cart, setCart }) => {
  const [search, setSearch] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const filteredMeds = MOCK_MEDICINES.filter(m => 
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  const updateCart = (id: string, delta: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === id);
      if (existing) {
        const newQty = existing.qty + delta;
        if (newQty <= 0) return prev.filter(item => item.id !== id);
        return prev.map(item => item.id === id ? { ...item, qty: newQty } : item);
      }
      if (delta > 0) {
        const med = MOCK_MEDICINES.find(m => m.id === id);
        if (!med) return prev;
        return [...prev, { ...med, qty: 1 }];
      }
      return prev;
    });
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.qty), 0);

  const handleCheckout = () => {
    setOrderPlaced(true);
    setTimeout(() => {
      setOrderPlaced(false);
      setCart([]);
    }, 4000);
  };

  if (orderPlaced) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-in zoom-in duration-300 max-w-lg mx-auto text-center">
        <div className="w-24 h-24 bg-orange-100 text-orange-600 rounded-[2.5rem] flex items-center justify-center mb-8 shadow-inner">
          <Truck size={48} />
        </div>
        <h3 className="text-3xl font-bold text-slate-800 mb-4">Order Placed Successfully!</h3>
        <p className="text-slate-500 text-lg mb-2">Thank you for choosing HealthConnect Pharmacy.</p>
        <p className="text-orange-600 font-bold px-6 py-2 bg-orange-50 rounded-full inline-block mt-4">
          Estimated Delivery: Within 30 minutes
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pb-20">
      <div className="lg:col-span-3 space-y-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search health drinks, supplements, or tablets..."
              className="w-full pl-14 pr-6 py-4 bg-white border border-slate-200 rounded-3xl focus:ring-4 focus:ring-teal-100 focus:border-teal-500 outline-none shadow-sm transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="px-8 py-4 bg-white border border-slate-200 rounded-3xl flex items-center justify-center gap-3 text-slate-600 font-bold hover:border-teal-300 shadow-sm">
            <Filter size={20} /> Filters
          </button>
        </div>

        {cart.some(item => item.isPrescribed) && (
          <div className="bg-teal-50 border border-teal-200 p-6 rounded-[2rem] flex items-center gap-6 animate-pulse">
            <div className="w-14 h-14 bg-teal-600 text-white rounded-2xl flex items-center justify-center shadow-lg">
              <Check size={32} />
            </div>
            <div>
              <h4 className="text-teal-900 font-bold text-lg">Prescription Found</h4>
              <p className="text-teal-700 font-medium">Items from your doctor's visit have been automatically added to the cart.</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredMeds.map(med => {
            const cartItem = cart.find(item => item.id === med.id);
            return (
              <div key={med.id} className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all group border-b-4 hover:border-b-teal-500">
                <div className="relative h-56 bg-slate-100 overflow-hidden">
                  <img src={med.image} alt={med.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <span className="bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-[10px] font-extrabold text-slate-700 border shadow-sm uppercase tracking-wider">
                      {med.category}
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-bold text-xl text-slate-800 leading-tight">{med.name}</h5>
                    <p className="text-xl font-extrabold text-teal-700">₹{med.price}</p>
                  </div>
                  <p className="text-sm text-slate-400 mb-8 h-10 overflow-hidden">{med.description}</p>
                  
                  <div className="flex items-center justify-between mt-auto">
                    {cartItem ? (
                      <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2 w-full justify-between">
                        <button onClick={() => updateCart(med.id, -1)} className="w-8 h-8 rounded-lg hover:bg-white hover:text-teal-600 transition-colors flex items-center justify-center border border-transparent hover:border-slate-200">
                          <Minus size={18} />
                        </button>
                        <span className="font-extrabold text-slate-800 text-lg">{cartItem.qty}</span>
                        <button onClick={() => updateCart(med.id, 1)} className="w-8 h-8 rounded-lg hover:bg-white hover:text-teal-600 transition-colors flex items-center justify-center border border-transparent hover:border-slate-200">
                          <Plus size={18} />
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => updateCart(med.id, 1)}
                        className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all transform active:scale-95 shadow-lg shadow-teal-100"
                      >
                        <Plus size={18} /> Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="lg:col-span-1">
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl p-8 sticky top-8">
          <h4 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-3">
            <ShoppingCart size={28} className="text-teal-600" />
            Order Summary
          </h4>

          {cart.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-slate-50 text-slate-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingCart size={48} />
              </div>
              <p className="text-slate-400 font-bold">Your pharmacy bag is empty</p>
              <p className="text-slate-300 text-xs mt-2 px-4">Browse our catalog to add health essentials.</p>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="space-y-5 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between items-center group">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-slate-800 text-sm">{item.name}</p>
                        {item.isPrescribed && <span className="bg-teal-100 text-teal-600 text-[8px] font-black px-1.5 rounded uppercase">Rx</span>}
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">₹{item.price} × {item.qty}</p>
                    </div>
                    <div className="text-right">
                       <p className="font-black text-slate-800">₹{item.price * item.qty}</p>
                       <button onClick={() => updateCart(item.id, -item.qty)} className="text-[10px] text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">Remove</button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-dashed pt-6 space-y-4">
                <div className="flex justify-between text-slate-500 font-medium">
                  <span>Subtotal</span>
                  <span className="text-slate-800">₹{cartTotal}</span>
                </div>
                <div className="flex justify-between text-slate-500 font-medium">
                  <span>Delivery (Express)</span>
                  <span className="text-emerald-600 font-black">FREE</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t-2 border-slate-100 text-2xl font-black text-slate-800">
                  <span>Total</span>
                  <span className="text-teal-700">₹{cartTotal}</span>
                </div>
                
                <div className="space-y-3 mt-6">
                  <div className="flex items-center gap-3 text-xs text-slate-400 bg-slate-50 p-3 rounded-xl border">
                    <Truck size={16} />
                    <span>Delivering to your registered address within <span className="text-slate-800 font-bold">30 mins</span></span>
                  </div>
                  <button 
                    onClick={handleCheckout}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-5 rounded-[1.5rem] shadow-2xl shadow-teal-200 transition-all transform active:scale-95 flex items-center justify-center gap-3 text-lg"
                  >
                    <CreditCard size={22} /> Pay Now
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Medicines;
