export interface BinaryNode<T> {
    root: T;
    childLeft?:BinaryNode<T>;
    childRight?:BinaryNode<T>;
}