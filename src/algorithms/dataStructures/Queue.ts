/**
 * Efficient First-In-First-Out (FIFO) Queue implementation for BFS
 * Avoids O(N) array.shift() performance overhead with head pointer indexing
 */
export class Queue<T> {
  private items: T[] = [];
  private head: number = 0;

  public enqueue(item: T): void {
    this.items.push(item);
  }

  public dequeue(): T | null {
    if (this.isEmpty()) return null;
    const item = this.items[this.head];
    this.head++;
    // Compact periodically to free memory
    if (this.head > 500 && this.head > this.items.length / 2) {
      this.items = this.items.slice(this.head);
      this.head = 0;
    }
    return item;
  }

  public peek(): T | null {
    return this.isEmpty() ? null : this.items[this.head];
  }

  public size(): number {
    return this.items.length - this.head;
  }

  public isEmpty(): boolean {
    return this.size() === 0;
  }
}
