import { NestedTreeControl, NestedTreeControlOptions } from "@angular/cdk/tree";
import { lastValueFrom, Observable } from "rxjs";
import { Page } from "../../models/page.model";

export class ExtendedNestedTreeControl<T, K = T> extends NestedTreeControl<
  T,
  K
> {
  constructor(
    private pageOfDataForest$: Observable<T[]>,
    getChildren: (dataNode: T) => Observable<T[]> | T[] | undefined | null,
    options?: NestedTreeControlOptions<T, K>
  ) {
    super(getChildren, options);    
  }

  rootFor(node:T): T {
    throw new Error("not implemented");
  }

  async levelFor(dataNode:T):Promise<number> {
    const pageOfDataForest = await lastValueFrom(this.pageOfDataForest$);

    return this.getLevelFor(pageOfDataForest, dataNode);

  }
  private getLevelFor<T extends {children?:T[]}>(forest: T[], node: T):number {
   
    throw new Error("not implemented");
  }

}
