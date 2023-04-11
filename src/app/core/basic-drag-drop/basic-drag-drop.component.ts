import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-basic-drag-drop",
  templateUrl: "./basic-drag-drop.component.html",
  styleUrls: ["./basic-drag-drop.component.scss"],
})
export class BasicDragDropComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}
  dragStartHandler(event: DragEvent): void {
    const eventTarget = event.target;
    if (
      this.isHTMLLiElement(eventTarget) &&
      eventTarget.dataset.fruit !== undefined
    ) {
      event.dataTransfer?.setData("Fruit", eventTarget.dataset.fruit);
    }
  }

  stopDragOverPropagation(event: DragEvent): void {
    event.stopPropagation();
    event.preventDefault();
  }

  dropHandler(event: DragEvent) {
    const fruitName = event.dataTransfer?.getData("Fruit");
    const liElement = document.createElement("li");
    if (this.isFruitName(fruitName)) {
      this.setLiInnerHTMLWithFruitName(fruitName, liElement);
      document.querySelector(".drop-fruit-zone")?.appendChild(liElement);
    }
  }
  private isFruitName(fruitName: string | undefined): fruitName is string {
    return fruitName !== undefined;
  }
  private setLiInnerHTMLWithFruitName(
    fruitName: string,
    liElement: HTMLLIElement
  ): void {
    switch (fruitName) {
      case "apple":
        liElement.textContent = "Apples";
        break;
      case "orange":
        liElement.textContent = "Oranges";
        break;
      case "pear":
        liElement.textContent = "Pears";
        break;
      default:
        liElement.textContent = "Unknown Fruit";
    }
  }

  private isHTMLLiElement(
    eventTarget: EventTarget | null
  ): eventTarget is HTMLLIElement {
    return (
      (eventTarget as HTMLLIElement) !== null &&
      (eventTarget as HTMLLIElement).nodeName === "LI"
    );
  }
}
