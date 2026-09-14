import React from 'react';
import { DollarSign, AlertTriangle, Lock, ArrowRight, Flame } from 'lucide-react';
import { DEMO_DATA } from '../../data/demoData';

export const Scene1Problem: React.FC = () => {
  const annualFuelSpendCr = ((DEMO_DATA.defaultSimulationParams.annualFuelConsumption * DEMO_DATA.defaultSimulationParams.fuelPricePerTonneINR) / DEMO_DATA.constants.inrCroreToUnits).toFixed(1);
  const barriers = [
    {
      num: '01',
      metric: '₹8 – 30 Cr',
      metricSecondary: '($0.84M – $3.14M USD)',
      label: 'UPFRONT CAPEX',
      subtitle: 'Balance Sheet Gridlock',
      desc: 'Discretionary retrofits require heavy liquid capital that volatile freight cycles cannot spare.',
      color: 'border-rose-500/40 text-rose-400',
    },
    {
      num: '02',
      metric: '3 – 7 YRS',
      label: 'PAYBACK RISK',
      subtitle: 'Bank Underwriting Refusal',
      desc: 'Banks refuse to finance unproven fuel savings that fluctuate with sea currents, weather, and bunker prices.',
      color: 'border-amber-500/40 text-amber-400',
    },
    {
      num: '03',
      metric: 'SPLIT INCENTIVE',
      label: '',
      subtitle: 'Split Incentive Dilemma',
      desc: 'Under Time Charters, charterers pay the bunker bill while owners pay the capex. Owners gain nothing from fuel they do not buy.',
      color: 'border-cyan-500/40 text-cyan-400',
    },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 sm:p-10 max-w-7xl mx-auto font-mono">
      
      {/* Top Scene Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-rose-500 rotate-45" />
          <div>
            <span className="text-xs text-rose-400 font-bold tracking-widest uppercase">
              CHAPTER 01 // THE STRUCTURAL BOTTLENECK
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight uppercase">
              SHIPPING HAS A GREEN CAPITAL IMPASSE
            </h1>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-white/5 border border-rose-500/30 text-rose-400 text-xs font-bold uppercase">
          <Flame className="w-3.5 h-3.5" />
          <span>STATUS QUO FAILURE</span>
        </div>
      </div>

      {/* Main Grid: 3 Large Projector Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-auto">
        {barriers.map((b) => (
          <div
            key={b.num}
            className={`p-6 sm:p-8 bg-white/[0.02] border ${b.color} tech-corner-accent shadow-xl flex flex-col justify-between`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-white/40 tracking-widest font-bold">
                  BARRIER {b.num}
                </span>
                <span className="text-[10px] px-2 py-0.5 bg-white/5 border border-white/10 uppercase text-white/60">
                  {b.subtitle}
                </span>
              </div>

              {/* Giant Metric */}
              <div className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-2 flex flex-wrap items-baseline gap-x-2">
                <span>{b.metric}</span>
                {b.metricSecondary && (
                  <span className="text-base sm:text-xl font-semibold text-white/60">
                    {b.metricSecondary}
                  </span>
                )}
              </div>

              {b.label ? (
                <div className="text-sm font-bold text-white uppercase tracking-wider mb-3">
                  {b.label}
                </div>
              ) : null}

              <p className="text-xs text-white/60 leading-relaxed font-normal">
                {b.desc}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 text-[11px] text-white/40 uppercase">
              Result: Zero Adoption Despite Proven Tech
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Summary Pipeline */}
      <div className="p-4 bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-4 text-white/80">
          <span className="text-[#FFB347] font-bold uppercase">CONVENTIONAL CYCLE:</span>
          <span>10,000 MT Fuel Burned</span>
          <ArrowRight className="w-3.5 h-3.5 text-white/40" />
          <span className="text-rose-400 font-bold">₹{annualFuelSpendCr} Cr Burned Cashflow</span>
          <ArrowRight className="w-3.5 h-3.5 text-white/40" />
          <span className="text-white/40">Zero Asset Improvement</span>
        </div>

        <div className="text-white/40 text-right text-[11px]">
          HOLDING STATE • ADVANCE WITH [→]
        </div>
      </div>

    </div>
  );
};
