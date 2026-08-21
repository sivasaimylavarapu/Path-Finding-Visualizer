'use client';

import React from 'react';
import { Compass, Flag, Weight, Sparkles } from 'lucide-react';

export const Legend: React.FC = () => {
  const legendItems = [
    {
      label: 'Start Node',
      description: 'Source origin',
      element: (
        <div className="w-5 h-5 rounded-[3px] bg-emerald-500 text-slate-950 flex items-center justify-center shadow-glow-start">
          <Compass className="w-3.5 h-3.5 stroke-[2.5]" />
        </div>
      ),
    },
    {
      label: 'Target Node',
      description: 'Destination goal',
      element: (
        <div className="w-5 h-5 rounded-[3px] bg-rose-500 text-white flex items-center justify-center shadow-glow-target">
          <Flag className="w-3 h-3 fill-current" />
        </div>
      ),
    },
    {
      label: 'Wall / Obstacle',
      description: 'Impassable barrier',
      element: (
        <div className="w-5 h-5 rounded-[3px] bg-slate-800 border border-slate-700/90 shadow-inner" />
      ),
    },
    {
      label: 'Weighted Node',
      description: 'Cost = 5 units',
      element: (
        <div className="w-5 h-5 rounded-[3px] bg-amber-500/20 border border-amber-500/60 text-amber-300 flex items-center justify-center text-[10px] font-mono font-bold">
          5
        </div>
      ),
    },
    {
      label: 'Visited Node',
      description: 'Explored vertex',
      element: (
        <div className="w-5 h-5 rounded-[3px] bg-cyan-950/60 border border-cyan-700/50 shadow-sm" />
      ),
    },
    {
      label: 'Shortest Path',
      description: 'Optimal route',
      element: (
        <div className="w-5 h-5 rounded-[3px] bg-gradient-to-r from-cyan-400 to-indigo-400 border border-cyan-300 shadow-glow" />
      ),
    },
    {
      label: 'Unvisited Node',
      description: 'Standard grid cell',
      element: (
        <div className="w-5 h-5 rounded-[3px] bg-slate-950/40 border border-slate-800/60" />
      ),
    },
  ];

  return (
    <div className="w-full bg-slate-900/50 border border-slate-800/80 rounded-2xl p-3.5 sm:p-4 backdrop-blur-xl">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
        <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">
          Visual Legend & Key
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
        {legendItems.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2.5">
            {item.element}
            <div className="flex flex-col">
              <span className="text-xs font-medium text-slate-200">{item.label}</span>
              <span className="text-[10px] text-slate-500">{item.description}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
