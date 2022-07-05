import { BinaryDataNode } from "../models/binary-node.model";
import { DataNode } from "../models/node.model";
import { equals, isEmpty } from "ramda";

export function numberOfBinaryTreeNode<T>(
  node: BinaryDataNode<T> | undefined
): number {
  if (isBinaryEmpty(node)) {
    return 0;
  } else if (isBinarySingleton<T>(node)) {
    return 1;
  } else if (isUnaryLeft(node)) {
    return 1 + numberOfBinaryTreeNode<T>(node.childLeft);
  } else if (isUnaryRight(node)) {
    return 1 + numberOfBinaryTreeNode(node.childRight);
  } else {
    return (
      1 +
      numberOfBinaryTreeNode(node.childLeft) +
      numberOfBinaryTreeNode(node.childRight)
    );
  }
}
export function binaryTreeLevelFor<T>(
  node: BinaryDataNode<T>,
  treeNode: BinaryDataNode<T> | undefined | null
): number | null {
  if (isBinaryEmpty(treeNode)) {
    return null;
  } else if (isBinarySingleton<T>(treeNode)) {
    return equals(treeNode.element, node.element) ? 1 : null;
  } else if (isUnaryLeft(treeNode)) {
    if (equals(treeNode.element, node.element)) {
      return 1;
    } else {
      const result = binaryTreeLevelFor<T>(node, node.childLeft);
      return result === null ? result : 1 + result;
    }
  } else if (isUnaryRight(treeNode)) {
    if (equals(treeNode.element, node.element)) {
      return 1;
    } else {
      const result = binaryTreeLevelFor<T>(node, node.childRight);
      return result === null ? result : 1 + result;
    }
  } else {
    if (equals(treeNode.element, node.element)) {
      return 1;
    } else {
      const result = binaryTreeLevelFor<T>(node, node.childLeft);
      if (result === null) {
        const rightResult = binaryTreeLevelFor<T>(node, node.childRight);
        return rightResult === null ? rightResult : 1 + rightResult;
      } else {
        return 1 + result;
      }
    }
  }
}

export function pathFor<T>(node: DataNode<T>): DataNode<T>[] {
  return [];
}

export function depthFor<T>(node: DataNode<T>): number {
  return 0;
}

export function widthFor<T>(node: DataNode<T>): number {
  // need more explanation
  return 0;
}

export function degree<T>(
  node: BinaryDataNode<T> | DataNode<T> | null | undefined
): number {
  return 0;
}

export function isBinaryTree<T>(
  node: BinaryDataNode<T> | DataNode<T>
): node is BinaryDataNode<T> {
  return "childLeft" in node && "childRight" in node;
}

export function isNaryTree<T>(
  node: BinaryDataNode<T> | DataNode<T>
): node is DataNode<T> {
  return "children" in node;
}
export function isBinaryEmpty<T>(
  node: BinaryDataNode<T> | null | undefined
): node is null | undefined {
  return node === null || node === undefined;
}

export function isBinarySingleton<T>(node: BinaryDataNode<T>): boolean {
  return !node.childLeft && !node.childRight;
}
export function isUnaryLeft<T>(node: BinaryDataNode<T>): boolean {
  return node.childLeft !== undefined && node.childRight === undefined;
}

export function isUnaryRight<T>(node: BinaryDataNode<T>): boolean {
  return node.childRight !== undefined && node.childLeft === undefined;
}
export function isBinary<T>(node: BinaryDataNode<T>): boolean {
  return node.childRight !== undefined && node.childLeft !== undefined;
}

export function isNarySingleton<T>(node: DataNode<T>): boolean {
  return node.children === undefined || isEmpty(node.children);
}

export function binaryLeftChild<T>(
  node: BinaryDataNode<T> | null | undefined
): BinaryDataNode<T> | undefined {
  if (isBinaryEmpty(node)) {
    return undefined;
  } else if (!node.childLeft) {
    return undefined;
  }
  return node.childLeft;
}

export function binaryRightChild<T>(
  node: BinaryDataNode<T> | null | undefined
): BinaryDataNode<T> | undefined {
  if (isBinaryEmpty(node)) {
    return undefined;
  } else if (!node.childRight) {
    return undefined;
  }
  return node.childRight;
}

export function binaryRoot<T>(
  node: BinaryDataNode<T> | null | undefined
): T | undefined {
  if (isBinaryEmpty(node)) {
    return undefined;
  }

  return node.element;
}
