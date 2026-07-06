import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bug, Egg, Fish, Leaf, ArrowRight, RefreshCw, Layers, CheckCircle } from 'lucide-react';
import { CircularStage } from '../types';

export default function CircularEconomy() {
  const [activeStage, setActiveStage] = useState<string>('maggot');

  const stages: CircularStage[] = [
    {
      id: 'maggot',
      name: 'Maggot BSF',
      emoji: '🐛',
      description: 'Lalat Tentara Hitam (Black Soldier Fly) mengurai limbah sisa melon dan sisa ayam.',
      input: 'Limbah Sisa Buah & Lahan',
      output: 'Pakan Tinggi Protein (42%) & Bio-Pupuk',
      efficiency: 'Mengurangi limbah organik hingga 90%',
      details: 'Larva BSF sangat efisien mengurai residu organik dari tanaman melon dan kotoran peternakan. Menghasilkan pakan berkualitas tinggi dengan jejak karbon terendah.'
    },
    {
      id: 'poultry',
      name: 'Peternakan Ayam',
      emoji: '🐔',
      description: 'Ayam pedaging berkualitas tinggi dibudidayakan secara sehat tanpa bahan kimia.',
      input: 'Maggot BSF Organik Segar',
      output: 'Daging Ayam Segar & Kotoran Organik',
      efficiency: 'Pemangkasan biaya pakan konvensional 40%',
      details: 'Dengan asupan maggot BSF hidup yang kaya asam amino alami, metabolisme ayam meningkat drastis, menjadikannya ayam organik premium yang sehat dan padat gizi.'
    },
    {
      id: 'aquaculture',
      name: 'Budidaya Ikan',
      emoji: '🐟',
      description: 'Ikan air tawar (Nila & Lele) dikembangkan dengan teknologi sirkulasi bioflok.',
      input: 'Pakan Pelet Maggot JagoFarm',
      output: 'Ikan Segar & Air Limbah Kaya Nutrisi',
      efficiency: 'Zero-water waste dengan filtrasi biologis',
      details: 'Air kolam penyaringan kaya akan amonia alami hasil ekskresi ikan yang diproses bakteri pengurai menjadi nitrat organik yang sangat dibutuhkan tanaman.'
    },
    {
      id: 'horticulture',
      name: 'Melon & Semangka',
      emoji: '🍉',
      description: 'Budidaya melon premium (Inthanon/Kimochi) dan semangka non-biji di dalam greenhouse.',
      input: 'Nutrisi Air Kolam & Pupuk BSF',
      output: 'Buah Premium Segar & Sisa Buah Organik',
      efficiency: 'Hasil panen 2.5x lebih manis & bebas pestisida',
      details: 'Air sirkulasi kaya nitrat dari kolam dialirkan langsung melalui irigasi tetes ke akar tanaman melon. Daun berguguran dan buah non-standar dikembalikan ke fasilitas maggot.'
    }
  ];

  const currentStageData = stages.find(s => s.id === activeStage) || stages[0];

  const getIcon = (id: string) => {
    switch (id) {
      case 'maggot':
        return <Bug className="h-6 w-6 text-primary" />;
      case 'poultry':
        return <Egg className="h-6 w-6 text-primary" />;
      case 'aquaculture':
        return <Fish className="h-6 w-6 text-primary" />;
      case 'horticulture':
        return <Leaf className="h-6 w-6 text-primary" />;
      default:
        return <Bug className="h-6 w-6 text-primary" />;
    }
  };

  return (
    <section
      id="circular"
      className="relative py-24 bg-secondary overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 border border-accent/20">
            <RefreshCw className="h-3.5 w-3.5 text-accent animate-spin-slow" />
            <span className="text-xs font-mono font-bold text-accent uppercase tracking-wider">Ekosistem Mandiri</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
            Siklus Melingkar (Circular Economy) JagoFarm
          </h2>
          <p className="text-base text-slate-600">
            Setiap keluaran dari satu elemen adalah masukan berharga bagi elemen lainnya. Kami mengubah limbah menjadi nilai tambah, menciptakan pertanian tanpa sampah.
          </p>
        </div>

        {/* Dynamic Connected Process Path */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Interactive Steps Circle (8 cols on big, stack on small) */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {stages.map((stage, idx) => {
                const isActive = stage.id === activeStage;
                return (
                  <button
                    key={stage.id}
                    id={`stage-button-${stage.id}`}
                    onClick={() => setActiveStage(stage.id)}
                    className={`relative p-5 rounded-2xl border text-left transition-all duration-300 ${
                      isActive
                        ? 'bg-bg-white border-accent shadow-lg shadow-accent/10 scale-[1.02]'
                        : 'bg-bg-white/50 hover:bg-bg-white border-transparent hover:border-accent/40 shadow-xs'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Circular Background with Accent & Icon */}
                      <div className={`flex items-center justify-center h-12 w-12 rounded-full transition-colors ${
                        isActive ? 'bg-accent/20' : 'bg-accent/10'
                      }`}>
                        {getIcon(stage.id)}
                      </div>
                      
                      <div className="flex-1">
                        <span className="text-xs font-mono font-bold text-accent">Tahap 0{idx + 1}</span>
                        <h3 className="font-display text-base font-bold text-primary mt-0.5">{stage.name}</h3>
                      </div>
                    </div>
                    
                    <p className="text-xs text-slate-500 mt-3 line-clamp-2">{stage.description}</p>
                    
                    {/* Floating mini connection indicator */}
                    {isActive && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:block">
                        <div className="h-8 w-8 rounded-full bg-accent text-bg-white flex items-center justify-center">
                          <ArrowRight className="h-4.5 w-4.5 animate-pulse" />
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Graphical Flow Connecting Loop for mobile indicators */}
            <div className="flex items-center justify-center gap-2 py-2 sm:hidden text-accent font-mono text-xs">
              <span>BSF Maggot</span>
              <ArrowRight className="h-3 w-3" />
              <span>Ayam</span>
              <ArrowRight className="h-3 w-3" />
              <span>Ikan</span>
              <ArrowRight className="h-3 w-3" />
              <span>Melon</span>
            </div>
          </div>

          {/* Detailed Informational Card (5 cols) */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStage}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="rounded-3xl bg-bg-white border border-secondary p-6 sm:p-8 shadow-xl shadow-primary/5 space-y-6 text-left relative"
              >
                {/* Stage watermark badge */}
                <span className="absolute top-6 right-6 text-5xl select-none opacity-20 pointer-events-none">
                  {currentStageData.emoji}
                </span>

                <div>
                  <span className="rounded-full bg-primary/5 border border-primary/10 px-2.5 py-1 text-xs font-mono font-semibold text-primary uppercase">
                    Fokus Aliran Energi
                  </span>
                  <h3 className="font-display text-2xl font-extrabold text-primary mt-2">
                    {currentStageData.name}
                  </h3>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                    {currentStageData.details}
                  </p>
                </div>

                {/* Input / Output Specs */}
                <div className="space-y-3.5 pt-4 border-t border-secondary">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">Input Ekosistem</span>
                    <p className="text-xs font-bold text-primary mt-0.5 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                      {currentStageData.input}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">Output Bernilai</span>
                    <p className="text-xs font-bold text-accent mt-0.5 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      {currentStageData.output}
                    </p>
                  </div>
                </div>

                {/* Metric / Efficiency Badge */}
                <div className="rounded-2xl bg-secondary/80 p-4 border border-accent/20 flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-primary">Dampak Berkelanjutan</h4>
                    <p className="text-xs text-slate-600 mt-1">{currentStageData.efficiency}</p>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
