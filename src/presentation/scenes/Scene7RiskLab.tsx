import React, { useState } from 'react';
import { AlertTriangle, ShieldCheck, TrendingDown, Clock, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const Scene7RiskLab: React.FC = () => {
  const [selectedStress, setSelectedStress] = useState<'CRASH' | 'UNDERPERFORM' | 'IDLE'>('CRASH');

  const stresses = {
    CRASH: {
      title: 'BUNKER PRICE COLLAPSE',
      shock: '-30% Bunker Price',
      impact: 'Fuel drops from ₹50,000 to ₹35,000/t. Gross monetary savings contract to ₹5.25 Cr.',
      defense: 'DSCR remains 2.41x (comfortably above 1.30x requirement). 100% debt service met with no drawdown.',
      status: 'SYSTEM SOLVENT',
    },
    UNDERPERFORM: {
      title: 'TECH UNDERPERFORMANCE',
      shock: '40% Hydrodynamic Deficit',
      impact: 'Rough seas or marine fouling reduce net efficiency from 15% to 9%.',
      defense: 'Annual savings ₹4.50 Cr still yields 2.06x DSCR coverage. Senior lenders experience zero loss.',
      status: 'SYSTEM RESILIENT',
    },
    IDLE: {
      title: 'PROLONGED DRYDOCK OFF-HIRE',
      shock: '90 Days Off-Hire (75% Util)',
      impact: 'Vessel sits in yard for survey or repairs; operational sea days fall to 225.',
      defense: '6-Month Debt Service Reserve Fund (DSRF) automatically bridges debt annuity until sea trials resume.',
      status: 'RESERVE TRIGGERED',
    },
  };

  const current = stresses[selectedStress];

  const safetyTiers = [
    {
      tier: 'TIER 1',
      name: '6-MONTH LIQUID DSRF',
      desc: 'Dedicated debt service reserve fund funded at escrow inception to bridge unexpected drydocks or port congestion.',
      icon: ShieldCheck,
      color: 'text-[#00F2FF]',
    },
    {
      tier: 'TIER 2',
      name: 'PROGRAMMED TENOR ROLLOVER',
      desc: 'If bunker prices drop below $400/MT, amortization period automatically extends by up to 18 months without default.',
      icon: Clock,
      color: 'text-amber-400',
    },
    {
      tier: 'TIER 3',
      name: 'MEZZANINE FIRST-LOSS SHIELD',
      desc: 'Concessionary green capital (FEET / multilateral facility) absorbs catastrophic loss before commercial lenders.',
      icon: ShieldAlert,
      color: 'text-emerald-400',
    },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 sm:p-10 max-w-7xl mx-auto font-mono">
      
      {/* Top Scene Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-amber-400 rotate-45" />
          <div>
            <span className="text-xs text-amber-400 font-bold tracking-widest uppercase">
              CHAPTER 07 // INSTITUTIONAL DEFENSE
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight uppercase">
              STRESS-TESTING UNDER ADVERSE SEAS
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {(['CRASH', 'UNDERPERFORM', 'IDLE'] as const).map((key) => (
            <button
              key={key}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedStress(key);
              }}
              className={`px-3 py-1 text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                selectedStress === key
                  ? 'bg-amber-400 text-black border-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.5)]'
                  : 'bg-white/5 hover:bg-white/10 text-white/70 border-white/10'
              }`}
            >
              {key}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Active Stress Scenario vs 3-Tier Defensive Architecture */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-auto items-center">
        
        {/* Left: Active Stress Outcome Card */}
        <div className="lg:col-span-6 p-6 sm:p-8 bg-white/[0.03] border border-amber-400/40 tech-corner-accent shadow-xl">
          <div className="flex items-center justify-between text-xs text-amber-400 font-bold mb-2 uppercase">
            <span className="flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" />
              <span>TEST SCENARIO: {current.title}</span>
            </span>
            <span className="px-2 py-0.5 bg-amber-400/15 border border-amber-400/40 text-[10px]">
              {current.status}
            </span>
          </div>

          <div className="text-3xl sm:text-4xl font-black text-white tracking-tight my-2">
            {current.shock}
          </div>

          <div className="text-xs text-white/70 leading-relaxed font-normal mb-4">
            {current.impact}
          </div>

          <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 font-normal leading-relaxed">
            <span className="font-bold text-emerald-400 uppercase block mb-1">
              AUTOMATED PROTOCOL DEFENSE:
            </span>
            {current.defense}
          </div>
        </div>

        {/* Right: 3-Tier Multi-Layer Protection Architecture */}
        <div className="lg:col-span-6 space-y-3">
          <div className="text-xs text-white/40 uppercase tracking-widest font-bold mb-2">
            THE 3-TIER BANK PROTECTION SHIELD
          </div>

          {safetyTiers.map((tier) => {
            const Icon = tier.icon;
            return (
              <div key={tier.name} className="p-4 bg-white/[0.02] border border-white/10 tech-corner-accent flex items-start gap-4">
                <div className="p-2 bg-[#020617] border border-white/10 shrink-0 mt-0.5">
                  <Icon className={`w-4 h-4 ${tier.color}`} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] text-white/40 font-bold">{tier.tier}:</span>
                    <span className="text-xs font-bold text-white uppercase">{tier.name}</span>
                  </div>
                  <p className="text-[11px] text-white/60 leading-relaxed font-normal">
                    {tier.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Bottom Key Takeaway Callout */}
      <div className="p-4 bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-white/90">
          <span className="text-emerald-400 font-bold uppercase">CREDIT RATING IMPLICATION:</span>
          <span>Because senior debt is ring-fenced with a 6-month DSRF and first-loss guarantee, banks underwrite SHIPLOOP as investment-grade green infrastructure.</span>
        </div>
        <div className="text-white/40 text-right text-[11px]">
          HOLDING STATE • ADVANCE WITH [→]
        </div>
      </div>

    </div>
  );
};
