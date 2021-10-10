import {Component, Input, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {Category} from "../../../../core/models/category.model";
import {MatMenuTrigger} from "@angular/material/menu";

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

  navigate(categoryName: string): any {
    this.router.navigateByUrl(`/products?category=${categoryName}`);
  }
}
