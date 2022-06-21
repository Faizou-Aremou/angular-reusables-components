import { BinaryNode } from "../models/binary-node.model";
import { DataNode } from "../models/node.model";

export function pathFor<T>(node: DataNode<T>): DataNode<T>[] {
  return [];
}

export function degreeFor<T>(node: DataNode<T>): number {
  return 0;
}
export function levelFor<T>(node: DataNode<T>): number {
  return 0;
}

export function depthFor<T>(node: DataNode<T>): number {
  return 0;
}

export function widthFor<T>(node: DataNode<T>): number {
  // need more explanation
  return 0;
}

export function isBinaryTreeSingle<T>(node: BinaryNode<T>): boolean {
  return !node.childrenLeft && !node.childrenRight;
}

export function isUnaryLeftTree<T>(node: BinaryNode<T>): boolean {
  return node.childrenLeft !== undefined && node.childrenRight === undefined;
}

export function isUnaryRightTree<T>(node: BinaryNode<T>): boolean {
  return node.childrenLeft === undefined && node.childrenRight !== undefined;
}

export function nbBinaryTreeNode<T>(node: BinaryNode<T> | undefined): number {
  if (node === undefined) {
    return 0;
  } else if (isBinaryTreeSingle<T>(node)) {
    return 1;
  } else if (isUnaryLeftTree(node)) {
    return 1 + nbBinaryTreeNode<T>(node.childrenLeft);
  } else if (isUnaryRightTree(node)) {
    return 1 + nbBinaryTreeNode(node.childrenRight);
  } else {
    return (
      1 +
      nbBinaryTreeNode(node.childrenLeft) +
      nbBinaryTreeNode(node.childrenRight)
    );
  }
}
