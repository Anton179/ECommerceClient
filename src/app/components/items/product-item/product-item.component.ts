import {Component, Input} from '@angular/core';
import {Product} from 'src/app/core/models/product.model';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {

  @Input() productItem?: Product;

}
