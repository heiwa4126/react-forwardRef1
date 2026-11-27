/**
 * Returns an iterator that iterates integers in [start, end).
 */
export function* range(start: number, end: number) {
  for (let i = start; i < end; i++) {
    yield i;
  }
}

/**
 * Returns a random integer between min and max, inclusive.
 */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
