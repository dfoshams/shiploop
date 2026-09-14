import React, { useState } from 'react';
import { 
  TrendingUp, 
  Ship, 
  DollarSign, 
  Leaf, 
  Building2, 
  Award,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';
import { SimulationParams, SimulationResult } from '../types';
import { SourceButton } from './SourceButton';

interface ScaleSimulatorProps {
  baseParams: SimulationParams;
  baseResult: SimulationResult;
  isPresentationMode?: boolean;
  replayTrigger?: number;
  isPaused?: boolean;
}

export const ScaleSimulator: React.FC<ScaleSimulatorProps> = ({
  baseParams,
  baseResult,
  isPresentationMode = false,
  replayTrigger = 0,
  isPaused = false,
}) => {
  const [fleetCount, setFleetCount] = useState<number>(100);

  // Scaled calculations based on current vessel parameters
  const totalCapexINRCr = baseParams.retrofitCostINR * fleetCount;
  const totalAnnualSavingsINRCr = baseResult.grossAnnualSavingsINR * fleetCount;
  const totalAnnualRepaymentINRCr = baseResult.annualRepaymentINR * fleetCount;
  const totalOwnerRetainedINRCr = baseResult.ownerRetainedINR * fleetCount;
  const totalCO2eAvoidedTonnes = baseResult.emissionsAvoidedCO2eTonnes * fleetCount;
  const totalFuelSavedTonnes = baseResult.annualFuelSavedTonnes * fleetCount;

  const fleetMilestones = [
    { count: 1, label: 'Single Pilot Ship' },
    { count: 10, label: 'Shipping Line Squadron' },
    { count: 100, label: 'National Green Pool' },
    { count: 500, label: 'Regional Corridor Fleet' },
    { count: 1000, label: 'Global Securitization' },
  ];

  // Reset on replay
  React.useEffect(() => {
    setFleetCount(100);
  }, [replayTrigger]);

  // Auto-cycle milestones in presentation mode
  React.useEffect(() => {
    if (!isPresentationMode || isPaused) return;
    const interval = setInterval(() => {
      setFleetCount((prev) => {
        const currentIdx = fleetMilestones.findIndex((m) => m.count === prev);
        const nextIdx = (currentIdx + 1) % fleetMilestones.length;
        return fleetMilestones[nextIdx].count;
      });
    }, 3500);
    return () => clearInterval(interval);
  }, [isPresentationMode, isPaused, fleetMilestones]);

  return (
    <section 
      id="scale" 
      className={`${
        isPresentationMode 
          ? 'w-full h-full flex flex-col justify-between py-4 sm:py-6 px-4 sm:px-8 max-w-7xl mx-auto overflow-y-auto lg:overflow-hidden select-text' 
          : 'py-24 bg-[#020617] border-t border-white/10 relative overflow-hidden'
      }`}
    >
      
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#00F2FF]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className={`${isPresentationMode ? 'w-full' : 'max-w-7xl mx-auto px-4 sm:px-6 relative z-10'}`}>
        
        {/* Section Header */}
        <div className={`max-w-3xl ${isPresentationMode ? 'mb-4' : 'mb-12'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/20 text-[#00F2FF] text-xs font-mono mb-2 tracking-widest uppercase">
            <TrendingUp className="w-3.5 h-3.5 text-[#00F2FF]" />
            <span>10 // MACRO SCALE & PORTFOLIO SECURITIZATION</span>
          </div>
          <h2 className={`${isPresentationMode ? 'text-2xl sm:text-4xl' : 'text-3xl sm:text-5xl'} font-black text-white font-mono tracking-tight leading-tight uppercase`}>
            ONE SHIP IS A PILOT.{' '}
            <span className="text-[#00F2FF] underline decoration-[#00F2FF]/40">
              A FLEET IS AN ASSET CLASS.
            </span>
          </h2>
          <p className="text-white/60 font-mono mt-1 text-xs sm:text-sm tracking-wide">
            When hundreds of vessels aggregate verified savings into a common debt vehicle, retrofits evolve from isolated shipyard projects into a multi-billion dollar institutional green bond market.
          </p>
        </div>

        {/* Milestone Quick Select Buttons */}
        <div className="mb-10 p-2 bg-white/[0.02] border border-white/10 flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-mono text-white/40 px-3 py-1 font-bold uppercase tracking-widest">
            SCALE_MILESTONES:
          </span>
          {fleetMilestones.map((m) => {
            const isSelected = fleetCount === m.count;
            return (
              <button
                key={m.count}
                id={`btn-scale-${m.count}`}
                onClick={() => setFleetCount(m.count)}
                className={`px-3.5 py-2 text-xs font-mono transition-all uppercase tracking-wider ${
                  isSelected
                    ? 'bg-[#00F2FF] text-[#020617] font-black shadow-[0_0_15px_rgba(0,242,255,0.4)]'
                    : 'bg-[#020617] text-white/80 hover:bg-white/10 border border-white/10'
                }`}
              >
                {m.count} {m.count === 1 ? 'Vessel' : 'Vessels'} ({m.label})
              </button>
            );
          })}
        </div>

        {/* Fleet Count Interactive Slider */}
        <div className="p-8 bg-white/[0.02] border border-white/10 shadow-2xl mb-12 space-y-6 tech-corner-accent">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <span className="text-xs font-mono text-[#00F2FF] font-bold uppercase tracking-wider">
                FLEET DEPLOYMENT VOLUME
              </span>
              <div className="text-3xl sm:text-4xl font-mono font-black text-white mt-0.5">
                {fleetCount.toLocaleString()}{' '}
                <span className="text-sm font-normal text-white/50">Commercial Vessels Retrofitted</span>
              </div>
            </div>

            <div className="text-xs font-mono px-3 py-1.5 bg-white/5 border border-[#FFB347]/40 text-[#FFB347] uppercase tracking-wider">
              ILLUSTRATIVE PORTFOLIO SCENARIO
            </div>
          </div>

          <input
            id="slider-scale-fleet"
            type="range"
            min="1"
            max="1000"
            step="1"
            value={fleetCount}
            onChange={(e) => setFleetCount(Number(e.target.value))}
            className="w-full h-2 bg-white/10 appearance-none cursor-pointer accent-[#00F2FF]"
          />

          <div className="flex justify-between text-xs font-mono text-white/40">
            <span>1 Ship (Pilot Demo)</span>
            <span>100 Ships (National Fleet)</span>
            <span>500 Ships (Pan-Asian Corridor)</span>
            <span>1,000 Ships (Global Securitization)</span>
          </div>
        </div>

        {/* Scaled Output KPI Scoreboard */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Financed CAPEX */}
          <div className="p-6 bg-white/[0.02] border border-white/10 space-y-2 tech-corner-accent">
            <div className="flex items-center justify-between text-white/40">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider">TOTAL RETROFIT CAPITAL</span>
                <SourceButton evidenceId="FIN-001" />
              </div>
              <DollarSign className="w-4 h-4 text-[#00F2FF]" />
            </div>
            <div className="text-3xl font-mono font-black text-white">
              ₹{totalCapexINRCr.toLocaleString()}{' '}
              <span className="text-xs text-white/50 font-normal">Cr</span>
            </div>
            <p className="text-xs text-white/60 font-mono">
              ~${(totalCapexINRCr / 83.5).toFixed(0)}M USD aggregate green bond debt pipeline.
            </p>
          </div>

          {/* Card 2: Annual Fuel Savings */}
          <div className="p-6 bg-white/[0.02] border border-white/10 space-y-2 tech-corner-accent">
            <div className="flex items-center justify-between text-white/40">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider">ANNUAL FUEL SAVINGS</span>
                <SourceButton evidenceId="TECH-001" />
              </div>
              <Award className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-mono font-black text-emerald-400">
              ₹{totalAnnualSavingsINRCr.toLocaleString()}{' '}
              <span className="text-xs text-emerald-400/70 font-normal">Cr/yr</span>
            </div>
            <p className="text-xs text-white/60 font-mono">
              {totalFuelSavedTonnes.toLocaleString()} tonnes unburned bunker fuel avoided annually.
            </p>
          </div>

          {/* Card 3: Annual Debt Service Pool */}
          <div className="p-6 bg-white/[0.02] border border-white/10 space-y-2 tech-corner-accent">
            <div className="flex items-center justify-between text-white/40">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider">BANK AMORTIZATION POOL</span>
                <SourceButton evidenceId="FIN-003" />
              </div>
              <Building2 className="w-4 h-4 text-[#FFB347]" />
            </div>
            <div className="text-3xl font-mono font-black text-[#FFB347]">
              ₹{totalAnnualRepaymentINRCr.toLocaleString()}{' '}
              <span className="text-xs text-[#FFB347]/70 font-normal">Cr/yr</span>
            </div>
            <p className="text-xs text-white/60 font-mono">
              Senior secured debt service with {baseResult.bankSharePercent}% savings distribution share.
            </p>
          </div>

          {/* Card 4: Environmental CO2 Reduction */}
          <div className="p-6 bg-white/[0.02] border border-white/10 space-y-2 tech-corner-accent">
            <div className="flex items-center justify-between text-white/40">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider">ANNUAL CO₂e AVOIDED</span>
                <SourceButton evidenceId="IMO-001" />
              </div>
              <Leaf className="w-4 h-4 text-teal-400" />
            </div>
            <div className="text-3xl font-mono font-black text-teal-300">
              {totalCO2eAvoidedTonnes.toLocaleString()}{' '}
              <span className="text-xs text-teal-400/70 font-normal">t/yr</span>
            </div>
            <p className="text-xs text-white/60 font-mono">
              Equivalent to taking {Math.round(totalCO2eAvoidedTonnes / 4.6).toLocaleString()} passenger cars off roads.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
