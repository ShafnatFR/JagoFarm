import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, PhoneCall, HelpCircle, CheckCircle2 } from 'lucide-react';
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

    // Generate custom WhatsApp message
    const formattedMessage = `Halo JagoFarm! Saya *${name}* (${phone}). Saya tertarik dengan *${
      interest === 'Smart Farming IoT' ? 'Instalasi IoT Cerdas' : 'Hasil Panen Segar JagoFarm'
    }* untuk tipe lahan/farm *${farmType.toUpperCase()}*. %0A%0ACatatan tambahan: ${message || 'Mohon info konsultasi lebih lanjut.'}`;
    
    // Open WhatsApp after a small delay
    setTimeout(() => {
      window.open(`https://wa.me/628123456789?text=${formattedMessage}`, '_blank');
      onClose();
      // Reset form
      setName('');
      setPhone('');
      setInterest(initialInterest);
      setMessage('');
      setSubmitted(false);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="consultation-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            id="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-primary/85 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            id="modal-content"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-bg-white shadow-2xl"
          >
            {/* Header banner */}
            <div className="bg-gradient-to-r from-primary to-accent p-6 text-bg-white">
              <button
                id="close-modal-btn"
                onClick={onClose}
                className="absolute top-4 right-4 rounded-full bg-bg-white/10 p-1.5 text-bg-white hover:bg-bg-white/20 transition-colors"
                aria-label="Tutup modal"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-bg-white/10 p-2">
                  <PhoneCall className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold">Konsultasi JagoFarm</h3>
                  <p className="text-sm text-secondary/80">Diskusikan kebutuhan agrikultur & IoT pintar Anda</p>
                </div>
              </div>
            </div>

            {/* Content / Form */}
            <div className="p-6">
              {submitted ? (
                <motion.div
                  id="success-message"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-8 text-center"
                >
                  <CheckCircle2 className="h-16 w-16 text-accent mb-4 animate-bounce" />
                  <h4 className="font-display text-lg font-bold text-primary">Permintaan Terkirim!</h4>
                  <p className="text-sm text-slate-500 mt-2 max-w-sm">
                    Menghubungkan ke WhatsApp Customer Service JagoFarm untuk memulai sesi konsultasi gratis Anda...
                  </p>
                </motion.div>
              ) : (
                <form id="consultation-form" onSubmit={handleSubmit} className="space-y-4">
                  {/* Name Input */}
                  <div>
                    <label className="block text-xs font-semibold text-primary uppercase tracking-wider mb-1">
                      Nama Lengkap <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="input-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Masukkan nama lengkap Anda"
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-primary placeholder-slate-400 outline-none focus:border-accent focus:bg-bg-white transition-all shadow-inner shadow-secondary/20"
                    />
                  </div>

                  {/* Phone Input */}
                  <div>
                    <label className="block text-xs font-semibold text-primary uppercase tracking-wider mb-1">
                      No. WhatsApp / Telepon <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="input-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Contoh: 08123456789"
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-primary placeholder-slate-400 outline-none focus:border-accent focus:bg-bg-white transition-all shadow-inner shadow-secondary/20"
                    />
                  </div>

                  {/* Division selector */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-primary uppercase tracking-wider mb-1">
                        Kategori Minat
                      </label>
                      <select
                        id="select-interest"
                        value={interest}
                        onChange={(e) => setInterest(e.target.value)}
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-primary outline-none focus:border-accent focus:bg-bg-white transition-all shadow-inner shadow-secondary/20"
                      >
                        <option value="Smart Farming IoT">Instalasi Smart IoT</option>
                        <option value="Hasil Panen Segar">Hasil Panen Segar</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-primary uppercase tracking-wider mb-1">
                        Tipe Operasi Farm
                      </label>
                      <select
                        id="select-farm-type"
                        value={farmType}
                        onChange={(e) => setFarmType(e.target.value)}
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-primary outline-none focus:border-accent focus:bg-bg-white transition-all shadow-inner shadow-secondary/20"
                      >
                        <option value="perikanan">Perikanan (Fish)</option>
                        <option value="peternakan">Peternakan Ayam</option>
                        <option value="hortikultura">Melon / Semangka</option>
                        <option value="mixed">Sirkular Terintegrasi</option>
                      </select>
                    </div>
                  </div>

                  {/* Message Input */}
                  <div>
                    <label className="block text-xs font-semibold text-primary uppercase tracking-wider mb-1">
                      Pesan atau Kebutuhan Spesifik
                    </label>
                    <textarea
                      id="textarea-message"
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Jelaskan secara singkat jenis lahan, luas, atau hasil panen yang ingin Anda beli..."
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-primary placeholder-slate-400 outline-none focus:border-accent focus:bg-bg-white transition-all shadow-inner shadow-secondary/20 resize-none"
                    />
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex gap-3 pt-2">
                    <button
                      id="cancel-consultation-btn"
                      type="button"
                      onClick={onClose}
                      className="flex-1 rounded-lg border border-slate-200 py-2.5 text-sm font-semibold text-slate-500 hover:bg-slate-50 hover:text-primary transition-colors text-center"
                    >
                      Batal
                    </button>
                    <button
                      id="submit-consultation-btn"
                      type="submit"
                      className="flex-2 flex items-center justify-center gap-2 rounded-lg bg-accent py-2.5 px-4 text-sm font-semibold text-bg-white hover:bg-accent-hover active:scale-[0.98] transition-all"
                    >
                      <span>Kirim ke WhatsApp</span>
                      <Send className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Free advice reminder */}
                  <div className="flex items-center gap-2 rounded-lg bg-secondary/60 p-3 text-[11px] text-slate-600">
                    <HelpCircle className="h-4 w-4 flex-shrink-0 text-accent" />
                    <span>Layanan konsultasi awal ini gratis 100%. Tim teknisi lapangan kami akan menghubungi Anda dalam 1x24 jam.</span>
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
