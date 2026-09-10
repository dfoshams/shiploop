import React from 'react';
import { Sliders, RotateCcw, TrendingUp, ShieldCheck, DollarSign, Calendar, Sparkles, Fuel } from 'lucide-react';
import { usePresentation } from '../PresentationContext';
import { PRESENTER_PRESETS } from '../presentationScenes';
import { PresenterPreset } from '../types';

export const Scene4Simulator: React.FC = () => {
  const { 
    simParams, 
    simResult, 
    updateSimParams, 
    applyPreset, 
    currentPreset 
  } = usePresentation();

  // Presenter Presets
  const presetKeys: PresenterPreset[] = ['BASE', 'OPTIMISTIC', 'CONSERVATIVE', 'STRESS'];

  const handleEfficiencyChange = (val: number) => {
    updateSimParams({
      ...simParams,
      efficiencyImprovementPercent: val,
    });
  };

  const handleFuelPriceChange = (val: number) => {
    updateSimParams({
      ...simParams,
      fuelPricePerTonneINR: val,
    });
  };

  const handleRetrofitCostChange = (val: number) => {
    updateSimParams({
      ...simParams,
      retrofitCostINR: val,
    });
  };

  return (
    <div 
      onClick={(e) => e.stopPropagation()} // Keep slider / preset interaction contained
      className="w-full h-full flex flex-col justify-between p-6 sm:p-10 max-w-7xl mx-auto font-mono"
    >
      
      {/* Top Scene Header & Preset Bar */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-4 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-[#00F2FF] rotate-45" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#00F2FF] font-bold tracking-widest uppercase">
                  CHAPTER 04 // LIVE FINANCIAL CALCULUS
                </span>
                <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-[#FFB347] text-[10px] font-bold uppercase tracking-wider">
                  ILLUSTRATIVE SIMULATION
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight uppercase">
                VESSEL UNDERWRITING SIMULATOR
              </h1>
            </div>
          </div>

          {/* Preset Buttons Bar (Req 16) */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-white/40 uppercase font-bold tracking-widest hidden lg:inline">
              PRESETS:
            </span>
            {presetKeys.map((key) => {
              const p = PRESENTER_PRESETS[key];
              const isSelected = currentPreset === key;
              return (
                <button
                  key={key}
                  onClick={() => applyPreset(key)}
                  className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#00F2FF] text-black border-[#00F2FF] shadow-[0_0_15px_rgba(0,242,255,0.4)]'
                      : 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border-white/10'
                  }`}
                  title={p.description}
                >
                  {p.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Current Preset Active Description */}
        <div className="mt-2 text-xs text-white/50 flex items-center justify-between">
          <span>{PRESENTER_PRESETS[currentPreset]?.description}</span>
          <span className="text-[#00F2FF] text-[11px] hidden sm:inline uppercase">
            {PRESENTER_PRESETS[currentPreset]?.tag}
          </span>
        </div>
      </div>

      {/* Main Content Area: Left Giant Outputs, Right Calibration Sliders */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-auto items-center">
        
        {/* Left: Giant Metrics For 3-10m Projector Readability */}
        <div className="lg:col-span-7 grid grid-cols-2 gap-4">
          
          {/* Card 1: Gross Annual Fuel Savings */}
          <div className="p-6 bg-white/[0.03] border border-[#00F2FF]/40 tech-corner-accent shadow-[0_0_25px_rgba(0,242,255,0.15)] col-span-2 sm:col-span-1">
            <div className="text-[10px] text-[#00F2FF] uppercase font-bold tracking-wider mb-1 flex items-center gap-1.5">
              <Fuel className="w-3.5 h-3.5" />
              <span>GROSS ANNUAL SAVINGS</span>
            </div>
            <div className="text-4xl sm:text-5xl font-black text-white tracking-tight">
              ₹{simResult.grossAnnualSavingsINR.toFixed(2)}{' '}
              <span className="text-xl text-[#00F2FF]">Cr</span>
            </div>
            <div className="text-xs text-white/50 mt-1">
              {simResult.annualFuelSavedTonnes.toLocaleString()} MT bunker unburned
            </div>
          </div>

          {/* Card 2: Annual Debt Service Repayment */}
          <div className="p-6 bg-white/[0.03] border border-white/10 tech-corner-accent col-span-2 sm:col-span-1">
            <div className="text-[10px] text-[#FFB347] uppercase font-bold tracking-wider mb-1 flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5" />
              <span>ANNUAL DEBT ANNUITY</span>
            </div>
            <div className="text-4xl sm:text-5xl font-black text-white tracking-tight">
              ₹{simResult.annualRepaymentINR.toFixed(2)}{' '}
              <span className="text-xl text-[#FFB347]">Cr</span>
            </div>
            <div className="text-xs text-white/50 mt-1">
              6 yrs @ 8.5% p.a. senior debt
            </div>
          </div>

          {/* Card 3: DSCR Coverage */}
          <div className="p-5 bg-white/[0.02] border border-white/10 tech-corner-accent">
            <div className="text-[10px] text-emerald-400 uppercase font-bold tracking-wider mb-1 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>BANK DSCR COVERAGE</span>
            </div>
            <div className="text-3xl sm:text-4xl font-black text-emerald-400 tracking-tight">
              {simResult.debtServiceCoverageRatio.toFixed(2)}x
            </div>
            <div className="text-[10px] text-white/50 mt-1">
              Bank minimum required: &gt;1.30x
            </div>
          </div>

          {/* Card 4: Retrofit Payback Period */}
          <div className="p-5 bg-white/[0.02] border border-white/10 tech-corner-accent">
            <div className="text-[10px] text-white/60 uppercase font-bold tracking-wider mb-1 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>CAPEX PAYBACK</span>
            </div>
            <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {simResult.retrofitPaybackYears.toFixed(1)}{' '}
              <span className="text-base text-white/60">Yrs</span>
            </div>
            <div className="text-[10px] text-white/50 mt-1">
              Full amortization in 6 yrs
            </div>
          </div>

          {/* Card 5: Carbon Abatement (Full Width) */}
          <div className="col-span-2 p-3.5 bg-white/[0.02] border border-white/10 flex items-center justify-between text-xs">
            <span className="text-white/60 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>ANNUAL EMISSIONS ABATED:</span>
            </span>
            <span className="text-emerald-400 font-black text-sm">
              {Math.round(simResult.emissionsAvoidedCO2eTonnes).toLocaleString()} Tonnes CO2e / year
            </span>
          </div>

        </div>

        {/* Right: Presenter Live Calibrator Sliders */}
        <div className="lg:col-span-5 p-6 bg-white/[0.02] border border-white/10 tech-corner-accent space-y-5">
          <div className="text-xs text-[#00F2FF] font-bold uppercase tracking-wider flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5" />
              <span>PRESENTER REAL-TIME CALIBRATOR</span>
            </span>
            <span className="text-[10px] text-white/40">LIVE INPUTS</span>
          </div>

          {/* Slider 1: Efficiency % */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-white/70">Efficiency Gain:</span>
              <span className="text-[#00F2FF] font-bold text-sm">
                {simParams.efficiencyImprovementPercent}%
              </span>
            </div>
            <input
              type="range"
              min={5}
              max={30}
              step={0.5}
              value={simParams.efficiencyImprovementPercent}
              onChange={(e) => handleEfficiencyChange(parseFloat(e.target.value))}
              className="w-full accent-[#00F2FF] h-1.5 bg-white/10 rounded-none cursor-pointer"
            />
            <div className="flex justify-between text-[9px] text-white/30">
              <span>5% (Conservative)</span>
              <span>15% (Base)</span>
              <span>30% (Aggressive)</span>
            </div>
          </div>

          {/* Slider 2: Bunker Fuel Price */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-white/70">Bunker Fuel Price / MT:</span>
              <span className="text-[#FFB347] font-bold text-sm">
                ₹{simParams.fuelPricePerTonneINR.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min={30000}
              max={75000}
              step={1000}
              value={simParams.fuelPricePerTonneINR}
              onChange={(e) => handleFuelPriceChange(parseInt(e.target.value))}
              className="w-full accent-[#FFB347] h-1.5 bg-white/10 rounded-none cursor-pointer"
            />
            <div className="flex justify-between text-[9px] text-white/30">
              <span>₹30k (Crashed)</span>
              <span>₹50k (Current VLSFO)</span>
              <span>₹75k (High Peak)</span>
            </div>
          </div>

          {/* Slider 3: Retrofit Capex */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-white/70">Retrofit Hardware CAPEX:</span>
              <span className="text-white font-bold text-sm">
                ₹{simParams.retrofitCostINR.toFixed(1)} Cr
              </span>
            </div>
            <input
              type="range"
              min={5.0}
              max={25.0}
              step={0.5}
              value={simParams.retrofitCostINR}
              onChange={(e) => handleRetrofitCostChange(parseFloat(e.target.value))}
              className="w-full accent-white h-1.5 bg-white/10 rounded-none cursor-pointer"
            />
            <div className="flex justify-between text-[9px] text-white/30">
              <span>₹5.0 Cr (Feeder)</span>
              <span>₹10.0 Cr (Panamax)</span>
              <span>₹25.0 Cr (VLCC)</span>
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Presenter Guidance */}
      <div className="p-3 bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-white/60">
        <div>
          <span>PRESENTER CONTROL: </span>
          <span className="text-white">Adjust sliders to test audience questions or toggle 4 presets above.</span>
        </div>
        <div className="text-[11px] text-white/40">
          PRESS [→] FOR CAPITAL WATERFALL
        </div>
      </div>

    </div>
  );
};
