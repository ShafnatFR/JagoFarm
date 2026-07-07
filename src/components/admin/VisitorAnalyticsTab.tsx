import React from 'react';
import { BarChart3, Download, TrendingUp, Users, Activity } from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip as RechartsTooltip, 
  CartesianGrid, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { useJagoFarm } from '../../context/JagoFarmContext';

interface VisitorAnalyticsTabProps {
  triggerSuccessToast: (msg: string) => void;
}

export default function VisitorAnalyticsTab({ triggerSuccessToast }: VisitorAnalyticsTabProps) {
  const { totalVisitors, leads, addActivityLog } = useJagoFarm();

  const visitorTrendsData = [
    { time: '00:00', visitors: 12 + Math.floor(totalVisitors * 0.05), pageViews: 24 + Math.floor(totalVisitors * 0.1) },
    { time: '04:00', visitors: 8 + Math.floor(totalVisitors * 0.02), pageViews: 15 + Math.floor(totalVisitors * 0.05) },
    { time: '08:00', visitors: 45 + Math.floor(totalVisitors * 0.15), pageViews: 120 + Math.floor(totalVisitors * 0.3) },
    { time: '12:00', visitors: 78 + Math.floor(totalVisitors * 0.25), pageViews: 210 + Math.floor(totalVisitors * 0.5) },
    { time: '16:00', visitors: 56 + Math.floor(totalVisitors * 0.18), pageViews: 145 + Math.floor(totalVisitors * 0.35) },
    { time: '20:00', visitors: 34 + Math.floor(totalVisitors * 0.12), pageViews: 98 + Math.floor(totalVisitors * 0.2) },
    { time: '24:00', visitors: 15 + Math.floor(totalVisitors * 0.06), pageViews: 40 + Math.floor(totalVisitors * 0.1) },
  ];

  const conversionData = [
    { name: 'Jan', visitors: 120, leads: 15 },
    { name: 'Feb', visitors: 150, leads: 22 },
    { name: 'Mar', visitors: 200, leads: 32 },
    { name: 'Apr', visitors: 280, leads: 48 },
    { name: 'Mei', visitors: 350, leads: 64 },
    { name: 'Jun', visitors: 420 + totalVisitors, leads: 85 + leads.length },
  ];

  const getInterestStats = () => {
    const counts: { [key: string]: number } = {
      'Smart Farming IoT': 12,
      'Kemitraan Ayam': 8,
      'Budidaya Maggot': 15,
      'Distribusi Buah': 6,
    };
    leads.forEach(lead => {
      if (lead.interest) {
        counts[lead.interest] = (counts[lead.interest] || 0) + 1;
      }
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  };

  const interestData = getInterestStats();
  const COLORS = ['#0284c7', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'];

  const handleExportVisitorCSV = () => {
    let csv = "LAPORAN ANALITIK PENGUNJUNG JAGOFARM\n";
    csv += `Waktu Ekspor: ,${new Date().toLocaleString('id-ID')}\n`;
    csv += `Total Pengunjung: ,${totalVisitors}\n`;
    csv += `Total Leads B2B: ,${leads.length}\n`;
    csv += `Tingkat Konversi: ,${totalVisitors > 0 ? ((leads.length / totalVisitors) * 100).toFixed(1) : '14.2'}%\n\n`;

    csv += "TREN KUNJUNGAN HARIAN (PER 4 JAM)\n";
    csv += "Jam,Pengunjung Unik,Page Views\n";
    visitorTrendsData.forEach(row => {
      csv += `${row.time},${row.visitors},${row.pageViews}\n`;
    });

    csv += "\nTREN KONVERSI BULANAN\n";
    csv += "Bulan,Estimasi Pengunjung,Leads Masuk\n";
    conversionData.forEach(row => {
      csv += `${row.name},${row.visitors},${row.leads}\n`;
    });

    csv += "\nDISTRIBUSI KATEGORI MINAT PROSPEK (LEADS)\n";
    csv += "Kategori Minat,Jumlah Inquiries\n";
    interestData.forEach(row => {
      csv += `"${row.name.replace(/"/g, '""')}",${row.value}\n`;
    });

    const csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
    const link = document.createElement("a");
    link.setAttribute("href", csvContent);
    link.setAttribute("download", `jagofarm_analytics_report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    triggerSuccessToast('Laporan Analitik Pengunjung & Konversi berhasil diunduh!');
    addActivityLog('Admin mengekspor Laporan Analitik Pengunjung ke CSV', 'admin', 'admin@jagofarm.com');
  };

  return (
    <div id="tab-content-visitor-analytics" className="space-y-6">
      {/* Export Data CSV Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-3xl p-5 shadow-xs">
        <div>
          <h3 className="font-display text-sm font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <BarChart3 className="h-4.5 w-4.5 text-accent" />
            <span>Visitor Analytics & Performance Metrics</span>
          </h3>
          <p className="text-[10px] text-slate-400 mt-0.5">Analisis tren kunjungan harian, distribusi minat proyek, dan ekspor laporan terperinci.</p>
        </div>
        <button
          id="btn-export-visitor-csv"
          onClick={handleExportVisitorCSV}
          className="flex items-center gap-1.5 px-4 py-2 bg-primary hover:bg-accent text-white dark:bg-accent dark:hover:bg-sky-300 dark:text-slate-900 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm shadow-accent/10 hover:opacity-90 self-start sm:self-auto"
        >
          <Download className="h-4 w-4" />
          <span>Unduh Laporan Analitik (CSV)</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stats Cards */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl p-5 flex items-center justify-between shadow-xs text-left">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase font-mono">Total Kunjungan</span>
            <p className="text-2xl font-extrabold mt-1 text-slate-800 dark:text-slate-100">{totalVisitors}</p>
          </div>
          <div className="p-3 rounded-full bg-sky-500/10 text-sky-500">
            <TrendingUp className="h-6 w-6" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl p-5 flex items-center justify-between shadow-xs text-left">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase font-mono">Lead Konsultasi</span>
            <p className="text-2xl font-extrabold mt-1 text-emerald-500">{leads.length}</p>
          </div>
          <div className="p-3 rounded-full bg-emerald-500/10 text-emerald-500">
            <Users className="h-6 w-6" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl p-5 flex items-center justify-between shadow-xs text-left">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase font-mono">Conversion Rate</span>
            <p className="text-2xl font-extrabold mt-1 text-purple-500">
              {totalVisitors > 0 ? ((leads.length / totalVisitors) * 100).toFixed(1) : '14.2'}%
            </p>
          </div>
          <div className="p-3 rounded-full bg-purple-500/10 text-purple-500">
            <Activity className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Recharts Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart Widget */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-3xl p-5 shadow-xs text-left">
          <h4 className="font-display text-xs font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider mb-4">
            Tren Kunjungan Harian (Per 4 Jam)
          </h4>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={visitorTrendsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVis" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0284c7" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#0284c7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" className="dark:hidden" />
                <XAxis dataKey="time" stroke="#94a3b8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
                <RechartsTooltip contentStyle={{ borderRadius: '12px', fontSize: '11px' }} />
                <Area type="monotone" dataKey="visitors" stroke="#0284c7" strokeWidth={2.5} fillOpacity={1} fill="url(#colorVis)" name="Pengunjung" />
                <Area type="monotone" dataKey="pageViews" stroke="#10b981" strokeWidth={1.5} fillOpacity={0} name="Page Views" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart Widget */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-3xl p-5 shadow-xs text-left">
          <h4 className="font-display text-xs font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider mb-4">
            Konversi Form Konsultasi (6 Bulan Terakhir)
          </h4>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={conversionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" className="dark:hidden" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
                <RechartsTooltip contentStyle={{ borderRadius: '12px', fontSize: '11px' }} />
                <Bar dataKey="visitors" fill="#94a3b8" radius={[4, 4, 0, 0]} opacity={0.3} name="Total Kunjungan" />
                <Bar dataKey="leads" fill="#10b981" radius={[4, 4, 0, 0]} name="Leads Masuk" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart Widget for Popular Interests */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-3xl p-5 shadow-xs lg:col-span-2 text-left">
          <h4 className="font-display text-xs font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider mb-4">
            Kategori Minat Terpopuler (Berdasarkan Leads Klien)
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={interestData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {interestData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip contentStyle={{ borderRadius: '12px', fontSize: '11px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Distribusi Minat Prospek</p>
              <div className="grid grid-cols-2 gap-4">
                {interestData.map((item, idx) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{item.name}</p>
                      <p className="text-[10px] text-slate-400">{item.value} inquiries</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
