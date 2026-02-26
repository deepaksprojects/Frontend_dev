/**
 * Flattens a nested array up to the specified depth.
 * Similar to Array.prototype.flat()
 *
 * @typeParam T - The type of elements in the array
 *
 * @param arr - The input array that may contain nested arrays
 * @param depth - Maximum depth to flatten (default = 1). Use Infinity for full flatten.
 *
 * @returns A new flattened array
 *
 * @example
 * flat([1, [2, [3]]], 1)
 * // → [1, 2, [3]]
 *
 * @example
 * flat([1, [2, [3]]], 2)
 * // → [1, 2, 3]
 *
 * @example
 * flat([1, [2, [3]]], Infinity)
 * // → [1, 2, 3]
 */
export function flat<T>(arr: readonly unknown[], depth: number = 1): T[] {
    // Result array that stores flattened values
    const result: T[] = [];
  
    /**
     * Internal recursive helper function
     *
     * @param currentArr - Current array being processed
     * @param currentDepth - Remaining depth allowed
     */
    function flattenHelper(currentArr: readonly unknown[], currentDepth: number): void {
      for (let i = 0; i < currentArr.length; i++) {
  
        // Skip empty slots (holes in sparse arrays)
        if (!(i in currentArr)) continue;
  
        const value = currentArr[i];
  
        // If value is array and depth allows flattening
        if (Array.isArray(value) && currentDepth > 0) {
  
          flattenHelper(
            value,
            currentDepth === Infinity ? Infinity : currentDepth - 1
          );
  
        } else {
  
          // Add value directly to result
          result[result.length] = value as T;
  
        }
      }
    }
  
    // Start flattening process
    flattenHelper(arr, depth);
  
    return result;
  }
  
  
  // Example usage
  const arr: any[] = [1, 2];
  arr[4] = undefined;
  arr[5] = [3, 4];
  arr[5][4] = [5, 6, [7, 8, [9, 10]]];
  
  const output = flat<number | undefined>(arr, Infinity);
  
  console.log(output);
  
  // Output:
  // [1, 2, undefined, 3, 4, 5, 6, 7, 8, 9, 10]