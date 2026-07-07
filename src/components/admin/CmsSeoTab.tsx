import React, { useState, useEffect } from 'react';
import { Globe, Save, Image as ImageIcon } from 'lucide-react';
import { useJagoFarm } from '../../context/JagoFarmContext';

interface CmsSeoTabProps {
  triggerSuccessToast: (msg: string) => void;
}

export default function CmsSeoTab({ triggerSuccessToast }: CmsSeoTabProps) {
  const {
    seoTitle, setSeoTitle,
    seoDescription, setSeoDescription,
    seoOgImage, setSeoOgImage,
    addActivityLog
  } = useJagoFarm();

  const [tempSeoTitle, setTempSeoTitle] = useState(seoTitle);
  const [tempSeoDescription, setTempSeoDescription] = useState(seoDescription);
  const [tempSeoOgImage, setTempSeoOgImage] = useState(seoOgImage);

  useEffect(() => {
    setTempSeoTitle(seoTitle);
    setTempSeoDescription(seoDescription);
    setTempSeoOgImage(seoOgImage);
  }, [seoTitle, seoDescription, seoOgImage]);

  const handleSaveSeo = () => {
    setSeoTitle(tempSeoTitle);
    setSeoDescription(tempSeoDescription);
    setSeoOgImage(tempSeoOgImage);
    triggerSuccessToast('Pengaturan SEO & OpenGraph berhasil diterapkan!');
    addActivityLog('Admin memperbarui konfigurasi SEO situs', 'admin');
  };

  return (
    <div id="tab-content-cms-seo" className="space-y-6">
      <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-900 rounded-3xl p-6 shadow-sm space-y-6 text-left">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <h3 className="font-display text-base font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Globe className="h-5 w-5 text-accent" />
              <span>SEO & Metadata Optimisation</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Sesuaikan metadata situs Anda untuk meningkatkan visibilitas mesin pencari dan penampilan berbagi tautan media sosial.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Input Form */}
          <div className="space-y-4">
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase font-mono tracking-wide">
                  Meta Title (Judul Situs)
                </label>
                <span className={`text-[10px] font-mono ${tempSeoTitle.length > 60 ? 'text-rose-500 font-bold' : 'text-slate-400'}`}>
                  {tempSeoTitle.length}/60 Karakter
                </span>
              </div>
              <input
                id="cms-seo-title"
                type="text"
                value={tempSeoTitle}
                onChange={(e) => setTempSeoTitle(e.target.value)}
                placeholder="JagoFarm - Smart Agriculture & Biofloc Circular Aquaculture"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-slate-100 focus:ring-1 focus:ring-accent focus:outline-none"
              />
              <p className="text-[10px] text-slate-400">Direkomendasikan di bawah 60 karakter agar tidak terpotong di Google.</p>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase font-mono tracking-wide">
                  Meta Description (Deskripsi Ringkas)
                </label>
                <span className={`text-[10px] font-mono ${tempSeoDescription.length > 160 ? 'text-rose-500 font-bold' : 'text-slate-400'}`}>
                  {tempSeoDescription.length}/160 Karakter
                </span>
              </div>
              <textarea
                id="cms-seo-desc"
                rows={4}
                value={tempSeoDescription}
                onChange={(e) => setTempSeoDescription(e.target.value)}
                placeholder="Tulis ringkasan konten situs JagoFarm..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-slate-100 focus:ring-1 focus:ring-accent focus:outline-none resize-none"
              />
              <p className="text-[10px] text-slate-400">Direkomendasikan antara 120-160 karakter agar deskripsi tampil utuh di pencarian.</p>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase font-mono tracking-wide">
                OpenGraph Image URL (Gambar Berbagi Sosial)
              </label>
              <input
                id="cms-seo-og-image"
                type="text"
                value={tempSeoOgImage}
                onChange={(e) => setTempSeoOgImage(e.target.value)}
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-slate-100 focus:ring-1 focus:ring-accent focus:outline-none"
              />
              <p className="text-[10px] text-slate-400 font-mono">Rasio terbaik 1200x630px untuk WhatsApp, LinkedIn, dan Facebook.</p>
            </div>

            <button
              id="btn-save-seo"
              onClick={handleSaveSeo}
              className="w-full py-3 bg-primary text-white hover:bg-accent hover:text-slate-950 dark:bg-accent dark:hover:bg-sky-300 dark:text-slate-900 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md shadow-accent/10"
            >
              <Save className="h-4 w-4" />
              <span>Terapkan Meta SEO & OpenGraph</span>
            </button>
          </div>

          {/* Right: Rich Preview Panels */}
          <div className="space-y-6 bg-slate-50 dark:bg-slate-950/40 p-5 rounded-2xl border border-slate-100 dark:border-slate-900">
            <div>
              <h4 className="text-[11px] font-black uppercase tracking-wider font-mono text-slate-400 mb-3 flex items-center gap-1.5">
                <span>🔍</span> Simulasi Hasil Google Search (Desktop)
              </h4>
              <div className="bg-white dark:bg-slate-900 p-4 border border-slate-200/60 dark:border-slate-800 rounded-xl space-y-1 shadow-sm text-left">
                <p className="text-[11px] text-slate-400 font-mono truncate">https://jagofarm.com</p>
                <h5 className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer truncate">
                  {tempSeoTitle || 'JagoFarm - Smart Agriculture & Biofloc Circular Aquaculture'}
                </h5>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 line-clamp-2">
                  {tempSeoDescription || 'Integrasi peternakan ayam broiler, budidaya maggot BSF, dan perikanan bioflok menggunakan IoT untuk menciptakan siklus pertanian nol limbah (zero waste).'}
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-[11px] font-black uppercase tracking-wider font-mono text-slate-400 mb-3 flex items-center gap-1.5">
                <span>📱</span> Simulasi Tampilan WhatsApp / Slack Share Link
              </h4>
              <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
                {tempSeoOgImage ? (
                  <div className="h-40 w-full overflow-hidden border-b border-slate-100 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 relative">
                    <img 
                      src={tempSeoOgImage} 
                      alt="OG Share Preview" 
                      className="w-full h-full object-cover" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ) : (
                  <div className="h-40 w-full flex flex-col items-center justify-center gap-1.5 bg-slate-100 dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800 text-slate-400">
                    <ImageIcon className="h-8 w-8 text-slate-300 dark:text-slate-700" />
                    <span className="text-[10px] font-mono">Belum ada gambar OG</span>
                  </div>
                )}
                <div className="p-3 bg-slate-50 dark:bg-slate-900 border-l-4 border-accent text-left space-y-1">
                  <p className="text-[9px] font-mono uppercase text-slate-400 tracking-wider">JAGOFARM.COM</p>
                  <h6 className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">
                    {tempSeoTitle || 'JagoFarm - Smart Agriculture & Biofloc Circular Aquaculture'}
                  </h6>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2">
                    {tempSeoDescription || 'Integrasi peternakan ayam broiler, budidaya maggot BSF, dan perikanan bioflok menggunakan IoT untuk menciptakan siklus pertanian nol limbah (zero waste).'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
