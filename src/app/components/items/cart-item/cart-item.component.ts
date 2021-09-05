import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/core/models/product.model';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {

  @Input() productItem?: Product;

  constructor() { }

  ngOnInit(): void {
  }

}
