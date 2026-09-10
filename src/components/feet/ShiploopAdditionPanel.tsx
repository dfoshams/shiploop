import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Globe2, 
  Building2, 
  Sliders, 
  Activity, 
  FileCheck, 
  Check, 
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';
import { SHIPLOOP_ADDITION_LAYERS, ShiploopAdditionLayer } from '../../data/feetData';

interface ShiploopAdditionPanelProps {
  onExploreLayer?: (layerIndex: number) => void;
}

export const ShiploopAdditionPanel: React.FC<ShiploopAdditionPanelProps> = ({
  onExploreLayer
}) => {
  const [selectedLayerIndex, setSelectedLayerIndex] = useState<number>(0);

  const layerIcons = [
    Globe2,
    Building2,
    Sliders,
    Activity,
    FileCheck
  ];

  return (
    <div className="w-full rounded-xl bg-slate-900/85 border border-[#00F2FF]/30 p-6 sm:p-8 backdrop-blur-md relative overflow-hidden shadow-2xl">
      {/* Ambience Background */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-white/10 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
              VALUE EXTENSION MATRIX
            </span>
            <span className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-400/40 text-cyan-300 text-[10px] font-mono font-bold tracking-widest uppercase">
              5 OPERATIONAL LAYERS
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black font-mono text-white mt-1 tracking-tight">
            THE SHIPLOOP ADDITION
          </h3>
        </div>

        <div className="text-xs font-mono text-slate-400 max-w-sm text-left sm:text-right">
          Building on FEET's validated financing mechanism to deliver an actionable deployment infrastructure.
        </div>
      </div>

      {/* 5 Distinct Layer Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-6">
        {SHIPLOOP_ADDITION_LAYERS.map((layer, idx) => {
          const Icon = layerIcons[idx];
          const isSelected = selectedLayerIndex === idx;

          return (
            <motion.div
              key={layer.number}
              whileHover={{ y: -3 }}
              onClick={() => setSelectedLayerIndex(idx)}
              className={`cursor-pointer rounded-lg p-4 border transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-cyan-950/70 border-[#00F2FF] shadow-[0_0_20px_rgba(0,242,255,0.25)] ring-1 ring-[#00F2FF]/50'
                  : 'bg-slate-950/60 border-white/10 hover:border-cyan-500/40 hover:bg-slate-900/80'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-white/5 text-white/70 border border-white/10">
                    LAYER {layer.number}
                  </span>
                  <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded border ${
                    layer.badge === 'EVIDENCE LINK READY'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
                  }`}>
                    {layer.badge === 'EVIDENCE LINK READY' ? '[ EVIDENCE LINK READY ]' : '[ PROPOSED ]'}
                  </span>
                </div>

                <div className={`w-9 h-9 rounded-md flex items-center justify-center mb-2.5 ${
                  isSelected ? 'bg-[#00F2FF] text-slate-950' : 'bg-white/5 text-cyan-400'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>

                <div className="text-xs font-bold font-mono text-white mb-1 leading-snug">
                  {layer.title}
                </div>
              </div>

              <div className="text-[10px] font-mono text-white/50 pt-2 border-t border-white/10">
                {layer.headline}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Selected Layer Comprehensive Drill-Down Strip */}
      {(() => {
        const active = SHIPLOOP_ADDITION_LAYERS[selectedLayerIndex];
        const ActiveIcon = layerIcons[selectedLayerIndex];

        return (
          <div className="p-5 rounded-lg bg-slate-950/90 border border-cyan-500/40 relative overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 rounded bg-cyan-500/20 text-[#00F2FF] border border-cyan-400/40">
                    <ActiveIcon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-mono font-bold text-cyan-400 tracking-wider uppercase">
                    LAYER {active.number} • {active.title}
                  </span>
                  <span className={`text-[9px] font-mono px-2 py-0.5 rounded border font-extrabold ${
                    active.badge === 'EVIDENCE LINK READY'
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                      : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                  }`}>
                    {active.badge === 'EVIDENCE LINK READY' ? '[ EVIDENCE LINK READY ]' : `[ ${active.badge} ]`}
                  </span>
                </div>

                <h4 className="text-base sm:text-lg font-bold font-mono text-white mb-2">
                  {active.headline}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 font-mono leading-relaxed max-w-3xl">
                  {active.description}
                </p>
              </div>

              {/* Key Deliverables Pill List */}
              <div className="lg:w-80 p-3.5 rounded-md bg-slate-900/90 border border-white/10 space-y-2">
                <div className="text-[10px] font-mono text-white/50 uppercase tracking-widest font-bold">
                  DELIVERABLES & CAPABILITIES
                </div>
                {active.deliverables.map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs font-mono text-white/80">
                    <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

            </div>
          </div>
        );
      })()}

    </div>
  );
};
