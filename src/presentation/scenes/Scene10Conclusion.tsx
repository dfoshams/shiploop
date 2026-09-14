import React from 'react';
import { Sparkles, RotateCcw, Compass, BookOpen, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { usePresentation } from '../PresentationContext';

interface Scene10ConclusionProps {
  onOpenSources?: () => void;
}

export const Scene10Conclusion: React.FC<Scene10ConclusionProps> = ({ onOpenSources }) => {
  const { restartPresentation, exitPresentationMode } = usePresentation();

  const stakeholders = [
    {
      actor: 'COMMERCIAL BANKS',
      win: 'High-yield green debt asset secured by verified physical savings, ring-fenced escrow, and 6-mo DSRF.',
      tag: 'SENIOR SECURED',
    },
    {
      actor: 'SHIPOWNERS',
      win: 'Modernizes and de-risks fleet compliance (CII Rating Tier A) with zero upfront equity or balance sheet impairment.',
      tag: 'ZERO CAPEX',
    },
    {
      actor: 'TIME CHARTERERS',
      win: 'Immediately cuts operating bunker fuel expenses by millions per voyage, increasing commercial freight competitiveness.',
      tag: 'LOWER OPEX',
    },
    {
      actor: 'MARITIME CORRIDORS',
      win: 'Direct megaton carbon abatement aligned with IMO Net-Zero 2050 and India Maritime Vision 2030.',
      tag: 'CLEAN OCEANS',
    },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 sm:p-10 max-w-7xl mx-auto font-mono">
      
      {/* Top Scene Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-[#00F2FF] rotate-45" />
          <div>
            <span className="text-xs text-[#00F2FF] font-bold tracking-widest uppercase">
              CHAPTER 08 // FINAL SYNTHESIS
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight uppercase">
              THE VERDICT: ZERO-EQUITY DECARBONIZATION
            </h1>
          </div>
        </div>

        <div className="px-3 py-1 bg-[#00F2FF]/10 border border-[#00F2FF]/40 text-[#00F2FF] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>PROVEN ARCHITECTURE</span>
        </div>
      </div>

      {/* Main Grid: 4 Stakeholder Wins */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-auto">
        {stakeholders.map((s) => (
          <div
            key={s.actor}
            className="p-6 bg-white/[0.02] border border-white/10 tech-corner-accent shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] text-white/40 uppercase font-bold">STAKEHOLDER</span>
                <span className="text-[9px] px-2 py-0.5 border border-[#00F2FF]/30 text-[#00F2FF] font-bold uppercase">
                  {s.tag}
                </span>
              </div>

              <div className="text-base font-black text-white tracking-tight uppercase mb-2">
                {s.actor}
              </div>

              <p className="text-xs text-white/60 leading-relaxed font-normal">
                {s.win}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 text-[10px] text-emerald-400 font-bold uppercase flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>Verified Structural Win</span>
            </div>
          </div>
        ))}
      </div>

      {/* Presenter Action Bar */}
      <div 
        onClick={(e) => e.stopPropagation()} // Prevent advance when clicking action buttons
        className="p-5 bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs"
      >
        <div>
          <span className="text-white font-bold block text-sm">PRESENTATION COMPLETE</span>
          <span className="text-white/50 text-xs">Explore interactive models freely or review academic citations.</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Restart Presentation */}
          <button
            onClick={restartPresentation}
            className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/20 text-white font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all"
            title="Restart Presentation from Beginning"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#00F2FF]" />
            <span>RESTART (R)</span>
          </button>

          {/* Research Sources */}
          {onOpenSources && (
            <button
              onClick={onOpenSources}
              className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/20 text-white font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all"
              title="Inspect Research References"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#FFB347]" />
              <span>RESEARCH SOURCES</span>
            </button>
          )}

          {/* Enter Exploration Mode */}
          <button
            onClick={exitPresentationMode}
            className="px-5 py-2.5 bg-[#00F2FF] hover:bg-[#00F2FF]/90 text-black font-black uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all shadow-[0_0_20px_rgba(0,242,255,0.4)]"
            title="Switch to Exploration Mode for normal website browsing"
          >
            <Compass className="w-4 h-4" />
            <span>EXPLORATION MODE →</span>
          </button>
        </div>
      </div>

    </div>
  );
};
