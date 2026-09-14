import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Target, CheckCircle2, Info, Building, HelpCircle, Layers, ExternalLink } from 'lucide-react';
import { FEET_DATA_RECORDS, FeetMetricRecord } from '../../data/feetData';
import { SourceButton } from '../SourceButton';

interface FeetDataCardsProps {
  onSelectRecord?: (record: FeetMetricRecord) => void;
}

export const FeetDataCards: React.FC<FeetDataCardsProps> = ({ onSelectRecord }) => {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  // The primary FEET program data points (FEET-001, FEET-002, FEET-003, FEET-004, FEET-005, FEET-008)
  const coreCards = [
    {
      id: 'FEET-001',
      record: FEET_DATA_RECORDS[0], // $35M
      headline: 'INITIAL CLOSING',
      value: 'UP TO $35M',
      badges: ['VERIFIED', 'REAL-WORLD DATA'],
      statusType: 'VERIFIED' as const,
      subtext: 'Blended debt facility launched to finance operational retrofits directly.',
      rationale: 'Demonstrates institutional capital commitment and initial market closing.'
    },
    {
      id: 'FEET-002',
      record: FEET_DATA_RECORDS[1], // 100%
      headline: 'UPFRONT FINANCING',
      value: 'UP TO 100%',
      badges: ['VERIFIED'],
      statusType: 'VERIFIED' as const,
      subtext: 'Zero owner capital expenditure required to install verified fuel-saving hardware.',
      rationale: 'Overcomes the liquidity and capex constraint holding back commercial retrofits.'
    },
    {
      id: 'FEET-003',
      record: FEET_DATA_RECORDS[2], // Pay-As-You-Save
      headline: 'REPAYMENT MODEL',
      value: 'PAY-AS-YOU-SAVE',
      badges: ['VERIFIED'],
      statusType: 'VERIFIED' as const,
      subtext: 'Linked directly to verified fuel burn reductions and regulatory carbon savings.',
      rationale: 'Vessel pays out of physical bunker savings; cashflow positive from day one.'
    },
    {
      id: 'FEET-004',
      record: FEET_DATA_RECORDS[3], // Unsecured Leases
      headline: 'LEGAL STRUCTURE',
      value: 'UNSECURED LEASES',
      badges: ['VERIFIED'],
      statusType: 'VERIFIED' as const,
      subtext: 'Decouples retrofit financing from preexisting first-priority vessel mortgages.',
      rationale: 'Senior mortgage holders do not face subordination conflicts or mortgage liens.'
    },
    {
      id: 'FEET-005',
      record: FEET_DATA_RECORDS[4], // $500M 2030
      headline: '2030 EXPANSION TARGET',
      value: 'USD 500M',
      badges: ['TARGET'],
      statusType: 'TARGET' as const,
      subtext: 'Targeted scaling across ~200 commercial deep-sea vessels by 2030.',
      rationale: 'Explicitly labeled TARGET — not an achieved result. Outlines industrial vision.'
    }
  ];

  return (
    <div className="w-full">
      {/* Category Legend Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 px-1">
        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            <span className="text-emerald-400 font-bold">[ VERIFIED ]</span>
            <span className="text-white/40">= REAL FEET INFORMATION</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
            <span className="text-amber-400 font-bold">[ TARGET ]</span>
            <span className="text-white/40">= FUTURE FEET OBJECTIVE</span>
          </div>
        </div>

        <div className="text-[11px] font-mono text-white/50">
          DISCIPLINED ATTRIBUTION PIPELINE
        </div>
      </div>

      {/* Grid of 5 Verified / Target Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {coreCards.map((card) => {
          const isTarget = card.statusType === 'TARGET';
          const isTooltipActive = activeTooltip === card.id;

          return (
            <motion.div
              key={card.id}
              whileHover={{ y: -4 }}
              onClick={() => {
                if (onSelectRecord) onSelectRecord(card.record);
                setActiveTooltip(isTooltipActive ? null : card.id);
              }}
              className={`cursor-pointer rounded-xl p-5 border flex flex-col justify-between transition-all duration-200 relative overflow-hidden backdrop-blur-md ${
                isTarget
                  ? 'bg-slate-900/85 border-amber-500/40 hover:border-amber-400 hover:shadow-[0_0_25px_rgba(245,158,11,0.2)]'
                  : 'bg-slate-900/85 border-emerald-500/40 hover:border-emerald-400 hover:shadow-[0_0_25px_rgba(16,185,129,0.25)]'
              }`}
            >
              {/* Corner Ambient Glow */}
              <div className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl pointer-events-none ${
                isTarget ? 'bg-amber-500/10' : 'bg-emerald-500/15'
              }`} />

              <div>
                {/* Header row: ID & Status Badges */}
                <div className="flex flex-wrap items-center justify-between gap-1.5 mb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono text-white/40 bg-white/5 px-1.5 py-0.5 rounded border border-white/10">
                      {card.id}
                    </span>
                    <div onClick={(e) => e.stopPropagation()}>
                      <SourceButton evidenceId="BENCHMARK-001" />
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    {card.badges.map((b) => (
                      <span
                        key={b}
                        className={`text-[9px] font-mono font-extrabold px-1.5 py-0.5 rounded border uppercase tracking-wider ${
                          b === 'TARGET'
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-[0_0_8px_rgba(245,158,11,0.2)]'
                            : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-[0_0_8px_rgba(16,185,129,0.25)]'
                        }`}
                      >
                        [ {b} ]
                      </span>
                    ))}
                  </div>
                </div>

                {/* Metric Headline */}
                <div className="text-[11px] font-mono text-white/60 uppercase tracking-wider font-semibold mb-1">
                  {card.headline}
                </div>

                {/* Big Number / Value */}
                <div className={`text-2xl sm:text-3xl font-black font-mono tracking-tight my-2 ${
                  isTarget ? 'text-amber-300' : 'text-white'
                }`}>
                  {card.value}
                </div>
              </div>

              {/* Subtext and Rationale */}
              <div className="mt-3 pt-3 border-t border-white/10">
                <p className="text-xs text-slate-300 font-mono leading-relaxed mb-2">
                  {card.subtext}
                </p>
                <div className="flex items-center justify-between text-[10px] font-mono text-white/40">
                  <span className="truncate max-w-[130px]">
                    {card.rationale}
                  </span>
                  <span className="text-cyan-400 font-semibold hover:underline">
                    DETAILS →
                  </span>
                </div>
              </div>

              {/* Interactive Tooltip Overlay when clicked */}
              {isTooltipActive && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute inset-0 bg-slate-950/95 p-4 rounded-xl flex flex-col justify-between z-30 border border-cyan-500/50 text-left"
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-cyan-400 font-bold mb-1">
                      <span>AUDIT REFERENCE {card.id}</span>
                      <span className="text-white/40 cursor-pointer" onClick={(e) => { e.stopPropagation(); setActiveTooltip(null); }}>✕</span>
                    </div>
                    <div className="text-xs font-bold text-white font-mono mb-2">
                      {card.record.metric}
                    </div>
                    <p className="text-[11px] text-slate-300 font-mono leading-relaxed mb-2">
                      {card.record.description}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-white/10 text-[9px] font-mono text-white/50">
                    <div>SOURCE: {card.record.sourceName}</div>
                    <div className="text-amber-400 font-semibold mt-0.5">{card.record.sourceUrl}</div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
