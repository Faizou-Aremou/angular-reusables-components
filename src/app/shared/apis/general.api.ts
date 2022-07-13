export function calculateSizeFor<T extends { size: number }>(
  data: T[]
): number {
  const initialSize = 0;
  return data.reduce((size, element) => {
    return size + element.size;
  }, initialSize);
}
export function removeOne(number: number): number {
  return number - 1;
}
