import { Coordinate, GridDimensions } from '@/types/grid';

/**
 * Recursive Division Maze Generation Algorithm
 * Divides chambers with horizontal and vertical walls while leaving random openings
 */
export function generateRecursiveDivisionMaze(
  dimensions: GridDimensions,
  startCoord: Coordinate,
  targetCoord: Coordinate
): Coordinate[] {
  const walls: Coordinate[] = [];
  const { rows, cols } = dimensions;

  // Add surrounding outer perimeter walls
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (r === 0 || r === rows - 1 || c === 0 || c === cols - 1) {
        if (
          !(r === startCoord.row && c === startCoord.col) &&
          !(r === targetCoord.row && c === targetCoord.col)
        ) {
          walls.push({ row: r, col: c });
        }
      }
    }
  }

  // Recursive chamber division
  function divide(
    rowStart: number,
    rowEnd: number,
    colStart: number,
    colEnd: number,
    orientation: 'horizontal' | 'vertical'
  ) {
    if (rowEnd < rowStart || colEnd < colStart) return;

    const width = colEnd - colStart;
    const height = rowEnd - rowStart;

    if (width < 2 || height < 2) return;

    const isHorizontal =
      orientation === 'horizontal' ||
      (orientation !== 'vertical' && height > width);

    if (isHorizontal) {
      // Choose an even row index for the wall
      const possibleRows: number[] = [];
      for (let r = rowStart; r <= rowEnd; r += 2) {
        possibleRows.push(r);
      }
      if (possibleRows.length === 0) return;
      const wallRow = possibleRows[Math.floor(Math.random() * possibleRows.length)];

      // Choose an odd col index for the passage
      const possiblePassages: number[] = [];
      for (let c = colStart - 1; c <= colEnd + 1; c += 2) {
        if (c >= colStart - 1 && c <= colEnd + 1) {
          possiblePassages.push(c);
        }
      }
      const passageCol =
        possiblePassages[Math.floor(Math.random() * possiblePassages.length)] || colStart;

      for (let c = colStart - 1; c <= colEnd + 1; c++) {
        if (c !== passageCol) {
          if (
            !(wallRow === startCoord.row && c === startCoord.col) &&
            !(wallRow === targetCoord.row && c === targetCoord.col)
          ) {
            walls.push({ row: wallRow, col: c });
          }
        }
      }

      // Recurse top and bottom sub-chambers
      divide(
        rowStart,
        wallRow - 2,
        colStart,
        colEnd,
        wallRow - 2 - rowStart > colEnd - colStart ? 'horizontal' : 'vertical'
      );
      divide(
        wallRow + 2,
        rowEnd,
        colStart,
        colEnd,
        rowEnd - (wallRow + 2) > colEnd - colStart ? 'horizontal' : 'vertical'
      );
    } else {
      // Choose an even col index for the wall
      const possibleCols: number[] = [];
      for (let c = colStart; c <= colEnd; c += 2) {
        possibleCols.push(c);
      }
      if (possibleCols.length === 0) return;
      const wallCol = possibleCols[Math.floor(Math.random() * possibleCols.length)];

      // Choose an odd row index for the passage
      const possiblePassages: number[] = [];
      for (let r = rowStart - 1; r <= rowEnd + 1; r += 2) {
        if (r >= rowStart - 1 && r <= rowEnd + 1) {
          possiblePassages.push(r);
        }
      }
      const passageRow =
        possiblePassages[Math.floor(Math.random() * possiblePassages.length)] || rowStart;

      for (let r = rowStart - 1; r <= rowEnd + 1; r++) {
        if (r !== passageRow) {
          if (
            !(r === startCoord.row && wallCol === startCoord.col) &&
            !(r === targetCoord.row && wallCol === targetCoord.col)
          ) {
            walls.push({ row: r, col: wallCol });
          }
        }
      }

      // Recurse left and right sub-chambers
      divide(
        rowStart,
        rowEnd,
        colStart,
        wallCol - 2,
        rowEnd - rowStart > wallCol - 2 - colStart ? 'horizontal' : 'vertical'
      );
      divide(
        rowStart,
        rowEnd,
        wallCol + 2,
        colEnd,
        rowEnd - rowStart > colEnd - (wallCol + 2) ? 'horizontal' : 'vertical'
      );
    }
  }

  divide(2, rows - 3, 2, cols - 3, rows > cols ? 'horizontal' : 'vertical');

  return walls;
}
