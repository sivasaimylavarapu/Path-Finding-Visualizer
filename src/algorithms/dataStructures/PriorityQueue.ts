/**
 * Generic Binary Min-Heap Priority Queue implementation for graph algorithms
 * Time Complexities:
 *  - Insertion (enqueue): O(log N)
 *  - Extract Min (dequeue): O(log N)
 *  - Peek: O(1)
 *  - Size: O(1)
 */
export class PriorityQueue<T> {
  private heap: T[] = [];
  private comparator: (a: T, b: T) => number;

  constructor(comparator: (a: T, b: T) => number) {
    this.comparator = comparator;
  }

  public size(): number {
    return this.heap.length;
  }

  public isEmpty(): boolean {
    return this.heap.length === 0;
  }

  public peek(): T | null {
    return this.isEmpty() ? null : this.heap[0];
  }

  public enqueue(item: T): void {
    this.heap.push(item);
    this.bubbleUp(this.heap.length - 1);
  }

  public dequeue(): T | null {
    if (this.isEmpty()) return null;
    const min = this.heap[0];
    const end = this.heap.pop();
    if (this.heap.length > 0 && end !== undefined) {
      this.heap[0] = end;
      this.sinkDown(0);
    }
    return min;
  }

  private bubbleUp(index: number): void {
    let currentIdx = index;
    const item = this.heap[currentIdx];

    while (currentIdx > 0) {
      const parentIdx = Math.floor((currentIdx - 1) / 2);
      const parent = this.heap[parentIdx];

      if (this.comparator(item, parent) >= 0) break;

      this.heap[currentIdx] = parent;
      currentIdx = parentIdx;
    }
    this.heap[currentIdx] = item;
  }

  private sinkDown(index: number): void {
    let currentIdx = index;
    const length = this.heap.length;
    const item = this.heap[currentIdx];

    while (true) {
      const leftChildIdx = 2 * currentIdx + 1;
      const rightChildIdx = 2 * currentIdx + 2;
      let swapIdx: number | null = null;

      if (leftChildIdx < length) {
        const leftChild = this.heap[leftChildIdx];
        if (this.comparator(leftChild, item) < 0) {
          swapIdx = leftChildIdx;
        }
      }

      if (rightChildIdx < length) {
        const rightChild = this.heap[rightChildIdx];
        if (
          (swapIdx === null && this.comparator(rightChild, item) < 0) ||
          (swapIdx !== null && this.comparator(rightChild, this.heap[swapIdx]) < 0)
        ) {
          swapIdx = rightChildIdx;
        }
      }

      if (swapIdx === null) break;

      this.heap[currentIdx] = this.heap[swapIdx];
      currentIdx = swapIdx;
    }
    this.heap[currentIdx] = item;
  }
}
