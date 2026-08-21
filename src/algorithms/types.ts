import { Coordinate, GridType } from '@/types/grid';

export interface AlgorithmResult {
  visitedNodesInOrder: Coordinate[];
  shortestPathNodes: Coordinate[];
  isPathFound: boolean;
  executionTimeMs: number;
  pathCost: number;
}

export type AlgorithmExecutor = (
  grid: GridType,
  startCoord: Coordinate,
  targetCoord: Coordinate
) => AlgorithmResult;
