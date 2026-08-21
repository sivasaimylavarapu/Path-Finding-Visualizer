export type AlgorithmType =
  | 'dijkstra'
  | 'astar'
  | 'bfs'
  | 'dfs'
  | 'greedy-best-first';

export interface AlgorithmInfo {
  id: AlgorithmType;
  name: string;
  shortName: string;
  tagline: string;
  category: 'weighted' | 'unweighted' | 'heuristic';
  guaranteesShortestPath: boolean;
  isWeighted: boolean;
  timeComplexity: string;
  spaceComplexity: string;
  dataStructure: string;
  formula?: string;
  summary: string;
  description: string;
  pseudocode: string[];
  keyHighlights: string[];
}
