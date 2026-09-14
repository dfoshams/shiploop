import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  ArrowLeft, 
  X, 
  Info, 
  CheckCircle2, 
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { CarbonComplianceResult, CarbonComplianceParams } from '../logic/carbonComplianceModel';

interface CarbonComplianceGraphProps {
  calcResult: CarbonComplianceResult;
  carbonParams: CarbonComplianceParams;
  onBackToCalculator: () => void;
  onClose: () => void;
}

export const CarbonComplianceGraph: React.FC<CarbonComplianceGraphProps> = ({
  calcResult,
  carbonParams,
  onBackToCalculator,
  onClose,
}) => {
  const [tenureYears, setTenureYears] = useState<number>(6); // 6 Years (Loan tenure) vs 10 Years (Commercial life)
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(null);

  const totalMonths = tenureYears * 12;

  // Generate monthly trajectory data using the exact single source of truth
  const trajectoryData = useMemo(() => {
    const points = [];
    const monthlyFuelSavings = calcResult.grossAnnualFuelSavingsINR / 12;
    const monthlyEuEts = calcResult.isEuEtsApplicable ? calcResult.euEtsAvoidedCostINRCrore / 12 : 0;
    const monthlyUkEts = calcResult.isUkEtsApplicable ? calcResult.ukEtsAvoidedCostINRCrore / 12 : 0;
    const monthlyCompliance = calcResult.isFuelEuDefensible ? calcResult.fuelEuAvoidedCostINRCrore / 12 : 0;
    const monthlyTotalBenefit = calcResult.totalEconomicBenefitINRCrore / 12;
    const monthlyImoFuture = calcResult.isImoSimulated ? calcResult.imoFutureAvoidedINRCrore / 12 : 0;

    for (let m = 0; m <= totalMonths; m += 3) {
      points.push({
        month: m,
        year: (m / 12).toFixed(1),
        fuelSavings: m * monthlyFuelSavings,
        euEtsSavings: m * monthlyEuEts,
        ukEtsSavings: m * monthlyUkEts,
        complianceSavings: m * monthlyCompliance,
        totalBenefit: m * monthlyTotalBenefit,
        imoFuture: m * monthlyImoFuture,
      });
    }
    return points;
  }, [calcResult, totalMonths]);

  // Max value calculation for chart scaling
  const maxCumulativeValue = useMemo(() => {
    const lastPoint = trajectoryData[trajectoryData.length - 1];
    if (!lastPoint) return 10;
    const candidates = [lastPoint.totalBenefit, lastPoint.fuelSavings];
    if (calcResult.isImoSimulated) {
      candidates.push(lastPoint.totalBenefit + lastPoint.imoFuture);
    }
    const peak = Math.max(...candidates, 1);
    return Math.ceil(peak * 1.15 * 2) / 2; // Nice round ceiling
  }, [trajectoryData, calcResult.isImoSimulated]);

  // SVG Chart Layout Geometry
  const width = 860;
  const height = 400;
  const padding = { top: 40, right: 40, bottom: 60, left: 75 };
  const graphWidth = width - padding.left - padding.right;
  const graphHeight = height - padding.top - padding.bottom;

  const getX = (m: number) => padding.left + (m / totalMonths) * graphWidth;
  const getY = (val: number) => padding.top + graphHeight - (val / maxCumulativeValue) * graphHeight;

  // Build SVG Path strings
  const buildPath = (key: 'fuelSavings' | 'euEtsSavings' | 'ukEtsSavings' | 'complianceSavings' | 'totalBenefit' | 'imoFuture') => {
    return trajectoryData.reduce((acc, pt, i) => {
      const x = getX(pt.month);
      const y = getY(pt[key]);
      return `${acc} ${i === 0 ? 'M' : 'L'} ${x.toFixed(1)},${y.toFixed(1)}`;
    }, '');
  };

  const fuelPath = buildPath('fuelSavings');
  const euEtsPath = buildPath('euEtsSavings');
  const ukEtsPath = buildPath('ukEtsSavings');
  const compliancePath = buildPath('complianceSavings');
  const totalPath = buildPath('totalBenefit');
  const imoPath = buildPath('imoFuture');

  // Currently active inspection point
  const activePoint = useMemo(() => {
    const targetMonth = hoveredMonth !== null ? hoveredMonth : totalMonths;
    // Find closest data point
    let closest = trajectoryData[0];
    let minDiff = 999;
    for (const pt of trajectoryData) {
      const diff = Math.abs(pt.month - targetMonth);
      if (diff < minDiff) {
        minDiff = diff;
        closest = pt;
      }
    }
    return closest;
  }, [hoveredMonth, totalMonths, trajectoryData]);

  // SVG Mouse tracking
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const clampedX = Math.max(padding.left, Math.min(width - padding.right, (mouseX / rect.width) * width));
    const monthFraction = (clampedX - padding.left) / graphWidth;
    const calculatedMonth = Math.round(monthFraction * totalMonths);
    setHoveredMonth(calculatedMonth);
  };

  const handleMouseLeave = () => {
    setHoveredMonth(null);
  };

  return (
    <div className="w-full bg-[#030914] border border-[#00F2FF]/30 rounded-none p-5 sm:p-7 relative font-mono select-none overflow-hidden shadow-[0_0_30px_rgba(0,242,255,0.08)] animate-in fade-in zoom-in-95 duration-200">
      {/* Corner Technical Accents */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#00F2FF]" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#00F2FF]" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#00F2FF]" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#00F2FF]" />

      {/* Top Header & View Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 mb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#00F2FF] animate-pulse" />
            <span className="text-xs font-bold text-[#00F2FF] tracking-wider uppercase">
              CARBON + FUEL CUMULATIVE IMPACT
            </span>
            <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold uppercase">
              LIVE INTEGRATED MODEL
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase">
            CARBON + FUEL SAVINGS
          </h3>
          <p className="text-white/60 text-xs sm:text-sm tracking-wide mt-0.5">
            See how lower fuel use and emissions reduce total operating-cost exposure.
          </p>
        </div>

        {/* Buttons: Horizon toggle, Return to Calc, Minimize */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Horizon Toggle */}
          <div className="flex items-center bg-white/5 border border-white/15 p-0.5 text-xs">
            <button
              onClick={() => setTenureYears(6)}
              className={`px-3 py-1 uppercase font-bold transition-all cursor-pointer ${
                tenureYears === 6
                  ? 'bg-[#00F2FF] text-[#020617]'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              6 YEARS (LOAN TERM)
            </button>
            <button
              onClick={() => setTenureYears(10)}
              className={`px-3 py-1 uppercase font-bold transition-all cursor-pointer ${
                tenureYears === 10
                  ? 'bg-[#00F2FF] text-[#020617]'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              10 YEARS
            </button>
          </div>

          <button
            onClick={onBackToCalculator}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white/5 hover:bg-white/10 border border-white/20 text-[#00F2FF] hover:text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>RETURN TO CALCULATOR</span>
          </button>

          <button
            onClick={onClose}
            className="p-1.5 bg-white/5 hover:bg-red-500/20 text-white/60 hover:text-red-400 border border-white/15 hover:border-red-500/40 transition-all cursor-pointer"
            title="Minimize Calculator"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Dynamic Summary Metric Badges (Top of Graph) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2.5 mb-4 text-xs">
        <div className="p-2.5 bg-white/[0.03] border border-cyan-500/30">
          <div className="text-[10px] text-cyan-400 uppercase tracking-widest font-semibold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#00F2FF]" />
            Fuel Saved
          </div>
          <div className="text-base sm:text-lg font-black text-white mt-0.5">
            ₹{activePoint.fuelSavings.toFixed(2)} Cr
          </div>
          <div className="text-[10px] text-white/50">Cumulative to M{activePoint.month}</div>
        </div>

        {calcResult.isEuEtsApplicable && (
          <div className="p-2.5 bg-white/[0.03] border border-emerald-500/30">
            <div className="text-[10px] text-emerald-400 uppercase tracking-widest font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              EU ETS Avoided
            </div>
            <div className="text-base sm:text-lg font-black text-emerald-300 mt-0.5">
              ₹{activePoint.euEtsSavings.toFixed(2)} Cr
            </div>
            <div className="text-[10px] text-emerald-400/60">
              €{((activePoint.euEtsSavings * 10000000) / carbonParams.exchangeRates.eurToInr).toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </div>
          </div>
        )}

        {calcResult.isUkEtsApplicable && (
          <div className="p-2.5 bg-white/[0.03] border border-sky-500/30">
            <div className="text-[10px] text-sky-400 uppercase tracking-widest font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-sky-400" />
              UK ETS Avoided
            </div>
            <div className="text-base sm:text-lg font-black text-sky-300 mt-0.5">
              ₹{activePoint.ukEtsSavings.toFixed(2)} Cr
            </div>
            <div className="text-[10px] text-sky-400/60">
              £{((activePoint.ukEtsSavings * 10000000) / carbonParams.exchangeRates.gbpToInr).toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </div>
          </div>
        )}

        {calcResult.isFuelEuDefensible && calcResult.fuelEuAvoidedCostINRCrore > 0 && (
          <div className="p-2.5 bg-white/[0.03] border border-purple-500/30">
            <div className="text-[10px] text-purple-400 uppercase tracking-widest font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              FuelEU Compliance
            </div>
            <div className="text-base sm:text-lg font-black text-purple-300 mt-0.5">
              ₹{activePoint.complianceSavings.toFixed(2)} Cr
            </div>
            <div className="text-[10px] text-purple-400/60">Deficit avoided</div>
          </div>
        )}

        <div className="p-2.5 bg-[#00F2FF]/10 border border-[#00F2FF]/60 col-span-2 sm:col-span-1 shadow-[0_0_15px_rgba(0,242,255,0.15)]">
          <div className="text-[10px] text-[#00F2FF] uppercase tracking-widest font-bold flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#00F2FF]" />
            Total Benefit
          </div>
          <div className="text-base sm:text-xl font-black text-[#00F2FF] mt-0.5">
            ₹{activePoint.totalBenefit.toFixed(2)} Cr
          </div>
          <div className="text-[10px] text-cyan-200/80">
            +{calcResult.economicBoostPercentage.toFixed(1)}% vs fuel alone
          </div>
        </div>
      </div>

      {/* Interactive Animated SVG Graph */}
      <div className="relative w-full bg-[#020617] border border-white/10 p-2 overflow-x-auto">
        <style>{`
          @keyframes drawLine {
            from { stroke-dashoffset: 2000; }
            to { stroke-dashoffset: 0; }
          }
          .animate-axes {
            animation: fadeIn 0.4s ease-out forwards;
          }
          .animate-fuel-line {
            stroke-dasharray: 2000;
            stroke-dashoffset: 2000;
            animation: drawLine 1.0s cubic-bezier(0.2, 0.8, 0.2, 1) 0.3s forwards;
          }
          .animate-eu-line {
            stroke-dasharray: 2000;
            stroke-dashoffset: 2000;
            animation: drawLine 1.0s cubic-bezier(0.2, 0.8, 0.2, 1) 0.8s forwards;
          }
          .animate-uk-line {
            stroke-dasharray: 2000;
            stroke-dashoffset: 2000;
            animation: drawLine 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) 1.2s forwards;
          }
          .animate-compliance-line {
            stroke-dasharray: 2000;
            stroke-dashoffset: 2000;
            animation: drawLine 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) 1.5s forwards;
          }
          .animate-total-line {
            stroke-dasharray: 2000;
            stroke-dashoffset: 2000;
            animation: drawLine 1.1s cubic-bezier(0.2, 0.8, 0.2, 1) 1.8s forwards;
          }
          .animate-imo-line {
            stroke-dasharray: 2000;
            stroke-dashoffset: 2000;
            animation: drawLine 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 2.1s forwards;
          }
        `}</style>

        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto max-h-[460px] cursor-crosshair"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Subtle Grid Lines & Y-Axis Labels */}
          <g className="animate-axes">
            {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
              const val = ratio * maxCumulativeValue;
              const y = getY(val);
              return (
                <g key={ratio}>
                  <line
                    x1={padding.left}
                    y1={y}
                    x2={width - padding.right}
                    y2={y}
                    stroke="rgba(255, 255, 255, 0.08)"
                    strokeDasharray="4,4"
                  />
                  <text
                    x={padding.left - 10}
                    y={y + 4}
                    fill="rgba(255, 255, 255, 0.45)"
                    fontSize="10"
                    fontFamily="monospace"
                    textAnchor="end"
                  >
                    ₹{val.toFixed(1)} Cr
                  </text>
                </g>
              );
            })}

            {/* X-Axis Horizontal Baseline */}
            <line
              x1={padding.left}
              y1={padding.top + graphHeight}
              x2={width - padding.right}
              y2={padding.top + graphHeight}
              stroke="rgba(255, 255, 255, 0.2)"
            />

            {/* X-Axis Ticks & Labels */}
            {Array.from({ length: tenureYears + 1 }, (_, yr) => {
              const m = yr * 12;
              const x = getX(m);
              return (
                <g key={yr}>
                  <line
                    x1={x}
                    y1={padding.top + graphHeight}
                    x2={x}
                    y2={padding.top + graphHeight + 6}
                    stroke="rgba(0, 242, 255, 0.4)"
                  />
                  <text
                    x={x}
                    y={padding.top + graphHeight + 20}
                    fill="rgba(255, 255, 255, 0.6)"
                    fontSize="10"
                    fontFamily="monospace"
                    textAnchor="middle"
                  >
                    {yr === 0 ? 'START' : `YR ${yr} (M${m})`}
                  </text>
                </g>
              );
            })}
          </g>

          {/* SVG Glow Filter Definition */}
          <defs>
            <filter id="glow-total" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="glow-fuel" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* 1. Fuel Savings Curve (Cyan) */}
          <path
            d={fuelPath}
            fill="none"
            stroke="#00F2FF"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="animate-fuel-line"
            filter="url(#glow-fuel)"
          />

          {/* 2. EU ETS Savings Curve (Emerald) - ONLY IF ACTIVE / APPLICABLE */}
          {calcResult.isEuEtsApplicable && (
            <path
              d={euEtsPath}
              fill="none"
              stroke="#10B981"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="animate-eu-line"
            />
          )}

          {/* 3. UK ETS Savings Curve (Sky Blue) - ONLY IF IN SCOPE */}
          {calcResult.isUkEtsApplicable && (
            <path
              d={ukEtsPath}
              fill="none"
              stroke="#38BDF8"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="animate-uk-line"
            />
          )}

          {/* 4. FuelEU Compliance Savings (Purple) - ONLY IF ACTIVE */}
          {calcResult.isFuelEuDefensible && calcResult.fuelEuAvoidedCostINRCrore > 0 && (
            <path
              d={compliancePath}
              fill="none"
              stroke="#A855F7"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="animate-compliance-line"
            />
          )}

          {/* 5. FUTURE IMO Scenario (Dashed Amber) - Clearly Marked NOT INCLUDED IN CURRENT TOTAL */}
          {calcResult.isImoSimulated && (
            <path
              d={imoPath}
              fill="none"
              stroke="#F59E0B"
              strokeWidth="2"
              strokeDasharray="6,5"
              strokeLinecap="round"
              opacity="0.8"
              className="animate-imo-line"
            />
          )}

          {/* 6. Total Cumulative Economic Benefit (White / Cyan Bold Glowing Line) - DRAWS LAST */}
          <path
            d={totalPath}
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="3.5"
            strokeLinecap="round"
            className="animate-total-line"
            filter="url(#glow-total)"
          />

          {/* Active Hover Cursor / Crosshair */}
          {activePoint && (
            <g>
              <line
                x1={getX(activePoint.month)}
                y1={padding.top}
                x2={getX(activePoint.month)}
                y2={padding.top + graphHeight}
                stroke="#00F2FF"
                strokeWidth="1.5"
                strokeDasharray="3,3"
                opacity="0.8"
              />

              {/* Total Benefit Dot */}
              <circle
                cx={getX(activePoint.month)}
                cy={getY(activePoint.totalBenefit)}
                r="5"
                fill="#00F2FF"
                stroke="#FFFFFF"
                strokeWidth="2"
              />

              {/* Fuel Savings Dot */}
              <circle
                cx={getX(activePoint.month)}
                cy={getY(activePoint.fuelSavings)}
                r="4"
                fill="#00F2FF"
              />

              {/* EU ETS Dot */}
              {calcResult.isEuEtsApplicable && (
                <circle
                  cx={getX(activePoint.month)}
                  cy={getY(activePoint.euEtsSavings)}
                  r="3.5"
                  fill="#10B981"
                />
              )}

              {/* UK ETS Dot */}
              {calcResult.isUkEtsApplicable && (
                <circle
                  cx={getX(activePoint.month)}
                  cy={getY(activePoint.ukEtsSavings)}
                  r="3.5"
                  fill="#38BDF8"
                />
              )}
            </g>
          )}
        </svg>

        {/* Hover Tooltip Overlay (Float in graph corner or above pointer) */}
        {activePoint && (
          <div className="absolute top-4 right-4 bg-[#020b14]/95 border border-[#00F2FF]/40 p-3 text-[11px] font-mono shadow-2xl backdrop-blur-md max-w-xs pointer-events-none">
            <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-white/10">
              <span className="font-bold text-white uppercase">
                MONTH {activePoint.month} (YEAR {activePoint.year})
              </span>
              <span className="text-[10px] text-[#00F2FF]">INSPECTION</span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between gap-4">
                <span className="text-cyan-300 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00F2FF]" />
                  Fuel Savings:
                </span>
                <span className="font-bold text-white">₹{activePoint.fuelSavings.toFixed(2)} Cr</span>
              </div>

              {calcResult.isEuEtsApplicable && (
                <div className="flex items-center justify-between gap-4">
                  <span className="text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    EU ETS Avoided:
                  </span>
                  <span className="font-bold text-emerald-300">₹{activePoint.euEtsSavings.toFixed(2)} Cr</span>
                </div>
              )}

              {calcResult.isUkEtsApplicable && (
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sky-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                    UK ETS Avoided:
                  </span>
                  <span className="font-bold text-sky-300">₹{activePoint.ukEtsSavings.toFixed(2)} Cr</span>
                </div>
              )}

              {calcResult.isFuelEuDefensible && calcResult.fuelEuAvoidedCostINRCrore > 0 && (
                <div className="flex items-center justify-between gap-4">
                  <span className="text-purple-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                    Compliance Savings:
                  </span>
                  <span className="font-bold text-purple-300">₹{activePoint.complianceSavings.toFixed(2)} Cr</span>
                </div>
              )}

              <div className="pt-1.5 mt-1 border-t border-white/10 flex items-center justify-between gap-4 font-bold">
                <span className="text-white flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#00F2FF]" />
                  Total Economic Benefit:
                </span>
                <span className="text-[#00F2FF] text-xs">₹{activePoint.totalBenefit.toFixed(2)} Cr</span>
              </div>

              {calcResult.isImoSimulated && (
                <div className="pt-1.5 mt-1 border-t border-amber-500/20 text-[10px] text-amber-300/80">
                  <div className="flex items-center justify-between">
                    <span>Future IMO Exposure (Proposed):</span>
                    <span className="font-bold">₹{activePoint.imoFuture.toFixed(2)} Cr</span>
                  </div>
                  <span className="text-[9px] text-amber-400/60 block mt-0.5">
                    * NOT INCLUDED IN CURRENT TOTAL
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Dynamic Graph Legend (Only Active Curves Displayed) */}
      <div className="flex flex-wrap items-center gap-4 mt-4 pt-3 border-t border-white/10 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-1 bg-[#00F2FF] inline-block" />
          <span className="text-white font-medium">1. Cumulative Fuel Savings</span>
        </div>

        {calcResult.isEuEtsApplicable ? (
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-1 bg-emerald-400 inline-block" />
            <span className="text-emerald-300 font-medium">2. Cumulative EU ETS Savings</span>
          </div>
        ) : (
          <span className="text-white/30 text-[11px] italic">
            [EU ETS: 0% Scope / Inactive]
          </span>
        )}

        {calcResult.isUkEtsApplicable ? (
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-1 bg-sky-400 inline-block" />
            <span className="text-sky-300 font-medium">3. Cumulative UK ETS Savings</span>
          </div>
        ) : (
          <span className="text-white/30 text-[11px] italic">
            [UK ETS: Not In Scope]
          </span>
        )}

        {calcResult.isFuelEuDefensible && calcResult.fuelEuAvoidedCostINRCrore > 0 ? (
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-1 bg-purple-400 inline-block" />
            <span className="text-purple-300 font-medium">4. Cumulative Compliance Savings</span>
          </div>
        ) : (
          <span className="text-white/30 text-[11px] italic">
            [FuelEU: Pathway Specific]
          </span>
        )}

        <div className="flex items-center gap-1.5">
          <span className="w-4 h-1.5 bg-white border border-[#00F2FF] inline-block shadow-[0_0_6px_#00F2FF]" />
          <span className="text-white font-bold">5. TOTAL CUMULATIVE ECONOMIC BENEFIT</span>
        </div>

        {calcResult.isImoSimulated && (
          <div className="flex items-center gap-1.5 bg-amber-500/10 px-2 py-0.5 border border-amber-500/30">
            <span className="w-3.5 h-0.5 border-b border-dashed border-amber-400 inline-block" />
            <span className="text-amber-400 text-[11px] font-bold">
              FUTURE IMO EXPOSURE (PROPOSED 2027+) — NOT INCLUDED IN CURRENT TOTAL
            </span>
          </div>
        )}
      </div>

      {/* Strategic Footer Narrative */}
      <div className="mt-4 p-3 bg-white/[0.02] border border-white/10 text-[11px] text-white/70 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-[#00F2FF] shrink-0" />
          <span>
            <strong className="text-white">RETROFIT</strong> → LOWER FUEL USE → LOWER GHG EMISSIONS → LOWER CARBON & COMPLIANCE EXPOSURE → <strong className="text-[#00F2FF]">STRONGER REPAYMENT CAPACITY</strong>
          </span>
        </div>
        <div className="text-[10px] text-white/40">
          Conversion Baseline: €1 = ₹{carbonParams.exchangeRates.eurToInr.toFixed(0)} | £1 = ₹{carbonParams.exchangeRates.gbpToInr.toFixed(0)} | $1 = ₹{carbonParams.exchangeRates.usdToInr.toFixed(0)}
        </div>
      </div>
    </div>
  );
};
