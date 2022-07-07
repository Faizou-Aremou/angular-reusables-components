import { BinaryNode } from "../models/binary-node.model";
import { minimumLevelOfLeaves, numberOfLeaves, numberOfNodes } from "./binary-tree.api";

const numberTree: BinaryNode<number> = {
  element: 1,
  childLeft: {
    element: 2,
    childLeft: {
      element: 1,
    },
    childRight: {
      element: 1,
    },
  },
  childRight: {
    element: 3,
    childLeft: {
      element: 1,
    },
    childRight: {
      element: 1,
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