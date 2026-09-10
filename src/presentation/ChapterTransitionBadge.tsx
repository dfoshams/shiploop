import React, { useEffect, useState, useRef } from 'react';
import { usePresentation } from './PresentationContext';

export const ChapterTransitionBadge: React.FC = () => {
  const { currentScene, sceneTransitionKey } = usePresentation();
  const [visible, setVisible] = useState(false);
  const prevChapterRef = useRef(currentScene.chapterNumber);

  useEffect(() => {
    // Show on chapter change or initial scene load
    setVisible(true);
    prevChapterRef.current = currentScene.chapterNumber;

    const timer = setTimeout(() => {
      setVisible(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, [currentScene.chapterNumber, sceneTransitionKey]);

  if (!visible) return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-30 pointer-events-none transition-all duration-500 ease-out animate-fadeIn">
      <div className="flex items-center gap-3 px-4 py-2 bg-[#020617]/95 border border-[#00F2FF]/50 shadow-[0_0_30px_rgba(0,242,255,0.4)] backdrop-blur-md tech-corner-accent">
        <span className="w-2 h-2 rounded-full bg-[#00F2FF] animate-ping" />
        <div className="font-mono text-xs">
          <span className="text-[#00F2FF] font-black tracking-widest uppercase">
            CHAPTER {currentScene.chapterNumber}
          </span>
          <span className="text-white/40 mx-2">//</span>
          <span className="text-white font-bold tracking-wider uppercase">
            {currentScene.chapterTitle}
          </span>
        </div>
      </div>
    </div>
  );
};
