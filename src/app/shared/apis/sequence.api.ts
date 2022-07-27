
import { curry, equals, head, isEmpty, prepend, tail } from 'ramda';

/**
 * a, [a] -> b
 * @param element 
 * @param sequence 
 * @returns 
 */
export function embelishIncludes<T>(element: T, sequence: Array<T>): { bool: boolean, seq: Array<T> } {
  if (isEmpty(sequence)) {
    return { bool: false, seq: [] }
  }
  const { bool, seq } = embelishIncludes(element, tail(sequence));
  if (bool) {
    return { bool, seq: [head(sequence) as T, ...seq] }
  }
  if (!bool && equals(element, head(sequence) as T)) {
    return { bool: true, seq }

  }

  return { bool, seq: [head(sequence) as T, ...seq] }
}

/**
 * [element], [element] -> boolean
 * @param sequence1 
 * @param sequence2 
 * @returns 
 */
export function hasSameSise<T>(sequence1: Array<T>, sequence2: Array<T>): boolean {
  return sequence1.length === sequence2.length
}

/**
 * [a], [a] -> b
 * @param sequence1 
 * @param sequence2 
 * @returns 
 */
export function hasSameElements<T>(sequence1: Array<T>, sequence2: Array<T>): boolean {
  if (isEmpty(sequence1) && isEmpty(sequence2)) {
    return true;
  }
  if (isEmpty(sequence1) && !isEmpty(sequence2)) {
    return false;
  }
  if (!isEmpty(sequence1) && isEmpty(sequence2)) {
    return false;
  }
  const { bool, seq } = embelishIncludes(head(sequence1) as T, sequence2);
  return bool && hasSameElements(tail(sequence1), seq)

}

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

