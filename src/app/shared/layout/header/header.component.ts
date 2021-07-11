import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  shoppingCartBadge: number = 3;
  hiddenCartBadge: boolean = !this.shoppingCartBadge;

  constructor() { }

  ngOnInit(): void {
  }

}
