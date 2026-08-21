'use client';

import React, { memo } from 'react';
import { GridNode } from '@/types/grid';
import { cn } from '@/utils/cn';
import { Compass, Flag, Weight } from 'lucide-react';

interface GridCellProps {
  node: GridNode;
  onMouseDown: (row: number, col: number) => void;
  onMouseEnter: (row: number, col: number) => void;
  onMouseUp: () => void;
}

export const GridCell: React.FC<GridCellProps> = memo(
  ({ node, onMouseDown, onMouseEnter, onMouseUp }) => {
    const { row, col, isStart, isTarget, isWall, weight, isVisited, isPath } = node;

    // Determine visual style
    let cellStyle = 'bg-slate-950/40 border-slate-800/40 hover:bg-cyan-500/15 hover:border-cyan-400/40';
    let content = null;

    if (isStart) {
      cellStyle = 'bg-emerald-500 text-slate-950 shadow-glow-start border-emerald-400 z-20 scale-[1.08] rounded-[3px] cursor-grab active:cursor-grabbing';
      content = <Compass className="w-3.5 h-3.5 stroke-[2.5] animate-spin-slow pointer-events-none" />;
    } else if (isTarget) {
      cellStyle = 'bg-rose-500 text-white shadow-glow-target border-rose-400 z-20 scale-[1.08] rounded-[3px] animate-pulse cursor-grab active:cursor-grabbing';
      content = <Flag className="w-3.5 h-3.5 fill-current pointer-events-none" />;
    } else if (isPath) {
      cellStyle = 'bg-gradient-to-r from-amber-400 via-rose-500 to-cyan-400 border-cyan-300 shadow-glow z-10 animate-path-pop';
    } else if (isVisited) {
      cellStyle = 'bg-gradient-to-br from-cyan-950/70 via-indigo-950/60 to-purple-950/60 border-cyan-700/50 shadow-sm animate-node-pop';
    } else if (isWall) {
      cellStyle = 'bg-slate-800 border-slate-700/90 shadow-inner animate-node-pop';
    } else if (weight > 1) {
      cellStyle = 'bg-amber-500/20 border-amber-500/60 text-amber-300 shadow-sm';
      content = (
        <span className="text-[9px] font-mono font-bold flex items-center gap-0.5 select-none pointer-events-none">
          <Weight className="w-2.5 h-2.5 opacity-80" />
          {weight}
        </span>
      );
    }

    return (
      <div
        id={`node-${row}-${col}`}
        data-row={row}
        data-col={col}
        className={cn(
          'w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 border transition-all duration-150 flex items-center justify-center select-none cursor-pointer text-xs',
          cellStyle
        )}
        onMouseDown={(e) => {
          e.preventDefault();
          onMouseDown(row, col);
        }}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={onMouseUp}
      >
        {content}
      </div>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.node.isStart === nextProps.node.isStart &&
      prevProps.node.isTarget === nextProps.node.isTarget &&
      prevProps.node.isWall === nextProps.node.isWall &&
      prevProps.node.weight === nextProps.node.weight &&
      prevProps.node.isVisited === nextProps.node.isVisited &&
      prevProps.node.isPath === nextProps.node.isPath
    );
  }
);

GridCell.displayName = 'GridCell';
