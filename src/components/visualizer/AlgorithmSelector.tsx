'use client';

import React from 'react';
import { AlgorithmType } from '@/types/algorithm';
import { ALGORITHMS } from '@/utils/constants';
import { cn } from '@/utils/cn';
import { Sparkles, CheckCircle2, ShieldAlert } from 'lucide-react';

interface AlgorithmSelectorProps {
  selectedAlgorithm: AlgorithmType;
  onSelectAlgorithm: (algo: AlgorithmType) => void;
  disabled?: boolean;
}

export const AlgorithmSelector: React.FC<AlgorithmSelectorProps> = ({
  selectedAlgorithm,
  onSelectAlgorithm,
  disabled = false,
}) => {
  const algoList = Object.values(ALGORITHMS);

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <label className="text-xs uppercase tracking-wider font-semibold text-slate-400 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          Select Graph Algorithm
        </label>
        <span className="text-[11px] font-mono text-slate-500">
          5 Algorithms Available
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
        {algoList.map((algo) => {
          const isSelected = selectedAlgorithm === algo.id;
          return (
            <button
              key={algo.id}
              type="button"
              disabled={disabled}
              onClick={() => onSelectAlgorithm(algo.id)}
              className={cn(
                'group relative text-left p-3.5 rounded-xl border transition-all duration-200 flex flex-col justify-between gap-2 overflow-hidden',
                isSelected
                  ? 'bg-gradient-to-b from-cyan-950/60 to-slate-900/90 border-cyan-500/80 shadow-glow text-white'
                  : 'bg-slate-900/40 border-slate-800/80 text-slate-300 hover:bg-slate-800/50 hover:border-slate-700/80 hover:text-white',
                disabled && 'opacity-60 cursor-not-allowed'
              )}
            >
              {isSelected && (
                <div className="absolute top-0 right-0 w-12 h-12 bg-cyan-500/10 rounded-bl-full pointer-events-none" />
              )}

              <div className="flex items-center justify-between w-full">
                <span className="font-semibold text-sm tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                  {algo.shortName}
                </span>
                {algo.guaranteesShortestPath ? (
                  <span
                    title="Guarantees Shortest Path"
                    className="inline-flex items-center gap-0.5 text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-mono"
                  >
                    Optimal
                  </span>
                ) : (
                  <span
                    title="Does not guarantee shortest path"
                    className="inline-flex items-center gap-0.5 text-[10px] px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30 font-mono"
                  >
                    Heuristic/Deep
                  </span>
                )}
              </div>

              <p className="text-[11px] text-slate-400 leading-tight line-clamp-2">
                {algo.tagline}
              </p>

              <div className="flex items-center justify-between pt-1 border-t border-slate-800/60 text-[10px] font-mono text-slate-400">
                <span>{algo.isWeighted ? 'Weighted' : 'Unweighted'}</span>
                <span className="text-cyan-400/90">{algo.timeComplexity.split(' ')[0]}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
