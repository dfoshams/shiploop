import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { CinematicIntro } from './components/CinematicIntro';
import { TheProblem } from './components/TheProblem';
import { TheInsight } from './components/TheInsight';
import { LoopEngine } from './components/LoopEngine';
import { VesselSimulator } from './components/VesselSimulator';
import { FinancialWaterfall } from './components/FinancialWaterfall';
import { CharterSimulator } from './components/CharterSimulator';
import { VerificationLayer } from './components/VerificationLayer';
import { FeetBenchmark } from './components/FeetBenchmark';
import { RiskLab } from './components/RiskLab';
import { GlobalAndIndia } from './components/GlobalAndIndia';
import { EcosystemAndBusiness } from './components/EcosystemAndBusiness';
import { ScaleSimulator } from './components/ScaleSimulator';
import { AhaAndFinalCTA } from './components/AhaAndFinalCTA';
import { SourceDrawer } from './components/SourceDrawer';
import { DEMO_DATA } from './data/demoData';
import { SimulationParams } from './types';
import { calculateSimulation } from './logic/financialModel';
import { PresentationProvider, usePresentation } from './presentation/PresentationContext';
import { PresentationStage } from './presentation/PresentationStage';

function MainAppContent() {
  const [params, setParams] = useState<SimulationParams>(DEMO_DATA.defaultSimulationParams);
  const [activeSection, setActiveSection] = useState<string>('intro');
  const [isSourcesOpen, setIsSourcesOpen] = useState<boolean>(false);

  const { 
    isPresentationMode, 
    enterPresentationMode 
  } = usePresentation();

  // Live real-time financial simulation calculations
  const result = calculateSimulation(params);

  // Smooth scroll helper for Exploration Mode
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
    }
  };

  // Keyboard shortcut listener for Exploration Mode
  useEffect(() => {
    if (isPresentationMode) return; // In presentation mode, keyboard is handled by PresentationContext

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key === '1') {
        scrollToSection('problem');
      } else if (e.key === '2') {
        scrollToSection('engine');
      } else if (e.key === '3') {
        scrollToSection('simulator');
      } else if (e.key === '4') {
        scrollToSection('verification');
      } else if (e.key === '5') {
        scrollToSection('risk');
      } else if (e.key === '6') {
        scrollToSection('india');
      } else if (e.key === '7') {
        scrollToSection('scale');
      } else if (e.key.toLowerCase() === 'p') {
        enterPresentationMode(activeSection);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPresentationMode, activeSection, enterPresentationMode]);

  // Track active section on scroll in Exploration Mode
  useEffect(() => {
    if (isPresentationMode) return;

    const sectionIds = [
      'intro',
      'problem',
      'insight',
      'engine',
      'simulator',
      'waterfall',
      'charter',
      'verification',
      'feet',
      'risk',
      'india',
      'ecosystem',
      'scale',
      'aha-cta',
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isPresentationMode]);

  // -------------------------------------------------------------
  // MODE A: PRESENTATION MODE (16:9 Presentation Stage, Zero Scrolling)
  // -------------------------------------------------------------
  if (isPresentationMode) {
    return (
      <>
        <PresentationStage onOpenSources={() => setIsSourcesOpen(true)} />
        <SourceDrawer
          isOpen={isSourcesOpen}
          onClose={() => setIsSourcesOpen(false)}
        />
      </>
    );
  }

  // -------------------------------------------------------------
  // MODE B: EXPLORATION MODE (Normal Interactive Scrolling Website)
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#020617] text-[#E2E8F0] selection:bg-[#00F2FF]/30 antialiased font-sans relative">
      {/* Ambient Technical Data Grid Matrix Background */}
      <div className="fixed inset-0 tech-grid-bg opacity-30 pointer-events-none z-0" />
      
      {/* Top Floating Navigation */}
      <Navbar
        activeSection={activeSection}
        onNavigate={scrollToSection}
        isPresentationMode={false}
        onTogglePresentationMode={() => enterPresentationMode(activeSection)}
        onOpenSources={() => setIsSourcesOpen(true)}
      />

      {/* Main Experience Flow */}
      <main className="relative z-10">
        
        {/* Section 00: Cinematic Intro */}
        <div id="intro">
          <CinematicIntro
            onExplore={() => scrollToSection('problem')}
            onGoToSimulator={() => scrollToSection('simulator')}
          />
        </div>

        {/* Section 01: The Problem */}
        <TheProblem />

        {/* Section 02: The Insight */}
        <TheInsight />

        {/* Section 03: The Signature SHIPLOOP Engine */}
        <LoopEngine />

        {/* Section 04: Live Vessel Simulator */}
        <VesselSimulator
          params={params}
          onParamsChange={setParams}
          result={result}
        />

        {/* Section 05: Financial Waterfall */}
        <FinancialWaterfall
          params={params}
          onParamsChange={setParams}
          result={result}
        />

        {/* Section 06: Charter Mode (Split Incentive) */}
        <CharterSimulator
          params={params}
          onParamsChange={setParams}
          result={result}
        />

        {/* Section 07: Verification Layer & Oracle */}
        <VerificationLayer
          params={params}
          result={result}
        />

        {/* Section 08: Chapter 08 - FEET Benchmark (Real-World Benchmark) */}
        <FeetBenchmark />

        {/* Section 09: Risk Lab (Stress-Testing Terminal) */}
        <RiskLab params={params} />

        {/* Section 09: Global Proof & Indian Maritime Opportunity */}
        <GlobalAndIndia />

        {/* Section 10: Multi-Stakeholder Ecosystem & Business Model */}
        <EcosystemAndBusiness />

        {/* Section 11: Fleet Scale Simulator */}
        <ScaleSimulator
          baseParams={params}
          baseResult={result}
        />

        {/* Section 12: The "Aha" Screen & Final CTA */}
        <AhaAndFinalCTA
          onGoToSimulator={() => scrollToSection('simulator')}
          onGoToEngine={() => scrollToSection('engine')}
          onRestart={() => scrollToSection('intro')}
          onOpenSources={() => setIsSourcesOpen(true)}
        />
      </main>

      {/* Slide-out Research Sources Drawer */}
      <SourceDrawer
        isOpen={isSourcesOpen}
        onClose={() => setIsSourcesOpen(false)}
      />

      {/* Technical Data Grid Telemetry Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-[#020617]/95 backdrop-blur-md py-6 px-4 sm:px-8 text-[11px] font-mono tracking-wider text-white/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 border border-[#00F2FF] rotate-45 flex items-center justify-center">
                <div className="w-1 h-1 bg-[#00F2FF]"></div>
              </div>
              <span className="text-white font-bold tracking-tight">SHIPLOOP</span>
              <span className="text-[#00F2FF] text-[10px]">STAGE_v2.0_LIVE</span>
            </div>
            <div className="hidden lg:flex items-center gap-2 border-l border-white/10 pl-6">
              <span className="text-white/40">INDIA_MARITIME_OPS:</span>
              <span className="text-white/80 font-bold">JNPT_MUMBAI / CSL_COCHIN</span>
            </div>
            <div className="flex items-center gap-2 border-l border-white/10 pl-4 sm:pl-6">
              <span className="text-white/40">FEED_STATUS:</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                LIVE_SENSORS
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-3">
              <span className="text-[#FFB347] text-[10px] tracking-widest">GLOBAL_SIGNAL: FEET_RESEARCH</span>
              <div className="w-20 h-2 bg-white/10 border border-white/20 overflow-hidden">
                <div className="h-full bg-[#00F2FF] w-3/4"></div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-white/60">
              <button 
                onClick={() => setIsSourcesOpen(true)}
                className="hover:text-[#00F2FF] transition-colors uppercase tracking-widest text-[10px] cursor-pointer"
              >
                [SOURCES]
              </button>
              <button 
                onClick={() => enterPresentationMode(activeSection)}
                className="hover:text-[#00F2FF] text-[#00F2FF] font-bold transition-colors uppercase tracking-widest text-[10px] cursor-pointer"
              >
                [PRESENTATION_MODE]
              </button>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default function App() {
  const handleExitToExplore = (sectionId: string) => {
    // Smoothly scroll to the corresponding section when returning from Presentation Mode
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  return (
    <PresentationProvider onExitToExplore={handleExitToExplore}>
      <MainAppContent />
    </PresentationProvider>
  );
}
