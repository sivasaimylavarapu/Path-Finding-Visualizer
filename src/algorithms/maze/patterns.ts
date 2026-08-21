import { Coordinate, GridDimensions } from '@/types/grid';

export function generateRandomObstacles(
  dimensions: GridDimensions,
  startCoord: Coordinate,
  targetCoord: Coordinate,
  density: number = 0.28
): Coordinate[] {
  const walls: Coordinate[] = [];
  const { rows, cols } = dimensions;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (
        (r === startCoord.row && c === startCoord.col) ||
        (r === targetCoord.row && c === targetCoord.col)
      ) {
        continue;
      }
      if (Math.random() < density) {
        walls.push({ row: r, col: c });
      }
    }
  }

  return walls;
}

export function generateVerticalCorridors(
  dimensions: GridDimensions,
  startCoord: Coordinate,
  targetCoord: Coordinate
): Coordinate[] {
  const walls: Coordinate[] = [];
  const { rows, cols } = dimensions;

  for (let c = 2; c < cols - 2; c += 4) {
    const gapRow = Math.floor(Math.random() * (rows - 4)) + 2;
    for (let r = 0; r < rows; r++) {
      if (r !== gapRow && r !== gapRow + 1) {
        if (
          !(r === startCoord.row && c === startCoord.col) &&
          !(r === targetCoord.row && c === targetCoord.col)
        ) {
          walls.push({ row: r, col: c });
        }
      }
    }
  }

  return walls;
}

export function generateHorizontalCorridors(
  dimensions: GridDimensions,
  startCoord: Coordinate,
  targetCoord: Coordinate
): Coordinate[] {
  const walls: Coordinate[] = [];
  const { rows, cols } = dimensions;

  for (let r = 2; r < rows - 2; r += 4) {
    const gapCol = Math.floor(Math.random() * (cols - 4)) + 2;
    for (let c = 0; c < cols; c++) {
      if (c !== gapCol && c !== gapCol + 1) {
        if (
          !(r === startCoord.row && c === startCoord.col) &&
          !(r === targetCoord.row && c === targetCoord.col)
        ) {
          walls.push({ row: r, col: c });
        }
      }
    }
  }

  return walls;
}

export function generateStairPattern(
  dimensions: GridDimensions,
  startCoord: Coordinate,
  targetCoord: Coordinate
): Coordinate[] {
  const walls: Coordinate[] = [];
  const { rows, cols } = dimensions;

  let r = rows - 2;
  let c = 1;

  while (r > 1 && c < cols - 1) {
    if (
      !(r === startCoord.row && c === startCoord.col) &&
      !(r === targetCoord.row && c === targetCoord.col)
    ) {
      walls.push({ row: r, col: c });
    }
    r--;
    c++;
  }

  return walls;
}
