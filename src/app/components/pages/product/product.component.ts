import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/core/models/category.model';
import { Product } from 'src/app/core/models/product.model';
import { ProductService } from 'src/app/core/services/product.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  price: number | undefined;

  private id: string = "";
  private subscription: Subscription;
  
  product: Product | undefined;
  category: string | undefined = "test";

  constructor(private activateRoute: ActivatedRoute, private productService: ProductService, private userService: UserService){
      this.subscription = activateRoute.params.subscribe(params=>this.id=params['id']);
  }

  ngOnInit() {
    this.productService.getProduct(this.id).subscribe((product: Product) => {
      this.product = product;
      this.price = product.price;

      this.category = this.product.category.name;
      let category: Category = this.product?.category;
      while (category?.parent)
      {
        category = category.parent;
        this.category = category.name + " -> " + this.category;
      }
    });
  }

}
