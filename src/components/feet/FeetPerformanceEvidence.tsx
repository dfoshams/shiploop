import React from 'react';
import { motion } from 'motion/react';
import { Activity, Globe, Info, AlertTriangle, ChevronRight, Gauge } from 'lucide-react';
import { FEET_DATA_RECORDS } from '../../data/feetData';

export const FeetPerformanceEvidence: React.FC = () => {
  const pilotRecord = FEET_DATA_RECORDS.find(r => r.id === 'FEET-006')!;
  const adoptionRecord = FEET_DATA_RECORDS.find(r => r.id === 'FEET-007')!;

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      {/* Card 1: Pilot Power Savings with 95% Confidence Band Graphic */}
      <div className="rounded-xl p-6 sm:p-7 bg-slate-900/85 border border-emerald-500/40 backdrop-blur-md relative overflow-hidden flex flex-col justify-between shadow-xl">
        <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div>
          {/* Header & Verified Badge */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold text-white/50 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                FEET-006
              </span>
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                EMPIRICAL PILOT TELEMETRY
              </span>
            </div>
            <span className="px-2.5 py-1 rounded bg-emerald-500/15 border border-emerald-500/50 text-emerald-300 text-[10px] font-mono font-extrabold tracking-widest uppercase">
              [ VERIFIED PILOT DATA ]
            </span>
          </div>

          <h4 className="text-sm sm:text-base font-mono font-bold text-white uppercase tracking-wider">
            MEAN INSTANTANEOUS POWER SAVINGS
          </h4>

          {/* Primary Metric & Confidence Interval Text */}
          <div className="flex items-baseline gap-4 my-3">
            <div className="text-4xl sm:text-5xl font-black font-mono text-white tracking-tight">
              7.2%
            </div>
            <div className="text-xs font-mono text-emerald-400">
              <span className="text-white/50 block text-[10px]">95% CONFIDENCE INTERVAL</span>
              <span className="font-bold text-sm">6.2% — 8.2%</span>
            </div>
          </div>

          {/* Visual Confidence-Band Graphic Communicating Observed Estimate + Uncertainty Range */}
          <div className="my-5 p-4 rounded-lg bg-slate-950/90 border border-white/10">
            <div className="flex items-center justify-between text-[11px] font-mono text-white/50 mb-2">
              <span>0% (BASELINE)</span>
              <span className="text-emerald-400 font-bold">OBSERVED ESTIMATE (7.2%)</span>
              <span>12.0% (MAX THEORETICAL)</span>
            </div>

            {/* Slider track scale */}
            <div className="relative w-full h-8 bg-white/5 rounded-md border border-white/10 flex items-center px-2">
              
              {/* Background grid markings */}
              <div className="absolute inset-0 flex justify-between px-4 items-center pointer-events-none opacity-20">
                {[2, 4, 6, 8, 10].map((tick) => (
                  <div key={tick} className="w-px h-3 bg-white" />
                ))}
              </div>

              {/* 95% Confidence Band Range (6.2% to 8.2% mapped on 0-12% scale) */}
              {/* 6.2% / 12% = 51.6% left; width = (8.2 - 6.2) / 12 = 16.6% */}
              <div 
                className="absolute h-6 rounded bg-emerald-500/25 border-l border-r border-emerald-400/80 flex items-center justify-center"
                style={{ left: '51.6%', width: '16.6%' }}
              >
                <span className="text-[9px] font-mono text-emerald-300 font-bold tracking-tighter hidden sm:inline">
                  95% CI
                </span>
              </div>

              {/* Mean Point Indicator (7.2% / 12% = 60.0% left) */}
              <div 
                className="absolute w-1 h-7 bg-white rounded shadow-[0_0_10px_#00F2FF] z-10"
                style={{ left: '60.0%' }}
              />

              {/* Target callout diamond */}
              <div 
                className="absolute -top-2 w-3 h-3 bg-emerald-400 rotate-45 shadow-[0_0_10px_rgba(16,185,129,0.8)] z-20"
                style={{ left: 'calc(60.0% - 4px)' }}
              />
            </div>

            {/* Legend underneath graphic */}
            <div className="flex items-center justify-between text-[10px] font-mono mt-2.5 pt-2 border-t border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-3 h-2 rounded bg-emerald-500/30 border border-emerald-400" />
                <span className="text-white/60">Uncertainty Range (6.2% — 8.2%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_6px_#ffffff]" />
                <span className="text-white font-bold">Mean: 7.2%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer / Academic Precision Discipline */}
        <div className="pt-3 border-t border-white/10 text-xs font-mono text-slate-300 leading-relaxed">
          <p className="mb-1 text-white/90">
            "Illustrative evidence from a monitored oil-tanker retrofit pilot."
          </p>
          <p className="text-[11px] text-white/50">
            *Observed estimate under continuous operational monitoring. Does not imply 7.2% applies universally to all vessel classes or retrofit technologies.
          </p>
        </div>
      </div>

      {/* Card 2: Market Adoption Signal (270 / 60,000 < 0.5%) */}
      <div className="rounded-xl p-6 sm:p-7 bg-slate-900/85 border border-cyan-500/40 backdrop-blur-md relative overflow-hidden flex flex-col justify-between shadow-xl">
        <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div>
          {/* Header & Contextual Badge */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold text-white/50 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                FEET-007
              </span>
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                MARKET ADOPTION SIGNAL
              </span>
            </div>
            <span className="px-2.5 py-1 rounded bg-cyan-500/15 border border-cyan-500/50 text-cyan-300 text-[10px] font-mono font-extrabold tracking-widest uppercase">
              [ CONTEXTUAL MARKET DATA ]
            </span>
          </div>

          <h4 className="text-sm sm:text-base font-mono font-bold text-white uppercase tracking-wider">
            GLOBAL EFFICIENCY TECHNOLOGY PENETRATION
          </h4>

          {/* Primary Metric: Share & Ratio */}
          <div className="flex items-baseline gap-4 my-3">
            <div className="text-4xl sm:text-5xl font-black font-mono text-cyan-300 tracking-tight">
              &lt; 0.5%
            </div>
            <div className="text-xs font-mono text-white/70">
              <span className="text-white/50 block text-[10px]">SELECTED EFFICIENCY TECH</span>
              <span className="font-bold text-sm text-white">~270 of ~60,000 VESSELS</span>
            </div>
          </div>

          {/* Visual Market Adoption Fraction Graphic */}
          <div className="my-5 p-4 rounded-lg bg-slate-950/90 border border-white/10">
            <div className="flex items-center justify-between text-[11px] font-mono text-white/50 mb-2">
              <span>ACTIVE ADOPTERS (~270)</span>
              <span className="text-amber-400 font-bold">UNTOUCHED GLOBAL FLEET (~59,730)</span>
            </div>

            {/* Visual Bar showing <0.5% vs 99.5% */}
            <div className="w-full h-8 bg-slate-800 rounded-md overflow-hidden border border-white/10 relative flex items-center">
              {/* Active fraction (<0.5%) */}
              <div 
                className="h-full bg-cyan-400 relative z-10 flex items-center justify-center shadow-[0_0_12px_rgba(0,242,255,0.8)]"
                style={{ width: '4%' }} // visually bumped slightly for visibility, labeled clearly
              />
              
              {/* Untouched Market Bulk */}
              <div className="h-full bg-slate-800 flex-1 flex items-center justify-center text-[10px] font-mono text-white/50 tracking-wider">
                99.5%+ CAPITAL INFRASTRUCTURE GAP
              </div>
            </div>

            {/* Visual Dots Grid Representation */}
            <div className="mt-3 flex items-center justify-between text-[10px] font-mono text-white/60">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>Selected Tech (Wind-assist, Air lubrication)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-slate-700" />
                <span>Conventional Un-retrofitted Merchant Fleet</span>
              </div>
            </div>
          </div>
        </div>

        {/* Analytical Context & Opportunity */}
        <div className="pt-3 border-t border-white/10 text-xs font-mono text-slate-300 leading-relaxed">
          <p className="mb-1 text-white/90 font-medium">
            "Illustrates the large gap between available efficiency technologies and adoption."
          </p>
          <p className="text-[11px] text-white/50">
            *Discussed in relevant GCMD maritime decarbonization context. Does not claim these 270 vessels represent the entire global retrofit market, but confirms the urgent opportunity for financing infrastructure.
          </p>
        </div>
      </div>

    </div>
  );
};
