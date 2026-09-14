import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { EvidenceRecord, EVIDENCE_REGISTRY } from '../data/references';

interface EvidenceContextType {
  isDrawerOpen: boolean;
  activeEvidenceId: string | null;
  activeRecord: EvidenceRecord | null;
  openSource: (evidenceId?: string) => void;
  closeSource: () => void;
  selectEvidence: (evidenceId: string) => void;
}

const EvidenceContext = createContext<EvidenceContextType | undefined>(undefined);

export const EvidenceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeEvidenceId, setActiveEvidenceId] = useState<string | null>(null);

  const openSource = useCallback((evidenceId?: string) => {
    if (evidenceId) {
      setActiveEvidenceId(evidenceId);
    }
    setIsDrawerOpen(true);
  }, []);

  const selectEvidence = useCallback((evidenceId: string) => {
    setActiveEvidenceId(evidenceId);
  }, []);

  const closeSource = useCallback(() => {
    setIsDrawerOpen(false);
  }, []);

  // Global ESC / X key listener for closing the source drawer
  useEffect(() => {
    if (!isDrawerOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'x' || e.key === 'X') {
        const activeTag = (document.activeElement as HTMLElement)?.tagName;
        if ((e.key === 'x' || e.key === 'X') && (activeTag === 'INPUT' || activeTag === 'TEXTAREA')) {
          return;
        }
        // Stop propagation so PresentationContext or other handlers don't exit presentation mode
        e.stopPropagation();
        e.preventDefault();
        closeSource();
      }
    };

    window.addEventListener('keydown', handleKeyDown, { capture: true });
    return () => window.removeEventListener('keydown', handleKeyDown, { capture: true });
  }, [isDrawerOpen, closeSource]);

  const activeRecord = activeEvidenceId
    ? EVIDENCE_REGISTRY.find((e) => e.id === activeEvidenceId) || null
    : null;

  return (
    <EvidenceContext.Provider
      value={{
        isDrawerOpen,
        activeEvidenceId,
        activeRecord,
        openSource,
        closeSource,
        selectEvidence,
      }}
    >
      {children}
    </EvidenceContext.Provider>
  );
};

export const useEvidence = () => {
  const context = useContext(EvidenceContext);
  if (!context) {
    throw new Error('useEvidence must be used within an EvidenceProvider');
  }
  return context;
};
