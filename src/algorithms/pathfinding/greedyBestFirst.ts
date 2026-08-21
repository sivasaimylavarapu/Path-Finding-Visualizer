import { Coordinate, GridNode, GridType } from '@/types/grid';
import { AlgorithmResult } from '../types';
import { PriorityQueue } from '../dataStructures/PriorityQueue';
import {
  calculatePathCost,
  cloneGridForAlgorithm,
  getUnvisitedNeighbors,
  manhattanDistance,
  reconstructShortestPath,
} from './utils';

/**
 * Greedy Best-First Search implementation
 * Evaluates nodes strictly based on heuristic h(n) = distance to target
 * Fast, aggressive exploration, but does NOT guarantee optimal shortest path
 */
export function greedyBestFirst(
  grid: GridType,
  startCoord: Coordinate,
  targetCoord: Coordinate
): AlgorithmResult {
  const startTime = performance.now();
  const graph = cloneGridForAlgorithm(grid);
  const visitedNodesInOrder: Coordinate[] = [];

  const startNode = graph[startCoord.row][startCoord.col];
  const targetNode = graph[targetCoord.row][targetCoord.col];

  startNode.heuristic = manhattanDistance(startCoord, targetCoord);

  const openSet = new PriorityQueue<GridNode>((a, b) => a.heuristic - b.heuristic);
  openSet.enqueue(startNode);

  let isPathFound = false;

  while (!openSet.isEmpty()) {
    const currentNode = openSet.dequeue();
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
    for (const neighbor of neighbors) {
      if (neighbor.isWall || neighbor.isVisited) continue;

      neighbor.heuristic = manhattanDistance(
        { row: neighbor.row, col: neighbor.col },
        targetCoord
      );
      neighbor.previousNode = currentNode;
      openSet.enqueue(neighbor);
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
