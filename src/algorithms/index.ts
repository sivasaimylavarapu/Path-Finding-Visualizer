import { AlgorithmType } from '@/types/algorithm';
import { AlgorithmExecutor } from './types';
import { dijkstra } from './pathfinding/dijkstra';
import { astar } from './pathfinding/astar';
import { bfs } from './pathfinding/bfs';
import { dfs } from './pathfinding/dfs';
import { greedyBestFirst } from './pathfinding/greedyBestFirst';

export const ALGORITHM_REGISTRY: Record<AlgorithmType, AlgorithmExecutor> = {
  dijkstra,
  astar,
  bfs,
  dfs,
  'greedy-best-first': greedyBestFirst,
};

export { dijkstra } from './pathfinding/dijkstra';
export { astar } from './pathfinding/astar';
export { bfs } from './pathfinding/bfs';
export { dfs } from './pathfinding/dfs';
export { greedyBestFirst } from './pathfinding/greedyBestFirst';
export { generateRecursiveDivisionMaze } from './maze/recursiveDivision';
export {
  generateRandomObstacles,
  generateVerticalCorridors,
  generateHorizontalCorridors,
  generateStairPattern,
} from './maze/patterns';
