'use client';

import React from 'react';
import { Compass, GitBranch, MapPin, Cpu, BookOpen, ShieldCheck } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const topics = [
    {
      icon: <GitBranch className="w-5 h-5 text-cyan-400" />,
      title: 'Graph Theory Foundations',
      description:
        'A graph G = (V, E) comprises a set of vertices (nodes) and connecting edges. In a pathfinding grid, each cell is a vertex and orthogonal adjacent cells form bidirectional edges.',
    },
    {
      icon: <Compass className="w-5 h-5 text-indigo-400" />,
      title: 'Heuristic Distance Functions',
      description:
        'A* and Greedy Best-First use heuristic estimates like Manhattan Distance (|x1 - x2| + |y1 - y2|) or Euclidean Distance (√((x1-x2)² + (y1-y2)²)) to guide exploration towards the target.',
    },
    {
      icon: <Cpu className="w-5 h-5 text-purple-400" />,
      title: 'Priority Queue Optimizations',
      description:
        'Dijkstra and A* maintain a Min-Heap / Priority Queue of frontier nodes, ensuring each step expands the most promising node with logarithmic extract-min operations.',
    },
    {
      icon: <MapPin className="w-5 h-5 text-emerald-400" />,
      title: 'Real-World Applications',
      description:
        'Used in GPS routing (Google Maps, Waze), Autonomous Vehicle path planning, Packet Routing in the Internet Protocol stack, NPC movement in video games, and VLSI circuit layout.',
    },
  ];

  return (
    <section id="about" className="py-16 scroll-mt-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Academic Context</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            About Graph Path Finding in DSA
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mt-3 leading-relaxed">
            Understanding graph theory principles is fundamental for solving network optimization,
            search problems, and dynamic programming challenges.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {topics.map((topic, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-xl flex gap-4 items-start shadow-xl hover:border-slate-700/80 transition-all"
            >
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 shrink-0">
                {topic.icon}
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-base font-bold text-white">{topic.title}</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {topic.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
