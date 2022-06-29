import { BinaryDataNode } from "../models/binary-node.model";
import { DataNode } from "../models/node.model";
import { equals } from "ramda";

export function pathFor<T>(node: DataNode<T>): DataNode<T>[] {
  return [];
}

export function binaryTreeLevelFor<T>(node: BinaryDataNode<T>, treeNode: BinaryDataNode<T> | undefined | null): number | null {

  if (treeNode === undefined || treeNode === null) {
    return null;
  } else if (isBinaryTreeSingle<T>(treeNode)) {
    equals(treeNode.element, node.element) ? 1 : null;
  } else if (isUnaryLeftTree(treeNode)) {
    if (equals(treeNode.element, node.element)) {
      return 1
    } else {
      const result = binaryTreeLevelFor<T>(node, node.childLeft);
      return result === null ? result : 1 + result
    }
  } else if (isUnaryRightTree(treeNode)) {
    if (equals(treeNode.element, node.element)) {
      return 1
    } else {
      const result = binaryTreeLevelFor<T>(node, node.childRight);
      return result === null ? result : 1 + result
    }
  } else {
    if (equals(treeNode.element, node.element)) {
      return 1
    } else {
      const result = binaryTreeLevelFor<T>(node, node.childLeft);
      if (result === null) {
        const rightResult = binaryTreeLevelFor<T>(node, node.childRight)
        return rightResult === null ? rightResult : 1 + rightResult
      } else {
        return 1 + result;
      }
    }
  }
}

export function depthFor<T>(node: DataNode<T>): number {
  return 0;
}

export function widthFor<T>(node: DataNode<T>): number {
  // need more explanation
  return 0;
}

export function isBinaryTreeSingle<T>(node: BinaryDataNode<T>): boolean {
  return !node.childLeft && !node.childRight;
}

export function isUnaryLeftTree<T>(node: BinaryDataNode<T>): boolean {
  return node.childLeft !== undefined && node.childRight === undefined;
}

export function isUnaryRightTree<T>(node: BinaryDataNode<T>): boolean {
  return node.childLeft === undefined && node.childRight !== undefined;
}

export function numberOfBinaryTreeNode<T>(node: BinaryDataNode<T> | undefined): number {
  if (node === undefined || node === null) {
    return 0;
  } else if (isBinaryTreeSingle<T>(node)) {
    return 1;
  } else if (isUnaryLeftTree(node)) {
    return 1 + numberOfBinaryTreeNode<T>(node.childLeft);
  } else if (isUnaryRightTree(node)) {
    return 1 + numberOfBinaryTreeNode(node.childRight);
  } else {
    return (
      1 +
      numberOfBinaryTreeNode(node.childLeft) +
      numberOfBinaryTreeNode(node.childRight)
    );
  }
}
