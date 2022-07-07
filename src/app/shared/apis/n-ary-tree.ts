import { isEmpty } from "ramda";
import { NaryNode } from "../models/node.model";

export function pathFor<T>(node: NaryNode<T>): NaryNode<T>[] {
    return [];
  }
  
  export function depthFor<T>(node: NaryNode<T>): number {
    return 0;
  }
  
  export function widthFor<T>(node: NaryNode<T>): number {
    // need more explanation
    return 0;
  }
  
  export function isNarySingleton<T>(node: NaryNode<T>): boolean {
    return node.children === undefined || isEmpty(node.children);
  }