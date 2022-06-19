import { NestedTreeControl, NestedTreeControlOptions } from "@angular/cdk/tree";
import { Observable } from "rxjs";

export class ExtendedNestedTreeControl<T, K = T> extends NestedTreeControl<
  T,
  K
> {
  constructor(
    getChildren: (dataNode: T) => Observable<T[]> | T[] | undefined | null,
    options?: NestedTreeControlOptions<T, K>
  ) {
    super(getChildren, options);
  }

  rootFor(dataNode:T): T {
    throw new Error();
  }

  levelFor(dataNode:T):number {
    throw new Error();
  }

}
