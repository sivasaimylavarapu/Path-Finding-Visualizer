import { Coordinate, GridNode, GridType } from '@/types/grid';
import { AlgorithmResult } from '../types';
import {
  calculatePathCost,
  cloneGridForAlgorithm,
  getUnvisitedNeighbors,
  reconstructShortestPath,
} from './utils';

/**
 * Depth-First Search (DFS) implementation
 * Explores deeply along branches before backtracking; does NOT guarantee shortest path
 */
export function dfs(
  grid: GridType,
  startCoord: Coordinate,
  targetCoord: Coordinate
): AlgorithmResult {
  const startTime = performance.now();
  const graph = cloneGridForAlgorithm(grid);
  const visitedNodesInOrder: Coordinate[] = [];

  const startNode = graph[startCoord.row][startCoord.col];
  const targetNode = graph[targetCoord.row][targetCoord.col];

  const stack: GridNode[] = [startNode];
  let isPathFound = false;

  while (stack.length > 0) {
    const currentNode = stack.pop();
    if (!currentNode) break;

    if (currentNode.isWall || currentNode.isVisited) continue;

    currentNode.isVisited = true;
    visitedNodesInOrder.push({ row: currentNode.row, col: currentNode.col });

    // Target reached
    if (currentNode.row === targetNode.row && currentNode.col === targetNode.col) {
      isPathFound = true;
      break;
    }

    const neighbors = getUnvisitedNeighbors(graph, currentNode);
    // Push in reverse order so first neighbor is processed first
    for (let i = neighbors.length - 1; i >= 0; i--) {
      const neighbor = neighbors[i];
      if (!neighbor.isWall && !neighbor.isVisited) {
        neighbor.previousNode = currentNode;
        stack.push(neighbor);
      }
    }
  }

  const endTime = performance.now();
  const shortestPathNodes = isPathFound ? reconstructShortestPath(targetNode) : [];
  const pathCost = isPathFound ? calculatePathCost(grid, shortestPathNodes) : 0;

  return {
    visitedNodesInOrder,
    shortestPathNodes,
    isPathFound,
    executionTimeMs: Math.round((endTime - startTime) * 100) / 100,
    pathCost,
  };
}
