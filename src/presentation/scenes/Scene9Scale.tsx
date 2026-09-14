import React, { useState } from 'react';
import { TrendingUp, Layers, Globe2, ShieldCheck, Sparkles, Fuel } from 'lucide-react';
import { usePresentation } from '../PresentationContext';

export const Scene9Scale: React.FC = () => {
  const { simResult, simParams } = usePresentation();
  const [fleetSize, setFleetSize] = useState<number>(100);

  const fleetOptions = [1, 10, 50, 100, 500, 1000];

  const baseSavingsPerShipCr = simResult.grossAnnualSavingsINR;
  const baseFuelSavedTonnes = simResult.annualFuelSavedTonnes;
  const baseCO2Tonnes = simResult.emissionsAvoidedCO2eTonnes;

  const totalSavingsCr = (baseSavingsPerShipCr * fleetSize).toLocaleString(undefined, { maximumFractionDigits: 1 });
  const totalFuelMT = (baseFuelSavedTonnes * fleetSize).toLocaleString();
  const totalCO2MT = Math.round(baseCO2Tonnes * fleetSize).toLocaleString();
  const totalCapexCr = (simParams.retrofitCostINR * fleetSize).toLocaleString();

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 sm:p-10 max-w-7xl mx-auto font-mono">
      
      {/* Top Scene Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-[#00F2FF] rotate-45" />
          <div>
            <span className="text-xs text-[#00F2FF] font-bold tracking-widest uppercase">
              CHAPTER 08 // MACRO HORIZONS
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight uppercase">
              FLEET SCALE MULTIPLIER
            </h1>
          </div>
        </div>

        {/* Fleet Size Selector Pills */}
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-white/40 uppercase font-bold mr-1 hidden sm:inline">
            FLEET SIZE:
          </span>
          {fleetOptions.map((count) => {
            const isSelected = fleetSize === count;
            return (
              <button
                key={count}
                onClick={(e) => {
                  e.stopPropagation();
                  setFleetSize(count);
                }}
                className={`px-3 py-1 text-xs font-bold uppercase transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-[#00F2FF] text-black border-[#00F2FF] shadow-[0_0_12px_rgba(0,242,255,0.4)]'
                    : 'bg-white/5 hover:bg-white/10 text-white/70 border-white/10'
                }`}
              >
                {count} {count === 1 ? 'SHIP' : 'SHIPS'}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: 3 Giant Macro Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-auto">
        
        {/* Metric 1: Total Annual Fuel Savings */}
        <div className="p-8 bg-white/[0.03] border border-[#00F2FF]/40 tech-corner-accent shadow-xl flex flex-col justify-between">
          <div>
            <div className="text-xs text-[#00F2FF] font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Fuel className="w-4 h-4" />
              <span>CUMULATIVE ANNUAL FUEL SAVINGS</span>
            </div>
            <div className="text-4xl sm:text-6xl font-black text-white tracking-tight my-2">
              ₹{totalSavingsCr} <span className="text-2xl text-[#00F2FF]">Cr</span>
            </div>
            <div className="text-xs text-white/50 mt-2">
              {totalFuelMT} Metric Tonnes bunker fuel preserved from waste each year
            </div>
          </div>
          <div className="mt-6 pt-3 border-t border-white/10 text-[10px] text-white/40 uppercase">
            Recovers 100% of Capex via unburned fuel
          </div>
        </div>

        {/* Metric 2: Total Emissions Abated */}
        <div className="p-8 bg-white/[0.03] border border-emerald-400/40 tech-corner-accent shadow-xl flex flex-col justify-between">
          <div>
            <div className="text-xs text-emerald-400 font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>ANNUAL DECARBONIZATION IMPACT</span>
            </div>
            <div className="text-4xl sm:text-6xl font-black text-emerald-400 tracking-tight my-2">
              {totalCO2MT} <span className="text-2xl text-emerald-300">T</span>
            </div>
            <div className="text-xs text-white/50 mt-2">
              Tonnes of CO2 emissions eliminated permanently from maritime corridors
            </div>
          </div>
          <div className="mt-6 pt-3 border-t border-white/10 text-[10px] text-white/40 uppercase">
            CII Rating Lift: Tier D/E to Tier A/B
          </div>
        </div>

        {/* Metric 3: Total Capitalized Green Facility */}
        <div className="p-8 bg-white/[0.03] border border-[#FFB347]/40 tech-corner-accent shadow-xl flex flex-col justify-between">
          <div>
            <div className="text-xs text-[#FFB347] font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Layers className="w-4 h-4" />
              <span>INSTITUTIONAL GREEN PIPELINE</span>
            </div>
            <div className="text-4xl sm:text-6xl font-black text-white tracking-tight my-2">
              ₹{totalCapexCr} <span className="text-2xl text-[#FFB347]">Cr</span>
            </div>
            <div className="text-xs text-white/50 mt-2">
              Total senior debt facility underwritten and backed by ring-fenced escrow
            </div>
          </div>
          <div className="mt-6 pt-3 border-t border-white/10 text-[10px] text-white/40 uppercase">
            Securitization-ready green maritime bond
          </div>
        </div>

      </div>

      {/* Bottom Key Takeaway Callout */}
      <div className="p-4 bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-white/90">
          <span className="text-[#00F2FF] font-bold uppercase">INSTITUTIONAL VISION:</span>
          <span>At 1,000 vessels, SHIPLOOP becomes a $1.2B green maritime asset class creating ₹7,500 Cr in annual physical wealth from eliminated waste.</span>
        </div>
        <div className="text-white/40 text-right text-[11px]">
          HOLDING STATE • ADVANCE WITH [→]
        </div>
      </div>

    </div>
  );
};
