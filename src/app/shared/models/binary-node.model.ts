export interface BinaryNode<T> {
    element: T;
    childrenLeft?:BinaryNode<T>;
    childrenRight?:BinaryNode<T>;
}