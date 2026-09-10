import React, { useState } from 'react';
import { 
  Sliders, 
  Sparkles, 
  Anchor, 
  Cpu, 
  ArrowDown, 
  TrendingUp, 
  CheckCircle2, 
  Building2, 
  Coins, 
  Percent,
  Layers
} from 'lucide-react';
import { SimulationParams, SimulationResult } from '../../types';
import { calculateSimulation } from '../../logic/financialModel';
import { DEMO_DATA } from '../../data/demoData';
import { EvidenceMarker } from './EvidenceMarker';

interface IndiaDeploymentScenarioProps {
  initialParams?: SimulationParams;
}

export const IndiaDeploymentScenario: React.FC<IndiaDeploymentScenarioProps> = ({
  initialParams,
}) => {
  // Scenario options
  const scenarios = [
    {
      id: 'bulk-carrier',
      vesselName: 'Panamax Bulk Carrier (Indian Coastal Coal / Ore)',
      vesselType: 'Bulk Carrier (75,000 DWT)',
      retrofitTech: 'Silverstream Air Lubrication System (ALS)',
      annualFuel: 10000,
      retrofitCost: 10.0,
      efficiency: 15.0,
      fuelPrice: 50000,
      route: 'Paradip / Dhamra to Ennore / Tuticorin Coastal Loop',
    },
    {
      id: 'crude-tanker',
      vesselName: 'Aframax Crude Tanker (West Coast Import)',
      vesselType: 'Crude Tanker (115,000 DWT)',
      retrofitTech: 'Hydrodynamic Wake Duct + Silicone Foul-Release Coating',
      annualFuel: 14500,
      retrofitCost: 14.5,
      efficiency: 16.5,
      fuelPrice: 52000,
      route: 'Persian Gulf to Vadinar / Sikka / Kochi Refinery Gateway',
    },
    {
      id: 'feeder-container',
      vesselName: 'Sub-Panamax Feeder Container (Peninsular Shuttle)',
      vesselType: 'Container Vessel (2,800 TEU)',
      retrofitTech: 'Rotor Sail Wind-Assist (WAPS) Auxiliary Propulsion',
      annualFuel: 8200,
      retrofitCost: 8.0,
      efficiency: 14.0,
      fuelPrice: 54000,
      route: 'Colombo / Mundra to JNPT / Cochin Feeder Transshipment',
    },
  ];

  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState<number>(0);
  const activeScenario = scenarios[selectedScenarioIndex];

  // Derive simulation parameters using the existing financialModel
  const params: SimulationParams = {
    annualFuelConsumption: activeScenario.annualFuel,
    fuelPricePerTonneINR: activeScenario.fuelPrice,
    operatingDays: 300,
    retrofitCostINR: activeScenario.retrofitCost,
    efficiencyImprovementPercent: activeScenario.efficiency,
    financingPercentage: 100,
    financingDurationYears: 6,
    interestRateAnnualPercent: 8.5,
    charterType: 'VOYAGE',
    chartererSavingsSharePercent: 50,
    scenario: 'BASE',
  };

  // Run the single existing financial model!
  const result: SimulationResult = calculateSimulation(params);

  return (
    <div className="w-full bg-[#020617]/90 border border-white/10 tech-corner-accent p-5 sm:p-7 space-y-6 font-mono">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <span className="text-[10px] text-[#00F2FF] font-bold uppercase tracking-widest flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-[#00F2FF]" />
            <span>UNDERWRITING PROJECTION ENGINE</span>
          </span>
          <h3 className="text-base sm:text-xl font-black text-white uppercase tracking-tight mt-0.5">
            INDIAN DEPLOYMENT SCENARIO BENCHMARK
          </h3>
        </div>

        <EvidenceMarker type="SIMULATION" label="ILLUSTRATIVE SIMULATION" />
      </div>

      {/* Scenario Presets Selector */}
      <div className="space-y-2">
        <span className="text-[11px] text-white/50 uppercase tracking-wider block">
          SELECT DEPLOYMENT VESSEL & RETROFIT PROFILE:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {scenarios.map((sc, idx) => {
            const isSelected = selectedScenarioIndex === idx;
            return (
              <button
                key={sc.id}
                onClick={() => setSelectedScenarioIndex(idx)}
                className={`p-3 text-left border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[#00F2FF] bg-[#00F2FF]/15 shadow-[0_0_15px_rgba(0,242,255,0.25)]'
                    : 'border-white/10 bg-white/[0.02] hover:border-white/30'
                }`}
              >
                <div className="text-[10px] text-white/40 uppercase">{sc.vesselType}</div>
                <div className="text-xs font-bold text-white uppercase mt-0.5 truncate">{sc.vesselName}</div>
                <div className="text-[11px] text-[#00F2FF] mt-1 font-bold">₹{sc.retrofitCost} Cr CAPEX</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2-Column: Left Scenario Summary Card, Right Financial Waterfall outputs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Vessel & Retrofit Profile (5 Cols) */}
        <div className="lg:col-span-5 p-5 bg-white/[0.02] border border-white/10 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="text-xs font-bold text-white uppercase flex items-center gap-1.5">
              <Anchor className="w-3.5 h-3.5 text-[#00F2FF]" />
              <span>DEPLOYMENT PROFILE</span>
            </span>
            <span className="text-[10px] px-2 py-0.5 bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/30 uppercase">
              100% DEBT FINANCED
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <span className="text-white/40 block text-[10px] uppercase">VESSEL ASSET</span>
              <span className="text-white font-bold text-sm">{activeScenario.vesselName}</span>
            </div>

            <div>
              <span className="text-white/40 block text-[10px] uppercase">RETROFIT TECHNOLOGY</span>
              <span className="text-amber-400 font-bold">{activeScenario.retrofitTech}</span>
            </div>

            <div>
              <span className="text-white/40 block text-[10px] uppercase">PRIMARY OPERATING CORRIDOR</span>
              <span className="text-white/80">{activeScenario.route}</span>
            </div>

            <div className="pt-2 border-t border-white/10 grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-white/40 block text-[10px] uppercase">RETROFIT CAPEX</span>
                <span className="text-white font-bold text-base">₹{params.retrofitCostINR.toFixed(2)} Cr</span>
              </div>
              <div>
                <span className="text-white/40 block text-[10px] uppercase">EFFICIENCY GAIN</span>
                <span className="text-emerald-400 font-bold text-base">+{params.efficiencyImprovementPercent}%</span>
              </div>
              <div>
                <span className="text-white/40 block text-[10px] uppercase">FUEL SAVED / YR</span>
                <span className="text-white font-bold">{result.annualFuelSavedTonnes.toLocaleString()} MT</span>
              </div>
              <div>
                <span className="text-white/40 block text-[10px] uppercase">CO2 AVOIDED / YR</span>
                <span className="text-emerald-400 font-bold">{result.emissionsAvoidedCO2eTonnes.toLocaleString()} MT</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Financial Waterfall Derived from Model (7 Cols) */}
        <div className="lg:col-span-7 p-5 bg-white/[0.02] border border-white/10 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="text-xs font-bold text-white uppercase flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#00F2FF]" />
              <span>ANNUAL FINANCIAL WATERFALL</span>
            </span>
            <span className="text-[10px] text-white/50">
              DSCR: <span className="text-[#00F2FF] font-bold">{result.debtServiceCoverageRatio}x</span> (TARGET: &gt;1.5x)
            </span>
          </div>

          {/* Step-by-Step Waterfall Values */}
          <div className="space-y-2.5 text-xs">
            
            {/* 1. Annual Verified Savings */}
            <div className="p-2.5 bg-emerald-950/20 border border-emerald-500/40 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-emerald-400 font-bold">01</span>
                <span className="font-bold text-white uppercase">ANNUAL VERIFIED SAVINGS</span>
              </div>
              <span className="text-base font-black text-emerald-400">
                +₹{result.grossAnnualSavingsINR.toFixed(2)} Cr / yr
              </span>
            </div>

            <div className="flex justify-center text-white/40 my-0.5">
              <ArrowDown className="w-3 h-3" />
            </div>

            {/* 2. Operating Impact */}
            <div className="p-2 bg-white/[0.03] border border-white/15 flex items-center justify-between text-[11px]">
              <span className="text-white/60 uppercase">OPERATING IMPACT (BUNKER REDUCTION)</span>
              <span className="text-white font-bold">
                -{result.annualFuelSavedTonnes.toLocaleString()} MT VLSFO
              </span>
            </div>

            <div className="flex justify-center text-white/40 my-0.5">
              <ArrowDown className="w-3 h-3" />
            </div>

            {/* 3. SHIPLOOP Telemetry & Admin */}
            <div className="p-2 bg-white/[0.03] border border-white/15 flex items-center justify-between text-[11px]">
              <span className="text-white/60 uppercase">SHIPLOOP / VERIFICATION & RESERVE (4%)</span>
              <span className="text-amber-400 font-bold">
                -₹{result.verificationAndAdminFeeINR.toFixed(2)} Cr
              </span>
            </div>

            <div className="flex justify-center text-white/40 my-0.5">
              <ArrowDown className="w-3 h-3" />
            </div>

            {/* 4. Bank Repayment */}
            <div className="p-2.5 bg-sky-950/20 border border-sky-500/40 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-sky-400 font-bold">02</span>
                <span className="font-bold text-white uppercase">BANK SENIOR DEBT REPAYMENT</span>
              </div>
              <span className="text-sm font-bold text-sky-400">
                -₹{result.annualRepaymentINR.toFixed(2)} Cr / yr
              </span>
            </div>

            <div className="flex justify-center text-white/40 my-0.5">
              <ArrowDown className="w-3 h-3" />
            </div>

            {/* 5. Owner Retained Savings */}
            <div className="p-3 bg-[#00F2FF]/10 border-2 border-[#00F2FF] flex items-center justify-between rounded-sm shadow-[0_0_15px_rgba(0,242,255,0.2)]">
              <div>
                <span className="text-xs font-black text-white uppercase block">
                  OWNER RETAINED SAVINGS (YEARS 1–6)
                </span>
                <span className="text-[10px] text-[#00F2FF]">
                  Expands to 100% free cashflow post-payback (Years 7–15)
                </span>
              </div>
              <span className="text-base sm:text-lg font-black text-[#00F2FF]">
                +₹{result.ownerRetainedINR.toFixed(2)} Cr / yr
              </span>
            </div>

          </div>

          {/* Key Financial KPIs Footer */}
          <div className="pt-2 border-t border-white/10 grid grid-cols-2 gap-3 text-[11px]">
            <div>
              <span className="text-white/40 block text-[10px] uppercase">PAYBACK DURATION</span>
              <span className="text-white font-bold">{result.retrofitPaybackYears} Years</span>
            </div>
            <div>
              <span className="text-white/40 block text-[10px] uppercase">10-YR OWNER CUMULATIVE VALUE</span>
              <span className="text-emerald-400 font-bold">₹{result.tenYearCumulativeNetOwnerBenefitINR.toFixed(2)} Cr</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
