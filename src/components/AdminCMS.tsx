import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Lock, 
  Database, 
  Users, 
  Edit3, 
  Sliders, 
  TrendingUp, 
  Terminal, 
  Trash2, 
  CheckCircle, 
  AlertTriangle, 
  MessageSquare, 
  ArrowUpRight, 
  Plus, 
  RefreshCw, 
  LogOut,
  Save,
  Clock,
  Briefcase,
  Layers,
  Sparkles,
  ChevronDown,
  ChevronRight,
  BarChart3,
  PieChart as LucidePieChart,
  Activity,
  Image as ImageIcon,
  BookOpen,
  Globe,
  Search,
  Download,
  CheckSquare,
  Square
} from 'lucide-react';
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
  Cell, 
  Legend 
} from 'recharts';
import { useJagoFarm } from '../context/JagoFarmContext';

interface AdminCMSProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminCMS({ isOpen, onClose }: AdminCMSProps) {
  const {
    heroTitle, setHeroTitle,
    heroSubtitle, setHeroSubtitle,
    heroImageUrl, setHeroImageUrl,
    metricUptime, setMetricUptime,
    metricCircular, setMetricCircular,
    metricEfficiency, setMetricEfficiency,
    circularTitle, setCircularTitle,
    circularSubtitle, setCircularSubtitle,
    circularStages, setCircularStages,
    freshProducts, setFreshProducts,
    iotModules, setIotModules,
    faqs, setFaqs,
    leads, updateLeadStatus, deleteLead, deleteLeadsBulk,
    seoMetaTitle, setSeoMetaTitle,
    seoMetaDescription, setSeoMetaDescription,
    seoOgImage, setSeoOgImage,
    sensorDO, setSensorDO,
    sensorPH, setSensorPH,
    sensorTempWater, setSensorTempWater,
    sensorTempGreenhouse, setSensorTempGreenhouse,
    isFanOn, setIsFanOn,
    isFeederOn, setIsFeederOn,
    simulationAlert, setSimulationAlert,
    whatsappClicks,
    totalVisitors,
    activityLogs, addActivityLog, clearActivityLogs,
    isAdminAuthenticated, loginAdmin, logoutAdmin
  } = useJagoFarm();

  const [passcode, setPasscode] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [activeTab, setActiveTab] = useState<
    | 'analytics' 
    | 'visitor_analytics' 
    | 'cms_hero' 
    | 'cms_circular' 
    | 'cms_products' 
    | 'cms_faq' 
    | 'cms_seo'
    | 'leads' 
    | 'simulator' 
    | 'logs'
  >('analytics');
  
  // Sidebar Collapsible Sections States
  const [openSections, setOpenSections] = useState({
    analytics: true,
    editor: true,
    feedback: true,
    settings: true
  });

  const toggleSection = (section: 'analytics' | 'editor' | 'feedback' | 'settings') => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Search state for filtering editable sections
  const [cmsSearchQuery, setCmsSearchQuery] = useState('');

  // Bulk selection state for leads feedback
  const [selectedLeadIds, setSelectedLeadIds] = useState<string[]>([]);

  // Editor temporary states to avoid saving on every keystroke (user must click Save)
  const [tempTitle, setTempTitle] = useState(heroTitle);
  const [tempSubtitle, setTempSubtitle] = useState(heroSubtitle);
  const [tempHeroImageUrl, setTempHeroImageUrl] = useState(heroImageUrl);
  const [tempUptime, setTempUptime] = useState(metricUptime);
  const [tempCircular, setTempCircular] = useState(metricCircular);
  const [tempEfficiency, setTempEfficiency] = useState(metricEfficiency);

  // Circular Economy CMS temporary states
  const [tempCircularTitle, setTempCircularTitle] = useState(circularTitle);
  const [tempCircularSubtitle, setTempCircularSubtitle] = useState(circularSubtitle);
  const [tempCircularStages, setTempCircularStages] = useState(circularStages);
  const [editingStageId, setEditingStageId] = useState<string>('maggot');

  // SEO CMS temporary states
  const [tempSeoTitle, setTempSeoTitle] = useState(seoMetaTitle);
  const [tempSeoDescription, setTempSeoDescription] = useState(seoMetaDescription);
  const [tempSeoOgImage, setTempSeoOgImage] = useState(seoOgImage);

  // New FAQ form states
  const [faqQuestion, setFaqQuestion] = useState('');
  const [faqAnswer, setFaqAnswer] = useState('');
  const [faqCategory, setFaqCategory] = useState('Teknologi IoT');

  // Success messages states
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Initialize temp inputs when CMS is opened
  React.useEffect(() => {
    if (isOpen) {
      setTempTitle(heroTitle);
      setTempSubtitle(heroSubtitle);
      setTempHeroImageUrl(heroImageUrl);
      setTempUptime(metricUptime);
      setTempCircular(metricCircular);
      setTempEfficiency(metricEfficiency);
      setTempCircularTitle(circularTitle);
      setTempCircularSubtitle(circularSubtitle);
      setTempCircularStages(circularStages);
      setTempSeoTitle(seoMetaTitle);
      setTempSeoDescription(seoMetaDescription);
      setTempSeoOgImage(seoOgImage);
    }
  }, [isOpen, heroTitle, heroSubtitle, heroImageUrl, metricUptime, metricCircular, metricEfficiency, circularTitle, circularSubtitle, circularStages, seoMetaTitle, seoMetaDescription, seoOgImage]);

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

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(passcode);
    if (success) {
      setLoginError(false);
      setPasscode('');
    } else {
      setLoginError(true);
    }
  };

  const handleSaveHero = () => {
    setHeroTitle(tempTitle);
    setHeroSubtitle(tempSubtitle);
    setHeroImageUrl(tempHeroImageUrl);
    setMetricUptime(tempUptime);
    setMetricCircular(tempCircular);
    setMetricEfficiency(tempEfficiency);
    triggerSuccessToast('Hero Section & Landing Metrics berhasil diperbarui!');
    addActivityLog('Admin memperbarui konten Hero & landing metrics', 'admin', 'admin@jagofarm.com');
  };

  const handleSaveCircular = () => {
    setCircularTitle(tempCircularTitle);
    setCircularSubtitle(tempCircularSubtitle);
    setCircularStages(tempCircularStages);
    triggerSuccessToast('Siklus Melingkar (Circular Economy) berhasil diperbarui!');
    addActivityLog('Admin memperbarui konten Circular Economy & Siklus Tahapan', 'admin', 'admin@jagofarm.com');
  };

  const handleSaveSeo = () => {
    setSeoMetaTitle(tempSeoTitle);
    setSeoMetaDescription(tempSeoDescription);
    setSeoOgImage(tempSeoOgImage);
    triggerSuccessToast('Pengaturan SEO & OpenGraph Meta Tag berhasil diperbarui!');
    addActivityLog('Admin memperbarui pengaturan meta SEO dan OpenGraph', 'admin', 'admin@jagofarm.com');
  };

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

  const handleExportLeadsCSV = () => {
    if (leads.length === 0) {
      triggerSuccessToast('Tidak ada data leads B2B untuk diekspor!');
      return;
    }
    const headers = ['ID', 'Nama', 'Email', 'No Telepon', 'Kategori Pilihan', 'Pesan', 'Tanggal', 'Status'];
    const rows = leads.map(l => [
      l.id,
      `"${l.name.replace(/"/g, '""')}"`,
      l.email,
      l.phone,
      `"${l.interest.replace(/"/g, '""')}"`,
      `"${l.message.replace(/"/g, '""')}"`,
      l.date,
      l.status
    ]);
    const csvContent = "data:text/csv;charset=utf-8," 
      + encodeURIComponent([headers.join(','), ...rows.map(e => e.join(','))].join('\n'));
    
    const link = document.createElement("a");
    link.setAttribute("href", csvContent);
    link.setAttribute("download", `jagofarm_leads_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    triggerSuccessToast('Data Kontak Leads B2B berhasil diekspor ke CSV!');
    addActivityLog('Admin mengekspor data Leads B2B ke CSV', 'admin', 'admin@jagofarm.com');
  };

  const triggerSuccessToast = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  // Add a new custom product (wholesale/B2C) simulator
  const handleAddProduct = () => {
    const id = `prod-${Date.now()}`;
    const newProd = {
      id,
      name: 'Produk Baru JagoFarm',
      category: 'Hasil Panen Sirkular',
      description: 'Deskripsi singkat produk hasil sirkular tanpa limbah JagoFarm.',
      image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&q=80&w=600',
      tags: ['Sirkular', 'Segar']
    };
    setFreshProducts([...freshProducts, newProd]);
    addActivityLog('Admin menambahkan produk panen baru', 'admin');
    triggerSuccessToast('Produk baru berhasil ditambahkan ke Katalog B2C!');
  };

  const handleDeleteProduct = (id: string) => {
    setFreshProducts(freshProducts.filter(p => p.id !== id));
    addActivityLog('Admin menghapus produk panen', 'admin');
    triggerSuccessToast('Produk berhasil dihapus dari Katalog.');
  };

  // Add custom FAQ
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

  const handleSimulateAlarm = (type: string) => {
    if (type === 'oxygen') {
      setSensorDO(2.8); // Dangerously low
      setSimulationAlert('BAHAYA: Kadar oksigen terlarut kolam Bioflok turun drastis di bawah 3.0 mg/L!');
      addActivityLog('Simulasi bahaya diaktifkan: Oksigen Bioflok Kritis!', 'sensor');
    } else if (type === 'temperature') {
      setSensorTempGreenhouse(39.5); // Dangerously high
      setSimulationAlert('BAHAYA: Suhu internal Smart Greenhouse melonjak melewati batas 38°C!');
      addActivityLog('Simulasi bahaya diaktifkan: Suhu Greenhouse Kritis!', 'sensor');
    } else {
      // Clear
      setSensorDO(6.4);
      setSensorTempGreenhouse(28.2);
      setSimulationAlert(null);
      addActivityLog('Sistem dibersihkan, semua indikator sensor kembali normal.', 'system');
    }
  };

  return (
    <div 
      id="admin-cms-page"
      className="min-h-screen w-full bg-slate-100 dark:bg-slate-950 flex flex-col items-center justify-center p-4 sm:p-6 overflow-y-auto"
    >
      <AnimatePresence>
        {successMsg && (
          <motion.div
            id="admin-success-toast"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-6 right-6 z-55 flex items-center gap-2.5 bg-emerald-500 text-white px-5 py-3.5 rounded-2xl shadow-xl border border-emerald-400 font-display text-xs font-bold"
          >
            <CheckCircle className="h-5 w-5" />
            <span>{successMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {!isAdminAuthenticated ? (
        /* Login Card */
        <motion.div 
          id="admin-login-card"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-md p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800 text-left"
        >
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-2.5">
              <div className="h-10 w-10 rounded-xl bg-primary/10 dark:bg-accent/10 flex items-center justify-center text-primary dark:text-accent">
                <Lock className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-lg font-extrabold text-slate-900 dark:text-slate-100">
                  Portal Admin JagoFarm
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Masuk untuk mengedit konten & memantau data
                </p>
              </div>
            </div>
            <button 
              id="close-login"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title="Kembali ke Website"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase font-mono tracking-wider">
                Kata Sandi CMS
              </label>
              <input
                id="admin-passcode-input"
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Masukkan kata sandi default..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-accent font-mono text-sm"
              />
              <span className="text-[10px] text-slate-500 block mt-1.5 leading-relaxed">
                *Gunakan kata sandi default: <strong className="text-accent">admin</strong> atau <strong className="text-accent">1234</strong> untuk keperluan pengujian.
              </span>
            </div>

            {loginError && (
              <div id="login-error-alert" className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-2 text-xs text-red-500">
                <AlertTriangle className="h-4 w-4 shrink-0" />
                <span>Kata sandi salah! Coba gunakan <strong>admin</strong></span>
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button
                id="btn-cancel-login"
                type="button"
                onClick={onClose}
                className="flex-1 py-3 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
              >
                Kembali ke Website
              </button>
              <button
                id="btn-login-submit"
                type="submit"
                className="flex-1 py-3 bg-primary hover:bg-accent text-white dark:bg-accent dark:hover:bg-sky-300 dark:text-slate-900 rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                Masuk CMS
              </button>
            </div>
          </form>
        </motion.div>
      ) : (
        /* Full CMS Dashboard Window */
        <motion.div
          id="admin-dashboard-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 w-full h-full min-h-screen bg-slate-50 dark:bg-slate-950 flex overflow-hidden text-slate-900 dark:text-slate-100 text-left z-50"
        >
          {/* Sidebar */}
          <aside className="w-64 sm:w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-900 flex flex-col shrink-0 h-full">
            {/* Sidebar Logo/Header */}
            <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-900 px-6 py-5">
              <div className="h-9 w-9 rounded-xl bg-accent text-slate-950 flex items-center justify-center font-bold shadow-md shadow-accent/20">
                <Database className="h-4 w-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h2 className="font-display text-xs font-black tracking-tight text-primary dark:text-slate-100">
                    CMS JagoFarm
                  </h2>
                  <span className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-[8px] font-mono font-black uppercase px-1.5 py-0.5 rounded-sm animate-pulse">
                    LIVE
                  </span>
                </div>
                <p className="text-[10px] text-slate-400">
                  Sistem Kontrol & Analitik
                </p>
              </div>
            </div>

            {/* Sidebar Navigators */}
            <nav className="flex-1 px-4 py-6 space-y-4 overflow-y-auto">
              {/* Module 1: Analytics */}
              <div className="space-y-1">
                <button 
                  onClick={() => toggleSection('analytics')}
                  className="w-full flex items-center justify-between px-3 py-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-[10px] font-mono uppercase tracking-wider font-bold cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <TrendingUp className="h-3.5 w-3.5" />
                    Analytics
                  </span>
                  {openSections.analytics ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
                </button>
                {openSections.analytics && (
                  <div className="pl-2 space-y-1">
                    <button
                      id="admin-tab-btn-analytics"
                      onClick={() => setActiveTab('analytics')}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                        activeTab === 'analytics'
                          ? 'bg-accent/10 text-accent font-extrabold'
                          : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <Activity className="h-3.5 w-3.5" />
                      <span>Real-time Monitor</span>
                    </button>
                    <button
                      id="admin-tab-btn-visitor_analytics"
                      onClick={() => setActiveTab('visitor_analytics')}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                        activeTab === 'visitor_analytics'
                          ? 'bg-accent/10 text-accent font-extrabold'
                          : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <BarChart3 className="h-3.5 w-3.5" />
                      <span>Visitor Analytics</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Module 2: Content Editor */}
              <div className="space-y-1">
                <button 
                  onClick={() => toggleSection('editor')}
                  className="w-full flex items-center justify-between px-3 py-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-[10px] font-mono uppercase tracking-wider font-bold cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <Edit3 className="h-3.5 w-3.5" />
                    Content Editor
                  </span>
                  {openSections.editor ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
                </button>
                {openSections.editor && (() => {
                  const cmsSections = [
                    { id: 'cms_hero' as const, label: 'Hero & Metrics', icon: <ImageIcon className="h-3.5 w-3.5" />, keywords: ['hero', 'metrics', 'statistik', 'judul', 'subtitle', 'banner', 'gambar', 'uptime', 'circular', 'efficiency'] },
                    { id: 'cms_circular' as const, label: 'Circular Economy', icon: <Layers className="h-3.5 w-3.5" />, keywords: ['circular', 'economy', 'sirkular', 'siklus', 'tahap', 'eco', 'recycle', 'bsf', 'bioflok', 'greenhouse'] },
                    { id: 'cms_products' as const, label: 'Product Catalog', icon: <Briefcase className="h-3.5 w-3.5" />, keywords: ['product', 'catalog', 'produk', 'katalog', 'panen', 'harga', 'nila', 'melon', 'maggot'] },
                    { id: 'cms_faq' as const, label: 'FAQ Manager', icon: <BookOpen className="h-3.5 w-3.5" />, keywords: ['faq', 'manager', 'tanya', 'jawab', 'help', 'pertanyaan', 'solusi'] },
                    { id: 'cms_seo' as const, label: 'SEO Settings', icon: <Globe className="h-3.5 w-3.5" />, keywords: ['seo', 'meta', 'title', 'description', 'opengraph', 'og', 'search', 'engine', 'optimisasi', 'judul meta'] },
                  ];

                  const filteredSections = cmsSections.filter(sec => {
                    if (!cmsSearchQuery) return true;
                    const query = cmsSearchQuery.toLowerCase();
                    return sec.label.toLowerCase().includes(query) || sec.keywords.some(k => k.toLowerCase().includes(query));
                  });

                  return (
                    <div className="pl-2 space-y-1">
                      {/* Search Bar Input */}
                      <div className="px-2 py-1">
                        <div className="relative">
                          <Search className="absolute left-2.5 top-2.5 h-3 w-3 text-slate-400" />
                          <input
                            type="text"
                            placeholder="Cari section editor..."
                            value={cmsSearchQuery}
                            onChange={(e) => setCmsSearchQuery(e.target.value)}
                            className="w-full pl-7 pr-2.5 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-lg text-[11px] focus:outline-none focus:ring-1 focus:ring-accent placeholder:text-slate-400"
                          />
                          {cmsSearchQuery && (
                            <button
                              onClick={() => setCmsSearchQuery('')}
                              className="absolute right-2 top-2 text-[10px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold"
                            >
                              ✕
                            </button>
                          )}
                        </div>
                      </div>

                      {filteredSections.length === 0 ? (
                        <p className="text-[10px] text-slate-400 pl-3 py-2 italic font-mono">Section tidak ditemukan</p>
                      ) : (
                        filteredSections.map(sec => (
                          <button
                            key={sec.id}
                            id={`admin-tab-btn-${sec.id}`}
                            onClick={() => setActiveTab(sec.id)}
                            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                              activeTab === sec.id
                                ? 'bg-accent/10 text-accent font-extrabold'
                                : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                            }`}
                          >
                            {sec.icon}
                            <span>{sec.label}</span>
                          </button>
                        ))
                      )}
                    </div>
                  );
                })()}
              </div>

              {/* Module 3: User Feedback */}
              <div className="space-y-1">
                <button 
                  onClick={() => toggleSection('feedback')}
                  className="w-full flex items-center justify-between px-3 py-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-[10px] font-mono uppercase tracking-wider font-bold cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5" />
                    User Feedback
                  </span>
                  {openSections.feedback ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
                </button>
                {openSections.feedback && (
                  <div className="pl-2 space-y-1">
                    <button
                      id="admin-tab-btn-leads"
                      onClick={() => setActiveTab('leads')}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                        activeTab === 'leads'
                          ? 'bg-accent/10 text-accent font-extrabold'
                          : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <MessageSquare className="h-3.5 w-3.5" />
                        <span>Lead B2B</span>
                      </div>
                      {leads.length > 0 && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-accent text-slate-900">
                          {leads.length}
                        </span>
                      )}
                    </button>
                  </div>
                )}
              </div>

              {/* Module 4: Settings */}
              <div className="space-y-1">
                <button 
                  onClick={() => toggleSection('settings')}
                  className="w-full flex items-center justify-between px-3 py-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-[10px] font-mono uppercase tracking-wider font-bold cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <Sliders className="h-3.5 w-3.5" />
                    Settings
                  </span>
                  {openSections.settings ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
                </button>
                {openSections.settings && (
                  <div className="pl-2 space-y-1">
                    <button
                      id="admin-tab-btn-simulator"
                      onClick={() => setActiveTab('simulator')}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                        activeTab === 'simulator'
                          ? 'bg-accent/10 text-accent font-extrabold'
                          : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <Sliders className="h-3.5 w-3.5" />
                      <span>IoT Simulator</span>
                    </button>
                    <button
                      id="admin-tab-btn-logs"
                      onClick={() => setActiveTab('logs')}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                        activeTab === 'logs'
                          ? 'bg-accent/10 text-accent font-extrabold'
                          : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <Clock className="h-3.5 w-3.5" />
                      <span>Activity Log</span>
                    </button>
                  </div>
                )}
              </div>
            </nav>

            {/* Quick stats & Actions at bottom of Sidebar */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-900 space-y-3 bg-slate-50/50 dark:bg-slate-950/20">
              <div className="rounded-xl bg-slate-100 dark:bg-slate-950 p-3 text-[11px] space-y-1.5">
                <div className="flex justify-between text-slate-400">
                  <span>Pengunjung:</span>
                  <span className="font-mono font-bold text-slate-700 dark:text-slate-200">{totalVisitors}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>WhatsApp Clicks:</span>
                  <span className="font-mono font-bold text-emerald-500">{whatsappClicks}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  id="btn-sidebar-back"
                  onClick={onClose}
                  className="flex items-center justify-center gap-1 py-2 px-2.5 border border-slate-200 dark:border-slate-800 rounded-xl text-[10px] font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Kembali ke Website JagoFarm"
                >
                  <ArrowUpRight className="h-3 w-3 rotate-225" />
                  <span>Landing</span>
                </button>
                <button
                  id="btn-logout-admin"
                  onClick={logoutAdmin}
                  className="flex items-center justify-center gap-1 py-2 px-2.5 bg-red-500/10 hover:bg-red-500/15 border border-red-500/20 rounded-xl text-[10px] font-bold text-red-500 transition-colors cursor-pointer"
                  title="Log Out dari Admin"
                >
                  <LogOut className="h-3 w-3" />
                  <span>Keluar</span>
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 flex flex-col h-full overflow-hidden bg-slate-50 dark:bg-slate-950">
            {/* Topbar inside workspace */}
            <header className="h-16 border-b border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900 flex items-center justify-between px-6 shrink-0">
              <div className="flex items-center gap-2">
                <h3 className="font-display text-sm font-black uppercase tracking-wider text-slate-800 dark:text-slate-100">
                  {activeTab === 'analytics' && 'Monitoring & Analitik Real-time'}
                  {activeTab === 'visitor_analytics' && 'Analitik Pengunjung & Performa Leads'}
                  {activeTab === 'cms_hero' && 'Content Editor: Hero & Metrics'}
                  {activeTab === 'cms_circular' && 'Content Editor: Circular Economy & Siklus Tahapan'}
                  {activeTab === 'cms_products' && 'Content Editor: Katalog B2C / Grosir'}
                  {activeTab === 'cms_faq' && 'Content Editor: FAQ Tanya Jawab'}
                  {activeTab === 'leads' && `Daftar Hubungi & Lead B2B (${leads.length})`}
                  {activeTab === 'simulator' && 'Simulator Sensor IoT & Alarm'}
                  {activeTab === 'logs' && 'Log Aktivitas Admin (Chronological Audit)'}
                </h3>
              </div>

              {/* Right actions of Topbar */}
              <div className="flex items-center gap-4">
                {simulationAlert && (
                  <div className="hidden md:flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-full text-[10px] font-semibold animate-pulse">
                    <AlertTriangle className="h-3 w-3" />
                    <span>ALARM AKTIF</span>
                  </div>
                )}

                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-mono font-semibold text-slate-400 uppercase tracking-widest hidden sm:inline">
                  Status: Connected
                </span>
                
                {/* Quick back to website btn */}
                <button
                  onClick={onClose}
                  className="flex items-center gap-1 px-3.5 py-1.5 bg-primary hover:bg-accent text-white dark:bg-accent dark:hover:bg-sky-300 dark:text-slate-900 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  <span>Kembali ke Web</span>
                </button>
              </div>
            </header>

            {/* Core Panel Content Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* Tab 1: Visitor Analytics & Monitoring */}
            {activeTab === 'analytics' && (
              <div id="tab-content-analytics" className="space-y-6">
                
                {/* Statistics Grid cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/60 dark:border-slate-900 shadow-xs text-left">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">Total Pengunjung</span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-display text-2xl font-extrabold">{totalVisitors}</span>
                      <span className="text-emerald-500 text-[10px] font-bold font-mono">+12.5%</span>
                    </div>
                    <span className="text-[10px] text-slate-400 block mt-1">Simulasi kunjungan live di session ini</span>
                  </div>

                  <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/60 dark:border-slate-900 shadow-xs text-left">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">Lead Konsultasi B2B</span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-display text-2xl font-extrabold">{leads.length}</span>
                      <span className="text-emerald-500 text-[10px] font-bold font-mono">Konv: {((leads.length / totalVisitors) * 100).toFixed(1)}%</span>
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
                      className="text-[10px] text-slate-400 hover:text-red-400 hover:underline flex items-center gap-1 transition-all"
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
            )}

            {/* Tab: Visitor Analytics */}
            {activeTab === 'visitor_analytics' && (
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
                  <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl p-5 flex items-center justify-between shadow-xs">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase font-mono">Total Kunjungan</span>
                      <p className="text-2xl font-extrabold mt-1 text-slate-800 dark:text-slate-100">{totalVisitors}</p>
                    </div>
                    <div className="p-3 rounded-full bg-sky-500/10 text-sky-500">
                      <TrendingUp className="h-6 w-6" />
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl p-5 flex items-center justify-between shadow-xs">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase font-mono">Lead Konsultasi</span>
                      <p className="text-2xl font-extrabold mt-1 text-emerald-500">{leads.length}</p>
                    </div>
                    <div className="p-3 rounded-full bg-emerald-500/10 text-emerald-500">
                      <Users className="h-6 w-6" />
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl p-5 flex items-center justify-between shadow-xs">
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
                  <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-3xl p-5 shadow-xs">
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
                  <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-3xl p-5 shadow-xs">
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
                  <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-3xl p-5 shadow-xs lg:col-span-2">
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
            )}

            {/* Tab: CMS Hero */}
            {activeTab === 'cms_hero' && (
              <div id="tab-content-cms-hero" className="space-y-6">
                <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-3xl p-5">
                  <div className="flex items-center gap-2 mb-4 border-b border-slate-100 dark:border-slate-800 pb-3">
                    <Sparkles className="h-4 w-4 text-accent" />
                    <h3 className="font-display text-sm font-extrabold uppercase tracking-wider">
                      Ubah Landing Page Hero & Metrics
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase font-mono tracking-wide mb-1">
                        Headline Hero (Judul Utama)
                      </label>
                      <input
                        id="cms-hero-title"
                        type="text"
                        value={tempTitle}
                        onChange={(e) => setTempTitle(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-accent"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase font-mono tracking-wide mb-1">
                        Sub-Headline Hero (Deskripsi Singkat)
                      </label>
                      <textarea
                        id="cms-hero-subtitle"
                        rows={3}
                        value={tempSubtitle}
                        onChange={(e) => setTempSubtitle(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-accent resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase font-mono tracking-wide mb-1">
                        Hero Image URL (Tinggalkan kosong untuk render Interactive 3D Simulation)
                      </label>
                      <input
                        id="cms-hero-image-url"
                        type="text"
                        value={tempHeroImageUrl || ''}
                        onChange={(e) => setTempHeroImageUrl(e.target.value)}
                        placeholder="Contoh: https://images.unsplash.com/photo-1595273670150-db0a3e37d41a?auto=format..."
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-accent"
                      />
                      {tempHeroImageUrl && (
                        <div className="mt-2.5 h-32 w-48 rounded-xl overflow-hidden border border-slate-200/60 relative group">
                          <img 
                            src={tempHeroImageUrl} 
                            alt="Preview Hero" 
                            className="w-full h-full object-cover" 
                            referrerPolicy="no-referrer"
                          />
                          <button 
                            onClick={() => setTempHeroImageUrl('')}
                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors text-[9px] font-bold"
                            title="Hapus Image"
                          >
                            Hapus
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase font-mono tracking-wide mb-1">
                          Metric Sensor Uptime
                        </label>
                        <input
                          id="cms-metric-uptime"
                          type="text"
                          value={tempUptime}
                          onChange={(e) => setTempUptime(e.target.value)}
                          className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-slate-100 focus:outline-none"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase font-mono tracking-wide mb-1">
                          Metric Waste/Circular
                        </label>
                        <input
                          id="cms-metric-circular"
                          type="text"
                          value={tempCircular}
                          onChange={(e) => setTempCircular(e.target.value)}
                          className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-slate-100 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase font-mono tracking-wide mb-1">
                          Metric Efisiensi Pakan
                        </label>
                        <input
                          id="cms-metric-efficiency"
                          type="text"
                          value={tempEfficiency}
                          onChange={(e) => setTempEfficiency(e.target.value)}
                          className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-slate-100 focus:outline-none"
                        />
                      </div>
                    </div>

                    <button
                      id="btn-save-hero-cms"
                      onClick={handleSaveHero}
                      className="w-full py-2.5 bg-primary text-white hover:bg-accent hover:text-slate-950 dark:bg-accent dark:hover:bg-sky-300 dark:text-slate-900 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Save className="h-4 w-4" />
                      <span>Terapkan Perubahan Hero & Landing Metrics</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Tab: CMS Circular Economy */}
            {activeTab === 'cms_circular' && (
              <div id="tab-content-cms-circular" className="space-y-6">
                <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-3xl p-5">
                  <div className="flex items-center gap-2 mb-4 border-b border-slate-100 dark:border-slate-800 pb-3">
                    <Layers className="h-4 w-4 text-accent" />
                    <h3 className="font-display text-sm font-extrabold uppercase tracking-wider">
                      Ubah Siklus Melingkar (Circular Economy)
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase font-mono tracking-wide mb-1">
                          Judul Section Circular Economy
                        </label>
                        <input
                          type="text"
                          value={tempCircularTitle}
                          onChange={(e) => setTempCircularTitle(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase font-mono tracking-wide mb-1">
                          Sub-Judul Section
                        </label>
                        <input
                          type="text"
                          value={tempCircularSubtitle}
                          onChange={(e) => setTempCircularSubtitle(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Stage Selector Grid */}
                    <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
                      <label className="block text-xs font-bold text-slate-500 uppercase font-mono tracking-wide mb-2">
                        Pilih Sektor / Tahapan Siklus untuk Diedit (Real-time CRUD)
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {tempCircularStages.map((stage) => (
                          <button
                            key={stage.id}
                            onClick={() => setEditingStageId(stage.id)}
                            className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                              editingStageId === stage.id
                                ? 'bg-accent/10 border-accent text-slate-900 dark:text-slate-100 font-extrabold'
                                : 'bg-slate-50 dark:bg-slate-950 border-slate-200/80 dark:border-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100'
                            }`}
                          >
                            <span className="text-xl">{stage.emoji}</span>
                            <div className="min-w-0">
                              <p className="text-xs truncate">{stage.name}</p>
                              <p className="text-[9px] text-slate-400 font-mono">Stage ID: {stage.id}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Editing Stage Form Block */}
                    {tempCircularStages.find(s => s.id === editingStageId) && (() => {
                      const currentEditingStage = tempCircularStages.find(s => s.id === editingStageId)!;
                      return (
                        <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-900 space-y-3">
                          <p className="text-xs font-bold text-accent uppercase font-mono">
                            Mengedit Tahap: {currentEditingStage.name} ({currentEditingStage.emoji})
                          </p>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div>
                              <label className="text-[10px] font-bold text-slate-400 uppercase">Nama Tahapan</label>
                              <input
                                type="text"
                                value={currentEditingStage.name}
                                onChange={(e) => {
                                  setTempCircularStages(prev => prev.map(s => s.id === editingStageId ? { ...s, name: e.target.value } : s));
                                }}
                                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] font-bold text-slate-400 uppercase">Emoji Icon</label>
                              <input
                                type="text"
                                value={currentEditingStage.emoji}
                                onChange={(e) => {
                                  setTempCircularStages(prev => prev.map(s => s.id === editingStageId ? { ...s, emoji: e.target.value } : s));
                                }}
                                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] font-bold text-slate-400 uppercase">Image URL Tahap</label>
                              <input
                                type="text"
                                value={currentEditingStage.imageUrl || ''}
                                onChange={(e) => {
                                  setTempCircularStages(prev => prev.map(s => s.id === editingStageId ? { ...s, imageUrl: e.target.value } : s));
                                }}
                                placeholder="https://unsplash..."
                                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="text-[10px] font-bold text-slate-400 uppercase">Input Ekosistem</label>
                              <input
                                type="text"
                                value={currentEditingStage.input}
                                onChange={(e) => {
                                  setTempCircularStages(prev => prev.map(s => s.id === editingStageId ? { ...s, input: e.target.value } : s));
                                }}
                                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] font-bold text-slate-400 uppercase">Output Bernilai</label>
                              <input
                                type="text"
                                value={currentEditingStage.output}
                                onChange={(e) => {
                                  setTempCircularStages(prev => prev.map(s => s.id === editingStageId ? { ...s, output: e.target.value } : s));
                                }}
                                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="text-[10px] font-bold text-slate-400 uppercase">Dampak Efisiensi / Sustainability</label>
                              <input
                                type="text"
                                value={currentEditingStage.efficiency}
                                onChange={(e) => {
                                  setTempCircularStages(prev => prev.map(s => s.id === editingStageId ? { ...s, efficiency: e.target.value } : s));
                                }}
                                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] font-bold text-slate-400 uppercase">Deskripsi Singkat</label>
                              <input
                                type="text"
                                value={currentEditingStage.description}
                                onChange={(e) => {
                                  setTempCircularStages(prev => prev.map(s => s.id === editingStageId ? { ...s, description: e.target.value } : s));
                                }}
                                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="text-[10px] font-bold text-slate-400 uppercase block">Detail Narasi Aliran Energi</label>
                            <textarea
                              rows={2}
                              value={currentEditingStage.details}
                              onChange={(e) => {
                                setTempCircularStages(prev => prev.map(s => s.id === editingStageId ? { ...s, details: e.target.value } : s));
                              }}
                              className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs resize-none"
                            />
                          </div>

                          {currentEditingStage.imageUrl && (
                            <div className="h-28 w-44 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 mt-2">
                              <img src={currentEditingStage.imageUrl} alt="Stage Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            </div>
                          )}
                        </div>
                      );
                    })()}

                    <button
                      id="btn-save-circular-cms"
                      onClick={handleSaveCircular}
                      className="w-full py-2.5 bg-primary text-white hover:bg-accent hover:text-slate-950 dark:bg-accent dark:hover:bg-sky-300 dark:text-slate-900 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Save className="h-4 w-4" />
                      <span>Simpan Seluruh Perubahan Circular Economy</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Tab: CMS Products Catalog */}
            {activeTab === 'cms_products' && (
              <div id="tab-content-cms-products" className="space-y-6">
                <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-900 rounded-3xl p-5">
                  <div className="flex justify-between items-center mb-4 border-b border-slate-100 dark:border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-accent" />
                      <h3 className="font-display text-sm font-extrabold uppercase tracking-wider">
                        Katalog Produk Segar JagoFarm (B2C)
                      </h3>
                    </div>
                    <button
                      id="btn-add-product-cms"
                      onClick={handleAddProduct}
                      className="flex items-center gap-1 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-[10px] font-bold transition-all cursor-pointer"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      <span>Tambah Produk</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {freshProducts.map((p, index) => (
                      <div 
                        key={p.id} 
                        className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-900 flex items-start gap-3 relative"
                      >
                        <img 
                          src={p.image} 
                          alt={p.name} 
                          className="w-16 h-16 rounded-xl object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="space-y-1 flex-1 min-w-0">
                          <span className="text-[9px] font-mono font-bold text-accent bg-accent/10 px-2 py-0.5 rounded-md">
                            {p.category}
                          </span>
                          <input
                            type="text"
                            value={p.name}
                            onChange={(e) => {
                              const updated = [...freshProducts];
                              updated[index].name = e.target.value;
                              setFreshProducts(updated);
                            }}
                            className="font-display text-xs font-bold text-slate-800 dark:text-slate-100 block w-full bg-transparent border-b border-transparent focus:border-slate-400 focus:outline-none"
                          />
                          <input
                            type="text"
                            value={p.description}
                            onChange={(e) => {
                              const updated = [...freshProducts];
                              updated[index].description = e.target.value;
                              setFreshProducts(updated);
                            }}
                            className="text-[10px] text-slate-500 dark:text-slate-400 block w-full bg-transparent border-b border-transparent focus:border-slate-400 focus:outline-none"
                          />
                        </div>
                        <button
                          onClick={() => handleDeleteProduct(p.id)}
                          className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-500/5 transition-all self-start"
                          title="Hapus Produk"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab: CMS FAQ Manager */}
            {activeTab === 'cms_faq' && (
              <div id="tab-content-cms-faq" className="space-y-6">
                <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-900 rounded-3xl p-5">
                  <div className="flex items-center gap-2 mb-4 border-b border-slate-100 dark:border-slate-800 pb-3">
                    <Layers className="h-4 w-4 text-accent" />
                    <h3 className="font-display text-sm font-extrabold uppercase tracking-wider">
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
                          className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs"
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
                          className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs"
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
                        className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs resize-none"
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
                    {faqs.map((f, idx) => (
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
            )}

            {/* Tab: CMS SEO Settings */}
            {activeTab === 'cms_seo' && (
              <div id="tab-content-cms-seo" className="space-y-6">
                <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-900 rounded-3xl p-6 shadow-sm space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                    <div>
                      <h3 className="font-display text-base font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                        <Globe className="h-5 w-5 text-accent" />
                        <span>SEO & Metadata Optimisation</span>
                      </h3>
                      <p className="text-xs text-slate-400 mt-1">
                        Sesuaikan metadata situs Anda untuk meningkatkan visibilitas mesin pencari dan penampilan berbagi tautan media sosial.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left: Input Form */}
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <div className="flex justify-between items-center">
                          <label className="block text-xs font-bold text-slate-500 uppercase font-mono tracking-wide">
                            Meta Title (Judul Situs)
                          </label>
                          <span className={`text-[10px] font-mono ${tempSeoTitle.length > 60 ? 'text-rose-500 font-bold' : 'text-slate-400'}`}>
                            {tempSeoTitle.length}/60 Karakter
                          </span>
                        </div>
                        <input
                          id="cms-seo-title"
                          type="text"
                          value={tempSeoTitle}
                          onChange={(e) => setTempSeoTitle(e.target.value)}
                          placeholder="JagoFarm - Smart Agriculture & Biofloc Circular Aquaculture"
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-slate-100 focus:ring-1 focus:ring-accent focus:outline-none"
                        />
                        <p className="text-[10px] text-slate-400">Direkomendasikan di bawah 60 karakter agar tidak terpotong di Google.</p>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between items-center">
                          <label className="block text-xs font-bold text-slate-500 uppercase font-mono tracking-wide">
                            Meta Description (Deskripsi Ringkas)
                          </label>
                          <span className={`text-[10px] font-mono ${tempSeoDescription.length > 160 ? 'text-rose-500 font-bold' : 'text-slate-400'}`}>
                            {tempSeoDescription.length}/160 Karakter
                          </span>
                        </div>
                        <textarea
                          id="cms-seo-desc"
                          rows={4}
                          value={tempSeoDescription}
                          onChange={(e) => setTempSeoDescription(e.target.value)}
                          placeholder="Tulis ringkasan konten situs JagoFarm..."
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-slate-100 focus:ring-1 focus:ring-accent focus:outline-none resize-none"
                        />
                        <p className="text-[10px] text-slate-400">Direkomendasikan antara 120-160 karakter agar deskripsi tampil utuh di pencarian.</p>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-slate-500 uppercase font-mono tracking-wide">
                          OpenGraph Image URL (Gambar Berbagi Sosial)
                        </label>
                        <input
                          id="cms-seo-og-image"
                          type="text"
                          value={tempSeoOgImage}
                          onChange={(e) => setTempSeoOgImage(e.target.value)}
                          placeholder="https://images.unsplash.com/photo-..."
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-slate-100 focus:ring-1 focus:ring-accent focus:outline-none"
                        />
                        <p className="text-[10px] text-slate-400 font-mono text-slate-400/80">Rasio terbaik 1200x630px untuk WhatsApp, LinkedIn, dan Facebook.</p>
                      </div>

                      <button
                        id="btn-save-seo"
                        onClick={handleSaveSeo}
                        className="w-full py-3 bg-primary text-white hover:bg-accent hover:text-slate-950 dark:bg-accent dark:hover:bg-sky-300 dark:text-slate-900 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md shadow-accent/10"
                      >
                        <Save className="h-4 w-4" />
                        <span>Terapkan Meta SEO & OpenGraph</span>
                      </button>
                    </div>

                    {/* Right: Rich Preview Panels */}
                    <div className="space-y-6 bg-slate-50 dark:bg-slate-950/40 p-5 rounded-2xl border border-slate-100 dark:border-slate-900">
                      <div>
                        <h4 className="text-[11px] font-black uppercase tracking-wider font-mono text-slate-400 mb-3 flex items-center gap-1.5">
                          <span>🔍</span> Simulasi Hasil Google Search (Desktop)
                        </h4>
                        <div className="bg-white dark:bg-slate-900 p-4 border border-slate-200/60 dark:border-slate-800 rounded-xl space-y-1 shadow-sm text-left">
                          <p className="text-[11px] text-slate-400 font-mono truncate">https://jagofarm.com</p>
                          <h5 className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer truncate">
                            {tempSeoTitle || 'JagoFarm - Smart Agriculture & Biofloc Circular Aquaculture'}
                          </h5>
                          <p className="text-[11px] text-slate-600 dark:text-slate-300 line-clamp-2">
                            {tempSeoDescription || 'Integrasi peternakan ayam broiler, budidaya maggot BSF, dan perikanan bioflok menggunakan IoT untuk menciptakan siklus pertanian nol limbah (zero waste).'}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-[11px] font-black uppercase tracking-wider font-mono text-slate-400 mb-3 flex items-center gap-1.5">
                          <span>📱</span> Simulasi Tampilan WhatsApp / Slack Share Link
                        </h4>
                        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
                          {tempSeoOgImage ? (
                            <div className="h-40 w-full overflow-hidden border-b border-slate-100 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 relative">
                              <img 
                                src={tempSeoOgImage} 
                                alt="OG Share Preview" 
                                className="w-full h-full object-cover" 
                                referrerPolicy="no-referrer"
                              />
                            </div>
                          ) : (
                            <div className="h-40 w-full flex flex-col items-center justify-center gap-1.5 bg-slate-100 dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800 text-slate-400">
                              <ImageIcon className="h-8 w-8 text-slate-300 dark:text-slate-700" />
                              <span className="text-[10px] font-mono">Belum ada gambar OG</span>
                            </div>
                          )}
                          <div className="p-3 bg-slate-50 dark:bg-slate-900 border-l-4 border-accent text-left space-y-1">
                            <p className="text-[9px] font-mono uppercase text-slate-400 tracking-wider">JAGOFARM.COM</p>
                            <h6 className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">
                              {tempSeoTitle || 'JagoFarm - Smart Agriculture & Biofloc Circular Aquaculture'}
                            </h6>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2">
                              {tempSeoDescription || 'Integrasi peternakan ayam broiler, budidaya maggot BSF, dan perikanan bioflok menggunakan IoT untuk menciptakan siklus pertanian nol limbah (zero waste).'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Activity Logs Audit Trail */}
            {activeTab === 'logs' && (
              <div id="tab-content-activity-logs" className="space-y-6">
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

                    <button
                      id="btn-clear-audit-logs"
                      onClick={() => {
                        clearActivityLogs();
                        triggerSuccessToast('Seluruh riwayat audit log berhasil dibersihkan!');
                      }}
                      className="px-4 py-2 border border-red-200 hover:bg-red-500/5 rounded-xl text-xs font-bold text-red-500 flex items-center gap-1.5 transition-all cursor-pointer self-start sm:self-auto"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span>Sapu Log Aktivitas</span>
                    </button>
                  </div>

                  <div className="space-y-3.5 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin">
                    {activityLogs.length === 0 ? (
                      <div className="text-center py-16 text-slate-400">
                        <Terminal className="h-10 w-10 text-slate-200 dark:text-slate-800 mx-auto mb-2 animate-bounce" />
                        <p className="font-bold text-sm">Log Kosong</p>
                        <p className="text-xs">Lakukan perubahan pada CMS atau formulir kontak untuk menghasilkan entri log baru.</p>
                      </div>
                    ) : (
                      activityLogs.slice().reverse().map((log) => {
                        let typeColor = 'bg-sky-500/10 text-sky-500 border-sky-500/20';
                        if (log.type === 'admin') typeColor = 'bg-purple-500/10 text-purple-500 border-purple-500/20';
                        if (log.type === 'lead') typeColor = 'bg-amber-500/10 text-amber-500 border-amber-500/20 font-bold';
                        if (log.type === 'sensor') typeColor = 'bg-rose-500/10 text-rose-500 border-rose-500/20';

                        // Extract user identifier or fallback
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
            )}

            {/* Tab 3: Consultation submitted Leads list */}
            {activeTab === 'leads' && (
              <div id="tab-content-leads" className="space-y-4">
                
                <div className="flex justify-between items-center mb-1">
                  <div>
                    <h3 className="font-display text-sm font-extrabold uppercase tracking-wider">
                      Daftar Kontak Prospek B2B & Wholesale
                    </h3>
                    <p className="text-[10px] text-slate-400">Daftar klien yang mengirim formulir melalui popup konsultasi.</p>
                  </div>
                  <button
                    id="btn-export-leads"
                    onClick={handleExportLeadsCSV}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-primary dark:bg-accent text-white dark:text-slate-900 rounded-xl text-[10px] font-bold transition-all cursor-pointer hover:opacity-90 shadow-sm"
                  >
                    <Download className="h-3 w-3" />
                    <span>Ekspor CSV</span>
                  </button>
                </div>

                {leads.length === 0 ? (
                  <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-900">
                    <MessageSquare className="h-10 w-10 text-slate-300 dark:text-slate-700 mx-auto mb-2" />
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-bold">Belum Ada Pengiriman Baru</p>
                    <p className="text-xs text-slate-400">Pengunjung yang mengisi form konsultasi akan muncul di sini secara real-time.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {/* Bulk Selection Header Bar */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl p-4 shadow-xs">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => {
                            if (selectedLeadIds.length === leads.length) {
                              setSelectedLeadIds([]);
                            } else {
                              setSelectedLeadIds(leads.map(l => l.id));
                            }
                          }}
                          className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-accent transition-colors"
                        >
                          {selectedLeadIds.length === leads.length ? (
                            <CheckSquare className="h-4 w-4 text-accent" />
                          ) : (
                            <Square className="h-4 w-4 text-slate-400" />
                          )}
                          <span>Pilih Semua ({leads.length})</span>
                        </button>
                        {selectedLeadIds.length > 0 && (
                          <span className="text-[10px] bg-accent/15 text-accent font-mono font-black px-2.5 py-0.5 rounded-full">
                            {selectedLeadIds.length} Terpilih
                          </span>
                        )}
                      </div>

                      {selectedLeadIds.length > 0 && (
                        <button
                          id="btn-delete-bulk-leads"
                          onClick={() => {
                            deleteLeadsBulk(selectedLeadIds);
                            triggerSuccessToast(`${selectedLeadIds.length} leads berhasil dihapus massal!`);
                            setSelectedLeadIds([]);
                          }}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded-xl text-[11px] font-bold transition-all cursor-pointer shadow-sm"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          <span>Hapus Terpilih ({selectedLeadIds.length})</span>
                        </button>
                      )}
                    </div>

                    {/* Leads List rendering */}
                    {leads.map((lead) => (
                      <div 
                        key={lead.id} 
                        className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-900 rounded-2xl p-5 relative shadow-xs flex items-start gap-4"
                      >
                        {/* Custom Select Checkbox */}
                        <div className="pt-2 self-start flex-shrink-0">
                          <button
                            onClick={() => {
                              if (selectedLeadIds.includes(lead.id)) {
                                setSelectedLeadIds(selectedLeadIds.filter(id => id !== lead.id));
                              } else {
                                setSelectedLeadIds([...selectedLeadIds, lead.id]);
                              }
                            }}
                            className="text-slate-400 hover:text-accent transition-all cursor-pointer"
                          >
                            {selectedLeadIds.includes(lead.id) ? (
                              <CheckSquare className="h-4.5 w-4.5 text-accent" />
                            ) : (
                              <Square className="h-4.5 w-4.5 text-slate-300 dark:text-slate-700" />
                            )}
                          </button>
                        </div>

                        {/* Card Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3 mb-3">
                            <div className="flex items-center gap-2.5">
                              <div className="h-8 w-8 rounded-full bg-accent/15 text-accent flex items-center justify-center font-bold font-mono text-xs uppercase flex-shrink-0">
                                {lead.name.substring(0, 2)}
                              </div>
                              <div className="min-w-0">
                                <h4 className="font-display text-xs sm:text-sm font-extrabold text-slate-800 dark:text-slate-100 truncate">{lead.name}</h4>
                                <p className="text-[10px] text-slate-400 font-mono truncate">{lead.email} | {lead.phone}</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
                              {/* Interest tag */}
                              <span className="text-[9px] font-bold px-2 py-0.5 rounded-md bg-sky-100 dark:bg-sky-950/50 text-sky-800 dark:text-sky-300 border border-sky-200 dark:border-sky-900 whitespace-nowrap">
                                {lead.interest}
                              </span>
                              
                              {/* Status changer */}
                              <select
                                value={lead.status}
                                onChange={(e) => updateLeadStatus(lead.id, e.target.value as any)}
                                className={`text-[9px] font-bold px-2 py-0.5 rounded-md border cursor-pointer focus:outline-none ${
                                  lead.status === 'Unread' 
                                    ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900'
                                    : lead.status === 'Followed Up'
                                    ? 'bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/20 dark:text-sky-400 dark:border-sky-900'
                                    : 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900'
                                }`}
                              >
                                <option value="Unread">Belum Dibaca</option>
                                <option value="Followed Up">Di-Follow Up</option>
                                <option value="Closed">Closed / Deal</option>
                              </select>

                              <button
                                onClick={() => deleteLead(lead.id)}
                                className="p-1 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-500/5 transition-all ml-1 flex-shrink-0"
                                title="Hapus Lead"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <span className="text-[9px] font-mono text-slate-400 block uppercase tracking-wider">Pesan Klien:</span>
                            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-100 dark:border-slate-800 italic font-medium">
                              "{lead.message}"
                            </p>
                          </div>

                          <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono mt-3 pt-2">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5" />
                              {lead.date}
                            </span>
                            <a
                              href={`https://wa.me/${lead.phone.replace(/^0/, '62')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-emerald-500 dark:text-emerald-400 hover:underline flex items-center gap-1 font-bold"
                            >
                              <span>Hubungi via WhatsApp</span>
                              <ArrowUpRight className="h-3 w-3" />
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tab 4: IoT & Alarm Simulator */}
            {activeTab === 'simulator' && (
              <div id="tab-content-simulator" className="space-y-6">
                
                <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-900 rounded-3xl p-5">
                  <div className="flex items-center gap-2 mb-4 border-b border-slate-100 dark:border-slate-800 pb-3">
                    <Sliders className="h-4 w-4 text-accent" />
                    <h3 className="font-display text-sm font-extrabold uppercase tracking-wider">
                      Simulator Telemetri Sensor Lapangan
                    </h3>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                    Gunakan panel ini untuk menguji kepekaan visual dashboard web Anda. Ubah slider di bawah dan lihat sensor di tab <strong>Solusi IoT (IoT Showcase)</strong> diperbarui secara instan.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Water DO slider */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-bold font-mono">
                        <span>Oksigen Terlarut (DO) - Kolam</span>
                        <span className={sensorDO < 4 ? 'text-red-500 font-black' : 'text-sky-500'}>
                          {sensorDO.toFixed(1)} mg/L {sensorDO < 4 ? '(BAHAYA!)' : '(Optimal)'}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        step="0.1"
                        value={sensorDO}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setSensorDO(val);
                          if (val < 4) {
                            setSimulationAlert('BAHAYA: Kadar oksigen terlarut kolam Bioflok turun drastis di bawah 3.0 mg/L!');
                          } else if (sensorTempGreenhouse <= 38) {
                            setSimulationAlert(null);
                          }
                        }}
                        className="w-full h-1.5 bg-slate-200 dark:bg-slate-850 rounded-lg appearance-none cursor-pointer accent-accent"
                      />
                      <span className="text-[10px] text-slate-400 block font-mono">Nilai aman: 5.5 - 8.0 mg/L</span>
                    </div>

                    {/* Water pH slider */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-bold font-mono">
                        <span>Keasaman (pH) Air - Kolam</span>
                        <span className="text-sky-500">{sensorPH.toFixed(2)}</span>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="9"
                        step="0.01"
                        value={sensorPH}
                        onChange={(e) => setSensorPH(Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-200 dark:bg-slate-850 rounded-lg appearance-none cursor-pointer accent-accent"
                      />
                      <span className="text-[10px] text-slate-400 block font-mono">Nilai aman: 6.8 - 8.2 (Ideal: 7.2)</span>
                    </div>

                    {/* Water Temp slider */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-bold font-mono">
                        <span>Suhu Air - Kolam Bioflok</span>
                        <span className="text-sky-500">{sensorTempWater.toFixed(1)}°C</span>
                      </div>
                      <input
                        type="range"
                        min="15"
                        max="35"
                        step="0.1"
                        value={sensorTempWater}
                        onChange={(e) => setSensorTempWater(Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-200 dark:bg-slate-850 rounded-lg appearance-none cursor-pointer accent-accent"
                      />
                      <span className="text-[10px] text-slate-400 block font-mono">Nilai aman: 24.0°C - 29.0°C</span>
                    </div>

                    {/* Greenhouse Temp slider */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-bold font-mono">
                        <span>Suhu Udara - Greenhouse</span>
                        <span className={sensorTempGreenhouse > 35 ? 'text-red-500 font-black' : 'text-emerald-500'}>
                          {sensorTempGreenhouse.toFixed(1)}°C {sensorTempGreenhouse > 35 ? '(KRITIS!)' : '(Optimal)'}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="20"
                        max="45"
                        step="0.1"
                        value={sensorTempGreenhouse}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setSensorTempGreenhouse(val);
                          if (val > 38) {
                            setSimulationAlert('BAHAYA: Suhu internal Smart Greenhouse melonjak melewati batas 38°C!');
                          } else if (sensorDO >= 4) {
                            setSimulationAlert(null);
                          }
                        }}
                        className="w-full h-1.5 bg-slate-200 dark:bg-slate-850 rounded-lg appearance-none cursor-pointer accent-accent"
                      />
                      <span className="text-[10px] text-slate-400 block font-mono">Nilai aman: 24.0°C - 32.0°C</span>
                    </div>

                  </div>

                  {/* Toggle Actuators Manual */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850">
                      <div>
                        <span className="text-xs font-bold block">Status Kipas Angin (Exhaust Fan)</span>
                        <span className="text-[10px] text-slate-400 font-mono">Status saat ini: {isFanOn ? 'AKTIF (Auto)' : 'MATI'}</span>
                      </div>
                      <button
                        id="toggle-fan-simulator"
                        onClick={() => {
                          setIsFanOn(!isFanOn);
                          addActivityLog(`Kipas Angin Greenhouse dipaksa ${!isFanOn ? 'ON' : 'OFF'} oleh admin`, 'admin');
                        }}
                        className={`text-[10px] font-bold font-mono px-3 py-1 rounded-full transition-all cursor-pointer ${
                          isFanOn 
                            ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/10' 
                            : 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                        }`}
                      >
                        {isFanOn ? 'ON' : 'OFF'}
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850">
                      <div>
                        <span className="text-xs font-bold block">Status Dispenser Pakan (AutoFeeder)</span>
                        <span className="text-[10px] text-slate-400 font-mono">Status saat ini: {isFeederOn ? 'STANDBY' : 'MATI'}</span>
                      </div>
                      <button
                        id="toggle-feeder-simulator"
                        onClick={() => {
                          setIsFeederOn(!isFeederOn);
                          addActivityLog(`Dispenser pakan otomatis ${!isFeederOn ? 'AKTIF' : 'MATI'} oleh admin`, 'admin');
                        }}
                        className={`text-[10px] font-bold font-mono px-3 py-1 rounded-full transition-all cursor-pointer ${
                          isFeederOn 
                            ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/10' 
                            : 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                        }`}
                      >
                        {isFeederOn ? 'ON' : 'OFF'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Crisis simulation quick triggers */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-900 rounded-3xl p-5">
                  <h4 className="font-display text-xs font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider mb-4">
                    Trigger Simulasi Skenario Krisis Lapangan (EWS)
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      id="trigger-crisis-oxygen"
                      onClick={() => handleSimulateAlarm('oxygen')}
                      className="p-3.5 rounded-2xl border border-red-200 bg-red-50 hover:bg-red-100 dark:border-red-950 dark:bg-red-950/20 text-red-700 dark:text-red-400 transition-all text-xs font-extrabold flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <AlertTriangle className="h-4.5 w-4.5 shrink-0" />
                      <span>Simulasikan Oksigen Drop</span>
                    </button>

                    <button
                      id="trigger-crisis-temp"
                      onClick={() => handleSimulateAlarm('temperature')}
                      className="p-3.5 rounded-2xl border border-red-200 bg-red-50 hover:bg-red-100 dark:border-red-950 dark:bg-red-950/20 text-red-700 dark:text-red-400 transition-all text-xs font-extrabold flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <AlertTriangle className="h-4.5 w-4.5 shrink-0" />
                      <span>Simulasikan Suhu Panas</span>
                    </button>

                    <button
                      id="trigger-crisis-clear"
                      onClick={() => handleSimulateAlarm('clear')}
                      className="p-3.5 rounded-2xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 dark:border-emerald-950 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 transition-all text-xs font-extrabold flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <CheckCircle className="h-4.5 w-4.5 shrink-0" />
                      <span>Kembalikan ke Normal</span>
                    </button>
                  </div>
                </div>

              </div>
            )}

            </div>

            {/* Footer of the dashboard inside workspace */}
            <footer className="bg-white dark:bg-slate-900 px-6 py-4 border-t border-slate-200 dark:border-slate-900 text-center text-[10px] text-slate-400 font-mono shrink-0">
              <span>Sistem CMS JagoFarm v1.4 | Dirancang khusus untuk Kebutuhan Operasional & Analisis B2B</span>
            </footer>

          </main>

        </motion.div>
      )}
    </div>
  );
}
