import { BinaryNode } from "../models/binary-node.model";
import { binaryNodeFrom, infixedLinearization, levelLinearization, minimumLevelOfLeaves, numberOfDescendantsOf, numberOfLeaves, numberOfNodes, postfixedLinearization } from "./binary-tree.api";

const numberTree: BinaryNode<number> = {
  root: 1,
  leftChild: {
    root: 2,
    leftChild: {
      root: 3,
    },
    rightChild: {
      root: 4,
    },
  },
  rightChild: {
    root: 5,
    leftChild: {
      root: 6,
    },
    rightChild: {
      root: 7,
    },
  },
};
const alphabetTree: BinaryNode<string> = {
  root: "A",
  leftChild: {
    root: "B",
    leftChild: {
      root: "C",
    }
  },
  rightChild: {
    root: "D",
    leftChild: {
      root: "E",
    },
    rightChild: {
      root: "F",
      leftChild: {
        root: "G"
      }
    },
  },
};

const lowcaseAlphabetTree: BinaryNode<string> = {
  root: "a",
  leftChild: {
    root: "b",
    leftChild: {
      root: "d",
      rightChild: {
        root: "h",
      },
    },
    rightChild: {
      root: "e",
      rightChild: {
        root: "i",
      },
    }
  },
  rightChild: {
    root: "c",
    leftChild: {
      root: "f",
      leftChild: {
        root: "j"
      },
      rightChild: {
        root: "k"
      }
    },
    rightChild: {
      root: "g"
    },
  },
};
const prefixedLinerizedAlphabetTree = ["A","B", "C", "D", "E", "F", "G"];
const infixedLinerizedAlphabetTree = ["C", "B", "A", "E", "D", "G", "F"];
const postfixedLinerizedlowercaseAlphabetTree = ["h","d","i","e","b", "j", "k", "f","g","c", "a"];

test("binaryNodeFrom", () => {
  expect(binaryNodeFrom(prefixedLinerizedAlphabetTree, infixedLinerizedAlphabetTree )).toEqual(alphabetTree);
})
test("infixedLinearization", () => {
  expect(infixedLinearization(alphabetTree)).toEqual(infixedLinerizedAlphabetTree);
})

test("numberOfNodes", () => {
  expect(numberOfNodes(numberTree)).toBe(7);
  expect(numberOfNodes(undefined)).toBe(0);
});
test("numberOfDescendantsOf", () => {
  expect(numberOfDescendantsOf(5, numberTree)).toBe(2);
})
test("numberOfLeaves", () => {
  expect(numberOfLeaves(numberTree)).toBe(4);
})
test("minimumLevelOfLeaves", () => {
  expect(minimumLevelOfLeaves(numberTree)).toBe(3);
})
test("postfixedLinearization", () => {
  expect(postfixedLinearization(lowcaseAlphabetTree)).toEqual(postfixedLinerizedlowercaseAlphabetTree);
})
test("levelLinearization", () => {
  expect(levelLinearization(lowcaseAlphabetTree)).toEqual(["a","b","c","d","e","f", "g", "h", "i", "j", "k"]);
})
