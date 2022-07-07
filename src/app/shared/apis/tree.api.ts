import { BinaryNode } from "../models/binary-node.model";
import { NaryNode } from "../models/node.model";

export function isBinaryTree<T>(
  node: BinaryNode<T> | NaryNode<T>
): node is BinaryNode<T> {
  return "childLeft" in node && "childRight" in node;
}

export function isNaryTree<T>(
  node: BinaryNode<T> | NaryNode<T>
): node is NaryNode<T> {
  return "children" in node;
}
export function degree<T>(
    node: BinaryNode<T> | NaryNode<T> | null | undefined
  ): number {
    return 0;
  }