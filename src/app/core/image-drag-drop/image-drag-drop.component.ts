import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-image-drag-drop",
  templateUrl: "./image-drag-drop.component.html",
  styleUrls: ["./image-drag-drop.component.scss"],
})
export class ImageDragDropComponent implements OnInit {
  browserLogos: { src: string; id: string; alt: string }[] = [
    {
      src: "https://mainline.i3s.unice.fr/mooc/ABiBCwZ.png",
      id: "cr",
      alt: "Logo Chrome",
    },
    {
      src: "https://mainline.i3s.unice.fr/mooc/n7xo93U.png",
      id: "ff",
      alt: "Logo Firefox",
    },
    {
      src: "https://mainline.i3s.unice.fr/mooc/ugUmuGQ.png",
      id: "ie",
      alt: "Logo IE",
    },
    {
      src: "https://mainline.i3s.unice.fr/mooc/jfrNErz.png",
      id: "op",
      alt: "Logo Opera",
    },
    {
      src: "https://mainline.i3s.unice.fr/mooc/gDJCG0l.png",
      id: "sf",
      alt: "Logo Safari",
    },
  ];
  constructor() {}

  ngOnInit(): void {}

  dragStartHandler(event: DragEvent) {
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = "move";
    }
    const eventTarget = event.target;

    if (this.isHTMLImageElement(eventTarget)) {
      event.dataTransfer?.setData("browser", eventTarget.id);
    }
  }
  private isHTMLImageElement(
    eventTarget: EventTarget | null
  ): eventTarget is HTMLImageElement {
    return (
      eventTarget !== null &&
      (eventTarget as HTMLImageElement).nodeName === "IMG"
    );
  }

  dragOverHandler(event: DragEvent) {
    event.preventDefault();
  }

  dropHandler(event: DragEvent) {
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = "copy";
      const browserImageElement = document.querySelector(
        "#" + event.dataTransfer.getData("browser")
      );
      const eventTarget = event.target;

      if (this.isHTMLElement(eventTarget) && browserImageElement) {
        eventTarget.appendChild(browserImageElement);
      }
      event.preventDefault();
    }
  }
  isHTMLElement(eventTarget: EventTarget | null): eventTarget is HTMLElement {
    return eventTarget !== null && (eventTarget as HTMLElement).nodeName !== "";
  }
}
