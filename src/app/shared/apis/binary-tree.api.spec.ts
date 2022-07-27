import { BinaryNode } from "../models/binary-node.model";
import { binaryNodeFrom, minimumLevelOfLeaves, numberOfDescendantsOf, numberOfLeaves, numberOfNodes } from "./binary-tree.api";

const numberTree: BinaryNode<number> = {
  root: 1,
  childLeft: {
    root: 2,
    childLeft: {
      root: 3,
    },
    childRight: {
      root: 4,
    },
  },
  childRight: {
    root: 5,
    childLeft: {
      root: 6,
    },
    childRight: {
      root: 7,
    },
  },
};
const alphabetTree: BinaryNode<string> = {
  root: "A",
  childLeft: {
    root: "B",
    childLeft: {
      root: "C",
    }
  },
  childRight: {
    root: "D",
    childLeft: {
      root: "E",
    },
    childRight: {
      root: "F",
      childLeft: {
        root: "G"
      }
    },
  },
};

const prefixedLinerizedAlphabetTree = ["A","B", "C", "D", "E", "F", "G"];
const infixedLinerizedAlphabetTree = ["C", "B", "A", "E", "D", "G", "F"];

test("number Of Node", () => {
  expect(numberOfNodes(numberTree)).toBe(7);
});

test("number Of Node, empty tree", () => {
  expect(numberOfNodes(undefined)).toBe(0);
});

test("number of leaves", () => {
  expect(numberOfLeaves(numberTree)).toBe(4);
})

test("minimum Level Of Leaves", () => {
  expect(minimumLevelOfLeaves(numberTree)).toBe(3);
})
test("number of descendants of element in tree", () => {
  expect(numberOfDescendantsOf(5, numberTree)).toBe(2);
})
test("binary tree from prefixed and infixed linerized tree", () => {
  expect(binaryNodeFrom(prefixedLinerizedAlphabetTree, infixedLinerizedAlphabetTree )).toEqual(alphabetTree);
})
