import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Anchor, Zap, Flame, TrendingDown, ArrowRight, ShieldCheck, Award, Sparkles } from 'lucide-react';

interface FeetCinematicIntroProps {
  isPresentationMode?: boolean;
  replayTrigger?: number;
  isPaused?: boolean;
  onSequenceComplete?: () => void;
}

export const FeetCinematicIntro: React.FC<FeetCinematicIntroProps> = ({
  isPresentationMode = false,
  replayTrigger = 0,
  isPaused = false,
  onSequenceComplete
}) => {
  // Sequence phases:
  // 0: Dark ocean & vessel appears
  // 1: Fuel consumption visualization
  // 2: Retrofit technology installed
  // 3: Energy & fuel savings appear
  // 4: Savings stream becomes debt repayment
  // 5: FEET identity appears -> "FEET PROVES THE MECHANISM" (HOLD)
  const [phase, setPhase] = useState<number>(0);

  useEffect(() => {
    setPhase(0);
  }, [replayTrigger]);

  useEffect(() => {
    if (isPaused) return;

    if (phase < 5) {
      const stepDuration = isPresentationMode ? 2600 : 2200;
      const timer = setTimeout(() => {
        setPhase((p) => {
          const next = p + 1;
          if (next === 5 && onSequenceComplete) {
            onSequenceComplete();
          }
          return next;
        });
      }, stepDuration);
      return () => clearTimeout(timer);
    }
  }, [phase, isPaused, isPresentationMode, onSequenceComplete]);

  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-white/10 bg-[#020617] p-6 sm:p-8 lg:p-10 shadow-2xl">
      {/* Dynamic Deep Ocean Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#030d22] to-[#020617] opacity-90" />
      
      {/* Tech Grid Underlay */}
      <div className="absolute inset-0 tech-grid-dense opacity-20 pointer-events-none" />

      {/* Atmospheric Radar Scan Line */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-25">
        <div className="w-full h-1 bg-gradient-to-r from-transparent via-[#00F2FF] to-transparent animate-pulse" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center">
        
        {/* Real-World Benchmark Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono font-bold tracking-wider mb-6 uppercase">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>[ REAL-WORLD BENCHMARK ]</span>
          <span className="text-white/40">|</span>
          <span className="text-white/70">PROVEN FINANCING LOGIC</span>
        </div>

        {/* Cinematic Stage Area */}
        <div className="w-full max-w-4xl h-72 sm:h-80 relative flex items-center justify-center my-2">
          
          {/* Wave & Sea Baseline Line */}
          <div className="absolute bottom-12 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent">
            <div className="w-full h-full relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00F2FF] to-transparent opacity-50 animate-[dash_4s_linear_infinite]" />
            </div>
          </div>

          {/* Phase 0 & Above: Vessel Representation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ 
              opacity: phase >= 0 ? 1 : 0, 
              scale: phase >= 2 ? 1.02 : 1,
              y: 0 
            }}
            transition={{ duration: 0.8 }}
            className="relative flex flex-col items-center"
          >
            {/* Vessel Silhouette Card */}
            <div className="relative w-64 sm:w-80 h-32 bg-slate-900/90 border border-cyan-500/30 rounded-lg p-3 backdrop-blur-md flex flex-col justify-between shadow-[0_0_30px_rgba(0,242,255,0.15)]">
              
              {/* Vessel Header */}
              <div className="flex items-center justify-between text-[10px] font-mono border-b border-white/10 pb-1.5">
                <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
                  <Anchor className="w-3.5 h-3.5" />
                  <span>COMMERCIAL VESSEL</span>
                </span>
                <span className="text-white/50">IMO VERIFIED FLEET</span>
              </div>

              {/* Vessel Graphic & Hull State */}
              <div className="flex items-center justify-around py-2">
                <div className="text-center">
                  <div className="text-[10px] text-white/50 font-mono">STATUS</div>
                  <div className="text-xs font-mono font-bold text-white">DEEP-SEA SAILING</div>
                </div>

                {/* Phase 2: Retrofit Installed Indicator */}
                {phase >= 2 ? (
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="px-2 py-1 bg-emerald-500/20 border border-emerald-400/50 rounded text-emerald-300 text-[10px] font-mono font-bold flex items-center gap-1"
                  >
                    <Zap className="w-3 h-3 text-emerald-400" />
                    <span>EET RETROFIT ACTIVE</span>
                  </motion.div>
                ) : (
                  <div className="px-2 py-1 bg-white/5 border border-white/10 rounded text-white/40 text-[10px] font-mono">
                    STANDARD HULL
                  </div>
                )}
              </div>

              {/* Dynamic Telemetry Metrics Footer */}
              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono pt-1.5 border-t border-white/10">
                <div>
                  <span className="text-white/40">PROPULSION: </span>
                  <span className={phase >= 2 ? "text-emerald-400 font-bold" : "text-amber-400 font-bold"}>
                    {phase >= 2 ? "-7.2% SHAFT PWR" : "100% BASELOAD"}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-white/40">BUNKER: </span>
                  <span className={phase >= 3 ? "text-emerald-400 font-bold" : "text-amber-400 font-bold"}>
                    {phase >= 3 ? "SAVINGS ACTIVE" : "HIGH BURN"}
                  </span>
                </div>
              </div>
            </div>

            {/* Visual Streams Emitting from Vessel */}
            <div className="w-full flex justify-center mt-4">
              <AnimatePresence>
                {/* Phase 1: Fuel burn indicator */}
                {phase === 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="flex items-center gap-2 px-3 py-1 bg-amber-500/20 border border-amber-500/40 rounded-full text-amber-300 text-xs font-mono"
                  >
                    <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                    <span>DAILY BUNKER CONSUMPTION • ₹15–20 LAKH/DAY DRAINAGE</span>
                  </motion.div>
                )}

                {/* Phase 2: Retrofit Installed */}
                {phase === 2 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 px-3 py-1 bg-cyan-500/20 border border-cyan-500/40 rounded-full text-cyan-300 text-xs font-mono"
                  >
                    <Zap className="w-3.5 h-3.5 text-[#00F2FF]" />
                    <span>AIR LUBRICATION & EFFICIENCY DEVICES INSTALLED</span>
                  </motion.div>
                )}

                {/* Phase 3: Fuel Savings Stream */}
                {phase === 3 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 px-3 py-1 bg-emerald-500/20 border border-emerald-500/40 rounded-full text-emerald-300 text-xs font-mono font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                  >
                    <TrendingDown className="w-3.5 h-3.5 text-emerald-400" />
                    <span>FUEL BURNING REDUCED BY 10%–20% • SURPLUS CASH GENERATED</span>
                  </motion.div>
                )}

                {/* Phase 4: Repayment Stream */}
                {phase === 4 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 px-3 py-1 bg-indigo-500/20 border border-indigo-500/40 rounded-full text-indigo-300 text-xs font-mono font-bold shadow-[0_0_20px_rgba(99,102,241,0.3)]"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />
                    <span>SAVINGS BECOME REPAYMENT STREAM • AMORTIZING DEBT OFF-BALANCE-SHEET</span>
                  </motion.div>
                )}

                {/* Phase 5: FEET Identity Display */}
                {phase >= 5 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-1"
                  >
                    <div className="flex items-center gap-2 px-4 py-1.5 bg-emerald-950/80 border border-emerald-400/60 rounded-full text-emerald-300 text-xs sm:text-sm font-mono font-extrabold tracking-wider shadow-[0_0_25px_rgba(16,185,129,0.4)]">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>THE FEET FINANCING REVOLUTION</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Phase Indicator Stepper Pills */}
        <div className="flex items-center gap-1.5 sm:gap-2 my-4">
          {[
            '01 VESSEL',
            '02 FUEL BURN',
            '03 RETROFIT',
            '04 SAVINGS',
            '05 REPAYMENT',
            '06 FEET PROOF'
          ].map((label, idx) => (
            <button
              key={label}
              onClick={() => setPhase(idx)}
              className={`px-2 py-1 rounded text-[10px] font-mono transition-all ${
                phase === idx 
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-[0_0_10px_rgba(16,185,129,0.5)]' 
                  : phase > idx
                  ? 'bg-emerald-950/60 text-emerald-400/80 border border-emerald-800/50'
                  : 'bg-white/5 text-white/40 border border-white/10'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Main FEET Identity Banner & Strategic Message */}
        <motion.div 
          animate={{ opacity: phase >= 5 ? 1 : 0.85 }}
          className="mt-2 text-center max-w-3xl"
        >
          <div className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white font-mono mb-2">
            FEET
          </div>
          <div className="text-sm sm:text-base text-emerald-400 font-mono tracking-wider font-semibold uppercase mb-4">
            Fund for Energy Efficiency Technologies
          </div>

          {/* Central Strategic Statement (HOLD) */}
          <div className="relative p-4 sm:p-5 rounded-lg bg-slate-900/90 border border-emerald-500/40 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
            <div className="text-lg sm:text-2xl font-bold text-white font-mono tracking-tight">
              "FEET PROVES THE MECHANISM."
            </div>
            <p className="text-xs sm:text-sm text-slate-300 font-mono mt-1.5 leading-relaxed">
              Real-world maritime initiative demonstrating that future fuel savings can be unlocked today to finance 100% of energy efficiency retrofits.
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
};
