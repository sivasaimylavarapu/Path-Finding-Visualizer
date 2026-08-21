import { AlgorithmType } from './algorithm';

export type VisualizerStatus =
  | 'idle'
  | 'drawing'
  | 'running'
  | 'paused'
  | 'completed'
  | 'no-path';

export type VisualizationSpeed = 'slow' | 'medium' | 'fast' | 'instant';

export type DrawMode = 'wall' | 'weight' | 'eraser';

export type DragTarget = 'start' | 'target' | null;

export type MazeType =
  | 'random-walls'
  | 'recursive-division'
  | 'vertical-corridors'
  | 'horizontal-corridors'
  | 'stair';

export interface AlgorithmStats {
  nodesVisitedCount: number;
  pathLength: number;
  pathCost: number;
  executionTimeMs: number;
  isPathFound: boolean | null;
  status: VisualizerStatus;
}
