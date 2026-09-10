import React from 'react';
import { usePresentation } from './PresentationContext';
import { PRESENTATION_SCENES } from './presentationScenes';

export const PresentationProgress: React.FC = () => {
  const { currentSceneIndex, totalScenes, goToScene } = usePresentation();

  return (
    <div className="flex items-center gap-3 font-mono text-xs select-none">
      {/* Numeric Indicator */}
      <div className="flex items-center gap-1 text-white/50 tracking-widest font-bold">
        <span className="text-[#00F2FF] font-black text-sm">
          {String(currentSceneIndex + 1).padStart(2, '0')}
        </span>
        <span className="text-white/30">/</span>
        <span className="text-white/60">
          {String(totalScenes).padStart(2, '0')}
        </span>
      </div>

      {/* Subtle Dot Track */}
      <div className="hidden md:flex items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity">
        {PRESENTATION_SCENES.map((scene, idx) => {
          const isCurrent = idx === currentSceneIndex;
          const isPast = idx < currentSceneIndex;

          return (
            <button
              key={scene.id}
              onClick={(e) => {
                e.stopPropagation();
                goToScene(idx);
              }}
              title={`Jump to Scene ${idx + 1}: ${scene.sceneTitle}`}
              className="group py-1 px-0.5 focus:outline-none"
            >
              <span
                className={`block rounded-full transition-all duration-300 ${
                  isCurrent
                    ? 'w-4 h-1.5 bg-[#00F2FF] shadow-[0_0_8px_rgba(0,242,255,0.8)]'
                    : isPast
                    ? 'w-1.5 h-1.5 bg-white/40 group-hover:bg-white/70'
                    : 'w-1.5 h-1.5 bg-white/15 group-hover:bg-white/40'
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};
