import React, { useState } from 'react';
import { Clock, Trash2, Terminal, Search } from 'lucide-react';
import { useJagoFarm } from '../../context/JagoFarmContext';

interface LogsTabProps {
  triggerSuccessToast: (msg: string) => void;
}

export default function LogsTab({ triggerSuccessToast }: LogsTabProps) {
  const { activityLogs, clearActivityLogs } = useJagoFarm();
  const [logSearch, setLogSearch] = useState('');

  const filteredLogs = activityLogs.filter(log => 
    log.message.toLowerCase().includes(logSearch.toLowerCase()) ||
    (log.user && log.user.toLowerCase().includes(logSearch.toLowerCase())) ||
    log.type.toLowerCase().includes(logSearch.toLowerCase())
  );

  return (
    <div id="tab-content-activity-logs" className="space-y-6 text-left">
      <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4 mb-5">
          <div>
            <h3 className="font-display text-base font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Clock className="h-5 w-5 text-accent" />
              <span>Riwayat Log Aktivitas (Audit Trail)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Daftar kronologis lengkap tindakan admin dan interaksi landing page dengan identifikasi pengguna dan timestamp presisi.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5 self-start sm:self-auto w-full sm:w-auto">
            <button
              id="btn-clear-audit-logs"
              onClick={() => {
                clearActivityLogs();
                triggerSuccessToast('Seluruh riwayat audit log berhasil dibersihkan!');
              }}
              className="px-4 py-2 border border-red-200 hover:bg-red-500/5 rounded-xl text-xs font-bold text-red-500 flex items-center gap-1.5 transition-all cursor-pointer justify-center"
            >
              <Trash2 className="h-4 w-4" />
              <span>Sapu Log Aktivitas</span>
            </button>
          </div>
        </div>

        {/* Search bar inside logs */}
        <div className="mb-4 relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            id="logs-search-input"
            type="text"
            value={logSearch}
            onChange={(e) => setLogSearch(e.target.value)}
            placeholder="Saring log aktivitas berdasarkan aksi, pengirim, atau tipe..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>

        <div className="space-y-3.5 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin">
          {filteredLogs.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              <Terminal className="h-10 w-10 text-slate-200 dark:text-slate-800 mx-auto mb-2 animate-bounce" />
              <p className="font-bold text-sm">Log Tidak Ditemukan</p>
              <p className="text-xs text-slate-500">Lakukan perubahan pada CMS atau ketik kata kunci pencarian yang valid.</p>
            </div>
          ) : (
            filteredLogs.slice().reverse().map((log) => {
              let typeColor = 'bg-sky-500/10 text-sky-500 border-sky-500/20';
              if (log.type === 'admin') typeColor = 'bg-purple-500/10 text-purple-500 border-purple-500/20';
              if (log.type === 'lead') typeColor = 'bg-amber-500/10 text-amber-500 border-amber-500/20 font-bold';
              if (log.type === 'sensor') typeColor = 'bg-rose-500/10 text-rose-500 border-rose-500/20';

              const userIdentifier = log.user || (log.type === 'admin' ? 'admin@jagofarm.com' : 'sistem@jagofarm.com');

              return (
                <div 
                  key={log.id}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200/50 dark:border-slate-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-md text-[9px] font-mono font-bold uppercase border ${typeColor}`}>
                        {log.type}
                      </span>
                      <span className="font-mono text-slate-400 text-[10px]">{log.timestamp}</span>
                    </div>
                    <p className="font-semibold text-slate-700 dark:text-slate-200 text-[13px] leading-relaxed">
                      {log.message}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 self-start sm:self-auto bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 px-3 py-1.5 rounded-xl font-mono text-[10px] text-slate-500 dark:text-slate-400 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                    <span>User: <strong>{userIdentifier}</strong></span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
