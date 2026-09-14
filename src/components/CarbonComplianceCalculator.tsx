import React, { useState } from 'react';
import { 
  Leaf, 
  ChevronDown, 
  ChevronUp, 
  Sliders, 
  TrendingUp, 
  ShieldCheck, 
  Sparkles, 
  X, 
  Info, 
  ArrowRight,
  Globe2,
  Anchor,
  HelpCircle
} from 'lucide-react';
import { SimulationParams, SimulationResult } from '../types';
import { 
  CarbonComplianceParams, 
  DEFAULT_CARBON_PARAMS, 
  calculateCarbonCompliance,
  EuEtsScope,
  UkEtsScope,
  FuelEuPathway
} from '../logic/carbonComplianceModel';
import { SourceButton } from './SourceButton';
import { CarbonComplianceGraph } from './CarbonComplianceGraph';

interface CarbonComplianceCalculatorProps {
  params: SimulationParams;
  result: SimulationResult;
}

export const CarbonComplianceCalculator: React.FC<CarbonComplianceCalculatorProps> = ({
  params,
  result,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'CALCULATOR' | 'GRAPH'>('CALCULATOR');
  const [carbonParams, setCarbonParams] = useState<CarbonComplianceParams>(DEFAULT_CARBON_PARAMS);

  // Live real-time calculations directly powered by existing Build Your Vessel results
  const calcResult = calculateCarbonCompliance(
    result.annualFuelSavedTonnes,
    result.grossAnnualSavingsINR,
    carbonParams
  );

  // Currency conversions formatter helper
  const formatINR = (valCr: number) => `₹${valCr.toFixed(2)} Cr`;
  const formatEUR = (valEUR: number) => `€${Math.round(valEUR).toLocaleString()}`;
  const formatGBP = (valGBP: number) => `£${Math.round(valGBP).toLocaleString()}`;
  const formatUSD = (valUSD: number) => `$${Math.round(valUSD).toLocaleString()}`;

  // If minimized (DEFAULT STATE)
  if (!isExpanded) {
    return (
      <div className="mb-4">
        <button
          id="btn-carbon-compliance-trigger"
          type="button"
          onClick={() => setIsExpanded(true)}
          className="group w-full flex items-center justify-between p-3.5 sm:p-4 bg-[#020b14]/90 hover:bg-[#031526] border border-cyan-500/25 hover:border-[#00F2FF]/60 transition-all duration-200 cursor-pointer shadow-sm text-left"
        >
          <div className="flex items-center gap-3">
            {/* Minimalist icon with subtle glow */}
            <div className="w-8 h-8 rounded-none bg-[#00F2FF]/10 border border-[#00F2FF]/40 flex items-center justify-center text-[#00F2FF] group-hover:scale-105 group-hover:border-[#00F2FF] transition-all">
              <Leaf className="w-4 h-4" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-white group-hover:text-[#00F2FF] tracking-wider uppercase transition-colors">
                  CARBON & COMPLIANCE COST SAVINGS
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 text-[9px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase">
                  ● 4 REGULATORY MECHANISMS
                </span>
              </div>
              <p className="text-[11px] sm:text-xs font-mono text-white/60 group-hover:text-white/80 transition-colors mt-0.5">
                Estimate additional savings from lower emissions and compliance exposure.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Live estimated preview value badge */}
            <div className="text-right hidden md:block">
              <span className="text-[10px] font-mono text-white/40 block uppercase tracking-wider">
                POTENTIAL ADDED BENEFIT
              </span>
              <span className="text-xs font-mono font-bold text-[#00F2FF]">
                +{calcResult.economicBoostPercentage.toFixed(1)}% OVER FUEL ALONE
              </span>
            </div>

            <div className="flex items-center gap-1 px-2.5 py-1 bg-white/5 group-hover:bg-[#00F2FF]/20 border border-white/10 group-hover:border-[#00F2FF]/40 text-xs font-mono text-[#00F2FF] uppercase tracking-wider">
              <span>EXPAND</span>
              <ChevronDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
            </div>
          </div>
        </button>
      </div>
    );
  }

  // -------------------------------------------------------------
  // EXPANDED STATE (ABOVE BUILD YOUR VESSEL)
  // -------------------------------------------------------------
  return (
    <div className="mb-8 font-mono animate-in fade-in duration-200">
      {/* If Graph View is active, render Graph Component */}
      {viewMode === 'GRAPH' ? (
        <CarbonComplianceGraph
          calcResult={calcResult}
          carbonParams={carbonParams}
          onBackToCalculator={() => setViewMode('CALCULATOR')}
          onClose={() => {
            setViewMode('CALCULATOR');
            setIsExpanded(false);
          }}
        />
      ) : (
        /* EXPANDED CALCULATOR WINDOW */
        <div className="w-full bg-[#020b14]/95 border border-[#00F2FF]/40 p-4 sm:p-6 lg:p-7 relative shadow-[0_0_35px_rgba(0,242,255,0.08)]">
          {/* Decorative Corner Accents */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#00F2FF]" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#00F2FF]" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#00F2FF]" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#00F2FF]" />

          {/* Window Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10 mb-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-[#00F2FF] animate-pulse" />
                <span className="text-xs font-bold text-[#00F2FF] tracking-wider uppercase">
                  INDEPENDENT FINANCIAL LAYER
                </span>
                <span className="px-2 py-0.2 bg-white/5 border border-white/15 text-[10px] text-white/70">
                  SOURCE OF TRUTH: BUILD YOUR VESSEL
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase">
                CARBON & COMPLIANCE COST SAVINGS
              </h3>
              <p className="text-xs sm:text-sm text-white/60 mt-0.5">
                Quantify avoided carbon costs and emissions compliance exposure alongside verified bunker fuel savings.
              </p>
            </div>

            {/* Actions: View Graph & Minimize */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                id="btn-view-carbon-savings-impact"
                onClick={() => setViewMode('GRAPH')}
                className="flex items-center gap-2 px-3.5 sm:px-4 py-2 bg-[#00F2FF] hover:bg-cyan-300 text-[#020617] text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(0,242,255,0.3)] cursor-pointer"
                title="View animated cumulative savings graph"
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>VIEW CARBON SAVINGS IMPACT</span>
              </button>

              <button
                onClick={() => setIsExpanded(false)}
                className="flex items-center gap-1 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/20 text-white/70 hover:text-white text-xs uppercase tracking-wider transition-all cursor-pointer"
                title="Minimize calculator"
              >
                <ChevronUp className="w-3.5 h-3.5 text-[#00F2FF]" />
                <span className="hidden sm:inline">MINIMIZE</span>
              </button>
            </div>
          </div>

          {/* Section 12: Vessel & Route Baseline Feed (Linked directly to Build Your Vessel) */}
          <div className="mb-6 p-3 bg-white/[0.02] border border-cyan-500/20 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <span className="text-[10px] text-white/40 uppercase tracking-wider block">
                ANNUAL FUEL CONSUMPTION
              </span>
              <span className="text-sm font-bold text-white">
                {params.annualFuelConsumption.toLocaleString()} t VLSFO/yr
              </span>
              <span className="text-[9px] text-[#00F2FF]/70 block mt-0.5">
                Linked to vessel inputs
              </span>
            </div>

            <div>
              <span className="text-[10px] text-white/40 uppercase tracking-wider block">
                EFFICIENCY IMPROVEMENT
              </span>
              <span className="text-sm font-bold text-white">
                {params.efficiencyImprovementPercent.toFixed(1)}% Net Gain
              </span>
              <span className="text-[9px] text-[#00F2FF]/70 block mt-0.5">
                From selected technology
              </span>
            </div>

            <div>
              <span className="text-[10px] text-white/40 uppercase tracking-wider block">
                ANNUAL FUEL SAVED
              </span>
              <span className="text-sm font-bold text-[#00F2FF]">
                {calcResult.annualFuelSavedTonnes.toLocaleString(undefined, { maximumFractionDigits: 1 })} tonnes/yr
              </span>
              <span className="text-[9px] text-white/50 block mt-0.5">
                Verified bunker avoided
              </span>
            </div>

            <div>
              <span className="text-[10px] text-white/40 uppercase tracking-wider block">
                ESTIMATED GHG AVOIDED
              </span>
              <span className="text-sm font-bold text-emerald-400">
                {Math.round(calcResult.avoidedCO2eTonnesPerYear).toLocaleString()} tCO₂e/yr
              </span>
              <span className="text-[9px] text-emerald-400/60 block mt-0.5">
                IMO factor: 3.114 t CO₂/t VLSFO
              </span>
            </div>
          </div>

          {/* 4 REGULATORY / COST MODULES GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            {/* MODULE A: EU ETS */}
            <div className="p-4 bg-white/[0.02] border border-emerald-500/30 relative flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white uppercase tracking-wider">
                      EU ETS
                    </span>
                    <span className="px-2 py-0.5 bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                      ● ACTIVE
                    </span>
                  </div>
                  <SourceButton evidenceId="REG-EUETS-001" title="Directive (EU) 2023/959 Maritime Scope" />
                </div>

                <p className="text-[11px] text-white/60 mb-3">
                  EU Emissions Trading System (Directive (EU) 2023/959). Avoided bunker fuel consumption eliminates mandatory allowance surrenders.
                </p>

                {/* Scope Selection */}
                <div className="mb-3">
                  <label className="text-[10px] text-white/60 block uppercase font-bold tracking-wider mb-1.5">
                    VOYAGE / ROUTE SCOPE COVERAGE
                  </label>
                  <div className="grid grid-cols-3 gap-1.5 text-[10px]">
                    <button
                      type="button"
                      onClick={() => setCarbonParams({ ...carbonParams, euEtsScope: 'INTRA_EU_100' })}
                      className={`p-1.5 border text-center transition-all cursor-pointer ${
                        carbonParams.euEtsScope === 'INTRA_EU_100'
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold'
                          : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
                      }`}
                    >
                      100% INTRA-EU
                    </button>
                    <button
                      type="button"
                      onClick={() => setCarbonParams({ ...carbonParams, euEtsScope: 'EXTRA_EU_50' })}
                      className={`p-1.5 border text-center transition-all cursor-pointer ${
                        carbonParams.euEtsScope === 'EXTRA_EU_50'
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold'
                          : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
                      }`}
                    >
                      50% EU ↔ NON-EU
                    </button>
                    <button
                      type="button"
                      onClick={() => setCarbonParams({ ...carbonParams, euEtsScope: 'OUT_OF_SCOPE_0' })}
                      className={`p-1.5 border text-center transition-all cursor-pointer ${
                        carbonParams.euEtsScope === 'OUT_OF_SCOPE_0'
                          ? 'bg-red-500/20 border-red-500 text-red-300 font-bold'
                          : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
                      }`}
                    >
                      0% OUT OF SCOPE
                    </button>
                  </div>
                </div>

                {/* EU ETS Allowance Price Input */}
                <div className="mb-3">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-[10px] text-white/60 uppercase font-bold tracking-wider">
                      EU ETS ALLOWANCE PRICE (€/tCO₂e)
                    </span>
                    <span className="text-emerald-400 font-bold">
                      €{carbonParams.euEtsPriceEUR} / tCO₂e
                    </span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="150"
                    step="1"
                    value={carbonParams.euEtsPriceEUR}
                    onChange={(e) =>
                      setCarbonParams({ ...carbonParams, euEtsPriceEUR: parseFloat(e.target.value) || 75 })
                    }
                    className="w-full accent-emerald-400 bg-white/10 h-1.5 cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] text-white/40 mt-1">
                    <span>€30 (Low)</span>
                    <span>€75 (Current Benchmark)</span>
                    <span>€150 (Stress High)</span>
                  </div>
                </div>

                {/* Surrender Rate Note */}
                <div className="text-[10px] text-white/50 bg-white/[0.02] p-2 border border-white/5">
                  Statutory Phase-in: <strong>100% surrender liability active in 2026</strong>. Eligible avoided: {Math.round(calcResult.euEtsEligibleAvoidedCO2eTonnes).toLocaleString()} tCO₂e/yr.
                </div>
              </div>

              {/* Module A Output Card */}
              <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-white/40 uppercase block">
                    EU ETS AVOIDED COMPLIANCE COST
                  </span>
                  <span className="text-sm sm:text-base font-bold text-emerald-400">
                    {calcResult.isEuEtsApplicable ? formatEUR(calcResult.euEtsAvoidedCostEUR) : '€0'} / year
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-white/40 uppercase block">IN INR CONVERSION</span>
                  <span className="text-xs sm:text-sm font-bold text-white">
                    {formatINR(calcResult.euEtsAvoidedCostINRCrore)} / yr
                  </span>
                </div>
              </div>
            </div>

            {/* MODULE B: UK ETS — MARITIME */}
            <div className="p-4 bg-white/[0.02] border border-sky-500/30 relative flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white uppercase tracking-wider">
                      UK ETS — MARITIME
                    </span>
                    <span className="px-2 py-0.5 bg-sky-500/15 border border-sky-500/40 text-sky-400 text-[10px] font-bold uppercase tracking-wider">
                      ● ACTIVE 1 JULY 2026
                    </span>
                  </div>
                  <SourceButton evidenceId="REG-UKETS-001" title="UK ETS Authority Maritime Statutory Framework" />
                </div>

                <p className="text-[11px] text-white/60 mb-3">
                  UK Emissions Trading Scheme Authority mandate for commercial vessels ≥5,000 GT. Applies to domestic & qualifying voyages.
                </p>

                {/* Scope Applicability Control */}
                <div className="mb-3">
                  <label className="text-[10px] text-white/60 block uppercase font-bold tracking-wider mb-1.5">
                    UK MARITIME APPLICABILITY STATUS
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-[10px]">
                    <button
                      type="button"
                      onClick={() => setCarbonParams({ ...carbonParams, ukEtsScope: 'OUT_OF_SCOPE' })}
                      className={`p-2 border text-center transition-all cursor-pointer ${
                        carbonParams.ukEtsScope === 'OUT_OF_SCOPE'
                          ? 'bg-white/10 border-white/40 text-white font-bold'
                          : 'bg-white/5 border-white/10 text-white/50 hover:text-white'
                      }`}
                    >
                      NOT IN SCOPE (£0)
                    </button>
                    <button
                      type="button"
                      onClick={() => setCarbonParams({ ...carbonParams, ukEtsScope: 'IN_SCOPE' })}
                      className={`p-2 border text-center transition-all cursor-pointer ${
                        carbonParams.ukEtsScope === 'IN_SCOPE'
                          ? 'bg-sky-500/20 border-sky-500 text-sky-300 font-bold'
                          : 'bg-white/5 border-white/10 text-white/50 hover:text-white'
                      }`}
                    >
                      UK DOMESTIC / IN-SCOPE
                    </button>
                  </div>
                </div>

                {/* UK ETS Allowance Price Input */}
                {carbonParams.ukEtsScope === 'IN_SCOPE' ? (
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-[10px] text-white/60 uppercase font-bold tracking-wider">
                        UK ETS ALLOWANCE PRICE (£/tCO₂e)
                      </span>
                      <span className="text-sky-400 font-bold">
                        £{carbonParams.ukEtsPriceGBP} / tCO₂e
                      </span>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max="120"
                      step="1"
                      value={carbonParams.ukEtsPriceGBP}
                      onChange={(e) =>
                        setCarbonParams({ ...carbonParams, ukEtsPriceGBP: parseFloat(e.target.value) || 45 })
                      }
                      className="w-full accent-sky-400 bg-white/10 h-1.5 cursor-pointer"
                    />
                    <div className="flex justify-between text-[9px] text-white/40 mt-1">
                      <span>£20</span>
                      <span>£45 (Benchmark)</span>
                      <span>£120</span>
                    </div>
                  </div>
                ) : (
                  <div className="p-2.5 bg-white/[0.02] border border-white/5 text-[10px] text-white/50 italic mb-3">
                    Vessel voyage outside UK domestic maritime scope. Avoided allowance requirement assigned as £0.
                  </div>
                )}
              </div>

              {/* Module B Output Card */}
              <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-white/40 uppercase block">
                    UK ETS AVOIDED COMPLIANCE COST
                  </span>
                  <span className="text-sm sm:text-base font-bold text-sky-400">
                    {calcResult.isUkEtsApplicable ? formatGBP(calcResult.ukEtsAvoidedCostGBP) : '£0'} / year
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-white/40 uppercase block">IN INR CONVERSION</span>
                  <span className="text-xs sm:text-sm font-bold text-white">
                    {formatINR(calcResult.ukEtsAvoidedCostINRCrore)} / yr
                  </span>
                </div>
              </div>
            </div>

            {/* MODULE C: FUELEU MARITIME */}
            <div className="p-4 bg-white/[0.02] border border-purple-500/30 relative flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white uppercase tracking-wider">
                      FUELEU MARITIME
                    </span>
                    <span className="px-2 py-0.5 bg-purple-500/15 border border-purple-500/40 text-purple-300 text-[10px] font-bold uppercase tracking-wider">
                      ● COMPLIANCE MECHANISM
                    </span>
                  </div>
                  <SourceButton evidenceId="REG-FUELEU-001" title="FuelEU Maritime Regulation (EU) 2023/1805" />
                </div>

                <div className="text-[10px] font-semibold text-purple-300 uppercase tracking-widest mb-1">
                  GHG-INTENSITY COMPLIANCE EXPOSURE (NOT A TAX)
                </div>

                <p className="text-[11px] text-white/60 mb-3">
                  FuelEU Maritime regulates the greenhouse-gas intensity of energy used onboard ships and can create compliance costs where requirements are not met.
                </p>

                {/* Pathway Selection / Expansion Points */}
                <div className="mb-3">
                  <label className="text-[10px] text-white/60 block uppercase font-bold tracking-wider mb-1.5">
                    ENERGY MIX & COMPLIANCE PATHWAY
                  </label>
                  <div className="space-y-1.5 text-[10px]">
                    <button
                      type="button"
                      onClick={() => setCarbonParams({ ...carbonParams, fuelEuPathway: 'DATA_REQUIRED' })}
                      className={`w-full p-2 border text-left flex items-center justify-between transition-all cursor-pointer ${
                        carbonParams.fuelEuPathway === 'DATA_REQUIRED'
                          ? 'bg-purple-500/20 border-purple-500 text-purple-200 font-bold'
                          : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
                      }`}
                    >
                      <span>REQUIRE DETAILED ENERGY MIX DATA (DEFAULT)</span>
                      <span className="text-[9px] text-white/40 font-normal">No penalty fabricated</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setCarbonParams({ ...carbonParams, fuelEuPathway: 'CONVENTIONAL_VLSFO_DEFICIT' })}
                      className={`w-full p-2 border text-left flex items-center justify-between transition-all cursor-pointer ${
                        carbonParams.fuelEuPathway === 'CONVENTIONAL_VLSFO_DEFICIT'
                          ? 'bg-purple-500/20 border-purple-500 text-purple-200 font-bold'
                          : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
                      }`}
                    >
                      <span>MODEL VLSFO DEFICIT AVOIDED (91.16 gCO₂e/MJ BASELINE)</span>
                      <span className="text-[9px] text-purple-300 font-normal">~€35/t fuel saved</span>
                    </button>
                  </div>
                </div>

                {/* Explanatory note or expansion info */}
                <div className="p-2.5 bg-white/[0.02] border border-white/5 text-[10px] text-white/60">
                  {calcResult.fuelEuStatusText}
                  <div className="mt-1 flex flex-wrap gap-2 text-[9px] text-white/40">
                    <span>• Metric: gCO₂e/MJ energy</span>
                    <span>• Baseline: 91.16</span>
                    <span>• Target (2025): -2%</span>
                    <span>• Deficit Penalty: €2,400/t VLSFO-eq</span>
                  </div>
                </div>
              </div>

              {/* Module C Output Card */}
              <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-white/40 uppercase block">
                    FUELEU COMPLIANCE EXPOSURE AVOIDED
                  </span>
                  <span className="text-sm sm:text-base font-bold text-purple-400">
                    {calcResult.isFuelEuDefensible && calcResult.fuelEuAvoidedCostEUR > 0
                      ? `${formatEUR(calcResult.fuelEuAvoidedCostEUR)} / yr`
                      : '€0 / Path-dependent'}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-white/40 uppercase block">IN INR CONVERSION</span>
                  <span className="text-xs sm:text-sm font-bold text-white">
                    {calcResult.isFuelEuDefensible && calcResult.fuelEuAvoidedCostINRCrore > 0
                      ? `${formatINR(calcResult.fuelEuAvoidedCostINRCrore)} / yr`
                      : '₹0.00 Cr'}
                  </span>
                </div>
              </div>
            </div>

            {/* MODULE D: IMO NET-ZERO FRAMEWORK (FUTURE / PROPOSED) */}
            <div className="p-4 bg-white/[0.02] border border-amber-500/30 relative flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white uppercase tracking-wider">
                      IMO NET-ZERO FRAMEWORK
                    </span>
                    <span className="px-2 py-0.5 bg-amber-500/15 border border-amber-500/40 text-amber-400 text-[10px] font-bold uppercase tracking-wider">
                      ● FUTURE / PROPOSED
                    </span>
                  </div>
                  <SourceButton evidenceId="REG-IMONET-001" title="IMO MEPC Mid-Term GHG Pricing Negotiations" />
                </div>

                {/* Prominent Exclusion Notice */}
                <div className="px-2.5 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[10px] font-bold uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>POTENTIAL FUTURE COMPLIANCE-COST EXPOSURE</span>
                  <span className="text-[9px] bg-amber-500/20 px-1.5 py-0.5 text-amber-200">
                    NOT INCLUDED IN CURRENT TOTAL
                  </span>
                </div>

                <p className="text-[11px] text-white/60 mb-3">
                  The framework includes a global GHG emissions-pricing mechanism and a fuel standard, but formal adoption is scheduled for 2027+.
                  <strong className="text-white/80 block mt-0.5">CURRENT SAVINGS ≠ FUTURE IMO SAVINGS.</strong>
                </p>

                {/* IMO Future Simulation Toggle */}
                <div className="mb-3">
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-white">
                    <input
                      type="checkbox"
                      checked={carbonParams.enableImoScenario}
                      onChange={(e) =>
                        setCarbonParams({ ...carbonParams, enableImoScenario: e.target.checked })
                      }
                      className="accent-amber-400 w-4 h-4 cursor-pointer"
                    />
                    <span className="font-semibold text-amber-200">
                      Simulate Proposed IMO Global GHG Price (2027+)
                    </span>
                  </label>
                </div>

                {/* IMO Price Slider when enabled */}
                {carbonParams.enableImoScenario ? (
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-[10px] text-amber-300/80 uppercase font-bold tracking-wider">
                        PROPOSED IMO GHG PRICE ($/tCO₂e)
                      </span>
                      <span className="text-amber-400 font-bold">
                        ${carbonParams.imoGhgPriceUSD} / tCO₂e
                      </span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="250"
                      step="5"
                      value={carbonParams.imoGhgPriceUSD}
                      onChange={(e) =>
                        setCarbonParams({ ...carbonParams, imoGhgPriceUSD: parseFloat(e.target.value) || 100 })
                      }
                      className="w-full accent-amber-400 bg-white/10 h-1.5 cursor-pointer"
                    />
                    <div className="flex justify-between text-[9px] text-white/40 mt-1">
                      <span>$50</span>
                      <span>$100 (Mid-Case)</span>
                      <span>$250 (High)</span>
                    </div>
                  </div>
                ) : (
                  <div className="p-2.5 bg-white/[0.02] border border-white/5 text-[10px] text-white/50 italic mb-3">
                    Scenario disabled. Future IMO liabilities are kept entirely separate from current statutory benefits.
                  </div>
                )}
              </div>

              {/* Module D Output Card */}
              <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-amber-400/70 uppercase block">
                    POTENTIAL FUTURE EXPOSURE (PROPOSED)
                  </span>
                  <span className="text-sm sm:text-base font-bold text-amber-400">
                    {carbonParams.enableImoScenario ? `${formatUSD(calcResult.imoFutureAvoidedUSD)} / yr` : '$0 (Disabled)'}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-amber-400/70 uppercase block">FUTURE EQUIVALENT</span>
                  <span className="text-xs sm:text-sm font-bold text-amber-300">
                    {carbonParams.enableImoScenario ? `${formatINR(calcResult.imoFutureAvoidedINRCrore)} / yr` : '₹0.00 Cr'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 13: MAIN RESULTS & FINANCIAL CONCILIATION */}
          <div className="p-4 sm:p-5 bg-[#031120] border border-[#00F2FF]/50 shadow-[0_0_20px_rgba(0,242,255,0.1)]">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-white/15">
              <div>
                <span className="text-xs font-bold text-[#00F2FF] uppercase tracking-wider">
                  COMBINED ECONOMIC VALUE WATERFALL
                </span>
                <h4 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight mt-0.5">
                  FUEL SAVING + CURRENT CARBON / COMPLIANCE SAVINGS
                </h4>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-white/50 uppercase block">ECONOMIC VALUE BOOST</span>
                <span className="text-lg sm:text-2xl font-black text-[#00F2FF]">
                  +{calcResult.economicBoostPercentage.toFixed(1)}% ADDITIONAL BENEFIT
                </span>
              </div>
            </div>

            {/* Individual Value Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 my-4 text-xs">
              <div className="p-3 bg-white/[0.03] border border-cyan-500/30">
                <span className="text-[10px] text-cyan-300 uppercase block font-semibold">
                  1. ANNUAL FUEL SAVING
                </span>
                <span className="text-base sm:text-lg font-black text-white mt-1 block">
                  {formatINR(result.grossAnnualSavingsINR)}
                </span>
                <span className="text-[10px] text-white/50">
                  {calcResult.annualFuelSavedTonnes.toFixed(0)} tonnes VLSFO saved
                </span>
              </div>

              <div className="p-3 bg-white/[0.03] border border-emerald-500/30">
                <span className="text-[10px] text-emerald-400 uppercase block font-semibold">
                  2. EU ETS COST AVOIDED
                </span>
                <span className="text-base sm:text-lg font-black text-emerald-300 mt-1 block">
                  {calcResult.isEuEtsApplicable ? formatINR(calcResult.euEtsAvoidedCostINRCrore) : '₹0.00 Cr'}
                </span>
                <span className="text-[10px] text-emerald-400/60">
                  {calcResult.isEuEtsApplicable ? formatEUR(calcResult.euEtsAvoidedCostEUR) : '0% Scope'}
                </span>
              </div>

              <div className="p-3 bg-white/[0.03] border border-sky-500/30">
                <span className="text-[10px] text-sky-400 uppercase block font-semibold">
                  3. UK ETS COST AVOIDED
                </span>
                <span className="text-base sm:text-lg font-black text-sky-300 mt-1 block">
                  {calcResult.isUkEtsApplicable ? formatINR(calcResult.ukEtsAvoidedCostINRCrore) : '₹0.00 Cr'}
                </span>
                <span className="text-[10px] text-sky-400/60">
                  {calcResult.isUkEtsApplicable ? formatGBP(calcResult.ukEtsAvoidedCostGBP) : 'Out of scope'}
                </span>
              </div>

              <div className="p-3 bg-white/[0.03] border border-purple-500/30">
                <span className="text-[10px] text-purple-300 uppercase block font-semibold">
                  4. FUELEU EXPOSURE
                </span>
                <span className="text-base sm:text-lg font-black text-purple-300 mt-1 block">
                  {calcResult.isFuelEuDefensible && calcResult.fuelEuAvoidedCostINRCrore > 0
                    ? formatINR(calcResult.fuelEuAvoidedCostINRCrore)
                    : '₹0.00 Cr'}
                </span>
                <span className="text-[10px] text-purple-300/60">
                  {calcResult.isFuelEuDefensible && calcResult.fuelEuAvoidedCostEUR > 0
                    ? formatEUR(calcResult.fuelEuAvoidedCostEUR)
                    : 'Pathway dependent'}
                </span>
              </div>

              {/* CURRENT CARBON / COMPLIANCE SAVING SUB-TOTAL */}
              <div className="p-3 bg-white/[0.06] border border-[#00F2FF]/40 col-span-2 sm:col-span-1">
                <span className="text-[10px] text-[#00F2FF] uppercase block font-bold">
                  CURRENT CARBON BENEFIT
                </span>
                <span className="text-base sm:text-lg font-black text-[#00F2FF] mt-1 block">
                  {formatINR(calcResult.currentCarbonComplianceSavingsINRCrore)} / yr
                </span>
                <span className="text-[10px] text-white/60">
                  Active statutory avoided
                </span>
              </div>
            </div>

            {/* GRAND TOTAL ROW */}
            <div className="p-3.5 bg-[#00F2FF]/15 border border-[#00F2FF] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#00F2FF]" />
                  TOTAL ANNUAL ECONOMIC BENEFIT
                </span>
                <span className="text-[11px] text-white/70 block mt-0.5">
                  Verified Fuel Savings ({formatINR(result.grossAnnualSavingsINR)}) + Current Carbon & Compliance Exposure Avoided ({formatINR(calcResult.currentCarbonComplianceSavingsINRCrore)})
                </span>
              </div>

              <div className="text-right shrink-0">
                <div className="text-xl sm:text-3xl font-black text-white tracking-tight">
                  {formatINR(calcResult.totalEconomicBenefitINRCrore)}
                  <span className="text-xs sm:text-sm font-normal text-white/60"> / year</span>
                </div>
              </div>
            </div>

            {/* Currency Reconciliation & Regulatory Basis Footnote */}
            <div className="mt-3 pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[10px] text-white/50">
              <div>
                Currency Conversions: €1 = ₹{carbonParams.exchangeRates.eurToInr.toFixed(2)} | £1 = ₹{carbonParams.exchangeRates.gbpToInr.toFixed(2)} | $1 = ₹{carbonParams.exchangeRates.usdToInr.toFixed(2)}
              </div>
              <div className="text-white/40 italic">
                * Future IMO Framework ($100/t proposed) is excluded from statutory current totals.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
