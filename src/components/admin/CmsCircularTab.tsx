import React, { useState, useEffect } from 'react';
import { Layers, Save } from 'lucide-react';
import { useJagoFarm } from '../../context/JagoFarmContext';

interface CmsCircularTabProps {
  triggerSuccessToast: (msg: string) => void;
}

export default function CmsCircularTab({ triggerSuccessToast }: CmsCircularTabProps) {
  const {
    circularTitle, setCircularTitle,
    circularSubtitle, setCircularSubtitle,
    circularStages, setCircularStages,
    addActivityLog
  } = useJagoFarm();

  const [tempCircularTitle, setTempCircularTitle] = useState(circularTitle);
  const [tempCircularSubtitle, setTempCircularSubtitle] = useState(circularSubtitle);
  const [tempCircularStages, setTempCircularStages] = useState(circularStages);
  const [editingStageId, setEditingStageId] = useState<string>('maggot');

  useEffect(() => {
    setTempCircularTitle(circularTitle);
    setTempCircularSubtitle(circularSubtitle);
    setTempCircularStages(circularStages);
  }, [circularTitle, circularSubtitle, circularStages]);

  const handleSaveCircular = () => {
    setCircularTitle(tempCircularTitle);
    setCircularSubtitle(tempCircularSubtitle);
    setCircularStages(tempCircularStages);
    triggerSuccessToast('Siklus Melingkar (Circular Economy) berhasil diperbarui!');
    addActivityLog('Admin memperbarui konten Circular Economy & Siklus Tahapan', 'admin', 'admin@jagofarm.com');
  };

  return (
    <div id="tab-content-cms-circular" className="space-y-6">
      <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-3xl p-5 text-left">
        <div className="flex items-center gap-2 mb-4 border-b border-slate-100 dark:border-slate-800 pb-3">
          <Layers className="h-4 w-4 text-accent" />
          <h3 className="font-display text-sm font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-100">
            Ubah Siklus Melingkar (Circular Economy)
          </h3>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase font-mono tracking-wide mb-1">
                Judul Section Circular Economy
              </label>
              <input
                type="text"
                value={tempCircularTitle}
                onChange={(e) => setTempCircularTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase font-mono tracking-wide mb-1">
                Sub-Judul Section
              </label>
              <input
                type="text"
                value={tempCircularSubtitle}
                onChange={(e) => setTempCircularSubtitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:outline-none"
              />
            </div>
          </div>

          {/* Stage Selector Grid */}
          <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase font-mono tracking-wide mb-2">
              Pilih Sektor / Tahapan Siklus untuk Diedit (Real-time CRUD)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {tempCircularStages.map((stage) => (
                <button
                  key={stage.id}
                  onClick={() => setEditingStageId(stage.id)}
                  className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                    editingStageId === stage.id
                      ? 'bg-accent/10 border-accent text-slate-900 dark:text-slate-100 font-extrabold'
                      : 'bg-slate-50 dark:bg-slate-950 border-slate-200/80 dark:border-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-xl">{stage.emoji}</span>
                  <div className="min-w-0">
                    <p className="text-xs truncate">{stage.name}</p>
                    <p className="text-[9px] text-slate-400 font-mono">Stage ID: {stage.id}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Editing Stage Form Block */}
          {tempCircularStages.find(s => s.id === editingStageId) && (() => {
            const currentEditingStage = tempCircularStages.find(s => s.id === editingStageId)!;
            return (
              <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-900 space-y-3">
                <p className="text-xs font-bold text-accent uppercase font-mono">
                  Mengedit Tahap: {currentEditingStage.name} ({currentEditingStage.emoji})
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Nama Tahapan</label>
                    <input
                      type="text"
                      value={currentEditingStage.name}
                      onChange={(e) => {
                        setTempCircularStages(prev => prev.map(s => s.id === editingStageId ? { ...s, name: e.target.value } : s));
                      }}
                      className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-slate-100"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Emoji Icon</label>
                    <input
                      type="text"
                      value={currentEditingStage.emoji}
                      onChange={(e) => {
                        setTempCircularStages(prev => prev.map(s => s.id === editingStageId ? { ...s, emoji: e.target.value } : s));
                      }}
                      className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-slate-100"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Image URL Tahap</label>
                    <input
                      type="text"
                      value={currentEditingStage.imageUrl || ''}
                      onChange={(e) => {
                        setTempCircularStages(prev => prev.map(s => s.id === editingStageId ? { ...s, imageUrl: e.target.value } : s));
                      }}
                      placeholder="https://unsplash..."
                      className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-slate-100"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Input Ekosistem</label>
                    <input
                      type="text"
                      value={currentEditingStage.input}
                      onChange={(e) => {
                        setTempCircularStages(prev => prev.map(s => s.id === editingStageId ? { ...s, input: e.target.value } : s));
                      }}
                      className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-slate-100"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Output Bernilai</label>
                    <input
                      type="text"
                      value={currentEditingStage.output}
                      onChange={(e) => {
                        setTempCircularStages(prev => prev.map(s => s.id === editingStageId ? { ...s, output: e.target.value } : s));
                      }}
                      className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-slate-100"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Dampak Efisiensi / Sustainability</label>
                    <input
                      type="text"
                      value={currentEditingStage.efficiency}
                      onChange={(e) => {
                        setTempCircularStages(prev => prev.map(s => s.id === editingStageId ? { ...s, efficiency: e.target.value } : s));
                      }}
                      className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-slate-100"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Deskripsi Singkat</label>
                    <input
                      type="text"
                      value={currentEditingStage.description}
                      onChange={(e) => {
                        setTempCircularStages(prev => prev.map(s => s.id === editingStageId ? { ...s, description: e.target.value } : s));
                      }}
                      className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-slate-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase block">Detail Narasi Aliran Energi</label>
                  <textarea
                    rows={2}
                    value={currentEditingStage.details}
                    onChange={(e) => {
                      setTempCircularStages(prev => prev.map(s => s.id === editingStageId ? { ...s, details: e.target.value } : s));
                    }}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-slate-100 resize-none font-sans"
                  />
                </div>

                {currentEditingStage.imageUrl && (
                  <div className="h-28 w-44 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 mt-2">
                    <img src={currentEditingStage.imageUrl} alt="Stage Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                )}
              </div>
            );
          })()}

          <button
            id="btn-save-circular-cms"
            onClick={handleSaveCircular}
            className="w-full py-2.5 bg-primary text-white hover:bg-accent hover:text-slate-950 dark:bg-accent dark:hover:bg-sky-300 dark:text-slate-900 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <Save className="h-4 w-4" />
            <span>Simpan Seluruh Perubahan Circular Economy</span>
          </button>
        </div>
      </div>
    </div>
  );
}
