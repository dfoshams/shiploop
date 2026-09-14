import React, { useState } from 'react';
import { 
  X, 
  ExternalLink, 
  ShieldCheck, 
  Search, 
  BookOpen, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useEvidence } from '../context/EvidenceContext';
import { EVIDENCE_REGISTRY, EvidenceType } from '../data/references';

interface SourceDrawerProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const SourceDrawer: React.FC<SourceDrawerProps> = ({ isOpen, onClose }) => {
  const evidenceCtx = useEvidence();
  const isDrawerOpen = isOpen !== undefined ? isOpen : evidenceCtx.isDrawerOpen;
  const closeSource = onClose || evidenceCtx.closeSource;
  const { activeRecord, selectEvidence } = evidenceCtx;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>('ALL');

  if (!isDrawerOpen) return null;

  // Filter evidence list
  const filteredEvidence = EVIDENCE_REGISTRY.filter((item) => {
    const matchesSearch = 
      item.claim.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.topic.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = selectedTypeFilter === 'ALL' || item.evidenceType === selectedTypeFilter;
    return matchesSearch && matchesFilter;
  });

  const getBadgeStyle = (type: EvidenceType) => {
    switch (type) {
      case 'VERIFIED':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
      case 'POLICY':
        return 'text-sky-400 bg-sky-500/10 border-sky-500/30';
      case 'REAL-WORLD REFERENCE':
        return 'text-teal-300 bg-teal-500/10 border-teal-400/30';
      case 'TECHNICAL DATA':
        return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30';
      case 'RESEARCH':
        return 'text-indigo-300 bg-indigo-500/10 border-indigo-400/30';
      case 'INDUSTRY DATA':
      default:
        return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop overlay - clicking closes the drawer */}
      <div 
        onClick={closeSource}
        className="fixed inset-0 bg-[#020617]/75 backdrop-blur-sm transition-opacity duration-300"
      />

      {/* Drawer slide-in panel */}
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
        className="relative w-full sm:w-[440px] max-w-full h-full bg-[#03091e]/98 border-l border-[#00F2FF]/30 shadow-[-15px_0_50px_rgba(0,0,0,0.85),0_0_35px_rgba(0,242,255,0.12)] flex flex-col z-10 overflow-hidden font-mono"
      >
        {/* Top Header Bar */}
        <div className="p-4 sm:p-5 border-b border-white/10 bg-white/[0.02] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#00F2FF]/10 border border-[#00F2FF]/40 text-[#00F2FF]">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="drawer-title" className="text-sm sm:text-base font-black text-white uppercase tracking-wider">
                  EVIDENCE & SOURCES
                </h2>
                <span className="text-[10px] px-1.5 py-0.2 bg-white/5 border border-white/20 text-white/60">
                  {EVIDENCE_REGISTRY.length}
                </span>
              </div>
              <p className="text-[10px] text-white/50">
                Independent public sources & empirical standards
              </p>
            </div>
          </div>

          <button
            onClick={closeSource}
            title="Close (ESC / X)"
            aria-label="Close evidence drawer"
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white/5 hover:bg-white/10 border border-white/20 text-white/70 hover:text-[#00F2FF] text-xs transition-all uppercase tracking-wider"
          >
            <span className="text-[10px] text-white/40 font-mono">[ESC/X]</span>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Distinction Banner */}
        <div className="px-4 py-2 bg-cyan-950/40 border-b border-cyan-500/20 flex items-center justify-between text-[10px] text-cyan-300">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3 h-3 text-[#00F2FF]" />
            <span className="font-bold">EXTERNAL EVIDENCE LAYER</span>
          </span>
          <span className="text-white/40">NO SHIPLOOP SELF-CITATIONS</span>
        </div>

        {/* Scrollable Body Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5 custom-scrollbar">
          
          {/* Active Record Detail View */}
          {activeRecord ? (
            <div className="space-y-4">
              {/* Top Bar for active record */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-[#00F2FF]/15 border border-[#00F2FF]/40 text-[#00F2FF] text-xs font-bold tracking-wider">
                    {activeRecord.id}
                  </span>
                  <span className={`px-2 py-0.5 border text-[10px] font-bold uppercase tracking-wider ${getBadgeStyle(activeRecord.evidenceType)}`}>
                    {activeRecord.evidenceType}
                  </span>
                </div>
                <button
                  onClick={() => selectEvidence('')}
                  className="text-[10px] text-white/50 hover:text-[#00F2FF] underline uppercase tracking-wider"
                >
                  Browse All Sources
                </button>
              </div>

              {/* Topic */}
              <div className="text-[11px] text-white/40 uppercase tracking-widest font-bold">
                {activeRecord.topic}
              </div>

              {/* Claim / Topic Highlight Card */}
              <div className="p-3.5 bg-white/[0.03] border border-white/15 space-y-1.5 tech-corner-accent">
                <div className="text-[9px] text-[#00F2FF] font-bold uppercase tracking-widest">
                  FACTUAL CLAIM / TOPIC
                </div>
                <p className="text-xs sm:text-sm text-white font-normal leading-relaxed">
                  "{activeRecord.claim}"
                </p>
              </div>

              {/* Why this source matters */}
              <div className="p-3.5 bg-cyan-950/20 border border-cyan-500/30 space-y-1.5">
                <div className="text-[9px] text-cyan-400 font-bold uppercase tracking-widest flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#00F2FF]" />
                  <span>WHY THIS SOURCE MATTERS</span>
                </div>
                <p className="text-xs text-slate-300 font-normal leading-relaxed">
                  {activeRecord.explanation}
                </p>
              </div>

              {/* Primary External Source (Source 1) */}
              <div className="p-4 bg-white/[0.02] border border-white/10 space-y-3">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-[10px] font-bold text-white/50 uppercase tracking-wider">
                    PRIMARY SOURCE [01]
                  </span>
                  {activeRecord.date && (
                    <span className="text-[10px] text-white/40">
                      PUB: {activeRecord.date}
                    </span>
                  )}
                </div>

                <div>
                  <div className="text-[11px] font-bold text-[#00F2FF] uppercase tracking-wide">
                    {activeRecord.organization}
                  </div>
                  <h4 className="text-xs sm:text-sm font-medium text-white mt-1 leading-snug">
                    {activeRecord.title}
                  </h4>
                </div>

                <a
                  href={activeRecord.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-between px-3.5 py-2 bg-[#00F2FF] hover:bg-white text-black font-black text-xs transition-all shadow-[0_0_15px_rgba(0,242,255,0.3)] uppercase tracking-wider group"
                >
                  <span>[ VIEW ORIGINAL SOURCE ]</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>

              {/* Additional Sources if available */}
              {activeRecord.additionalSources && activeRecord.additionalSources.length > 0 && (
                <div className="space-y-3">
                  <div className="text-[10px] text-white/40 uppercase tracking-widest font-bold">
                    CORROBORATING EXTERNAL CITATIONS
                  </div>
                  {activeRecord.additionalSources.map((sec, idx) => (
                    <div key={idx} className="p-3 bg-white/[0.02] border border-white/10 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-[#00F2FF]">
                          SOURCE [0{idx + 2}]: {sec.organization}
                        </span>
                        {sec.date && <span className="text-[10px] text-white/40">{sec.date}</span>}
                      </div>
                      <p className="text-xs text-white/90">{sec.title}</p>
                      <a
                        href={sec.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[10px] text-cyan-400 hover:text-white underline uppercase tracking-wider"
                      >
                        <span>View Corroborating Link</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  ))}
                </div>
              )}

              {/* Divider to other evidence items */}
              <div className="pt-3 border-t border-white/10">
                <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-3">
                  EXPLORE OTHER VERIFIED SOURCES
                </div>
                <div className="space-y-2">
                  {EVIDENCE_REGISTRY.filter((e) => e.id !== activeRecord.id).slice(0, 4).map((item) => (
                    <button
                      key={item.id}
                      onClick={() => selectEvidence(item.id)}
                      className="w-full text-left p-2.5 bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-[#00F2FF]/40 transition-all flex items-center justify-between group cursor-pointer"
                    >
                      <div className="truncate pr-2">
                        <div className="flex items-center gap-1.5 text-[10px]">
                          <span className="text-[#00F2FF] font-bold">{item.id}</span>
                          <span className="text-white/40">•</span>
                          <span className="text-white/70 truncate">{item.organization}</span>
                        </div>
                        <div className="text-xs text-white/90 truncate mt-0.5">
                          {item.topic}
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-white/30 group-hover:text-[#00F2FF] group-hover:translate-x-0.5 transition-all shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Index / Full Directory View */
            <div className="space-y-4">
              {/* Search input */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search claims, organizations, standards..."
                  className="w-full bg-white/5 border border-white/15 pl-8 pr-3 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#00F2FF] transition-all"
                />
              </div>

              {/* Type Filter Pills */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {['ALL', 'POLICY', 'REAL-WORLD REFERENCE', 'TECHNICAL DATA', 'RESEARCH', 'INDUSTRY DATA'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedTypeFilter(cat)}
                    className={`px-2 py-0.5 text-[9px] font-bold tracking-wider uppercase transition-all border cursor-pointer ${
                      selectedTypeFilter === cat
                        ? 'bg-[#00F2FF] text-black border-[#00F2FF]'
                        : 'bg-white/5 text-white/60 hover:text-white border-white/10'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* List of Evidence Records */}
              <div className="space-y-2.5">
                {filteredEvidence.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => selectEvidence(item.id)}
                    className="p-3 bg-white/[0.02] hover:bg-white/5 border border-white/10 hover:border-[#00F2FF]/50 transition-all cursor-pointer space-y-2 group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-[#00F2FF] px-1.5 py-0.2 bg-[#00F2FF]/10 border border-[#00F2FF]/30">
                          {item.id}
                        </span>
                        <span className={`text-[9px] px-1.5 py-0.2 border uppercase font-bold ${getBadgeStyle(item.evidenceType)}`}>
                          {item.evidenceType}
                        </span>
                      </div>
                      <span className="text-[10px] text-white/40">{item.organization}</span>
                    </div>

                    <p className="text-xs text-white font-medium line-clamp-2 leading-relaxed">
                      {item.claim}
                    </p>

                    <div className="flex items-center justify-between text-[10px] text-white/50 pt-1 border-t border-white/5">
                      <span className="truncate max-w-[240px] text-cyan-300/80">{item.title}</span>
                      <span className="text-[#00F2FF] group-hover:translate-x-0.5 transition-transform">
                        Inspect →
                      </span>
                    </div>
                  </div>
                ))}
                {filteredEvidence.length === 0 && (
                  <div className="text-center py-8 text-white/40 text-xs">
                    No matching external references found.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Institutional / Structural Methodology Disclaimer */}
          <div className="p-3 bg-white/[0.02] border border-white/10 text-[10px] text-white/50 space-y-1">
            <div className="font-bold text-white/70 uppercase">
              METHODOLOGICAL INTEGRITY & PROPOSAL SEPARATION
            </div>
            <p className="leading-relaxed">
              External sources document established real-world data, regulatory baselines (IMO, MoPSW), and published pilot funds (GCMD Project FEET). All bespoke settlement waterfalls, smart contract protocols, and multi-year savings simulations represent SHIPLOOP's proposed architecture.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-white/10 bg-black/40 text-center text-[10px] text-white/40 shrink-0">
          Press <kbd className="px-1 py-0.5 bg-white/10 border border-white/20 text-white/80">ESC</kbd> or <kbd className="px-1 py-0.5 bg-white/10 border border-white/20 text-white/80">X</kbd> to return
        </div>
      </div>
    </div>
  );
};
