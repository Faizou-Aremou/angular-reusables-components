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
    if (this.isHTMLLiElement(eventTarget)) {
      if (eventTarget.textContent !== null) {
        event.dataTransfer?.setData("Fruit", eventTarget.textContent);
      }
      eventTarget.style.opacity = "0.4";
      eventTarget.classList.add("dragged");
    }
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = "copy";
      const dragIcon = document.createElement("img");
      dragIcon.src =
        "http://th03.deviantart.net/fs71/150/i/2011/335/0/6/free_html5_3d_logo_icon__10_icons__by_anonsphere-d4h763w.jpg";
      dragIcon.width = 100;
      event.dataTransfer.setDragImage(dragIcon, -10, -10);
    }
  }
  dragEndHandler(event: DragEvent): void {
    const eventTarget = event.target;
    if (this.isHTMLLiElement(eventTarget)) {
      eventTarget.style.opacity = "1";
      eventTarget.classList.remove("dragged");
    }
  }

  dragHoverHandler(event: DragEvent): void {
    event.stopPropagation();
    event.preventDefault();
  }

  dropEventHandler(event: DragEvent) {
    const fruitName = event.dataTransfer?.getData("Fruit");
    const liElement = document.createElement("li");
    const eventTarget = event.target;
    if (this.isFruitName(fruitName)) {
      this.setLiInnerHTMLWithFruitName(fruitName, liElement);
      document.querySelector(".drop-fruit-zone")?.appendChild(liElement);
      this.resetDropZoneLookToDefault(eventTarget);
    }
  }
  private isFruitName(fruitName: string | undefined): fruitName is string {
    return fruitName !== undefined;
  }
  private setLiInnerHTMLWithFruitName(
    fruitName: string,
    liElement: HTMLLIElement
  ): void {
    liElement.textContent = fruitName;
  }

  dragEnterHandler(event: DragEvent): void {
    const eventTarget = event.target;
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = "copy";
    }
    if (this.isHTMLOListElement(eventTarget)) {
      eventTarget.classList.add("dragged-enter");
    }
  }
  isHTMLOListElement(
    eventTarget: EventTarget | null
  ): eventTarget is HTMLOListElement {
    return (
      (eventTarget as HTMLOListElement) !== null &&
      (eventTarget as HTMLOListElement).nodeName === "OL"
    );
  }
  dragLeaveHandler(event: DragEvent): void {
    const eventTarget = event.target;
    this.resetDropZoneLookToDefault(eventTarget);
  }
  private resetDropZoneLookToDefault(eventTarget: EventTarget | null) {
    if (this.isHTMLOListElement(eventTarget)) {
      eventTarget.classList.remove("dragged-enter");
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
