import React, { useState, useEffect } from 'react';
import { 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  ArrowRight, 
  Building2, 
  Wrench, 
  Fuel, 
  ShieldCheck, 
  Banknote, 
  TrendingUp,
  Sparkles,
  Info
} from 'lucide-react';

interface LoopEngineProps {
  isPresentationMode?: boolean;
  replayTrigger?: number;
  isPaused?: boolean;
}

export const LoopEngine: React.FC<LoopEngineProps> = ({
  isPresentationMode = false,
  replayTrigger = 0,
  isPaused,
}) => {
  const [isPlaying, setIsPlaying] = useState(isPresentationMode);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [autoProgress, setAutoProgress] = useState(true);

  const loopSteps = [
    {
      id: 1,
      name: '01 FINANCE',
      title: 'Green Capital Origination',
      desc: 'Institutional lender or green SPV provisions 100% of retrofit CAPEX directly into shipyard escrow.',
      actor: 'BANK / GREEN SPV',
      capitalFlow: '₹10.0 Cr Outflow → Shipyard',
      icon: Building2,
      color: 'border-cyan-500 text-cyan-400 bg-cyan-950/40',
      badge: 'Zero Owner Equity',
    },
    {
      id: 2,
      name: '02 RETROFIT',
      title: 'Yard Drydock Installation',
      desc: 'Selected hydrodynamics (Air Lubrication, PBCF, Rotor Sails) installed during scheduled special survey.',
      actor: 'CERTIFIED SHIPYARD',
      capitalFlow: 'Hardware Commissioned',
      icon: Wrench,
      color: 'border-blue-500 text-blue-400 bg-blue-950/40',
      badge: 'TRL-9 Proven Tech',
    },
    {
      id: 3,
      name: '03 SAVE',
      title: 'Real-World Fuel Reduction',
      desc: 'Vessel re-enters commercial service; hydrodynamic friction drops and fuel burn decreases by 15.0%.',
      actor: 'COMMERCIAL VESSEL AT SEA',
      capitalFlow: '1,500 Tonnes Bunker Unburned',
      icon: Fuel,
      color: 'border-teal-500 text-teal-400 bg-teal-950/40',
      badge: 'Immediate Operational Impact',
    },
    {
      id: 4,
      name: '04 VERIFY',
      title: 'High-Frequency Telemetry Audit',
      desc: 'Continuous mass-flow meters, shaft torque sensors, and AIS noon reports verified against baseline models.',
      actor: 'INDEPENDENT VERIFIER / CLASS',
      capitalFlow: 'Cryptographic Certificate Generated',
      icon: ShieldCheck,
      color: 'border-emerald-500 text-emerald-400 bg-emerald-950/40',
      badge: 'DNV / Bureau Veritas Oracle',
    },
    {
      id: 5,
      name: '05 REPAY',
      title: 'Programmed Debt Amortization',
      desc: 'Verified fuel savings monetized from operating cashflow to satisfy scheduled debt service annuity.',
      actor: 'SHIPLOOP SETTLEMENT SMART CONTRACT',
      capitalFlow: '₹2.18 Cr / yr → Bank Account',
      icon: Banknote,
      color: 'border-amber-500 text-amber-400 bg-amber-950/40',
      badge: 'Senior Secured Claim',
    },
    {
      id: 6,
      name: '06 RETAIN',
      title: 'Owner Economic Surplus',
      desc: 'Surplus savings above debt service and platform reserve are kept by the shipowner as free cashflow.',
      actor: 'SHIPOWNER / CHARTERER',
      capitalFlow: '+₹5.02 Cr / yr Net Profit Surplus',
      icon: TrendingUp,
      color: 'border-emerald-400 text-emerald-300 bg-emerald-950/40',
      badge: 'Immediate Cash Positive',
    },
  ];

  // Replay trigger & pause handling in presentation mode
  useEffect(() => {
    if (isPresentationMode) {
      setCurrentStep(0);
      setIsPlaying(!isPaused);
    }
  }, [replayTrigger, isPresentationMode]);

  useEffect(() => {
    if (isPresentationMode && isPaused !== undefined) {
      setIsPlaying(!isPaused);
    }
  }, [isPaused, isPresentationMode]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setTimeout(() => {
        setCurrentStep((prev) => {
          if (prev >= loopSteps.length - 1) {
            if (isPresentationMode) {
              return 0; // loop back in presentation mode so the engine is alive
            }
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 2600);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, isPresentationMode, loopSteps.length]);

  const handlePlayCashFlow = () => {
    setCurrentStep(0);
    setIsPlaying(true);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
  };

  return (
    <section 
      id="engine" 
      className={`${
        isPresentationMode 
          ? 'w-full h-full flex flex-col justify-between py-4 sm:py-6 px-4 sm:px-8 max-w-7xl mx-auto overflow-y-auto lg:overflow-hidden select-text' 
          : 'py-24 bg-[#020617] border-t border-white/10 relative overflow-hidden'
      }`}
    >
      
      <div className={`${isPresentationMode ? 'w-full' : 'max-w-7xl mx-auto px-4 sm:px-6 relative z-10'}`}>
        
        {/* Section Header */}
        <div className={`flex flex-col md:flex-row md:items-end justify-between ${isPresentationMode ? 'mb-4 sm:mb-6' : 'mb-14'} gap-4`}>
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/20 text-[#00F2FF] text-xs font-mono mb-2 tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#00F2FF]" />
              <span>02 // THE PROTOCOL ARCHITECTURE</span>
            </div>
            <h2 className={`${isPresentationMode ? 'text-2xl sm:text-4xl' : 'text-3xl sm:text-5xl'} font-black text-white font-mono tracking-tight leading-tight uppercase`}>
              THE SHIPLOOP SIGNATURE ENGINE
            </h2>
            <p className="text-white/60 font-mono mt-1 text-xs sm:text-sm tracking-wide">
              A closed-loop maritime fintech protocol linking capital supply directly to verified physical fuel savings.
            </p>
          </div>

          {/* Interactive Play The Cash Flow Controls */}
          <div className="flex items-center gap-3">
            <button
              id="btn-play-cashflow"
              onClick={handlePlayCashFlow}
              className={`flex items-center gap-2 px-5 py-3 font-mono font-black text-xs tracking-wider transition-all uppercase ${
                isPlaying 
                  ? 'bg-[#FFB347] text-[#020617] ring-2 ring-[#FFB347]/40 shadow-[0_0_20px_rgba(255,179,71,0.4)]' 
                  : 'bg-[#00F2FF] hover:bg-[#00F2FF]/80 text-[#020617] shadow-[0_0_20px_rgba(0,242,255,0.4)]'
              }`}
            >
              <Play className={`w-4 h-4 fill-current ${isPlaying ? 'animate-spin' : ''}`} />
              <span>{isPlaying ? `STEP ${currentStep + 1} OF 6 ACTIVE` : 'PLAY CASH FLOW LOOP'}</span>
            </button>

            <button
              id="btn-reset-cashflow"
              onClick={handleReset}
              className="p-3 bg-[#020617] hover:bg-white/10 border border-white/20 text-white/60 hover:text-white transition-all"
              title="Reset Animation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* The 6-Step Loop Diagram (Grid & Hexagonal/Card Flow) */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${isPresentationMode ? 'gap-3 mb-3' : 'gap-6 mb-12'}`}>
          {loopSteps.map((step, idx) => {
            const Icon = step.icon;
            const isCurrent = currentStep === idx;
            const isPast = currentStep > idx;

            return (
              <div
                key={step.name}
                onClick={() => {
                  setIsPlaying(false);
                  setCurrentStep(idx);
                }}
                className={`${isPresentationMode ? 'p-3 sm:p-4' : 'p-6'} bg-white/[0.02] border transition-all duration-200 cursor-pointer relative overflow-hidden tech-corner-accent ${
                  isCurrent
                    ? `border-[#00F2FF] shadow-[0_0_25px_rgba(0,242,255,0.25)] bg-[#00F2FF]/5`
                    : isPast
                    ? 'border-white/20 opacity-90'
                    : 'border-white/10 hover:border-white/30'
                }`}
              >
                {/* Active Indicator Pin */}
                {isCurrent && (
                  <div className="absolute top-0 right-0 px-3 py-1 bg-[#00F2FF] text-[#020617] font-mono font-black text-[10px] uppercase tracking-widest animate-pulse">
                    ACTIVE STAGE
                  </div>
                )}

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 bg-[#020617] border ${isCurrent ? 'border-[#00F2FF]' : 'border-white/10'}`}>
                      <Icon className="w-5 h-5 text-[#00F2FF]" />
                    </div>
                    <div>
                      <span className="text-xs font-mono font-bold text-[#00F2FF] tracking-wider uppercase">
                        {step.name}
                      </span>
                      <h3 className="text-base font-mono font-bold text-white leading-tight uppercase">
                        {step.title}
                      </h3>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-white/50 font-mono leading-relaxed mb-4">
                  {step.desc}
                </p>

                <div className="pt-3 border-t border-white/10 flex flex-col gap-1 text-[11px] font-mono">
                  <div className="flex justify-between text-white/40">
                    <span>PRIMARY ACTOR:</span>
                    <span className="text-white/90 font-medium">{step.actor}</span>
                  </div>
                  <div className="flex justify-between text-white/40">
                    <span>CAPITAL IMPACT:</span>
                    <span className="text-emerald-400 font-bold">{step.capitalFlow}</span>
                  </div>
                </div>

                {/* Sub-badge */}
                <div className="mt-3">
                  <span className="inline-block text-[10px] font-mono px-2 py-0.5 bg-[#020617] text-white/70 border border-white/10 uppercase">
                    {step.badge}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Step Commentary Bar during Cash Flow Demonstration */}
        <div className="p-6 bg-white/[0.02] border border-[#00F2FF]/30 flex flex-col md:flex-row items-center justify-between gap-4 tech-corner-accent">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#020617] border border-[#00F2FF]/40 flex items-center justify-center text-[#00F2FF] font-mono font-black text-sm">
              0{currentStep + 1}
            </div>
            <div>
              <div className="text-xs font-mono text-[#00F2FF] font-bold uppercase">
                {loopSteps[currentStep].name}: {loopSteps[currentStep].title}
              </div>
              <div className="text-xs font-mono text-white/70 uppercase">
                {loopSteps[currentStep].desc}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-white/40 bg-[#020617] px-4 py-2 border border-white/10 shrink-0 uppercase">
            <span>FLOW SETTLEMENT:</span>
            <span className="text-emerald-400 font-bold">{loopSteps[currentStep].capitalFlow}</span>
          </div>
        </div>

      </div>
    </section>
  );
};
