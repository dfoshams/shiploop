import React from 'react';
import { GitBranch, Banknote, ShieldCheck, TrendingUp, Users, ArrowRight } from 'lucide-react';
import { usePresentation } from '../PresentationContext';

export const Scene5Waterfall: React.FC = () => {
  const { simResult } = usePresentation();

  const gross = simResult.grossAnnualSavingsINR;
  const debt = simResult.annualRepaymentINR;
  const admin = simResult.verificationAndAdminFeeINR;
  const surplus = Math.max(0, gross - debt - admin);
  const charterer = surplus * 0.5;
  const owner = surplus * 0.5;

  const debtPct = gross > 0 ? ((debt / gross) * 100).toFixed(1) : '29.1';
  const adminPct = gross > 0 ? ((admin / gross) * 100).toFixed(1) : '4.0';
  const chartererPct = gross > 0 ? ((charterer / gross) * 100).toFixed(1) : '33.5';
  const ownerPct = gross > 0 ? ((owner / gross) * 100).toFixed(1) : '33.5';

  const streams = [
    {
      num: '01',
      recipient: 'SENIOR LENDER / BANK',
      label: 'Debt Service Annuity',
      amount: `₹${debt.toFixed(2)} Cr`,
      percent: `${debtPct}%`,
      badge: 'SENIOR SECURED',
      icon: Banknote,
      color: 'border-[#FFB347]/40 text-[#FFB347] bg-[#FFB347]/5',
    },
    {
      num: '02',
      recipient: 'TELEMETRY & DSRF',
      label: 'Class Oracle & Reserve',
      amount: `₹${admin.toFixed(2)} Cr`,
      percent: `${adminPct}%`,
      badge: 'DE-RISKING POOL',
      icon: ShieldCheck,
      color: 'border-[#00F2FF]/40 text-[#00F2FF] bg-[#00F2FF]/5',
    },
    {
      num: '03',
      recipient: 'TIME CHARTERER',
      label: 'Immediate Bunker Savings',
      amount: `₹${charterer.toFixed(2)} Cr`,
      percent: `${chartererPct}%`,
      badge: 'OPEX DISCOUNT',
      icon: Users,
      color: 'border-emerald-400/40 text-emerald-400 bg-emerald-950/10',
    },
    {
      num: '04',
      recipient: 'SHIPOWNER',
      label: 'Net Free Cashflow',
      amount: `₹${owner.toFixed(2)} Cr`,
      percent: `${ownerPct}%`,
      badge: 'FREE ASSET VALUE',
      icon: TrendingUp,
      color: 'border-teal-300/40 text-teal-300 bg-teal-950/10',
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
              CHAPTER 04 // SAVINGS DISTRIBUTION
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight uppercase">
              SOLVING THE SPLIT INCENTIVE WATERFALL
            </h1>
          </div>
        </div>

        <div className="text-right">
          <div className="text-[10px] text-white/50 uppercase">TOTAL ANNUAL SAVINGS</div>
          <div className="text-2xl font-black text-white">
            ₹{gross.toFixed(2)} Cr
          </div>
        </div>
      </div>

      {/* Main 4-Tier Waterfall Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-auto">
        {streams.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.num}
              className={`p-6 bg-white/[0.02] border ${s.color} tech-corner-accent shadow-xl flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-white/40">
                    PRIORITY {s.num}
                  </span>
                  <span className="text-[9px] px-2 py-0.5 border border-white/20 font-bold uppercase">
                    {s.badge}
                  </span>
                </div>

                <div className="text-xs text-white/70 font-bold uppercase tracking-wider mb-1">
                  {s.recipient}
                </div>

                {/* Giant Value */}
                <div className="text-3xl sm:text-4xl font-black text-white tracking-tight my-2">
                  {s.amount}
                </div>

                <div className="text-xs font-bold text-[#00F2FF] mb-2">
                  {s.percent} of Total Savings
                </div>

                <div className="text-[11px] text-white/50 leading-relaxed font-normal">
                  {s.label}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-white/40 uppercase">
                <span>Contractual Claim</span>
                <Icon className="w-3.5 h-3.5 text-white/60" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Key Takeaway Callout */}
      <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-white/90">
          <span className="text-emerald-400 font-bold uppercase">THE BREAKTHROUGH:</span>
          <span>Both Shipowner and Charterer make net positive cashflow from Day 1 without putting up any equity.</span>
        </div>
        <div className="text-white/40 text-right text-[11px]">
          HOLDING STATE • ADVANCE WITH [→]
        </div>
      </div>

    </div>
  );
};
