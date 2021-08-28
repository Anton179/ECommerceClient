import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/core/models/category.model';
import { Product } from 'src/app/core/models/product.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartService } from 'src/app/core/services/cart.service';
import { ProductService } from 'src/app/core/services/product.service';
import { Cart } from 'src/app/core/models/cart.model';

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
  category: string | undefined;
  quantity: number = 1;

  constructor(private activateRoute: ActivatedRoute, private productService: ProductService,
     private _authService: AuthService, private _cartService: CartService){
      this.subscription = activateRoute.params.subscribe(params=>this.id=params['id']);
  }

  selectQuantity(event: Event) {
    this.quantity = Number((event.target as HTMLSelectElement).value);
  }

  addToCart() {
    this._authService.isAuthenticated()
      .then(userAuthenticated => {
        if (!userAuthenticated)
        {
          this._authService.login();
        }
        else {
          this._cartService.addToCart({productId: this.id, quantity: this.quantity});
        }
      })
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
