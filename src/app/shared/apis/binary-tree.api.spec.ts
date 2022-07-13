import { BinaryNode } from "../models/binary-node.model";
import { minimumLevelOfLeaves, numberOfDescendantsOf, numberOfLeaves, numberOfNodes } from "./binary-tree.api";

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

test("number Of Node", () => {
  expect(numberOfNodes(numberTree)).toBe(7);
});

test("number Of Node, empty tree", () => {
  expect(numberOfNodes(undefined)).toBe(0);
});

test("number of leaves",()=> {
  expect(numberOfLeaves(numberTree)).toBe(4);
})

test("minimum Level Of Leaves",()=> {
  expect(minimumLevelOfLeaves(numberTree)).toBe(3);
})
test("number of descendants of element in tree",()=> {
  expect(numberOfDescendantsOf(5, numberTree)).toBe(2);
})