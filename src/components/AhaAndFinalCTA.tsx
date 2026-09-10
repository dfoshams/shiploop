import React from 'react';
import { Anchor, Sliders, RefreshCw, Layers, ShieldCheck, ArrowUpRight } from 'lucide-react';

interface AhaAndFinalCTAProps {
  onGoToSimulator: () => void;
  onGoToEngine: () => void;
  onRestart: () => void;
  onOpenSources: () => void;
  isPresentationMode?: boolean;
  replayTrigger?: number;
  isPaused?: boolean;
}

export const AhaAndFinalCTA: React.FC<AhaAndFinalCTAProps> = ({
  onGoToSimulator,
  onGoToEngine,
  onRestart,
  onOpenSources,
  isPresentationMode = false,
}) => {
  return (
    <section 
      id="aha-cta" 
      className={`${
        isPresentationMode 
          ? 'w-full h-full flex flex-col justify-center py-6 px-4 sm:px-8 max-w-5xl mx-auto overflow-y-auto select-text text-center' 
          : 'py-32 bg-[#020617] border-t border-white/10 relative overflow-hidden text-center'
      }`}
    >
      
      {/* Background Radial Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#00F2FF]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className={`${isPresentationMode ? 'w-full space-y-8 relative z-10' : 'max-w-4xl mx-auto px-4 sm:px-6 relative z-10 space-y-16'}`}>
        
        {/* THE "AHA" REVELATION */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/20 text-[#00F2FF] text-xs font-mono tracking-widest uppercase">
            <Anchor className="w-3.5 h-3.5 text-[#00F2FF]" />
            <span>11 // THE CORE THESIS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white font-mono tracking-tight leading-tight uppercase">
            THE VESSEL DOES NOT NEED TO DELAY UNTIL BALANCE SHEETS PERMIT.
          </h2>

          <div className="py-2">
            <h3 className="text-2xl sm:text-4xl lg:text-5xl font-black font-mono tracking-tight text-[#00F2FF] uppercase underline decoration-[#00F2FF]/40">
              THE VERIFIED SAVINGS FINANCE THE CONVERSION.
            </h3>
          </div>
        </div>

        {/* SHIPLOOP SIGNATURE CARD */}
        <div className="p-8 sm:p-10 bg-white/[0.02] border border-white/10 shadow-2xl backdrop-blur-xl space-y-6 tech-corner-accent">
          
          <div className="space-y-2">
            <div className="text-3xl sm:text-4xl font-black font-mono text-white tracking-wider uppercase">
              FINANCE THE TRANSITION.<br />
              <span className="text-[#00F2FF]">FROM THE ENERGY IT SAVES.</span>
            </div>
            <p className="text-xs sm:text-sm font-mono text-white/50 tracking-widest uppercase">
              SHIPLOOP // MARITIME ENERGY • FINANCE • VERIFIED SAVINGS
            </p>
          </div>

          {/* Action Button Row */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              id="btn-cta-simulator"
              onClick={onGoToSimulator}
              className="flex items-center gap-2 px-6 py-3.5 bg-[#00F2FF] hover:bg-[#00F2FF]/80 text-[#020617] font-mono font-black text-xs tracking-wider shadow-[0_0_25px_rgba(0,242,255,0.4)] transition-all uppercase"
            >
              <Sliders className="w-4 h-4" />
              <span>RUN ANOTHER SIMULATION</span>
            </button>

            <button
              id="btn-cta-engine"
              onClick={onGoToEngine}
              className="flex items-center gap-2 px-6 py-3.5 bg-[#020617] hover:bg-white/10 text-[#00F2FF] border border-[#00F2FF]/40 font-mono font-bold text-xs tracking-wider transition-all uppercase"
            >
              <Layers className="w-4 h-4" />
              <span>VIEW THE MODEL</span>
            </button>

            <button
              id="btn-cta-restart"
              onClick={onRestart}
              className="flex items-center gap-2 px-6 py-3.5 bg-[#020617] hover:bg-white/10 text-white/80 border border-white/20 font-mono text-xs tracking-wider transition-all uppercase"
            >
              <RefreshCw className="w-4 h-4" />
              <span>RESTART TERMINAL</span>
            </button>
          </div>

          {/* Academic Prototype Disclaimer */}
          <div className="pt-6 border-t border-white/10 max-w-2xl mx-auto">
            <p className="text-[11px] font-mono text-white/40 leading-relaxed uppercase">
              <strong>DEMONSTRATION PROTOTYPE:</strong> Developed for university innovation showcase. Financial underwriting models, equipment performance metrics, and policy linkages use simulated figures for architectural demonstration. Real-world commercial deployment requires independent Class audits and bilateral lending agreements.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
