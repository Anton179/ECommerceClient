import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Category} from 'src/app/core/models/category.model';
import {Product} from 'src/app/core/models/product.model';
import {AuthService} from 'src/app/core/services/auth.service';
import {CartService} from 'src/app/core/services/cart.service';
import {ProductService} from 'src/app/core/services/product.service';
import {FormControl, Validators} from "@angular/forms";

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
  userRole: string = ''
  userId: string = ''

  quantityControl = new FormControl(1, [
    Validators.required,
    Validators.max(100),
    Validators.min(1),
    Validators.pattern('^[0-9]*$')
  ]);

  private id: string = "";
  private subscription: Subscription;

  constructor(private activateRoute: ActivatedRoute, private productService: ProductService,
              private _authService: AuthService, private _cartService: CartService,
              private _router: Router) {
    this.subscription = activateRoute.params.subscribe(params => this.id = params['id']);
    this._authService.isAuthenticated().then(userAuthenticated => {
      if (userAuthenticated) {
        this._authService.getUserId().then(id => {
          this.userId = id;
        })
      }
    })
  }

  updateProduct(id: string) {
    this._router.navigateByUrl(`/account/product?id=${id}`)
  }

  addToCart() {
    if (this.quantityControl.invalid) {
      return;
    }

    this._authService.isAuthenticated()
      .then(userAuthenticated => {
        if (!userAuthenticated) {
          this._authService.login();
        } else {
          if (this.userRole == 'user') {
            this._cartService.addCartItem({productId: this.id, quantity: this.quantityControl.value});
          }
        }
      })
  }

  ngOnInit() {
    this._authService.getRole().then(role => {
      this.userRole = role;
    })

    this.productService.getProduct(this.id).subscribe((product: Product) => {
      this.product = product;
      this.price = product.price;

      const rows = product.characteristics.length / 3;
      if (rows > 4) {
        this.characteristicRows = rows;
      } else {
        this.characteristicRows = 4;
      }

      this.categoryLink.push(this.product.category?.name ?? '')

      if (this.product?.category) {
        let category: Category = this.product.category;
        while (category?.parent) {
          category = category.parent;
          this.categoryLink.push(category.name)
        }
      }

      this.categoryLink.reverse()
    });
  }
}
