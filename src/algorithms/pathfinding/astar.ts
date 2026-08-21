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
 * A* (A-Star) Search Algorithm implementation
 * Evaluates nodes based on f(n) = g(n) + h(n)
 * Uses Manhattan Distance as admissible heuristic for 4-directional grid
 */
export function astar(
  grid: GridType,
  startCoord: Coordinate,
  targetCoord: Coordinate
): AlgorithmResult {
  const startTime = performance.now();
  const graph = cloneGridForAlgorithm(grid);
  const visitedNodesInOrder: Coordinate[] = [];

  const startNode = graph[startCoord.row][startCoord.col];
  const targetNode = graph[targetCoord.row][targetCoord.col];

  startNode.distance = 0; // g(n)
  startNode.heuristic = manhattanDistance(startCoord, targetCoord); // h(n)
  startNode.totalDistance = startNode.distance + startNode.heuristic; // f(n)

  // Priority queue sorted primarily by f(n), and secondarily by h(n) for tie-breaking
  const openSet = new PriorityQueue<GridNode>((a, b) => {
    if (a.totalDistance === b.totalDistance) {
      return a.heuristic - b.heuristic;
    }
    return a.totalDistance - b.totalDistance;
  });

  openSet.enqueue(startNode);
  let isPathFound = false;

  while (!openSet.isEmpty()) {
    const currentNode = openSet.dequeue();
    if (!currentNode) break;

    if (currentNode.isWall) continue;
    if (currentNode.isVisited) continue;

    currentNode.isVisited = true;
    visitedNodesInOrder.push({ row: currentNode.row, col: currentNode.col });

    // Goal reached
    if (currentNode.row === targetNode.row && currentNode.col === targetNode.col) {
      isPathFound = true;
      break;
    }

    const neighbors = getUnvisitedNeighbors(graph, currentNode);
    for (const neighbor of neighbors) {
      if (neighbor.isWall || neighbor.isVisited) continue;

      const tentativeGScore = currentNode.distance + neighbor.weight;

      if (tentativeGScore < neighbor.distance) {
        neighbor.previousNode = currentNode;
        neighbor.distance = tentativeGScore;
        neighbor.heuristic = manhattanDistance(
          { row: neighbor.row, col: neighbor.col },
          targetCoord
        );
        neighbor.totalDistance = neighbor.distance + neighbor.heuristic;
        openSet.enqueue(neighbor);
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
