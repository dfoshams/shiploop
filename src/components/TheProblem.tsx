import React, { useState, useEffect } from 'react';
import { AlertTriangle, ArrowDown, DollarSign, Fuel, Lock, TrendingDown, HelpCircle, Flame } from 'lucide-react';

interface TheProblemProps {
  isPresentationMode?: boolean;
  replayTrigger?: number;
  isPaused?: boolean;
}

export const TheProblem: React.FC<TheProblemProps> = ({
  isPresentationMode = false,
  replayTrigger = 0,
  isPaused = false,
}) => {
  const [activeBarrier, setActiveBarrier] = useState<number>(0);

  // Replay trigger resets active barrier
  useEffect(() => {
    setActiveBarrier(0);
  }, [replayTrigger]);

  // Auto-cycle barriers in presentation mode if not paused
  useEffect(() => {
    if (!isPresentationMode || isPaused) return;
    const interval = setInterval(() => {
      setActiveBarrier((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPresentationMode, isPaused]);

  const barriers = [
    {
      title: 'HIGH UPFRONT CAPEX',
      metric: '₹8 – 20 Cr',
      metricSecondary: '($1.0M – $2.4M USD)',
      subtitle: 'Balance Sheet Gridlock',
      desc: 'Shipowners operate in volatile freight cycles and cannot lock tens of crores in discretionary hull, propulsion, or wind assist hardware with cash on hand.',
      icon: DollarSign,
      color: 'from-rose-500/20 to-amber-500/10',
      borderColor: 'border-rose-500/40',
      accentColor: 'text-rose-400',
    },
    {
      title: 'UNCERTAIN PAYBACK',
      metric: '3 – 7 YRS',
      subtitle: 'Performance & Fuel Risk',
      desc: 'Commercial banks refuse to finance energy efficiency hardware because maritime fuel savings fluctuate with ocean currents, weather, hull fouling, and bunker prices.',
      icon: AlertTriangle,
      color: 'from-amber-500/20 to-orange-500/10',
      borderColor: 'border-amber-500/40',
      accentColor: 'text-amber-400',
    },
    {
      title: '',
      metric: 'SPLIT INCENTIVE',
      subtitle: 'Split Incentive Dilemma',
      desc: 'Under Time Charters, charterers pay the bunker bill while owners pay the retrofit capex. Owners have zero financial incentive to reduce fuel they do not purchase.',
      icon: Lock,
      color: 'from-cyan-500/20 to-blue-500/10',
      borderColor: 'border-cyan-500/40',
      accentColor: 'text-cyan-400',
    },
  ];

  return (
    <section 
      id="problem" 
      className={`${
        isPresentationMode 
          ? 'w-full h-full flex flex-col justify-between py-4 sm:py-6 px-4 sm:px-8 max-w-7xl mx-auto overflow-y-auto lg:overflow-hidden select-text' 
          : 'py-24 bg-[#020617] border-t border-white/10 relative overflow-hidden'
      }`}
    >
      <div className={`${isPresentationMode ? 'w-full' : 'max-w-7xl mx-auto px-4 sm:px-6 relative z-10'}`}>
        
        {/* Section Header */}
        <div className={`max-w-3xl ${isPresentationMode ? 'mb-6' : 'mb-16'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-rose-500/40 text-rose-400 text-xs font-mono mb-2 tracking-widest uppercase">
            <Flame className="w-3.5 h-3.5 text-rose-400" />
            <span>01 // THE MARITIME CAPEX IMPASSE</span>
          </div>

          <h2 className={`${isPresentationMode ? 'text-2xl sm:text-4xl' : 'text-3xl sm:text-5xl'} font-black text-white font-mono tracking-tight leading-tight uppercase`}>
            SHIPPING HAS A GREEN CAPITAL BOTTLENECK.
          </h2>

          <p className={`${isPresentationMode ? 'text-xs sm:text-sm mt-2' : 'text-base sm:text-lg mt-4'} text-white/60 font-mono font-normal`}>
            The engineering solutions already exist. Rotor sails, air lubrication, and high-efficiency hydrodynamics are proven. The failure is <span className="text-[#00F2FF] underline decoration-[#00F2FF]/40">how maritime retrofits are underwritten and financed</span>.
          </p>
        </div>

        {/* 3 Giant Metric Barrier Blocks */}
        <div className={`grid grid-cols-1 md:grid-cols-3 ${isPresentationMode ? 'gap-3 mb-4' : 'gap-6 mb-16'}`}>
          {barriers.map((b, idx) => {
            const Icon = b.icon;
            const isSelected = activeBarrier === idx;
            return (
              <div
                key={b.title || b.metric}
                onClick={() => setActiveBarrier(idx)}
                className={`p-4 sm:p-6 bg-white/[0.02] border ${
                  isSelected ? `border-[#00F2FF] shadow-[0_0_15px_rgba(0,242,255,0.2)] bg-[#00F2FF]/5` : 'border-white/10'
                } cursor-pointer transition-all duration-200 tech-corner-accent`}
              >
                <div className="flex items-center justify-between mb-2 sm:mb-4">
                  <span className={`text-xs font-mono font-bold tracking-wider ${b.accentColor}`}>
                    0{idx + 1} // BARRIER
                  </span>
                  <div className="p-1.5 sm:p-2 bg-[#020617] border border-white/10">
                    <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${b.accentColor}`} />
                  </div>
                </div>

                <div className={`${isPresentationMode ? 'text-2xl sm:text-3xl' : 'text-3xl sm:text-4xl'} font-mono font-black text-white tracking-tight mb-1 flex flex-wrap items-baseline gap-x-2`}>
                  <span>{b.metric}</span>
                  {b.metricSecondary && (
                    <span className="text-sm sm:text-base font-semibold text-white/60">
                      {b.metricSecondary}
                    </span>
                  )}
                </div>

                {b.title ? (
                  <div className="text-sm font-mono font-bold text-white uppercase tracking-wide mb-1 sm:mb-2">
                    {b.title}
                  </div>
                ) : null}

                <p className="text-xs text-white/50 font-mono leading-relaxed">
                  {b.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Animated Vessel Economics Flow vs Retrofit Tension */}
        <div className={`${isPresentationMode ? 'p-4 sm:p-6' : 'p-8'} bg-white/[0.02] border border-white/10 shadow-2xl tech-corner-accent`}>
          
          <div className="text-xs font-mono text-white/40 mb-4 sm:mb-6 uppercase tracking-widest flex items-center justify-between">
            <span>CONVENTIONAL VESSEL OPERATING STREAM</span>
            <span className="text-rose-400 font-bold">STATUS QUO STALEMATE</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* The Linear Cash Drainage Flow */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-4 p-3.5 bg-[#020617] border border-white/10">
                <div className="w-8 h-8 bg-white/5 border border-[#00F2FF]/40 flex items-center justify-center font-mono text-xs font-bold text-[#00F2FF]">
                  01
                </div>
                <div>
                  <div className="text-[10px] font-mono text-white/40 uppercase">COMMERCIAL VESSEL</div>
                  <div className="text-sm font-mono font-bold text-white uppercase">Sailing 300 days/year on trade lane</div>
                </div>
              </div>

              <div className="flex justify-center text-white/30">
                <ArrowDown className="w-4 h-4" />
              </div>

              <div className="flex items-center gap-4 p-3.5 bg-[#020617] border border-white/10">
                <div className="w-8 h-8 bg-white/5 border border-[#FFB347]/40 flex items-center justify-center font-mono text-xs font-bold text-[#FFB347]">
                  02
                </div>
                <div>
                  <div className="text-[10px] font-mono text-white/40 uppercase">MASSIVE FUEL COST</div>
                  <div className="text-sm font-mono font-bold text-[#FFB347]">10,000 tonnes burned @ ₹50,000/t = ₹50.0 Cr/yr</div>
                </div>
              </div>

              <div className="flex justify-center text-white/30">
                <ArrowDown className="w-4 h-4" />
              </div>

              <div className="flex items-center gap-4 p-3.5 bg-[#020617] border border-white/10">
                <div className="w-8 h-8 bg-white/5 border border-rose-500/40 flex items-center justify-center font-mono text-xs font-bold text-rose-300">
                  03
                </div>
                <div>
                  <div className="text-[10px] font-mono text-white/40 uppercase">OPERATING EXPENSE BURDEN</div>
                  <div className="text-sm font-mono font-bold text-white/80 uppercase">Fuel represents 50–65% of total voyage operating costs</div>
                </div>
              </div>

              <div className="flex justify-center text-white/30">
                <ArrowDown className="w-4 h-4" />
              </div>

              <div className="flex items-center gap-4 p-3.5 bg-rose-950/20 border border-rose-500/40">
                <div className="w-8 h-8 bg-rose-950 border border-rose-400 flex items-center justify-center font-mono text-xs font-bold text-rose-100">
                  ✕
                </div>
                <div>
                  <div className="text-xs font-mono text-rose-300 font-bold uppercase">RETROFIT DECISION: DEFERRED</div>
                  <div className="text-xs font-mono text-white/50 uppercase">Capex too high • Payback unverified • Capital locked in balance sheet</div>
                </div>
              </div>
            </div>

            {/* The Tension Callout Box */}
            <div className="lg:col-span-5 p-6 sm:p-8 bg-[#020617] border border-rose-500/30 relative tech-corner-accent flex flex-col justify-between">
              <div className="absolute -top-3 left-6 px-2.5 py-0.5 bg-rose-500 text-[#020617] font-mono font-black text-[10px] uppercase tracking-widest">
                THE STRUCTURAL TENSION
              </div>

              {/* Hero Statement */}
              <div className="my-auto py-6 sm:py-8">
                <blockquote className="text-base sm:text-lg lg:text-xl font-mono font-bold text-white border-l-2 border-rose-500 pl-5 sm:pl-6 leading-relaxed uppercase tracking-tight">
                  "THE EQUIPMENT SAVES IMMENSE FUEL AND EMISSIONS. BUT MARITIME LOANS DEMAND PHYSICAL COLLATERAL, WHILE SAVINGS REMAIN UNVERIFIED BY TRADITIONAL BANKERS."
                </blockquote>
              </div>

              {/* Minimal Supporting Two-Stage Visual */}
              <div className="pt-6 border-t border-white/10 font-mono">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                  <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                    CAPEX TODAY
                  </span>
                  <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-amber-400 uppercase">
                    <span className="hidden sm:inline text-white/20">────</span>
                    <span>THE FINANCING GAP</span>
                    <span className="hidden sm:inline text-white/20">────</span>
                  </div>
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider text-center sm:text-right">
                    VERIFIED SAVINGS TOMORROW
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
