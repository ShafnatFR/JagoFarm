import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Laptop, Camera, Calendar, Droplet, Sprout, 
  Settings, Bell, RefreshCw, BarChart2, Zap, AlertTriangle, Play 
} from 'lucide-react';

export default function DashboardShowcase() {
  const [activeSector, setActiveSector] = useState<'pond' | 'greenhouse' | 'coop'>('pond');
  
  // Interactive Dashboard States
  const [feederStatus, setFeederStatus] = useState<boolean>(true);
  const [pumpStatus, setPumpStatus] = useState<boolean>(false);
  const [feedLevel, setFeedLevel] = useState<number>(78);
  const [soilMoisture, setSoilMoisture] = useState<number>(62);
  const [fishCount, setFishCount] = useState<number>(2450);
  const [deadFishDetections, setDeadFishDetections] = useState<number>(0);

  // Time and Date
  const [simulatedTime, setSimulatedTime] = useState<string>('12:00:00');

  // Live telemetry ticking
  useEffect(() => {
    const timeInterval = setInterval(() => {
      const now = new Date();
      setSimulatedTime(now.toLocaleTimeString('id-ID'));
    }, 1000);

    const dataInterval = setInterval(() => {
      if (pumpStatus) {
        // Soil moisture goes up if pump is on
        setSoilMoisture(prev => Math.min(95, prev + 1));
      } else {
        // Soil moisture slowly dries up
        setSoilMoisture(prev => Math.max(40, prev - 1));
      }

      // Slightly fluctuate feed levels
      if (feederStatus && Math.random() > 0.7) {
        setFeedLevel(prev => Math.max(5, prev - 1));
      }
    }, 4000);

    return () => {
      clearInterval(timeInterval);
      clearInterval(dataInterval);
    };
  }, [pumpStatus, feederStatus]);

  // Handle feed refill trigger
  const handleRefill = () => {
    setFeedLevel(100);
  };

  // Handle AI camera rerun simulation
  const handleScanAI = () => {
    setDeadFishDetections(0);
  };

  return (
    <section
      id="dashboard-showcase"
      className="relative py-24 bg-primary dark:bg-secondary text-white dark:text-slate-100 overflow-hidden text-left"
    >
      {/* Background radial effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-accent/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent/20 px-3 py-1 border border-accent/30 text-accent">
            <Laptop className="h-4 w-4 text-accent animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider">Enterprise IoT Platform</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
            Sentralisasi Operasional via JagoFarm Dashboard
          </h2>
          <p className="text-base text-slate-300">
            Kendalikan seluruh farm Anda dari satu layar. Sensor cerdas kami melaporkan data biologis setiap detik, memicu otomatisasi pakan, deteksi penyakit AI, dan irigasi cerdas.
          </p>
        </div>

        {/* Dashboard Visual Laptop Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Text/Interactive Features Selector (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <h3 className="font-display text-xl font-bold tracking-tight text-accent">
              Fitur Utama yang Dapat Dicoba:
            </h3>

            {/* Feature Clickers to switch mock viewpoints */}
            <div className="space-y-3">
              <button
                id="btn-sector-pond"
                onClick={() => setActiveSector('pond')}
                className={`w-full p-4 rounded-2xl text-left border transition-all flex items-start gap-4 ${
                  activeSector === 'pond'
                    ? 'bg-accent/10 border-accent/60 shadow-lg'
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
              >
                <div className="h-10 w-10 rounded-xl bg-accent/20 flex items-center justify-center text-accent flex-shrink-0">
                  <Camera className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-display text-sm font-bold">Deteksi Ikan Mati (AI Vision)</h4>
                  <p className="text-xs text-slate-400 mt-1">Computer vision memindai permukaan air kolam bioflok 24/7 secara real-time.</p>
                </div>
              </button>

              <button
                id="btn-sector-greenhouse"
                onClick={() => setActiveSector('greenhouse')}
                className={`w-full p-4 rounded-2xl text-left border transition-all flex items-start gap-4 ${
                  activeSector === 'greenhouse'
                    ? 'bg-accent/10 border-accent/60 shadow-lg'
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
              >
                <div className="h-10 w-10 rounded-xl bg-accent/20 flex items-center justify-center text-accent flex-shrink-0">
                  <Droplet className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-display text-sm font-bold">Otomatisasi Irigasi & Kelembapan</h4>
                  <p className="text-xs text-slate-400 mt-1">Sistem menyiram greenhouse melon hanya saat kelembapan tanah turun di bawah 65%.</p>
                </div>
              </button>

              <button
                id="btn-sector-coop"
                onClick={() => setActiveSector('coop')}
                className={`w-full p-4 rounded-2xl text-left border transition-all flex items-start gap-4 ${
                  activeSector === 'coop'
                    ? 'bg-accent/10 border-accent/60 shadow-lg'
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
              >
                <div className="h-10 w-10 rounded-xl bg-accent/20 flex items-center justify-center text-accent flex-shrink-0">
                  <Sprout className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-display text-sm font-bold">Otomatisasi Pakan Ayam & Ikan</h4>
                  <p className="text-xs text-slate-400 mt-1">Dosis pakan diatur secara berkala dengan timer presisi tinggi dari dispenser pusat.</p>
                </div>
              </button>
            </div>
          </div>

          {/* Large Laptop Mockup Screen (8 cols) */}
          <div className="lg:col-span-8 flex flex-col items-center">
            
            {/* The Laptop Device Wrapper */}
            <div className="w-full relative rounded-2xl border-4 border-slate-700 bg-slate-900 shadow-2xl overflow-hidden shadow-accent/20">
              
              {/* Screen Top Bar */}
              <div className="bg-slate-950 px-4 py-2 flex items-center justify-between border-b border-white/5 text-[11px] font-mono text-slate-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  <span className="ml-2 font-semibold text-slate-300">jagofarm-os_v2.4.sh</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    Secure Link
                  </span>
                  <span>{simulatedTime} WIB</span>
                </div>
              </div>

              {/* Internal Screen Content */}
              <div className="bg-[#071324] p-4 sm:p-6 min-h-[420px] text-left relative text-white">
                
                {/* Simulated App Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/10 pb-4 mb-4 gap-3">
                  <div>
                    <h4 className="font-display text-base font-bold text-slate-100 flex items-center gap-2">
                      <span className="bg-accent/20 text-accent text-xs px-2.5 py-0.5 rounded-md font-mono">
                        SEKTOR {activeSector.toUpperCase()}
                      </span>
                      Monitoring Terpusat JagoFarm
                    </h4>
                    <p className="text-[10px] text-slate-400">Pembaruan otomatis berjalan secara real-time</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button 
                      id="btn-refill-feed"
                      onClick={handleRefill}
                      className="rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 px-2.5 py-1 text-[11px] font-bold text-accent transition-all flex items-center gap-1"
                    >
                      <RefreshCw className="h-3 w-3" />
                      Refill Pakan
                    </button>
                    <span className="h-5 w-px bg-white/10" />
                    <Settings className="h-4 w-4 text-slate-400 cursor-pointer hover:text-white" />
                    <Bell className="h-4 w-4 text-slate-400 cursor-pointer hover:text-white" />
                  </div>
                </div>

                {/* Simulated Content Dashboard Views */}
                <AnimatePresence mode="wait">
                  {activeSector === 'pond' && (
                    <motion.div
                      key="pond-view"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4"
                    >
                      {/* KPI Cards top */}
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                          <p className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">AI CAMERA: DEAD FISH</p>
                          <p className={`font-display text-base sm:text-lg font-extrabold mt-1 ${
                            deadFishDetections === 0 ? 'text-emerald-400' : 'text-red-400 animate-pulse'
                          }`}>
                            {deadFishDetections === 0 ? 'TIDAK TERDETEKSI' : `${deadFishDetections} EKOR TERDETEKSI`}
                          </p>
                          <button
                            id="btn-scan-ai-vision"
                            onClick={handleScanAI}
                            className="text-[9px] text-accent hover:underline mt-1 font-mono block"
                          >
                            Ulang Pemindaian AI
                          </button>
                        </div>

                        <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                          <p className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">OTOMATISASI PAKAN</p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="font-display text-base sm:text-lg font-extrabold text-accent">
                              {feederStatus ? 'AKTIF' : 'MATI'}
                            </span>
                            <button
                              id="toggle-feeder-btn"
                              onClick={() => setFeederStatus(!feederStatus)}
                              className={`h-4 w-8 rounded-full transition-colors flex items-center px-0.5 ${
                                feederStatus ? 'bg-accent' : 'bg-white/10'
                              }`}
                            >
                              <div className={`h-3 w-3 rounded-full bg-white transition-transform ${
                                feederStatus ? 'translate-x-4' : 'translate-x-0'
                              }`} />
                            </button>
                          </div>
                        </div>

                        <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                          <p className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">ESTIMASI BIOMASSA</p>
                          <p className="font-display text-base sm:text-lg font-extrabold text-slate-100 mt-1">
                            {fishCount} Ekor
                          </p>
                          <span className="text-[9px] text-slate-400 block font-mono">Bobot rata-rata: 450gr</span>
                        </div>
                      </div>

                      {/* Video streaming mockup for AI Dead Fish Detector */}
                      <div className="relative rounded-xl border border-white/5 overflow-hidden h-40 bg-slate-950 flex items-center justify-center">
                        {/* Live visual filter overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                        <div className="absolute top-3 left-3 bg-red-500 text-white rounded-md px-2 py-0.5 text-[9px] font-mono font-bold uppercase flex items-center gap-1.5 z-10 animate-pulse">
                          <span className="w-1.5 h-1.5 bg-white rounded-full" />
                          LIVE STREAM (AI CAMERA)
                        </div>

                        {/* Circular bioflok simulation overlay */}
                        <div className="w-32 h-32 rounded-full border-2 border-accent/20 bg-blue-500/5 animate-pulse relative flex items-center justify-center">
                          <span className="text-[10px] text-slate-400 font-mono">Bioflok Pond A4</span>
                          {/* Green box signifying object detection */}
                          <div className="absolute border border-emerald-400 bg-emerald-400/10 px-1 rounded-sm text-[8px] text-emerald-400 top-1/3 left-1/4 animate-pulse">
                            [Healthy Fish N-42]
                          </div>
                          <div className="absolute border border-emerald-400 bg-emerald-400/10 px-1 rounded-sm text-[8px] text-emerald-400 bottom-1/4 right-1/3 animate-pulse">
                            [Healthy Fish N-78]
                          </div>
                        </div>
                        
                        {/* Status Footer inside stream */}
                        <div className="absolute bottom-3 left-3 right-3 flex justify-between text-[10px] font-mono text-slate-300 z-10">
                          <span>FPS: 30 | Latency: 42ms</span>
                          <span className="text-accent font-bold">Detektor Ikan Mati AI: Siaga (0 Mati)</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeSector === 'greenhouse' && (
                    <motion.div
                      key="greenhouse-view"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4"
                    >
                      {/* KPI Cards top */}
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                          <p className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">KELEMBAPAN TANAH</p>
                          <p className={`font-display text-base sm:text-lg font-extrabold mt-1 ${
                            soilMoisture < 60 ? 'text-yellow-400 animate-pulse' : 'text-accent'
                          }`}>
                            {soilMoisture}% RH
                          </p>
                          <div className="w-full bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
                            <div className="bg-accent h-full transition-all duration-500" style={{ width: `${soilMoisture}%` }} />
                          </div>
                        </div>

                        <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                          <p className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">POMPA IRIGASI DETIK</p>
                          <div className="flex items-center justify-between mt-1">
                            <span className={`font-display text-base sm:text-lg font-extrabold ${
                              pumpStatus ? 'text-emerald-400 animate-pulse' : 'text-slate-400'
                            }`}>
                              {pumpStatus ? 'MENYIRAM' : 'MATI'}
                            </span>
                            <button
                              id="toggle-pump-btn"
                              onClick={() => setPumpStatus(!pumpStatus)}
                              className={`h-4 w-8 rounded-full transition-colors flex items-center px-0.5 ${
                                pumpStatus ? 'bg-accent' : 'bg-white/10'
                              }`}
                            >
                              <div className={`h-3 w-3 rounded-full bg-white transition-transform ${
                                pumpStatus ? 'translate-x-4' : 'translate-x-0'
                              }`} />
                            </button>
                          </div>
                        </div>

                        <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                          <p className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">SUHU GREENHOUSE</p>
                          <p className="font-display text-base sm:text-lg font-extrabold text-slate-100 mt-1">
                            28.2°C
                          </p>
                          <span className="text-[9px] text-emerald-400 block font-mono">Kipas Angin: ON (Auto)</span>
                        </div>
                      </div>

                      {/* Interactive Soil Moisture Ticker diagram */}
                      <div className="rounded-xl border border-white/5 p-4 bg-slate-950 flex flex-col justify-between h-40">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-[10px] font-mono text-slate-400 uppercase">Siklus Sirkulasi Air</span>
                            <h5 className="text-sm font-bold mt-1 text-slate-100">Irigasi Tetes Nutrisi Air Kolam Nila</h5>
                          </div>
                          <span className="rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-mono font-bold">
                            PH AIR IRIGASI: 7.2 (Optimal)
                          </span>
                        </div>

                        <p className="text-xs text-slate-400 leading-relaxed">
                          Pompa irigasi akan otomatis menyala jika kelembapan tanah melon turun di bawah <span className="text-accent font-bold">60%</span> dan mati pada <span className="text-accent font-bold">85%</span>. Air irigasi ditarik langsung dari penyaringan kolam Bioflok, menghemat pupuk kimia 100%.
                        </p>

                        <div className="flex items-center gap-2">
                          <button
                            id="btn-simulate-irrigate"
                            onClick={() => {
                              setPumpStatus(true);
                              setTimeout(() => setPumpStatus(false), 8000);
                            }}
                            className="rounded-lg bg-accent text-white px-3 py-1.5 text-xs font-bold hover:bg-accent-hover transition-all flex items-center gap-1.5"
                          >
                            <Play className="h-3.5 w-3.5" />
                            Simulasikan Penyiraman Otomatis (8 Detik)
                          </button>
                          <span className="text-[10px] font-mono text-slate-400">
                            Status: {pumpStatus ? 'Mengalirkan air kolam...' : 'Pompa siaga'}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeSector === 'coop' && (
                    <motion.div
                      key="coop-view"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4"
                    >
                      {/* KPI Cards top */}
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                          <p className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">TINGKAT DISPENSER PAKAN</p>
                          <p className="font-display text-base sm:text-lg font-extrabold text-accent mt-1">
                            {feedLevel}%
                          </p>
                          <div className="w-full bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
                            <div className="bg-accent h-full transition-all duration-300" style={{ width: `${feedLevel}%` }} />
                          </div>
                        </div>

                        <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                          <p className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">JADWAL DISPENSE SORE</p>
                          <p className="font-display text-base sm:text-lg font-extrabold text-amber-400 mt-1">
                            16:30 WIB
                          </p>
                          <span className="text-[9px] text-slate-400 block font-mono">Dosis: 12.5 kg Pelet BSF</span>
                        </div>

                        <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                          <p className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">TINGKAT AMONIA COOP</p>
                          <p className="font-display text-base sm:text-lg font-extrabold text-emerald-400 mt-1">
                            0.02 ppm
                          </p>
                          <span className="text-[9px] text-slate-400 block font-mono">Batas Aman: &lt; 0.05 ppm</span>
                        </div>
                      </div>

                      {/* Feeding schedule stats details */}
                      <div className="rounded-xl border border-white/5 p-4 bg-slate-950 flex flex-col justify-between h-40 text-left">
                        <div>
                          <span className="text-[10px] font-mono text-slate-400 uppercase">Status Nutrisi Ternak</span>
                          <h5 className="text-sm font-bold mt-1 text-slate-100">Dispenser Pusat Pakan Maggot BSF Hidup</h5>
                        </div>

                        <p className="text-xs text-slate-400 leading-relaxed">
                          Nutrisi ayam dikendalikan sepenuhnya melalui asupan larva BSF segar dari tangki pusat dispenser. Larva kaya protein disalurkan secara mekanis pada jam 07:00, 11:30, dan 16:30, meningkatkan efisiensi serapan pakan (FCR).
                        </p>

                        <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 border-t border-white/5 pt-2">
                          <span>Disalurkan Hari Ini: 37.5 kg</span>
                          <span>Refill terakhir: 24 jam lalu</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </div>

            {/* Laptop Stand base */}
            <div className="w-[85%] h-3 bg-slate-800 rounded-b-xl border-t border-slate-700 relative shadow-md" />
            <div className="w-24 h-1.5 bg-slate-900 rounded-b-md" />

          </div>

        </div>

      </div>
    </section>
  );
}
