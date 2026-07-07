import React, { useState } from 'react';
import { 
  Download, MessageSquare, CheckSquare, Square, Trash2, 
  Clock, ArrowUpRight, Search, Filter 
} from 'lucide-react';
import { useJagoFarm } from '../../context/JagoFarmContext';

interface LeadsTabProps {
  triggerSuccessToast: (msg: string) => void;
}

export default function LeadsTab({ triggerSuccessToast }: LeadsTabProps) {
  const { 
    leads, deleteLead, deleteLeadsBulk, updateLeadStatus 
  } = useJagoFarm();

  const [selectedLeadIds, setSelectedLeadIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [interestFilter, setInterestFilter] = useState('All');

  // Filter leads based on search and interest category
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery);

    const matchesFilter = interestFilter === 'All' || lead.interest === interestFilter;

    return matchesSearch && matchesFilter;
  });

  const handleExportLeadsCSV = () => {
    if (filteredLeads.length === 0) {
      triggerSuccessToast('Tidak ada data leads untuk diekspor.');
      return;
    }
    
    // Create CSV content
    const headers = ['ID', 'Nama', 'Email', 'No. WhatsApp', 'Kategori Ketertarikan', 'Pesan', 'Status', 'Tanggal'];
    const rows = filteredLeads.map(l => [
      l.id,
      `"${l.name.replace(/"/g, '""')}"`,
      `"${l.email.replace(/"/g, '""')}"`,
      `"${l.phone.replace(/"/g, '""')}"`,
      `"${l.interest.replace(/"/g, '""')}"`,
      `"${l.message.replace(/"/g, '""')}"`,
      l.status,
      l.date
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' 
      + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `leads_kontak_jagofarm_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    triggerSuccessToast('Daftar leads kontak berhasil diekspor sebagai CSV!');
  };

  return (
    <div id="tab-content-leads" className="space-y-4 text-left">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="font-display text-sm font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-100">
            Daftar Kontak Prospek B2B & Wholesale
          </h3>
          <p className="text-[10px] text-slate-400">
            Daftar klien yang mengirim formulir melalui popup konsultasi atau kontak.
          </p>
        </div>
        <button
          id="btn-export-leads"
          onClick={handleExportLeadsCSV}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-primary dark:bg-accent text-white dark:text-slate-900 rounded-xl text-[10px] font-bold transition-all cursor-pointer hover:opacity-90 shadow-sm self-start md:self-auto"
        >
          <Download className="h-3 w-3" />
          <span>Ekspor CSV</span>
        </button>
      </div>

      {/* Search & Filter Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl p-3 shadow-xs">
        <div className="sm:col-span-2 relative">
          <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
          <input
            id="leads-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama, email, nomor, atau isi pesan..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-none"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
          <select
            id="leads-filter-select"
            value={interestFilter}
            onChange={(e) => setInterestFilter(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-none cursor-pointer"
          >
            <option value="All">Semua Minat</option>
            <option value="Sistem Bioflok Otomatis">Sistem Bioflok</option>
            <option value="Kemitraan Broiler Pintar">Kemitraan Broiler</option>
            <option value="Wholesale Maggot Kering">Wholesale Maggot</option>
            <option value="Instalasi Reaktor Organik">Reaktor Organik</option>
            <option value="Konsultasi Kustomisasi">Konsultasi Kustom</option>
          </select>
        </div>
      </div>

      {filteredLeads.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-900">
          <MessageSquare className="h-10 w-10 text-slate-300 dark:text-slate-700 mx-auto mb-2" />
          <p className="text-sm text-slate-500 dark:text-slate-400 font-bold">Belum Ada Pengiriman Baru</p>
          <p className="text-xs text-slate-400">Tidak ada data leads yang cocok dengan filter pencarian.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {/* Bulk Selection Header Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl p-4 shadow-xs">
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  if (selectedLeadIds.length === filteredLeads.length) {
                    setSelectedLeadIds([]);
                  } else {
                    setSelectedLeadIds(filteredLeads.map(l => l.id));
                  }
                }}
                className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-accent transition-colors"
              >
                {selectedLeadIds.length === filteredLeads.length && filteredLeads.length > 0 ? (
                  <CheckSquare className="h-4 w-4 text-accent" />
                ) : (
                  <Square className="h-4 w-4 text-slate-400" />
                )}
                <span>Pilih Semua ({filteredLeads.length})</span>
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
          {filteredLeads.map((lead) => (
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
  );
}
