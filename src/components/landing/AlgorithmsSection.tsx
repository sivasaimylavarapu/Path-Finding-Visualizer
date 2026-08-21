'use client';

import React from 'react';
import Link from 'next/link';
import { ALGORITHMS } from '@/utils/constants';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Cpu,
  Layers,
  Zap,
} from 'lucide-react';
import { cn } from '@/utils/cn';

export const AlgorithmsSection: React.FC = () => {
  const algoList = Object.values(ALGORITHMS);

  return (
    <section id="algorithms" className="py-16 scroll-mt-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Algorithm Directory</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Graph Traversal & Pathfinding Algorithms
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mt-3 leading-relaxed">
            Compare algorithmic behavior across weighted graphs, unweighted grids, priority
            queues, and heuristic-guided searches.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {algoList.map((algo) => (
            <div
              key={algo.id}
              className="group relative rounded-2xl bg-slate-900/50 border border-slate-800/80 hover:border-cyan-500/50 p-6 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between hover:shadow-glow hover:-translate-y-1"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs px-2.5 py-0.5 rounded-full font-mono bg-slate-800 text-cyan-300 border border-slate-700">
                    {algo.category.toUpperCase()}
                  </span>
                  {algo.guaranteesShortestPath ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Shortest Path Guaranteed
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono text-amber-400">
                      <AlertCircle className="w-3.5 h-3.5" />
                      Heuristic / Non-optimal
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {algo.name}
                </h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  {algo.summary}
                </p>

                {/* Specs Box */}
                <div className="my-5 p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 flex flex-col gap-2 font-mono text-xs">
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Time Complexity:</span>
                    <span className="text-cyan-300 font-semibold">{algo.timeComplexity}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Space Complexity:</span>
                    <span className="text-purple-300 font-semibold">{algo.spaceComplexity}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Weights Supported:</span>
                    <span className="text-slate-200">{algo.isWeighted ? 'Yes (Edge Weights)' : 'No (Unweighted)'}</span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <Link
                href="#visualizer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-800/80 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-indigo-600 border border-slate-700/80 text-xs font-semibold text-white transition-all shadow-sm group-hover:shadow-glow"
              >
                <span>Try in Visualizer</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
