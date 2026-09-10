import React from 'react';
import { X, BookOpen, ExternalLink, ShieldCheck, AlertCircle, CheckCircle2 } from 'lucide-react';
import { RESEARCH_REFERENCES } from '../data/references';

interface SourceDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SourceDrawer: React.FC<SourceDrawerProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#020617]/80 backdrop-blur-sm animate-fadeIn">
      
      {/* Drawer Overlay backdrop click */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Slide-out Drawer Panel */}
      <div className="relative z-10 w-full max-w-xl bg-[#020617] border-l border-white/10 h-full overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-6 tech-corner-accent">
        
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white/5 border border-[#00F2FF]/40">
              <BookOpen className="w-5 h-5 text-[#00F2FF]" />
            </div>
            <div>
              <h3 className="text-base font-mono font-black text-white uppercase tracking-wider">RESEARCH VALIDATION & CITATIONS</h3>
              <p className="text-xs text-white/50 font-mono">Academic & industry basis for SHIPLOOP mechanisms</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors border border-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Informational Banner */}
        <div className="p-3.5 bg-white/5 border border-[#FFB347]/40 text-xs font-mono text-[#FFB347] leading-relaxed uppercase tracking-wider">
          <strong>DEMO CITATION LAYER:</strong> External maritime literature and benchmarks referenced throughout the prototype. In the production platform, each data feed will be cryptographically anchored to classification society audits.
        </div>

        {/* References List */}
        <div className="space-y-4">
          {RESEARCH_REFERENCES.map((ref) => {
            return (
              <div key={ref.id} className="p-5 bg-white/[0.02] border border-white/10 space-y-2.5 tech-corner-accent">
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 ${
                    ref.verificationStatus === 'SOURCE VERIFIED'
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      : ref.verificationStatus === 'INDUSTRY BENCHMARK'
                      ? 'bg-[#00F2FF]/10 text-[#00F2FF] border border-[#00F2FF]/40'
                      : 'bg-[#FFB347]/10 text-[#FFB347] border border-[#FFB347]/40'
                  }`}>
                    {ref.verificationStatus}
                  </span>

                  <span className="text-[10px] font-mono text-white/40">{ref.date}</span>
                </div>

                <h4 className="text-sm font-mono font-bold text-white leading-snug">
                  {ref.title}
                </h4>

                <div className="text-xs font-mono text-[#00F2FF]">
                  {ref.organization}
                </div>

                <p className="text-xs text-white/60 font-mono leading-relaxed">
                  {ref.claim}
                </p>

                {ref.url && (
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-mono text-[#00F2FF] hover:underline pt-1"
                  >
                    <span>View Primary Documentation</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            );
          })}
        </div>

        <div className="pt-4 border-t border-white/10 text-center">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-white/5 hover:bg-white/10 text-white font-mono text-xs font-bold transition-colors border border-white/20 uppercase tracking-wider"
          >
            Close Research Drawer
          </button>
        </div>

      </div>
    </div>
  );
};
