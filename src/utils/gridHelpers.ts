import { Coordinate, GridDimensions, GridNode, GridType } from '@/types/grid';
import { DEFAULT_GRID_DIMENSIONS, DEFAULT_START_NODE, DEFAULT_TARGET_NODE } from './constants';

export function createNode(
  row: number,
  col: number,
  startCoord: Coordinate = DEFAULT_START_NODE,
  targetCoord: Coordinate = DEFAULT_TARGET_NODE
): GridNode {
  return {
    row,
    col,
    isStart: row === startCoord.row && col === startCoord.col,
    isTarget: row === targetCoord.row && col === targetCoord.col,
    isWall: false,
    weight: 1,
    isVisited: false,
    isPath: false,
    distance: Infinity,
    heuristic: Infinity,
    totalDistance: Infinity,
    previousNode: null,
  };
}

export function createInitialGrid(
  dimensions: GridDimensions = DEFAULT_GRID_DIMENSIONS,
  startCoord: Coordinate = DEFAULT_START_NODE,
  targetCoord: Coordinate = DEFAULT_TARGET_NODE
): GridType {
  const grid: GridType = [];
  for (let row = 0; row < dimensions.rows; row++) {
    const currentRow: GridNode[] = [];
    for (let col = 0; col < dimensions.cols; col++) {
      currentRow.push(createNode(row, col, startCoord, targetCoord));
    }
    grid.push(currentRow);
  }
  return grid;
}

export function toggleWall(grid: GridType, row: number, col: number): GridType {
  const newGrid = grid.map((r) => r.map((cell) => ({ ...cell })));
  const node = newGrid[row][col];
  if (node.isStart || node.isTarget) return newGrid;

  node.isWall = !node.isWall;
  if (node.isWall) {
    node.weight = 1;
  }
  return newGrid;
}

export function toggleWeight(grid: GridType, row: number, col: number, weightVal: number = 5): GridType {
  const newGrid = grid.map((r) => r.map((cell) => ({ ...cell })));
  const node = newGrid[row][col];
  if (node.isStart || node.isTarget) return newGrid;

  if (node.weight > 1) {
    node.weight = 1;
  } else {
    node.weight = weightVal;
    node.isWall = false;
  }
  return newGrid;
}

export function clearPathOnly(grid: GridType): GridType {
  return grid.map((row) =>
    row.map((node) => ({
      ...node,
      isVisited: false,
      isPath: false,
      distance: Infinity,
      heuristic: Infinity,
      totalDistance: Infinity,
      previousNode: null,
    }))
  );
}

export function clearBoardAll(
  grid: GridType,
  startCoord: Coordinate = DEFAULT_START_NODE,
  targetCoord: Coordinate = DEFAULT_TARGET_NODE
): GridType {
  return grid.map((row) =>
    row.map((node) => ({
      ...node,
      isWall: false,
      weight: 1,
      isVisited: false,
      isPath: false,
      distance: Infinity,
      heuristic: Infinity,
      totalDistance: Infinity,
      previousNode: null,
      isStart: node.row === startCoord.row && node.col === startCoord.col,
      isTarget: node.row === targetCoord.row && node.col === targetCoord.col,
    }))
  );
}

export function getNeighbors(grid: GridType, node: GridNode): GridNode[] {
  const neighbors: GridNode[] = [];
  const { row, col } = node;
  const numRows = grid.length;
  const numCols = grid[0].length;

  // Up, Right, Down, Left
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (col < numCols - 1) neighbors.push(grid[row][col + 1]);
  if (row < numRows - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);

  return neighbors;
}

export function manhattanDistance(nodeA: Coordinate, nodeB: Coordinate): number {
  return Math.abs(nodeA.row - nodeB.row) + Math.abs(nodeA.col - nodeB.col);
}

export function euclideanDistance(nodeA: Coordinate, nodeB: Coordinate): number {
  const dx = nodeA.col - nodeB.col;
  const dy = nodeA.row - nodeB.row;
  return Math.sqrt(dx * dx + dy * dy);
}
