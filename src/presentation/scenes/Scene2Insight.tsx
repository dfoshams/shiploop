import React from 'react';
import { Sparkles, Wind, Droplets, Compass, ArrowRight, Banknote } from 'lucide-react';

export const Scene2Insight: React.FC = () => {
  const technologies = [
    {
      name: 'ROTOR SAILS (FLETTNER)',
      gain: '8 – 15%',
      gainLabel: 'Fuel Reduction',
      icon: Wind,
      desc: 'Spinning composite cylinders harnessing the Magnus effect to generate aerodynamic forward thrust at sea.',
    },
    {
      name: 'AIR LUBRICATION (ALS)',
      gain: '6 – 10%',
      gainLabel: 'Friction Reduction',
      icon: Droplets,
      desc: 'Micro-bubble carpet along the vessel flat bottom reducing hydrodynamic skin friction against seawater.',
    },
    {
      name: 'PROPELLER BOSS CAP (PBCF)',
      gain: '3 – 5%',
      gainLabel: 'Propulsion Gain',
      icon: Compass,
      desc: 'Hub-fin cap dissipating the propeller hub vortex to recover lost kinetic rotational energy into forward thrust.',
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
              CHAPTER 02 // THE FINANCIAL REVOLUTION
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight uppercase">
              THE CORE REALIZATION
            </h1>
          </div>
        </div>

        <div className="px-3 py-1 bg-[#00F2FF]/10 border border-[#00F2FF]/30 text-[#00F2FF] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>PARADIGM SHIFT</span>
        </div>
      </div>

      {/* Center Giant Question Banner */}
      <div className="my-auto space-y-8 text-center">
        <div className="p-8 sm:p-10 bg-white/[0.02] border border-[#00F2FF]/30 tech-corner-accent shadow-[0_0_40px_rgba(0,242,255,0.15)]">
          <div className="text-xs text-[#00F2FF] uppercase tracking-widest mb-3 font-bold">
            THE ARCHITECTURAL PROPOSITION
          </div>
          <h2 className="text-3xl sm:text-6xl font-black text-white tracking-tight leading-tight uppercase">
            WHAT IF FUTURE FUEL SAVINGS <br />
            <span className="text-[#00F2FF] underline decoration-[#00F2FF]/50">
              WERE THE AMORTIZATION?
            </span>
          </h2>
          <p className="text-sm sm:text-base text-white/70 max-w-3xl mx-auto mt-4 leading-relaxed font-normal">
            Instead of demanding corporate balance sheet debt, the hardware is financed through a ring-fenced facility and serviced exclusively by <strong className="text-white">cryptographically verified bunker reductions</strong>.
          </p>
        </div>

        {/* 3 Proven TRL-9 Technologies Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left">
          {technologies.map((t) => {
            const Icon = t.icon;
            return (
              <div key={t.name} className="p-5 bg-white/[0.02] border border-white/10 tech-corner-accent">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] text-[#00F2FF] font-bold uppercase tracking-wider">
                    TRL-9 HARDWARE
                  </span>
                  <Icon className="w-4 h-4 text-[#00F2FF]" />
                </div>
                <div className="text-3xl font-black text-white tracking-tight">
                  {t.gain}
                </div>
                <div className="text-[11px] text-[#00F2FF] font-bold uppercase mb-2">
                  {t.name}
                </div>
                <p className="text-xs text-white/50 leading-relaxed font-normal">
                  {t.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Summary Callout */}
      <div className="p-4 bg-[#00F2FF]/5 border border-[#00F2FF]/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-white/90">
          <span className="text-[#00F2FF] font-bold uppercase">EQUITY FOOTPRINT:</span>
          <span>Zero shipowner cash down. Hardware pays for itself out of unburned bunker fuel.</span>
        </div>
        <div className="text-white/40 text-right text-[11px]">
          HOLDING STATE • ADVANCE WITH [→]
        </div>
      </div>

    </div>
  );
};
