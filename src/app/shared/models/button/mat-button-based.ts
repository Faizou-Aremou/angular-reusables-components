import { Button } from "./button.model";

export class MatButtonBased extends Button {
  matButtonDirective: string;
constructor(matButtonDirective: string, label:string){
    super(label)
this.matButtonDirective = matButtonDirective

}
}
