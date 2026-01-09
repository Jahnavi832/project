
import React, { useState } from 'react';
import { MOCK_MEDICINES } from '../constants';
import { Medicine } from '../types';
import { ShoppingCart, Plus, Minus, Search, Trash2, CheckCircle2 } from 'lucide-react';

const MedicineView: React.FC = () => {
  const [cart, setCart] = useState<{ med: Medicine, qty: number }[]>([]);
  const [search, setSearch] = useState('');
  const [orderComplete, setOrderComplete] = useState(false);

  const addToCart = (med: Medicine) => {
    setCart(prev => {
      const existing = prev.find(item => item.med.id === med.id);
      if (existing) {
        return prev.map(item => item.med.id === med.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { med, qty: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.med.id !== id));
  };

  const updateQty = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.med.id === id) {
        const newQty = Math.max(1, item.qty + delta);
        return { ...item, qty: newQty };
      }
      return item;
    }));
  };

  const totalPrice = cart.reduce((acc, curr) => acc + (curr.med.price * curr.qty), 0);

  const handleCheckout = () => {
    setOrderComplete(true);
    setTimeout(() => {
      setOrderComplete(false);
      setCart([]);
    }, 4000);
  };

  if (orderComplete) {
    return (
      <div className="h-96 flex flex-col items-center justify-center space-y-4 animate-in fade-in">
        <CheckCircle2 size={64} className="text-emerald-500" />
        <h2 className="text-2xl font-bold">Order Placed!</h2>
        <p className="text-slate-500">Your medicines will be delivered within 30 minutes.</p>
        <button 
          onClick={() => setOrderComplete(false)}
          className="bg-slate-100 text-slate-700 px-6 py-2 rounded-lg font-bold"
        >
          Back to Shop
        </button>
      </div>
    );
  }

  const filteredMeds = MOCK_MEDICINES.filter(m => m.name.toLowerCase().includes(search.toLowerCase()) || m.category.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div className="flex items-center gap-4 bg-white px-4 py-3 rounded-2xl border border-slate-100 shadow-sm">
          <Search className="text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search tablets, medicines, categories..." 
            className="flex-1 bg-transparent outline-none text-slate-700 font-medium"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredMeds.map(med => (
            <div key={med.id} className="bg-white p-5 rounded-2xl border border-slate-100 flex justify-between items-center group hover:border-blue-200 transition-colors">
              <div>
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase tracking-wider">{med.category}</span>
                <h3 className="text-lg font-bold text-slate-800 mt-1">{med.name}</h3>
                <p className="text-sm text-slate-500">{med.description}</p>
                <p className="text-blue-600 font-bold mt-2">₹{med.price}</p>
              </div>
              <button 
                onClick={() => addToCart(med)}
                className="w-10 h-10 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-sm"
              >
                <Plus size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col h-[calc(100vh-200px)] lg:sticky lg:top-8">
          <div className="flex items-center gap-2 mb-6">
            <ShoppingCart size={24} className="text-blue-600" />
            <h2 className="text-xl font-bold">Your Cart</h2>
          </div>

          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-400">
                <ShoppingCart size={48} strokeWidth={1} className="mb-2" />
                <p>Your cart is empty</p>
              </div>
            ) : (
              cart.map(item => (
                <div key={item.med.id} className="flex gap-3 bg-slate-50 p-3 rounded-xl">
                  <div className="flex-1">
                    <p className="font-bold text-sm text-slate-800">{item.med.name}</p>
                    <p className="text-xs text-blue-600 font-bold">₹{item.med.price * item.qty}</p>
                  </div>
                  <div className="flex items-center gap-2 bg-white rounded-lg px-2 py-1 shadow-sm">
                    <button onClick={() => updateQty(item.med.id, -1)} className="text-slate-400 hover:text-slate-800"><Minus size={14}/></button>
                    <span className="text-xs font-bold w-4 text-center">{item.qty}</span>
                    <button onClick={() => updateQty(item.med.id, 1)} className="text-slate-400 hover:text-slate-800"><Plus size={14}/></button>
                  </div>
                  <button onClick={() => removeFromCart(item.med.id)} className="text-red-400 hover:text-red-600"><Trash2 size={16}/></button>
                </div>
              ))
            )}
          </div>

          <div className="pt-6 border-t border-slate-100 mt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-slate-500 font-medium">Total Amount</span>
              <span className="text-2xl font-bold text-slate-800">₹{totalPrice}</span>
            </div>
            <button 
              disabled={cart.length === 0}
              onClick={handleCheckout}
              className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 transition-colors shadow-lg shadow-blue-200"
            >
              Checkout & Pay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineView;
