export interface DataNode<T> {
    element: T;
    children?:DataNode<T>[];
  }
  