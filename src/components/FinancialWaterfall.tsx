import React from 'react';
import { GitBranch, ShieldCheck, CheckCircle2, ChevronDown, ArrowDown } from 'lucide-react';
import { SimulationParams, SimulationResult } from '../types';
import { SourceButton } from './SourceButton';

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
  const charterDeduction = result.charterDeductionINR;
  const availableSavings = result.availableVerifiedSavingsINR;
  const debt = result.annualRepaymentINR;
  const distributable = result.distributableCashflowINR;
  const bankAnnualShare = result.bankAnnualShareINR;
  const ownerAnnualShare = result.ownerAnnualShareINR;

  const debtPercentOfGross = gross > 0 ? ((debt / gross) * 100).toFixed(1) : '0';
  const charterPercentOfGross = gross > 0 ? ((charterDeduction / gross) * 100).toFixed(1) : '0';
  const bankSharePercentOfGross = gross > 0 ? ((bankAnnualShare / gross) * 100).toFixed(1) : '0';
  const ownerSharePercentOfGross = gross > 0 ? ((ownerAnnualShare / gross) * 100).toFixed(1) : '0';

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
              Verified bunker savings flow sequentially from voyage economics through senior repayment to live Bank/Shipowner distribution.
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
        <div className="p-6 sm:p-8 bg-white/[0.02] border border-white/10 shadow-2xl backdrop-blur-md space-y-8 tech-corner-accent">
          
          {/* Top Bar Summary */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10 text-xs font-mono">
            <div className="flex items-center gap-3">
              <span className="text-white/50 uppercase">ANNUAL_VERIFIED_SAVINGS_POOL:</span>
              <span className="text-xl font-bold text-white">₹{availableSavings.toFixed(2)} Cr / yr</span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1 bg-emerald-950/40 border border-emerald-500/40 text-emerald-300">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>DSCR: {result.debtServiceCoverageRatio.toFixed(2)}x</span>
                <SourceButton evidenceId="FIN-003" />
              </div>
              <div className="px-3 py-1 bg-[#FFB347]/10 border border-[#FFB347]/30 text-[#FFB347]">
                <span>Base Term: {result.baseTenureYears} yrs ({result.baseTenureMonths} mo)</span>
              </div>
              <div className="px-3 py-1 bg-cyan-950/40 border border-[#00F2FF]/30 text-[#00F2FF]">
                <span>Profit Period: {result.additionalProfitPeriodMonths} mo (Bank {result.bankSharePercent}% / Owner {result.ownerSharePercent}%)</span>
              </div>
            </div>
          </div>

          {/* 6-Stage Sequential Waterfall Flow */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 relative">
            
            {/* Stage 1: Charter / Voyage Economics */}
            <div className="p-4 bg-[#020617] border border-[#00F2FF]/40 space-y-2 relative">
              <div className="text-[10px] font-mono text-[#00F2FF] font-bold uppercase tracking-wider">
                01 // {params.charterType === 'COA' ? 'COA VOLUME ECONOMICS' : params.charterType === 'BAREBOAT' ? 'BAREBOAT OPEX SAVINGS' : params.charterType === 'TIME_CHARTER' ? 'TIME CHARTER SAVINGS' : 'VOYAGE ECONOMICS'}
              </div>
              <div className="text-xl sm:text-2xl font-mono font-black text-white">
                ₹{gross.toFixed(2)}{' '}
                <span className="text-xs text-white/50 font-normal">Cr</span>
              </div>
              <p className="text-[11px] text-white/60 font-sans leading-relaxed">
                Total gross bunker avoided via rotor sails at ₹{params.fuelPricePerTonneINR.toLocaleString()}/MT.
              </p>
              <div className="pt-1 text-[10px] font-mono text-[#00F2FF]">
                100% Gross Baseline
              </div>
            </div>

            {/* Stage 2: Charter Component Deducted */}
            <div className="p-4 bg-[#020617] border border-purple-400/40 space-y-2 relative">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-purple-300 font-bold uppercase tracking-wider">02 // CHARTER COMPONENT</span>
                <SourceButton evidenceId="CHARTER-003" />
              </div>
              <div className="text-xl sm:text-2xl font-mono font-black text-purple-300">
                {charterDeduction > 0 ? `-₹${charterDeduction.toFixed(2)}` : '₹0.00'}{' '}
                <span className="text-xs text-purple-400/70 font-normal">Cr</span>
              </div>
              <p className="text-[11px] text-white/60 font-sans leading-relaxed">
                {params.charterType === 'TIME_CHARTER'
                  ? `Time charter: Charterer ${params.chartererSavingsSharePercent}% fuel bill discount via BIMCO Green Clause.`
                  : params.charterType === 'BAREBOAT'
                  ? `Bareboat charter: Charterer ${params.chartererSavingsSharePercent}% fuel benefit retention via Bareboat Green Rider.`
                  : params.charterType === 'COA'
                  ? 'COA: 0% deducted (Owner operates vessel & retains verified savings under freight clause).'
                  : 'Voyage charter: 0% deducted (Owner captures bunker directly).'}
              </p>
              <div className="pt-1 text-[10px] font-mono text-purple-300">
                {charterPercentOfGross}% Charterer Split
              </div>
            </div>

            {/* Stage 3: Available Verified Savings */}
            <div className="p-4 bg-[#020617] border border-cyan-400/40 space-y-2 relative">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-cyan-300 font-bold uppercase tracking-wider">03 // VERIFIED SAVINGS</span>
                <SourceButton evidenceId="VERIFICATION-002" />
              </div>
              <div className="text-xl sm:text-2xl font-mono font-black text-cyan-300">
                ₹{availableSavings.toFixed(2)}{' '}
                <span className="text-xs text-cyan-400/70 font-normal">Cr</span>
              </div>
              <p className="text-[11px] text-white/60 font-sans leading-relaxed">
                Telemetry-audited cashflow pool dedicated to debt service during base loan term.
              </p>
              <div className="pt-1 text-[10px] font-mono text-cyan-300">
                Escrow Cashflow Pool
              </div>
            </div>

            {/* Stage 4: Base Loan Repayment */}
            <div className="p-4 bg-[#020617] border border-[#FFB347]/60 space-y-2 relative">
              <div className="text-[10px] font-mono text-[#FFB347] font-bold uppercase tracking-wider">04 // BASE REPAYMENT</div>
              <div className="text-xl sm:text-2xl font-mono font-black text-[#FFB347]">
                -₹{debt.toFixed(2)}{' '}
                <span className="text-xs text-[#FFB347]/70 font-normal">Cr/yr</span>
              </div>
              <p className="text-[11px] text-white/60 font-sans leading-relaxed">
                Base term: {result.baseTenureYears} yrs ({result.baseTenureMonths} mo) @ {(params.interestRateAnnualPercent ?? 0) > 0 ? `${(params.interestRateAnnualPercent ?? 0).toFixed(1)}% p.a.` : '0% interest'}.
              </p>
              <div className="pt-1 text-[10px] font-mono text-[#FFB347]">
                ₹{(result.monthlyRepaymentINR * 100).toFixed(2)} Lakhs/mo
              </div>
            </div>

            {/* Stage 5: Loan Completion Boundary (100% Repaid) */}
            <div className="p-4 bg-[#020617] border border-emerald-500/50 space-y-2 relative">
              <div className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">05 // LOAN REPAID 100%</div>
              <div className="text-xl sm:text-2xl font-mono font-black text-emerald-300">
                ₹{result.bankPrincipalRecoveredINR.toFixed(2)}{' '}
                <span className="text-xs text-emerald-400/70 font-normal">Cr</span>
              </div>
              <p className="text-[11px] text-white/60 font-sans leading-relaxed">
                100% of principal recovered in {result.baseTenureYears} years before extra profit period begins.
              </p>
              <div className="pt-1 text-[10px] font-mono text-emerald-400 font-bold">
                ✓ Senior Debt Closed
              </div>
            </div>

            {/* Stage 6: Additional Profit Period Distribution */}
            <div className={`p-4 bg-[#020617] space-y-2 relative ${result.additionalProfitPeriodMonths > 0 ? 'border border-[#00F2FF] shadow-[0_0_20px_rgba(0,242,255,0.15)]' : 'border border-dashed border-white/20'}`}>
              <div className="text-[10px] font-mono text-[#00F2FF] font-bold uppercase tracking-wider">06 // PROFIT PERIOD</div>
              {result.additionalProfitPeriodMonths > 0 ? (
                <div className="space-y-1 font-mono">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#00F2FF]">Bank ({result.bankSharePercent}%):</span>
                    <span className="text-white font-bold">+₹{result.additionalBankProfitINR.toFixed(2)} Cr</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-emerald-300">Owner ({result.ownerSharePercent}%):</span>
                    <span className="text-emerald-300 font-bold">+₹{result.additionalOwnerProfitINR.toFixed(2)} Cr</span>
                  </div>
                </div>
              ) : (
                <div className="text-sm font-mono text-white/50 pt-1">
                  0 months (No extra profit period)
                </div>
              )}
              <p className="text-[11px] text-white/70 font-sans leading-relaxed pt-1">
                {result.additionalProfitPeriodMonths > 0 
                  ? `Post-repayment distribution across ${result.additionalProfitPeriodMonths} months.` 
                  : 'Adjust slider above to add post-repayment profit period.'}
              </p>
              <div className="pt-1 text-[10px] font-mono text-[#00F2FF] font-bold">
                {result.additionalProfitPeriodMonths > 0 ? `+₹${result.additionalProfitTotalSavingsINR.toFixed(2)} Cr Distributed` : '0 Cr Distributed'}
              </div>
            </div>

          </div>

          {/* Visual Bar Proportions Breakdown */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono text-white/50">
              <span>WATERFALL PROPORTIONS RECONCILIATION</span>
              <span>100% CAPITAL FLOW</span>
            </div>
            
            <div className="h-6 w-full bg-black/50 p-1 flex gap-1 border border-white/10 overflow-hidden">
              {Number(debtPercentOfGross) > 0 && (
                <div 
                  style={{ width: `${debtPercentOfGross}%` }} 
                  className="bg-[#FFB347] h-full flex items-center justify-center text-[10px] font-mono font-bold text-black transition-all duration-500"
                  title={`Loan Repayment: ₹${debt.toFixed(2)} Cr (${debtPercentOfGross}%)`}
                >
                  {Number(debtPercentOfGross) > 12 ? `Debt ${debtPercentOfGross}%` : ''}
                </div>
              )}
              {Number(charterPercentOfGross) > 0 && (
                <div 
                  style={{ width: `${charterPercentOfGross}%` }} 
                  className="bg-purple-400 h-full flex items-center justify-center text-[10px] font-mono font-bold text-black transition-all duration-500"
                  title={`Charter Component: ₹${charterDeduction.toFixed(2)} Cr (${charterPercentOfGross}%)`}
                >
                  {Number(charterPercentOfGross) > 10 ? `Charterer ${charterPercentOfGross}%` : ''}
                </div>
              )}
              {Number(bankSharePercentOfGross) > 0 && (
                <div 
                  style={{ width: `${bankSharePercentOfGross}%` }} 
                  className="bg-[#00F2FF] h-full flex items-center justify-center text-[10px] font-mono font-bold text-black transition-all duration-500"
                  title={`Bank Share: ₹${bankAnnualShare.toFixed(2)} Cr (${bankSharePercentOfGross}%)`}
                >
                  {Number(bankSharePercentOfGross) > 10 ? `Bank ${bankSharePercentOfGross}%` : ''}
                </div>
              )}
              {Number(ownerSharePercentOfGross) > 0 && (
                <div 
                  style={{ width: `${ownerSharePercentOfGross}%` }} 
                  className="bg-emerald-400 h-full flex items-center justify-center text-[10px] font-mono font-bold text-black transition-all duration-500"
                  title={`Owner Share: ₹${ownerAnnualShare.toFixed(2)} Cr (${ownerSharePercentOfGross}%)`}
                >
                  {Number(ownerSharePercentOfGross) > 8 ? `Owner ${ownerSharePercentOfGross}%` : ''}
                </div>
              )}
            </div>
          </div>

          {/* 10-Year Lifecycle Progression: Base Term vs Profit Period vs 100% Final Retention */}
          <div className="p-4 bg-white/[0.02] border border-white/10 font-mono text-xs text-white/70 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <span className="text-[#FFB347] font-bold">STAGE 1 (YRS 1–{result.baseTenureYears}):</span> Base loan principal 100% amortized at ₹{debt.toFixed(2)} Cr/yr. Senior debt closed.
            </div>
            {result.additionalProfitPeriodMonths > 0 && (
              <div>
                <span className="text-[#00F2FF] font-bold">STAGE 2 ({result.additionalProfitPeriodMonths} MO):</span> Profit period split: Bank ({result.bankSharePercent}%, +₹{result.additionalBankProfitINR.toFixed(2)} Cr) / Owner ({result.ownerSharePercent}%, +₹{result.additionalOwnerProfitINR.toFixed(2)} Cr).
              </div>
            )}
            <div>
              <span className="text-emerald-400 font-bold">STAGE 3 (FINAL RETENTION):</span> 100% verified fuel savings retained by Shipowner (+₹{availableSavings.toFixed(2)} Cr/yr).
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
