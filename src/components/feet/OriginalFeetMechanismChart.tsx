import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ExternalLink, 
  Coins, 
  Fuel, 
  ArrowDown, 
  ArrowUp, 
  ArrowLeft,
  RotateCcw
} from 'lucide-react';
import { SourceButton } from '../SourceButton';

interface OriginalFeetMechanismChartProps {
  isPresentationMode?: boolean;
  replayTrigger?: number;
}

export const OriginalFeetMechanismChart: React.FC<OriginalFeetMechanismChartProps> = ({
  isPresentationMode = false,
  replayTrigger = 0,
}) => {
  // Official GCMD FEET link requested by user
  const GCMD_FEET_URL = "https://www.gcformd.org/projects/project-feet-pilot-fund-for-energy-efficiency-technologies/";

  // Key stagger timings based on the requested sequence:
  // 1. FEET title & subtitle
  // 2. Capital Contributors
  // 3. EET Manufacturers
  // 4. Shipowners
  // 5. FEET central node
  // 6. Numbered arrows 1 -> 4
  // 7. Verified Savings
  // 8. Diversified Portfolio
  // 9. Source badge & Source panel
  const anim = {
    title: { delay: 0.05, duration: 0.35 },
    contributors: { delay: 0.2, duration: 0.35 },
    manufacturers: { delay: 0.35, duration: 0.35 },
    shipowners: { delay: 0.5, duration: 0.35 },
    centralFeet: { delay: 0.65, duration: 0.35 },
    arrows: { delay: 0.8, duration: 0.35 },
    savings: { delay: 0.95, duration: 0.35 },
    portfolio: { delay: 1.1, duration: 0.35 },
    source: { delay: 1.25, duration: 0.35 }
  };

  return (
    <div 
      key={`feet-chart-${replayTrigger}`}
      className={`w-full rounded-xl bg-[#020817]/95 border border-cyan-500/30 backdrop-blur-md relative overflow-hidden shadow-[0_0_40px_rgba(0,242,255,0.08)] font-sans select-none ${
        isPresentationMode ? 'p-2.5 sm:p-4 max-w-6xl mx-auto my-auto' : 'p-4 sm:p-7'
      }`}
    >
      {/* Ambient background glowing gradient nodes */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-24 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 left-1/3 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* ========================================================================= */}
      {/* 1. HEADER: TITLE, SUBTITLE & REAL-WORLD REFERENCE BADGE */}
      {/* ========================================================================= */}
      <div className={`flex flex-col sm:flex-row sm:items-start justify-between gap-2 border-b border-white/10 ${
        isPresentationMode ? 'mb-2 pb-2' : 'mb-4 pb-3'
      }`}>
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: anim.title.delay, duration: anim.title.duration }}
          className="flex-1"
        >
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[9px] sm:text-[10px] font-mono font-bold tracking-widest text-cyan-400 uppercase">
              REAL-WORLD FINANCING BLUEPRINT
            </span>
            <span className="text-white/30 text-xs">•</span>
            <span className="text-[9px] sm:text-[10px] font-mono text-white/50 uppercase">
              PAY-AS-YOU-SAVE ARCHITECTURE
            </span>
          </div>
          <h2 className={`font-black font-mono tracking-tight text-white ${
            isPresentationMode ? 'text-base sm:text-lg md:text-xl' : 'text-xl sm:text-2xl md:text-3xl'
          }`}>
            Fund for Energy Efficiency Technologies (FEET)
          </h2>
          <p className={`text-slate-300 font-sans italic max-w-3xl ${
            isPresentationMode ? 'text-[11px] sm:text-xs leading-tight mt-0.5' : 'text-xs sm:text-sm leading-relaxed mt-1'
          }`}>
            Featuring a pay-as-you-save repayment mechanism to accelerate Energy Efficiency Technologies (EETs) adoption
          </p>
        </motion.div>

        {/* Section 13: Source Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: anim.source.delay, duration: anim.source.duration }}
          className="shrink-0 self-start mt-1 sm:mt-0 flex items-center gap-2"
        >
          <div className="px-2.5 py-1 rounded bg-[#031d24]/90 border border-teal-400/50 shadow-[0_0_12px_rgba(20,184,166,0.25)] text-right">
            <div className="text-[8px] sm:text-[9px] font-mono font-bold text-teal-300 tracking-wider uppercase flex items-center justify-end gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
              REAL-WORLD REFERENCE
            </div>
            <div className="text-[10px] sm:text-[11px] font-mono font-black text-white tracking-tight">
              GCMD • PROJECT FEET
            </div>
          </div>
          <SourceButton evidenceId="GCMD-001" />
        </motion.div>
      </div>

      {/* ========================================================================= */}
      {/* 2. TOP: CAPITAL CONTRIBUTORS */}
      {/* ========================================================================= */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: anim.contributors.delay, duration: anim.contributors.duration }}
        className={`w-full rounded-lg bg-[#040e24]/90 border border-cyan-500/30 relative shadow-lg ${
          isPresentationMode ? 'p-1.5 sm:p-2 mb-2' : 'p-2.5 sm:p-3 mb-3'
        }`}
      >
        {/* Navy/Blue Glass Header Bar with subtle cyan glowing border and gradient line */}
        <div className={`w-full rounded bg-gradient-to-r from-[#061c3d] via-[#0a2c5a] to-[#061c3d] border border-cyan-400/30 text-center shadow-md relative overflow-hidden ${
          isPresentationMode ? 'py-1 mb-1.5' : 'py-1.5 mb-2'
        }`}>
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent" />
          <span className="text-cyan-200 font-mono font-bold uppercase tracking-widest text-[10px] sm:text-xs drop-shadow-[0_0_8px_rgba(0,242,255,0.3)]">
            Capital contributors
          </span>
        </div>

        {/* 4 Funding Columns from Reference */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-1.5 sm:gap-2">
          
          {/* Column 1: Catalytic Equity */}
          <div className="flex rounded border border-cyan-500/25 overflow-hidden bg-[#030a1c]/90 shadow-sm hover:border-cyan-400/40 transition-colors">
            <div className="w-20 sm:w-24 bg-cyan-950/80 text-cyan-300 border-r border-cyan-500/30 px-1.5 py-1.5 flex items-center justify-center text-center font-mono font-bold text-[9px] sm:text-[10px] uppercase leading-tight shrink-0">
              Catalytic equity
            </div>
            <div className="flex-1 p-1.5 flex flex-col justify-center items-center text-center bg-[#020714]/80">
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" strokeDasharray="4 2" />
                  <path d="M7 12c0-2.8 2.2-5 5-5s5 2.2 5 5" strokeLinecap="round" />
                  <circle cx="12" cy="12" r="2" fill="currentColor" />
                </svg>
                <div className="text-left">
                  <div className="text-[8.5px] sm:text-[9.5px] font-black font-sans text-cyan-200 leading-tight">
                    GLOBAL CENTRE FOR MARITIME DECARBONISATION
                  </div>
                  <div className="text-[7.5px] font-mono text-cyan-400/90 font-bold tracking-wider mt-0.5">
                    (GCMD)
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Commercial Equity */}
          <div className="flex rounded border border-indigo-500/25 overflow-hidden bg-[#030a1c]/90 shadow-sm hover:border-indigo-400/40 transition-colors">
            <div className="w-20 sm:w-24 bg-indigo-950/80 text-indigo-300 border-r border-indigo-500/30 px-1.5 py-1.5 flex items-center justify-center text-center font-mono font-bold text-[9px] sm:text-[10px] uppercase leading-tight shrink-0">
              Commercial equity
            </div>
            <div className="flex-1 p-1.5 flex flex-col justify-center items-center text-center bg-[#020714]/80">
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded bg-indigo-500/20 border border-indigo-400/40 text-indigo-300 flex items-center justify-center font-bold text-[8px] shrink-0">▲</span>
                <div className="text-left">
                  <div className="text-[9px] sm:text-[10px] font-black font-sans text-white leading-tight">
                    AIM HORIZON INVESTMENTS
                  </div>
                  <div className="text-[7px] sm:text-[7.5px] font-mono text-indigo-300/80 mt-0.5 italic">
                    *Via principals of AIM Horizon
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Preferred Equity */}
          <div className="flex rounded border border-teal-500/25 overflow-hidden bg-[#030a1c]/90 shadow-sm hover:border-teal-400/40 transition-colors">
            <div className="w-20 sm:w-24 bg-teal-950/80 text-teal-300 border-r border-teal-500/30 px-1.5 py-1.5 flex items-center justify-center text-center font-mono font-bold text-[9px] sm:text-[10px] uppercase leading-tight shrink-0">
              Preferred equity
            </div>
            <div className="flex-1 p-1.5 flex flex-col justify-center items-center text-center bg-[#020714]/80">
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded-full border border-teal-400/60 bg-teal-500/20 flex items-center justify-center text-[7px] font-bold text-teal-300 shrink-0">
                  DBJ
                </div>
                <div className="text-left">
                  <div className="text-[8.5px] sm:text-[9.5px] font-black font-sans text-white leading-tight">
                    DEVELOPMENT BANK OF JAPAN
                  </div>
                  <div className="text-[7.5px] font-mono text-teal-300/90 font-bold tracking-wider mt-0.5">
                    (DBJ)
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Senior Debt */}
          <div className="flex rounded border border-sky-500/25 overflow-hidden bg-[#030a1c]/90 shadow-sm hover:border-sky-400/40 transition-colors">
            <div className="w-20 sm:w-24 bg-blue-950/80 text-sky-300 border-r border-blue-500/30 px-1.5 py-1.5 flex items-center justify-center text-center font-mono font-bold text-[9px] sm:text-[10px] uppercase leading-tight shrink-0">
              Senior debt
            </div>
            <div className="flex-1 p-1.5 flex items-center justify-center gap-1.5 sm:gap-2 bg-[#020714]/80">
              <div className="flex items-center gap-1">
                <span className="w-3.5 h-3.5 rounded bg-sky-500/20 border border-sky-400/40 text-sky-300 flex items-center justify-center font-bold text-[8px] shrink-0">◆</span>
                <div className="text-[8.5px] sm:text-[9.5px] font-black font-sans text-white tracking-tight leading-none whitespace-nowrap">
                  ING BANK N.V.
                </div>
              </div>
              <div className="h-3.5 w-px bg-cyan-400/30" />
              <div className="flex items-center gap-1">
                <span className="w-3.5 h-3.5 rounded bg-blue-500/20 border border-blue-400/40 text-blue-300 flex items-center justify-center font-bold text-[8px] shrink-0">❖</span>
                <div className="text-[8.5px] sm:text-[9.5px] font-black font-sans text-white tracking-tight leading-none whitespace-nowrap">
                  DBS BANK
                </div>
              </div>
            </div>
          </div>

        </div>
      </motion.div>

      {/* ========================================================================= */}
      {/* 3. FLOW ANNOTATIONS 1 & 4 (BETWEEN CAPITAL CONTRIBUTORS & FEET) */}
      {/* ========================================================================= */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: anim.arrows.delay, duration: anim.arrows.duration }}
        className={`grid grid-cols-2 gap-3 max-w-2xl mx-auto px-2 ${
          isPresentationMode ? 'my-1' : 'my-2'
        }`}
      >
        {/* Left Arrow (1): Blended financing DOWN into FEET */}
        <div className="flex items-center justify-end gap-1.5 sm:gap-2 text-right">
          <div className={`font-mono text-cyan-200 leading-tight max-w-[210px] ${
            isPresentationMode ? 'text-[9px] sm:text-[10px]' : 'text-[10px] sm:text-[11px]'
          }`}>
            Blended financing balances risk while keeping financing costs competitive
          </div>
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-cyan-400 text-slate-950 font-mono font-black text-[10px] sm:text-xs flex items-center justify-center shadow-[0_0_12px_rgba(0,242,255,0.6)] shrink-0 border border-cyan-300">
            1
          </div>
          <div className="flex flex-col items-center">
            <div className={`w-0.5 bg-gradient-to-b from-cyan-400 to-sky-400 ${
              isPresentationMode ? 'h-3.5 sm:h-5' : 'h-5 sm:h-6'
            }`} />
            <ArrowDown className="w-3 h-3 text-sky-400 -mt-1" />
          </div>
        </div>

        {/* Right Arrow (4): Repayments UP to Capital Contributors */}
        <div className="flex items-center justify-start gap-1.5 sm:gap-2 text-left">
          <div className="flex flex-col items-center">
            <ArrowUp className="w-3 h-3 text-indigo-300 -mb-1" />
            <div className={`w-0.5 bg-gradient-to-t from-teal-400 to-indigo-400 ${
              isPresentationMode ? 'h-3.5 sm:h-5' : 'h-5 sm:h-6'
            }`} />
          </div>
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-indigo-400 text-slate-950 font-mono font-black text-[10px] sm:text-xs flex items-center justify-center shadow-[0_0_12px_rgba(129,140,248,0.5)] shrink-0 border border-indigo-300">
            4
          </div>
          <div className={`font-mono text-slate-300 leading-tight max-w-[210px] ${
            isPresentationMode ? 'text-[9px] sm:text-[10px]' : 'text-[10px] sm:text-[11px]'
          }`}>
            Fixed quarterly payments and annual pay-as-you-save payments are paid out to investors
          </div>
        </div>
      </motion.div>

      {/* ========================================================================= */}
      {/* 4. MAIN THREE-COLUMN ROW: EET MANUFACTURERS | CENTRAL FEET | SHIPOWNERS */}
      {/* ========================================================================= */}
      <div className={`grid grid-cols-1 md:grid-cols-12 gap-2.5 sm:gap-3 items-center relative ${
        isPresentationMode ? 'my-1' : 'my-2 sm:my-3'
      }`}>
        
        {/* ------------------------------------------------------------- */}
        {/* LEFT COLUMN (4 cols): EET MANUFACTURERS */}
        {/* ------------------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: anim.manufacturers.delay, duration: anim.manufacturers.duration }}
          className="md:col-span-4 rounded-lg bg-[#051126]/90 border border-cyan-500/30 overflow-hidden shadow-lg"
        >
          {/* Header Bar */}
          <div className="bg-gradient-to-r from-[#0b2b52] to-[#071c38] py-1.5 px-3 border-b border-cyan-500/40 text-center">
            <span className="font-mono font-black text-[11px] sm:text-xs uppercase tracking-wider text-cyan-300">
              EET manufacturers
            </span>
          </div>

          <div className={`space-y-1.5 bg-[#030a1c]/80 ${
            isPresentationMode ? 'p-2' : 'p-2.5 sm:p-3 space-y-2'
          }`}>
            <div className="text-[10px] sm:text-[11px] font-mono text-cyan-200/90 font-bold">
              Purchase payments for EET:
            </div>

            {/* Sub-box 1: Upfront payment */}
            <div className="p-2 rounded bg-[#0b2447]/80 border border-cyan-500/40 text-center shadow-sm">
              <span className="text-[11px] sm:text-xs font-mono font-bold text-white tracking-wide">
                Upfront payment
              </span>
            </div>

            {/* Sub-box 2: Delayed performance-based payment */}
            <div className="p-2 rounded bg-[#071830]/60 border border-dashed border-cyan-400/50 text-center">
              <span className="text-[10px] sm:text-xs font-mono font-bold text-cyan-200 tracking-wide">
                Delayed performance-based payment
              </span>
            </div>
          </div>
        </motion.div>

        {/* ------------------------------------------------------------- */}
        {/* CENTER COLUMN (4 cols): THE CENTRAL FEET NODE */}
        {/* ------------------------------------------------------------- */}
        <div className="md:col-span-4 flex flex-col items-center justify-center relative px-2">
          
          {/* Arrow 2: From FEET pointing LEFT to EET Manufacturers */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: anim.arrows.delay, duration: anim.arrows.duration }}
            className="absolute -left-2.5 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-0.5 z-20"
          >
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-sky-400 text-slate-950 font-mono font-black text-[10px] sm:text-xs flex items-center justify-center shadow-[0_0_12px_rgba(56,189,248,0.7)] border border-sky-300">
              2
            </div>
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-400" />
          </motion.div>

          {/* Arrow 3: From Shipowners pointing LEFT into FEET */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: anim.arrows.delay, duration: anim.arrows.duration }}
            className="absolute -right-2.5 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-0.5 z-20"
          >
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-emerald-400 text-slate-950 font-mono font-black text-[10px] sm:text-xs flex items-center justify-center shadow-[0_0_12px_rgba(52,211,153,0.7)] border border-emerald-300">
              3
            </div>
          </motion.div>

          {/* Central FEET Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: anim.centralFeet.delay, duration: anim.centralFeet.duration }}
            className={`w-full rounded-xl bg-gradient-to-b from-[#0e315d] via-[#092244] to-[#041226] border-2 border-cyan-400 shadow-[0_0_35px_rgba(0,242,255,0.3),inset_0_0_25px_rgba(0,242,255,0.12)] text-center relative ${
              isPresentationMode ? 'py-3 sm:py-4 px-3' : 'py-4 sm:py-6 px-4'
            }`}
          >
            {/* Tech Corner Markers */}
            <div className="absolute top-1 left-1 w-2 h-2 border-t-2 border-l-2 border-cyan-300" />
            <div className="absolute top-1 right-1 w-2 h-2 border-t-2 border-r-2 border-cyan-300" />
            <div className="absolute bottom-1 left-1 w-2 h-2 border-b-2 border-l-2 border-cyan-300" />
            <div className="absolute bottom-1 right-1 w-2 h-2 border-b-2 border-r-2 border-cyan-300" />

            <div className={`font-black font-mono tracking-widest text-white drop-shadow-[0_0_16px_rgba(0,242,255,0.5)] ${
              isPresentationMode ? 'text-2xl sm:text-3xl' : 'text-3xl sm:text-4xl'
            }`}>
              FEET
            </div>
            <div className="text-[8px] sm:text-[9px] font-mono text-cyan-300 font-bold tracking-widest uppercase mt-0.5">
              CENTRAL FINANCING NODE
            </div>
          </motion.div>

          {/* Subtext under FEET */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: anim.centralFeet.delay + 0.15 }}
            className="mt-1.5 text-center flex items-center justify-center gap-1"
          >
            <p className="text-[10px] sm:text-[11px] font-mono font-semibold text-cyan-100 leading-tight inline-flex items-center gap-1">
              <span>Provides 100% upfront financing for equipment, installation, and sensors</span>
              <SourceButton evidenceId="GCMD-001" />
            </p>
          </motion.div>

          {/* Dashed connector line down to Portfolio */}
          <div className="w-px h-4 sm:h-5 border-l border-dashed border-cyan-400/60 my-0.5" />

        </div>

        {/* ------------------------------------------------------------- */}
        {/* RIGHT COLUMN (4 cols): SHIPOWNERS */}
        {/* ------------------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: anim.shipowners.delay, duration: anim.shipowners.duration }}
          className="md:col-span-4 rounded-lg bg-[#03171b]/90 border border-teal-500/30 overflow-hidden shadow-lg relative"
        >
          {/* Header Bar */}
          <div className="bg-gradient-to-r from-[#073030] to-[#041f20] py-1.5 px-3 border-b border-teal-500/40 text-center">
            <span className="font-mono font-black text-[11px] sm:text-xs uppercase tracking-wider text-teal-300">
              Shipowners
            </span>
          </div>

          <div className={`space-y-1.5 bg-[#020f12]/80 ${
            isPresentationMode ? 'p-2' : 'p-2.5 sm:p-3 space-y-2'
          }`}>
            <div className="text-[10px] sm:text-[11px] font-mono text-teal-200/90 font-bold">
              Lease payments for EET:
            </div>

            {/* Sub-box 1: Fixed quarterly payments */}
            <div className="p-2 rounded bg-[#062927]/80 border border-teal-500/40 text-center shadow-sm">
              <span className="text-[11px] sm:text-xs font-mono font-bold text-white tracking-wide">
                Fixed quarterly payments
              </span>
            </div>

            {/* Sub-box 2: Annual pay-as-you-save payments */}
            <div className="p-2 rounded bg-[#041c1b]/60 border border-dashed border-teal-400/50 text-center relative flex items-center justify-center gap-1">
              <span className="text-[10px] sm:text-xs font-mono font-bold text-teal-200 tracking-wide">
                Annual pay-as-you-save payments
              </span>
              <SourceButton evidenceId="GCMD-001" />
            </div>
          </div>
        </motion.div>

      </div>

      {/* ========================================================================= */}
      {/* 5. LOWER ROW: DIVERSIFIED PORTFOLIO & QUANTIFIED VERIFIED SAVINGS */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5 sm:gap-3 items-end mt-1">
        
        {/* Center/Bottom (8 cols): DIVERSIFIED PORTFOLIO OF PROJECTS */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: anim.portfolio.delay, duration: anim.portfolio.duration }}
          className={`md:col-span-8 rounded-lg bg-[#040e22]/90 border border-cyan-500/30 text-center shadow-md relative ${
            isPresentationMode ? 'p-2 sm:p-2.5' : 'p-3 sm:p-4'
          }`}
        >
          {/* Maritime Vessel Motifs / Silhouettes */}
          <div className="flex items-center justify-center gap-3 sm:gap-6 mb-1.5 text-cyan-300/80 overflow-x-auto py-0.5">
            
            {/* Vessel 1: Rotor Sail / Wind Assist Bulk Carrier */}
            <div className="flex flex-col items-center shrink-0" title="Wind-Assisted Propulsion (Rotor Sails)">
              <svg className="w-10 h-7 sm:w-12 sm:h-8 text-cyan-400" viewBox="0 0 64 32" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 24h56l-6 5H10L4 24z" fill="currentColor" fillOpacity="0.2" />
                <path d="M48 18h8v6h-8z" />
                <rect x="18" y="6" width="4" height="18" rx="1" fill="currentColor" fillOpacity="0.4" />
                <rect x="28" y="6" width="4" height="18" rx="1" fill="currentColor" fillOpacity="0.4" />
                <rect x="38" y="6" width="4" height="18" rx="1" fill="currentColor" fillOpacity="0.4" />
                <line x1="2" y1="29" x2="62" y2="29" strokeDasharray="3 2" />
              </svg>
              <span className="text-[7px] sm:text-[8px] font-mono text-cyan-400/80">ROTOR SAIL</span>
            </div>

            {/* Vessel 2: Tanker with Air Lubrication */}
            <div className="flex flex-col items-center shrink-0" title="Oil Tanker with Air Lubrication">
              <svg className="w-10 h-7 sm:w-12 sm:h-8 text-emerald-400" viewBox="0 0 64 32" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 22h52l-5 7H11L6 22z" fill="currentColor" fillOpacity="0.2" />
                <rect x="12" y="16" width="10" height="6" />
                <rect x="26" y="16" width="10" height="6" />
                <rect x="46" y="14" width="10" height="8" />
                <circle cx="58" cy="27" r="1.5" />
                <line x1="2" y1="29" x2="62" y2="29" strokeDasharray="3 2" />
              </svg>
              <span className="text-[7px] sm:text-[8px] font-mono text-emerald-400/80">TANKER</span>
            </div>

            {/* Vessel 3: Container Carrier */}
            <div className="flex flex-col items-center shrink-0" title="Container Carrier with High Efficiency Propeller">
              <svg className="w-10 h-7 sm:w-12 sm:h-8 text-sky-400" viewBox="0 0 64 32" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 23h56l-4 6H8L4 23z" fill="currentColor" fillOpacity="0.2" />
                <rect x="12" y="10" width="8" height="13" />
                <rect x="22" y="10" width="8" height="13" />
                <rect x="32" y="10" width="8" height="13" />
                <rect x="42" y="10" width="8" height="13" />
                <rect x="52" y="15" width="6" height="8" />
                <line x1="2" y1="29" x2="62" y2="29" strokeDasharray="3 2" />
              </svg>
              <span className="text-[7px] sm:text-[8px] font-mono text-sky-400/80">CONTAINER</span>
            </div>

            {/* Vessel 4: Bulk Carrier */}
            <div className="flex flex-col items-center shrink-0" title="Panamax Bulk Carrier">
              <svg className="w-10 h-7 sm:w-12 sm:h-8 text-indigo-400" viewBox="0 0 64 32" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 23h54l-5 6H9L5 23z" fill="currentColor" fillOpacity="0.2" />
                <path d="M14 18h6v5h-6z M26 18h6v5h-6z M38 18h6v5h-6z M50 15h6v8h-6z" />
                <line x1="2" y1="29" x2="62" y2="29" strokeDasharray="3 2" />
              </svg>
              <span className="text-[7px] sm:text-[8px] font-mono text-indigo-400/80">BULKER</span>
            </div>

            {/* Vessel 5: Gas Carrier / LNG */}
            <div className="flex flex-col items-center shrink-0" title="LNG / Gas Carrier">
              <svg className="w-10 h-7 sm:w-12 sm:h-8 text-purple-400" viewBox="0 0 64 32" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 23h54l-5 6H9L5 23z" fill="currentColor" fillOpacity="0.2" />
                <circle cx="20" cy="19" r="4" fill="currentColor" fillOpacity="0.3" />
                <circle cx="32" cy="19" r="4" fill="currentColor" fillOpacity="0.3" />
                <circle cx="44" cy="19" r="4" fill="currentColor" fillOpacity="0.3" />
                <line x1="2" y1="29" x2="62" y2="29" strokeDasharray="3 2" />
              </svg>
              <span className="text-[7px] sm:text-[8px] font-mono text-purple-400/80">GAS CARRIER</span>
            </div>

          </div>

          <div className="font-mono font-bold text-xs sm:text-sm text-white tracking-wide">
            Diversified portfolio of projects
          </div>
          <div className="text-[10px] sm:text-[11px] font-sans text-slate-300">
            Helps spread investment exposure and enhances fund resilience
          </div>

          {/* Dashed connector line to verified savings on the right */}
          <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 w-3 border-t border-dashed border-emerald-400/60" />
        </motion.div>

        {/* Lower Right (4 cols): QUANTIFIED AND VERIFIED FUEL AND REGULATORY SAVINGS */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: anim.savings.delay, duration: anim.savings.duration }}
          className={`md:col-span-4 rounded-lg bg-gradient-to-br from-[#062624]/90 via-[#031719]/95 to-[#020b10] border border-emerald-400/40 flex flex-col justify-center relative shadow-[0_0_20px_rgba(16,185,129,0.15)] ${
            isPresentationMode ? 'p-2 sm:p-2.5' : 'p-3 sm:p-3.5'
          }`}
        >
          {/* Dashed line with upward arrow to Shipowners pay-as-you-save box */}
          <div className="hidden md:flex flex-col items-center absolute -top-5 left-1/2 -translate-x-1/2">
            <ArrowUp className="w-3 h-3 text-emerald-400 -mb-1" />
            <div className="w-px h-4 border-l border-dashed border-emerald-400/70" />
          </div>

          <div className="flex items-center gap-2.5">
            {/* Barrel + Coins Icon Graphic */}
            <div className="p-2 rounded-lg bg-emerald-500/15 border border-emerald-400/35 text-emerald-300 shrink-0">
              <div className="relative">
                <Fuel className="w-4 h-4 sm:w-5 sm:h-5" />
                <Coins className="w-3 h-3 absolute -bottom-1 -right-1 text-teal-200" />
              </div>
            </div>
            <div>
              <div className="text-[10px] sm:text-[11px] font-mono font-black text-white leading-tight uppercase">
                Quantified and verified fuel and regulatory savings
              </div>
              <div className="text-[8px] sm:text-[9px] font-mono text-emerald-300 mt-0.5">
                Feedback loop: powers pay-as-you-save payments
              </div>
              <div className="text-[7.5px] font-mono text-teal-400/80 tracking-wider mt-0.5">
                SAVINGS → VERIFICATION → REPAYMENT
              </div>
            </div>
          </div>
        </motion.div>

      </div>

      {/* ========================================================================= */}
      {/* 6. SOURCE PANEL & ATTRIBUTION (Sections 10, 11, 12) */}
      {/* ========================================================================= */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: anim.source.delay, duration: anim.source.duration }}
        className={`border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-mono ${
          isPresentationMode ? 'mt-2 pt-2' : 'mt-4 pt-3'
        }`}
      >
        {/* Source Details & Attribution */}
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-bold text-cyan-400 uppercase tracking-wider bg-cyan-950/70 px-1.5 py-0.2 rounded border border-cyan-500/40">
              SOURCE
            </span>
            <span className="text-white font-bold text-[11px] sm:text-xs">
              Global Centre for Maritime Decarbonisation (GCMD)
            </span>
            <SourceButton evidenceId="GCMD-001" />
          </div>
          <div className="text-[10px] sm:text-[11px] text-slate-300">
            Project FEET: <span className="text-white/90 font-medium">Fund for Energy Efficiency Technologies</span>
          </div>
          <div className="text-[8px] sm:text-[9px] text-white/50 italic">
            Source: Global Centre for Maritime Decarbonisation (GCMD), Project FEET • FEET — Fund for Energy Efficiency Technologies
          </div>
        </div>

        {/* Clickable VIEW ORIGINAL SOURCE Button */}
        <a
          href={GCMD_FEET_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 hover:text-white border border-cyan-500/40 hover:border-cyan-400 transition-all font-mono font-bold text-[11px] shadow-[0_0_15px_rgba(0,242,255,0.15)] group shrink-0"
        >
          <span>VIEW ORIGINAL SOURCE</span>
          <ExternalLink className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </motion.div>

    </div>
  );
};
