import { Coordinate, GridNode, GridType } from '@/types/grid';
import { AlgorithmResult } from '../types';
import { Queue } from '../dataStructures/Queue';
import {
  calculatePathCost,
  cloneGridForAlgorithm,
  getUnvisitedNeighbors,
  reconstructShortestPath,
} from './utils';

/**
 * Breadth-First Search (BFS) implementation
 * Guarantees shortest path (minimum edge transitions) on unweighted graphs
 */
export function bfs(
  grid: GridType,
  startCoord: Coordinate,
  targetCoord: Coordinate
): AlgorithmResult {
  const startTime = performance.now();
  const graph = cloneGridForAlgorithm(grid);
  const visitedNodesInOrder: Coordinate[] = [];

  const startNode = graph[startCoord.row][startCoord.col];
  const targetNode = graph[targetCoord.row][targetCoord.col];

  startNode.distance = 0;
  startNode.isVisited = true;

  const queue = new Queue<GridNode>();
  queue.enqueue(startNode);
  visitedNodesInOrder.push({ row: startNode.row, col: startNode.col });

  let isPathFound = false;

  while (!queue.isEmpty()) {
    const currentNode = queue.dequeue();
    if (!currentNode) break;

    // Check if target reached
    if (currentNode.row === targetNode.row && currentNode.col === targetNode.col) {
      isPathFound = true;
      break;
    }

    const neighbors = getUnvisitedNeighbors(graph, currentNode);
    for (const neighbor of neighbors) {
      if (neighbor.isWall || neighbor.isVisited) continue;

      neighbor.isVisited = true;
      neighbor.distance = currentNode.distance + 1;
      neighbor.previousNode = currentNode;

      visitedNodesInOrder.push({ row: neighbor.row, col: neighbor.col });
      queue.enqueue(neighbor);

      if (neighbor.row === targetNode.row && neighbor.col === targetNode.col) {
        isPathFound = true;
        break;
      }
    }

    if (isPathFound) break;
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
