import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Coins, 
  Wrench, 
  TrendingDown, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Layers,
  FileCheck
} from 'lucide-react';
import { FEET_MECHANISM_STEPS } from '../../data/feetData';

interface FeetMechanismVisualProps {
  isPresentationMode?: boolean;
}

export const FeetMechanismVisual: React.FC<FeetMechanismVisualProps> = ({
  isPresentationMode = false
}) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const stepIcons = [
    Coins,
    Wrench,
    TrendingDown,
    ShieldCheck,
    ArrowRight,
    CheckCircle2
  ];

  return (
    <div className="w-full rounded-xl bg-slate-900/80 border border-emerald-500/30 p-6 sm:p-8 backdrop-blur-md relative overflow-hidden shadow-xl">
      {/* Background Tech Highlights */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      
      {/* Header with Verified Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
              FEET OPERATIONAL PROTOCOL
            </span>
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 text-[10px] font-mono font-bold tracking-widest uppercase">
              [ VERIFIED PROGRAM STRUCTURE ]
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-mono text-white mt-1">
            THE 6-STEP PAY-AS-YOU-SAVE MECHANISM
          </h3>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-white/50">
          <Layers className="w-3.5 h-3.5 text-emerald-400" />
          <span>REAL-WORLD CLOSED-LOOP FLOW</span>
        </div>
      </div>

      {/* Visual Step Sequence Horizontal on Desktop / Vertical on Mobile */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-3 relative">
        {FEET_MECHANISM_STEPS.map((step, idx) => {
          const Icon = stepIcons[idx];
          const isSelected = activeStep === idx;

          return (
            <motion.div
              key={step.step}
              onClick={() => setActiveStep(idx)}
              whileHover={{ y: -3 }}
              className={`cursor-pointer rounded-lg p-4 transition-all duration-200 flex flex-col justify-between relative border ${
                isSelected
                  ? 'bg-emerald-950/70 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)] ring-1 ring-emerald-400/50'
                  : 'bg-slate-950/60 border-white/10 hover:border-emerald-500/40 hover:bg-slate-900/80'
              }`}
            >
              {/* Connector arrow between steps (hidden on mobile and last step) */}
              {idx < 5 && (
                <div className="hidden md:block absolute -right-3.5 top-1/2 -translate-y-1/2 z-20 text-emerald-400/60">
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}

              <div>
                {/* Step number and badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-white/5 text-white/70 border border-white/10">
                    {step.step}
                  </span>
                  <span className="text-[9px] font-mono text-emerald-400 font-semibold">
                    VERIFIED
                  </span>
                </div>

                {/* Step Icon */}
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-colors ${
                  isSelected ? 'bg-emerald-500 text-slate-950 shadow-[0_0_12px_rgba(16,185,129,0.5)]' : 'bg-slate-800 text-emerald-400 border border-emerald-500/20'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>

                {/* Step Label & Title */}
                <div className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold mb-1">
                  {step.label}
                </div>
                <div className="text-xs font-bold text-white font-mono leading-snug">
                  {step.title}
                </div>
              </div>

              {/* Step Detail Snippet */}
              <div className="mt-3 pt-2.5 border-t border-white/10 text-[11px] text-slate-300 font-mono leading-relaxed line-clamp-3">
                {step.detail}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Step Focus Detail Strip */}
      <div className="mt-6 p-4 rounded-lg bg-slate-950/90 border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <FileCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold">
                PHASE {FEET_MECHANISM_STEPS[activeStep].step} DETAIL
              </span>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-white/10 text-white/60 font-mono">
                [ VERIFIED PROGRAM STRUCTURE ]
              </span>
            </div>
            <div className="text-sm font-mono text-white font-bold">
              {FEET_MECHANISM_STEPS[activeStep].title}: {FEET_MECHANISM_STEPS[activeStep].detail}
            </div>
          </div>
        </div>

        <div className="text-right text-[10px] font-mono text-white/50 shrink-0">
          CLICK ANY STEP TO EXAMINE
        </div>
      </div>
    </div>
  );
};
