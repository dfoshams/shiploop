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
  Layers,
  Percent
} from 'lucide-react';
import { SimulationParams, SimulationResult, VesselPreset } from '../types';
import { DEMO_DATA } from '../data/demoData';
import { SourceButton } from './SourceButton';
import { PaybackCurvePanel } from './PaybackCurvePanel';
import { CarbonComplianceCalculator } from './CarbonComplianceCalculator';

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
  const [showPaybackCurve, setShowPaybackCurve] = useState<boolean>(false);

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
        <div className={`flex flex-col ${isPresentationMode ? 'mb-3' : 'mb-6'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/20 text-[#00F2FF] text-xs font-mono mb-2 tracking-widest uppercase self-start">
            <Sliders className="w-3.5 h-3.5" />
            <span>03 // LIVE INTERACTIVE MODEL</span>
          </div>

          {/* New Independent Financial Layer: Carbon & Compliance Cost Savings */}
          <CarbonComplianceCalculator params={params} result={result} />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 className={`${isPresentationMode ? 'text-2xl sm:text-4xl' : 'text-3xl sm:text-5xl'} font-black text-white font-mono tracking-tight leading-tight uppercase`}>
              BUILD YOUR VESSEL
            </h2>

            {/* Single Payback Curve Button & Reset Button on the same horizontal row as the title */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                id="btn-view-payback-curve"
                onClick={() => setShowPaybackCurve((prev) => !prev)}
                className={`flex items-center gap-2 px-3.5 sm:px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                  showPaybackCurve
                    ? 'bg-[#00F2FF] text-[#020617] border-[#00F2FF] shadow-[0_0_15px_rgba(0,242,255,0.4)]'
                    : 'bg-[#00F2FF]/15 hover:bg-[#00F2FF] text-[#00F2FF] hover:text-[#020617] border-[#00F2FF]/60 hover:border-[#00F2FF] shadow-sm'
                }`}
                title="Toggle between Payback Curve graph and Result Values"
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>{showPaybackCurve ? 'VIEW RESULT VALUES' : 'VIEW PAYBACK CURVE'}</span>
              </button>

              {/* Reset button */}
              <button
                id="btn-reset-simulator"
                onClick={handleResetDefaults}
                className="flex items-center gap-2 px-3 sm:px-3.5 py-1.5 bg-white/5 hover:bg-white/10 border border-white/20 text-xs font-mono text-white/80 hover:text-[#00F2FF] transition-all uppercase tracking-wider shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#00F2FF]" />
                <span>[RESET_DEFAULTS]</span>
              </button>
            </div>
          </div>

          <p className="text-white/60 font-mono mt-1 text-xs sm:text-sm tracking-wide">
            Calibrate operational and financial parameters. Continuous data recalculates cashflows, debt service, and emissions in real time.
          </p>
        </div>

        {/* Vessel Archetype Presets Bar */}
        <div className={`${isPresentationMode ? 'mb-3' : 'mb-6'} p-2 bg-white/[0.02] border border-white/10 flex flex-wrap items-center gap-2`}>
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* LEFT: Parameter Controls (5 Cols) - Compact, continuous calculator panel */}
          <div className="lg:col-span-5 p-4 sm:p-5 bg-white/[0.02] border border-white/10 shadow-xl space-y-3 tech-corner-accent">
            <div className="flex items-center justify-between pb-2 border-b border-white/10 text-xs font-mono">
              <span className="font-bold text-[#00F2FF] uppercase tracking-wider">VESSEL & RETROFIT INPUTS</span>
              <span className="px-2 py-0.5 bg-[#00F2FF]/10 text-[#00F2FF] text-[10px] border border-[#00F2FF]/40 tracking-wider">
                LIVE_KERNEL
              </span>
            </div>

            {/* Slider 1: Annual Fuel Consumption */}
            <div className="space-y-1.5">
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
                <span>10k tonnes</span>
                <span>25k tonnes</span>
              </div>
            </div>

            {/* Slider 2: Fuel Price (INR / tonne) */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-white/70 flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-[#FFB347]" />
                  Bunker Fuel Price (VLSFO)
                  <SourceButton evidenceId="MARKET-001" className="ml-1" />
                </span>
                <span className="text-[#FFB347] font-bold">
                  ₹{params.fuelPricePerTonneINR.toLocaleString()} / MT
                </span>
              </div>
              <input
                id="slider-fuel-price"
                type="range"
                min="35000"
                max="85000"
                step="500"
                value={params.fuelPricePerTonneINR}
                onChange={(e) => onParamsChange({ ...params, fuelPricePerTonneINR: Number(e.target.value) })}
                className="w-full h-1.5 bg-white/10 appearance-none cursor-pointer accent-[#FFB347]"
              />
              <div className="flex justify-between text-[10px] font-mono text-white/40">
                <span>₹35,000/MT</span>
                <span>₹67,500/MT</span>
                <span>₹85,000/MT</span>
              </div>
            </div>

            {/* Slider 3: Expected Efficiency Gain (%) */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-white/70 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-emerald-400" />
                  Efficiency Improvement
                  <SourceButton evidenceId="TECH-001" className="ml-1" />
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
                <span>7.5% (Flettner Rotors)</span>
                <span>20% (Wind + ALS)</span>
              </div>
            </div>

            {/* Slider 4: Retrofit CAPEX (₹ Crores) */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-white/70 flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-rose-400" />
                  Total Retrofit CAPEX
                  <SourceButton evidenceId="FIN-001" className="ml-1" />
                </span>
                <span className="text-rose-400 font-bold">
                  ₹{params.retrofitCostINR.toFixed(1)} Cr
                </span>
              </div>
              <input
                id="slider-retrofit-cost"
                type="range"
                min="2.0"
                max="50.0"
                step="0.5"
                value={params.retrofitCostINR}
                onChange={(e) => onParamsChange({ ...params, retrofitCostINR: Number(e.target.value) })}
                className="w-full h-1.5 bg-white/10 appearance-none cursor-pointer accent-rose-400"
              />
              <div className="flex justify-between text-[10px] font-mono text-white/40">
                <span>₹2 Cr</span>
                <span>₹30 Cr</span>
                <span>₹50 Cr</span>
              </div>
            </div>

            {/* Slider 5: Loan Interest Rate (0% to 15%, step 0.5%, default 0%) */}
            <div className="space-y-1.5 pt-2 border-t border-white/10">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-white/80 flex items-center gap-1.5">
                  <Percent className="w-3.5 h-3.5 text-[#00F2FF]" />
                  LOAN INTEREST RATE
                  <SourceButton evidenceId="FIN-002" className="ml-1" />
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[#00F2FF] font-bold text-sm">
                    {(params.interestRateAnnualPercent ?? 0).toFixed(1)}% p.a.
                  </span>
                  {(params.interestRateAnnualPercent ?? 0) === 0 && (
                    <span className="px-1.5 py-0.5 bg-emerald-500/20 text-emerald-300 text-[9px] border border-emerald-500/40 uppercase tracking-wider">
                      ZERO INTEREST
                    </span>
                  )}
                </div>
              </div>
              <input
                id="slider-interest-rate"
                type="range"
                min="0"
                max="15"
                step="0.5"
                value={params.interestRateAnnualPercent ?? 0}
                onChange={(e) => onParamsChange({ ...params, interestRateAnnualPercent: Number(e.target.value) })}
                className="w-full h-1.5 bg-white/10 appearance-none cursor-pointer accent-[#00F2FF]"
              />
              <div className="flex justify-between text-[10px] font-mono text-white/40">
                <span>0% (Zero Interest)</span>
                <span>7.5%</span>
                <span>15%</span>
              </div>
            </div>

            {/* Slider 6: Additional Profit Period (0 to 36 months, step 1 month, default 0 months) */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-white/80 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#FFB347]" />
                  ADDITIONAL PROFIT PERIOD
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[#FFB347] font-bold text-sm">
                    {params.additionalProfitPeriodMonths ?? 0} months
                  </span>
                  <span className="text-[10px] font-mono text-white/60 bg-white/5 px-1.5 py-0.5 border border-white/10">
                    {(params.additionalProfitPeriodMonths ?? 0) === 0
                      ? '0 months'
                      : (params.additionalProfitPeriodMonths ?? 0) === 12
                      ? '12 mo (1 yr)'
                      : (params.additionalProfitPeriodMonths ?? 0) === 24
                      ? '24 mo (2 yrs)'
                      : (params.additionalProfitPeriodMonths ?? 0) === 36
                      ? '36 mo (3 yrs)'
                      : `${params.additionalProfitPeriodMonths ?? 0} mo`}
                  </span>
                </div>
              </div>
              <input
                id="slider-additional-profit-period"
                type="range"
                min="0"
                max="36"
                step="1"
                value={params.additionalProfitPeriodMonths ?? 0}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  onParamsChange({ ...params, additionalProfitPeriodMonths: val, tenureExtensionMonths: val });
                }}
                className="w-full h-1.5 bg-white/10 appearance-none cursor-pointer accent-[#FFB347]"
              />
              <div className="flex justify-between text-[10px] font-mono text-white/40">
                <span>0 months</span>
                <span>12 mo (1 yr)</span>
                <span>24 mo (2 yrs)</span>
                <span>36 mo (3 yrs)</span>
              </div>
              <div className="text-[10px] font-mono text-white/60 bg-white/[0.03] p-1.5 border border-white/5 flex justify-between items-center">
                <span>Starts AFTER 100% Principal Repaid ({result.baseTenureYears} yrs)</span>
                <span className="font-bold text-[#FFB347]">
                  {(params.additionalProfitPeriodMonths ?? 0) > 0 ? `+${result.additionalProfitPeriodMonths} mo profit period` : '0 mo (no extra profit period)'}
                </span>
              </div>
            </div>

            {/* Slider 7: Savings Distribution (Bank 0-100%, default 90% Bank / 10% Shipowner) */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-white/80 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                  SAVINGS DISTRIBUTION
                </span>
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="text-[#00F2FF] font-bold">BANK {params.bankSavingsSharePercent ?? 90}%</span>
                  <span className="text-white/40">/</span>
                  <span className="text-emerald-400 font-bold">SHIPOWNER {100 - (params.bankSavingsSharePercent ?? 90)}%</span>
                </div>
              </div>
              <input
                id="slider-savings-distribution"
                type="range"
                min="0"
                max="100"
                step="5"
                value={params.bankSavingsSharePercent ?? 90}
                onChange={(e) => onParamsChange({ ...params, bankSavingsSharePercent: Number(e.target.value) })}
                className="w-full h-1.5 bg-white/10 appearance-none cursor-pointer accent-[#00F2FF]"
              />
              <div className="flex justify-between text-[10px] font-mono text-white/40">
                <span>Bank 0% / Owner 100%</span>
                <span>Bank 50% / Owner 50%</span>
                <span>Bank 90% / Owner 10%</span>
                <span>Bank 100% / Owner 0%</span>
              </div>
              <div className="text-[10px] font-mono text-white/50">
                Applies ONLY to savings generated during the Additional Profit Period
              </div>
            </div>

            {/* Additional parameters: Financed LTV & Base Loan Term */}
            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/10">
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
                  <span className="text-white/50">Base Term</span>
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

            <div className="pt-2 text-[11px] font-mono text-white/50 bg-white/[0.02] p-2.5 border border-white/10">
              <span className="text-[#00F2FF] font-bold">• Active Financing Calibration:</span>{' '}
              {(params.interestRateAnnualPercent ?? 0) > 0
                ? `${(params.interestRateAnnualPercent ?? 0).toFixed(1)}% p.a. interest`
                : '0.0% p.a. (Zero-Interest Principal Recovery)'}
              {' '}• {result.finalTenureMonths} mo repayment ({result.finalTenureYears.toFixed(1)} yrs) • Bank {result.bankSharePercent}% / Owner {result.ownerSharePercent}% distribution
            </div>

          </div>

          {/* RIGHT: Switchable Visualization Area - Result Values OR Large Payback Curve (7 Cols) */}
          <div className="lg:col-span-7">
            {showPaybackCurve ? (
              /* VIEW B: LARGE PAYBACK CURVE FULL STAGE */
              <PaybackCurvePanel
                params={params}
                result={result}
                onClose={() => setShowPaybackCurve(false)}
                isPresentationMode={isPresentationMode}
              />
            ) : (
              /* VIEW A: EXISTING RESULT VALUES & METRICS */
              <div className="space-y-3">
                
                {/* TOP: REPAYMENT TRAJECTORY VISUALIZER */}
                <div className="px-3.5 py-2 bg-gradient-to-r from-cyan-950/40 via-[#020617] to-emerald-950/30 border border-[#00F2FF]/40 shadow-[0_0_20px_rgba(0,242,255,0.08)] flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 font-mono text-xs tech-corner-accent">
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-[#00F2FF] animate-pulse" />
                    <span className="font-bold text-white uppercase tracking-wider text-xs">
                      REPAYMENT TRAJECTORY VISUALIZER
                    </span>
                  </div>
                  <span className="text-white/60 text-[11px] tracking-wide">
                    Live cashflow & debt repayment calculation
                  </span>
                </div>

                {/* Top 6 KPI Metric Cards - Strictly Separating Base Loan from Additional Profit */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              
                  {/* Metric 1: Base Loan Repayment */}
                  <div className="p-2.5 sm:p-3 bg-white/[0.02] border border-white/10 shadow-md">
                    <div className="text-[10px] font-mono text-white/40 uppercase tracking-wider">BASE LOAN REPAYMENT</div>
                    <div className="text-lg sm:text-xl font-mono font-black text-[#FFB347] mt-0.5">
                      ₹{result.annualRepaymentINR.toFixed(2)}{' '}
                      <span className="text-[11px] font-normal text-[#FFB347]/80">Cr/yr</span>
                    </div>
                    <div className="text-[10px] font-mono text-white/50 mt-0.5 flex justify-between">
                      <span>₹{(result.monthlyRepaymentINR * 100).toFixed(2)} L/mo</span>
                      <span>{result.baseTenureMonths} mo ({result.baseTenureYears} yrs)</span>
                    </div>
                  </div>

                  {/* Metric 2: Loan Completion */}
                  <div className="p-2.5 sm:p-3 bg-cyan-950/20 border border-cyan-500/40 shadow-md">
                    <div className="text-[10px] font-mono text-[#00F2FF] font-bold uppercase tracking-wider">LOAN COMPLETION</div>
                    <div className="text-lg sm:text-xl font-mono font-black text-[#00F2FF] mt-0.5">
                      100%{' '}
                      <span className="text-[11px] font-normal text-cyan-300/80">REPAID</span>
                    </div>
                    <div className="text-[10px] font-mono text-white/60 mt-0.5">
                      ₹{result.bankPrincipalRecoveredINR.toFixed(2)} Cr principal repaid
                    </div>
                  </div>

                  {/* Metric 3: Additional Bank Profit */}
                  <div className="p-2.5 sm:p-3 bg-white/[0.02] border border-white/10 shadow-md">
                    <div className="text-[10px] font-mono text-[#00F2FF] uppercase tracking-wider">ADDITIONAL BANK PROFIT</div>
                    <div className="text-lg sm:text-xl font-mono font-black text-white mt-0.5">
                      {result.additionalBankProfitINR > 0 ? `+₹${result.additionalBankProfitINR.toFixed(2)}` : '₹0.00'}{' '}
                      <span className="text-[11px] font-normal text-[#00F2FF]/80">Cr</span>
                    </div>
                    <div className="text-[10px] font-mono text-white/50 mt-0.5">
                      {result.additionalProfitPeriodMonths > 0 
                        ? `${result.bankSharePercent}% of ${result.additionalProfitPeriodMonths} mo profit period` 
                        : '0 mo (no extra profit period)'}
                    </div>
                  </div>

                  {/* Metric 4: Additional Shipowner Profit */}
                  <div className="p-2.5 sm:p-3 bg-white/[0.02] border border-white/10 shadow-md">
                    <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">ADDITIONAL OWNER PROFIT</div>
                    <div className="text-lg sm:text-xl font-mono font-black text-emerald-300 mt-0.5">
                      {result.additionalOwnerProfitINR > 0 ? `+₹${result.additionalOwnerProfitINR.toFixed(2)}` : '₹0.00'}{' '}
                      <span className="text-[11px] font-normal text-emerald-300/80">Cr</span>
                    </div>
                    <div className="text-[10px] font-mono text-emerald-400/80 mt-0.5">
                      {result.additionalProfitPeriodMonths > 0 
                        ? `${result.ownerSharePercent}% of ${result.additionalProfitPeriodMonths} mo profit period` 
                        : '0 mo (no extra profit period)'}
                    </div>
                  </div>

                  {/* Metric 5: Total Bank Return */}
                  <div className="p-2.5 sm:p-3 bg-cyan-950/20 border border-[#00F2FF]/50 shadow-md">
                    <div className="text-[10px] font-mono text-[#00F2FF] font-bold uppercase tracking-wider">TOTAL BANK RETURN</div>
                    <div className="text-lg sm:text-xl font-mono font-black text-[#00F2FF] mt-0.5">
                      ₹{result.bankTotalReturnINR.toFixed(2)}{' '}
                      <span className="text-[11px] font-normal text-[#00F2FF]/70">Cr</span>
                    </div>
                    <div className="text-[10px] font-mono text-white/70 mt-0.5">
                      Net gain: +₹{result.bankNetGainINR.toFixed(2)} Cr
                    </div>
                  </div>

                  {/* Metric 6: Total Shipowner Benefit */}
                  <div className="p-2.5 sm:p-3 bg-emerald-950/20 border border-emerald-500/50 shadow-md">
                    <div className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">TOTAL SHIPOWNER BENEFIT</div>
                    <div className="text-lg sm:text-xl font-mono font-black text-emerald-300 mt-0.5">
                      ₹{result.tenYearCumulativeNetOwnerBenefitINR.toFixed(2)}{' '}
                      <span className="text-[11px] font-normal text-emerald-200">Cr</span>
                    </div>
                    <div className="text-[10px] font-mono text-emerald-400 mt-0.5">
                      10-year cumulative net profit
                    </div>
                  </div>

                </div>

                {/* FINANCIAL TIMELINE - SEQUENTIAL PHASES & CLEAR BOUNDARY */}
                <div className="p-3 bg-white/[0.02] border border-white/10 font-mono text-xs space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-1.5 pb-1.5 border-b border-white/10">
                    <span className="text-white/80 font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#FFB347]" />
                      FINANCIAL TIMELINE: SEQUENTIAL PHASES
                    </span>
                    <span className="text-[10px] text-white/50">
                      BASE LOAN TERM ≠ ADDITIONAL PROFIT PERIOD
                    </span>
                  </div>

                  {/* 4-Step Timeline Flow */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                    {/* Step 1: Financing Start */}
                    <div className="p-2 bg-black/40 border border-white/10 space-y-0.5">
                      <div className="text-[9px] text-white/40 font-bold">STAGE 01</div>
                      <div className="text-white font-bold text-[11px]">FINANCING START</div>
                      <div className="text-white/60 text-[10px] leading-tight">₹{result.financedAmountINR.toFixed(2)} Cr 100% Upfront Capex funded by Bank</div>
                    </div>

                    {/* Step 2: Base Loan Term */}
                    <div className="p-2 bg-[#020617] border border-[#FFB347]/40 space-y-0.5 relative">
                      <div className="text-[9px] text-[#FFB347] font-bold">STAGE 02 // REPAYMENT</div>
                      <div className="text-[#FFB347] font-bold text-[11px]">BASE LOAN TERM</div>
                      <div className="text-white/70 text-[10px] leading-tight">
                        {result.baseTenureYears} yrs ({result.baseTenureMonths} mo) @ ₹{result.annualRepaymentINR.toFixed(2)} Cr/yr
                      </div>
                      <div className="text-[9px] text-emerald-400 font-bold">→ 100% Principal Repaid</div>
                    </div>

                    {/* Step 3: Additional Profit Period (AFTER 100% Repayment) */}
                    <div className={`p-2 bg-[#020617] space-y-0.5 relative ${result.additionalProfitPeriodMonths > 0 ? 'border border-[#00F2FF]/60 bg-cyan-950/20' : 'border border-dashed border-white/20'}`}>
                      <div className="text-[9px] text-[#00F2FF] font-bold">
                        STAGE 03 // {result.additionalProfitPeriodMonths > 0 ? 'PROFIT PERIOD' : 'PROFIT (0 mo)'}
                      </div>
                      <div className="text-white font-bold text-[11px]">ADDITIONAL PROFIT</div>
                      <div className="text-white/70 text-[10px] leading-tight">
                        {result.additionalProfitPeriodMonths > 0 
                          ? `${result.additionalProfitPeriodMonths} mo: Bank ${result.bankSharePercent}% / Owner ${result.ownerSharePercent}%` 
                          : 'Slider at 0 mo (No extra profit)'}
                      </div>
                      <div className="text-[9px] text-[#00F2FF] leading-tight">
                        {result.additionalProfitPeriodMonths > 0 ? `+₹${result.additionalProfitTotalSavingsINR.toFixed(2)} Cr distributed` : 'Additional Bank Profit = ₹0.00'}
                      </div>
                    </div>

                    {/* Step 4: Final Owner Retention */}
                    <div className="p-2 bg-[#020617] border border-emerald-500/40 space-y-0.5">
                      <div className="text-[9px] text-emerald-400 font-bold">STAGE 04 // RETENTION</div>
                      <div className="text-emerald-300 font-bold text-[11px]">OWNER RETENTION</div>
                      <div className="text-white/70 text-[10px] leading-tight">
                        Loan closed. 100% fuel savings to owner
                      </div>
                      <div className="text-[9px] text-emerald-400">
                        +₹{result.availableVerifiedSavingsINR.toFixed(2)} Cr/yr
                      </div>
                    </div>
                  </div>

                  {/* Visual Divider Boundary */}
                  <div className="p-1.5 bg-black/60 border border-white/10 flex flex-wrap items-center justify-between gap-1.5 text-[10px]">
                    <div className="flex items-center gap-1.5">
                      <span className="px-1.5 py-0.5 bg-[#FFB347]/20 text-[#FFB347] border border-[#FFB347]/40 font-bold text-[9px]">
                        LOAN PERIOD: {result.baseTenureYears} YRS
                      </span>
                      <span className="text-white/40">➔</span>
                      <span className="px-1.5 py-0.5 bg-cyan-950 text-[#00F2FF] border border-[#00F2FF]/40 font-bold text-[9px]">
                        100% REPAID
                      </span>
                      <span className="text-white/40">➔</span>
                      <span className="px-1.5 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-500/40 font-bold text-[9px]">
                        PROFIT PERIOD: {result.additionalProfitPeriodMonths} MO
                      </span>
                    </div>
                    <span className="text-white/50 text-[10px]">
                      Total: {result.totalTimelineYears.toFixed(1)} yrs
                    </span>
                  </div>
                </div>

                {/* LIVE FINANCING & RETURN COMPOSITION STRIP */}
                <div className="p-3 bg-white/[0.02] border border-white/10 font-mono text-xs space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-1.5 pb-1.5 border-b border-white/10">
                    <span className="text-white/80 font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#00F2FF]" />
                      RETURN & CASHFLOW DECOMPOSITION
                    </span>
                    <span className="text-xs text-white/60">
                      DSCR: <strong className="text-emerald-400">{result.debtServiceCoverageRatio.toFixed(2)}x</strong> | Verified Savings: <strong className="text-white">₹{result.availableVerifiedSavingsINR.toFixed(2)} Cr/yr</strong>
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[11px]">
                    {/* Bank Return Card */}
                    <div className="p-2.5 bg-black/40 border border-cyan-500/20 space-y-1">
                      <div className="text-[#00F2FF] font-bold flex justify-between">
                        <span>BANK TOTAL RETURN</span>
                        <span>₹{result.bankTotalReturnINR.toFixed(2)} Cr</span>
                      </div>
                      <div className="flex justify-between text-white/60 text-[10px]">
                        <span>• Principal Repaid:</span>
                        <span className="text-white">₹{result.bankPrincipalRecoveredINR.toFixed(2)} Cr (100%)</span>
                      </div>
                      <div className="flex justify-between text-white/60 text-[10px]">
                        <span>• Interest Earned:</span>
                        <span className="text-white">
                          {(params.interestRateAnnualPercent ?? 0) > 0 
                            ? `₹${result.bankInterestEarnedINR.toFixed(2)} Cr (${(params.interestRateAnnualPercent ?? 0).toFixed(1)}%)` 
                            : '₹0.00 Cr (0%)'}
                        </span>
                      </div>
                      <div className="flex justify-between text-white/60 text-[10px]">
                        <span>• Profit Period ({result.bankSharePercent}%):</span>
                        <span className="text-[#00F2FF] font-bold">
                          {result.additionalBankProfitINR > 0 ? `+₹${result.additionalBankProfitINR.toFixed(2)} Cr` : '₹0.00 Cr'}
                        </span>
                      </div>
                      <div className="flex justify-between pt-1 border-t border-white/10 text-[#00F2FF] font-bold text-[10px]">
                        <span>Net Gain Above Principal:</span>
                        <span>+₹{result.bankNetGainINR.toFixed(2)} Cr ({result.bankAnnualizedYieldPercent.toFixed(1)}% yield)</span>
                      </div>
                    </div>

                    {/* Shipowner Return Card */}
                    <div className="p-2.5 bg-black/40 border border-emerald-500/20 space-y-1">
                      <div className="text-emerald-300 font-bold flex justify-between">
                        <span>SHIPOWNER BENEFIT BREAKDOWN</span>
                        <span>₹{result.tenYearCumulativeNetOwnerBenefitINR.toFixed(2)} Cr</span>
                      </div>
                      <div className="flex justify-between text-white/60 text-[10px]">
                        <span>• Base Term Annual Surplus:</span>
                        <span className="text-emerald-300">+₹{result.ownerBaseTermAnnualSurplusINR.toFixed(2)} Cr/yr</span>
                      </div>
                      <div className="flex justify-between text-white/60 text-[10px]">
                        <span>• Profit Period ({result.ownerSharePercent}%):</span>
                        <span className="text-emerald-300 font-bold">
                          {result.additionalOwnerProfitINR > 0 ? `+₹${result.additionalOwnerProfitINR.toFixed(2)} Cr` : '₹0.00 Cr'}
                        </span>
                      </div>
                      <div className="flex justify-between text-white/60 text-[10px]">
                        <span>• Post-Financing 100% Retained:</span>
                        <span className="text-white">₹{result.postDebtAnnualOwnerINR.toFixed(2)} Cr/yr</span>
                      </div>
                      <div className="flex justify-between pt-1 border-t border-white/10 text-emerald-400 font-bold text-[10px]">
                        <span>10-Yr Cumulative Net Profit:</span>
                        <span>₹{result.tenYearCumulativeNetOwnerBenefitINR.toFixed(2)} Cr</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* DYNAMIC BEFORE / AFTER VESSEL SPLIT-SCREEN */}
                <div className="p-3 sm:p-4 bg-white/[0.02] border border-white/10 shadow-2xl tech-corner-accent">
                  <div className="flex justify-between items-center mb-2.5 text-xs font-mono text-white/50 pb-2 border-b border-white/10">
                    <span className="font-bold text-white uppercase tracking-wider">HYDRODYNAMIC EFFICIENCY COMPARISON</span>
                    <span className="text-emerald-400 font-bold">-{params.efficiencyImprovementPercent.toFixed(1)}% DRAG REDUCTION</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 relative">
                    
                    {/* BEFORE VESSEL */}
                    <div className="p-3 bg-[#020617] border border-rose-500/30 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-mono font-bold text-rose-400">BEFORE (CONVENTIONAL)</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 bg-rose-950 text-rose-300 border border-rose-800/50">
                          100% Index
                        </span>
                      </div>

                      {/* Ship Sketch Before */}
                      <div className="h-14 w-full flex items-center justify-center bg-white/[0.02] p-1 border border-white/5">
                        <svg viewBox="0 0 300 80" className="w-full h-full opacity-70">
                          <path d="M 40 55 L 240 55 L 270 35 L 240 25 L 50 25 Z" fill="#334155" stroke="#ef4444" strokeWidth="1.5" />
                          <rect x="60" y="15" width="20" height="10" fill="#1e293b" stroke="#ef4444" strokeWidth="1" />
                          {/* Heavy turbulent friction lines */}
                          <path d="M 30 60 Q 150 70, 280 60" fill="none" stroke="#ef4444" strokeWidth="1" strokeDasharray="2 3" />
                        </svg>
                      </div>

                      <div className="space-y-0.5 font-mono text-[11px]">
                        <div className="flex justify-between text-white/50">
                          <span>Annual Fuel Burn:</span>
                          <span className="text-white font-bold">{params.annualFuelConsumption.toLocaleString()} t</span>
                        </div>
                        <div className="flex justify-between text-white/50">
                          <span>Annual Fuel Spend:</span>
                          <span className="text-rose-400 font-bold">₹{beforeAnnualCostINRCr.toFixed(2)} Cr</span>
                        </div>
                        <div className="flex justify-between items-center text-white/50">
                          <span className="flex items-center gap-1">
                            CII Carbon Rating:
                            <SourceButton evidenceId="POLICY-001" />
                          </span>
                          <span className="text-rose-400 font-bold">Grade {result.ciiRatingImprovement.before}</span>
                        </div>
                      </div>
                    </div>

                    {/* AFTER RETROFIT VESSEL */}
                    <div className="p-3 bg-[#020617] border border-emerald-500/40 space-y-2 relative">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-mono font-bold text-emerald-400">AFTER (SHIPLOOP RETROFIT)</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-800/50">
                          {remainingFuelPercent}% Index
                        </span>
                      </div>

                      {/* Ship Sketch After with Green Streamlines */}
                      <div className="h-14 w-full flex items-center justify-center bg-white/[0.02] p-1 border border-white/5 relative overflow-hidden">
                        <svg viewBox="0 0 300 80" className="w-full h-full">
                          <path d="M 40 55 L 240 55 L 270 35 L 240 25 L 50 25 Z" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
                          <rect x="60" y="15" width="20" height="10" fill="#0f172a" stroke="#10b981" strokeWidth="1" />
                          {/* Smooth hydrodynamic wake */}
                          <path d="M 30 58 Q 150 53, 280 58" fill="none" stroke="#34d399" strokeWidth="2" strokeDasharray="6 3" className="animate-[dash_8s_linear_infinite]" />
                          <circle cx="270" cy="35" r="2.5" fill="#34d399" className="animate-ping" />
                        </svg>
                      </div>

                      <div className="space-y-0.5 font-mono text-[11px]">
                        <div className="flex justify-between text-white/50">
                          <span>Annual Fuel Burn:</span>
                          <span className="text-emerald-300 font-bold">{afterAnnualFuelTonnes.toLocaleString()} t</span>
                        </div>
                        <div className="flex justify-between text-white/50">
                          <span>Annual Fuel Spend:</span>
                          <span className="text-emerald-400 font-bold">₹{afterAnnualCostINRCr.toFixed(2)} Cr</span>
                        </div>
                        <div className="flex justify-between items-center text-white/50">
                          <span className="flex items-center gap-1">
                            CII Carbon Rating:
                            <SourceButton evidenceId="POLICY-001" />
                          </span>
                          <span className="text-emerald-400 font-bold">Grade {result.ciiRatingImprovement.after}</span>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* 10-Year Cumulative Value Callout */}
                  <div className="mt-3 pt-2.5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-white/70 gap-2">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-[#00F2FF]" />
                      <span>10-Year Cumulative Net Owner Benefit:</span>
                    </div>
                    <div className="text-sm font-bold text-emerald-400">
                      ₹{result.tenYearCumulativeNetOwnerBenefitINR.toFixed(2)} Cr Net Profit
                    </div>
                  </div>

                </div>

              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
