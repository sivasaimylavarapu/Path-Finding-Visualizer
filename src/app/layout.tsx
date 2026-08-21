import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';

export const metadata: Metadata = {
  title: 'Path Finding Visualizer | Interactive Graph Algorithms & DSA Laboratory',
  description:
    'An interactive visualization platform that demonstrates how graph algorithms explore nodes and discover shortest paths between a starting point and destination.',
  keywords: [
    'Path Finding Visualizer',
    'Dijkstra Algorithm',
    'A* Search',
    'Breadth First Search',
    'Depth First Search',
    'Graph Algorithms',
    'Data Structures and Algorithms',
    'DSA Project',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#050811] text-slate-100 min-h-screen flex flex-col antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
        <Header />
        <main className="flex-grow">{children}</main>
      </body>
    </html>
  );
}
