
export function calculateSequenceSize<T extends {size:number}>(data: T[]): number {
  const initialSize = 0;
  return data.reduce((size, element) => {
    return size + element.size
  }, initialSize);
}
