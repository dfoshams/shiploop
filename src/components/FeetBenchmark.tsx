import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Award, 
  Sparkles, 
  RotateCcw, 
  Play, 
  Pause, 
  ChevronRight, 
  ChevronLeft, 
  Sliders, 
  Database,
  ArrowRight,
  ShieldCheck,
  Compass
} from 'lucide-react';
import { FeetCinematicIntro } from './feet/FeetCinematicIntro';
import { FeetMechanismVisual } from './feet/FeetMechanismVisual';
import { FeetDataCards } from './feet/FeetDataCards';
import { FeetPerformanceEvidence } from './feet/FeetPerformanceEvidence';
import { FeetStrategicTransition } from './feet/FeetStrategicTransition';
import { FeetDualPathTrajectory } from './feet/FeetDualPathTrajectory';
import { ShiploopAdditionPanel } from './feet/ShiploopAdditionPanel';
import { FeetDataExplorerModal } from './feet/FeetDataExplorerModal';
import { FeetMetricRecord } from '../data/feetData';

interface FeetBenchmarkProps {
  isPresentationMode?: boolean;
  replayTrigger?: number;
  isPaused?: boolean;
}

export const FeetBenchmark: React.FC<FeetBenchmarkProps> = ({
  isPresentationMode = false,
  replayTrigger = 0,
  isPaused = false,
}) => {
  // Presentation Mode Stepper (0 to 6)
  // Step 0: FEET Cinematic Introduction
  // Step 1: FEET Mechanism Visual (6-step flow)
  // Step 2: Verified FEET Data ($35M, 100%, Pay-as-you-save, Unsecured leases, $500M target)
  // Step 3: Performance Evidence (7.2% CI band) & Market Adoption Gap (<0.5%)
  // Step 4: The Question ("IF THE MECHANISM WORKS... WHY ISN'T IT EVERYWHERE?" + SHIPLOOP Evolution)
  // Step 5: FEET vs SHIPLOOP Comparison Cockpit
  // Step 6: The SHIPLOOP Addition (5 operational layers) -> HOLD
  const [presentationStep, setPresentationStep] = useState<number>(0);
  const [localPaused, setLocalPaused] = useState<boolean>(false);
  const [selectedRecord, setSelectedRecord] = useState<FeetMetricRecord | null>(null);

  const presentationStepLabels = [
    '01 FEET INTRO',
    '02 MECHANISM FLOW',
    '03 VERIFIED DATA',
    '04 PILOT & MARKET GAP',
    '05 STRATEGIC SHIFT',
    '06 DUAL-PATH RAILS',
    '07 SHIPLOOP ADDITIONS [HOLD]'
  ];

  // Replay trigger resets presentation step to 0
  useEffect(() => {
    setPresentationStep(0);
  }, [replayTrigger]);

  // Automatic advance in Presentation Mode when not paused
  useEffect(() => {
    if (!isPresentationMode || isPaused || localPaused) return;

    // Advance every 4.2s until reaching final HOLD step
    if (presentationStep < 6) {
      const timer = setTimeout(() => {
        setPresentationStep((prev) => Math.min(prev + 1, 6));
      }, 4200);
      return () => clearTimeout(timer);
    }
  }, [isPresentationMode, isPaused, localPaused, presentationStep]);

  // -------------------------------------------------------------
  // PRESENTATION MODE (Single focused stage, 16:9 projector friendly)
  // -------------------------------------------------------------
  if (isPresentationMode) {
    return (
      <div className="w-full h-full flex flex-col justify-between p-4 sm:p-8 max-w-7xl mx-auto select-none">
        
        {/* Top Header Bar for Presenter */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
              CHAPTER 08
            </span>
            <div>
              <div className="text-base sm:text-xl font-black font-mono tracking-tight text-white flex items-center gap-2">
                <span>THE MODEL ALREADY EXISTS.</span>
              </div>
              <p className="text-xs font-mono text-emerald-400/90 hidden sm:block">
                FEET demonstrates that future fuel savings can be used to finance today's maritime retrofit.
              </p>
            </div>
          </div>

          {/* Stepper Navigation Pills & Playback Controls */}
          <div className="flex items-center gap-2">
            <div className="hidden lg:flex items-center gap-1 bg-white/5 p-1 rounded-md border border-white/10">
              {presentationStepLabels.map((lbl, idx) => (
                <button
                  key={lbl}
                  onClick={() => setPresentationStep(idx)}
                  className={`px-2 py-0.5 rounded text-[9px] font-mono transition-all ${
                    presentationStep === idx
                      ? 'bg-emerald-500 text-slate-950 font-bold shadow-[0_0_8px_rgba(16,185,129,0.5)]'
                      : presentationStep > idx
                      ? 'bg-white/10 text-white/70'
                      : 'text-white/40 hover:text-white'
                  }`}
                >
                  {lbl}
                </button>
              ))}
            </div>

            {/* Replay & Step Nav buttons */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPresentationStep(0)}
                className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10"
                title="Replay FEET Sequence (R)"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setLocalPaused(!localPaused)}
                className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10"
                title="Pause / Resume (Space)"
              >
                {localPaused || isPaused ? <Play className="w-3.5 h-3.5 text-emerald-400" /> : <Pause className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => setPresentationStep((p) => Math.max(0, p - 1))}
                disabled={presentationStep === 0}
                className="p-1.5 rounded bg-white/5 disabled:opacity-30 hover:bg-white/10 text-white/70 border border-white/10"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setPresentationStep((p) => Math.min(6, p + 1))}
                disabled={presentationStep === 6}
                className="p-1.5 rounded bg-white/5 disabled:opacity-30 hover:bg-white/10 text-white/70 border border-white/10"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Presentation Stage Viewport */}
        <div className="flex-1 flex items-center justify-center overflow-y-auto overflow-x-hidden my-2">
          <AnimatePresence mode="wait">
            {presentationStep === 0 && (
              <motion.div
                key="step-0"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                className="w-full"
              >
                <FeetCinematicIntro 
                  isPresentationMode={true} 
                  replayTrigger={replayTrigger} 
                  isPaused={isPaused || localPaused}
                />
              </motion.div>
            )}

            {presentationStep === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="w-full"
              >
                <FeetMechanismVisual isPresentationMode={true} />
              </motion.div>
            )}

            {presentationStep === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="w-full space-y-4"
              >
                <FeetDataCards onSelectRecord={setSelectedRecord} />
                <FeetDataExplorerModal selectedRecord={selectedRecord} />
              </motion.div>
            )}

            {presentationStep === 3 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="w-full"
              >
                <FeetPerformanceEvidence />
              </motion.div>
            )}

            {presentationStep === 4 && (
              <motion.div
                key="step-4"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="w-full"
              >
                <FeetStrategicTransition />
              </motion.div>
            )}

            {presentationStep === 5 && (
              <motion.div
                key="step-5"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="w-full"
              >
                <FeetDualPathTrajectory 
                  isPresentationMode={true} 
                  replayTrigger={replayTrigger}
                  isPaused={isPaused || localPaused}
                />
              </motion.div>
            )}

            {presentationStep === 6 && (
              <motion.div
                key="step-6"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="w-full"
              >
                <ShiploopAdditionPanel />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Status Bar for Presenter */}
        <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[11px] font-mono text-white/50">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white font-bold">FEET BENCHMARK:</span>
            <span className="text-emerald-400 uppercase">REAL-WORLD PROOF POINT</span>
          </div>

          <div className="flex items-center gap-3">
            {presentationStep === 6 ? (
              <span className="text-amber-300 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30 animate-pulse">
                [ HOLD — PRESS → FOR NEXT CHAPTER ]
              </span>
            ) : (
              <span>AUTO-ADVANCING • PRESS → TO JUMP</span>
            )}
            <span className="text-white/30 hidden sm:inline">| R TO REPLAY | SPACE TO PAUSE</span>
          </div>
        </div>

      </div>
    );
  }

  // -------------------------------------------------------------
  // EXPLORATION MODE (Normal Interactive Scrolling Experience)
  // -------------------------------------------------------------
  return (
    <section 
      id="feet" 
      className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10"
    >
      {/* Chapter 08 Header Banner */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-bold tracking-widest uppercase">
            CHAPTER 08 • FEET BENCHMARK
          </span>
          <span className="text-xs font-mono text-white/40">|</span>
          <span className="text-xs font-mono text-white/60 uppercase">
            REAL-WORLD FINANCING PROOF
          </span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black font-mono tracking-tight text-white uppercase">
          THE MODEL ALREADY EXISTS.
        </h2>
        <p className="mt-3 text-base sm:text-lg text-slate-300 font-mono max-w-3xl leading-relaxed">
          FEET demonstrates that future fuel savings can be used to finance today's maritime retrofit.
        </p>

        {/* Transition callout */}
        <div className="mt-4 p-3 rounded-lg bg-slate-900/80 border border-cyan-500/30 inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-cyan-300 font-semibold">
          <Sparkles className="w-4 h-4 text-[#00F2FF]" />
          <span>SO WHAT DOES SHIPLOOP ADD?</span>
          <span className="text-white/50 text-xs font-normal ml-1">
            (An India-focused deployment layer, live underwriting engine, and banking workflow)
          </span>
        </div>
      </div>

      {/* Main Chapter Content Sections Stacked in Logical Narrative Order */}
      <div className="space-y-12">
        
        {/* 1. Cinematic Opening Animation & FEET Identity */}
        <div>
          <div className="text-xs font-mono text-white/50 mb-2 uppercase tracking-wider">
            01 / REAL-WORLD MECHANISM EMERGENCE
          </div>
          <FeetCinematicIntro />
        </div>

        {/* 2. Visual 6-Step FEET Mechanism Flow */}
        <div>
          <div className="text-xs font-mono text-white/50 mb-2 uppercase tracking-wider">
            02 / CLOSED-LOOP PROGRAM STRUCTURE
          </div>
          <FeetMechanismVisual />
        </div>

        {/* 3. Verified FEET Program Data Cards */}
        <div>
          <div className="text-xs font-mono text-white/50 mb-2 uppercase tracking-wider">
            03 / VERIFIED FEET DATA & EXPANSION TARGETS
          </div>
          <FeetDataCards onSelectRecord={setSelectedRecord} />
        </div>

        {/* 4. Empirical Performance Evidence & Market Gap */}
        <div>
          <div className="text-xs font-mono text-white/50 mb-2 uppercase tracking-wider">
            04 / EMPIRICAL RETROFIT PILOT EVIDENCE & MARKET PENETRATION SIGNAL
          </div>
          <FeetPerformanceEvidence />
        </div>

        {/* 5. The Strategic Question & Evolution Sequence */}
        <div>
          <div className="text-xs font-mono text-white/50 mb-2 uppercase tracking-wider">
            05 / THE STRUCTURAL BOTTLENECK & SHIPLOOP'S ENTRY
          </div>
          <FeetStrategicTransition />
        </div>

        {/* 6. Hero Visual: Dual-Path Financing & Deployment Trajectory */}
        <div>
          <div className="text-xs font-mono text-white/50 mb-2 uppercase tracking-wider">
            06 / HERO VISUAL • DUAL-PATH FINANCING & DEPLOYMENT TRAJECTORY
          </div>
          <FeetDualPathTrajectory />
        </div>

        {/* 7. What SHIPLOOP Adds: 5 Operational Layers */}
        <div>
          <div className="text-xs font-mono text-white/50 mb-2 uppercase tracking-wider">
            07 / THE SHIPLOOP ADDITION: 5 DEPLOYMENT LAYERS
          </div>
          <ShiploopAdditionPanel />
        </div>

        {/* 8. Mini Presenter Data Explorer */}
        <div>
          <div className="text-xs font-mono text-white/50 mb-2 uppercase tracking-wider">
            08 / AUDIT CITATION EXPLORER
          </div>
          <FeetDataExplorerModal selectedRecord={selectedRecord} />
        </div>

      </div>

    </section>
  );
};
