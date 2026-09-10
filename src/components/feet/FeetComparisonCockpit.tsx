import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  ShieldCheck, 
  Globe2, 
  Layers, 
  ArrowRight,
  Sliders
} from 'lucide-react';
import { COMPARISON_DIMENSIONS, ComparisonDimension } from '../../data/feetData';

interface FeetComparisonCockpitProps {
  isPresentationMode?: boolean;
}

export const FeetComparisonCockpit: React.FC<FeetComparisonCockpitProps> = ({
  isPresentationMode = false
}) => {
  const [selectedDimensionIndex, setSelectedDimensionIndex] = useState<number>(0);
  const [viewAll, setViewAll] = useState<boolean>(false);

  const currentDim = COMPARISON_DIMENSIONS[selectedDimensionIndex];

  const handleNext = () => {
    setSelectedDimensionIndex((prev) => (prev + 1) % COMPARISON_DIMENSIONS.length);
  };

  const handlePrev = () => {
    setSelectedDimensionIndex((prev) => (prev - 1 + COMPARISON_DIMENSIONS.length) % COMPARISON_DIMENSIONS.length);
  };

  return (
    <div className="w-full rounded-xl bg-[#020617] border border-white/10 p-6 sm:p-8 backdrop-blur-md relative overflow-hidden shadow-2xl">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header & Distinction Legend */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
              INTERACTIVE ARCHITECTURE COCKPIT
            </span>
            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/70 text-[10px] font-mono">
              10 DIMENSIONS
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-mono text-white mt-1">
            FEET <span className="text-white/40">vs</span> SHIPLOOP
          </h3>
        </div>

        {/* Four-Element Visual Legend */}
        <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono bg-white/[0.03] p-2 rounded-lg border border-white/10">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            <span className="text-emerald-300 font-semibold">VERIFIED / REAL-WORLD</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
            <span className="text-amber-300 font-semibold">TARGET</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,242,255,0.8)]" />
            <span className="text-cyan-300 font-semibold">PROPOSED</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.8)]" />
            <span className="text-indigo-300 font-semibold">SIMULATION</span>
          </div>
        </div>
      </div>

      {/* Strongest Statement Banner */}
      <div className="my-5 p-3.5 rounded-lg bg-slate-900/90 border border-cyan-500/30 text-center">
        <span className="text-xs sm:text-sm font-mono font-bold text-white tracking-wide">
          "FEET VALIDATES THE FINANCING LOGIC. SHIPLOOP BUILDS THE DEPLOYMENT EXPERIENCE."
        </span>
      </div>

      {/* Navigation Controls for Dimension Stepping */}
      <div className="flex items-center justify-between gap-2 mb-6">
        <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none max-w-[85vw] sm:max-w-none">
          {COMPARISON_DIMENSIONS.map((dim, idx) => (
            <button
              key={dim.id}
              onClick={() => setSelectedDimensionIndex(idx)}
              className={`px-2.5 py-1 rounded text-[10px] font-mono tracking-wider shrink-0 transition-all ${
                selectedDimensionIndex === idx
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_12px_rgba(0,242,255,0.4)]'
                  : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              {dim.number} {dim.title}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={handlePrev}
            className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10"
            title="Previous Dimension"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10"
            title="Next Dimension"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Two Large Vertical Panels (Side-by-Side) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative">
        
        {/* LEFT PANEL: FEET (REAL-WORLD BENCHMARK) */}
        <div className="rounded-xl p-6 sm:p-7 bg-slate-950/90 border border-emerald-500/40 relative overflow-hidden flex flex-col justify-between shadow-[0_0_30px_rgba(16,185,129,0.15)]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

          <div>
            {/* Panel Brand & Role Banner */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
              <div>
                <div className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-widest">
                  GLOBAL INITIATIVE
                </div>
                <div className="text-2xl sm:text-3xl font-black font-mono text-white tracking-tight">
                  FEET
                </div>
              </div>
              <span className="px-2.5 py-1 rounded bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 text-[10px] font-mono font-extrabold tracking-wider">
                [ REAL-WORLD BENCHMARK ]
              </span>
            </div>

            {/* Current Dimension Detail */}
            <div className="space-y-4">
              <div className="text-[11px] font-mono text-white/50 uppercase tracking-widest flex items-center justify-between">
                <span>DIMENSION {currentDim.number} OF 10</span>
                <span className="text-emerald-400 font-bold">{currentDim.title}</span>
              </div>

              <div className="p-4 rounded-lg bg-slate-900/90 border border-emerald-500/30">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-base sm:text-lg font-bold font-mono text-white">
                    {currentDim.feet.title}
                  </div>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    [ {currentDim.feet.statusBadge} ]
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 font-mono leading-relaxed">
                  {currentDim.feet.description}
                </p>
              </div>
            </div>
          </div>

          {/* Verification Footnote */}
          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/50">
            <span>AUDIT STATUS: REAL-WORLD DATA</span>
            <span className="text-emerald-400 font-bold">PROVES THE CORE MECHANISM</span>
          </div>
        </div>

        {/* RIGHT PANEL: SHIPLOOP (PROPOSED INDIA DEPLOYMENT) */}
        <div className="rounded-xl p-6 sm:p-7 bg-slate-950/90 border border-cyan-400/50 relative overflow-hidden flex flex-col justify-between shadow-[0_0_30px_rgba(0,242,255,0.15)] ring-1 ring-cyan-400/30">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

          <div>
            {/* Panel Brand & Role Banner */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
              <div>
                <div className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-widest">
                  PLATFORM ORCHESTRATION
                </div>
                <div className="text-2xl sm:text-3xl font-black font-mono text-white tracking-tight">
                  SHIP<span className="text-[#00F2FF]">LOOP</span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 text-[10px] font-mono font-extrabold tracking-wider">
                [ PROPOSED INDIA MODEL ]
              </span>
            </div>

            {/* Current Dimension Detail */}
            <div className="space-y-4">
              <div className="text-[11px] font-mono text-white/50 uppercase tracking-widest flex items-center justify-between">
                <span>DIMENSION {currentDim.number} OF 10</span>
                <span className="text-cyan-400 font-bold flex items-center gap-1">
                  <span>{currentDim.shiploop.verb}</span>
                  <span className="text-white/40">FEET</span>
                </span>
              </div>

              <div className="p-4 rounded-lg bg-slate-900/90 border border-cyan-500/40">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-base sm:text-lg font-bold font-mono text-white">
                    {currentDim.shiploop.title}
                  </div>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 font-bold">
                    [ PROPOSED ]
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 font-mono leading-relaxed">
                  {currentDim.shiploop.description}
                </p>
              </div>
            </div>
          </div>

          {/* Respectful Evolution Footnote */}
          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/50">
            <span>DEPLOYMENT STATUS: PROPOSED ARCHITECTURE</span>
            <span className="text-cyan-400 font-bold">BUILDS THE DEPLOYMENT LAYER</span>
          </div>
        </div>

      </div>

      {/* Toggle to View Full 10 Dimensions in Quick Matrix View */}
      <div className="mt-6 pt-4 border-t border-white/10 text-center">
        <button
          onClick={() => setViewAll(!viewAll)}
          className="text-xs font-mono text-cyan-400 hover:text-white transition-colors underline cursor-pointer"
        >
          {viewAll ? 'HIDE FULL DIMENSION MATRIX' : 'EXPAND ALL 10 COMPARISON DIMENSIONS'}
        </button>

        {viewAll && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-4 text-left grid grid-cols-1 md:grid-cols-2 gap-3"
          >
            {COMPARISON_DIMENSIONS.map((d) => (
              <div 
                key={d.id} 
                onClick={() => {
                  setSelectedDimensionIndex(parseInt(d.number, 10) - 1);
                }}
                className="p-3 rounded bg-slate-950/80 border border-white/10 hover:border-cyan-500/40 cursor-pointer text-xs font-mono"
              >
                <div className="flex items-center justify-between text-[10px] text-white/50 mb-1">
                  <span>{d.number} {d.title}</span>
                  <span className="text-cyan-400">{d.shiploop.verb}</span>
                </div>
                <div className="text-white font-semibold mb-1 truncate">
                  FEET: {d.feet.title}
                </div>
                <div className="text-cyan-300 truncate">
                  SHIPLOOP: {d.shiploop.title}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>

    </div>
  );
};
