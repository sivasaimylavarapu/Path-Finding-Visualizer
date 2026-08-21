import { Coordinate, GridNode, GridType } from '@/types/grid';
import { AlgorithmResult } from '../types';
import { PriorityQueue } from '../dataStructures/PriorityQueue';
import {
  calculatePathCost,
  cloneGridForAlgorithm,
  getUnvisitedNeighbors,
  reconstructShortestPath,
} from './utils';

/**
 * Dijkstra's Algorithm implementation for 2D Grid with edge weights
 * Guarantees shortest path on non-negative weighted graphs
 */
export function dijkstra(
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

  const pq = new PriorityQueue<GridNode>((a, b) => a.distance - b.distance);
  pq.enqueue(startNode);

  let isPathFound = false;

  while (!pq.isEmpty()) {
    const closestNode = pq.dequeue();
    if (!closestNode) break;

    // Skip impassable walls
    if (closestNode.isWall) continue;

    // If remaining smallest distance is infinity, remaining nodes are trapped/unreachable
    if (closestNode.distance === Infinity) break;

    // Skip if already visited
    if (closestNode.isVisited) continue;

    closestNode.isVisited = true;
    visitedNodesInOrder.push({ row: closestNode.row, col: closestNode.col });

    // Target reached
    if (closestNode.row === targetNode.row && closestNode.col === targetNode.col) {
      isPathFound = true;
      break;
    }

    const neighbors = getUnvisitedNeighbors(graph, closestNode);
    for (const neighbor of neighbors) {
      if (neighbor.isWall || neighbor.isVisited) continue;

      const tentativeDistance = closestNode.distance + neighbor.weight;
      if (tentativeDistance < neighbor.distance) {
        neighbor.distance = tentativeDistance;
        neighbor.previousNode = closestNode;
        pq.enqueue(neighbor);
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
