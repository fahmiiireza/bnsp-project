/**
 * Utility class to process arrays with manual sorting algorithms.
 */
export class ArrayUtils {
  /**
   * Sorts an array of numbers using a manual bubble sort algorithm.
   * @param {number[]} arr - The array of numbers to sort.
   * @param {'asc' | 'desc'} order - The sorting order.
   * @returns {number[]} The sorted array.
   */
  public static sortNumbers(arr: number[], order: 'asc' | 'desc' = 'asc'): number[] {
    const result = [...arr]; // Copy array
    const length = result.length;
    for (let i = 0; i < length - 1; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        const condition = order === 'asc' ? result[j] > result[j + 1] : result[j] < result[j + 1];
        if (condition) {
          // Swap
          const temp = result[j];
          result[j] = result[j + 1];
          result[j + 1] = temp;
        }
      }
    }
    return result;
  }

  /**
   * Filters an array of objects based on a property matching a value.
   * Method overloading example.
   * @param items The items to filter.
   * @param property The property name to check.
   * @param value The value to match.
   */
  public static filterByProperty<T, K extends keyof T>(items: T[], property: K, value: T[K]): T[] {
    const result: T[] = [];
    const length = items.length;
    for (let i = 0; i < length; i++) {
      if (items[i][property] === value) {
        result.push(items[i]);
      }
    }
    return result;
  }
}
