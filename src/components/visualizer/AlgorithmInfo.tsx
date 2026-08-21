'use client';

import React, { useState } from 'react';
import { AlgorithmInfo as AlgorithmInfoType } from '@/types/algorithm';
import { BookOpen, Code2, Cpu, CheckCircle2, FileText, Info } from 'lucide-react';
import { cn } from '@/utils/cn';

interface AlgorithmInfoProps {
  algorithm: AlgorithmInfoType;
}

export const AlgorithmInfo: React.FC<AlgorithmInfoProps> = ({ algorithm }) => {
  const [activeTab, setActiveTab] = useState<'theory' | 'pseudocode'>('theory');

  return (
    <div className="w-full bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 sm:p-6 backdrop-blur-xl shadow-xl flex flex-col gap-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800/70">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-lg text-white tracking-tight">
                {algorithm.name}
              </h3>
              <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 font-mono">
                {algorithm.category.toUpperCase()}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{algorithm.tagline}</p>
          </div>
        </div>

        {/* Tab Toggle */}
        <div className="inline-flex rounded-lg bg-slate-950/80 p-1 border border-slate-800">
          <button
            type="button"
            onClick={() => setActiveTab('theory')}
            className={cn(
              'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all',
              activeTab === 'theory'
                ? 'bg-slate-800 text-cyan-300 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            )}
          >
            <Info className="w-3.5 h-3.5" />
            <span>Theory & DSA Specs</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('pseudocode')}
            className={cn(
              'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all',
              activeTab === 'pseudocode'
                ? 'bg-slate-800 text-cyan-300 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            )}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Pseudocode</span>
          </button>
        </div>
      </div>

      {activeTab === 'theory' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Left 2 Cols: Description & Key Highlights */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div>
              <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-2">
                Overview & Mechanics
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                {algorithm.description}
              </p>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-2">
                Key Algorithmic Properties
              </h4>
              <ul className="grid grid-cols-1 gap-2">
                {algorithm.keyHighlights.map((highlight, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-xs text-slate-300 bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/60"
                  >
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Col: Mathematical formula and structure specs */}
          <div className="flex flex-col gap-3.5 bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 border-b border-slate-800/80 pb-2">
              <Cpu className="w-4 h-4 text-indigo-400" />
              <span>DSA Technical Specifications</span>
            </div>

            {algorithm.formula && (
              <div className="flex flex-col gap-1">
                <span className="text-[11px] text-slate-400 font-medium">
                  Core Evaluation Function:
                </span>
                <code className="p-2 rounded bg-slate-900 border border-slate-800 font-mono text-xs text-cyan-300">
                  {algorithm.formula}
                </code>
              </div>
            )}

            <div className="flex flex-col gap-1">
              <span className="text-[11px] text-slate-400 font-medium">
                Primary Data Structure:
              </span>
              <span className="text-xs text-slate-200 font-mono bg-slate-900/80 p-1.5 rounded border border-slate-800">
                {algorithm.dataStructure}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-1">
              <div className="flex flex-col gap-1 p-2 rounded bg-slate-900/60 border border-slate-800">
                <span className="text-[10px] text-slate-400 font-medium">
                  Time Complexity
                </span>
                <span className="text-xs font-mono font-bold text-cyan-400">
                  {algorithm.timeComplexity}
                </span>
              </div>
              <div className="flex flex-col gap-1 p-2 rounded bg-slate-900/60 border border-slate-800">
                <span className="text-[10px] text-slate-400 font-medium">
                  Space Complexity
                </span>
                <span className="text-xs font-mono font-bold text-purple-400">
                  {algorithm.spaceComplexity}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Pseudocode Tab */
        <div className="bg-slate-950 p-4 sm:p-5 rounded-xl border border-slate-800/80 font-mono text-xs text-slate-200 overflow-x-auto shadow-inner">
          <div className="flex items-center justify-between text-slate-500 pb-2 mb-3 border-b border-slate-800/60 text-[11px]">
            <span>{algorithm.name} Pseudocode</span>
            <span>Standard Implementation</span>
          </div>
          <pre className="leading-relaxed font-mono">
            {algorithm.pseudocode.map((line, idx) => (
              <div key={idx} className="hover:bg-slate-900/60 px-1 py-0.5 rounded flex gap-4">
                <span className="text-slate-600 select-none w-5 text-right font-mono">
                  {idx + 1}
                </span>
                <span
                  className={cn(
                    line.startsWith('function') && 'text-cyan-400 font-semibold',
                    line.includes('return') && 'text-amber-400 font-semibold',
                    line.includes('while') && 'text-purple-400 font-semibold',
                    line.includes('for each') && 'text-indigo-400 font-semibold',
                    line.includes('if') && 'text-rose-400 font-semibold'
                  )}
                >
                  {line}
                </span>
              </div>
            ))}
          </pre>
        </div>
      )}
    </div>
  );
};
