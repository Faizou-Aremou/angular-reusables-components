import { Component, Input, OnInit } from '@angular/core';
import { Navbar } from '../../models/navbar/navbar.model';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  @Input() navbar: Navbar | undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
