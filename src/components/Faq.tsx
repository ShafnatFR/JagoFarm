import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, Cpu, Sprout, Landmark, Zap } from 'lucide-react';
import { useJagoFarm } from '../context/JagoFarmContext';

interface FaqItem {
  question: string;
  answer: string;
  icon: React.ReactNode;
  category: string;
  theme: {
    bgNormal: string;
    bgOpen: string;
    iconBg: string;
    badge: string;
  };
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { faqs } = useJagoFarm();

  const getFaqTheme = (category: string) => {
    switch (category) {
      case 'Sistem Sirkular':
        return {
          icon: <Sprout className="h-5 w-5" />,
          bgNormal: 'bg-emerald-50/40 hover:bg-emerald-50/70 border-emerald-100/80 dark:bg-emerald-950/10 dark:border-emerald-900/50 dark:hover:border-emerald-800/80',
          bgOpen: 'bg-emerald-50/90 border-emerald-400 dark:bg-emerald-950/30 dark:border-emerald-500 shadow-md shadow-emerald-500/5',
          iconBg: 'bg-emerald-100/60 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400',
          badge: 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900/50'
        };
      case 'Teknologi IoT':
        return {
          icon: <Cpu className="h-5 w-5" />,
          bgNormal: 'bg-sky-50/40 hover:bg-sky-50/70 border-sky-100/80 dark:bg-sky-950/10 dark:border-sky-900/50 dark:hover:border-sky-800/80',
          bgOpen: 'bg-sky-50/90 border-sky-400 dark:bg-sky-950/30 dark:border-sky-500 shadow-md shadow-sky-500/5',
          iconBg: 'bg-sky-100/60 dark:bg-sky-950/80 text-sky-600 dark:text-sky-400',
          badge: 'bg-sky-100 text-sky-900 dark:bg-sky-950 dark:text-sky-300 border-sky-200 dark:border-sky-900/50'
        };
      case 'Mitigasi Risiko':
        return {
          icon: <Zap className="h-5 w-5" />,
          bgNormal: 'bg-amber-50/40 hover:bg-amber-50/70 border-amber-100/80 dark:bg-amber-950/10 dark:border-amber-900/50 dark:hover:border-amber-800/80',
          bgOpen: 'bg-amber-50/90 border-amber-400 dark:bg-amber-950/30 dark:border-amber-500 shadow-md shadow-amber-500/5',
          iconBg: 'bg-amber-100/60 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400',
          badge: 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 border-amber-200 dark:border-amber-900/50'
        };
      case 'Instalasi & Kustomisasi':
        return {
          icon: <Landmark className="h-5 w-5" />,
          bgNormal: 'bg-purple-50/40 hover:bg-purple-50/70 border-purple-100/80 dark:bg-purple-950/10 dark:border-purple-900/50 dark:hover:border-purple-800/80',
          bgOpen: 'bg-purple-50/90 border-purple-400 dark:bg-purple-950/30 dark:border-purple-500 shadow-md shadow-purple-500/5',
          iconBg: 'bg-purple-100/60 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400',
          badge: 'bg-purple-100 text-purple-900 dark:bg-purple-950 dark:text-purple-300 border-purple-200 dark:border-purple-900/50'
        };
      default:
        return {
          icon: <HelpCircle className="h-5 w-5" />,
          bgNormal: 'bg-rose-50/40 hover:bg-rose-50/70 border-rose-100/80 dark:bg-rose-950/10 dark:border-rose-900/50 dark:hover:border-rose-800/80',
          bgOpen: 'bg-rose-50/90 border-rose-400 dark:bg-rose-950/30 dark:border-rose-500 shadow-md shadow-rose-500/5',
          iconBg: 'bg-rose-100/60 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400',
          badge: 'bg-rose-100 text-rose-900 dark:bg-rose-950 dark:text-rose-300 border-rose-200 dark:border-rose-900/50'
        };
    }
  };

  const faqData: FaqItem[] = faqs.map(f => {
    const themeInfo = getFaqTheme(f.category);
    return {
      category: f.category,
      question: f.question,
      answer: f.answer,
      icon: themeInfo.icon,
      theme: {
        bgNormal: themeInfo.bgNormal,
        bgOpen: themeInfo.bgOpen,
        iconBg: themeInfo.iconBg,
        badge: themeInfo.badge
      }
    };
  });

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq-section" className="py-24 bg-bg-white border-t border-secondary/30 relative overflow-hidden transition-all duration-300">
      {/* Background Decorative Circles */}
      <div className="absolute top-1/4 -left-64 w-96 h-96 rounded-full bg-accent/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-64 w-96 h-96 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-wider text-accent uppercase bg-secondary px-3 py-1.5 rounded-full border border-secondary/50">
            Pertanyaan Umum (FAQ)
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-primary mt-4 tracking-tight">
            Memahami Ekosistem Pertanian Pintar & Sirkular
          </h2>
          <p className="text-sm text-slate-500 mt-3 leading-relaxed">
            Temukan jawaban lengkap seputar integrasi sirkular, fitur pemantauan berbasis IoT cerdas, dan cara mengadopsi teknologi JagoFarm di lokasi Anda.
          </p>
        </div>

        {/* 2-Column Responsive Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;
            const isLast = index === faqData.length - 1;
            return (
              <div
                key={index}
                id={`faq-item-${index}`}
                className={`group rounded-2xl border transition-all duration-300 h-fit ${
                  isOpen ? item.theme.bgOpen : item.theme.bgNormal
                } ${isLast ? 'md:col-span-2' : ''}`}
              >
                {/* Accordion Trigger Header */}
                <button
                  type="button"
                  onClick={() => handleToggle(index)}
                  className="w-full flex items-center justify-between p-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-2xl cursor-pointer"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <div className="flex items-start gap-4">
                    {/* Dynamic color-specific icon container */}
                    <div className={`p-2 border rounded-xl shadow-xs group-hover:scale-110 transition-transform duration-300 shrink-0 ${
                      isOpen ? 'bg-bg-white dark:bg-slate-900 border-accent/20' : 'border-secondary'
                    } ${item.theme.iconBg}`}>
                      {item.icon}
                    </div>
                    <div className="space-y-1.5">
                      <span className={`text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${item.theme.badge}`}>
                        {item.category}
                      </span>
                      {/* Font color is set strictly to black/deep-slate in light theme instead of gray */}
                      <h3 className="font-display text-sm sm:text-base font-extrabold text-slate-950 dark:text-slate-50 leading-snug">
                        {item.question}
                      </h3>
                    </div>
                  </div>

                  {/* Arrow toggle */}
                  <div className={`p-1.5 rounded-lg border border-secondary bg-bg-white text-slate-950 dark:text-slate-200 transition-all duration-300 ml-4 shrink-0 ${
                    isOpen ? 'rotate-180 border-accent/20 text-accent bg-accent/5' : ''
                  }`}>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                {/* Accordion Content Panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      {/* Font color is set strictly to solid dark black/slate-950 in light theme and slate-50 in dark theme */}
                      <div className="px-5 pb-5 pt-1 pl-[68px] text-xs sm:text-sm text-slate-950 dark:text-slate-100 leading-relaxed font-bold">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
