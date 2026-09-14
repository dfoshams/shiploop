import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePresentation } from './PresentationContext';
import { ChapterTransitionBadge } from './ChapterTransitionBadge';
import { PresentationControls } from './PresentationControls';
import { PresentationEntryModal } from './PresentationEntryModal';
import { PresentationProgress } from './PresentationProgress';
import { CinematicIntro } from '../components/CinematicIntro';
import { TheProblem } from '../components/TheProblem';
import { TheInsight } from '../components/TheInsight';
import { LoopEngine } from '../components/LoopEngine';
import { VesselSimulator } from '../components/VesselSimulator';
import { FinancialWaterfall } from '../components/FinancialWaterfall';
import { CharterSimulator } from '../components/CharterSimulator';
import { VerificationLayer } from '../components/VerificationLayer';
import { FeetBenchmark } from '../components/FeetBenchmark';
import { RiskLab } from '../components/RiskLab';
import { GlobalAndIndia } from '../components/GlobalAndIndia';
import { ScaleSimulator } from '../components/ScaleSimulator';
import { AhaAndFinalCTA } from '../components/AhaAndFinalCTA';
import { Maximize, Minimize, Compass, BookOpen } from 'lucide-react';

interface PresentationStageProps {
  onOpenSources?: () => void;
}

export const PresentationStage: React.FC<PresentationStageProps> = ({ onOpenSources }) => {
  const { 
    currentSceneIndex, 
    currentScene, 
    showEntryModal, 
    nextScene, 
    goToScene,
    notifyUserActivity,
    exitPresentationMode,
    toggleFullscreen,
    isFullscreen,
    sceneTransitionKey,
    isPaused,
    simParams,
    updateSimParams,
    simResult
  } = usePresentation();

  // Clock for presenter live session awareness
  const [timeStr, setTimeStr] = useState('');
  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      setTimeStr(d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Render Scene matching current index using the SAME animated Remix 2 components
  const renderCurrentScene = () => {
    switch (currentSceneIndex) {
      case 0:
        return (
          <CinematicIntro 
            isPresentationMode={true} 
            replayTrigger={sceneTransitionKey} 
            isPaused={isPaused} 
          />
        );
      case 1:
        return (
          <TheProblem 
            isPresentationMode={true} 
            replayTrigger={sceneTransitionKey} 
            isPaused={isPaused} 
          />
        );
      case 2:
        return (
          <TheInsight 
            isPresentationMode={true} 
            replayTrigger={sceneTransitionKey} 
            isPaused={isPaused} 
          />
        );
      case 3:
        return (
          <LoopEngine 
            isPresentationMode={true} 
            replayTrigger={sceneTransitionKey} 
            isPaused={isPaused} 
          />
        );
      case 4:
        return (
          <VesselSimulator 
            params={simParams} 
            onParamsChange={updateSimParams} 
            result={simResult} 
            isPresentationMode={true} 
            replayTrigger={sceneTransitionKey} 
            isPaused={isPaused} 
          />
        );
      case 5:
        return (
          <FinancialWaterfall 
            params={simParams} 
            onParamsChange={updateSimParams} 
            result={simResult} 
            isPresentationMode={true} 
            replayTrigger={sceneTransitionKey} 
            isPaused={isPaused} 
          />
        );
      case 6:
        return (
          <CharterSimulator 
            params={simParams} 
            onParamsChange={updateSimParams} 
            result={simResult} 
            isPresentationMode={true} 
            replayTrigger={sceneTransitionKey} 
            isPaused={isPaused} 
          />
        );
      case 7:
        return (
          <VerificationLayer 
            params={simParams} 
            result={simResult} 
            isPresentationMode={true} 
            replayTrigger={sceneTransitionKey} 
            isPaused={isPaused} 
          />
        );
      case 8:
        return (
          <FeetBenchmark 
            isPresentationMode={true} 
            replayTrigger={sceneTransitionKey} 
            isPaused={isPaused} 
          />
        );
      case 9:
        return (
          <RiskLab 
            params={simParams} 
            isPresentationMode={true} 
            replayTrigger={sceneTransitionKey} 
            isPaused={isPaused} 
          />
        );
      case 10:
        return (
          <GlobalAndIndia 
            isPresentationMode={true} 
            replayTrigger={sceneTransitionKey} 
            isPaused={isPaused} 
          />
        );
      case 11:
        return (
          <ScaleSimulator 
            baseParams={simParams} 
            baseResult={simResult} 
            isPresentationMode={true} 
            replayTrigger={sceneTransitionKey} 
            isPaused={isPaused} 
          />
        );
      case 12:
        return (
          <AhaAndFinalCTA 
            onGoToSimulator={() => goToScene(4)} 
            onGoToEngine={() => goToScene(3)} 
            onRestart={() => goToScene(0)} 
            onOpenSources={onOpenSources || (() => {})} 
            isPresentationMode={true} 
            replayTrigger={sceneTransitionKey} 
            isPaused={isPaused} 
          />
        );
      default:
        return (
          <CinematicIntro 
            isPresentationMode={true} 
            replayTrigger={sceneTransitionKey} 
            isPaused={isPaused} 
          />
        );
    }
  };

  return (
    <div 
      id="presentation-stage"
      onMouseMove={notifyUserActivity}
      onClick={(e) => {
        // Only click-to-advance if not clicking an interactive element (button, input, slider, etc.)
        const target = e.target as HTMLElement;
        if (target.closest('button, input, textarea, select, a, [role="button"], .interactive-element')) {
          return;
        }
        if (!showEntryModal) {
          nextScene();
        }
      }}
      className="fixed inset-0 w-screen h-[100dvh] overflow-hidden select-none bg-[#020617] text-[#E2E8F0] font-sans z-50 flex flex-col justify-between"
    >
      {/* Background Matrix Grid */}
      <div className="absolute inset-0 tech-grid-bg opacity-30 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020617]/50 to-[#020617] pointer-events-none" />

      {/* Top Discreet HUD Bar */}
      <header 
        onClick={(e) => e.stopPropagation()} // Stop advance when clicking top HUD
        className="relative z-30 w-full px-6 py-3 border-b border-white/10 bg-[#020617]/90 backdrop-blur-md flex items-center justify-between font-mono text-xs"
      >
        {/* Brand & Stage Tag */}
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border border-[#00F2FF] rotate-45 flex items-center justify-center">
            <div className="w-2 h-2 bg-[#00F2FF]" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold tracking-widest text-white text-sm">
              SHIP<span className="text-[#00F2FF]">LOOP</span>
            </span>
            <span className="hidden sm:inline-block px-1.5 py-0.5 bg-[#00F2FF]/10 text-[#00F2FF] text-[9px] font-bold border border-[#00F2FF]/40 uppercase tracking-widest">
              STAGE
            </span>
          </div>
        </div>

        {/* Center: Current Chapter & Scene Tag */}
        <div className="hidden md:flex items-center gap-2 text-white/60">
          <span className="text-[#00F2FF] font-bold uppercase">
            CH {currentScene.chapterNumber}
          </span>
          <span className="text-white/30">•</span>
          <span className="text-white font-bold uppercase tracking-wider truncate max-w-sm">
            {currentScene.sceneTitle}
          </span>
        </div>

        {/* Right: Progress, Clock, Fullscreen & Exploration Mode Exit */}
        <div className="flex items-center gap-4">
          <PresentationProgress />

          <div className="hidden lg:block text-white/40 font-mono text-[11px] border-l border-white/10 pl-3">
            {timeStr}
          </div>

          <button
            onClick={() => onOpenSources?.()}
            className="hidden sm:flex items-center gap-1.5 px-2 py-1 bg-white/5 hover:bg-white/10 text-white/80 hover:text-[#00F2FF] border border-white/20 text-[10px] font-bold tracking-wider uppercase transition-all cursor-pointer"
            title="Open Evidence & Sources Drawer"
          >
            <BookOpen className="w-3 h-3 text-[#00F2FF]" />
            <span>SOURCES</span>
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-1.5 text-white/60 hover:text-[#00F2FF] transition-colors"
            title="Toggle Fullscreen (F)"
          >
            {isFullscreen ? <Minimize className="w-3.5 h-3.5" /> : <Maximize className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={exitPresentationMode}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/20 text-[10px] font-bold tracking-wider uppercase transition-all"
            title="Switch to Exploration Mode (Esc)"
          >
            <Compass className="w-3 h-3 text-[#00F2FF]" />
            <span className="hidden sm:inline">EXPLORATION</span>
          </button>
        </div>
      </header>

      {/* Main 16:9 Presentation Scene Canvas */}
      <main className="relative z-20 flex-1 w-full flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={sceneTransitionKey}
            initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="w-full h-full flex items-center justify-center"
          >
            {renderCurrentScene()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Subtle Auto-hiding Presenter Controls at Bottom */}
      <PresentationControls />

      {/* Brief Chapter Splash Badge during transitions */}
      <ChapterTransitionBadge />

      {/* Entry Modal Overlay (if requested on entrance) */}
      {showEntryModal && <PresentationEntryModal />}
    </div>
  );
};
