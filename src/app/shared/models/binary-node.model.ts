export interface BinaryNode<T> {
    element: T;
    childLeft?:BinaryNode<T>;
    childRight?:BinaryNode<T>;
}