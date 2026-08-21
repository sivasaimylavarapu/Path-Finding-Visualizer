import { Coordinate, GridNode, GridType } from '@/types/grid';

export function cloneGridForAlgorithm(grid: GridType): GridType {
  return grid.map((row) =>
    row.map((node) => ({
      ...node,
      distance: Infinity,
      totalDistance: Infinity,
      heuristic: Infinity,
      isVisited: false,
      isPath: false,
      previousNode: null,
    }))
  );
}

export function getUnvisitedNeighbors(grid: GridType, node: GridNode): GridNode[] {
  const neighbors: GridNode[] = [];
  const { row, col } = node;
  const numRows = grid.length;
  const numCols = grid[0].length;

  // Directions: Up, Right, Down, Left
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (col < numCols - 1) neighbors.push(grid[row][col + 1]);
  if (row < numRows - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);

  return neighbors;
}

export function reconstructShortestPath(targetNode: GridNode): Coordinate[] {
  const path: Coordinate[] = [];
  let currentNode: GridNode | null = targetNode;

  while (currentNode !== null) {
    path.unshift({ row: currentNode.row, col: currentNode.col });
    currentNode = currentNode.previousNode;
  }

  return path;
}

export function calculatePathCost(grid: GridType, path: Coordinate[]): number {
  if (path.length <= 1) return 0;
  let totalCost = 0;
  // Starting node itself has cost 0, each transition adds destination node weight
  for (let i = 1; i < path.length; i++) {
    const { row, col } = path[i];
    totalCost += grid[row][col].weight || 1;
  }
  return totalCost;
}

export function manhattanDistance(a: Coordinate, b: Coordinate): number {
  return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
}
