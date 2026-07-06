import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sprout, Cpu, ArrowUpRight, ShieldCheck, HeartPulse, Sparkles, Droplets, Thermometer, Radio } from 'lucide-react';

interface HeroProps {
  onOpenConsultation: (interest?: string) => void;
  onScrollToProducts: () => void;
}

export default function Hero({ onOpenConsultation, onScrollToProducts }: HeroProps) {
  // Simulated real-time metrics for the interactive farm card
  const [waterTemp, setWaterTemp] = useState(26.4);
  const [oxygen, setOxygen] = useState(6.2);
  const [ph, setPh] = useState(7.1);

  useEffect(() => {
    const interval = setInterval(() => {
      setWaterTemp(prev => parseFloat((prev + (Math.random() * 0.2 - 0.1)).toFixed(1)));
      setOxygen(prev => {
        const next = prev + (Math.random() * 0.1 - 0.05);
        return parseFloat(Math.max(5.5, Math.min(7.5, next)).toFixed(1));
      });
      setPh(prev => {
        const next = prev + (Math.random() * 0.04 - 0.02);
        return parseFloat(Math.max(6.8, Math.min(7.4, next)).toFixed(2));
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-20 bg-bg-white overflow-hidden flex items-center"
    >
      {/* Light Blue subtle gradient overlays for ambient depth */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-secondary/50 via-secondary/20 to-transparent pointer-events-none" />
      <div className="absolute -top-[40%] -left-[20%] w-[80%] h-[80%] rounded-full bg-secondary/30 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-[30%] -right-[10%] w-[60%] h-[60%] rounded-full bg-accent/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline and CTAs */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            {/* Agritech Innovator Tag */}
            <motion.div
              id="hero-tag"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 border border-accent/25"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              <span className="text-xs font-mono font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
                <Sprout className="h-3.5 w-3.5 text-accent" />
                #1 Pelopor Sirkular Agrikultur & IoT B2B
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4"
            >
              <h1 id="hero-headline" className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-primary tracking-tight leading-tight">
                Revolusi Agrikultur <br />
                <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                  Cerdas & Sirkular
                </span>
              </h1>
              <p id="hero-subheadline" className="text-lg text-slate-600 max-w-xl leading-relaxed">
                JagoFarm mengintegrasikan budidaya presisi (ikan, ayam, melon) dengan sistem otomasi IoT modular B2B. Zero waste, produktivitas maksimal, dan ketertelusuran penuh.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button
                id="cta-hero-primary"
                onClick={() => onOpenConsultation('Smart Farming IoT')}
                className="flex items-center justify-center gap-2 rounded-full bg-primary hover:bg-accent text-bg-white py-4 px-8 text-base font-bold shadow-lg shadow-primary/10 hover:shadow-accent/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Cpu className="h-5 w-5" />
                <span>Bangun Smart Farm</span>
              </button>
              
              <button
                id="cta-hero-secondary"
                onClick={onScrollToProducts}
                className="flex items-center justify-center gap-2 rounded-full bg-bg-white border-2 border-secondary hover:border-accent text-primary hover:text-accent py-4 px-8 text-base font-bold shadow-xs hover:shadow-md active:scale-[0.98] transition-all"
              >
                <span>Beli Hasil Panen</span>
                <ArrowUpRight className="h-5 w-5" />
              </button>
            </motion.div>

            {/* Trust Metrics */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="pt-6 border-t border-secondary/60 grid grid-cols-3 gap-6"
            >
              <div className="space-y-1">
                <p className="font-display text-2xl sm:text-3xl font-extrabold text-primary">99.8%</p>
                <p className="text-xs text-slate-500 font-medium">IoT Sensor Uptime</p>
              </div>
              <div className="space-y-1">
                <p className="font-display text-2xl sm:text-3xl font-extrabold text-primary">Zero</p>
                <p className="text-xs text-slate-500 font-medium">Waste (Circular)</p>
              </div>
              <div className="space-y-1">
                <p className="font-display text-2xl sm:text-3xl font-extrabold text-primary">+150%</p>
                <p className="text-xs text-slate-500 font-medium">Efisiensi Pakan</p>
              </div>
            </motion.div>

          </div>

          {/* Right Column: High-tech visual / Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            {/* Glowing ambient ring */}
            <div className="absolute inset-0 bg-accent/10 rounded-full blur-3xl scale-95" />
            
            {/* Interactive Smart Farm Glass Card */}
            <div className="relative rounded-3xl bg-bg-white/80 backdrop-blur-md border border-secondary/50 shadow-2xl shadow-primary/5 p-6 overflow-hidden">
              
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-secondary pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="bg-primary/5 p-2 rounded-lg">
                    <Radio className="h-4 w-4 text-accent animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-primary font-display">Integrasi Sektor JagoFarm</h4>
                    <span className="text-[10px] font-mono font-medium text-slate-400">ID: JGF-SYS-MULTIAXIS</span>
                  </div>
                </div>
                <span className="rounded-full bg-green-50 px-2.5 py-0.5 text-[10px] font-bold text-green-600 border border-green-200">
                  ONLINE
                </span>
              </div>

              {/* Graphical Simulation of Both Sectors (Aquaculture & Smart Greenhouse) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                
                {/* 1. Smart Aquaculture Pond Section */}
                <div className="relative h-48 rounded-2xl bg-gradient-to-b from-sky-400/20 via-sky-500/10 to-primary/5 border border-secondary flex flex-col justify-between p-3 overflow-hidden">
                  {/* Rippling Water Waves background using subtle pulsing circles */}
                  <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
                    <motion.div
                      animate={{ scale: [1, 2.2], opacity: [0.5, 0] }}
                      transition={{ duration: 3.5, repeat: Infinity, ease: "easeOut" }}
                      className="absolute w-12 h-12 rounded-full border-2 border-sky-400/20"
                    />
                    <motion.div
                      animate={{ scale: [1, 2.2], opacity: [0.5, 0] }}
                      transition={{ duration: 3.5, delay: 1.2, repeat: Infinity, ease: "easeOut" }}
                      className="absolute w-12 h-12 rounded-full border-2 border-sky-400/20"
                    />
                    <motion.div
                      animate={{ scale: [1, 2.2], opacity: [0.5, 0] }}
                      transition={{ duration: 3.5, delay: 2.4, repeat: Infinity, ease: "easeOut" }}
                      className="absolute w-12 h-12 rounded-full border-2 border-sky-400/20"
                    />
                  </div>

                  {/* Bubble animations */}
                  <div className="absolute inset-x-0 bottom-0 h-12 flex justify-around opacity-40 pointer-events-none">
                    <div className="w-1 h-1 bg-accent rounded-full animate-bounce delay-100" />
                    <div className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce delay-300" />
                    <div className="w-1 h-1 bg-accent rounded-full animate-bounce delay-500" />
                  </div>

                  {/* Simulated Fish */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-full h-full">
                      <motion.div
                        animate={{ 
                          x: [5, 80, 5], 
                          y: [20, 50, 20],
                          scaleX: [1, -1, 1]
                        }}
                        transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                        className="absolute w-6 h-3 rounded-full bg-accent/40 blur-xs flex items-center justify-end pr-0.5"
                      >
                        <div className="w-1 h-1 rounded-full bg-primary/20" />
                      </motion.div>
                      
                      <motion.div
                        animate={{ 
                          x: [80, 10, 80], 
                          y: [60, 30, 60],
                          scaleX: [-1, 1, -1]
                        }}
                        transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                        className="absolute w-7 h-3.5 rounded-full bg-primary/30 blur-xs flex items-center justify-end pr-1"
                      >
                        <div className="w-1 h-1 rounded-full bg-primary/30" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Small sector label */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="rounded-md bg-sky-500/10 border border-sky-500/20 px-2 py-0.5 text-[9px] font-mono font-bold text-accent">
                      AQUACULTURE POND
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
                  </div>

                  {/* Ripple interactive status */}
                  <div className="relative z-10">
                    <p className="text-[10px] font-mono text-slate-400 uppercase font-bold">Bioflok Water Ripple</p>
                    <p className="text-xs font-bold text-primary mt-0.5 flex items-center gap-1">
                      <Droplets className="h-3.5 w-3.5 text-accent animate-pulse" />
                      O₂ Terlarut Optimal
                    </p>
                  </div>
                </div>

                {/* 2. Smart Greenhouse Section */}
                <div className="relative h-48 rounded-2xl bg-gradient-to-b from-emerald-400/20 via-emerald-500/10 to-primary/5 border border-secondary flex flex-col justify-between p-3 overflow-hidden">
                  
                  {/* Subtle humidity mist sprays */}
                  <div className="absolute inset-0 flex items-start justify-center overflow-hidden pointer-events-none">
                    <motion.div
                      animate={{ y: [0, 60], opacity: [0, 0.4, 0], scale: [0.8, 1.2] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeOut" }}
                      className="absolute top-0 w-full h-8 bg-sky-200/10 blur-md rounded-full"
                    />
                    <motion.div
                      animate={{ y: [0, 60], opacity: [0, 0.4, 0], scale: [0.8, 1.2] }}
                      transition={{ duration: 4, delay: 2, repeat: Infinity, ease: "easeOut" }}
                      className="absolute top-0 w-full h-8 bg-sky-200/10 blur-md rounded-full"
                    />
                  </div>

                  {/* Swaying Vines & Leaves Visualizer */}
                  <div className="absolute inset-0 flex items-end justify-center pb-2 pointer-events-none">
                    <motion.div
                      animate={{ rotate: [-2, 2, -2] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                      style={{ transformOrigin: "bottom center" }}
                      className="relative w-1 h-20 bg-emerald-600/60 rounded-full"
                    >
                      {/* Swaying Left Leaf */}
                      <motion.div
                        animate={{ rotate: [-4, 6, -4] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                        style={{ transformOrigin: "bottom right" }}
                        className="absolute -left-5 top-2 w-5 h-3 bg-emerald-500/80 rounded-tl-full rounded-br-full border border-emerald-400 flex items-center justify-center"
                      >
                        <div className="w-2 h-0.5 bg-emerald-300" />
                      </motion.div>

                      {/* Swaying Right Leaf */}
                      <motion.div
                        animate={{ rotate: [6, -4, 6] }}
                        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                        style={{ transformOrigin: "bottom left" }}
                        className="absolute -right-5 top-6 w-5 h-3 bg-emerald-500/80 rounded-tr-full rounded-bl-full border border-emerald-400 flex items-center justify-center"
                      >
                        <div className="w-2 h-0.5 bg-emerald-300" />
                      </motion.div>

                      {/* Hanging Golden Melon ripe fruits */}
                      <motion.div
                        animate={{ y: [-0.5, 0.5, -0.5], rotate: [-3, 3, -3] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -left-2.5 top-10 w-5 h-5 rounded-full bg-amber-400 border border-amber-300 flex items-center justify-center shadow-md shadow-amber-500/20"
                      >
                        <span className="text-[9px]">🍈</span>
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Small sector label */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="rounded-md bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[9px] font-mono font-bold text-emerald-600">
                      SMART GREENHOUSE
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  </div>

                  {/* Vine sways status info */}
                  <div className="relative z-10">
                    <p className="text-[10px] font-mono text-slate-400 uppercase font-bold">Climate Microcontrol</p>
                    <p className="text-xs font-bold text-primary mt-0.5 flex items-center gap-1">
                      <Sprout className="h-3.5 w-3.5 text-emerald-600 animate-bounce" />
                      Golden Melon Bersemi
                    </p>
                  </div>
                </div>

              </div>

              {/* Dynamic Real-time Sensors */}
              <div className="grid grid-cols-3 gap-3 mt-4">
                <div className="rounded-xl bg-secondary/50 p-3 text-center border border-secondary">
                  <div className="flex justify-center mb-1 text-accent">
                    <Thermometer className="h-4 w-4" />
                  </div>
                  <p className="text-[10px] font-medium text-slate-500 uppercase">Suhu Air</p>
                  <p className="font-mono text-sm font-bold text-primary mt-0.5">{waterTemp}°C</p>
                </div>

                <div className="rounded-xl bg-secondary/50 p-3 text-center border border-secondary">
                  <div className="flex justify-center mb-1 text-accent">
                    <Droplets className="h-4 w-4" />
                  </div>
                  <p className="text-[10px] font-medium text-slate-500 uppercase">Dissolved O₂</p>
                  <p className="font-mono text-sm font-bold text-primary mt-0.5">{oxygen} mg/L</p>
                </div>

                <div className="rounded-xl bg-secondary/50 p-3 text-center border border-secondary">
                  <div className="flex justify-center mb-1 text-accent">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <p className="text-[10px] font-medium text-slate-500 uppercase">Keasaman (pH)</p>
                  <p className="font-mono text-sm font-bold text-primary mt-0.5">{ph}</p>
                </div>
              </div>

              {/* Automated Action Ticker */}
              <div className="mt-4 rounded-xl bg-blue-50/60 dark:bg-sky-950/40 p-3 border border-blue-100 dark:border-sky-800/50 flex items-center gap-3">
                <div className="h-7 w-7 rounded-lg bg-accent/10 dark:bg-sky-400/20 flex items-center justify-center text-accent dark:text-sky-300 flex-shrink-0">
                  <HeartPulse className="h-4 w-4 animate-pulse" />
                </div>
                <div className="text-left text-[11px]">
                  <p className="font-bold text-primary dark:text-sky-200">Pemberi Pakan Otomatis</p>
                  <p className="text-slate-500 dark:text-sky-300/80">Selesai 07:00, Berikutnya 13:00 (Dosis 4.2 kg)</p>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
