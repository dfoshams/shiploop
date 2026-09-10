import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { PresentationSceneId, PresenterPreset, SceneDefinition } from './types';
import { PRESENTATION_SCENES, PRESENTER_PRESETS } from './presentationScenes';
import { SimulationParams, SimulationResult } from '../types';
import { DEMO_DATA } from '../data/demoData';
import { calculateSimulation } from '../logic/financialModel';
import { cinematicAudio } from '../utils/cinematicAudio';

interface PresentationContextType {
  currentSceneIndex: number;
  currentScene: SceneDefinition;
  totalScenes: number;
  isPaused: boolean;
  isPlaying: boolean;
  isPresentationMode: boolean;
  showEntryModal: boolean;
  showControlBar: boolean;
  isFullscreen: boolean;
  currentPreset: PresenterPreset;
  simParams: SimulationParams;
  simResult: SimulationResult;
  sceneTransitionKey: number;
  nextScene: () => void;
  prevScene: () => void;
  goToScene: (index: number) => void;
  togglePause: () => void;
  setPaused: (paused: boolean) => void;
  applyPreset: (preset: PresenterPreset) => void;
  updateSimParams: (params: SimulationParams) => void;
  restartPresentation: () => void;
  restartCurrentScene: () => void;
  enterPresentationMode: (startAtSectionId?: string) => void;
  exitPresentationMode: () => void;
  startPresentationFromModal: () => void;
  toggleFullscreen: () => void;
  notifyUserActivity: () => void;
}

const PresentationContext = createContext<PresentationContextType | undefined>(undefined);

export const PresentationProvider: React.FC<{
  children: React.ReactNode;
  initialMode?: boolean;
  onExitToExplore?: (sectionId: string) => void;
}> = ({ children, initialMode = false, onExitToExplore }) => {
  const [isPresentationMode, setIsPresentationMode] = useState<boolean>(initialMode);
  const [showEntryModal, setShowEntryModal] = useState<boolean>(false);
  const [currentSceneIndex, setCurrentSceneIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [showControlBar, setShowControlBar] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [currentPreset, setCurrentPreset] = useState<PresenterPreset>('BASE');
  const [simParams, setSimParams] = useState<SimulationParams>(DEMO_DATA.defaultSimulationParams);
  const [sceneTransitionKey, setSceneTransitionKey] = useState<number>(0);

  const controlBarTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Live real-time financial simulation calculations
  const simResult = calculateSimulation(simParams);
  const currentScene = PRESENTATION_SCENES[currentSceneIndex] || PRESENTATION_SCENES[0];
  const totalScenes = PRESENTATION_SCENES.length;

  // Auto-hide control bar after 2.5s of inactivity
  const notifyUserActivity = useCallback(() => {
    setShowControlBar(true);
    if (controlBarTimerRef.current) {
      clearTimeout(controlBarTimerRef.current);
    }
    controlBarTimerRef.current = setTimeout(() => {
      setShowControlBar(false);
    }, 2800);
  }, []);

  // Track fullscreen changes from browser
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Safe Fullscreen toggle
  const toggleFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        if (document.documentElement.requestFullscreen) {
          await document.documentElement.requestFullscreen();
          setIsFullscreen(true);
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
          setIsFullscreen(false);
        }
      }
    } catch {
      // Browser blocked or denied fullscreen permission gracefully
    }
  }, []);

  // Preset Scenario switcher
  const applyPreset = useCallback((preset: PresenterPreset) => {
    const p = PRESENTER_PRESETS[preset];
    if (!p) return;
    setCurrentPreset(preset);
    setSimParams((prev) => ({
      ...prev,
      efficiencyImprovementPercent: p.efficiency,
      fuelPricePerTonneINR: p.fuelPrice,
      operatingDays: p.operatingDays,
      retrofitCostINR: p.retrofitCost,
      scenario: preset === 'CONSERVATIVE' ? 'CONSERVATIVE' : preset === 'OPTIMISTIC' ? 'OPTIMISTIC' : 'BASE',
    }));
    cinematicAudio.playTransitionChime(560);
  }, []);

  const updateSimParams = useCallback((params: SimulationParams) => {
    setSimParams(params);
  }, []);

  // Scene Navigation
  const goToScene = useCallback((index: number) => {
    if (index < 0 || index >= PRESENTATION_SCENES.length) return;
    setCurrentSceneIndex(index);
    setSceneTransitionKey((k) => k + 1);
    setIsPaused(false);
    cinematicAudio.playTransitionChime(420 + index * 25);
    notifyUserActivity();
  }, [notifyUserActivity]);

  const nextScene = useCallback(() => {
    setCurrentSceneIndex((prev) => {
      if (prev < PRESENTATION_SCENES.length - 1) {
        const next = prev + 1;
        setSceneTransitionKey((k) => k + 1);
        setIsPaused(false);
        cinematicAudio.playTransitionChime(420 + next * 25);
        return next;
      }
      return prev;
    });
    notifyUserActivity();
  }, [notifyUserActivity]);

  const prevScene = useCallback(() => {
    setCurrentSceneIndex((prev) => {
      if (prev > 0) {
        const next = prev - 1;
        setSceneTransitionKey((k) => k + 1);
        setIsPaused(false);
        cinematicAudio.playTransitionChime(400);
        return next;
      }
      return prev;
    });
    notifyUserActivity();
  }, [notifyUserActivity]);

  const togglePause = useCallback(() => {
    setIsPaused((prev) => !prev);
    notifyUserActivity();
  }, [notifyUserActivity]);

  const setPaused = useCallback((paused: boolean) => {
    setIsPaused(paused);
    notifyUserActivity();
  }, [notifyUserActivity]);

  const restartCurrentScene = useCallback(() => {
    setSceneTransitionKey((k) => k + 1);
    setIsPaused(false);
    cinematicAudio.playTransitionChime(480);
    notifyUserActivity();
  }, [notifyUserActivity]);

  const restartPresentation = useCallback(() => {
    setCurrentSceneIndex(0);
    setSceneTransitionKey((k) => k + 1);
    setIsPaused(false);
    setCurrentPreset('BASE');
    setSimParams(DEMO_DATA.defaultSimulationParams);
    cinematicAudio.playTransitionChime(520);
    notifyUserActivity();
  }, [notifyUserActivity]);

  const enterPresentationMode = useCallback((startAtSectionId?: string) => {
    // If a section ID is provided, map it to the corresponding presentation scene
    if (startAtSectionId) {
      const matchIndex = PRESENTATION_SCENES.findIndex((s) => s.sectionIdInExploreMode === startAtSectionId);
      if (matchIndex !== -1) {
        setCurrentSceneIndex(matchIndex);
      }
    }
    setIsPresentationMode(true);
    setShowEntryModal(false);
    setSceneTransitionKey((k) => k + 1);
    setIsPaused(false);
    notifyUserActivity();
  }, [notifyUserActivity]);

  const exitPresentationMode = useCallback(() => {
    setIsPresentationMode(false);
    setShowEntryModal(false);
    if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
    }
    if (onExitToExplore) {
      const currentSection = PRESENTATION_SCENES[currentSceneIndex]?.sectionIdInExploreMode || 'intro';
      onExitToExplore(currentSection);
    }
  }, [currentSceneIndex, onExitToExplore]);

  const startPresentationFromModal = useCallback(() => {
    setShowEntryModal(false);
    notifyUserActivity();
  }, [notifyUserActivity]);

  // Global Keyboard Navigation in Presentation Mode
  useEffect(() => {
    if (!isPresentationMode) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if typing in an input
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      // If entry modal is open, Enter or Space starts the presentation
      if (showEntryModal) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          startPresentationFromModal();
        } else if (e.key === 'Escape') {
          exitPresentationMode();
        }
        return;
      }

      switch (e.key) {
        case 'ArrowRight':
        case 'PageDown':
          e.preventDefault();
          nextScene();
          break;
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault();
          prevScene();
          break;
        case ' ':
          e.preventDefault();
          togglePause();
          break;
        case 'r':
        case 'R':
          if (e.shiftKey) {
            restartPresentation();
          } else {
            restartCurrentScene();
          }
          break;
        case 'Home':
          e.preventDefault();
          goToScene(0);
          break;
        case 'End':
          e.preventDefault();
          goToScene(PRESENTATION_SCENES.length - 1);
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 'Escape':
          e.preventDefault();
          exitPresentationMode();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    isPresentationMode, 
    showEntryModal, 
    nextScene, 
    prevScene, 
    togglePause, 
    restartCurrentScene, 
    restartPresentation, 
    goToScene, 
    toggleFullscreen, 
    exitPresentationMode, 
    startPresentationFromModal
  ]);

  return (
    <PresentationContext.Provider
      value={{
        currentSceneIndex,
        currentScene,
        totalScenes,
        isPaused,
        isPlaying,
        isPresentationMode,
        showEntryModal,
        showControlBar,
        isFullscreen,
        currentPreset,
        simParams,
        simResult,
        sceneTransitionKey,
        nextScene,
        prevScene,
        goToScene,
        togglePause,
        setPaused,
        applyPreset,
        updateSimParams,
        restartPresentation,
        restartCurrentScene,
        enterPresentationMode,
        exitPresentationMode,
        startPresentationFromModal,
        toggleFullscreen,
        notifyUserActivity,
      }}
    >
      {children}
    </PresentationContext.Provider>
  );
};

export const usePresentation = () => {
  const context = useContext(PresentationContext);
  if (!context) {
    throw new Error('usePresentation must be used within a PresentationProvider');
  }
  return context;
};
