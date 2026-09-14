import React, { useState } from 'react';
import { Building2, Wrench, Fuel, ShieldCheck, Banknote, TrendingUp, ArrowRight, Play, RotateCcw } from 'lucide-react';
import { usePresentation } from '../PresentationContext';

export const Scene3LoopEngine: React.FC = () => {
  const { simParams, simResult } = usePresentation();
  const [selectedStep, setSelectedStep] = useState<number>(0);

  const steps = [
    {
      num: '01',
      title: 'FINANCE',
      actor: 'INSTITUTIONAL LENDER / SPV',
      capitalFlow: `₹${simParams.retrofitCostINR.toFixed(1)} Cr Outflow → Yard Escrow`,
      desc: '100% of retrofit CAPEX provisioned with senior debt. Zero equity required from the shipowner.',
      icon: Building2,
      accent: 'border-cyan-400 text-cyan-400 bg-cyan-950/20',
    },
    {
      num: '02',
      title: 'RETROFIT',
      actor: 'CERTIFIED SHIPYARD',
      capitalFlow: 'Hardware Commissioned',
      desc: 'Turnkey installation during scheduled special survey. 4 Medium Flettner Rotors commissioned.',
      icon: Wrench,
      accent: 'border-blue-400 text-blue-400 bg-blue-950/20',
    },
    {
      num: '03',
      title: 'SAVE',
      actor: 'COMMERCIAL VESSEL AT SEA',
      capitalFlow: `${simResult.annualFuelSavedTonnes.toLocaleString()} MT Fuel Unburned`,
      desc: `Vessel re-enters commercial service. Flettner rotors generate wind thrust, reducing bunker burn by ${simParams.efficiencyImprovementPercent.toFixed(1)}%.`,
      icon: Fuel,
      accent: 'border-teal-400 text-teal-400 bg-teal-950/20',
    },
    {
      num: '04',
      title: 'VERIFY',
      actor: 'CLASS ORACLE (DNV / BV)',
      capitalFlow: 'Telemetry Certificate Signed',
      desc: 'Continuous mass-flow meters, shaft torque, and AIS noon reports cryptographically validated.',
      icon: ShieldCheck,
      accent: 'border-emerald-400 text-emerald-400 bg-emerald-950/20',
    },
    {
      num: '05',
      title: 'REPAY',
      actor: 'SETTLEMENT CONTRACT',
      capitalFlow: `₹${simResult.annualRepaymentINR.toFixed(2)} Cr/yr → Bank Annuity`,
      desc: 'Verified fuel savings monetized from operating cashflow to satisfy scheduled debt service annuity.',
      icon: Banknote,
      accent: 'border-amber-400 text-amber-400 bg-amber-950/20',
    },
    {
      num: '06',
      title: 'RETAIN',
      actor: 'OWNER & CHARTERER',
      capitalFlow: `₹${simResult.grossAnnualSavingsINR.toFixed(2)} Cr/yr Gross Savings`,
      desc: 'Verified fuel savings service senior debt with remaining value retained by the asset and charterer.',
      icon: TrendingUp,
      accent: 'border-emerald-300 text-emerald-300 bg-emerald-950/20',
    },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 sm:p-10 max-w-7xl mx-auto font-mono">
      
      {/* Top Scene Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-[#00F2FF] rotate-45" />
          <div>
            <span className="text-xs text-[#00F2FF] font-bold tracking-widest uppercase">
              CHAPTER 03 // THE PROTOCOL ARCHITECTURE
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight uppercase">
              THE SHIPLOOP SIGNATURE ENGINE
            </h1>
          </div>
        </div>

        <div className="text-xs text-white/50 uppercase tracking-widest hidden sm:block">
          6-STAGE CLOSED-LOOP FLOW
        </div>
      </div>

      {/* Main 6-Step Loop Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 my-auto">
        {steps.map((s, idx) => {
          const Icon = s.icon;
          const isSelected = selectedStep === idx;

          return (
            <div
              key={s.num}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedStep(idx);
              }}
              className={`p-4 bg-white/[0.02] border transition-all duration-200 cursor-pointer tech-corner-accent flex flex-col justify-between ${
                isSelected 
                  ? 'border-[#00F2FF] shadow-[0_0_20px_rgba(0,242,255,0.3)] bg-[#00F2FF]/10' 
                  : 'border-white/10 hover:border-white/30'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-[#00F2FF]">
                    {s.num}
                  </span>
                  <div className="p-1.5 bg-[#020617] border border-white/10">
                    <Icon className="w-3.5 h-3.5 text-[#00F2FF]" />
                  </div>
                </div>

                <div className="text-base font-black text-white tracking-wide mb-1 uppercase">
                  {s.title}
                </div>

                <div className="text-[9px] text-[#00F2FF] font-bold uppercase mb-2 line-clamp-1">
                  {s.actor}
                </div>

                <p className="text-[11px] text-white/60 leading-relaxed font-normal">
                  {s.desc}
                </p>
              </div>

              <div className="mt-4 pt-2 border-t border-white/10 text-[10px] text-white/80 font-bold uppercase">
                {s.capitalFlow}
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Showcase of the currently highlighted step */}
      <div className="p-4 bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold px-2 py-0.5 bg-[#00F2FF] text-black">
            STAGE {steps[selectedStep].num} FOCUS
          </span>
          <span className="text-white font-bold uppercase">
            {steps[selectedStep].title}: {steps[selectedStep].actor}
          </span>
          <span className="text-[#00F2FF] hidden md:inline">
            // {steps[selectedStep].capitalFlow}
          </span>
        </div>

        <div className="text-white/40 text-right text-[11px]">
          CLICK ANY STEP OR ADVANCE WITH [→]
        </div>
      </div>

    </div>
  );
};
