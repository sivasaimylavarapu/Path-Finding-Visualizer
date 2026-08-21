import { AlgorithmInfo, AlgorithmType } from '@/types/algorithm';
import { Coordinate, GridDimensions } from '@/types/grid';
import { VisualizationSpeed } from '@/types/visualizer';

export const DEFAULT_GRID_DIMENSIONS: GridDimensions = {
  rows: 21,
  cols: 47,
};

export const DEFAULT_START_NODE: Coordinate = {
  row: 10,
  col: 8,
};

export const DEFAULT_TARGET_NODE: Coordinate = {
  row: 10,
  col: 38,
};

export const SPEED_DELAYS: Record<VisualizationSpeed, number> = {
  slow: 35,
  medium: 15,
  fast: 5,
  instant: 0,
};

export const ALGORITHMS: Record<AlgorithmType, AlgorithmInfo> = {
  dijkstra: {
    id: 'dijkstra',
    name: "Dijkstra's Algorithm",
    shortName: 'Dijkstra',
    tagline: 'The father of pathfinding algorithms; guarantees shortest path.',
    category: 'weighted',
    guaranteesShortestPath: true,
    isWeighted: true,
    timeComplexity: 'O((V + E) log V)',
    spaceComplexity: 'O(V)',
    dataStructure: 'Min-Priority Queue / Min-Heap',
    formula: 'dist[v] = min(dist[v], dist[u] + weight(u, v))',
    summary:
      'Dijkstra explores radially from the source node by repeatedly visiting the unvisited vertex with the smallest tentative distance.',
    description:
      'Invented by computer scientist Edsger W. Dijkstra in 1956, this algorithm computes single-source shortest paths on graphs with non-negative edge weights. It serves as the foundation for modern network routing protocols (like OSPF and IS-IS).',
    pseudocode: [
      'function Dijkstra(Graph, source):',
      '  dist[source] = 0',
      '  create vertex min-priority queue Q',
      '  for each vertex v in Graph: if v != source then dist[v] = infinity',
      '  Q.push(source, 0)',
      '  while Q is not empty:',
      '    u = Q.extractMin()',
      '    if u == target then return reconstructPath(u)',
      '    for each neighbor v of u:',
      '      alt = dist[u] + weight(u, v)',
      '      if alt < dist[v]:',
      '        dist[v] = alt',
      '        parent[v] = u',
      '        Q.decreaseKey(v, alt)',
    ],
    keyHighlights: [
      'Guarantees the optimal shortest path for weighted non-negative graphs',
      'Explores evenly in all directions without target heuristic',
      'Time complexity is optimal using binary/Fibonacci heaps',
    ],
  },
  astar: {
    id: 'astar',
    name: 'A* (A-Star) Search',
    shortName: 'A*',
    tagline: 'Smart heuristic-guided pathfinding; fast and optimal.',
    category: 'heuristic',
    guaranteesShortestPath: true,
    isWeighted: true,
    timeComplexity: 'O(E) in best case, O(b^d) in worst case',
    spaceComplexity: 'O(V)',
    dataStructure: 'Min-Priority Queue & Admissible Heuristic (Manhattan/Euclidean)',
    formula: 'f(n) = g(n) + h(n)',
    summary:
      'A* combines the precision of Dijkstra with the targeted speed of Greedy Best-First by prioritizing nodes with minimum f(n) = g(n) + h(n).',
    description:
      'First published in 1968 by Peter Hart, Nils Nilsson and Bertram Raphael, A* is widely considered one of the best pathfinding algorithms in AI, gaming, and robotics because it intelligently prunes unnecessary graph search paths using a heuristic.',
    pseudocode: [
      'function AStar(start, goal, h):',
      '  openSet = PriorityQueue()',
      '  openSet.push(start, fScore[start] = h(start))',
      '  gScore[start] = 0',
      '  while openSet is not empty:',
      '    current = openSet.popMin()',
      '    if current == goal then return reconstructPath(current)',
      '    for each neighbor of current:',
      '      tentative_g = gScore[current] + weight(current, neighbor)',
      '      if tentative_g < gScore[neighbor]:',
      '        parent[neighbor] = current',
      '        gScore[neighbor] = tentative_g',
      '        fScore[neighbor] = tentative_g + h(neighbor, goal)',
      '        openSet.insertOrUpdate(neighbor, fScore[neighbor])',
    ],
    keyHighlights: [
      'Guarantees shortest path if heuristic is admissible (never overestimates)',
      'Significantly fewer visited nodes compared to Dijkstra',
      'Widely used in game AI, GPS navigation, and robotics motion planning',
    ],
  },
  bfs: {
    id: 'bfs',
    name: 'Breadth-First Search (BFS)',
    shortName: 'BFS',
    tagline: 'Level-by-level exploration; guarantees shortest path on unweighted graphs.',
    category: 'unweighted',
    guaranteesShortestPath: true,
    isWeighted: false,
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    dataStructure: 'First-In-First-Out (FIFO) Queue',
    formula: 'Queue.enqueue(neighbor)',
    summary:
      'BFS explores all immediate neighbors at current depth level before moving to vertices at the next depth level.',
    description:
      'Formulated in 1945 by Konrad Zuse and reinvented by Edward F. Moore in 1959 for maze solving, BFS finds the minimum number of edge transitions to reach any node in an unweighted graph.',
    pseudocode: [
      'function BFS(start, goal):',
      '  queue = Queue()',
      '  visited = Set()',
      '  queue.enqueue(start)',
      '  visited.add(start)',
      '  while queue is not empty:',
      '    current = queue.dequeue()',
      '    if current == goal then return reconstructPath(current)',
      '    for each neighbor in getUnvisitedNeighbors(current):',
      '      visited.add(neighbor)',
      '      parent[neighbor] = current',
      '      queue.enqueue(neighbor)',
    ],
    keyHighlights: [
      'Optimal for unweighted graphs (fewest steps/edges)',
      'Uniform ripple-like outward expansion',
      'High space complexity because all frontier nodes are kept in memory',
    ],
  },
  dfs: {
    id: 'dfs',
    name: 'Depth-First Search (DFS)',
    shortName: 'DFS',
    tagline: 'Deep exploratory traversal; does not guarantee shortest path.',
    category: 'unweighted',
    guaranteesShortestPath: false,
    isWeighted: false,
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V) (recursion stack)',
    dataStructure: 'Last-In-First-Out (LIFO) Stack / Recursion',
    formula: 'Stack.push(neighbor)',
    summary:
      'DFS dives as deep as possible along each branch before backtracking to explore alternative branches.',
    description:
      'A 19th-century graph exploration algorithm popularized by Pierre Tremaux for maze solving. While poor for shortest path finding, DFS is essential for cycle detection, topological sorting, and strongly connected components.',
    pseudocode: [
      'function DFS(start, goal):',
      '  stack = Stack()',
      '  stack.push(start)',
      '  visited = Set()',
      '  while stack is not empty:',
      '    current = stack.pop()',
      '    if current == goal then return reconstructPath(current)',
      '    if current not in visited:',
      '      visited.add(current)',
      '      for each neighbor in getUnvisitedNeighbors(current):',
      '        parent[neighbor] = current',
      '        stack.push(neighbor)',
    ],
    keyHighlights: [
      'Very poor for shortest paths — may wander through entire grid',
      'Low memory footprint for sparse deep trees',
      'Fundamental for topological sorting and cycle detection',
    ],
  },
  'greedy-best-first': {
    id: 'greedy-best-first',
    name: 'Greedy Best-First Search',
    shortName: 'Greedy BFS',
    tagline: 'Heuristic-only driven search; fast but not guaranteed optimal.',
    category: 'heuristic',
    guaranteesShortestPath: false,
    isWeighted: true,
    timeComplexity: 'O(b^m) in worst case',
    spaceComplexity: 'O(V)',
    dataStructure: 'Min-Priority Queue sorted strictly by h(n)',
    formula: 'f(n) = h(n)',
    summary:
      'Greedy Best-First strictly follows the heuristic estimate to the goal, ignoring path cost from the start node.',
    description:
      'By focusing purely on estimated distance to the target, Greedy Best-First rushes toward the objective. It often navigates around obstacles fast, but can get trapped in local minima or pick suboptimal detours.',
    pseudocode: [
      'function GreedyBestFirst(start, goal, h):',
      '  openSet = PriorityQueue()',
      '  openSet.push(start, priority = h(start, goal))',
      '  while openSet is not empty:',
      '    current = openSet.popMin()',
      '    if current == goal then return reconstructPath(current)',
      '    for each neighbor in getUnvisitedNeighbors(current):',
      '      parent[neighbor] = current',
      '      openSet.push(neighbor, priority = h(neighbor, goal))',
    ],
    keyHighlights: [
      'Extremely aggressive towards the target node',
      'Susceptible to dead-ends and maze traps',
      'Useful baseline to compare against A*',
    ],
  },
};
