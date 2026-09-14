import React, { useState, useEffect } from 'react';
import { 
  Coins, 
  ArrowRight, 
  ArrowDown, 
  Wrench, 
  Flame, 
  TrendingDown, 
  ShieldCheck, 
  Building2, 
  Sparkles,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';
import { EvidenceMarker } from './EvidenceMarker';
import { DEMO_DATA } from '../../data/demoData';
import { calculateSimulation } from '../../logic/financialModel';

const moneyFlowSim = calculateSimulation(DEMO_DATA.defaultSimulationParams);
const defaultParams = DEMO_DATA.defaultSimulationParams;

interface CinematicMoneyFlowProps {
  isPresentationMode?: boolean;
  isPaused?: boolean;
  replayTrigger?: number;
}

export const CinematicMoneyFlow: React.FC<CinematicMoneyFlowProps> = ({
  isPresentationMode = false,
  isPaused = false,
  replayTrigger = 0,
}) => {
  const [activeStage, setActiveStage] = useState<number>(0);
  const [localPaused, setLocalPaused] = useState<boolean>(false);

  // 7 core stages in the sequence
  const stages = [
    {
      step: 1,
      tag: 'CAPEX INJECTION',
      title: '₹ RETROFIT FINANCING',
      amount: `₹${defaultParams.retrofitCostINR.toFixed(1)} Cr`,
      subtext: '100% financed by Green Finance Window via SPV',
      color: '#00F2FF',
      icon: Coins,
    },
    {
      step: 2,
      tag: 'DRYDOCK INTEGRATION',
      title: 'RETROFIT INSTALLED',
      amount: 'Cochin Shipyard (CSL)',
      subtext: '4 Medium Flettner Rotor sails installed in scheduled drydock',
      color: '#38BDF8',
      icon: Wrench,
    },
    {
      step: 3,
      tag: 'OPERATIONAL GAIN',
      title: 'FUEL CONSUMPTION FALLS',
      amount: `-${moneyFlowSim.annualFuelSavedTonnes.toLocaleString()} MT / yr`,
      subtext: `VLSFO consumption drops ${defaultParams.efficiencyImprovementPercent.toFixed(1)}% across sailing days`,
      color: '#F97316',
      icon: TrendingDown,
    },
    {
      step: 4,
      tag: 'GROSS CASHFLOW',
      title: '₹ OPERATING SAVINGS',
      amount: `₹${moneyFlowSim.grossAnnualSavingsINR.toFixed(2)} Cr / yr`,
      subtext: 'Fuel expenditure saved based on prevailing bunker prices',
      color: '#10B981',
      icon: Coins,
    },
    {
      step: 5,
      tag: 'CRYPTOGRAPHIC AUDIT',
      title: 'VERIFIED SAVINGS',
      amount: 'ISO 19030 Certified',
      subtext: 'Class oracle & continuous shaft power telemetry validation',
      color: '#34D399',
      icon: ShieldCheck,
    },
    {
      step: 6,
      tag: 'SENIOR DEBT SERVICE',
      title: 'BANK REPAYMENT',
      amount: `₹${moneyFlowSim.annualRepaymentINR.toFixed(2)} Cr / yr`,
      subtext: 'Priority automated sweep from dedicated escrow account',
      color: '#38BDF8',
      icon: Building2,
    },
    {
      step: 7,
      tag: 'OWNER DIVIDEND',
      title: 'OWNER RESIDUAL SAVINGS',
      amount: `₹${moneyFlowSim.grossAnnualSavingsINR.toFixed(2)} Cr / yr`,
      subtext: 'Verified savings service senior debt with remaining value retained by owner',
      color: '#A855F7',
      icon: Sparkles,
    },
  ];

  // Auto progression
  useEffect(() => {
    if (isPaused || localPaused) return;

    const interval = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % stages.length);
    }, 2400);

    return () => clearInterval(interval);
  }, [isPaused, localPaused, stages.length]);

  // Reset on replay trigger
  useEffect(() => {
    setActiveStage(0);
  }, [replayTrigger]);

  return (
    <div className="w-full bg-[#020617]/95 border border-white/10 tech-corner-accent p-5 sm:p-7 space-y-6 font-mono relative overflow-hidden">
      
      {/* Background Subtle Wave Grid */}
      <div className="absolute inset-0 tech-grid-dense opacity-20 pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4 relative z-10">
        <div>
          <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
            <Coins className="w-3.5 h-3.5 text-emerald-400" />
            <span>VALUE TRAJECTORY ANIMATION</span>
          </span>
          <h3 className="text-base sm:text-xl font-black text-white uppercase tracking-tight mt-0.5">
            CINEMATIC MONEY-FLOW SEQUENCE
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <EvidenceMarker type="SIMULATION" label="ILLUSTRATIVE SIMULATION" />

          {/* Interactive Player Controls */}
          <div className="flex items-center gap-1 bg-white/5 border border-white/15 p-1 rounded-sm">
            <button
              onClick={() => setLocalPaused(!localPaused)}
              className="p-1 hover:bg-white/10 text-white/80 hover:text-[#00F2FF] transition-colors cursor-pointer"
              title={localPaused ? 'Play' : 'Pause'}
            >
              {localPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={() => setActiveStage(0)}
              className="p-1 hover:bg-white/10 text-white/80 hover:text-[#00F2FF] transition-colors cursor-pointer"
              title="Restart Sequence"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Cinematic Stage Cards (Grid of 7 or Stepper) */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-2.5 relative z-10">
        {stages.map((st, idx) => {
          const isActive = activeStage === idx;
          const isPassed = activeStage > idx;
          const Icon = st.icon;

          return (
            <div
              key={st.step}
              onClick={() => setActiveStage(idx)}
              className={`p-3.5 border transition-all cursor-pointer relative flex flex-col justify-between ${
                isActive
                  ? 'border-[#00F2FF] bg-[#00F2FF]/15 shadow-[0_0_20px_rgba(0,242,255,0.35)] scale-[1.02]'
                  : isPassed
                  ? 'border-emerald-500/30 bg-emerald-500/5'
                  : 'border-white/10 bg-white/[0.02] opacity-40 hover:opacity-75'
              }`}
            >
              {/* Step Marker */}
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-bold ${isActive ? 'text-[#00F2FF]' : 'text-white/40'}`}>
                  0{st.step}
                </span>
                <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-[#00F2FF] animate-ping' : isPassed ? 'bg-emerald-400' : 'bg-white/20'}`} />
              </div>

              {/* Title & Amount */}
              <div className="space-y-1">
                <div className="text-[9px] text-white/50 uppercase tracking-wider truncate">{st.tag}</div>
                <div className="text-xs font-black text-white uppercase leading-tight line-clamp-2">
                  {st.title}
                </div>
                <div className="text-xs font-bold text-[#00F2FF] pt-1">
                  {st.amount}
                </div>
              </div>

              {/* Bottom Progress Bar */}
              <div className="w-full h-1 bg-white/10 mt-3 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-300 ${
                    isActive ? 'bg-[#00F2FF] w-full animate-pulse' : isPassed ? 'bg-emerald-400 w-full' : 'w-0'
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Stage Detailed Spotlight Box */}
      <div className="p-4 bg-[#020617] border border-[#00F2FF]/40 relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#00F2FF]/10 text-[#00F2FF] border border-[#00F2FF]/40 rounded-sm shadow-[0_0_15px_rgba(0,242,255,0.25)]">
            <Coins className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-white/50 uppercase text-[10px]">CURRENT FLOW STATE:</span>
              <span className="text-white font-bold uppercase text-sm">{stages[activeStage].title}</span>
            </div>
            <p className="text-white/70 text-xs font-normal mt-0.5">
              {stages[activeStage].subtext}
            </p>
          </div>
        </div>

        <div className="text-right self-end sm:self-auto">
          <span className="text-[10px] text-white/40 block uppercase">PROJECTED VALUE</span>
          <span className="text-lg font-black text-[#00F2FF]">{stages[activeStage].amount}</span>
        </div>
      </div>

    </div>
  );
};
