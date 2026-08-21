'use client';

import React from 'react';
import { GridType } from '@/types/grid';
import { GridCell } from './GridCell';

interface GridProps {
  grid: GridType;
  onMouseDown: (row: number, col: number) => void;
  onMouseEnter: (row: number, col: number) => void;
  onMouseUp: () => void;
}

export const Grid: React.FC<GridProps> = ({
  grid,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
}) => {
  return (
    <div className="relative w-full overflow-x-auto rounded-xl bg-slate-950/80 border border-slate-800/80 p-3 sm:p-4 shadow-2xl backdrop-blur-xl">
      {/* Background ambient lighting */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div
        className="relative mx-auto flex flex-col items-center justify-center select-none"
        onMouseLeave={onMouseUp}
      >
        <div className="inline-block border border-slate-800/80 rounded-lg overflow-hidden bg-slate-950/90 shadow-inner">
          {grid.map((row, rowIdx) => (
            <div key={`row-${rowIdx}`} className="flex">
              {row.map((node) => (
                <GridCell
                  key={`node-${node.row}-${node.col}`}
                  node={node}
                  onMouseDown={onMouseDown}
                  onMouseEnter={onMouseEnter}
                  onMouseUp={onMouseUp}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
