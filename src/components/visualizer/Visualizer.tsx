'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { AlgorithmType } from '@/types/algorithm';
import { Coordinate, GridDimensions, GridType } from '@/types/grid';
import {
  AlgorithmStats,
  DragTarget,
  DrawMode,
  MazeType,
  VisualizationSpeed,
  VisualizerStatus,
} from '@/types/visualizer';
import {
  ALGORITHMS,
  DEFAULT_GRID_DIMENSIONS,
  DEFAULT_START_NODE,
  DEFAULT_TARGET_NODE,
  SPEED_DELAYS,
} from '@/utils/constants';
import {
  clearBoardAll,
  clearPathOnly,
  createInitialGrid,
  toggleWall,
  toggleWeight,
} from '@/utils/gridHelpers';
import {
  ALGORITHM_REGISTRY,
  generateHorizontalCorridors,
  generateRandomObstacles,
  generateRecursiveDivisionMaze,
  generateStairPattern,
  generateVerticalCorridors,
} from '@/algorithms';
import { AlgorithmSelector } from './AlgorithmSelector';
import { ControlPanel } from './ControlPanel';
import { Grid } from './Grid';
import { Legend } from './Legend';
import { StatisticsPanel } from './StatisticsPanel';
import { AlgorithmInfo } from './AlgorithmInfo';
import { Info, Sparkles, AlertCircle } from 'lucide-react';

export const Visualizer: React.FC = () => {
  const [dimensions] = useState<GridDimensions>(DEFAULT_GRID_DIMENSIONS);
  const [startCoord, setStartCoord] = useState<Coordinate>(DEFAULT_START_NODE);
  const [targetCoord, setTargetCoord] = useState<Coordinate>(DEFAULT_TARGET_NODE);
  const [grid, setGrid] = useState<GridType>(() =>
    createInitialGrid(dimensions, startCoord, targetCoord)
  );

  const [selectedAlgorithm, setSelectedAlgorithm] = useState<AlgorithmType>('dijkstra');
  const [speed, setSpeed] = useState<VisualizationSpeed>('fast');
  const [drawMode, setDrawMode] = useState<DrawMode>('wall');
  const [status, setStatus] = useState<VisualizerStatus>('idle');
  const [notification, setNotification] = useState<string | null>(null);

  const [stats, setStats] = useState<AlgorithmStats>({
    nodesVisitedCount: 0,
    pathLength: 0,
    pathCost: 0,
    executionTimeMs: 0,
    isPathFound: null,
    status: 'idle',
  });

  const isMouseDownRef = useRef(false);
  const dragTargetRef = useRef<DragTarget>(null);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  // Clear all pending visualization animation frames/timeouts
  const clearAllTimeouts = useCallback(() => {
    timeoutsRef.current.forEach((t) => clearTimeout(t));
    timeoutsRef.current = [];
  }, []);

  useEffect(() => {
    return () => {
      clearAllTimeouts();
    };
  }, [clearAllTimeouts]);

  // Cell interaction handlers
  const handleCellAction = useCallback(
    (row: number, col: number) => {
      if (status === 'running') return;

      // Handle dragging Start Node
      if (dragTargetRef.current === 'start') {
        if (row === targetCoord.row && col === targetCoord.col) return;
        setStartCoord({ row, col });
        setGrid((prev) => {
          return prev.map((r) =>
            r.map((c) => ({
              ...c,
              isStart: c.row === row && c.col === col,
              isWall: c.row === row && c.col === col ? false : c.isWall,
              weight: c.row === row && c.col === col ? 1 : c.weight,
            }))
          );
        });
        return;
      }

      // Handle dragging Target Node
      if (dragTargetRef.current === 'target') {
        if (row === startCoord.row && col === startCoord.col) return;
        setTargetCoord({ row, col });
        setGrid((prev) => {
          return prev.map((r) =>
            r.map((c) => ({
              ...c,
              isTarget: c.row === row && c.col === col,
              isWall: c.row === row && c.col === col ? false : c.isWall,
              weight: c.row === row && c.col === col ? 1 : c.weight,
            }))
          );
        });
        return;
      }

      // Normal cell drawing/erasing
      const node = grid[row][col];
      if (node.isStart || node.isTarget) return;

      if (drawMode === 'wall') {
        setGrid((prev) => toggleWall(prev, row, col));
      } else if (drawMode === 'weight') {
        setGrid((prev) => toggleWeight(prev, row, col, 5));
      } else if (drawMode === 'eraser') {
        setGrid((prev) => {
          const newGrid = prev.map((r) => r.map((c) => ({ ...c })));
          newGrid[row][col].isWall = false;
          newGrid[row][col].weight = 1;
          return newGrid;
        });
      }
    },
    [drawMode, grid, startCoord, targetCoord, status]
  );

  const handleMouseDown = useCallback(
    (row: number, col: number) => {
      if (status === 'running') return;
      isMouseDownRef.current = true;

      const node = grid[row][col];
      if (node.isStart) {
        dragTargetRef.current = 'start';
      } else if (node.isTarget) {
        dragTargetRef.current = 'target';
      } else {
        dragTargetRef.current = null;
        handleCellAction(row, col);
      }
    },
    [grid, handleCellAction, status]
  );

  const handleMouseEnter = useCallback(
    (row: number, col: number) => {
      if (!isMouseDownRef.current) return;
      handleCellAction(row, col);
    },
    [handleCellAction]
  );

  const handleMouseUp = useCallback(() => {
    isMouseDownRef.current = false;
    dragTargetRef.current = null;
  }, []);

  // Board control handlers
  const handleClearBoard = useCallback(() => {
    clearAllTimeouts();
    setGrid(clearBoardAll(grid, startCoord, targetCoord));
    setStatus('idle');
    setStats({
      nodesVisitedCount: 0,
      pathLength: 0,
      pathCost: 0,
      executionTimeMs: 0,
      isPathFound: null,
      status: 'idle',
    });
  }, [clearAllTimeouts, grid, startCoord, targetCoord]);

  const handleClearPath = useCallback(() => {
    clearAllTimeouts();
    setGrid(clearPathOnly(grid));
    setStatus('idle');
    setStats((prev) => ({
      ...prev,
      nodesVisitedCount: 0,
      pathLength: 0,
      pathCost: 0,
      executionTimeMs: 0,
      isPathFound: null,
      status: 'idle',
    }));
  }, [clearAllTimeouts, grid]);

  // Maze generator with sequential animation
  const handleGenerateMaze = useCallback(
    (type: MazeType) => {
      if (status === 'running') return;
      clearAllTimeouts();

      const cleanGrid = clearBoardAll(grid, startCoord, targetCoord);
      setGrid(cleanGrid);

      let walls: Coordinate[] = [];
      if (type === 'recursive-division') {
        walls = generateRecursiveDivisionMaze(dimensions, startCoord, targetCoord);
      } else if (type === 'random-walls') {
        walls = generateRandomObstacles(dimensions, startCoord, targetCoord, 0.28);
      } else if (type === 'vertical-corridors') {
        walls = generateVerticalCorridors(dimensions, startCoord, targetCoord);
      } else if (type === 'horizontal-corridors') {
        walls = generateHorizontalCorridors(dimensions, startCoord, targetCoord);
      } else if (type === 'stair') {
        walls = generateStairPattern(dimensions, startCoord, targetCoord);
      }

      setStatus('running');

      // Animate maze generation
      walls.forEach((w, idx) => {
        const timeout = setTimeout(() => {
          setGrid((prev) => {
            const next = prev.map((r) => r.map((c) => ({ ...c })));
            if (
              !(w.row === startCoord.row && w.col === startCoord.col) &&
              !(w.row === targetCoord.row && w.col === targetCoord.col)
            ) {
              next[w.row][w.col].isWall = true;
            }
            return next;
          });

          if (idx === walls.length - 1) {
            setStatus('idle');
            setNotification(`Generated ${type.replace('-', ' ')} maze.`);
            setTimeout(() => setNotification(null), 3000);
          }
        }, idx * 10);
        timeoutsRef.current.push(timeout);
      });
    },
    [clearAllTimeouts, dimensions, grid, startCoord, targetCoord, status]
  );

  // Main visualization animation runner
  const handleVisualize = useCallback(() => {
    if (status === 'running') return;
    clearAllTimeouts();

    // Reset previous visited and path nodes
    const cleanGrid = clearPathOnly(grid);
    setGrid(cleanGrid);

    const executor = ALGORITHM_REGISTRY[selectedAlgorithm];
    if (!executor) {
      setNotification(`Algorithm ${selectedAlgorithm} is not available.`);
      return;
    }

    // Execute the real graph algorithm
    const result = executor(cleanGrid, startCoord, targetCoord);
    const { visitedNodesInOrder, shortestPathNodes, isPathFound, executionTimeMs, pathCost } =
      result;

    const delay = SPEED_DELAYS[speed];

    // Instant execution mode
    if (delay === 0) {
      const finalGrid = cleanGrid.map((r) => r.map((c) => ({ ...c })));
      visitedNodesInOrder.forEach(({ row, col }) => {
        finalGrid[row][col].isVisited = true;
      });
      shortestPathNodes.forEach(({ row, col }) => {
        finalGrid[row][col].isPath = true;
      });

      setGrid(finalGrid);
      const finalStatus: VisualizerStatus = isPathFound ? 'completed' : 'no-path';
      setStatus(finalStatus);
      setStats({
        nodesVisitedCount: visitedNodesInOrder.length,
        pathLength: shortestPathNodes.length,
        pathCost,
        executionTimeMs,
        isPathFound,
        status: finalStatus,
      });
      return;
    }

    // Step-by-step animated mode
    setStatus('running');

    // 1. Animate visited nodes
    visitedNodesInOrder.forEach((nodeCoord, idx) => {
      const timeout = setTimeout(() => {
        setGrid((prev) => {
          const next = prev.map((r) => r.map((c) => ({ ...c })));
          next[nodeCoord.row][nodeCoord.col].isVisited = true;
          return next;
        });

        // When all visited nodes are animated, animate shortest path
        if (idx === visitedNodesInOrder.length - 1) {
          if (isPathFound && shortestPathNodes.length > 0) {
            shortestPathNodes.forEach((pathCoord, pathIdx) => {
              const pathTimeout = setTimeout(() => {
                setGrid((prev) => {
                  const next = prev.map((r) => r.map((c) => ({ ...c })));
                  next[pathCoord.row][pathCoord.col].isPath = true;
                  return next;
                });

                if (pathIdx === shortestPathNodes.length - 1) {
                  setStatus('completed');
                  setStats({
                    nodesVisitedCount: visitedNodesInOrder.length,
                    pathLength: shortestPathNodes.length,
                    pathCost,
                    executionTimeMs,
                    isPathFound: true,
                    status: 'completed',
                  });
                }
              }, (pathIdx + 1) * (delay * 2.5));
              timeoutsRef.current.push(pathTimeout);
            });
          } else {
            // Target was unreachable
            setStatus('no-path');
            setStats({
              nodesVisitedCount: visitedNodesInOrder.length,
              pathLength: 0,
              pathCost: 0,
              executionTimeMs,
              isPathFound: false,
              status: 'no-path',
            });
            setNotification('Target node is unreachable. No valid path exists through obstacles.');
            setTimeout(() => setNotification(null), 4000);
          }
        }
      }, idx * delay);
      timeoutsRef.current.push(timeout);
    });
  }, [clearAllTimeouts, grid, selectedAlgorithm, speed, startCoord, targetCoord, status]);

  const currentAlgoInfo = ALGORITHMS[selectedAlgorithm];

  return (
    <section id="visualizer" className="relative w-full py-12 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div className="flex flex-col gap-1.5">
            <div className="inline-flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-wider uppercase">
              <Sparkles className="w-4 h-4" />
              <span>Interactive Graph Sandbox</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Algorithm Visualizer Console
            </h2>
            <p className="text-sm text-slate-400 max-w-2xl">
              Draw obstacles, drop terrain weights, configure heuristics, and observe how graph
              traversal algorithms discover optimal paths. You can also drag & drop the{' '}
              <span className="text-emerald-400 font-semibold">Start</span> and{' '}
              <span className="text-rose-400 font-semibold">Target</span> nodes!
            </p>
          </div>

          {notification && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-950/80 border border-cyan-500/50 text-cyan-300 text-xs font-mono animate-node-pop shadow-glow max-w-md">
              <Info className="w-4 h-4 shrink-0 text-cyan-400" />
              <span>{notification}</span>
            </div>
          )}
        </div>

        {/* Algorithm Selector */}
        <AlgorithmSelector
          selectedAlgorithm={selectedAlgorithm}
          onSelectAlgorithm={(algo) => {
            if (status === 'running') clearAllTimeouts();
            setSelectedAlgorithm(algo);
          }}
          disabled={status === 'running'}
        />

        {/* Control Panel */}
        <ControlPanel
          selectedAlgorithm={selectedAlgorithm}
          speed={speed}
          drawMode={drawMode}
          status={status}
          onSpeedChange={setSpeed}
          onDrawModeChange={setDrawMode}
          onGenerateMaze={handleGenerateMaze}
          onClearBoard={handleClearBoard}
          onClearPath={handleClearPath}
          onVisualize={handleVisualize}
        />

        {/* Legend */}
        <Legend />

        {/* Interactive Grid */}
        <Grid
          grid={grid}
          onMouseDown={handleMouseDown}
          onMouseEnter={handleMouseEnter}
          onMouseUp={handleMouseUp}
        />

        {/* Statistics Panel with Real Telemetry */}
        <StatisticsPanel stats={stats} algorithmInfo={currentAlgoInfo} />

        {/* Algorithm Educational Breakdown Card */}
        <AlgorithmInfo algorithm={currentAlgoInfo} />
      </div>
    </section>
  );
};
