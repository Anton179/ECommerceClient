import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {Category} from "../../../../core/models/category.model";
import {MatMenu, MatMenuTrigger} from "@angular/material/menu";

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent {
  @Input() items: Category[] = [];
  @ViewChild('childMenu') public childMenu: any;
  @ViewChild('childMenuTrigger') childMenuTrigger: MatMenuTrigger | undefined;

  constructor(public router: Router) {
  }

  navigate(categoryName: string) {
    this.router.navigateByUrl(`/products?category=${categoryName}`);
  }

  menuTrigger() {
    this.childMenuTrigger?.openMenu();
  }
}
