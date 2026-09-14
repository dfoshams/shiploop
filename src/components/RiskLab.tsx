import React, { useState } from 'react';
import { 
  AlertTriangle, 
  ShieldAlert, 
  RotateCcw, 
  TrendingDown, 
  Activity, 
  Zap, 
  DollarSign, 
  Calendar, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { SimulationParams, RiskStressParams } from '../types';
import { runStressTest } from '../logic/riskModel';
import { SourceButton } from './SourceButton';

interface RiskLabProps {
  params: SimulationParams;
  isPresentationMode?: boolean;
  replayTrigger?: number;
  isPaused?: boolean;
}

export const RiskLab: React.FC<RiskLabProps> = ({ 
  params,
  isPresentationMode = false,
  replayTrigger = 0,
}) => {
  const [stressParams, setStressParams] = useState<RiskStressParams>({
    technologyPerformanceFactor: 100, // 100% expected
    fuelPriceShockPercent: 0, // 0% shock
    vesselUtilizationPercent: 100, // 100% sailing days
    charterRevenueShockPercent: 0,
  });

  // Reset stress parameters on replay
  React.useEffect(() => {
    setStressParams({
      technologyPerformanceFactor: 100,
      fuelPriceShockPercent: 0,
      vesselUtilizationPercent: 100,
      charterRevenueShockPercent: 0,
    });
  }, [replayTrigger]);

  const stressResult = runStressTest(params, stressParams);

  const handleResetStress = () => {
    setStressParams({
      technologyPerformanceFactor: 100,
      fuelPriceShockPercent: 0,
      vesselUtilizationPercent: 100,
      charterRevenueShockPercent: 0,
    });
  };

  // Preset Stress Scenarios
  const applyPresetStress = (scenario: 'BUNKER_CRASH' | 'TECH_UNDERPERFORM' | 'DRYDOCK_IDLE') => {
    if (scenario === 'BUNKER_CRASH') {
      setStressParams({
        technologyPerformanceFactor: 100,
        fuelPriceShockPercent: -30, // -30% bunker price collapse
        vesselUtilizationPercent: 100,
        charterRevenueShockPercent: 0,
      });
    } else if (scenario === 'TECH_UNDERPERFORM') {
      setStressParams({
        technologyPerformanceFactor: 60, // 40% underperformance
        fuelPriceShockPercent: -10,
        vesselUtilizationPercent: 95,
        charterRevenueShockPercent: 0,
      });
    } else if (scenario === 'DRYDOCK_IDLE') {
      setStressParams({
        technologyPerformanceFactor: 90,
        fuelPriceShockPercent: 0,
        vesselUtilizationPercent: 65, // Extended drydock / idle days
        charterRevenueShockPercent: -20,
      });
    }
  };

  return (
    <section 
      id="risk" 
      className={`${
        isPresentationMode 
          ? 'w-full h-full flex flex-col justify-between py-4 sm:py-6 px-4 sm:px-8 max-w-7xl mx-auto overflow-y-auto lg:overflow-hidden select-text' 
          : 'py-24 bg-[#020617] border-t border-white/10 relative'
      }`}
    >
      
      <div className={`${isPresentationMode ? 'w-full' : 'max-w-7xl mx-auto px-4 sm:px-6 relative z-10'}`}>
        
        {/* Section Header */}
        <div className={`flex flex-col md:flex-row md:items-end justify-between ${isPresentationMode ? 'mb-4' : 'mb-12'} gap-4`}>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/20 text-[#FFB347] text-xs font-mono mb-2 tracking-widest uppercase">
              <ShieldAlert className="w-3.5 h-3.5 text-[#FFB347]" />
              <span>07 // STRESS-TESTING TERMINAL</span>
            </div>
            <h2 className={`${isPresentationMode ? 'text-2xl sm:text-4xl' : 'text-3xl sm:text-5xl'} font-black text-white font-mono tracking-tight leading-tight uppercase`}>
              WHAT IF CONDITIONS DETERIORATE?
            </h2>
            <p className="text-white/60 font-mono mt-1 text-xs sm:text-sm tracking-wide">
              Evaluate credit resiliency and hydrodynamic downside risks under extreme market dislocations, fuel collapses, and off-hire shocks.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              id="btn-reset-stress"
              onClick={handleResetStress}
              className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/5 hover:bg-white/10 border border-white/20 text-xs font-mono text-white/80 hover:text-[#FFB347] transition-all uppercase tracking-wider shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#FFB347]" />
              <span>[RESET_STRESS]</span>
            </button>
          </div>
        </div>

        {/* Quick Stress Presets */}
        <div className={`${isPresentationMode ? 'mb-4' : 'mb-8'} p-2 bg-white/[0.02] border border-white/10 flex flex-wrap items-center gap-2`}>
          <span className="text-[11px] font-mono text-white/40 px-3 py-1 font-bold uppercase tracking-widest">
            STRESS_SCENARIOS:
          </span>
          <button
            id="btn-stress-bunker-crash"
            onClick={() => applyPresetStress('BUNKER_CRASH')}
            className="px-3 py-1.5 bg-black/60 hover:bg-white/10 text-xs font-mono text-[#FFB347] border border-[#FFB347]/40 uppercase tracking-wider transition-all"
          >
            📉 Bunker Price Crash (-30%)
          </button>
          <button
            id="btn-stress-tech-underperform"
            onClick={() => applyPresetStress('TECH_UNDERPERFORM')}
            className="px-3 py-1.5 bg-black/60 hover:bg-white/10 text-xs font-mono text-rose-300 border border-rose-500/40 uppercase tracking-wider transition-all"
          >
            ⚠️ Hydrodynamic Fouling (60% Eff)
          </button>
          <button
            id="btn-stress-drydock-idle"
            onClick={() => applyPresetStress('DRYDOCK_IDLE')}
            className="px-3 py-1.5 bg-black/60 hover:bg-white/10 text-xs font-mono text-[#00F2FF] border border-[#00F2FF]/40 uppercase tracking-wider transition-all"
          >
            🚢 Extended Drydock / Off-hire (65% Days)
          </button>
        </div>

        {/* 2-Column: Sliders on Left, Stressed Metrics & Shortfall Protocol on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: 4 Stress Sliders (5 Cols) */}
          <div className="lg:col-span-5 p-6 sm:p-7 bg-white/[0.02] border border-white/10 shadow-2xl space-y-6 tech-corner-accent">
            
            <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono">
              <span className="font-bold text-[#FFB347] uppercase tracking-wider">STRESS VARIABLES</span>
              <span className="text-white/40">RISK_SIMULATOR</span>
            </div>

            {/* Stress Slider 1: Tech Performance */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-white/70 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-[#00F2FF]" />
                  Technology Performance Factor
                  <SourceButton evidenceId="TECH-001" />
                </span>
                <span className={`font-bold ${stressParams.technologyPerformanceFactor < 80 ? 'text-rose-400' : 'text-[#00F2FF]'}`}>
                  {stressParams.technologyPerformanceFactor}% of Target
                </span>
              </div>
              <input
                id="slider-tech-factor"
                type="range"
                min="50"
                max="120"
                step="5"
                value={stressParams.technologyPerformanceFactor}
                onChange={(e) => setStressParams({ ...stressParams, technologyPerformanceFactor: Number(e.target.value) })}
                className="w-full h-1.5 bg-white/10 appearance-none cursor-pointer accent-[#00F2FF]"
              />
              <div className="flex justify-between text-[10px] font-mono text-white/40">
                <span>50% (Degraded)</span>
                <span>100% (Baseline)</span>
                <span>120% (Optimal)</span>
              </div>
            </div>

            {/* Stress Slider 2: Bunker Fuel Price Shock */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-white/70 flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-[#FFB347]" />
                  Fuel Price Volatility Shock
                  <SourceButton evidenceId="FUEL-001" />
                </span>
                <span className={`font-bold ${stressParams.fuelPriceShockPercent < 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {stressParams.fuelPriceShockPercent > 0 ? `+${stressParams.fuelPriceShockPercent}%` : `${stressParams.fuelPriceShockPercent}%`}
                </span>
              </div>
              <input
                id="slider-fuel-shock"
                type="range"
                min="-35"
                max="40"
                step="5"
                value={stressParams.fuelPriceShockPercent}
                onChange={(e) => setStressParams({ ...stressParams, fuelPriceShockPercent: Number(e.target.value) })}
                className="w-full h-1.5 bg-white/10 appearance-none cursor-pointer accent-[#FFB347]"
              />
              <div className="flex justify-between text-[10px] font-mono text-white/40">
                <span>-35% (Plunging bunker)</span>
                <span>0% (₹50k/t)</span>
                <span>+40% (Oil spike)</span>
              </div>
            </div>

            {/* Stress Slider 3: Vessel Utilization (Sailing Days) */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-white/70 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-teal-400" />
                  Vessel Sailing Utilization
                </span>
                <span className={`font-bold ${stressParams.vesselUtilizationPercent < 80 ? 'text-[#FFB347]' : 'text-teal-400'}`}>
                  {stressParams.vesselUtilizationPercent}% of Normal Schedule
                </span>
              </div>
              <input
                id="slider-vessel-utilization"
                type="range"
                min="50"
                max="115"
                step="5"
                value={stressParams.vesselUtilizationPercent}
                onChange={(e) => setStressParams({ ...stressParams, vesselUtilizationPercent: Number(e.target.value) })}
                className="w-full h-1.5 bg-white/10 appearance-none cursor-pointer accent-teal-400"
              />
              <div className="flex justify-between text-[10px] font-mono text-white/40">
                <span>50% (Port congestion)</span>
                <span>100% (300 days)</span>
                <span>115% (345 days)</span>
              </div>
            </div>

          </div>

          {/* RIGHT: Stressed Health Metrics & Automated Mitigation Protocol (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Stressed Health KPI Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              
              {/* Metric 1: Stressed DSCR */}
              <div className={`p-4 bg-white/[0.02] border ${
                stressResult.stressedDSCR >= 1.35 
                  ? 'border-emerald-500/40' 
                  : stressResult.stressedDSCR >= 1.05 
                  ? 'border-[#FFB347]/40' 
                  : 'border-rose-500/60 ring-1 ring-rose-500/40'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">BANK_DSCR_COVERAGE</span>
                  <SourceButton evidenceId="FIN-003" />
                </div>
                <div className={`text-2xl sm:text-3xl font-mono font-black mt-1 ${
                  stressResult.stressedDSCR >= 1.35 ? 'text-emerald-400' : stressResult.stressedDSCR >= 1.05 ? 'text-[#FFB347]' : 'text-rose-400'
                }`}>
                  {stressResult.stressedDSCR}x
                </div>
                <div className="text-[10px] font-mono text-white/40 mt-1">
                  Threshold: 1.15x min
                </div>
              </div>

              {/* Metric 2: Stressed Annual Savings */}
              <div className="p-4 bg-white/[0.02] border border-white/10">
                <div className="text-[10px] font-mono text-white/40 uppercase tracking-wider">STRESSED_SAVINGS</div>
                <div className="text-2xl sm:text-3xl font-mono font-black text-white mt-1">
                  ₹{stressResult.stressedAnnualSavingsINR.toFixed(2)}{' '}
                  <span className="text-xs font-normal text-white/50">Cr</span>
                </div>
                <div className="text-[10px] font-mono text-white/40 mt-1">
                  vs ₹{stressResult.scheduledAnnualDebtServiceINR.toFixed(2)} Cr debt
                </div>
              </div>

              {/* Metric 3: Shortfall / Surplus */}
              <div className={`p-4 bg-white/[0.02] border ${
                stressResult.isShortfall ? 'border-rose-500/60 bg-rose-950/20' : 'border-emerald-500/30'
              }`}>
                <div className="text-[10px] font-mono text-white/40 uppercase tracking-wider">
                  {stressResult.isShortfall ? 'SAVINGS SHORTFALL' : 'NET OWNER SURPLUS'}
                </div>
                <div className={`text-2xl sm:text-3xl font-mono font-black mt-1 ${
                  stressResult.isShortfall ? 'text-rose-400' : 'text-emerald-300'
                }`}>
                  {stressResult.isShortfall ? `-₹${stressResult.shortfallAmountINR.toFixed(2)} Cr` : `+₹${(stressResult.stressedAnnualSavingsINR - stressResult.scheduledAnnualDebtServiceINR).toFixed(2)} Cr`}
                </div>
                <div className="text-[10px] font-mono text-white/40 mt-1">
                  {stressResult.isShortfall ? 'Protocol triggered' : 'Positive margin'}
                </div>
              </div>

            </div>

            {/* AUTOMATED CONTRACTUAL MITIGATION PROTOCOL */}
            <div className="p-6 bg-white/[0.02] border border-white/10 shadow-2xl space-y-4 tech-corner-accent">
              
              <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white uppercase tracking-wider">SHORTFALL MITIGATION PROTOCOL</span>
                  <SourceButton evidenceId="FIN-003" />
                </div>
                <span className={`px-2.5 py-0.5 font-bold text-[10px] ${
                  stressResult.systemHealthStatus === 'OPTIMAL'
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    : stressResult.systemHealthStatus === 'MODERATE'
                    ? 'bg-amber-950 text-amber-300 border border-amber-800'
                    : 'bg-rose-950 text-rose-300 border border-rose-800 animate-pulse'
                }`}>
                  STATUS: {stressResult.systemHealthStatus}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                
                {/* Mechanism 1: 6-Month Debt Service Reserve */}
                <div className={`p-4 border ${
                  stressResult.activeMitigation === 'DEBT_RESERVE'
                    ? 'border-[#00F2FF] bg-[#00F2FF]/10 ring-1 ring-[#00F2FF]'
                    : 'border-white/10 bg-[#020617] opacity-70'
                }`}>
                  <div className="flex items-center gap-2 font-bold text-[#00F2FF] mb-1">
                    <ShieldCheck className="w-4 h-4 text-[#00F2FF]" />
                    <span>01 // DEBT RESERVE (DSRA)</span>
                  </div>
                  <p className="text-[11px] text-white/60 font-mono leading-relaxed">
                    A pre-funded 6-month debt service escrow automatically covers temporary variance in voyage schedules.
                  </p>
                </div>

                {/* Mechanism 2: Tenor Extension & Rollover */}
                <div className={`p-4 border ${
                  stressResult.activeMitigation === 'TERM_ROLLOVER'
                    ? 'border-[#FFB347] bg-[#FFB347]/10 ring-1 ring-[#FFB347]'
                    : 'border-white/10 bg-[#020617] opacity-70'
                }`}>
                  <div className="flex items-center gap-2 font-bold text-[#FFB347] mb-1">
                    <Calendar className="w-4 h-4 text-[#FFB347]" />
                    <span>02 // TENOR ROLLOVER</span>
                  </div>
                  <p className="text-[11px] text-white/60 font-mono leading-relaxed">
                    If port delays or canal blockages lower sailing days, repayment timeline extends automatically by equivalent months.
                  </p>
                </div>

                {/* Mechanism 3: Tech Supplier Warranty */}
                <div className={`p-4 border ${
                  stressResult.activeMitigation === 'RISK_SHARING'
                    ? 'border-teal-400 bg-teal-950/40 ring-1 ring-teal-400'
                    : 'border-white/10 bg-[#020617] opacity-70'
                }`}>
                  <div className="flex items-center gap-2 font-bold text-teal-300 mb-1">
                    <Zap className="w-4 h-4 text-teal-400" />
                    <span>03 // OEM PERFORMANCE WARRANTY</span>
                  </div>
                  <p className="text-[11px] text-white/60 font-mono leading-relaxed">
                    Certified equipment manufacturers provide performance shortfall indemnity backstopping the senior debt.
                  </p>
                </div>

                {/* Mechanism 4: Standby Liquidity Top-up */}
                <div className={`p-4 border ${
                  stressResult.activeMitigation === 'OWNER_TOPUP'
                    ? 'border-rose-400 bg-rose-950/40 ring-1 ring-rose-400'
                    : 'border-white/10 bg-[#020617] opacity-70'
                }`}>
                  <div className="flex items-center gap-2 font-bold text-rose-300 mb-1">
                    <DollarSign className="w-4 h-4 text-rose-400" />
                    <span>04 // STANDBY LIQUIDITY</span>
                  </div>
                  <p className="text-[11px] text-white/60 font-mono leading-relaxed">
                    Owner subordinated corporate credit fills catastrophic gaps only after reserve and warranty exhaustion.
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
