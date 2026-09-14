import React, { useState, useMemo, useRef } from 'react';
import { 
  TrendingUp, 
  RotateCcw, 
  X, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Layers,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SimulationParams, SimulationResult } from '../types';
import { calculateSimulation } from '../logic/financialModel';
import { DEMO_DATA } from '../data/demoData';

interface PaybackCurvePanelProps {
  params: SimulationParams;
  result: SimulationResult;
  onClose: () => void;
  isPresentationMode?: boolean;
}

export const PaybackCurvePanel: React.FC<PaybackCurvePanelProps> = ({
  params,
  result,
  onClose,
  isPresentationMode = false,
}) => {
  const [replayKey, setReplayKey] = useState<number>(0);
  const [hoveredPoint, setHoveredPoint] = useState<{
    month: number;
    year: number;
    cumSavings: number;
    outstanding: number;
    origOutstanding?: number;
    ownerValue: number;
    x: number;
    y: number;
  } | null>(null);

  const svgRef = useRef<SVGSVGElement>(null);

  // Check user preference for reduced motion
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // =========================================================================
  // 1. DYNAMIC LOAN TENURE LOGIC & SINGLE SOURCE OF TRUTH
  // =========================================================================
  const defaultTenureYears = DEMO_DATA.defaultSimulationParams.financingDurationYears || 6;
  const currentTenureYears = params.financingDurationYears || 6;
  const isTenureIncreased = currentTenureYears > defaultTenureYears;

  // Run baseline simulation with the default loan tenure to get original trajectory (Single Source of Truth)
  const originalResult = useMemo(() => {
    if (!isTenureIncreased) return null;
    const origParams: SimulationParams = {
      ...params,
      financingDurationYears: defaultTenureYears,
    };
    return calculateSimulation(origParams);
  }, [params, defaultTenureYears, isTenureIncreased]);

  // Derived financial dynamics
  const monthlySavings = result.availableVerifiedSavingsINR / 12; // ₹ Cr / month
  const totalFinanced = result.totalLoanRepaidINR; // Principal + interest in ₹ Cr
  const currentFinancedAmount = params.retrofitCostINR * (params.financingPercentage / 100);
  const currentAnnualInterestRate = Math.max(0, params.interestRateAnnualPercent ?? 0) / 100;
  const currentBaseTenureMonths = result.baseTenureMonths;

  // Exact repayment point in months when 100% of the loan principal/obligation has been recovered
  const repaymentMonths = monthlySavings > 0 ? (totalFinanced / monthlySavings) : 0;
  const repaymentYears = repaymentMonths / 12;

  // Additional Profit Period (months and end point)
  const profitPeriodMonths = result.additionalProfitPeriodMonths ?? 0;
  const profitPeriodEndMonth = repaymentMonths + profitPeriodMonths;

  // Dynamic time horizon: expands automatically to accommodate stretched tenure and profit periods
  const maxHorizonMonths = Math.max(
    120,
    currentBaseTenureMonths + 18,
    Math.ceil((profitPeriodEndMonth + 18) / 12) * 12
  );
  const totalDisplayMonths = Math.ceil(maxHorizonMonths / 12) * 12;
  const totalDisplayYears = totalDisplayMonths / 12;

  // =========================================================================
  // 2. LARGE SVG CHART DIMENSIONS FOR RIGHT-HAND VISUALIZATION STAGE
  // =========================================================================
  const width = 960;
  const height = 480;
  const margin = { top: 58, right: 40, bottom: 64, left: 74 };
  const plotWidth = width - margin.left - margin.right;
  const plotHeight = height - margin.top - margin.bottom;

  // 3. SCALES
  const maxCumSavingsAtHorizon = totalDisplayMonths * monthlySavings;
  const maxVal = Math.max(
    totalFinanced * 1.25,
    maxCumSavingsAtHorizon * 1.05,
    result.tenYearCumulativeNetOwnerBenefitINR * 1.15,
    15
  );

  const xScale = (month: number) => margin.left + (month / totalDisplayMonths) * plotWidth;
  const yScale = (val: number) => margin.top + plotHeight - (Math.max(0, val) / maxVal) * plotHeight;

  // =========================================================================
  // 4. GENERATE 61 SAMPLE POINTS FOR SMOOTH PATH MORPHING & REPAYMENT CURVES
  // =========================================================================
  const numPoints = 60;
  const curveData = useMemo(() => {
    const points: Array<{
      month: number;
      cumSavings: number;
      outstanding: number;
      origOutstanding: number;
      ownerVal: number;
      x: number;
      ySavings: number;
      yDebt: number;
      yOrigDebt: number;
      yOwner: number;
    }> = [];

    const ownerBaseTermSurplusMonthly = result.ownerBaseTermAnnualSurplusINR / 12;
    const ownerShareFrac = result.ownerSharePercent / 100;
    const i_m = currentAnnualInterestRate > 0 ? currentAnnualInterestRate / 12 : 0;

    // Original amortization parameters
    const origBaseTenureMonths = originalResult ? originalResult.baseTenureMonths : defaultTenureYears * 12;
    const origFinancedAmount = originalResult ? originalResult.financedAmountINR : currentFinancedAmount;
    const origInterestRate = Math.max(0, params.interestRateAnnualPercent ?? 0) / 100;
    const orig_i_m = origInterestRate > 0 ? origInterestRate / 12 : 0;

    for (let i = 0; i <= numPoints; i++) {
      const m = (i / numPoints) * totalDisplayMonths;

      // 1. Cumulative Verified Savings: accumulates monotonically
      const cumSavings = m * monthlySavings;

      // 2. Current Outstanding Financing (Current Tenure trajectory):
      // Amortizes over currentBaseTenureMonths
      let outstanding = 0;
      if (m < currentBaseTenureMonths) {
        if (currentAnnualInterestRate > 0) {
          outstanding = currentFinancedAmount * (Math.pow(1 + i_m, currentBaseTenureMonths) - Math.pow(1 + i_m, m)) / (Math.pow(1 + i_m, currentBaseTenureMonths) - 1);
        } else {
          outstanding = currentFinancedAmount * (1 - m / currentBaseTenureMonths);
        }
      } else {
        outstanding = 0;
      }
      outstanding = Math.max(0, outstanding);

      // 2b. Original Outstanding Financing (Ghost / Reference trajectory):
      // Amortizes over origBaseTenureMonths (default tenure)
      let origOutstanding = 0;
      if (isTenureIncreased) {
        if (m < origBaseTenureMonths) {
          if (origInterestRate > 0) {
            origOutstanding = origFinancedAmount * (Math.pow(1 + orig_i_m, origBaseTenureMonths) - Math.pow(1 + orig_i_m, m)) / (Math.pow(1 + orig_i_m, origBaseTenureMonths) - 1);
          } else {
            origOutstanding = origFinancedAmount * (1 - m / origBaseTenureMonths);
          }
        } else {
          origOutstanding = 0;
        }
        origOutstanding = Math.max(0, origOutstanding);
      }

      // 3. Shipowner Value: accumulated owner benefit according to model
      let ownerVal = 0;
      if (m <= repaymentMonths) {
        ownerVal = m * ownerBaseTermSurplusMonthly;
      } else if (m <= profitPeriodEndMonth) {
        const baseSurplusTotal = repaymentMonths * ownerBaseTermSurplusMonthly;
        const profitPeriodElapsed = m - repaymentMonths;
        ownerVal = baseSurplusTotal + profitPeriodElapsed * monthlySavings * ownerShareFrac;
      } else {
        const baseSurplusTotal = repaymentMonths * ownerBaseTermSurplusMonthly;
        const profitPeriodTotal = profitPeriodMonths * monthlySavings * ownerShareFrac;
        const postProfitElapsed = m - profitPeriodEndMonth;
        ownerVal = baseSurplusTotal + profitPeriodTotal + postProfitElapsed * monthlySavings;
      }

      points.push({
        month: m,
        cumSavings,
        outstanding,
        origOutstanding,
        ownerVal,
        x: xScale(m),
        ySavings: yScale(cumSavings),
        yDebt: yScale(outstanding),
        yOrigDebt: yScale(origOutstanding),
        yOwner: yScale(ownerVal),
      });
    }

    return points;
  }, [
    totalDisplayMonths,
    monthlySavings,
    currentAnnualInterestRate,
    currentBaseTenureMonths,
    currentFinancedAmount,
    isTenureIncreased,
    originalResult,
    defaultTenureYears,
    params,
    repaymentMonths,
    profitPeriodMonths,
    profitPeriodEndMonth,
    result,
    maxVal
  ]);

  // SVG Paths constructed from points
  const savingsPath = useMemo(() => {
    return curveData.reduce((acc, p, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${p.x.toFixed(2)} ${p.ySavings.toFixed(2)}`, '');
  }, [curveData]);

  const debtPath = useMemo(() => {
    return curveData.reduce((acc, p, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${p.x.toFixed(2)} ${p.yDebt.toFixed(2)}`, '');
  }, [curveData]);

  const originalDebtPath = useMemo(() => {
    if (!isTenureIncreased) return null;
    return curveData.reduce((acc, p, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${p.x.toFixed(2)} ${p.yOrigDebt.toFixed(2)}`, '');
  }, [curveData, isTenureIncreased]);

  const ownerPath = useMemo(() => {
    return curveData.reduce((acc, p, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${p.x.toFixed(2)} ${p.yOwner.toFixed(2)}`, '');
  }, [curveData]);

  const savingsAreaPath = useMemo(() => {
    if (curveData.length === 0) return '';
    const first = curveData[0];
    const last = curveData[curveData.length - 1];
    const bottomY = yScale(0);
    return `${savingsPath} L ${last.x.toFixed(2)} ${bottomY.toFixed(2)} L ${first.x.toFixed(2)} ${bottomY.toFixed(2)} Z`;
  }, [savingsPath, curveData]);

  // Coordinates for vertical markers
  const repayX = xScale(Math.min(totalDisplayMonths, repaymentMonths));
  const tenureEndX = xScale(Math.min(totalDisplayMonths, currentBaseTenureMonths));
  const profitEndX = xScale(Math.min(totalDisplayMonths, profitPeriodEndMonth));

  // Interactive mouse / touch move for tooltip
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement> | React.TouchEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const svgX = ((clientX - rect.left) / rect.width) * width;
    const svgY = ((clientY - rect.top) / rect.height) * height;

    if (svgX < margin.left || svgX > width - margin.right) {
      setHoveredPoint(null);
      return;
    }

    const relX = svgX - margin.left;
    const frac = Math.max(0, Math.min(1, relX / plotWidth));
    const m = frac * totalDisplayMonths;

    // Exact values at month m
    const cumSavings = m * monthlySavings;
    const i_m = currentAnnualInterestRate > 0 ? currentAnnualInterestRate / 12 : 0;
    
    let outstanding = 0;
    if (m < currentBaseTenureMonths) {
      if (currentAnnualInterestRate > 0) {
        outstanding = currentFinancedAmount * (Math.pow(1 + i_m, currentBaseTenureMonths) - Math.pow(1 + i_m, m)) / (Math.pow(1 + i_m, currentBaseTenureMonths) - 1);
      } else {
        outstanding = currentFinancedAmount * (1 - m / currentBaseTenureMonths);
      }
    }

    let origOutstanding: number | undefined = undefined;
    if (isTenureIncreased && originalResult) {
      const origBaseMonths = originalResult.baseTenureMonths;
      const orig_i = currentAnnualInterestRate > 0 ? currentAnnualInterestRate / 12 : 0;
      if (m < origBaseMonths) {
        if (currentAnnualInterestRate > 0) {
          origOutstanding = currentFinancedAmount * (Math.pow(1 + orig_i, origBaseMonths) - Math.pow(1 + orig_i, m)) / (Math.pow(1 + orig_i, origBaseMonths) - 1);
        } else {
          origOutstanding = currentFinancedAmount * (1 - m / origBaseMonths);
        }
      } else {
        origOutstanding = 0;
      }
    }

    const ownerBaseTermSurplusMonthly = result.ownerBaseTermAnnualSurplusINR / 12;
    const ownerShareFrac = result.ownerSharePercent / 100;
    let ownerValue = 0;
    if (m <= repaymentMonths) {
      ownerValue = m * ownerBaseTermSurplusMonthly;
    } else if (m <= profitPeriodEndMonth) {
      ownerValue = repaymentMonths * ownerBaseTermSurplusMonthly + (m - repaymentMonths) * monthlySavings * ownerShareFrac;
    } else {
      ownerValue = repaymentMonths * ownerBaseTermSurplusMonthly + profitPeriodMonths * monthlySavings * ownerShareFrac + (m - profitPeriodEndMonth) * monthlySavings;
    }

    setHoveredPoint({
      month: Math.round(m),
      year: Number((m / 12).toFixed(1)),
      cumSavings,
      outstanding: Math.max(0, outstanding),
      origOutstanding: origOutstanding !== undefined ? Math.max(0, origOutstanding) : undefined,
      ownerValue,
      x: svgX,
      y: svgY,
    });
  };

  const handleMouseLeave = () => {
    setHoveredPoint(null);
  };

  // Grid tick values
  const yTicks = useMemo(() => {
    const step = maxVal > 60 ? 15 : maxVal > 30 ? 10 : 5;
    const ticks: number[] = [];
    for (let v = 0; v <= maxVal; v += step) {
      ticks.push(v);
    }
    return ticks;
  }, [maxVal]);

  const xYearTicks = useMemo(() => {
    const ticks: number[] = [];
    for (let yr = 0; yr <= totalDisplayYears; yr += 2) {
      ticks.push(yr);
    }
    return ticks;
  }, [totalDisplayYears]);

  return (
    <div 
      id="payback-curve-panel"
      className="p-5 sm:p-7 bg-[#020617] border-2 border-[#00F2FF]/60 shadow-[0_0_40px_rgba(0,242,255,0.22)] font-mono text-xs tech-corner-accent relative overflow-hidden transition-all duration-300 w-full"
    >
      {/* Ambient glow and subtle backdrop grid */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/25 via-transparent to-emerald-950/20 pointer-events-none" />
      <div className="absolute -top-12 -right-12 w-80 h-80 bg-[#00F2FF]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* HEADER BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 gap-3 relative z-10">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#00F2FF]/10 text-[#00F2FF] border border-[#00F2FF]/40 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">
              <TrendingUp className="w-3.5 h-3.5" />
              LIVE DYNAMIC VISUALIZATION
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-white/5 text-white/60 border border-white/15 text-[10px] uppercase tracking-wider">
              SINGLE SOURCE OF TRUTH
            </span>
            {isTenureIncreased && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#FFB347]/15 text-[#FFB347] border border-[#FFB347]/40 text-[10px] font-bold uppercase tracking-wider animate-pulse">
                <Layers className="w-3.5 h-3.5" />
                TENURE EFFECT ACTIVE
              </span>
            )}
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mt-1.5 flex items-center gap-3">
            <span>PAYBACK CURVE</span>
            <span className="text-xs font-normal font-mono text-[#00F2FF] bg-[#00F2FF]/10 px-2.5 py-0.5 border border-[#00F2FF]/30 hidden sm:inline">
              RECOVERY AT {repaymentMonths.toFixed(1)} MO
            </span>
          </h3>
          <p className="text-white/75 text-xs sm:text-sm mt-1 tracking-wide font-sans">
            Watch how your selected assumptions change the repayment journey.
          </p>
        </div>

        {/* CONTROLS: REPLAY & CLOSE */}
        <div className="flex items-center gap-2.5 self-start sm:self-auto shrink-0">
          <button
            id="btn-replay-payback-curve"
            onClick={() => setReplayKey((k) => k + 1)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-white/5 hover:bg-white/15 border border-white/20 text-[#00F2FF] text-xs font-bold uppercase tracking-wider hover:border-[#00F2FF]/60 shadow-sm transition-all cursor-pointer"
            title="Replay animated curve drawing sequence"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>REPLAY</span>
          </button>

          <button
            id="btn-close-payback-curve"
            onClick={onClose}
            className="flex items-center gap-1.5 px-4 py-2 bg-white/10 hover:bg-rose-950/60 border border-white/25 hover:border-rose-500/60 text-white hover:text-rose-300 text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-sm"
            title="Return to existing Result Values view"
          >
            <X className="w-4 h-4" />
            <span>CLOSE</span>
          </button>
        </div>
      </div>

      {/* SECTION 14: DYNAMIC LEGEND & LIVE STATUS */}
      <div className="py-3 flex flex-wrap items-center justify-between gap-3 text-xs border-b border-white/10 relative z-10">
        <div className="flex flex-wrap items-center gap-4 sm:gap-5">
          {/* Curve 1: Cumulative Verified Savings */}
          <div className="flex items-center gap-2">
            <span className="w-4 h-1 bg-[#00F2FF] rounded-full shadow-[0_0_8px_rgba(0,242,255,0.9)]" />
            <span className="text-[#00F2FF] font-bold text-[11px] sm:text-xs">
              1. CUMULATIVE VERIFIED SAVINGS
            </span>
          </div>

          {/* Curve 2: Current Outstanding Financing (Solid) */}
          <div className="flex items-center gap-2">
            <span className="w-4 h-1 bg-[#FFB347] rounded-full shadow-[0_0_8px_rgba(255,179,71,0.9)]" />
            <span className="text-[#FFB347] font-bold text-[11px] sm:text-xs">
              {isTenureIncreased ? `2. CURRENT TENURE — ${currentTenureYears} YEARS` : '2. OUTSTANDING FINANCING'}
            </span>
          </div>

          {/* Ghost / Reference Line (Only when tenure is increased) */}
          {isTenureIncreased && (
            <motion.div 
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2"
            >
              <span className="w-4 h-0.5 border-t-2 border-dashed border-[#FFB347]/70" />
              <span className="text-[#FFB347]/70 font-bold text-[11px] sm:text-xs">
                ┄ ORIGINAL TENURE — {defaultTenureYears} YEARS
              </span>
            </motion.div>
          )}

          {/* Curve 3: Shipowner Value */}
          <div className="flex items-center gap-2">
            <span className="w-4 h-1 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
            <span className="text-emerald-400 font-bold text-[11px] sm:text-xs">
              3. SHIPOWNER VALUE
            </span>
          </div>
        </div>

        {/* Live Calibration Stats Tag */}
        <div className="flex items-center gap-2 text-[11px] bg-black/60 px-3 py-1.5 border border-white/15">
          <span className="text-white/60">REPAYMENT:</span>
          <span className="text-[#00F2FF] font-black">
            MONTH {repaymentMonths.toFixed(1)} ({repaymentYears.toFixed(1)} YRS)
          </span>
          <span className="text-white/30">|</span>
          <span className="text-white/60">TERM:</span>
          <span className="text-white font-bold">{currentTenureYears} YRS ({result.baseTenureMonths} MO)</span>
        </div>
      </div>

      {/* SECTION 7 & 8: DYNAMIC TENURE EFFECT FINANCIAL CONSEQUENCE STRIP */}
      {isTenureIncreased && (
        <motion.div
          initial={{ opacity: prefersReducedMotion ? 1 : 0, height: prefersReducedMotion ? 'auto' : 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.35 }}
          className="mt-3 p-3 bg-amber-950/20 border border-[#FFB347]/50 shadow-[0_0_20px_rgba(255,179,71,0.12)] flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs font-mono relative z-10"
        >
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2 py-0.5 bg-[#FFB347]/20 text-[#FFB347] font-bold text-[10px] border border-[#FFB347]/40 uppercase tracking-wider">
              TENURE SPREAD
            </span>
            <span className="text-white/85 text-[11px] font-sans">
              Longer tenure spreads repayment over a longer period.
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-[11px]">
            <div>
              <span className="text-white/50 text-[10px] block sm:inline">CURRENT LOAN TENURE: </span>
              <span className="text-white font-black text-xs">{currentTenureYears} YEARS</span>
              <span className="text-white/40 ml-1">({currentTenureYears * 12} mo)</span>
            </div>
            <div className="hidden sm:block h-3.5 w-px bg-white/20" />
            <div>
              <span className="text-white/50 text-[10px] block sm:inline">REPAYMENT PERIOD: </span>
              <span className="text-[#00F2FF] font-black text-xs">{result.finalTenureMonths} MONTHS</span>
              <span className="text-white/40 ml-1">({result.finalTenureYears.toFixed(1)} Yrs)</span>
            </div>
            <div className="hidden sm:block h-3.5 w-px bg-white/20" />
            <div>
              <span className="text-white/50 text-[10px] block sm:inline">TOTAL FINANCING COST: </span>
              <span className="text-[#FFB347] font-black text-xs">₹{result.totalLoanRepaidINR.toFixed(2)} Cr</span>
              {(params.interestRateAnnualPercent ?? 0) > 0 && (
                <span className="text-amber-300/80 ml-1 text-[10px]">
                  (+₹{result.totalInterestINR.toFixed(2)} Cr interest)
                </span>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* SVG PLOTTING STAGE */}
      <div className="relative mt-4 z-10 select-none">
        <svg
          key={replayKey}
          ref={svgRef}
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto max-h-[580px] overflow-visible cursor-crosshair"
          onMouseMove={handleMouseMove}
          onTouchMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onTouchEnd={handleMouseLeave}
        >
          <defs>
            <linearGradient id="savingsAreaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00F2FF" stopOpacity="0.28" />
              <stop offset="70%" stopColor="#00F2FF" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#00F2FF" stopOpacity="0.0" />
            </linearGradient>

            <linearGradient id="profitPeriodGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00F2FF" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#FFB347" stopOpacity="0.05" />
            </linearGradient>

            <filter id="cyanGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            <filter id="amberGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            <filter id="emeraldGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* AXES & GRID */}
          <motion.g
            initial={{ opacity: prefersReducedMotion ? 1 : 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.4 }}
          >
            {/* Horizontal Grid lines */}
            {yTicks.map((val) => {
              const y = yScale(val);
              return (
                <g key={`y-${val}`}>
                  <line
                    x1={margin.left}
                    y1={y}
                    x2={width - margin.right}
                    y2={y}
                    stroke="rgba(255, 255, 255, 0.08)"
                    strokeDasharray={val === 0 ? 'none' : '3 3'}
                    strokeWidth={val === 0 ? 1.5 : 1}
                  />
                  <text
                    x={margin.left - 12}
                    y={y + 4}
                    textAnchor="end"
                    fill="rgba(255, 255, 255, 0.55)"
                    fontSize="11"
                    fontFamily="monospace"
                  >
                    ₹{val} Cr
                  </text>
                </g>
              );
            })}

            {/* Vertical Year Grid lines */}
            {xYearTicks.map((yr) => {
              const x = xScale(yr * 12);
              return (
                <g key={`x-${yr}`}>
                  <line
                    x1={x}
                    y1={margin.top}
                    x2={x}
                    y2={margin.top + plotHeight}
                    stroke="rgba(255, 255, 255, 0.06)"
                    strokeDasharray="2 4"
                    strokeWidth="1"
                  />
                </g>
              );
            })}

            {/* Base Axes lines */}
            <line
              x1={margin.left}
              y1={margin.top}
              x2={margin.left}
              y2={margin.top + plotHeight}
              stroke="rgba(255, 255, 255, 0.25)"
              strokeWidth="1.5"
            />
            <line
              x1={margin.left}
              y1={margin.top + plotHeight}
              x2={width - margin.right}
              y2={margin.top + plotHeight}
              stroke="rgba(255, 255, 255, 0.25)"
              strokeWidth="1.5"
            />
          </motion.g>

          {/* TIME AXIS LABELS */}
          <motion.g
            initial={{ opacity: prefersReducedMotion ? 1 : 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.4, delay: prefersReducedMotion ? 0 : 0.2 }}
          >
            {xYearTicks.map((yr) => {
              const x = xScale(yr * 12);
              return (
                <g key={`xtick-${yr}`}>
                  <text
                    x={x}
                    y={margin.top + plotHeight + 20}
                    textAnchor="middle"
                    fill="rgba(255, 255, 255, 0.8)"
                    fontSize="12"
                    fontFamily="monospace"
                    fontWeight={yr % 4 === 0 ? 'bold' : 'normal'}
                  >
                    Yr {yr}
                  </text>
                  <text
                    x={x}
                    y={margin.top + plotHeight + 34}
                    textAnchor="middle"
                    fill="rgba(255, 255, 255, 0.4)"
                    fontSize="10"
                    fontFamily="monospace"
                  >
                    {yr * 12}m
                  </text>
                </g>
              );
            })}
            <text
              x={width - margin.right}
              y={margin.top + plotHeight + 52}
              textAnchor="end"
              fill="rgba(0, 242, 255, 0.85)"
              fontSize="11"
              fontFamily="monospace"
              fontWeight="bold"
            >
              TIME HORIZON (MONTHS / YEARS) →
            </text>
          </motion.g>

          {/* ADDITIONAL PROFIT PERIOD HIGHLIGHT REGION (If > 0 months) */}
          {profitPeriodMonths > 0 && (
            <motion.g
              initial={{ opacity: prefersReducedMotion ? 1 : 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: prefersReducedMotion ? 0 : 1.8 }}
            >
              <rect
                x={repayX}
                y={margin.top}
                width={Math.max(0, profitEndX - repayX)}
                height={plotHeight}
                fill="url(#profitPeriodGradient)"
                stroke="rgba(0, 242, 255, 0.4)"
                strokeDasharray="4 4"
                strokeWidth="1.2"
              />

              <g transform={`translate(${Math.min(width - margin.right - 200, Math.max(repayX + 6, (repayX + profitEndX) / 2 - 100))}, ${margin.top + 8})`}>
                <rect
                  x="0"
                  y="0"
                  width="200"
                  height="30"
                  fill="rgba(2, 6, 23, 0.96)"
                  stroke="#00F2FF"
                  strokeWidth="1.2"
                  className="shadow-[0_0_15px_rgba(0,242,255,0.35)]"
                />
                <text
                  x="100"
                  y="13"
                  textAnchor="middle"
                  fill="#00F2FF"
                  fontSize="10"
                  fontFamily="monospace"
                  fontWeight="bold"
                  letterSpacing="0.06em"
                >
                  ADDITIONAL PROFIT PERIOD ({profitPeriodMonths} MO)
                </text>
                <text
                  x="100"
                  y="24"
                  textAnchor="middle"
                  fill="#E2E8F0"
                  fontSize="9"
                  fontFamily="monospace"
                >
                  BANK {result.bankSharePercent}% • SHIPOWNER {result.ownerSharePercent}%
                </text>
              </g>
            </motion.g>
          )}

          {/* 1. CUMULATIVE VERIFIED SAVINGS (Cyan) */}
          <motion.path
            d={savingsAreaPath}
            fill="url(#savingsAreaGradient)"
            initial={{ opacity: prefersReducedMotion ? 1 : 0 }}
            animate={{ opacity: 1, d: savingsAreaPath }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.9, delay: prefersReducedMotion ? 0 : 0.5, ease: 'easeInOut' }}
          />

          <motion.path
            d={savingsPath}
            fill="none"
            stroke="#00F2FF"
            strokeWidth="3.5"
            filter="url(#cyanGlow)"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: prefersReducedMotion ? 1 : 0 }}
            animate={{ pathLength: 1, d: savingsPath }}
            transition={{ 
              pathLength: { duration: prefersReducedMotion ? 0 : 1.2, delay: prefersReducedMotion ? 0 : 0.3, ease: 'easeInOut' },
              d: { duration: prefersReducedMotion ? 0 : 0.9, ease: 'easeInOut' }
            }}
          />

          {/* 2b. GHOST / REFERENCE ORIGINAL TENURE FINANCING LINE (Dashed Amber) */}
          {/* Active ONLY when tenure is increased */}
          {isTenureIncreased && originalDebtPath && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.path
                d={originalDebtPath}
                fill="none"
                stroke="#FFB347"
                strokeWidth="2"
                strokeDasharray="5 4"
                strokeOpacity={0.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={{ d: originalDebtPath }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.9, ease: 'easeInOut' }}
              />

              {/* Trajectory Label for Original Tenure */}
              {originalResult && (
                <g transform={`translate(${xScale(originalResult.baseTenureMonths * 0.42)}, ${yScale(originalResult.totalLoanRepaidINR * 0.58)})`}>
                  <rect
                    x="-75"
                    y="-11"
                    width="150"
                    height="18"
                    fill="rgba(2, 6, 23, 0.9)"
                    stroke="rgba(255, 179, 71, 0.45)"
                    strokeWidth="1"
                    strokeDasharray="2 2"
                  />
                  <text
                    x="0"
                    y="2"
                    textAnchor="middle"
                    fill="rgba(255, 179, 71, 0.85)"
                    fontSize="9"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    ORIGINAL TENURE — {defaultTenureYears} YRS
                  </text>
                </g>
              )}
            </motion.g>
          )}

          {/* 2. CURRENT OUTSTANDING FINANCING LINE (Solid Amber) */}
          <motion.path
            d={debtPath}
            fill="none"
            stroke="#FFB347"
            strokeWidth="3.5"
            filter="url(#amberGlow)"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: prefersReducedMotion ? 1 : 0 }}
            animate={{ pathLength: 1, d: debtPath }}
            transition={{ 
              pathLength: { duration: prefersReducedMotion ? 0 : 1.2, delay: prefersReducedMotion ? 0 : 0.6, ease: 'easeInOut' },
              d: { duration: prefersReducedMotion ? 0 : 0.9, ease: 'easeInOut' }
            }}
          />

          {/* Label on Current Solid Trajectory when tenure is increased */}
          {isTenureIncreased && (
            <motion.g 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              transform={`translate(${xScale(currentBaseTenureMonths * 0.58)}, ${yScale(result.totalLoanRepaidINR * 0.4)})`}
            >
              <rect
                x="-75"
                y="-11"
                width="150"
                height="18"
                fill="rgba(2, 6, 23, 0.95)"
                stroke="#FFB347"
                strokeWidth="1.2"
                className="shadow-[0_0_12px_rgba(255,179,71,0.3)]"
              />
              <text
                x="0"
                y="2"
                textAnchor="middle"
                fill="#FFB347"
                fontSize="9"
                fontFamily="monospace"
                fontWeight="900"
              >
                CURRENT TENURE — {currentTenureYears} YRS
              </text>
            </motion.g>
          )}

          {/* 3. SHIPOWNER VALUE LINE (Emerald Green) */}
          <motion.path
            d={ownerPath}
            fill="none"
            stroke="#34D399"
            strokeWidth="3.5"
            filter="url(#emeraldGlow)"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: prefersReducedMotion ? 1 : 0 }}
            animate={{ pathLength: 1, d: ownerPath }}
            transition={{ 
              pathLength: { duration: prefersReducedMotion ? 0 : 1.2, delay: prefersReducedMotion ? 0 : 0.9, ease: 'easeInOut' },
              d: { duration: prefersReducedMotion ? 0 : 0.9, ease: 'easeInOut' }
            }}
          />

          {/* SECTION 6: LOAN TERM END VERTICAL MARKER (Shown when tenure is increased) */}
          {isTenureIncreased && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Vertical Dashed Marker Line */}
              <line
                x1={tenureEndX}
                y1={margin.top - 8}
                x2={tenureEndX}
                y2={margin.top + plotHeight}
                stroke="#FFB347"
                strokeWidth="2"
                strokeDasharray="3 3"
              />

              {/* Intersection dot at axis */}
              <circle
                cx={tenureEndX}
                cy={yScale(0)}
                r="5"
                fill="#FFB347"
                stroke="#020617"
                strokeWidth="2"
                className="shadow-[0_0_12px_#FFB347]"
              />

              {/* Prominent Badge for LOAN TERM END */}
              <g transform={`translate(${Math.min(width - margin.right - 130, Math.max(margin.left + 5, tenureEndX - 65))}, ${margin.top + plotHeight - 75})`}>
                <rect
                  x="0"
                  y="0"
                  width="130"
                  height="34"
                  fill="#020617"
                  stroke="#FFB347"
                  strokeWidth="1.2"
                  className="shadow-[0_0_15px_rgba(255,179,71,0.35)]"
                />
                <text
                  x="65"
                  y="14"
                  textAnchor="middle"
                  fill="#FFB347"
                  fontSize="10"
                  fontFamily="monospace"
                  fontWeight="bold"
                  letterSpacing="0.05em"
                >
                  LOAN TERM END
                </text>
                <text
                  x="65"
                  y="26"
                  textAnchor="middle"
                  fill="rgba(255, 255, 255, 0.9)"
                  fontSize="9"
                  fontFamily="monospace"
                >
                  {currentTenureYears} Years ({currentBaseTenureMonths}m)
                </text>
              </g>
            </motion.g>
          )}

          {/* SECTION 9 & 12: LOAN FULLY REPAID VERTICAL MARKER */}
          <motion.g
            initial={{ opacity: prefersReducedMotion ? 1 : 0, scaleY: prefersReducedMotion ? 1 : 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: prefersReducedMotion ? 0 : 1.5 }}
            style={{ transformOrigin: `${repayX}px ${margin.top + plotHeight}px` }}
          >
            <line
              x1={repayX}
              y1={margin.top - 16}
              x2={repayX}
              y2={margin.top + plotHeight}
              stroke="#00F2FF"
              strokeWidth="2.5"
              strokeDasharray="4 3"
              className="animate-pulse"
            />

            {/* Repayment intersection dot */}
            <circle
              cx={repayX}
              cy={yScale(0)}
              r="7"
              fill="#00F2FF"
              stroke="#020617"
              strokeWidth="2.5"
              className="shadow-[0_0_18px_#00F2FF]"
            />
            <circle
              cx={repayX}
              cy={yScale(totalFinanced)}
              r="6"
              fill="#FFB347"
              stroke="#020617"
              strokeWidth="2"
            />

            {/* LOAN FULLY REPAID BADGE */}
            <g transform={`translate(${Math.min(width - margin.right - 180, Math.max(margin.left + 10, repayX - 90))}, ${margin.top - 48})`}>
              <rect
                x="0"
                y="0"
                width="180"
                height="44"
                fill="#020617"
                stroke="#00F2FF"
                strokeWidth="1.8"
                className="shadow-[0_0_24px_rgba(0,242,255,0.45)]"
              />
              <rect
                x="2"
                y="2"
                width="176"
                height="3.5"
                fill="#00F2FF"
              />
              <text
                x="90"
                y="18"
                textAnchor="middle"
                fill="#00F2FF"
                fontSize="11"
                fontFamily="monospace"
                fontWeight="900"
                letterSpacing="0.06em"
              >
                ✦ LOAN FULLY REPAID
              </text>
              <text
                x="90"
                y="29"
                textAnchor="middle"
                fill="rgba(255, 255, 255, 0.9)"
                fontSize="9"
                fontFamily="monospace"
              >
                Financing recovered through
              </text>
              <text
                x="90"
                y="39"
                textAnchor="middle"
                fill="#34D399"
                fontSize="9"
                fontFamily="monospace"
                fontWeight="bold"
              >
                verified savings ({repaymentMonths.toFixed(1)} mo)
              </text>
            </g>
          </motion.g>

          {/* INTERACTIVE HOVER SCRUBBER */}
          {hoveredPoint && (
            <g>
              <line
                x1={hoveredPoint.x}
                y1={margin.top}
                x2={hoveredPoint.x}
                y2={margin.top + plotHeight}
                stroke="rgba(255, 255, 255, 0.85)"
                strokeDasharray="2 2"
                strokeWidth="1.5"
              />

              {/* Intersecting Dots */}
              <circle
                cx={hoveredPoint.x}
                cy={yScale(hoveredPoint.cumSavings)}
                r="5"
                fill="#00F2FF"
                stroke="#ffffff"
                strokeWidth="2"
              />
              <circle
                cx={hoveredPoint.x}
                cy={yScale(hoveredPoint.outstanding)}
                r="5"
                fill="#FFB347"
                stroke="#ffffff"
                strokeWidth="2"
              />
              {isTenureIncreased && hoveredPoint.origOutstanding !== undefined && (
                <circle
                  cx={hoveredPoint.x}
                  cy={yScale(hoveredPoint.origOutstanding)}
                  r="4"
                  fill="none"
                  stroke="#FFB347"
                  strokeWidth="2"
                  strokeDasharray="2 2"
                />
              )}
              <circle
                cx={hoveredPoint.x}
                cy={yScale(hoveredPoint.ownerValue)}
                r="5"
                fill="#34D399"
                stroke="#ffffff"
                strokeWidth="2"
              />
            </g>
          )}
        </svg>

        {/* RICH TOOLTIP CARD */}
        {hoveredPoint && (
          <div
            className="absolute pointer-events-none z-30 transition-transform duration-75"
            style={{
              left: `${Math.min(70, Math.max(18, (hoveredPoint.x / width) * 100))}%`,
              top: `${Math.max(12, Math.min(50, (hoveredPoint.y / height) * 100))}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className="p-3.5 bg-[#020617]/95 border-2 border-[#00F2FF] shadow-[0_0_30px_rgba(0,242,255,0.45)] backdrop-blur-md rounded-none text-left min-w-[245px] space-y-2 font-mono">
              <div className="flex items-center justify-between border-b border-white/15 pb-1.5 text-xs">
                <span className="text-white font-bold">
                  Month {hoveredPoint.month}
                </span>
                <span className="text-[#00F2FF] font-bold">
                  (Year {hoveredPoint.year})
                </span>
              </div>

              <div className="space-y-1.5 text-[11px]">
                <div className="flex justify-between items-center text-white/80">
                  <span className="flex items-center gap-1.5 text-[#00F2FF]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00F2FF]" />
                    Cum. Verified Savings:
                  </span>
                  <span className="text-[#00F2FF] font-black">
                    ₹{hoveredPoint.cumSavings.toFixed(2)} Cr
                  </span>
                </div>

                <div className="flex justify-between items-center text-white/80">
                  <span className="flex items-center gap-1.5 text-[#FFB347]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FFB347]" />
                    {isTenureIncreased ? `Outstanding (${currentTenureYears}Y):` : 'Outstanding Financing:'}
                  </span>
                  <span className="text-[#FFB347] font-black">
                    ₹{hoveredPoint.outstanding.toFixed(2)} Cr
                  </span>
                </div>

                {isTenureIncreased && hoveredPoint.origOutstanding !== undefined && (
                  <div className="flex justify-between items-center text-white/60">
                    <span className="flex items-center gap-1.5 text-[#FFB347]/70">
                      <span className="w-2.5 h-0.5 border-t border-dashed border-[#FFB347]" />
                      Original ({defaultTenureYears}Y):
                    </span>
                    <span className="text-[#FFB347]/80 font-bold">
                      ₹{hoveredPoint.origOutstanding.toFixed(2)} Cr
                    </span>
                  </div>
                )}

                <div className="flex justify-between items-center text-white/80">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    Shipowner Value:
                  </span>
                  <span className="text-emerald-400 font-black">
                    ₹{hoveredPoint.ownerValue.toFixed(2)} Cr
                  </span>
                </div>
              </div>

              {/* Status Badge */}
              <div className="pt-1.5 border-t border-white/10 text-[10px] font-bold">
                {hoveredPoint.month < repaymentMonths ? (
                  <span className="text-[#FFB347]">
                    ⏳ REPAYMENT PHASE (Amortizing)
                  </span>
                ) : profitPeriodMonths > 0 && hoveredPoint.month <= profitPeriodEndMonth ? (
                  <span className="text-[#00F2FF]">
                    ✦ PROFIT PERIOD (Bank {result.bankSharePercent}% / Owner {result.ownerSharePercent}%)
                  </span>
                ) : (
                  <span className="text-emerald-400">
                    ✓ 100% OWNER RETENTION PHASE
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SECTION 15: COMPACT EXPLANATION & VISUAL FLOW */}
      <motion.div
        initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: prefersReducedMotion ? 0 : 2.1 }}
        className="mt-5 pt-4 border-t border-white/10 relative z-10 space-y-3"
      >
        <div className="text-center sm:text-left text-xs text-white/75 font-sans italic">
          “Your selected assumptions determine the savings rate, repayment speed, and eventual owner benefit.”
        </div>

        {/* Visual Flow: CAPEX TODAY → VERIFIED SAVINGS → LOAN FULLY REPAID → OWNER BENEFIT */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-center text-xs font-mono">
          <div className="p-3 bg-black/50 border border-white/15 space-y-1">
            <div className="text-[9px] text-white/40 font-bold uppercase tracking-wider">STAGE 01</div>
            <div className="text-white font-black text-xs">CAPEX TODAY</div>
            <div className="text-[#FFB347] font-bold text-sm">₹{result.financedAmountINR.toFixed(2)} Cr</div>
            <div className="text-[10px] text-white/50">100% Funded by Bank</div>
          </div>

          <div className="p-3 bg-[#020617] border border-[#00F2FF]/40 space-y-1">
            <div className="text-[9px] text-[#00F2FF] font-bold uppercase tracking-wider">STAGE 02</div>
            <div className="text-white font-black text-xs">VERIFIED SAVINGS</div>
            <div className="text-[#00F2FF] font-bold text-sm">₹{result.availableVerifiedSavingsINR.toFixed(2)} Cr/yr</div>
            <div className="text-[10px] text-white/50">Automated Escrow Flow</div>
          </div>

          <div className="p-3 bg-cyan-950/30 border border-[#00F2FF] space-y-1 shadow-[0_0_15px_rgba(0,242,255,0.18)]">
            <div className="text-[9px] text-cyan-300 font-bold uppercase tracking-wider">STAGE 03</div>
            <div className="text-[#00F2FF] font-black text-xs">LOAN FULLY REPAID</div>
            <div className="text-white font-bold text-sm">{repaymentMonths.toFixed(1)} Months</div>
            <div className="text-[10px] text-cyan-300 font-bold">({repaymentYears.toFixed(1)} Years)</div>
          </div>

          <div className="p-3 bg-emerald-950/25 border border-emerald-500/50 space-y-1 shadow-[0_0_15px_rgba(52,211,153,0.15)]">
            <div className="text-[9px] text-emerald-400 font-bold uppercase tracking-wider">STAGE 04</div>
            <div className="text-emerald-300 font-black text-xs">OWNER BENEFIT</div>
            <div className="text-emerald-400 font-bold text-sm">₹{result.tenYearCumulativeNetOwnerBenefitINR.toFixed(2)} Cr</div>
            <div className="text-[10px] text-emerald-400/80">10-Yr Cumulative Net Profit</div>
          </div>
        </div>

        {/* Live calibration guidance note */}
        <div className="p-2.5 bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/60 gap-2">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#00F2FF]" />
            <span>
              {isTenureIncreased
                ? `Tenure Effect active: Comparing ${currentTenureYears}-year schedule against baseline ${defaultTenureYears}-year term.`
                : 'Move the Base Term slider above 6 years to see the Tenure Effect comparison activate.'}
            </span>
          </div>
          <div className="text-white/40 text-[10px]">
            HOVER/TAP ANYWHERE TO INSPECT MONTHLY VALUES
          </div>
        </div>
      </motion.div>
    </div>
  );
};
