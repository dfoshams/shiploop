import React from 'react';
import { GlobalAndIndia } from '../../components/GlobalAndIndia';
import { usePresentation } from '../PresentationContext';

export const Scene8India: React.FC = () => {
  const { isPaused, sceneTransitionKey, simParams, simResult } = usePresentation();

  return (
    <GlobalAndIndia
      isPresentationMode={true}
      isPaused={isPaused}
      replayTrigger={sceneTransitionKey}
      params={simParams}
      result={simResult}
    />
  );
};
