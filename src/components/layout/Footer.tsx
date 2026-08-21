'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, Github, BookOpen, Layers, Code, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800/80 text-slate-400 text-xs mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-900">
          {/* Col 1: Brand & Purpose */}
          <div className="flex flex-col gap-3 md:col-span-1">
            <div className="flex items-center gap-2 text-white">
              <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                <Compass className="w-4 h-4" />
              </div>
              <span className="font-bold text-sm tracking-tight">PATH FINDING VISUALIZER</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              An interactive computer science educational platform designed to help students and
              engineers master graph traversal algorithms and data structures.
            </p>
          </div>

          {/* Col 2: Supported Algorithms */}
          <div className="flex flex-col gap-2">
            <h4 className="font-semibold text-slate-200 uppercase tracking-wider text-[11px]">
              Algorithms
            </h4>
            <ul className="flex flex-col gap-1.5 text-slate-400">
              <li>
                <Link href="#visualizer" className="hover:text-cyan-400 transition-colors">
                  Dijkstra's Algorithm
                </Link>
              </li>
              <li>
                <Link href="#visualizer" className="hover:text-cyan-400 transition-colors">
                  A* (A-Star) Search
                </Link>
              </li>
              <li>
                <Link href="#visualizer" className="hover:text-cyan-400 transition-colors">
                  Breadth-First Search (BFS)
                </Link>
              </li>
              <li>
                <Link href="#visualizer" className="hover:text-cyan-400 transition-colors">
                  Depth-First Search (DFS)
                </Link>
              </li>
              <li>
                <Link href="#visualizer" className="hover:text-cyan-400 transition-colors">
                  Greedy Best-First Search
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Core DSA Concepts */}
          <div className="flex flex-col gap-2">
            <h4 className="font-semibold text-slate-200 uppercase tracking-wider text-[11px]">
              DSA Concepts
            </h4>
            <ul className="flex flex-col gap-1.5 text-slate-400">
              <li>Graph Theory & Adjacency</li>
              <li>Priority Queues & Min-Heaps</li>
              <li>Admissible Heuristics</li>
              <li>Asymptotic Complexity Analysis</li>
              <li>Recursive Maze Generation</li>
            </ul>
          </div>

          {/* Col 4: Platform Specs */}
          <div className="flex flex-col gap-2">
            <h4 className="font-semibold text-slate-200 uppercase tracking-wider text-[11px]">
              Technology Stack
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Built with Next.js 15, React 19, TypeScript, and Tailwind CSS using a modular
              component architecture.
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono text-cyan-300 w-fit mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Stage 1 Foundation Active
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <p>© {new Date().getFullYear()} Path Finding Visualizer. Designed for College DSA Coursework.</p>
          <div className="flex items-center gap-4">
            <Link href="#home" className="hover:text-slate-300">
              Back to Top ↑
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
