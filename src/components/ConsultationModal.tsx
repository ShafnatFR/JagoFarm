import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Send, PhoneCall, HelpCircle, CheckCircle2, 
  Cpu, Leaf, Sparkles, Check, Info, ShieldCheck, Sprout
} from 'lucide-react';
import { useJagoFarm } from '../context/JagoFarmContext';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialInterest?: string;
}

export default function ConsultationModal({ isOpen, onClose, initialInterest = 'Smart Farming IoT' }: ConsultationModalProps) {
  const { addLead } = useJagoFarm();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [farmType, setFarmType] = useState('mixed');
  const [interest, setInterest] = useState(initialInterest);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    // Add lead to centralized context
    addLead({
      name,
      phone,
      farmType,
      interest,
      message
    });

    // Simulate form submission
    setSubmitted(true);

    // Get dynamic options based on current interest
    const currentFarmOptions = interest === 'Smart Farming IoT'
      ? [
          { id: 'perikanan', label: 'Perikanan Bioflok', emoji: '🐟' },
          { id: 'peternakan', label: 'Broiler Pintar', emoji: '🐔' },
          { id: 'hortikultura', label: 'Greenhouse Melon', emoji: '🍈' },
          { id: 'mixed', label: 'Sirkular Terintegrasi', emoji: '🔄' },
        ]
      : [
          { id: 'melon', label: 'Melon Sirkular', emoji: '🍈' },
          { id: 'ikan', label: 'Ikan Nila Segar', emoji: '🐟' },
          { id: 'maggot', label: 'Maggot Fresh BSF', emoji: '🐛' },
          { id: 'grosir', label: 'Kemitraan Grosir', emoji: '📦' },
        ];

    const selectedFarmTypeObj = currentFarmOptions.find(o => o.id === farmType) || currentFarmOptions[0];
    const farmTypeLabel = selectedFarmTypeObj ? selectedFarmTypeObj.label : farmType;

    // Generate custom WhatsApp message
    const formattedMessage = `Halo JagoFarm! Saya *${name}* (${phone}). Saya tertarik dengan *${
      interest === 'Smart Farming IoT' ? 'Instalasi IoT Cerdas' : 'Hasil Panen Segar JagoFarm'
    }* untuk kategori *${farmTypeLabel}*. %0A%0ACatatan tambahan: ${message || 'Mohon info konsultasi lebih lanjut.'}`;
    
    // Open WhatsApp after a small delay
    setTimeout(() => {
      window.open(`https://wa.me/628123456789?text=${formattedMessage}`, '_blank');
      onClose();
      // Reset form
      setName('');
      setPhone('');
      setInterest(initialInterest);
      setFarmType(initialInterest === 'Smart Farming IoT' ? 'mixed' : 'melon');
      setMessage('');
      setSubmitted(false);
    }, 1800);
  };

  const interestOptions = [
    {
      id: 'Smart Farming IoT',
      title: 'Instalasi Smart IoT',
      description: 'Sensor telemetri, otomatisasi pakan, & bioflok pintar.',
      icon: <Cpu className="h-4.5 w-4.5" />
    },
    {
      id: 'Hasil Panen Segar',
      title: 'Hasil Panen Segar',
      description: 'Katalog grosir ikan nila, melon sirkular, & maggot.',
      icon: <Leaf className="h-4.5 w-4.5" />
    }
  ];

  const getDynamicFarmTypeOptions = () => {
    if (interest === 'Smart Farming IoT') {
      return [
        { id: 'perikanan', label: 'Perikanan Bioflok', emoji: '🐟' },
        { id: 'peternakan', label: 'Broiler Pintar', emoji: '🐔' },
        { id: 'hortikultura', label: 'Greenhouse Melon', emoji: '🍈' },
        { id: 'mixed', label: 'Sirkular Terintegrasi', emoji: '🔄' },
      ];
    } else {
      return [
        { id: 'melon', label: 'Melon Sirkular', emoji: '🍈' },
        { id: 'ikan', label: 'Ikan Nila Segar', emoji: '🐟' },
        { id: 'maggot', label: 'Maggot Fresh BSF', emoji: '🐛' },
        { id: 'grosir', label: 'Kemitraan Grosir', emoji: '📦' },
      ];
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="consultation-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            id="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            id="modal-content"
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="relative w-full max-w-xl sm:max-w-2xl max-h-[calc(100vh-2rem)] sm:max-h-[90vh] flex flex-col overflow-hidden rounded-3xl bg-bg-white border border-slate-200 dark:border-slate-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4)]"
          >
            {/* Header banner */}
            <div className="relative overflow-hidden bg-gradient-to-br from-[#0B1E36] via-[#0F2A4A] to-[#1E3A8A] pt-8 pb-6 px-5 sm:p-8 text-white border-b border-slate-100/10 dark:border-slate-800/20 text-left">
              {/* Abstract decorative ambient blobs */}
              <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-accent/20 blur-3xl" />
              <div className="absolute -left-10 -bottom-10 h-28 w-28 rounded-full bg-emerald-500/10 blur-2xl" />
              
              <button
                id="close-modal-btn"
                onClick={onClose}
                className="absolute top-4 right-4 rounded-full bg-white/10 p-2 text-white/80 hover:text-white hover:bg-white/20 transition-all cursor-pointer z-10 hover:rotate-90 duration-200"
                aria-label="Tutup modal"
              >
                <X className="h-4.5 w-4.5" />
              </button>
              
              <div className="relative flex items-start gap-4 z-10">
                <div className="rounded-2xl bg-gradient-to-br from-accent/25 to-accent/40 p-3 border border-accent/30 shadow-lg shadow-accent/10 shrink-0 mt-1">
                  <PhoneCall className="h-6 w-6 text-accent" />
                </div>
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1 text-[9px] font-mono font-black uppercase tracking-widest bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full shadow-xs">
                      <Sparkles className="h-2.5 w-2.5 animate-pulse" />
                      <span>Free Consultation</span>
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] text-slate-300 font-mono">
                      • Respon Cepat 1x24 Jam
                    </span>
                  </div>
                  <h3 className="font-display text-lg sm:text-xl font-extrabold tracking-tight text-white leading-tight">
                    Hubungi Teknisi & Ahli Agronomis JagoFarm
                  </h3>
                  <p className="text-xs text-slate-300/90 leading-relaxed font-sans max-w-md">
                    Diskusikan perencanaan instalasi IoT otomatisasi atau kemitraan wholesale produk sirkular bebas limbah.
                  </p>
                </div>
              </div>
            </div>

            {/* Content / Form */}
            <div className="p-6 sm:p-8 text-left bg-bg-white dark:bg-slate-900 flex-1 overflow-y-auto">
              {submitted ? (
                <motion.div
                  id="success-message"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-10 text-center space-y-4"
                >
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-xl animate-pulse" />
                    <CheckCircle2 className="h-20 w-20 text-emerald-500 relative z-10 animate-bounce" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-display text-xl font-black text-primary">Permintaan Berhasil Terkirim!</h4>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                      Terima kasih <strong className="text-primary">{name}</strong>. Tim operasional JagoFarm telah mendaftarkan pengajuan konsultasi Anda.
                    </p>
                    <p className="text-xs text-accent font-semibold flex items-center justify-center gap-1.5 animate-pulse">
                      <span>Menghubungkan ke WhatsApp Customer Service...</span>
                    </p>
                  </div>
                </motion.div>
              ) : (
                <form id="consultation-form" onSubmit={handleSubmit} className="space-y-5">
                  
                  {/* Grid fields: Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name Input */}
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        Nama Lengkap Anda <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative group">
                        <div className="absolute left-3 top-2.5 text-slate-400 group-focus-within:text-accent transition-colors">
                          <span className="text-xs font-mono">👤</span>
                        </div>
                        <input
                          id="input-name"
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Masukkan nama lengkap Anda"
                          className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-bg-white dark:bg-slate-900/50 pl-9 pr-3 py-2.5 text-xs sm:text-sm text-primary dark:text-slate-100 placeholder-slate-400 outline-none focus:ring-1 focus:ring-accent focus:border-accent focus:bg-bg-white transition-all shadow-xs"
                        />
                      </div>
                    </div>

                    {/* Phone Input */}
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        Nomor WhatsApp / HP <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative group">
                        <div className="absolute left-3 top-2.5 text-slate-400 group-focus-within:text-accent transition-colors">
                          <span className="text-xs font-mono">📞</span>
                        </div>
                        <input
                          id="input-phone"
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Contoh: 08123456789"
                          className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-bg-white dark:bg-slate-900/50 pl-9 pr-3 py-2.5 text-xs sm:text-sm text-primary dark:text-slate-100 placeholder-slate-400 outline-none focus:ring-1 focus:ring-accent focus:border-accent focus:bg-bg-white transition-all shadow-xs"
                        />
                      </div>
                    </div>
                  </div>

                  {/* CUSTOM INTERACTIVE SELECTOR for Kategori Minat */}
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Layanan / Kategori Ketertarikan Anda
                    </label>
                    <div className="flex flex-col gap-3">
                      {interestOptions.map((option) => {
                        const isSelected = interest === option.id;
                        return (
                          <button
                            key={option.id}
                            type="button"
                            onClick={() => {
                              setInterest(option.id);
                              // Auto-set farmType to the first appropriate option
                              if (option.id === 'Smart Farming IoT') {
                                setFarmType('mixed');
                              } else {
                                setFarmType('melon');
                              }
                            }}
                            className={`p-3.5 rounded-2xl border text-left transition-all flex items-start gap-3 cursor-pointer group relative ${
                              isSelected 
                                ? 'bg-accent/10 border-accent shadow-md shadow-accent/5' 
                                : 'bg-bg-white dark:bg-slate-900/40 border-slate-200 dark:border-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                            }`}
                          >
                            <div className={`p-2 rounded-xl shrink-0 transition-colors ${
                              isSelected 
                                ? 'bg-accent text-white' 
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-slate-200'
                            }`}>
                              {option.icon}
                            </div>
                            <div className="space-y-0.5 min-w-0 pr-4">
                              <h5 className={`text-xs font-extrabold transition-colors ${
                                isSelected ? 'text-accent dark:text-sky-400' : 'text-primary dark:text-slate-200'
                              }`}>
                                {option.title}
                              </h5>
                              <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed">
                                {option.description}
                              </p>
                            </div>
                            {isSelected && (
                              <div className="absolute top-3.5 right-3.5 h-4 w-4 bg-accent text-white rounded-full flex items-center justify-center">
                                <Check className="h-2.5 w-2.5 stroke-[3]" />
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* CUSTOM INTERACTIVE TILE SELECTOR for Farm Type */}
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Tipe Operasi Lahan Anda / Fokus Kategori
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {getDynamicFarmTypeOptions().map((type) => {
                        const isSelected = farmType === type.id;
                        return (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() => setFarmType(type.id)}
                            className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 relative ${
                              isSelected
                                ? 'bg-accent/10 border-accent font-extrabold text-accent dark:text-sky-400'
                                : 'bg-bg-white dark:bg-slate-900/40 border-slate-200 dark:border-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400'
                            }`}
                          >
                            <span className="text-xl sm:text-2xl filter drop-shadow-sm">{type.emoji}</span>
                            <span className="text-[10px] font-bold whitespace-nowrap tracking-tight">
                              {type.label}
                            </span>
                            {isSelected && (
                              <div className="absolute top-1.5 right-1.5 h-3 w-3 bg-accent text-white rounded-full flex items-center justify-center">
                                <Check className="h-2 w-2 stroke-[4]" />
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Catatan Tambahan / Deskripsi Kebutuhan
                    </label>
                    <textarea
                      id="textarea-message"
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Contoh: Luas kolam bioflok saya 10m2, butuh info harga paket sensor & AutoFeeder lengkap..."
                      className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-bg-white dark:bg-slate-900/50 px-3.5 py-2.5 text-xs sm:text-sm text-primary dark:text-slate-100 placeholder-slate-400 outline-none focus:ring-1 focus:ring-accent focus:border-accent focus:bg-bg-white transition-all shadow-xs resize-none min-h-[100px]"
                    />
                  </div>

                  {/* Free advice reminder & trust element */}
                  <div className="flex items-start gap-3 rounded-2xl bg-sky-500/10 border border-sky-500/15 p-3 text-[11.5px] text-sky-800 dark:text-sky-300">
                    <Info className="h-4.5 w-4.5 flex-shrink-0 text-accent mt-0.5" />
                    <div className="space-y-0.5">
                      <span className="font-extrabold block">Bebas Biaya Awal & Transparan:</span>
                      <p className="text-slate-600 dark:text-slate-400 text-[10.5px] leading-relaxed">
                        Konsultasi awal 100% gratis tanpa komitmen apa pun. Teknisi kami akan membantu melakukan kalkulasi kebutuhan sirkular optimal untuk lahan Anda.
                      </p>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-1 border-t border-slate-200/50 dark:border-slate-800/40">
                    <button
                      id="cancel-consultation-btn"
                      type="button"
                      onClick={onClose}
                      className="w-full sm:w-1/3 rounded-xl border border-slate-200 dark:border-slate-800 py-2.5 text-xs font-bold text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-primary dark:hover:text-white transition-all text-center cursor-pointer order-2 sm:order-1"
                    >
                      Batal
                    </button>
                    <button
                      id="submit-consultation-btn"
                      type="submit"
                      className="w-full sm:w-2/3 flex items-center justify-center gap-2 rounded-xl bg-accent hover:bg-accent-hover text-white py-2.5 px-4 text-xs font-bold active:scale-[0.98] transition-all cursor-pointer order-1 sm:order-2 shadow-lg shadow-accent/10 hover:shadow-accent/25"
                    >
                      <span>Kirim Formulir & Buka Sesi WhatsApp</span>
                      <Send className="h-3.5 w-3.5" />
                    </button>
                  </div>

                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

