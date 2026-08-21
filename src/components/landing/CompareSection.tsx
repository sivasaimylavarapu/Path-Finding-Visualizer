'use client';

import React from 'react';
import { ALGORITHMS } from '@/utils/constants';
import { Layers, CheckCircle2, XCircle, Sparkles } from 'lucide-react';

export const CompareSection: React.FC = () => {
  const algoList = Object.values(ALGORITHMS);

  return (
    <section id="compare" className="py-16 scroll-mt-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>DSA Matrix Analysis</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Algorithm Comparison Matrix
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mt-3 leading-relaxed">
            Side-by-side technical evaluation of graph pathfinding algorithms for college coursework
            and exam preparation.
          </p>
        </div>

        {/* Table Container */}
        <div className="w-full overflow-x-auto rounded-2xl bg-slate-900/60 border border-slate-800/90 shadow-2xl backdrop-blur-xl">
          <table className="w-full text-left text-xs sm:text-sm text-slate-300">
            <thead className="bg-slate-950/80 text-slate-400 uppercase tracking-wider text-[11px] font-mono border-b border-slate-800">
              <tr>
                <th scope="col" className="px-6 py-4">Algorithm</th>
                <th scope="col" className="px-6 py-4">Shortest Path?</th>
                <th scope="col" className="px-6 py-4">Weighted Graphs</th>
                <th scope="col" className="px-6 py-4">Heuristic Support</th>
                <th scope="col" className="px-6 py-4">Time Complexity</th>
                <th scope="col" className="px-6 py-4">Space Complexity</th>
                <th scope="col" className="px-6 py-4">Key Data Structure</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70">
              {algoList.map((algo) => (
                <tr
                  key={algo.id}
                  className="hover:bg-slate-800/40 transition-colors"
                >
                  <td className="px-6 py-4 font-semibold text-white">
                    <div className="flex flex-col">
                      <span>{algo.name}</span>
                      <span className="text-[11px] text-cyan-400 font-mono font-normal">
                        {algo.category}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {algo.guaranteesShortestPath ? (
                      <span className="inline-flex items-center gap-1.5 text-emerald-400 font-mono text-xs">
                        <CheckCircle2 className="w-4 h-4" />
                        Guaranteed
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-slate-500 font-mono text-xs">
                        <XCircle className="w-4 h-4" />
                        No Guarantee
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 font-mono text-xs">
                    {algo.isWeighted ? (
                      <span className="text-emerald-400">Yes (Costs)</span>
                    ) : (
                      <span className="text-slate-500">Unweighted only</span>
                    )}
                  </td>
                  <td className="px-6 py-4 font-mono text-xs">
                    {algo.category === 'heuristic' ? (
                      <span className="text-cyan-300">Yes (h(n))</span>
                    ) : (
                      <span className="text-slate-500">None (Radial)</span>
                    )}
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-cyan-300">
                    {algo.timeComplexity}
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-purple-300">
                    {algo.spaceComplexity}
                  </td>
                  <td className="px-6 py-4 font-mono text-[11px] text-slate-400">
                    {algo.dataStructure}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
