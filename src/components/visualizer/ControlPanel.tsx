'use client';

import React from 'react';
import { AlgorithmType } from '@/types/algorithm';
import { DrawMode, MazeType, VisualizationSpeed, VisualizerStatus } from '@/types/visualizer';
import { ALGORITHMS } from '@/utils/constants';
import {
  Play,
  RotateCcw,
  Trash2,
  Brush,
  Weight,
  Eraser,
  Sliders,
  Sparkles,
  Zap,
  Grid as GridIcon,
} from 'lucide-react';
import { cn } from '@/utils/cn';

interface ControlPanelProps {
  selectedAlgorithm: AlgorithmType;
  speed: VisualizationSpeed;
  drawMode: DrawMode;
  status: VisualizerStatus;
  onSpeedChange: (speed: VisualizationSpeed) => void;
  onDrawModeChange: (mode: DrawMode) => void;
  onGenerateMaze: (type: MazeType) => void;
  onClearBoard: () => void;
  onClearPath: () => void;
  onVisualize: () => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  selectedAlgorithm,
  speed,
  drawMode,
  status,
  onSpeedChange,
  onDrawModeChange,
  onGenerateMaze,
  onClearBoard,
  onClearPath,
  onVisualize,
}) => {
  const currentAlgo = ALGORITHMS[selectedAlgorithm];
  const isRunning = status === 'running';

  return (
    <div className="w-full bg-slate-900/70 border border-slate-800/90 rounded-2xl p-4 sm:p-5 backdrop-blur-xl shadow-2xl flex flex-col gap-4">
      {/* Top row: Primary Action and Quick Stats / Status Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800/60">
        <div className="flex items-center gap-3">
          {/* Main Visualize CTA */}
          <button
            type="button"
            disabled={isRunning}
            onClick={onVisualize}
            className={cn(
              'group relative inline-flex items-center gap-2.5 px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 shadow-lg',
              isRunning
                ? 'bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-700'
                : 'bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:via-indigo-500 hover:to-purple-500 text-white shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98]'
            )}
          >
            <Play className={cn('w-4 h-4 fill-current', isRunning && 'animate-spin')} />
            <span>
              {isRunning ? 'Running Algorithm...' : `Visualize ${currentAlgo.shortName}`}
            </span>
            <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-white/70 animate-ping" />
          </button>

          {/* Quick Clear Buttons */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={isRunning}
              onClick={onClearPath}
              title="Clear visited search nodes and shortest path"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800/60 hover:bg-slate-700/60 border border-slate-700/60 text-xs font-medium text-slate-300 hover:text-white transition-all disabled:opacity-50"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear Path</span>
            </button>

            <button
              type="button"
              disabled={isRunning}
              onClick={onClearBoard}
              title="Clear all walls, weights, and nodes"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800/60 hover:bg-rose-950/40 hover:border-rose-800/50 border border-slate-700/60 text-xs font-medium text-slate-300 hover:text-rose-300 transition-all disabled:opacity-50"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Board</span>
            </button>
          </div>
        </div>

        {/* Maze & Pattern Generator */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slate-400 hidden md:inline-flex items-center gap-1">
            <GridIcon className="w-3.5 h-3.5 text-indigo-400" />
            Patterns:
          </span>
          <select
            disabled={isRunning}
            onChange={(e) => {
              if (e.target.value) {
                onGenerateMaze(e.target.value as MazeType);
                e.target.value = '';
              }
            }}
            defaultValue=""
            className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 rounded-lg px-3 py-2 text-xs font-medium text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-500 cursor-pointer disabled:opacity-50"
          >
            <option value="" disabled>
              Generate Maze / Terrain ▾
            </option>
            <option value="random-walls">Random Obstacles (30%)</option>
            <option value="recursive-division">Recursive Division Maze</option>
            <option value="vertical-corridors">Vertical Corridors</option>
            <option value="horizontal-corridors">Horizontal Corridors</option>
            <option value="spiral">Spiral Labirinth</option>
          </select>
        </div>
      </div>

      {/* Bottom row: Drawing Tools & Speed Selector */}
      <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
        {/* Draw Modes */}
        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-medium hidden sm:inline">Draw Mode:</span>
          <div className="inline-flex rounded-lg bg-slate-950/80 p-1 border border-slate-800">
            <button
              type="button"
              disabled={isRunning}
              onClick={() => onDrawModeChange('wall')}
              className={cn(
                'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all',
                drawMode === 'wall'
                  ? 'bg-slate-800 text-cyan-300 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              )}
            >
              <Brush className="w-3.5 h-3.5" />
              <span>Wall</span>
            </button>
            <button
              type="button"
              disabled={isRunning}
              onClick={() => onDrawModeChange('weight')}
              className={cn(
                'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all',
                drawMode === 'weight'
                  ? 'bg-slate-800 text-amber-300 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              )}
            >
              <Weight className="w-3.5 h-3.5" />
              <span>Weight (+5)</span>
            </button>
            <button
              type="button"
              disabled={isRunning}
              onClick={() => onDrawModeChange('eraser')}
              className={cn(
                'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all',
                drawMode === 'eraser'
                  ? 'bg-slate-800 text-rose-300 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              )}
            >
              <Eraser className="w-3.5 h-3.5" />
              <span>Eraser</span>
            </button>
          </div>
        </div>

        {/* Speed presets */}
        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-medium flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            Speed:
          </span>
          <div className="inline-flex rounded-lg bg-slate-950/80 p-1 border border-slate-800">
            {(['slow', 'medium', 'fast', 'instant'] as VisualizationSpeed[]).map((spd) => (
              <button
                key={spd}
                type="button"
                disabled={isRunning}
                onClick={() => onSpeedChange(spd)}
                className={cn(
                  'px-2.5 py-1 rounded-md font-mono text-[11px] capitalize transition-all',
                  speed === spd
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                )}
              >
                {spd}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
