import React, { useState } from 'react';
import { Layers, Plus, Trash2 } from 'lucide-react';
import { useJagoFarm } from '../../context/JagoFarmContext';

interface CmsFaqTabProps {
  triggerSuccessToast: (msg: string) => void;
}

export default function CmsFaqTab({ triggerSuccessToast }: CmsFaqTabProps) {
  const { faqs, setFaqs, addActivityLog } = useJagoFarm();

  const [faqCategory, setFaqCategory] = useState('Sistem Sirkular');
  const [faqQuestion, setFaqQuestion] = useState('');
  const [faqAnswer, setFaqAnswer] = useState('');

  const handleAddFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!faqQuestion.trim() || !faqAnswer.trim()) return;

    const newFaq = {
      id: `faq-${Date.now()}`,
      category: faqCategory,
      question: faqQuestion.trim(),
      answer: faqAnswer.trim(),
      iconName: 'help'
    };

    setFaqs([...faqs, newFaq]);
    setFaqQuestion('');
    setFaqAnswer('');
    addActivityLog(`Admin menambahkan FAQ baru: "${newFaq.question.substring(0, 30)}..."`, 'admin');
    triggerSuccessToast('FAQ baru berhasil ditambahkan!');
  };

  const handleDeleteFaq = (id: string) => {
    setFaqs(faqs.filter(f => f.id !== id));
    addActivityLog('Admin menghapus FAQ', 'admin');
    triggerSuccessToast('FAQ berhasil dihapus.');
  };

  return (
    <div id="tab-content-cms-faq" className="space-y-6">
      <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-900 rounded-3xl p-5 text-left">
        <div className="flex items-center gap-2 mb-4 border-b border-slate-100 dark:border-slate-800 pb-3">
          <Layers className="h-4 w-4 text-accent" />
          <h3 className="font-display text-sm font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-100">
            Kelola Pertanyaan Umum (FAQ)
          </h3>
        </div>

        {/* Form to add FAQ */}
        <form onSubmit={handleAddFaq} className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-900 space-y-3 mb-4">
          <p className="text-[11px] font-bold text-slate-400 uppercase font-mono">Tambah Entri FAQ Baru</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[9px] font-mono uppercase text-slate-500 font-bold block mb-1">Kategori FAQ</label>
              <select
                value={faqCategory}
                onChange={(e) => setFaqCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-100 focus:outline-none"
              >
                <option>Sistem Sirkular</option>
                <option>Teknologi IoT</option>
                <option>Mitigasi Risiko</option>
                <option>Instalasi & Kustomisasi</option>
                <option>Pemesanan & Layanan</option>
              </select>
            </div>

            <div>
              <label className="text-[9px] font-mono uppercase text-slate-500 font-bold block mb-1">Pertanyaan</label>
              <input
                type="text"
                required
                value={faqQuestion}
                onChange={(e) => setFaqQuestion(e.target.value)}
                placeholder="Contoh: Apakah instalasinya bergaransi?"
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-100 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-[9px] font-mono uppercase text-slate-500 font-bold block mb-1">Jawaban Lengkap</label>
            <textarea
              rows={2}
              required
              value={faqAnswer}
              onChange={(e) => setFaqAnswer(e.target.value)}
              placeholder="Tuliskan penjelasan lengkap..."
              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-100 resize-none focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Tambahkan FAQ Baru</span>
          </button>
        </form>

        {/* List of active FAQs */}
        <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
          {faqs.map((f) => (
            <div 
              key={f.id} 
              className="p-3 rounded-xl border border-slate-200 dark:border-slate-900 bg-slate-50 dark:bg-slate-950/40 flex justify-between items-center text-xs"
            >
              <div className="space-y-1 pr-4">
                <div className="flex items-center gap-2">
                  <span className="text-[8px] uppercase tracking-wider bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-1.5 py-0.5 rounded font-mono font-bold">
                    {f.category}
                  </span>
                  <span className="font-extrabold text-slate-800 dark:text-slate-200">{f.question}</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">{f.answer}</p>
              </div>

              <button
                onClick={() => handleDeleteFaq(f.id)}
                className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-500/5 rounded-lg transition-all"
                title="Hapus FAQ"
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
