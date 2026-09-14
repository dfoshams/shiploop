import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, Check, X, ArrowDown, Sparkles, Layers, ShieldCheck, Activity, Globe2, Compass } from 'lucide-react';

interface FeetStrategicTransitionProps {
  onProceedToComparison?: () => void;
}

export const FeetStrategicTransition: React.FC<FeetStrategicTransitionProps> = ({
  onProceedToComparison
}) => {
  const [showResolution, setShowResolution] = useState<boolean>(true);

  return (
    <div className="w-full rounded-xl bg-gradient-to-b from-slate-900/95 via-slate-950/95 to-slate-900/95 border border-cyan-500/30 p-6 sm:p-10 backdrop-blur-md relative overflow-hidden shadow-2xl">
      {/* Dynamic Background Glow */}
      <div className="absolute inset-0 tech-grid-dense opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        
        {/* Section Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold tracking-wider mb-4 uppercase">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>THE STRUCTURAL BOTTLENECK</span>
        </div>

        {/* The Big Question */}
        <h3 className="text-2xl sm:text-4xl lg:text-5xl font-black font-mono tracking-tight text-white leading-tight">
          "IF THE MECHANISM WORKS..."
        </h3>
        <p className="text-xl sm:text-3xl font-extrabold font-mono text-cyan-400 tracking-tight mt-2 mb-8">
          "...WHY ISN'T IT EVERYWHERE?"
        </p>

        {/* The Triad of What Already Exists */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-left">
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold mb-1">
              <Check className="w-4 h-4" />
              <span>TECHNOLOGY EXISTS</span>
            </div>
            <p className="text-xs text-slate-300 font-mono">
              Rotor sails, air lubrication, wake ducts, and hull coatings deliver 10%–25% validated fuel burn reductions.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-left">
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold mb-1">
              <Check className="w-4 h-4" />
              <span>SAVINGS EXIST</span>
            </div>
            <p className="text-xs text-slate-300 font-mono">
              Avoided bunker fuel costs per deep-sea vessel directly cover amortizing capital expenditure.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-left">
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold mb-1">
              <Check className="w-4 h-4" />
              <span>FINANCING MODEL EXISTS</span>
            </div>
            <p className="text-xs text-slate-300 font-mono">
              FEET validates that off-balance-sheet pay-as-you-save leases can successfully recover debt from verified savings.
            </p>
          </div>
        </div>

        {/* The "BUT" - What Remains Fragmented */}
        <div className="w-full p-4 sm:p-5 rounded-lg bg-red-950/30 border border-red-500/40 text-left mb-8">
          <div className="flex items-center gap-2 text-red-400 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider mb-2">
            <span className="px-2 py-0.5 rounded bg-red-500/20 border border-red-500/50">BUT</span>
            <span>CRITICAL ORCHESTRATION LAYERS REMAIN FRAGMENTED</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3 text-xs font-mono">
            <div className="p-2.5 rounded bg-slate-950/80 border border-white/10">
              <span className="text-white/40 block text-[10px]">OBSTACLE 01</span>
              <span className="text-white font-bold">CAPITAL ACCESS</span>
              <p className="text-[10px] text-white/50 mt-1">Lenders lack maritime telemetry underwriting protocols</p>
            </div>
            <div className="p-2.5 rounded bg-slate-950/80 border border-white/10">
              <span className="text-white/40 block text-[10px]">OBSTACLE 02</span>
              <span className="text-white font-bold">SAVINGS VERIFICATION</span>
              <p className="text-[10px] text-white/50 mt-1">Telemetry and noon-reports rarely connect to bank escrow</p>
            </div>
            <div className="p-2.5 rounded bg-slate-950/80 border border-white/10">
              <span className="text-white/40 block text-[10px]">OBSTACLE 03</span>
              <span className="text-white font-bold">CONTRACT STRUCTURE</span>
              <p className="text-[10px] text-white/50 mt-1">Split incentive unresolved between owners & charterers</p>
            </div>
            <div className="p-2.5 rounded bg-slate-950/80 border border-white/10">
              <span className="text-white/40 block text-[10px]">OBSTACLE 04</span>
              <span className="text-white font-bold">MARKET DEPLOYMENT</span>
              <p className="text-[10px] text-white/50 mt-1">No localized operational execution in emerging hubs like India</p>
            </div>
          </div>
        </div>

        {/* Transition into SHIPLOOP */}
        <div className="w-full flex flex-col items-center">
          <div className="text-base sm:text-xl font-mono font-bold text-white tracking-wide uppercase mb-4">
            THIS IS WHERE SHIPLOOP ENTERS.
          </div>

          {/* Evolution Flow Visual: FEET -> SHIPLOOP */}
          <div className="w-full max-w-3xl p-5 rounded-xl bg-slate-950/90 border border-[#00F2FF]/40 shadow-[0_0_30px_rgba(0,242,255,0.15)] flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
            
            {/* FEET Box */}
            <div className="flex-1 p-4 rounded-lg bg-emerald-950/40 border border-emerald-500/30">
              <div className="flex items-center justify-between text-[10px] font-mono text-emerald-400 mb-1">
                <span>FOUNDATIONAL PROOF</span>
                <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/40">[ VERIFIED ]</span>
              </div>
              <div className="text-lg font-black font-mono text-white">
                FEET
              </div>
              <div className="text-xs text-slate-300 font-mono mt-1">
                Validated Financing Mechanism
              </div>
            </div>

            {/* Connecting Arrow */}
            <div className="flex flex-col items-center text-[#00F2FF] shrink-0">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider mb-1">BUILDS ON</span>
              <ArrowDown className="w-5 h-5 sm:-rotate-90 animate-pulse" />
            </div>

            {/* SHIPLOOP Box */}
            <div className="flex-1 p-4 rounded-lg bg-cyan-950/40 border border-cyan-400/50 ring-1 ring-cyan-400/30">
              <div className="flex items-center justify-between text-[10px] font-mono text-cyan-300 mb-1">
                <span>PROPOSED DEPLOYMENT LAYER</span>
                <span className="px-1.5 py-0.5 rounded bg-cyan-500/20 border border-cyan-400/40">[ PROPOSED ]</span>
              </div>
              <div className="text-lg font-black font-mono text-white flex items-center gap-1.5">
                <span>SHIP<span className="text-[#00F2FF]">LOOP</span></span>
                <Sparkles className="w-4 h-4 text-[#00F2FF]" />
              </div>
              <div className="text-xs text-cyan-200 font-mono mt-1 leading-snug">
                Financing + Verification + Simulation + Monitoring + India Deployment
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
