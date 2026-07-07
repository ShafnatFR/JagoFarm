import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Lock, Database, Users, Edit3, Sliders, TrendingUp, 
  Trash2, CheckCircle, AlertTriangle, MessageSquare, 
  ArrowUpRight, Plus, LogOut, Save, Clock, Briefcase, 
  Layers, Sparkles, ChevronDown, ChevronRight, BarChart3, 
  Activity, Image as ImageIcon, BookOpen, Globe, Search, Download
} from 'lucide-react';
import { useJagoFarm } from '../context/JagoFarmContext';

// Import refactored subcomponents
import AnalyticsTab from './admin/AnalyticsTab';
import VisitorAnalyticsTab from './admin/VisitorAnalyticsTab';
import CmsHeroTab from './admin/CmsHeroTab';
import CmsCircularTab from './admin/CmsCircularTab';
import CmsProductsTab from './admin/CmsProductsTab';
import CmsFaqTab from './admin/CmsFaqTab';
import CmsSeoTab from './admin/CmsSeoTab';
import LeadsTab from './admin/LeadsTab';
import SimulatorTab from './admin/SimulatorTab';
import LogsTab from './admin/LogsTab';

interface AdminCMSProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminCMS({ isOpen, onClose }: AdminCMSProps) {
  const {
    leads,
    totalVisitors,
    whatsappClicks,
    simulationAlert,
    isAdminAuthenticated,
    loginAdmin,
    logoutAdmin
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

  const [cmsSearchQuery, setCmsSearchQuery] = useState('');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const triggerSuccessToast = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

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

  if (!isOpen) return null;

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
                            className="w-full pl-7 pr-2.5 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-lg text-[11px] focus:outline-none focus:ring-1 focus:ring-accent placeholder:text-slate-400 text-slate-900 dark:text-slate-100"
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
                  {activeTab === 'cms_seo' && 'Content Editor: SEO & Metadata'}
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
              {activeTab === 'analytics' && <AnalyticsTab />}
              {activeTab === 'visitor_analytics' && <VisitorAnalyticsTab triggerSuccessToast={triggerSuccessToast} />}
              {activeTab === 'cms_hero' && <CmsHeroTab triggerSuccessToast={triggerSuccessToast} />}
              {activeTab === 'cms_circular' && <CmsCircularTab triggerSuccessToast={triggerSuccessToast} />}
              {activeTab === 'cms_products' && <CmsProductsTab triggerSuccessToast={triggerSuccessToast} />}
              {activeTab === 'cms_faq' && <CmsFaqTab triggerSuccessToast={triggerSuccessToast} />}
              {activeTab === 'cms_seo' && <CmsSeoTab triggerSuccessToast={triggerSuccessToast} />}
              {activeTab === 'leads' && <LeadsTab triggerSuccessToast={triggerSuccessToast} />}
              {activeTab === 'simulator' && <SimulatorTab />}
              {activeTab === 'logs' && <LogsTab triggerSuccessToast={triggerSuccessToast} />}
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
