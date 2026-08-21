'use client';

import React from 'react';
import { AlgorithmStats, VisualizerStatus } from '@/types/visualizer';
import { AlgorithmInfo } from '@/types/algorithm';
import { Activity, Clock, Footprints, Gauge, Network, Layers } from 'lucide-react';
import { cn } from '@/utils/cn';

interface StatisticsPanelProps {
  stats: AlgorithmStats;
  algorithmInfo: AlgorithmInfo;
}

export const StatisticsPanel: React.FC<StatisticsPanelProps> = ({
  stats,
  algorithmInfo,
}) => {
  const getStatusBadge = (status: VisualizerStatus) => {
    switch (status) {
      case 'running':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            Executing Graph Traversal
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Path Discovered
          </span>
        );
      case 'no-path':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono bg-rose-500/15 text-rose-300 border border-rose-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
            Target Unreachable
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono bg-slate-800 text-slate-300 border border-slate-700">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            Engine Ready (Stage 1)
          </span>
        );
    }
  };

  return (
    <div className="w-full bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 sm:p-5 backdrop-blur-xl shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3.5 border-b border-slate-800/60">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-cyan-400" />
          <h3 className="font-semibold text-sm text-white tracking-wide">
            Execution Telemetry & Complexity
          </h3>
        </div>
        <div>{getStatusBadge(stats.status)}</div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-3.5">
        {/* Metric 1: Nodes Visited */}
        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/70 flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-medium">
            <Network className="w-3.5 h-3.5 text-cyan-400" />
            <span>Nodes Visited</span>
          </div>
          <span className="text-lg sm:text-xl font-bold font-mono text-white">
            {stats.status === 'completed' || stats.status === 'no-path'
              ? stats.nodesVisitedCount
              : '—'}
          </span>
        </div>

        {/* Metric 2: Path Length */}
        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/70 flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-medium">
            <Footprints className="w-3.5 h-3.5 text-emerald-400" />
            <span>Path Length</span>
          </div>
          <span className="text-lg sm:text-xl font-bold font-mono text-white">
            {stats.status === 'completed' ? `${stats.pathLength} nodes` : '—'}
          </span>
        </div>

        {/* Metric 3: Total Path Cost */}
        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/70 flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-medium">
            <Gauge className="w-3.5 h-3.5 text-amber-400" />
            <span>Total Path Cost</span>
          </div>
          <span className="text-lg sm:text-xl font-bold font-mono text-white">
            {stats.status === 'completed' ? stats.pathCost : '—'}
          </span>
        </div>

        {/* Metric 4: Computation Time */}
        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/70 flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-medium">
            <Clock className="w-3.5 h-3.5 text-purple-400" />
            <span>Search Time</span>
          </div>
          <span className="text-lg sm:text-xl font-bold font-mono text-white">
            {stats.status === 'completed' || stats.status === 'no-path'
              ? `${stats.executionTimeMs} ms`
              : '—'}
          </span>
        </div>

        {/* Metric 5: Time Complexity */}
        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/70 flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-medium">
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            <span>Time Complexity</span>
          </div>
          <span className="text-xs sm:text-sm font-semibold font-mono text-cyan-300">
            {algorithmInfo.timeComplexity}
          </span>
        </div>

        {/* Metric 6: Space Complexity */}
        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/70 flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-medium">
            <Layers className="w-3.5 h-3.5 text-violet-400" />
            <span>Space Complexity</span>
          </div>
          <span className="text-xs sm:text-sm font-semibold font-mono text-violet-300">
            {algorithmInfo.spaceComplexity}
          </span>
        </div>
      </div>
    </div>
  );
};
