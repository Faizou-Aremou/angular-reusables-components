import { BinaryNode } from "../models/binary-node.model";
import { equals, min } from "ramda";

export function numberOfNodes<T>(
  node: BinaryNode<T> | undefined
): number {
  if (isEmpty(node)) {
    return 0;
  } else if (isSingleton<T>(node)) {
    return 1;
  } else if (isUnaryLeft(node)) {
    return 1 + numberOfNodes<T>(node.childLeft);
  } else if (isUnaryRight(node)) {
    return 1 + numberOfNodes(node.childRight);
  }
  return (
    numberOfNodes(node.childLeft) + 1 + numberOfNodes(node.childRight)
  );
}

export function numberOfLeaves<T>(
  node: BinaryNode<T> | undefined
): number {
  if (isEmpty(node)) {
    return 0;
  } else if (isSingleton<T>(node)) {
    return 1;
  } else if (isUnaryLeft(node)) {
    return numberOfLeaves<T>(node.childLeft);
  } else if (isUnaryRight(node)) {
    return numberOfLeaves(node.childRight);
  }
  return (
    numberOfLeaves(node.childLeft) + numberOfLeaves(node.childRight)
  );
}

export function minimumLevelOfLeaves<T>(node: BinaryNode<T>): number {
  if (isSingleton<T>(node)) {
    return 1;
  } else if (isUnaryLeft(node)) {
    return 1 + minimumLevelOfLeaves(node.childLeft as BinaryNode<T>);
  } else if (isUnaryRight(node)) {
    return 1 + minimumLevelOfLeaves(node.childRight as BinaryNode<T>);
  }
  return 1 + min(
    minimumLevelOfLeaves(node.childLeft as BinaryNode<T>),
    minimumLevelOfLeaves(node.childRight as BinaryNode<T>)
  );
}

export function level<T>(
  node: BinaryNode<T>,
  treeNode: BinaryNode<T> | undefined | null
): number | null {
  if (isEmpty(treeNode)) {
    return null;
  } else if (isSingleton<T>(treeNode)) {
    return equals(treeNode.element, node.element) ? 1 : null;
  } else if (isUnaryLeft(treeNode)) {
    if (equals(treeNode.element, node.element)) {
      return 1;
    } else {
      const result = level<T>(node, node.childLeft);
      return result === null ? result : 1 + result;
    }
  } else if (isUnaryRight(treeNode)) {
    if (equals(treeNode.element, node.element)) {
      return 1;
    } else {
      const result = level<T>(node, node.childRight);
      return result === null ? result : 1 + result;
    }
  } else {
    if (equals(treeNode.element, node.element)) {
      return 1;
    } else {
      const result = level<T>(node, node.childLeft);
      if (result === null) {
        const rightResult = level<T>(node, node.childRight);
        return rightResult === null ? rightResult : 1 + rightResult;
      } else {
        return 1 + result;
      }
    }
  }
}



export function isEmpty<T>(
  node: BinaryNode<T> | null | undefined
): node is null | undefined {
  return node === null || node === undefined;
}

export function isSingleton<T>(node: BinaryNode<T>): boolean {
  return !node.childLeft && !node.childRight;
}
export function isUnaryLeft<T>(node: BinaryNode<T>): boolean {
  return node.childLeft !== undefined && node.childRight === undefined;
}

export function isUnaryRight<T>(node: BinaryNode<T>): boolean {
  return node.childRight !== undefined && node.childLeft === undefined;
}
export function isBinary<T>(node: BinaryNode<T>): boolean {
  return node.childRight !== undefined && node.childLeft !== undefined;
}

export function existLeft<T>(node: BinaryNode<T>): boolean {
  return node.childLeft !== undefined;
}
export function existRight<T>(node: BinaryNode<T>): boolean {
  return node.childRight !== undefined;
}



export function leftChild<T>(
  node: BinaryNode<T> | null | undefined
): BinaryNode<T> | undefined {
  if (isEmpty(node)) {
    return undefined;
  } else if (!node.childLeft) {
    return undefined;
  }
  return node.childLeft;
}

export function rightChild<T>(
  node: BinaryNode<T> | null | undefined
): BinaryNode<T> | undefined {
  if (isEmpty(node)) {
    return undefined;
  } else if (!node.childRight) {
    return undefined;
  }
  return node.childRight;
}

export function root<T>(
  node: BinaryNode<T> | null | undefined
): T | undefined {
  if (isEmpty(node)) {
    return undefined;
  }

  return node.element;
}
