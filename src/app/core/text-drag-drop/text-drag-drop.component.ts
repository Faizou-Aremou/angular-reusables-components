import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-text-drag-drop',
  templateUrl: './text-drag-drop.component.html',
  styleUrls: ['./text-drag-drop.component.scss'],
})
export class TextDragDropComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  dragOverHandler(event: DragEvent) {
    event.preventDefault();
  }
  dropHandler(event: DragEvent) {
    const textDraged = event.dataTransfer?.getData('text/plain');
    const pElement = document.createElement('p');
    const eventTarget = event.target;
    if (this.isHTMLElement(eventTarget) && textDraged) {
      pElement.textContent = textDraged;
      eventTarget.appendChild(pElement);
    }
  }
  isHTMLElement(eventTarget: EventTarget | null): eventTarget is HTMLElement {
    return eventTarget !== null && (eventTarget as HTMLElement).nodeName !== '';
  }
}
