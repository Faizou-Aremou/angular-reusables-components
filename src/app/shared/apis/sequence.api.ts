
import { curry, head, isEmpty, prepend, tail } from 'ramda';


/**
 * insertionSort:: [T], fn -> [T]
 */

export function insertionSort<T>(
  supComparisonFn: (element1: T, element2: T) => boolean,
  list: T[]
): T[] {
  return isEmpty(list)
    ? []
    : insertion<T>(
        supComparisonFn,
        insertionSort(supComparisonFn, tail(list)),
        head(list) as T
      );
}
export const insertionSortCu = curry(insertionSort);
/**
 *insertion:: [T], T, fn -> [T]
 */
export function insertion<T>(
  supComparisonFn: (element1: T, element2: T) => boolean,
  list: T[],
  element: T
): T[] {
  switch (list.length) {
    case 0:
      return [element];
    default:
      return supComparisonFn(head(list) as T, element)
        ? [element, head(list) as T, ...tail(list)]
        : [head(list) as T, ...insertion(supComparisonFn, tail(list), element)];
  }
}
/**
 * quickSort:: [T], fn -> [T]
 */

export function quickSort<T>(
  supComparisonFn: (element1: T, element2: T) => boolean,
  sequence: T[]
): T[] {
  switch (sequence.length) {
    case 0:
      return [];
    case 1:
      return sequence.slice();
    default:
      const { inferiorSequence, superiorSequence } = sliceSort(
        supComparisonFn,
        tail(sequence),
        head(sequence) as T
      );
      return [
        ...quickSort(supComparisonFn, inferiorSequence),
        head(sequence) as T,
        ...quickSort(supComparisonFn, superiorSequence),
      ];
  }
}
/**
 * sliceSort:: [T], element, fn -> { inferiorSequence: T[]; superiorSequence: T[] }
 */
export function sliceSort<T>(
  supComparisonFn: (element1: T, element2: T) => boolean,
  sequence: T[],
  element: T
): { inferiorSequence: T[]; superiorSequence: T[] } {
  switch (sequence.length) {
    case 0:
      return { inferiorSequence: [], superiorSequence: [] };
    case 1:
      return supComparisonFn(head(sequence) as T, element)
        ? { inferiorSequence: [], superiorSequence: sequence.slice() }
        : {
            inferiorSequence: sequence.slice(),
            superiorSequence: [],
          };
    default:
      const { inferiorSequence, superiorSequence } = sliceSort(
        supComparisonFn,
        tail(sequence),
        element
      );
      return head(sequence) as T > element
        ? {
            inferiorSequence: inferiorSequence,
            superiorSequence: prepend(head(sequence) as T, superiorSequence),
          }
        : {
            inferiorSequence: prepend(head(sequence) as T, inferiorSequence),
            superiorSequence: superiorSequence,
          };
  }
}




