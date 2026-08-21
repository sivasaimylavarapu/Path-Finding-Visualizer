'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Compass,
  ArrowRight,
  BookOpen,
  Sparkles,
  Zap,
  Activity,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/utils/cn';

// Mini grid dimensions for hero animation
const MINI_ROWS = 7;
const MINI_COLS = 13;
const MINI_START = { row: 3, col: 1 };
const MINI_TARGET = { row: 3, col: 11 };

// Pre-calculated wall positions for the hero maze
const HERO_WALLS = new Set([
  '1-4', '2-4', '3-4', '5-4',
  '2-8', '3-8', '4-8', '5-8',
]);

// Simulated path coordinates
const HERO_PATH = [
  '3-1', '3-2', '3-3', '4-3', '4-4', '4-5', '4-6', '3-6', '2-6', '2-7', '2-8', '1-8', '1-9', '1-10', '2-10', '3-10', '3-11'
];

export const HeroSection: React.FC = () => {
  const [visitedNodes, setVisitedNodes] = useState<Set<string>>(new Set());
  const [pathNodes, setPathNodes] = useState<Set<string>>(new Set());
  const [activeStep, setActiveStep] = useState(0);

  // Animated wave traversal simulation for hero display
  useEffect(() => {
    let timer: NodeJS.Timeout;

    const runSimulation = () => {
      // Step 1: Reset
      setVisitedNodes(new Set());
      setPathNodes(new Set());
      setActiveStep(0);

      // Sequence of visited nodes in order
      const sequence: string[] = [];
      for (let r = 0; r < MINI_ROWS; r++) {
        for (let c = 0; c < MINI_COLS; c++) {
          const key = `${r}-${c}`;
          if (!HERO_WALLS.has(key) && key !== `${MINI_START.row}-${MINI_START.col}` && key !== `${MINI_TARGET.row}-${MINI_TARGET.col}`) {
            sequence.push(key);
          }
        }
      }

      // Sort by Manhattan distance from start to create radial ripple effect
      sequence.sort((a, b) => {
        const [r1, c1] = a.split('-').map(Number);
        const [r2, c2] = b.split('-').map(Number);
        const d1 = Math.abs(r1 - MINI_START.row) + Math.abs(c1 - MINI_START.col);
        const d2 = Math.abs(r2 - MINI_START.row) + Math.abs(c2 - MINI_START.col);
        return d1 - d2;
      });

      let currentVisited = new Set<string>();
      let i = 0;

      const visitInterval = setInterval(() => {
        if (i < sequence.length) {
          const nextKey = sequence[i];
          currentVisited = new Set(currentVisited).add(nextKey);
          setVisitedNodes(new Set(currentVisited));
          i++;
        } else {
          clearInterval(visitInterval);
          // Show path step by step
          let pIdx = 0;
          let currentPath = new Set<string>();
          const pathInterval = setInterval(() => {
            if (pIdx < HERO_PATH.length) {
              currentPath = new Set(currentPath).add(HERO_PATH[pIdx]);
              setPathNodes(new Set(currentPath));
              pIdx++;
            } else {
              clearInterval(pathInterval);
              // Hold state then restart loop
              timer = setTimeout(() => {
                runSimulation();
              }, 4000);
            }
          }, 80);
        }
      }, 40);
    };

    runSimulation();

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <section id="home" className="relative pt-6 pb-16 md:pt-12 md:pb-24 overflow-hidden">
      {/* Background glowing gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-cyan-500/10 via-indigo-600/15 to-purple-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Hero Copy */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono w-fit backdrop-blur-md shadow-glow">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>College DSA Laboratory & Learning Suite</span>
            </div>

            {/* Main Title */}
            <div className="flex flex-col">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white uppercase leading-[1.08]">
                PATH FINDING <br />
                <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                  VISUALIZER
                </span>
              </h1>
              <p className="text-lg sm:text-xl font-medium text-cyan-200/90 mt-3 font-sans">
                "Explore algorithms. Discover paths. Understand DSA."
              </p>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
              An interactive visualization platform that demonstrates how graph algorithms explore
              nodes and discover paths between a starting point and destination.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="#visualizer"
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:via-indigo-500 hover:to-purple-500 text-white font-semibold text-sm shadow-glow hover:shadow-cyan-500/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Compass className="w-4 h-4" />
                <span>Explore Visualizer</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="#algorithms"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 text-slate-200 hover:text-white font-semibold text-sm backdrop-blur-md transition-all"
              >
                <BookOpen className="w-4 h-4 text-cyan-400" />
                <span>Learn Algorithms</span>
              </Link>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-slate-800/80 max-w-lg">
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-mono text-cyan-400 font-bold">5 Algorithms</span>
                <span className="text-[11px] text-slate-400">Dijkstra, A*, BFS, DFS</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-mono text-indigo-400 font-bold">Real Graphs</span>
                <span className="text-[11px] text-slate-400">Weighted & Unweighted</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-mono text-purple-400 font-bold">DSA Theory</span>
                <span className="text-[11px] text-slate-400">Time & Space Metrics</span>
              </div>
            </div>
          </div>

          {/* Right Column: Animated Mini-Grid Preview */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full rounded-2xl bg-slate-900/70 border border-slate-800/90 p-5 backdrop-blur-2xl shadow-2xl overflow-hidden">
              {/* Top Bar Decoration */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800/70 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="text-[11px] font-mono text-slate-400 ml-1.5">
                    pathfinding-preview.dsa
                  </span>
                </div>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                  Live Traversal Simulation
                </span>
              </div>

              {/* Grid Box */}
              <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-950/90 border border-slate-800/80 shadow-inner">
                {Array.from({ length: MINI_ROWS }).map((_, r) => (
                  <div key={`hero-row-${r}`} className="flex">
                    {Array.from({ length: MINI_COLS }).map((_, c) => {
                      const key = `${r}-${c}`;
                      const isStart = r === MINI_START.row && c === MINI_START.col;
                      const isTarget = r === MINI_TARGET.row && c === MINI_TARGET.col;
                      const isWall = HERO_WALLS.has(key);
                      const isPath = pathNodes.has(key);
                      const isVisited = visitedNodes.has(key) && !isPath;

                      let cellClass = 'bg-slate-900/40 border-slate-800/50';

                      if (isStart) {
                        cellClass = 'bg-emerald-500 border-emerald-400 shadow-glow-start scale-105';
                      } else if (isTarget) {
                        cellClass = 'bg-rose-500 border-rose-400 shadow-glow-target scale-105';
                      } else if (isWall) {
                        cellClass = 'bg-slate-800 border-slate-700 shadow-inner';
                      } else if (isPath) {
                        cellClass =
                          'bg-gradient-to-r from-cyan-400 to-indigo-400 border-cyan-300 shadow-glow animate-path-pop';
                      } else if (isVisited) {
                        cellClass = 'bg-cyan-950/70 border-cyan-700/50 animate-node-pop';
                      }

                      return (
                        <div
                          key={`hero-cell-${key}`}
                          className={cn(
                            'w-5 h-5 sm:w-6 sm:h-6 border m-[1px] rounded-[2px] transition-all duration-200 flex items-center justify-center text-[8px]',
                            cellClass
                          )}
                        >
                          {isStart && <span className="font-bold text-slate-950">S</span>}
                          {isTarget && <span className="font-bold text-white">E</span>}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* Simulation Status description */}
              <div className="mt-4 pt-3 border-t border-slate-800/70 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2 text-slate-400">
                  <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                  <span>Optimal Path Discovery</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="text-cyan-400">{visitedNodes.size} visited</span>
                  <span>•</span>
                  <span className="text-emerald-400">{pathNodes.size} path</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
