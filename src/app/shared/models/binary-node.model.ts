export interface BinaryDataNode<T> {
    element: T;
    childLeft?:BinaryDataNode<T>;
    childRight?:BinaryDataNode<T>;
}