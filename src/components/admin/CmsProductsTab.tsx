import React from 'react';
import { Briefcase, Plus, Trash2 } from 'lucide-react';
import { useJagoFarm } from '../../context/JagoFarmContext';

interface CmsProductsTabProps {
  triggerSuccessToast: (msg: string) => void;
}

export default function CmsProductsTab({ triggerSuccessToast }: CmsProductsTabProps) {
  const {
    freshProducts, setFreshProducts,
    addActivityLog
  } = useJagoFarm();

  const handleAddProduct = () => {
    const id = `prod-${Date.now()}`;
    const newProd = {
      id,
      name: 'Produk Baru JagoFarm',
      category: 'Hasil Panen Sirkular',
      description: 'Deskripsi singkat produk hasil sirkular tanpa limbah JagoFarm.',
      image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&q=80&w=600',
      tags: ['Sirkular', 'Segar']
    };
    setFreshProducts([...freshProducts, newProd]);
    addActivityLog('Admin menambahkan produk panen baru', 'admin');
    triggerSuccessToast('Produk baru berhasil ditambahkan ke Katalog B2C!');
  };

  const handleDeleteProduct = (id: string) => {
    setFreshProducts(freshProducts.filter(p => p.id !== id));
    addActivityLog('Admin menghapus produk panen', 'admin');
    triggerSuccessToast('Produk berhasil dihapus dari Katalog.');
  };

  return (
    <div id="tab-content-cms-products" className="space-y-6">
      <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-900 rounded-3xl p-5 text-left">
        <div className="flex justify-between items-center mb-4 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-accent" />
            <h3 className="font-display text-sm font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-100">
              Katalog Produk Segar JagoFarm (B2C)
            </h3>
          </div>
          <button
            id="btn-add-product-cms"
            onClick={handleAddProduct}
            className="flex items-center gap-1 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-[10px] font-bold transition-all cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Tambah Produk</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {freshProducts.map((p, index) => (
            <div 
              key={p.id} 
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-900 flex items-start gap-3 relative"
            >
              <img 
                src={p.image} 
                alt={p.name} 
                className="w-16 h-16 rounded-xl object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="space-y-1 flex-1 min-w-0">
                <span className="text-[9px] font-mono font-bold text-accent bg-accent/10 px-2 py-0.5 rounded-md">
                  {p.category}
                </span>
                <input
                  type="text"
                  value={p.name}
                  onChange={(e) => {
                    const updated = [...freshProducts];
                    updated[index].name = e.target.value;
                    setFreshProducts(updated);
                  }}
                  className="font-display text-xs font-bold text-slate-800 dark:text-slate-100 block w-full bg-transparent border-b border-transparent focus:border-slate-400 focus:outline-none"
                />
                <input
                  type="text"
                  value={p.description}
                  onChange={(e) => {
                    const updated = [...freshProducts];
                    updated[index].description = e.target.value;
                    setFreshProducts(updated);
                  }}
                  className="text-[10px] text-slate-500 dark:text-slate-400 block w-full bg-transparent border-b border-transparent focus:border-slate-400 focus:outline-none"
                />
              </div>
              <button
                onClick={() => handleDeleteProduct(p.id)}
                className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-500/5 transition-all self-start"
                title="Hapus Produk"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
