import { SimulationParams, SimulationResult } from '../types';

export type PresentationSceneId = 
  | 'INTRO'
  | 'PROBLEM'
  | 'INSIGHT'
  | 'ENGINE'
  | 'SIMULATOR'
  | 'WATERFALL'
  | 'CHARTER'
  | 'VERIFICATION'
  | 'FEET'
  | 'RISK'
  | 'INDIA'
  | 'SCALE'
  | 'CONCLUSION';

export type PresenterPreset = 'BASE' | 'OPTIMISTIC' | 'CONSERVATIVE' | 'STRESS';

export interface SceneDefinition {
  id: PresentationSceneId;
  index: number;
  chapterNumber: string;
  chapterTitle: string;
  sceneTitle: string;
  sceneSubtitle: string;
  sectionIdInExploreMode: string;
  keyHighlight?: {
    label: string;
    value: string;
    sublabel?: string;
  };
}

export interface PresetValues {
  name: string;
  tag: string;
  efficiency: number;
  fuelPrice: number;
  operatingDays: number;
  retrofitCost: number;
  description: string;
}
