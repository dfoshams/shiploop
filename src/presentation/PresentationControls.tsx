import React from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Pause, 
  Play, 
  RotateCcw, 
  RotateCw, 
  Maximize, 
  Minimize, 
  X, 
  Sliders,
  Sparkles
} from 'lucide-react';
import { usePresentation } from './PresentationContext';
import { PresentationProgress } from './PresentationProgress';

export const PresentationControls: React.FC = () => {
  const { 
    currentSceneIndex, 
    totalScenes, 
    currentScene,
    isPaused, 
    showControlBar,
    nextScene, 
    prevScene, 
    togglePause, 
    restartCurrentScene, 
    restartPresentation,
    exitPresentationMode, 
    toggleFullscreen, 
    isFullscreen,
    notifyUserActivity
  } = usePresentation();

  return (
    <div 
      onMouseEnter={notifyUserActivity}
      onClick={(e) => e.stopPropagation()} // Prevent click-to-advance when clicking the bar
      className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-40 transition-all duration-300 ease-out select-none ${
        showControlBar 
          ? 'opacity-100 translate-y-0 pointer-events-auto' 
          : 'opacity-0 translate-y-6 pointer-events-none'
      }`}
    >
      <div className="flex items-center gap-2 sm:gap-4 px-3 sm:px-5 py-2 bg-[#020617]/95 border border-[#00F2FF]/40 shadow-[0_0_35px_rgba(0,242,255,0.3)] backdrop-blur-xl tech-corner-accent text-white font-mono text-xs">
        
        {/* Previous Button */}
        <button
          onClick={prevScene}
          disabled={currentSceneIndex === 0}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-white/5 text-white border border-white/10 hover:border-[#00F2FF]/40 transition-all uppercase tracking-wider"
          title="Previous Scene (← or PageUp)"
        >
          <ChevronLeft className="w-3.5 h-3.5 text-[#00F2FF]" />
          <span className="hidden sm:inline">PREVIOUS</span>
        </button>

        {/* Scene Chapter & Progress Indicator */}
        <div className="flex items-center gap-3 px-2 border-x border-white/10">
          <PresentationProgress />
          <span className="hidden lg:inline text-[10px] text-white/50 uppercase tracking-widest max-w-[200px] truncate">
            {currentScene.chapterTitle}
          </span>
        </div>

        {/* Next Button */}
        <button
          onClick={nextScene}
          disabled={currentSceneIndex === totalScenes - 1}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#00F2FF]/15 hover:bg-[#00F2FF]/25 disabled:opacity-30 text-[#00F2FF] border border-[#00F2FF]/40 transition-all font-bold uppercase tracking-wider shadow-[0_0_12px_rgba(0,242,255,0.2)]"
          title="Next Scene (→ or PageDown)"
        >
          <span className="hidden sm:inline">NEXT</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>

        <div className="h-4 w-px bg-white/20 hidden sm:block" />

        {/* Action Controls: Pause / Replay / Restart / Fullscreen / Exit */}
        <div className="flex items-center gap-1.5">
          {/* Pause / Resume */}
          <button
            onClick={togglePause}
            className={`p-1.5 rounded-xs border transition-all ${
              isPaused 
                ? 'bg-[#FFB347]/20 border-[#FFB347] text-[#FFB347]' 
                : 'bg-white/5 border-white/10 text-white/70 hover:text-white hover:bg-white/10'
            }`}
            title={isPaused ? 'Resume Animation (Space)' : 'Pause Animation (Space)'}
          >
            {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
          </button>

          {/* Replay Scene */}
          <button
            onClick={restartCurrentScene}
            className="p-1.5 rounded-xs bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all"
            title="Restart Scene (R)"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#00F2FF]" />
          </button>

          {/* Fullscreen */}
          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded-xs bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all hidden sm:block"
            title="Toggle Fullscreen (F)"
          >
            {isFullscreen ? <Minimize className="w-3.5 h-3.5" /> : <Maximize className="w-3.5 h-3.5" />}
          </button>

          {/* Exit Presentation */}
          <button
            onClick={exitPresentationMode}
            className="flex items-center gap-1 px-2.5 py-1 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[11px] font-bold tracking-wider transition-all uppercase"
            title="Exit Presentation Mode (Esc)"
          >
            <X className="w-3.5 h-3.5" />
            <span className="hidden md:inline">EXIT (ESC)</span>
          </button>
        </div>

      </div>
    </div>
  );
};
