import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-informations',
  templateUrl: './informations.component.html',
  styleUrls: ['./informations.component.scss']
})
export class InformationsComponent<T extends { name: string }> implements OnInit {

  @Input() infos:T | null = null;
  constructor() { }

  ngOnInit(): void {
  }

}
