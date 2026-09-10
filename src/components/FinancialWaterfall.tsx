import React from 'react';
import { GitBranch, TrendingUp, ShieldAlert, CheckCircle2, ChevronRight, PieChart, Sparkles } from 'lucide-react';
import { SimulationParams, SimulationResult } from '../types';

interface FinancialWaterfallProps {
  params: SimulationParams;
  onParamsChange: (newParams: SimulationParams) => void;
  result: SimulationResult;
  isPresentationMode?: boolean;
  replayTrigger?: number;
  isPaused?: boolean;
}

export const FinancialWaterfall: React.FC<FinancialWaterfallProps> = ({
  params,
  onParamsChange,
  result,
  isPresentationMode = false,
  replayTrigger = 0,
}) => {
  const gross = result.grossAnnualSavingsINR;
  const debt = result.annualRepaymentINR;
  const admin = result.verificationAndAdminFeeINR;
  const owner = result.ownerRetainedINR;

  const debtPercent = gross > 0 ? ((debt / gross) * 100).toFixed(1) : '0';
  const adminPercent = gross > 0 ? ((admin / gross) * 100).toFixed(1) : '0';
  const ownerPercent = gross > 0 ? ((owner / gross) * 100).toFixed(1) : '0';

  // Reset to BASE scenario on replay
  React.useEffect(() => {
    onParamsChange({
      ...params,
      scenario: 'BASE',
    });
  }, [replayTrigger]);

  const handleScenarioChange = (scenario: 'CONSERVATIVE' | 'BASE' | 'OPTIMISTIC') => {
    onParamsChange({
      ...params,
      scenario,
    });
  };

  return (
    <section 
      id="waterfall" 
      className={`${
        isPresentationMode 
          ? 'w-full h-full flex flex-col justify-between py-4 sm:py-6 px-4 sm:px-8 max-w-7xl mx-auto overflow-y-auto lg:overflow-hidden select-text' 
          : 'py-24 bg-[#020617] border-t border-white/10 relative'
      }`}
    >
      
      <div className={`${isPresentationMode ? 'w-full' : 'max-w-7xl mx-auto px-4 sm:px-6 relative z-10'}`}>
        
        {/* Section Header & Scenario Toggles */}
        <div className={`flex flex-col md:flex-row md:items-end justify-between ${isPresentationMode ? 'mb-4' : 'mb-12'} gap-4`}>
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/20 text-[#00F2FF] text-xs font-mono mb-2 tracking-widest uppercase">
              <GitBranch className="w-3.5 h-3.5" />
              <span>04 // CAPITAL WATERFALL</span>
            </div>
            <h2 className={`${isPresentationMode ? 'text-2xl sm:text-4xl' : 'text-3xl sm:text-5xl'} font-black text-white font-mono tracking-tight leading-tight uppercase`}>
              ANNUAL SAVINGS DISTRIBUTION
            </h2>
            <p className="text-white/60 font-mono mt-1 text-xs sm:text-sm tracking-wide">
              Verified bunker savings flow sequentially through senior debt service, platform telemetry auditing, and equity surplus.
            </p>
          </div>

          {/* Scenario Filter Pills */}
          <div className="flex items-center p-1 bg-white/5 border border-white/10 self-start md:self-auto font-mono">
            {(['CONSERVATIVE', 'BASE', 'OPTIMISTIC'] as const).map((sc) => {
              const isActive = params.scenario === sc;
              return (
                <button
                  key={sc}
                  id={`btn-scenario-${sc.toLowerCase()}`}
                  onClick={() => handleScenarioChange(sc)}
                  className={`px-3.5 py-1 text-xs font-mono uppercase tracking-wider transition-all ${
                    isActive
                      ? 'bg-[#00F2FF] text-black font-black shadow-[0_0_12px_rgba(0,242,255,0.4)]'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {sc}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Waterfall Container */}
        <div className="p-8 bg-white/[0.02] border border-white/10 shadow-2xl backdrop-blur-md space-y-8 tech-corner-accent">
          
          {/* Top Bar Summary */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10 text-xs font-mono">
            <div className="flex items-center gap-3">
              <span className="text-white/50">TOTAL_ANNUAL_POOL:</span>
              <span className="text-xl font-bold text-white">₹{gross.toFixed(2)} Cr / yr</span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1 bg-emerald-950/40 border border-emerald-500/40 text-emerald-300">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>DSCR: {result.debtServiceCoverageRatio}x (Senior Bankable Grade)</span>
            </div>
          </div>

          {/* Graphical Flow Waterfall Blocks */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            
            {/* Block 1: Gross Savings */}
            <div className="p-6 bg-[#020617] border border-[#00F2FF]/40 space-y-3 relative">
              <div className="text-[10px] font-mono text-[#00F2FF] font-bold uppercase tracking-wider">01 // GROSS SAVINGS</div>
              <div className="text-2xl sm:text-3xl font-mono font-black text-white">
                ₹{gross.toFixed(2)}{' '}
                <span className="text-xs text-white/50 font-normal">Cr</span>
              </div>
              <p className="text-xs text-white/60 font-sans">
                100% of fuel avoided via retrofit hydrodynamics at current bunker rate.
              </p>
              <div className="pt-2 text-[10px] font-mono text-[#00F2FF]">
                100.0% Initial Gross Value
              </div>
            </div>

            {/* Block 2: Bank Senior Debt Repayment */}
            <div className="p-6 bg-[#020617] border border-[#FFB347]/40 space-y-3 relative">
              <div className="text-[10px] font-mono text-[#FFB347] font-bold uppercase tracking-wider">02 // BANK DEBT SERVICE</div>
              <div className="text-2xl sm:text-3xl font-mono font-black text-[#FFB347]">
                -₹{debt.toFixed(2)}{' '}
                <span className="text-xs text-[#FFB347]/70 font-normal">Cr</span>
              </div>
              <p className="text-xs text-white/60 font-sans">
                Principal + {params.interestRateAnnualPercent || 8.5}% interest amortized over {params.financingDurationYears} years.
              </p>
              <div className="pt-2 text-[10px] font-mono text-[#FFB347]">
                {debtPercent}% of Gross Pool
              </div>
            </div>

            {/* Block 3: Verification & Platform Reserve */}
            <div className="p-6 bg-[#020617] border border-cyan-400/40 space-y-3 relative">
              <div className="text-[10px] font-mono text-cyan-300 font-bold uppercase tracking-wider">03 // VERIFICATION FEE</div>
              <div className="text-2xl sm:text-3xl font-mono font-black text-cyan-300">
                -₹{admin.toFixed(2)}{' '}
                <span className="text-xs text-cyan-400/70 font-normal">Cr</span>
              </div>
              <p className="text-xs text-white/60 font-sans">
                IoT telemetry monitoring, class society certification, and contingency reserve.
              </p>
              <div className="pt-2 text-[10px] font-mono text-cyan-300">
                {adminPercent}% Platform & Reserve
              </div>
            </div>

            {/* Block 4: Owner Net Retained Surplus */}
            <div className="p-6 bg-[#020617] border border-emerald-400 space-y-3 relative shadow-[0_0_20px_rgba(52,211,153,0.15)]">
              <div className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">04 // OWNER RETAINED</div>
              <div className="text-2xl sm:text-3xl font-mono font-black text-emerald-300">
                +₹{owner.toFixed(2)}{' '}
                <span className="text-xs text-emerald-200 font-normal">Cr/yr</span>
              </div>
              <p className="text-xs text-white/70 font-sans">
                Immediate free cashflow added to the shipowner's voyage bottom line.
              </p>
              <div className="pt-2 text-[10px] font-mono text-emerald-400 font-bold">
                {ownerPercent}% Retained Free Equity
              </div>
            </div>

          </div>

          {/* Visual Bar Proportions Breakdown */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono text-white/50">
              <span>WATERFALL PROPORTIONS</span>
              <span>100% CAPITAL RECONCILIATION</span>
            </div>
            
            <div className="h-6 w-full bg-black/50 p-1 flex gap-1 border border-white/10 overflow-hidden">
              <div 
                style={{ width: `${debtPercent}%` }} 
                className="bg-[#FFB347] h-full flex items-center justify-center text-[10px] font-mono font-bold text-black transition-all duration-500"
                title={`Bank Debt Service: ₹${debt} Cr`}
              >
                {Number(debtPercent) > 15 ? `Debt ${debtPercent}%` : ''}
              </div>
              <div 
                style={{ width: `${adminPercent}%` }} 
                className="bg-[#00F2FF] h-full flex items-center justify-center text-[10px] font-mono font-bold text-black transition-all duration-500"
                title={`Verification: ₹${admin} Cr`}
              >
                {Number(adminPercent) > 8 ? `${adminPercent}%` : ''}
              </div>
              <div 
                style={{ width: `${ownerPercent}%` }} 
                className="bg-emerald-400 h-full flex items-center justify-center text-[10px] font-mono font-bold text-black transition-all duration-500"
                title={`Owner Retained: ₹${owner} Cr`}
              >
                {Number(ownerPercent) > 15 ? `Owner ${ownerPercent}%` : ''}
              </div>
            </div>
          </div>

          {/* 10-Year Lifecycle Progression: Debt Period vs Post-Debt 100% Retained */}
          <div className="p-4 bg-white/[0.02] border border-white/10 font-mono text-xs text-white/60 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <span className="text-white font-bold">YEARS 1–{params.financingDurationYears}:</span> Debt amortizes at ₹{debt.toFixed(2)} Cr/yr while owner retains +₹{owner.toFixed(2)} Cr/yr.
            </div>
            <div>
              <span className="text-emerald-400 font-bold">YEARS {params.financingDurationYears + 1}–10:</span> Loan fully repaid; owner retains <span className="text-white font-bold">100%</span> (+₹{(gross - admin).toFixed(2)} Cr/yr).
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
