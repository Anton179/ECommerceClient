import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Category} from 'src/app/core/models/category.model';
import {Product} from 'src/app/core/models/product.model';
import {AuthService} from 'src/app/core/services/auth.service';
import {CartService} from 'src/app/core/services/cart.service';
import {ProductService} from 'src/app/core/services/product.service';
import {FormControl, Validators} from "@angular/forms";
import {Roles} from "../../../../constants/roles";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  price: number | undefined;
  product: Product | undefined;
  characteristicRows: number = 4;
  categoryLink: string[] = [];
  userRole: string = '';
  userId: string = '';

  quantityControl = new FormControl(1, [
    Validators.required,
    Validators.max(100),
    Validators.min(1),
    Validators.pattern('^[0-9]*$')
  ]);

  private _id: string = "";
  private _subscription: Subscription;

  constructor(private _activateRoute: ActivatedRoute, private _productService: ProductService,
              private _authService: AuthService, private _cartService: CartService,
              private _router: Router) {
    this._subscription = _activateRoute.params.subscribe(params => this._id = params['id']);
    this._authService.isAuthenticated().then(userAuthenticated => {
      if (userAuthenticated) {
        this._authService.getUserId().then(id => {
          this.userId = id;
        })
      }
    })
  }

  updateProduct(id: string): void {
    this._router.navigateByUrl(`/account/product?id=${id}`)
  }

  addToCart(): void {
    if (this.quantityControl.invalid) {
      return;
    }

    this._authService.isAuthenticated()
      .then(userAuthenticated => {
        if (!userAuthenticated) {
          this._authService.login();
        } else {
          if (this.userRole == Roles.user) {
            this._cartService.addCartItem({productId: this._id, quantity: this.quantityControl.value});
          }
        }
      })
  }

  ngOnInit(): void {
    this._authService.getRole().then(role => {
      this.userRole = role;
    })

    this._productService.getProduct(this._id).subscribe((product: Product) => {
      this.product = product;
      this.price = product.price;

      const rows = product.characteristics.length / 3;
      if (rows > 4) {
        this.characteristicRows = rows;
      } else {
        this.characteristicRows = 4;
      }

      this.categoryLink.push(this.product.category?.name ?? '');

      if (this.product?.category) {
        let category: Category = this.product.category;
        while (category?.parent) {
          category = category.parent;
          this.categoryLink.push(category.name);
        }
      }

      this.categoryLink.reverse();
    });
  }
}
