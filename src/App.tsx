import React, { useState, useEffect, useRef } from 'react';
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
import { FinalQRPage } from './components/FinalQRPage';
import { SourceDrawer } from './components/SourceDrawer';
import { DEMO_DATA } from './data/demoData';
import { SimulationParams } from './types';
import { calculateSimulation } from './logic/financialModel';
import { EvidenceProvider, useEvidence } from './context/EvidenceContext';
import { VerticalScrubber } from './components/VerticalScrubber';

const SECTION_IDS = [
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
  'scan-qr',
];

function MainAppContent() {
  const [params, setParams] = useState<SimulationParams>(DEMO_DATA.defaultSimulationParams);
  const [activeSection, setActiveSection] = useState<string>('intro');
  const [isPresentationMode, setIsPresentationMode] = useState<boolean>(false);
  const { openSource } = useEvidence();

  // Live real-time financial simulation calculations
  const result = calculateSimulation(params);
  
  // Track manual scrolling to disable IntersectionObserver updates during auto-scroll
  const isAutoScrolling = useRef(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  // Smooth scroll helper
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      isAutoScrolling.current = true;
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      
      setActiveSection(sectionId);
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      // Re-enable observer updates after scrolling finishes
      scrollTimeout.current = setTimeout(() => {
        isAutoScrolling.current = false;
      }, 1000);
    }
  };

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }
      if (e.key === 'p' || e.key === 'P') {
        setIsPresentationMode(prev => !prev);
        return;
      }
      if (e.key === 'Escape' && isPresentationMode) {
        setIsPresentationMode(false);
        return;
      }

      const currentIndex = SECTION_IDS.indexOf(activeSection);
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        if (currentIndex < SECTION_IDS.length - 1) {
          e.preventDefault();
          scrollToSection(SECTION_IDS[currentIndex + 1]);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        if (currentIndex > 0) {
          e.preventDefault();
          scrollToSection(SECTION_IDS[currentIndex - 1]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSection, isPresentationMode]);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isAutoScrolling.current) return;
        
        // Find the most visible section
        let mostVisible = entries[0];
        for (const entry of entries) {
          if (entry.intersectionRatio > mostVisible.intersectionRatio) {
            mostVisible = entry;
          }
        }
        
        if (mostVisible && mostVisible.isIntersecting) {
          setActiveSection(mostVisible.target.id);
        }
      },
      {
        root: null,
        rootMargin: '-10% 0px -40% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`min-h-screen bg-[#020617] text-[#E2E8F0] selection:bg-[#00F2FF]/30 antialiased font-sans relative ${isPresentationMode ? 'presentation-mode-active' : ''}`}>
      {/* Ambient Technical Data Grid Matrix Background */}
      <div className="fixed inset-0 tech-grid-bg opacity-30 pointer-events-none z-0" />
      
      {/* Left Navigation Scrubber */}
      <VerticalScrubber 
        activeSection={activeSection}
        onNavigate={scrollToSection}
        isPresentationMode={isPresentationMode}
        onExitPresentationMode={() => setIsPresentationMode(false)}
      />
      
      {/* Top Floating Navigation */}
      {!isPresentationMode && (
        <Navbar
          activeSection={activeSection}
          onNavigate={scrollToSection}
          isPresentationMode={isPresentationMode}
          onTogglePresentationMode={() => setIsPresentationMode(true)}
          onOpenSources={() => openSource()}
        />
      )}

      {/* Main Experience Flow */}
      <main className="relative z-10 transition-all duration-300 ml-12">
        
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
          onOpenSources={() => openSource()}
        />

        {/* Section 13: Final QR & Call to Action */}
        <div id="scan-qr">
          <FinalQRPage />
        </div>
      </main>

      {/* Slide-out Research Sources Drawer */}
      <SourceDrawer />

      {/* Technical Data Grid Telemetry Footer */}
      {activeSection !== 'scan-qr' && (
        <footer className="relative z-10 border-t border-white/10 bg-[#020617]/95 backdrop-blur-md py-6 px-4 sm:px-8 text-[11px] font-mono tracking-wider text-white/50 transition-all duration-300 ml-12">
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
                  onClick={() => openSource()}
                  className="hover:text-[#00F2FF] transition-colors uppercase tracking-widest text-[10px] cursor-pointer"
                >
                  [SOURCES]
                </button>
                <button 
                  onClick={() => setIsPresentationMode(prev => !prev)}
                  className="hover:text-[#00F2FF] text-[#00F2FF] font-bold transition-colors uppercase tracking-widest text-[10px] cursor-pointer"
                >
                  [{isPresentationMode ? 'EXIT_PRESENTATION' : 'PRESENTATION_MODE'}]
                </button>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}

export default function App() {
  return (
    <EvidenceProvider>
      <MainAppContent />
    </EvidenceProvider>
  );
}
