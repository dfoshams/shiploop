import React from 'react';
import { Play, Maximize, Monitor, Sparkles, X } from 'lucide-react';
import { usePresentation } from './PresentationContext';

export const PresentationEntryModal: React.FC = () => {
  const { 
    startPresentationFromModal, 
    exitPresentationMode, 
    toggleFullscreen, 
    isFullscreen 
  } = usePresentation();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 animate-fadeIn select-none">
      <div className="relative w-full max-w-xl bg-[#020617] border border-[#00F2FF]/40 shadow-[0_0_60px_rgba(0,242,255,0.25)] tech-corner-accent p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={exitPresentationMode}
          className="absolute top-4 right-4 p-2 text-white/50 hover:text-white hover:bg-white/10 transition-colors"
          title="Exit to Exploration Mode (Esc)"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Branding */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 border border-[#00F2FF] rotate-45 flex items-center justify-center bg-[#00F2FF]/10">
            <div className="w-4 h-4 bg-[#00F2FF] -rotate-45 flex items-center justify-center">
              <span className="w-1 h-1 bg-black rounded-full" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black tracking-widest text-white font-mono">
                SHIP<span className="text-[#00F2FF]">LOOP</span>
              </h1>
              <span className="px-2 py-0.5 rounded bg-[#00F2FF]/15 text-[#00F2FF] text-xs font-mono font-bold border border-[#00F2FF]/40 tracking-wider">
                LIVE STAGE
              </span>
            </div>
            <h2 className="text-xs font-mono tracking-widest text-white/60 uppercase mt-0.5">
              PRESENTER-CONTROLLED MODE • 16:9 PROJECTION
            </h2>
          </div>
        </div>

        {/* Projector Notice */}
        <div className="p-3.5 bg-white/[0.03] border border-white/10 mb-6 font-mono text-xs text-white/70 leading-relaxed">
          <div className="flex items-center gap-2 text-[#00F2FF] font-bold mb-1 uppercase tracking-wider">
            <Monitor className="w-4 h-4" />
            <span>PROJECTOR OPTIMIZATION ACTIVE</span>
          </div>
          <p>
            Viewport is locked to 16:9 ratio with zero scrolling. Slides hold state indefinitely until you advance. High-contrast typography designed for 3–10m audience readability.
          </p>
        </div>

        {/* Keyboard Shortcuts Guide */}
        <div className="space-y-2 mb-8 font-mono">
          <div className="text-[11px] text-white/40 tracking-widest uppercase font-bold mb-2">
            PRESENTER HARDWARE & KEYBOARD SHORTCUTS
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center justify-between p-2 bg-[#020617] border border-white/10">
              <span className="text-white/60">Navigate Scenes</span>
              <span className="px-2 py-0.5 bg-white/10 text-[#00F2FF] font-bold border border-white/20">
                ← →
              </span>
            </div>

            <div className="flex items-center justify-between p-2 bg-[#020617] border border-white/10">
              <span className="text-white/60">Pause / Resume</span>
              <span className="px-2 py-0.5 bg-white/10 text-[#00F2FF] font-bold border border-white/20">
                SPACE
              </span>
            </div>

            <div className="flex items-center justify-between p-2 bg-[#020617] border border-white/10">
              <span className="text-white/60">Restart Section</span>
              <span className="px-2 py-0.5 bg-white/10 text-[#FFB347] font-bold border border-white/20">
                R
              </span>
            </div>

            <div className="flex items-center justify-between p-2 bg-[#020617] border border-white/10">
              <span className="text-white/60">Exit Stage</span>
              <span className="px-2 py-0.5 bg-white/10 text-rose-400 font-bold border border-white/20">
                ESC
              </span>
            </div>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={startPresentationFromModal}
            className="w-full sm:flex-1 py-3.5 px-6 bg-[#00F2FF] hover:bg-[#00F2FF]/90 text-black font-mono font-black text-sm tracking-wider uppercase transition-all shadow-[0_0_25px_rgba(0,242,255,0.4)] flex items-center justify-center gap-2 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-black" />
            <span>START PRESENTATION →</span>
          </button>

          <button
            onClick={toggleFullscreen}
            className="w-full sm:w-auto py-3.5 px-5 bg-white/5 hover:bg-white/10 text-white border border-white/20 hover:border-[#00F2FF]/50 font-mono text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer"
            title="Toggle Browser Fullscreen"
          >
            <Maximize className="w-4 h-4 text-[#00F2FF]" />
            <span>{isFullscreen ? 'WINDOWED' : 'FULLSCREEN'}</span>
          </button>
        </div>

        <div className="mt-4 text-center">
          <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
            Press [Enter] to start immediately • Click canvas to advance
          </span>
        </div>

      </div>
    </div>
  );
};
