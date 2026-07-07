import React, { useState, useEffect } from 'react';
import { Sparkles, Save } from 'lucide-react';
import { useJagoFarm } from '../../context/JagoFarmContext';

interface CmsHeroTabProps {
  triggerSuccessToast: (msg: string) => void;
}

export default function CmsHeroTab({ triggerSuccessToast }: CmsHeroTabProps) {
  const {
    heroTitle, setHeroTitle,
    heroSubtitle, setHeroSubtitle,
    heroImageUrl, setHeroImageUrl,
    metricUptime, setMetricUptime,
    metricCircular, setMetricCircular,
    metricEfficiency, setMetricEfficiency,
    addActivityLog
  } = useJagoFarm();

  const [tempTitle, setTempTitle] = useState(heroTitle);
  const [tempSubtitle, setTempSubtitle] = useState(heroSubtitle);
  const [tempHeroImageUrl, setTempHeroImageUrl] = useState(heroImageUrl);
  const [tempUptime, setTempUptime] = useState(metricUptime);
  const [tempCircular, setTempCircular] = useState(metricCircular);
  const [tempEfficiency, setTempEfficiency] = useState(metricEfficiency);

  useEffect(() => {
    setTempTitle(heroTitle);
    setTempSubtitle(heroSubtitle);
    setTempHeroImageUrl(heroImageUrl);
    setTempUptime(metricUptime);
    setTempCircular(metricCircular);
    setTempEfficiency(metricEfficiency);
  }, [heroTitle, heroSubtitle, heroImageUrl, metricUptime, metricCircular, metricEfficiency]);

  const handleSaveHero = () => {
    setHeroTitle(tempTitle);
    setHeroSubtitle(tempSubtitle);
    setHeroImageUrl(tempHeroImageUrl);
    setMetricUptime(tempUptime);
    setMetricCircular(tempCircular);
    setMetricEfficiency(tempEfficiency);
    triggerSuccessToast('Hero Section & Landing Metrics berhasil diperbarui!');
    addActivityLog('Admin memperbarui konten Hero & landing metrics', 'admin', 'admin@jagofarm.com');
  };

  return (
    <div id="tab-content-cms-hero" className="space-y-6">
      <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-3xl p-5 text-left">
        <div className="flex items-center gap-2 mb-4 border-b border-slate-100 dark:border-slate-800 pb-3">
          <Sparkles className="h-4 w-4 text-accent" />
          <h3 className="font-display text-sm font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-100">
            Ubah Landing Page Hero & Metrics
          </h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase font-mono tracking-wide mb-1">
              Headline Hero (Judul Utama)
            </label>
            <input
              id="cms-hero-title"
              type="text"
              value={tempTitle}
              onChange={(e) => setTempTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase font-mono tracking-wide mb-1">
              Sub-Headline Hero (Deskripsi Singkat)
            </label>
            <textarea
              id="cms-hero-subtitle"
              rows={3}
              value={tempSubtitle}
              onChange={(e) => setTempSubtitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-accent resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase font-mono tracking-wide mb-1">
              Hero Image URL (Tinggalkan kosong untuk render Interactive 3D Simulation)
            </label>
            <input
              id="cms-hero-image-url"
              type="text"
              value={tempHeroImageUrl || ''}
              onChange={(e) => setTempHeroImageUrl(e.target.value)}
              placeholder="Contoh: https://images.unsplash.com/photo-1595273670150-db0a3e37d41a?auto=format..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-accent"
            />
            {tempHeroImageUrl && (
              <div className="mt-2.5 h-32 w-48 rounded-xl overflow-hidden border border-slate-200/60 relative group">
                <img 
                  src={tempHeroImageUrl} 
                  alt="Preview Hero" 
                  className="w-full h-full object-cover" 
                  referrerPolicy="no-referrer"
                />
                <button 
                  onClick={() => setTempHeroImageUrl('')}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors text-[9px] font-bold"
                  title="Hapus Image"
                >
                  Hapus
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase font-mono tracking-wide mb-1">
                Metric Sensor Uptime
              </label>
              <input
                id="cms-metric-uptime"
                type="text"
                value={tempUptime}
                onChange={(e) => setTempUptime(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-slate-100 focus:outline-none"
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase font-mono tracking-wide mb-1">
                Metric Waste/Circular
              </label>
              <input
                id="cms-metric-circular"
                type="text"
                value={tempCircular}
                onChange={(e) => setTempCircular(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-slate-100 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase font-mono tracking-wide mb-1">
                Metric Efisiensi Pakan
              </label>
              <input
                id="cms-metric-efficiency"
                type="text"
                value={tempEfficiency}
                onChange={(e) => setTempEfficiency(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-slate-100 focus:outline-none"
              />
            </div>
          </div>

          <button
            id="btn-save-hero-cms"
            onClick={handleSaveHero}
            className="w-full py-2.5 bg-primary text-white hover:bg-accent hover:text-slate-950 dark:bg-accent dark:hover:bg-sky-300 dark:text-slate-900 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <Save className="h-4 w-4" />
            <span>Terapkan Perubahan Hero & Landing Metrics</span>
          </button>
        </div>
      </div>
    </div>
  );
}
