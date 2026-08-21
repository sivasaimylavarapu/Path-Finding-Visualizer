export type NodeType =
  | 'empty'
  | 'start'
  | 'target'
  | 'wall'
  | 'weight'
  | 'visited'
  | 'path';

export interface Coordinate {
  row: number;
  col: number;
}

export interface GridNode {
  row: number;
  col: number;
  isStart: boolean;
  isTarget: boolean;
  isWall: boolean;
  weight: number; // 1 = default, >1 = weighted terrain
  isVisited: boolean;
  isPath: boolean;
  distance: number;
  heuristic: number;
  totalDistance: number; // f(n) = g(n) + h(n)
  previousNode: GridNode | null;
}

export interface GridDimensions {
  rows: number;
  cols: number;
}

export type GridType = GridNode[][];
