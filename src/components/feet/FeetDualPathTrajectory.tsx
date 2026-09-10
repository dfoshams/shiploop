import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GitBranch, 
  Sparkles, 
  ShieldCheck, 
  Globe2, 
  Layers, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  Info, 
  Play, 
  Pause, 
  RotateCcw, 
  ArrowRight,
  TrendingUp,
  Anchor,
  Sliders,
  Award
} from 'lucide-react';
import { COMPARISON_DIMENSIONS, ComparisonDimension, FeetDataStatus } from '../../data/feetData';

interface FeetDualPathTrajectoryProps {
  isPresentationMode?: boolean;
  replayTrigger?: number;
  isPaused?: boolean;
}

// Stages along the shared deployment journey
interface JourneyStage {
  id: string;
  name: string;
  stepNumber: string;
  feetText: string;
  feetStatus: FeetDataStatus;
  shiploopText: string;
  shiploopStatus: FeetDataStatus;
  xPos: number; // percentage along X axis (0 to 100)
}

const JOURNEY_STAGES: JourneyStage[] = [
  {
    id: 'capital',
    name: 'CAPITAL',
    stepNumber: '01',
    feetText: 'Initial commercial closing up to $35M, offering up to 100% upfront capex coverage via global fund partners.',
    feetStatus: 'VERIFIED',
    shiploopText: 'Proposed Indian green-finance windows (SBI, IREDA, EXIM) structuring 70%–100% senior debt tranches.',
    shiploopStatus: 'PROPOSED',
    xPos: 12
  },
  {
    id: 'retrofit',
    name: 'RETROFIT',
    stepNumber: '02',
    feetText: 'Energy Efficiency Technologies (rotor sails, air lubrication, wake ducts) installed on qualified merchant hulls.',
    feetStatus: 'VERIFIED',
    shiploopText: 'Targeted installations at domestic shipyards (Cochin Shipyard, L&T, MDL) with standardized procurement templates.',
    shiploopStatus: 'PROPOSED',
    xPos: 28
  },
  {
    id: 'verification',
    name: 'VERIFICATION',
    stepNumber: '03',
    feetText: 'Empirical telemetry & baseline auditing validating real-world savings (e.g., 7.2% power drop in monitored tanker).',
    feetStatus: 'VERIFIED PILOT DATA',
    shiploopText: 'Proposed independent Class Oracle data layer (IRS / DNV) validating ISO 19030 continuous fuel deltas into smart escrows.',
    shiploopStatus: 'PROPOSED',
    xPos: 44
  },
  {
    id: 'savings',
    name: 'SAVINGS',
    stepNumber: '04',
    feetText: 'Pay-as-you-save deductions linked directly to measured bunker fuel reductions and operational carbon savings.',
    feetStatus: 'VERIFIED',
    shiploopText: 'Continuous INR operational savings stream calculated from noon reports & flow meters, mitigating cashflow volatility.',
    shiploopStatus: 'PROPOSED',
    xPos: 58
  },
  {
    id: 'repayment',
    name: 'REPAYMENT',
    stepNumber: '05',
    feetText: 'Unsecured lease structures amortized through realized operational savings, decoupled from senior vessel mortgages.',
    feetStatus: 'VERIFIED',
    shiploopText: 'Structured bankruptcy-remote SPV escrow waterfall with Debt Service Reserve Facility (DSRF) for Indian lenders.',
    shiploopStatus: 'PROPOSED',
    xPos: 76
  },
  {
    id: 'scale',
    name: 'SCALE',
    stepNumber: '06',
    feetText: 'Scaling toward $500M target across ~200 merchant ships by 2030 in global trade lanes.',
    feetStatus: 'TARGET',
    shiploopText: 'Scalable deployment across Indian coastal trade corridors (SagarMala), major port trusts, and coastal fleet electrification.',
    shiploopStatus: 'PROPOSED',
    xPos: 92
  }
];

export const FeetDualPathTrajectory: React.FC<FeetDualPathTrajectoryProps> = ({
  isPresentationMode = false,
  replayTrigger = 0,
  isPaused = false
}) => {
  // Animation progress in Presentation Mode (0 to 65 seconds)
  // Stage timeline:
  // 0-4s: Origin node
  // 4-10s: FEET path draws
  // 10-16s: FEET evidence nodes
  // 16-22s: SHIPLOOP path draws
  // 22-28s: Paths travel together
  // 28-35s: Divergence begins
  // 35-42s: Banking environments
  // 42-48s: Why trajectories differ
  // 48-55s: Same Engine / Different Rails
  // 55-62s: Final statement
  // 62s+: HOLD
  const [animTime, setAnimTime] = useState<number>(isPresentationMode ? 0 : 65);
  const [isLocalPaused, setIsLocalPaused] = useState<boolean>(false);
  
  // Interactive exploration state
  const [hoveredStage, setHoveredStage] = useState<JourneyStage | null>(null);
  const [selectedStage, setSelectedStage] = useState<JourneyStage>(JOURNEY_STAGES[2]); // Default verification
  const [showDivergenceDetail, setShowDivergenceDetail] = useState<boolean>(false);
  const [showFullSystemComparison, setShowFullSystemComparison] = useState<boolean>(false);
  const [activeDimensionIndex, setActiveDimensionIndex] = useState<number>(0);

  // Replay trigger resets presentation animation
  useEffect(() => {
    if (isPresentationMode) {
      setAnimTime(0);
    }
  }, [replayTrigger, isPresentationMode]);

  // Tick animation timer for Presentation Mode
  useEffect(() => {
    if (!isPresentationMode || isPaused || isLocalPaused) return;

    const interval = setInterval(() => {
      setAnimTime((prev) => {
        if (prev >= 65) return 65; // HOLD at final state
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPresentationMode, isPaused, isLocalPaused]);

  // Presenter scrubber helpers
  const handleScrub = (seconds: number) => {
    setAnimTime(seconds);
  };

  const isOriginRevealed = animTime >= 2;
  const isFeetDrawn = animTime >= 6;
  const isFeetNodesRevealed = animTime >= 11;
  const isShiploopDrawn = animTime >= 18;
  const isPathsTogetherRevealed = animTime >= 23;
  const isDivergenceRevealed = animTime >= 30;
  const isBankingEnvironmentsRevealed = animTime >= 37;
  const isWhyDifferRevealed = animTime >= 44;
  const isSameEngineRevealed = animTime >= 50;
  const isFinalStatementRevealed = animTime >= 56;
  const isHolding = animTime >= 62;

  return (
    <div className="w-full rounded-xl bg-[#020617] border border-white/10 p-5 sm:p-8 backdrop-blur-md relative overflow-hidden shadow-2xl">
      {/* Background Ambience & Grid */}
      <div className="absolute inset-0 tech-grid-dense opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* 1. Header: Graph Title, Subtitle, and Legend */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-mono font-bold text-cyan-400 tracking-wider">
              FEET × SHIPLOOP
            </span>
            <span className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-400/40 text-cyan-300 text-[10px] font-mono font-extrabold tracking-wider">
              [ ILLUSTRATIVE COMPARISON ]
            </span>
          </div>

          <h3 className="text-xl sm:text-3xl font-black font-mono tracking-tight text-white flex flex-wrap items-center gap-2">
            <span>SAME MECHANISM.</span>
            <span className="text-[#00F2FF]">DIFFERENT FINANCIAL RAILS.</span>
          </h3>

          <p className="text-xs font-mono text-white/50 mt-1">
            Conceptual deployment trajectory — not measured performance data.
          </p>
        </div>

        {/* Legend Badges */}
        <div className="flex flex-wrap items-center gap-2.5 text-[10px] font-mono bg-white/[0.03] p-2.5 rounded-lg border border-white/10">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.9)]" />
            <span className="text-emerald-300 font-semibold">[ VERIFIED ]</span>
            <span className="text-white/40 hidden sm:inline">Real-world evidence</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.9)]" />
            <span className="text-amber-300 font-semibold">[ TARGET ]</span>
            <span className="text-white/40 hidden sm:inline">2030 target</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,242,255,0.9)]" />
            <span className="text-cyan-300 font-semibold">[ PROPOSED ]</span>
            <span className="text-white/40 hidden sm:inline">India architecture</span>
          </div>
        </div>
      </div>

      {/* Presentation Controls Bar (when in presentation mode) */}
      {isPresentationMode && (
        <div className="relative z-10 flex items-center justify-between py-2 px-3 my-3 rounded-lg bg-slate-900/80 border border-white/10 text-[11px] font-mono">
          <div className="flex items-center gap-2">
            <span className="text-white/50 font-bold">ANIMATION SEQUENCE:</span>
            <span className="text-cyan-400 font-bold">
              {animTime < 10 ? '01 SHARED ORIGIN' :
               animTime < 22 ? '02 FEET BENCHMARK PATH' :
               animTime < 30 ? '03 SHIPLOOP ALIGNMENT' :
               animTime < 42 ? '04 DIVERGENCE OF FINANCIAL RAILS' :
               animTime < 55 ? '05 SAME ENGINE / DIFFERENT RAILS' :
               '06 STRATEGIC SYNTHESIS [HOLD]'}
            </span>
            <span className="text-white/30 font-mono">({animTime}s / 62s)</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleScrub(0)}
              className="p-1 rounded bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 text-[10px]"
              title="Replay (R)"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
            <button
              onClick={() => setIsLocalPaused(!isLocalPaused)}
              className="p-1 rounded bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 text-[10px]"
              title="Pause / Resume"
            >
              {isLocalPaused ? <Play className="w-3 h-3 text-emerald-400" /> : <Pause className="w-3 h-3" />}
            </button>
            <button
              onClick={() => handleScrub(65)}
              className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 text-[10px]"
            >
              Skip to Complete
            </button>
            {isHolding && (
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40 text-[10px] animate-pulse">
                [ HOLD ]
              </span>
            )}
          </div>
        </div>
      )}

      {/* 2. HERO VISUAL: DUAL-PATH TRAJECTORY CANVAS */}
      <div className="relative z-10 my-4 sm:my-6 rounded-xl bg-slate-950/90 border border-white/15 p-4 sm:p-6 overflow-hidden shadow-inner">
        
        {/* Qualitative Vertical Axis Label (DEPLOYMENT PROGRESSION / MATURITY) */}
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/5 text-[11px] font-mono text-white/50">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-bold text-white/70 uppercase tracking-wider">
              Y-AXIS: SYSTEM PROGRESSION &amp; DEPLOYMENT MATURITY
            </span>
            <span className="text-[10px] text-white/30 hidden sm:inline">
              (Qualitative deployment scale — no artificial performance numbers)
            </span>
          </div>
          <div className="text-[10px] font-mono text-cyan-400/80 uppercase">
            CLICK OR HOVER ANY STAGE TO INSPECT
          </div>
        </div>

        {/* The Graphic Canvas */}
        <div className="relative w-full h-[380px] sm:h-[440px] flex flex-col justify-between select-none">
          
          {/* Subtle Qualitative Gridlines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20 text-[9px] font-mono text-white/40">
            <div className="border-b border-white/10 pb-1 flex justify-between">
              <span>SYSTEM MATURITY: MULTI-VESSEL FLEET SCALE</span>
              <span>PHASE 04</span>
            </div>
            <div className="border-b border-white/10 pb-1 flex justify-between">
              <span>DEPLOYMENT: BANKING INTEGRATION &amp; FINANCIAL RAILS</span>
              <span>PHASE 03</span>
            </div>
            <div className="border-b border-white/10 pb-1 flex justify-between">
              <span>EXECUTION: VERIFIED SAVINGS &amp; REPAYMENT CLOSING</span>
              <span>PHASE 02</span>
            </div>
            <div className="border-b border-white/10 pb-1 flex justify-between">
              <span>FOUNDATION: SHARED PAY-AS-YOU-SAVE MECHANISM</span>
              <span>PHASE 01</span>
            </div>
          </div>

          {/* SVG Vector Curves for Both Paths */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 400" preserveAspectRatio="none">
            <defs>
              {/* FEET Path Gradient (Emerald) */}
              <linearGradient id="feetGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10B981" stopOpacity="0.8" />
                <stop offset="60%" stopColor="#059669" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#34D399" stopOpacity="1" />
              </linearGradient>

              {/* SHIPLOOP India Path Gradient (Cyan) */}
              <linearGradient id="shiploopGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10B981" stopOpacity="0.8" />
                <stop offset="45%" stopColor="#06B6D4" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#00F2FF" stopOpacity="1" />
              </linearGradient>

              {/* Shared Core Glow */}
              <filter id="glowGreen" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              
              <filter id="glowCyan" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* SHARED TRUNK PATH (Starts together from origin: 50, 340 to divergence: 480, 240) */}
            {isOriginRevealed && (
              <motion.path
                d="M 60 340 C 180 340, 280 290, 480 240"
                fill="none"
                stroke="rgba(16, 185, 129, 0.4)"
                strokeWidth="10"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: isPathsTogetherRevealed ? 1 : Math.min(1, animTime / 15) }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            )}

            {/* FEET CURVE: Global trajectory branching upward to global fund and fleet scale */}
            {isFeetDrawn && (
              <motion.path
                d="M 60 340 C 200 340, 320 280, 480 240 C 580 210, 680 150, 930 110"
                fill="none"
                stroke="url(#feetGrad)"
                strokeWidth="4"
                strokeDasharray={isDivergenceRevealed ? "none" : "8,4"}
                filter="url(#glowGreen)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: isDivergenceRevealed ? 1 : 0.7 }}
                transition={{ duration: 2, ease: "easeOut" }}
              />
            )}

            {/* SHIPLOOP INDIA CURVE: Trajectory closely tracing FEET through origin/retrofit/savings/verification, then diverging onto Indian banking rails */}
            {isShiploopDrawn && (
              <motion.path
                d="M 60 340 C 200 340, 320 280, 480 240 C 590 270, 720 250, 930 200"
                fill="none"
                stroke="url(#shiploopGrad)"
                strokeWidth="4"
                strokeDasharray="6,3"
                filter="url(#glowCyan)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: isDivergenceRevealed ? 1 : 0.65 }}
                transition={{ duration: 2, ease: "easeOut" }}
              />
            )}

            {/* Visual divergence marker arc */}
            {isDivergenceRevealed && (
              <circle
                cx="480"
                cy="240"
                r="18"
                fill="rgba(0, 242, 255, 0.1)"
                stroke="#00F2FF"
                strokeWidth="1.5"
                strokeDasharray="3,3"
                className="animate-spin"
                style={{ transformOrigin: '480px 240px' }}
              />
            )}
          </svg>

          {/* OVERLAY ELEMENTS: Interactive Nodes and Labels */}

          {/* 4. SHARED ORIGIN NODE: PAY-AS-YOU-SAVE */}
          {isOriginRevealed && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="absolute left-[3%] bottom-[12%] sm:bottom-[10%] z-20"
            >
              <div className="relative group cursor-pointer">
                <div className="absolute -inset-2 bg-emerald-500/30 rounded-xl blur-md group-hover:bg-emerald-500/50 transition-all" />
                <div className="relative p-2.5 sm:p-3 rounded-lg bg-slate-950 border-2 border-emerald-400 text-white shadow-xl flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <div>
                    <div className="text-[9px] font-mono text-emerald-400 font-extrabold uppercase tracking-widest">
                      SHARED FOUNDATIONAL CORE
                    </div>
                    <div className="text-xs sm:text-sm font-black font-mono tracking-tight text-white">
                      PAY-AS-YOU-SAVE
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* 7. DIVERGENCE POINT FLOATING BADGE */}
          {isDivergenceRevealed && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              onClick={() => setShowDivergenceDetail(true)}
              className="absolute left-[40%] sm:left-[45%] top-[50%] -translate-y-1/2 z-20 cursor-pointer"
            >
              <div className="relative group">
                <div className="absolute -inset-1.5 bg-cyan-400/30 rounded-lg blur-sm group-hover:bg-cyan-400/60 transition-all" />
                <div className="relative px-3 py-1.5 rounded-md bg-slate-900 border border-cyan-400 text-white flex items-center gap-2 shadow-lg">
                  <GitBranch className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-[10px] sm:text-xs font-mono font-black text-cyan-300 tracking-wider uppercase">
                    FINANCIAL RAILS DIVERGE HERE
                  </span>
                  <span className="text-[9px] font-mono bg-cyan-500/20 px-1 rounded text-white/70">
                    CLICK
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {/* FEET INFORMATION NODES (Around the Upper Curve) */}
          {isFeetNodesRevealed && (
            <>
              {/* FEET Node 1: $35M INITIAL CLOSING */}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute left-[20%] sm:left-[22%] top-[40%] sm:top-[38%] z-10"
              >
                <div className="px-2 py-1 rounded bg-slate-900/90 border border-emerald-500/40 text-white text-[9px] sm:text-[10px] font-mono shadow">
                  <div className="flex items-center gap-1">
                    <span className="font-black text-emerald-300">$35M INITIAL CLOSING</span>
                    <span className="px-1 py-0.2 rounded bg-emerald-500/20 text-emerald-400 text-[8px] font-bold">
                      [ VERIFIED ]
                    </span>
                  </div>
                  <div className="text-[8px] text-white/50">UP TO 100% UPFRONT FINANCING</div>
                </div>
              </motion.div>

              {/* FEET Node 2: UNSECURED LEASES */}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute left-[54%] sm:left-[58%] top-[25%] sm:top-[22%] z-10"
              >
                <div className="px-2 py-1 rounded bg-slate-900/90 border border-emerald-500/40 text-white text-[9px] sm:text-[10px] font-mono shadow">
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-white">UNSECURED LEASE</span>
                    <span className="px-1 py-0.2 rounded bg-emerald-500/20 text-emerald-400 text-[8px] font-bold">
                      [ VERIFIED ]
                    </span>
                  </div>
                  <div className="text-[8px] text-white/50">Decoupled from primary ship mortgage</div>
                </div>
              </motion.div>

              {/* FEET Node 3: $500M BY 2030 / ~200 SHIPS */}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-[4%] sm:right-[6%] top-[10%] sm:top-[12%] z-10"
              >
                <div className="px-2.5 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-500 text-white text-[10px] font-mono shadow-lg text-right">
                  <div className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider flex items-center justify-end gap-1">
                    <span>FEET GLOBAL SCALE</span>
                    <span className="px-1 rounded bg-amber-500/20 text-amber-300 text-[8px] border border-amber-500/40 font-bold">
                      [ TARGET ]
                    </span>
                  </div>
                  <div className="text-xs sm:text-sm font-black text-white">$500M BY 2030</div>
                  <div className="text-[9px] text-emerald-300 font-bold">~200 SHIPS TARGET</div>
                </div>
              </motion.div>
            </>
          )}

          {/* SHIPLOOP INDIA NODES (Around the Lower Branch) */}
          {isDivergenceRevealed && (
            <>
              {/* SHIPLOOP Node 1: Indian Green-Finance Rail */}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute left-[54%] sm:left-[56%] bottom-[28%] sm:bottom-[30%] z-10"
              >
                <div className="px-2 py-1 rounded bg-slate-900/90 border border-cyan-500/50 text-white text-[9px] sm:text-[10px] font-mono shadow">
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-cyan-300">INDIAN GREEN-FINANCE RAIL</span>
                    <span className="px-1 py-0.2 rounded bg-cyan-500/20 text-cyan-400 text-[8px] font-bold">
                      [ PROPOSED ]
                    </span>
                  </div>
                  <div className="text-[8px] text-white/50">SBI / IREDA / EXIM green windows</div>
                </div>
              </motion.div>

              {/* SHIPLOOP Node 2: SPV Escrow & Class Oracle Data Layer */}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-[4%] sm:right-[6%] bottom-[8%] sm:bottom-[10%] z-10"
              >
                <div className="px-2.5 py-1.5 rounded-lg bg-slate-950/90 border border-cyan-400 text-white text-[10px] font-mono shadow-lg text-right ring-1 ring-cyan-400/30">
                  <div className="text-[9px] font-bold text-cyan-400 uppercase tracking-wider flex items-center justify-end gap-1">
                    <span>SHIPLOOP INDIA RAIL</span>
                    <span className="px-1 rounded bg-cyan-500/20 text-cyan-300 text-[8px] border border-cyan-500/40 font-bold">
                      [ PROPOSED ]
                    </span>
                  </div>
                  <div className="text-xs sm:text-sm font-black text-white">SAGARMALA &amp; COASTAL FLEET</div>
                  <div className="text-[9px] text-cyan-300 font-bold">SPV Escrows + IRS/DNV Class Oracle</div>
                </div>
              </motion.div>
            </>
          )}

          {/* Floating Convergence Note in Center */}
          <div className="absolute left-[20%] bottom-[2%] text-[9px] font-mono text-white/40 flex items-center gap-1.5 pointer-events-none">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>SHARED RETROFIT &amp; VERIFICATION LOGIC (PATHS ALIGNED)</span>
          </div>

        </div>

        {/* 3. X-AXIS: Shared Deployment Journey Stages Bar */}
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="text-[10px] font-mono text-white/50 mb-2 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-white/40" />
              <span className="font-bold uppercase tracking-wider">X-AXIS: SHARED DEPLOYMENT JOURNEY</span>
            </div>
            <span className="text-white/40">SELECT STAGE TO COMPARE PARALLEL RAILS</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {JOURNEY_STAGES.map((stg) => {
              const isSelected = selectedStage.id === stg.id;
              return (
                <button
                  key={stg.id}
                  onClick={() => setSelectedStage(stg)}
                  onMouseEnter={() => setHoveredStage(stg)}
                  onMouseLeave={() => setHoveredStage(null)}
                  className={`p-2 rounded-lg text-left font-mono transition-all border ${
                    isSelected
                      ? 'bg-slate-900 border-cyan-400 shadow-[0_0_12px_rgba(0,242,255,0.3)] ring-1 ring-cyan-400/50'
                      : 'bg-white/[0.02] border-white/10 hover:border-white/30 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center justify-between text-[9px] mb-1">
                    <span className="text-white/40">{stg.stepNumber}</span>
                    <span className={`text-[8px] px-1 rounded font-bold ${
                      stg.id === 'repayment' || stg.id === 'scale' 
                        ? 'text-cyan-300 bg-cyan-500/10' 
                        : 'text-emerald-300 bg-emerald-500/10'
                    }`}>
                      {stg.id === 'repayment' || stg.id === 'scale' ? 'DIVERGED' : 'SHARED'}
                    </span>
                  </div>
                  <div className="text-xs font-black text-white tracking-wide">
                    {stg.name}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Stage Detail Drawer (FEET vs SHIPLOOP on this stage) */}
        <AnimatePresence mode="wait">
          {selectedStage && (
            <motion.div
              key={selectedStage.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="mt-3 p-3.5 rounded-lg bg-slate-900/90 border border-cyan-500/30 grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {/* FEET Stage Reality */}
              <div className="border-l-2 border-emerald-400 pl-3">
                <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                  <span className="text-emerald-400 font-bold uppercase">FEET • REAL-WORLD GLOBAL RAIL</span>
                  <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 text-[8px] font-bold">
                    [ {selectedStage.feetStatus} ]
                  </span>
                </div>
                <p className="text-xs text-slate-300 font-mono leading-relaxed">
                  {selectedStage.feetText}
                </p>
              </div>

              {/* SHIPLOOP Stage Proposed Rail */}
              <div className="border-l-2 border-cyan-400 pl-3">
                <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                  <span className="text-cyan-400 font-bold uppercase">SHIPLOOP • PROPOSED INDIAN RAIL</span>
                  <span className="px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 text-[8px] font-bold">
                    [ {selectedStage.shiploopStatus} ]
                  </span>
                </div>
                <p className="text-xs text-slate-300 font-mono leading-relaxed">
                  {selectedStage.shiploopText}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* 9. WHY THE CURVES DIFFER (DIVERGENCE BREAKDOWN) */}
      <div className="my-5">
        <div 
          onClick={() => setShowDivergenceDetail(!showDivergenceDetail)}
          className="flex items-center justify-between p-3.5 rounded-lg bg-slate-900/80 border border-white/10 hover:border-cyan-500/40 cursor-pointer transition-all"
        >
          <div className="flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-cyan-400" />
            <span className="text-xs sm:text-sm font-mono font-bold text-white uppercase tracking-wide">
              WHY THE TRAJECTORIES DIFFER: GLOBAL VS INDIAN FINANCIAL RAILS
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/60">
              STRUCTURAL CONTEXT
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs font-mono text-cyan-400">
            <span>{showDivergenceDetail ? 'COLLAPSE' : 'EXPAND DETAILS'}</span>
            {showDivergenceDetail ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </div>

        {showDivergenceDetail && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* FEET Deployment Environment */}
            <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30 font-mono">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
                <div className="text-sm font-black text-white">FEET DEPLOYMENT CONTEXT</div>
                <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                  [ REAL-WORLD FACILITY ]
                </span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Existing fund structure:</strong> Up to $35M dedicated commercial credit pool.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Global financing ecosystem:</strong> Blended finance consortium backed by international philanthropic and commercial debt.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>International relationships:</strong> Direct underwriting with global vessel owners and international charterers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Operating arena:</strong> Cross-border deep sea merchant lanes under international maritime jurisdiction.</span>
                </li>
              </ul>
            </div>

            {/* SHIPLOOP India Deployment Environment */}
            <div className="p-4 rounded-xl bg-slate-950 border border-cyan-400/40 font-mono ring-1 ring-cyan-400/20">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
                <div className="text-sm font-black text-white">SHIPLOOP INDIA DEPLOYMENT</div>
                <span className="text-[9px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold">
                  [ PROPOSED INDIA MODEL ]
                </span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span><strong>Indian banking ecosystem:</strong> Integrates public sector and commercial banks (SBI, IREDA, EXIM Bank of India).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span><strong>Indian green-finance channels:</strong> Leverages domestic concession windows and green taxonomy guidelines.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span><strong>Indian maritime policy:</strong> Aligns with SagarMala coastal corridors, Harit Nauka, and Maritime India Vision 2030.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span><strong>Domestic yards &amp; ports:</strong> Ties into Cochin Shipyard, L&amp;T Kattupalli, and major port trusts (JNPT, Mundra).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span><strong>Proposed local verification:</strong> Smart escrows powered by Class Society oracles (IRS, DNV).</span>
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </div>

      {/* 10. SAME ENGINE / DIFFERENT RAILS (Strongest Visual Statement) */}
      <div className="my-6 p-5 sm:p-6 rounded-xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-cyan-500/40 shadow-2xl relative overflow-hidden">
        {/* Animated Track Lines Beneath "RAILS" */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 flex flex-col justify-between pointer-events-none opacity-80">
          <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-pulse" />
          <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-[#00F2FF] to-transparent animate-pulse" />
        </div>

        <div className="text-center space-y-4">
          
          {/* Subheading: Same Engine */}
          <div>
            <span className="text-[10px] font-mono tracking-widest text-white/50 uppercase font-bold">
              THE UNIVERSAL ENGINE
            </span>
            <div className="text-lg sm:text-2xl font-black font-mono text-white tracking-tight mt-1 flex flex-wrap items-center justify-center gap-2">
              <span className="text-emerald-400">PAY-AS-YOU-SAVE</span>
              <span className="text-white/30">•</span>
              <span>VERIFIED SAVINGS</span>
              <span className="text-white/30">•</span>
              <span>RETROFIT</span>
              <span className="text-white/30">•</span>
              <span>REPAYMENT</span>
            </div>
          </div>

          <div className="h-px w-24 mx-auto bg-cyan-400/40" />

          {/* Core Differentiation: Different Rails */}
          <div>
            <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase font-bold">
              DEPLOYMENT ENVIRONMENT
            </span>
            <div className="text-2xl sm:text-4xl font-black font-mono text-white tracking-tight mt-1 flex flex-wrap items-center justify-center gap-3">
              <span>DIFFERENT FINANCIAL</span>
              <span className="relative inline-block text-[#00F2FF] px-2 underline decoration-cyan-400 decoration-wavy">
                RAILS
              </span>
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                <Globe2 className="w-3.5 h-3.5" />
                <span className="font-bold">FEET:</span>
                <span>GLOBAL / REAL-WORLD BLENDED DEBT</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-cyan-500/10 border border-cyan-400/40 text-cyan-300">
                <Anchor className="w-3.5 h-3.5" />
                <span className="font-bold">SHIPLOOP:</span>
                <span>PROPOSED INDIAN BANKING &amp; SAGARMALA RAIL</span>
              </div>
            </div>
          </div>

          {/* Strategic Anchoring Verdict */}
          <div className="pt-3 border-t border-white/10 text-xs sm:text-sm font-mono text-white/80 max-w-2xl mx-auto">
            <span className="font-bold text-white">"THE MECHANISM TRAVELS. THE FINANCIAL RAILS CHANGE."</span>
            <span className="block text-cyan-300 font-extrabold mt-1">
              SHIPLOOP PROPOSES THE INDIAN RAIL.
            </span>
          </div>

        </div>
      </div>

      {/* 11. SECONDARY EXPANDABLE PANEL: "COMPARE SYSTEMS" (Retaining Full 10 Dimensions) */}
      <div className="mt-6 pt-4 border-t border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Sliders className="w-4 h-4 text-cyan-400" />
              <span>DETAILED ARCHITECTURAL COMPARISON (10 DIMENSIONS)</span>
            </div>
            <p className="text-[11px] font-mono text-white/50">
              Deep dive into legal structures, banking interfaces, charter clauses, and verification oracles.
            </p>
          </div>

          <button
            onClick={() => setShowFullSystemComparison(!showFullSystemComparison)}
            className="px-3.5 py-1.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/50 text-cyan-300 text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shrink-0"
          >
            <span>{showFullSystemComparison ? 'COLLAPSE COMPARISON' : 'COMPARE SYSTEMS (10 DIMENSIONS)'}</span>
            {showFullSystemComparison ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {/* 10-Dimension Comparative Matrix Panel */}
        {showFullSystemComparison && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-5 space-y-4"
          >
            {/* Dimension Selection Pills */}
            <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
              {COMPARISON_DIMENSIONS.map((dim, idx) => (
                <button
                  key={dim.id}
                  onClick={() => setActiveDimensionIndex(idx)}
                  className={`px-2.5 py-1 rounded text-[10px] font-mono tracking-wider shrink-0 transition-all ${
                    activeDimensionIndex === idx
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_10px_rgba(0,242,255,0.4)]'
                      : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {dim.number} {dim.title}
                </button>
              ))}
            </div>

            {/* Side-by-Side Dimension Card */}
            {(() => {
              const dim = COMPARISON_DIMENSIONS[activeDimensionIndex];
              return (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Left: FEET Benchmark */}
                  <div className="p-5 rounded-xl bg-slate-950 border border-emerald-500/40">
                    <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/10 text-xs font-mono">
                      <div>
                        <span className="text-emerald-400 font-bold">FEET BENCHMARK</span>
                        <div className="text-[10px] text-white/50">{dim.number} • {dim.title}</div>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[9px] font-mono font-bold">
                        [ {dim.feet.statusBadge} ]
                      </span>
                    </div>
                    <div className="text-sm font-bold font-mono text-white mb-1.5">
                      {dim.feet.title}
                    </div>
                    <p className="text-xs text-slate-300 font-mono leading-relaxed">
                      {dim.feet.description}
                    </p>
                  </div>

                  {/* Right: SHIPLOOP Proposed */}
                  <div className="p-5 rounded-xl bg-slate-950 border border-cyan-400/50 ring-1 ring-cyan-400/20">
                    <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/10 text-xs font-mono">
                      <div>
                        <span className="text-cyan-400 font-bold">SHIPLOOP PROPOSED</span>
                        <div className="text-[10px] text-white/50">{dim.shiploop.verb} FEET MODEL</div>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-[9px] font-mono font-bold">
                        [ {dim.shiploop.statusBadge} ]
                      </span>
                    </div>
                    <div className="text-sm font-bold font-mono text-white mb-1.5">
                      {dim.shiploop.title}
                    </div>
                    <p className="text-xs text-slate-300 font-mono leading-relaxed">
                      {dim.shiploop.description}
                    </p>
                  </div>
                </div>
              );
            })()}

            {/* Quick Link to All 10 Dimensions in Grid View */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 pt-2">
              {COMPARISON_DIMENSIONS.map((d, i) => (
                <button
                  key={d.id}
                  onClick={() => setActiveDimensionIndex(i)}
                  className={`p-2 rounded text-left font-mono text-[10px] border transition-all ${
                    activeDimensionIndex === i
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                      : 'bg-white/[0.02] border-white/10 text-white/60 hover:text-white'
                  }`}
                >
                  <div className="font-bold">{d.number} {d.title}</div>
                  <div className="text-white/40 truncate mt-0.5">{d.shiploop.verb} FEET</div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>

    </div>
  );
};
