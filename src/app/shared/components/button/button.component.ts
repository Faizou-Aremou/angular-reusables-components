import { Component, Input, OnInit } from '@angular/core';
import { Button } from '../../models/button/button.model';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() button: Button | undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
