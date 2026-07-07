import React from 'react';
import { Terminal, Trash2, TrendingUp, Users, Activity, AlertTriangle } from 'lucide-react';
import { useJagoFarm } from '../../context/JagoFarmContext';

export default function AnalyticsTab() {
  const {
    totalVisitors,
    leads,
    whatsappClicks,
    sensorTempWater,
    simulationAlert,
    activityLogs,
    clearActivityLogs
  } = useJagoFarm();

  return (
    <div id="tab-content-analytics" className="space-y-6">
      
      {/* Statistics Grid cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/60 dark:border-slate-900 shadow-xs text-left">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">Total Pengunjung</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="font-display text-2xl font-extrabold text-slate-800 dark:text-slate-100">{totalVisitors}</span>
            <span className="text-emerald-500 text-[10px] font-bold font-mono">+12.5%</span>
          </div>
          <span className="text-[10px] text-slate-400 block mt-1">Simulasi kunjungan live di session ini</span>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/60 dark:border-slate-900 shadow-xs text-left">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">Lead Konsultasi B2B</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="font-display text-2xl font-extrabold text-slate-800 dark:text-slate-100">{leads.length}</span>
            <span className="text-emerald-500 text-[10px] font-bold font-mono">
              Konv: {totalVisitors > 0 ? ((leads.length / totalVisitors) * 100).toFixed(1) : '14.2'}%
            </span>
          </div>
          <span className="text-[10px] text-slate-400 block mt-1">Dari form popup interaktif</span>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/60 dark:border-slate-900 shadow-xs text-left">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">WhatsApp Contact</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="font-display text-2xl font-extrabold text-emerald-500 dark:text-emerald-400">{whatsappClicks}</span>
            <span className="text-emerald-400 text-[10px] font-bold font-mono">clicks</span>
          </div>
          <span className="text-[10px] text-slate-400 block mt-1">Klik langsung ke admin JagoFarm</span>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/60 dark:border-slate-900 shadow-xs text-left">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">Suhu Kolam Bioflok</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className={`font-display text-2xl font-extrabold ${sensorTempWater > 30 ? 'text-amber-500' : 'text-primary dark:text-sky-300'}`}>
              {sensorTempWater}°C
            </span>
            <span className="text-sky-400 text-[10px] font-bold font-mono">Suhu Air</span>
          </div>
          <span className="text-[10px] text-slate-400 block mt-1">Dipantau Probe Sensor IP68</span>
        </div>
      </div>

      {/* Grid chart & details row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Traffic Chart SVG */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-900 rounded-3xl p-5">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h4 className="font-display text-xs font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider">
                Kurva Lalu Lintas Kunjungan (24 Jam Terakhir)
              </h4>
              <span className="text-[10px] text-slate-400 block">Lonjakan pagi hari akibat B2B organic search</span>
            </div>
            <span className="rounded-full bg-accent/10 text-accent text-[9px] font-mono font-bold px-2.5 py-0.5 border border-accent/20">
              7H TERAKHIR
            </span>
          </div>

          {/* Highly polished SVG Responsive Line Area Chart */}
          <div className="h-48 w-full relative pt-2">
            <svg className="w-full h-full" viewBox="0 0 500 150" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chart-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4"/>
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.0"/>
                </linearGradient>
              </defs>
              {/* Grid lines */}
              <line x1="0" y1="30" x2="500" y2="30" stroke="rgba(148, 163, 184, 0.1)" strokeDasharray="3,3" />
              <line x1="0" y1="75" x2="500" y2="75" stroke="rgba(148, 163, 184, 0.1)" strokeDasharray="3,3" />
              <line x1="0" y1="120" x2="500" y2="120" stroke="rgba(148, 163, 184, 0.1)" strokeDasharray="3,3" />
              
              {/* Area Fill */}
              <path 
                d="M0,150 L0,120 L80,105 L160,115 L240,45 L320,60 L400,25 L480,50 L500,50 L500,150 Z" 
                fill="url(#chart-grad)"
              />
              
              {/* Main Path stroke */}
              <path 
                d="M0,120 L80,105 L160,115 L240,45 L320,60 L400,25 L480,50 L500,50" 
                fill="none" 
                stroke="#0284c7" 
                strokeWidth="3" 
                strokeLinecap="round"
              />

              {/* Interactive highlights (dots) */}
              <circle cx="240" cy="45" r="5" fill="#38bdf8" stroke="#ffffff" strokeWidth="2" />
              <circle cx="400" cy="25" r="5" fill="#38bdf8" stroke="#ffffff" strokeWidth="2" />
            </svg>
            {/* X axis labels */}
            <div className="flex justify-between items-center text-[9px] text-slate-400 font-mono mt-1">
              <span>06:00</span>
              <span>10:00 (Puncak B2B)</span>
              <span>14:00</span>
              <span>18:00</span>
              <span>22:00</span>
            </div>
          </div>
        </div>

        {/* CTR & IoT Sector Click Breakdown */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-900 rounded-3xl p-5 flex flex-col justify-between">
          <div>
            <h4 className="font-display text-xs font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider">
              Rasio Klik Minat Sektor IoT
            </h4>
            <p className="text-[10px] text-slate-400 mt-1">Sektor yang paling menarik minat pengunjung B2B</p>
          </div>

          <div className="space-y-4 my-4">
            <div>
              <div className="flex justify-between text-[10px] font-bold font-mono mb-1">
                <span>SEKTOR AKUAKULTUR BIOFLOK</span>
                <span className="text-sky-500">62% Minat</span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-950 rounded-full overflow-hidden">
                <div className="h-full bg-sky-500 rounded-full" style={{ width: '62%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[10px] font-bold font-mono mb-1">
                <span>SEKTOR SMART GREENHOUSE</span>
                <span className="text-emerald-500">48% Minat</span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-950 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '48%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[10px] font-bold font-mono mb-1">
                <span>SEKTOR TEKNOLOGI MAGGOT BSF</span>
                <span className="text-amber-500">31% Minat</span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-950 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '31%' }}></div>
              </div>
            </div>
          </div>

          <span className="text-[10px] text-slate-400 font-mono block text-center bg-slate-50 dark:bg-slate-950/40 py-2 rounded-xl">
            *Berdasarkan durasi hover & klik detail
          </span>
        </div>

      </div>

      {/* Activity Terminal Logs Ticker */}
      <div className="bg-slate-900 dark:bg-slate-950 border border-slate-800 rounded-3xl p-5 font-mono text-left">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2 text-slate-200">
            <Terminal className="h-4 w-4 text-accent animate-pulse" />
            <h4 className="text-xs font-bold uppercase tracking-wider">
              Live Monitor Aktivitas Server (Simulasi Log Kunjungan)
            </h4>
          </div>
          <button
            id="btn-clear-logs"
            onClick={clearActivityLogs}
            className="text-[10px] text-slate-400 hover:text-red-400 hover:underline flex items-center gap-1 transition-all cursor-pointer"
          >
            <Trash2 className="h-3 w-3" />
            <span>Sapu Log</span>
          </button>
        </div>

        <div className="h-36 overflow-y-auto space-y-1.5 text-[11px] pr-2 scrollbar-thin scrollbar-thumb-slate-800">
          {activityLogs.length === 0 ? (
            <p className="text-slate-500 italic">Belum ada aktivitas baru. Coba berinteraksi dengan website.</p>
          ) : (
            activityLogs.map((log) => {
              let colorBadge = 'text-sky-400';
              if (log.type === 'lead') colorBadge = 'text-amber-400 font-bold';
              if (log.type === 'admin') colorBadge = 'text-purple-400';
              if (log.type === 'sensor') colorBadge = 'text-rose-400';
              if (log.type === 'system') colorBadge = 'text-slate-500';

              return (
                <div key={log.id} className="flex gap-2 items-start hover:bg-white/5 p-1 rounded-md transition-colors">
                  <span className="text-slate-500">[{log.timestamp}]</span>
                  <span className={`uppercase font-bold shrink-0 ${colorBadge}`}>
                    [{log.type}]
                  </span>
                  <span className="text-slate-300">{log.message}</span>
                </div>
              );
            })
          )}
        </div>
      </div>

    </div>
  );
}
