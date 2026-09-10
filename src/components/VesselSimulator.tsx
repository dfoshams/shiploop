import React, { useState } from 'react';
import { 
  Sliders, 
  RotateCcw, 
  Fuel, 
  DollarSign, 
  Calendar, 
  TrendingUp, 
  Zap, 
  ShieldCheck, 
  Clock, 
  Leaf, 
  Award,
  ArrowRight,
  Sparkles,
  Layers
} from 'lucide-react';
import { SimulationParams, SimulationResult, VesselPreset } from '../types';
import { DEMO_DATA } from '../data/demoData';

interface VesselSimulatorProps {
  params: SimulationParams;
  onParamsChange: (newParams: SimulationParams) => void;
  result: SimulationResult;
  isPresentationMode?: boolean;
  replayTrigger?: number;
  isPaused?: boolean;
}

export const VesselSimulator: React.FC<VesselSimulatorProps> = ({
  params,
  onParamsChange,
  result,
  isPresentationMode = false,
  replayTrigger = 0,
}) => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('panamax-bulk');

  // Reset to default preset on replay in presentation mode
  React.useEffect(() => {
    setSelectedPresetId('panamax-bulk');
  }, [replayTrigger]);

  const handlePresetSelect = (preset: VesselPreset) => {
    setSelectedPresetId(preset.id);
    onParamsChange({
      ...params,
      annualFuelConsumption: preset.annualFuelTonnes,
      fuelPricePerTonneINR: preset.fuelPricePerTonneINR,
      operatingDays: preset.operatingDaysPerYear,
      retrofitCostINR: preset.typicalRetrofitCostINR,
      efficiencyImprovementPercent: preset.expectedEfficiencyPercent,
    });
  };

  const handleResetDefaults = () => {
    setSelectedPresetId('panamax-bulk');
    onParamsChange(DEMO_DATA.defaultSimulationParams);
  };

  // Calculations for Before / After visual
  const beforeAnnualCostINRCr = (params.annualFuelConsumption * params.fuelPricePerTonneINR) / 10000000;
  const afterAnnualFuelTonnes = result.postRetrofitFuelConsumptionTonnes;
  const afterAnnualCostINRCr = (afterAnnualFuelTonnes * params.fuelPricePerTonneINR) / 10000000;
  const remainingFuelPercent = (100 - params.efficiencyImprovementPercent).toFixed(1);

  return (
    <section 
      id="simulator" 
      className={`${
        isPresentationMode 
          ? 'w-full h-full flex flex-col justify-between py-4 sm:py-6 px-4 sm:px-8 max-w-7xl mx-auto overflow-y-auto lg:overflow-hidden select-text' 
          : 'py-24 bg-[#020617] border-t border-white/10 relative'
      }`}
    >
      
      <div className={`${isPresentationMode ? 'w-full' : 'max-w-7xl mx-auto px-4 sm:px-6 relative z-10'}`}>
        
        {/* Header and Preset Selector */}
        <div className={`flex flex-col md:flex-row md:items-end justify-between ${isPresentationMode ? 'mb-4' : 'mb-12'} gap-4`}>
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/20 text-[#00F2FF] text-xs font-mono mb-2 tracking-widest uppercase">
              <Sliders className="w-3.5 h-3.5" />
              <span>03 // LIVE INTERACTIVE MODEL</span>
            </div>
            <h2 className={`${isPresentationMode ? 'text-2xl sm:text-4xl' : 'text-3xl sm:text-5xl'} font-black text-white font-mono tracking-tight leading-tight uppercase`}>
              BUILD YOUR VESSEL
            </h2>
            <p className="text-white/60 font-mono mt-1 text-xs sm:text-sm tracking-wide">
              Calibrate operational and financial parameters. Continuous data recalculates cashflows, debt service, and emissions in real time.
            </p>
          </div>

          {/* Reset button */}
          <button
            id="btn-reset-simulator"
            onClick={handleResetDefaults}
            className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/5 hover:bg-white/10 border border-white/20 text-xs font-mono text-white/80 hover:text-[#00F2FF] transition-all uppercase tracking-wider shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#00F2FF]" />
            <span>[RESET_DEFAULTS]</span>
          </button>
        </div>

        {/* Vessel Archetype Presets Bar */}
        <div className={`${isPresentationMode ? 'mb-4' : 'mb-10'} p-2 bg-white/[0.02] border border-white/10 flex flex-wrap items-center gap-2`}>
          <span className="text-[11px] font-mono text-white/40 px-3 py-1 font-bold uppercase tracking-widest">
            COMMERCIAL_PRESETS:
          </span>
          {DEMO_DATA.vesselPresets.map((preset) => {
            const isSelected = selectedPresetId === preset.id;
            return (
              <button
                key={preset.id}
                id={`btn-preset-${preset.id}`}
                onClick={() => handlePresetSelect(preset)}
                className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider transition-all ${
                  isSelected
                    ? 'bg-[#00F2FF] text-black font-black shadow-[0_0_15px_rgba(0,242,255,0.4)]'
                    : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                {preset.name}
              </button>
            );
          })}
        </div>

        {/* Main 2-Column Split: Sliders on Left, Metrics & Visual on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Parameter Controls (5 Cols) */}
          <div className="lg:col-span-5 p-6 sm:p-7 bg-white/[0.02] border border-white/10 shadow-xl space-y-6 tech-corner-accent">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono">
              <span className="font-bold text-[#00F2FF] uppercase tracking-wider">VESSEL & RETROFIT INPUTS</span>
              <span className="px-2 py-0.5 bg-[#00F2FF]/10 text-[#00F2FF] text-[10px] border border-[#00F2FF]/40 tracking-wider">
                LIVE_KERNEL
              </span>
            </div>

            {/* Slider 1: Annual Fuel Consumption */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-white/70 flex items-center gap-1.5">
                  <Fuel className="w-3.5 h-3.5 text-[#00F2FF]" />
                  Annual Fuel Consumption
                </span>
                <span className="text-[#00F2FF] font-bold">
                  {params.annualFuelConsumption.toLocaleString()} tonnes
                </span>
              </div>
              <input
                id="slider-fuel-consumption"
                type="range"
                min="3000"
                max="25000"
                step="250"
                value={params.annualFuelConsumption}
                onChange={(e) => onParamsChange({ ...params, annualFuelConsumption: Number(e.target.value) })}
                className="w-full h-1.5 bg-white/10 appearance-none cursor-pointer accent-[#00F2FF]"
              />
              <div className="flex justify-between text-[10px] font-mono text-white/40">
                <span>3k tonnes</span>
                <span>12k tonnes</span>
                <span>25k tonnes</span>
              </div>
            </div>

            {/* Slider 2: Fuel Price (INR / tonne) */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-white/70 flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-[#FFB347]" />
                  Bunker Fuel Price (VLSFO)
                </span>
                <span className="text-[#FFB347] font-bold">
                  ₹{params.fuelPricePerTonneINR.toLocaleString()} / tonne
                </span>
              </div>
              <input
                id="slider-fuel-price"
                type="range"
                min="35000"
                max="85000"
                step="1000"
                value={params.fuelPricePerTonneINR}
                onChange={(e) => onParamsChange({ ...params, fuelPricePerTonneINR: Number(e.target.value) })}
                className="w-full h-1.5 bg-white/10 appearance-none cursor-pointer accent-[#FFB347]"
              />
              <div className="flex justify-between text-[10px] font-mono text-white/40">
                <span>₹35,000/t</span>
                <span>₹55,000/t</span>
                <span>₹85,000/t</span>
              </div>
            </div>

            {/* Slider 3: Expected Efficiency Gain (%) */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-white/70 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-emerald-400" />
                  Efficiency Improvement
                </span>
                <span className="text-emerald-400 font-bold text-sm">
                  {params.efficiencyImprovementPercent.toFixed(1)}%
                </span>
              </div>
              <input
                id="slider-efficiency"
                type="range"
                min="5.0"
                max="30.0"
                step="0.5"
                value={params.efficiencyImprovementPercent}
                onChange={(e) => onParamsChange({ ...params, efficiencyImprovementPercent: Number(e.target.value) })}
                className="w-full h-1.5 bg-white/10 appearance-none cursor-pointer accent-emerald-400"
              />
              <div className="flex justify-between text-[10px] font-mono text-white/40">
                <span>5% (PBCF only)</span>
                <span>15% (ALS + Ducts)</span>
                <span>30% (Wind + ALS)</span>
              </div>
            </div>

            {/* Slider 4: Retrofit CAPEX (₹ Crores) */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-white/70 flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-rose-400" />
                  Total Retrofit CAPEX
                </span>
                <span className="text-rose-400 font-bold">
                  ₹{params.retrofitCostINR.toFixed(1)} Cr
                </span>
              </div>
              <input
                id="slider-retrofit-cost"
                type="range"
                min="2.0"
                max="30.0"
                step="0.5"
                value={params.retrofitCostINR}
                onChange={(e) => onParamsChange({ ...params, retrofitCostINR: Number(e.target.value) })}
                className="w-full h-1.5 bg-white/10 appearance-none cursor-pointer accent-rose-400"
              />
              <div className="flex justify-between text-[10px] font-mono text-white/40">
                <span>₹2 Cr</span>
                <span>₹10 Cr</span>
                <span>₹30 Cr</span>
              </div>
            </div>

            {/* Slider 5: Financing Term & LTV */}
            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/10">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-white/50">Financed LTV</span>
                  <span className="text-[#00F2FF] font-bold">{params.financingPercentage}%</span>
                </div>
                <input
                  id="slider-financing-ltv"
                  type="range"
                  min="50"
                  max="100"
                  step="5"
                  value={params.financingPercentage}
                  onChange={(e) => onParamsChange({ ...params, financingPercentage: Number(e.target.value) })}
                  className="w-full h-1.5 bg-white/10 appearance-none cursor-pointer accent-[#00F2FF]"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-white/50">Loan Term</span>
                  <span className="text-[#00F2FF] font-bold">{params.financingDurationYears} Yrs</span>
                </div>
                <input
                  id="slider-financing-term"
                  type="range"
                  min="2"
                  max="10"
                  step="1"
                  value={params.financingDurationYears}
                  onChange={(e) => onParamsChange({ ...params, financingDurationYears: Number(e.target.value) })}
                  className="w-full h-1.5 bg-white/10 appearance-none cursor-pointer accent-[#00F2FF]"
                />
              </div>
            </div>

            <div className="pt-2 text-[11px] font-mono text-white/40 italic">
              * Indicative green loan interest rate: {params.interestRateAnnualPercent || 8.5}% p.a.
            </div>

          </div>

          {/* RIGHT: Live KPI Scoreboard + Before/After Split Vessel (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top 6 KPI Metric Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              
              {/* Metric 1: Annual Fuel Saved */}
              <div className="p-4 bg-white/[0.02] border border-white/10 shadow-md">
                <div className="text-[10px] font-mono text-white/40 uppercase tracking-wider">ANNUAL_FUEL_SAVED</div>
                <div className="text-xl sm:text-2xl font-mono font-black text-white mt-1">
                  {result.annualFuelSavedTonnes.toLocaleString()}{' '}
                  <span className="text-xs font-normal text-white/50">t</span>
                </div>
                <div className="text-[10px] font-mono text-[#00F2FF] mt-1">
                  ↓ {params.efficiencyImprovementPercent}% reduction
                </div>
              </div>

              {/* Metric 2: Gross Annual Savings */}
              <div className="p-4 bg-white/[0.02] border border-white/10 shadow-md">
                <div className="text-[10px] font-mono text-white/40 uppercase tracking-wider">GROSS_ANNUAL_SAVINGS</div>
                <div className="text-xl sm:text-2xl font-mono font-black text-emerald-400 mt-1">
                  ₹{result.grossAnnualSavingsINR.toFixed(2)}{' '}
                  <span className="text-xs font-normal text-emerald-300/80">Cr</span>
                </div>
                <div className="text-[10px] font-mono text-white/40 mt-1">
                  Avoided bunker invoices
                </div>
              </div>

              {/* Metric 3: Retrofit Payback */}
              <div className="p-4 bg-white/[0.02] border border-white/10 shadow-md">
                <div className="text-[10px] font-mono text-white/40 uppercase tracking-wider">RETROFIT_PAYBACK</div>
                <div className="text-xl sm:text-2xl font-mono font-black text-[#00F2FF] mt-1">
                  {result.retrofitPaybackYears}{' '}
                  <span className="text-xs font-normal text-[#00F2FF]/80">Years</span>
                </div>
                <div className="text-[10px] font-mono text-[#00F2FF]/80 mt-1">
                  Fast capital recovery
                </div>
              </div>

              {/* Metric 4: Annual Debt Repayment */}
              <div className="p-4 bg-white/[0.02] border border-white/10 shadow-md">
                <div className="text-[10px] font-mono text-white/40 uppercase tracking-wider">BANK_REPAYMENT</div>
                <div className="text-xl sm:text-2xl font-mono font-black text-[#FFB347] mt-1">
                  ₹{result.annualRepaymentINR.toFixed(2)}{' '}
                  <span className="text-xs font-normal text-[#FFB347]/80">Cr/yr</span>
                </div>
                <div className="text-[10px] font-mono text-white/40 mt-1">
                  {params.financingDurationYears} yr amortizing note
                </div>
              </div>

              {/* Metric 5: Owner Retained Cashflow */}
              <div className="p-4 bg-emerald-950/20 border border-emerald-500/40 shadow-md">
                <div className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">OWNER_NET_RETAINED</div>
                <div className="text-xl sm:text-2xl font-mono font-black text-emerald-300 mt-1">
                  +₹{result.ownerRetainedINR.toFixed(2)}{' '}
                  <span className="text-xs font-normal text-emerald-200">Cr/yr</span>
                </div>
                <div className="text-[10px] font-mono text-emerald-400 mt-1">
                  Immediate free cashflow
                </div>
              </div>

              {/* Metric 6: Emissions Avoided */}
              <div className="p-4 bg-white/[0.02] border border-white/10 shadow-md">
                <div className="text-[10px] font-mono text-white/40 uppercase tracking-wider">CO₂e_AVOIDED</div>
                <div className="text-xl sm:text-2xl font-mono font-black text-teal-300 mt-1">
                  {result.emissionsAvoidedCO2eTonnes.toLocaleString()}{' '}
                  <span className="text-xs font-normal text-white/40">t</span>
                </div>
                <div className="text-[10px] font-mono text-teal-400 mt-1">
                  CII Grade: {result.ciiRatingImprovement.before} → {result.ciiRatingImprovement.after}
                </div>
              </div>

            </div>

            {/* DYNAMIC BEFORE / AFTER VESSEL SPLIT-SCREEN */}
            <div className="p-6 bg-white/[0.02] border border-white/10 shadow-2xl tech-corner-accent">
              <div className="flex justify-between items-center mb-4 text-xs font-mono text-white/50 pb-3 border-b border-white/10">
                <span className="font-bold text-white uppercase tracking-wider">HYDRODYNAMIC EFFICIENCY COMPARISON</span>
                <span className="text-emerald-400 font-bold">-{params.efficiencyImprovementPercent.toFixed(1)}% DRAG REDUCTION</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                
                {/* BEFORE VESSEL */}
                <div className="p-4 bg-[#020617] border border-rose-500/30 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono font-bold text-rose-400">BEFORE (CONVENTIONAL)</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 bg-rose-950 text-rose-300 border border-rose-800/50">
                      100% Index
                    </span>
                  </div>

                  {/* Ship Sketch Before */}
                  <div className="h-20 w-full flex items-center justify-center bg-white/[0.02] p-2 border border-white/5">
                    <svg viewBox="0 0 300 80" className="w-full h-full opacity-70">
                      <path d="M 40 55 L 240 55 L 270 35 L 240 25 L 50 25 Z" fill="#334155" stroke="#ef4444" strokeWidth="1.5" />
                      <rect x="60" y="15" width="20" height="10" fill="#1e293b" stroke="#ef4444" strokeWidth="1" />
                      {/* Heavy turbulent friction lines */}
                      <path d="M 30 60 Q 150 70, 280 60" fill="none" stroke="#ef4444" strokeWidth="1" strokeDasharray="2 3" />
                    </svg>
                  </div>

                  <div className="space-y-1 font-mono text-xs">
                    <div className="flex justify-between text-white/50">
                      <span>Annual Fuel Burn:</span>
                      <span className="text-white font-bold">{params.annualFuelConsumption.toLocaleString()} t</span>
                    </div>
                    <div className="flex justify-between text-white/50">
                      <span>Annual Fuel Spend:</span>
                      <span className="text-rose-400 font-bold">₹{beforeAnnualCostINRCr.toFixed(2)} Cr</span>
                    </div>
                    <div className="flex justify-between text-white/50">
                      <span>CII Carbon Rating:</span>
                      <span className="text-rose-400 font-bold">Grade {result.ciiRatingImprovement.before} (Non-compliant)</span>
                    </div>
                  </div>
                </div>

                {/* AFTER RETROFIT VESSEL */}
                <div className="p-4 bg-[#020617] border border-emerald-500/40 space-y-3 relative">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono font-bold text-emerald-400">AFTER (SHIPLOOP RETROFIT)</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-800/50">
                      {remainingFuelPercent}% Index
                    </span>
                  </div>

                  {/* Ship Sketch After with Green Streamlines */}
                  <div className="h-20 w-full flex items-center justify-center bg-white/[0.02] p-2 border border-white/5 relative overflow-hidden">
                    <svg viewBox="0 0 300 80" className="w-full h-full">
                      <path d="M 40 55 L 240 55 L 270 35 L 240 25 L 50 25 Z" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
                      <rect x="60" y="15" width="20" height="10" fill="#0f172a" stroke="#10b981" strokeWidth="1" />
                      {/* Smooth hydrodynamic wake */}
                      <path d="M 30 58 Q 150 53, 280 58" fill="none" stroke="#34d399" strokeWidth="2" strokeDasharray="6 3" className="animate-[dash_8s_linear_infinite]" />
                      <circle cx="270" cy="35" r="2.5" fill="#34d399" className="animate-ping" />
                    </svg>
                  </div>

                  <div className="space-y-1 font-mono text-xs">
                    <div className="flex justify-between text-white/50">
                      <span>Annual Fuel Burn:</span>
                      <span className="text-emerald-300 font-bold">{afterAnnualFuelTonnes.toLocaleString()} t</span>
                    </div>
                    <div className="flex justify-between text-white/50">
                      <span>Annual Fuel Spend:</span>
                      <span className="text-emerald-400 font-bold">₹{afterAnnualCostINRCr.toFixed(2)} Cr</span>
                    </div>
                    <div className="flex justify-between text-white/50">
                      <span>CII Carbon Rating:</span>
                      <span className="text-emerald-400 font-bold">Grade {result.ciiRatingImprovement.after} (Tier-1 Compliant)</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* 10-Year Cumulative Value Callout */}
              <div className="mt-4 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-white/70 gap-2">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#00F2FF]" />
                  <span>10-Year Cumulative Net Owner Benefit:</span>
                </div>
                <div className="text-base font-bold text-emerald-400">
                  ₹{result.tenYearCumulativeNetOwnerBenefitINR.toFixed(2)} Cr Net Profit
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
