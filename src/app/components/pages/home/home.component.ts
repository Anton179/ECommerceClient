import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/core/enums/category';
import { Product } from 'src/app/core/models/product.model';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  productList: Product[] = [];

  categories = [
    {
      category: Category.Clothes,
      image: 'assets/img/Categories/Clothes.png'
    },
    {
      category: Category.Electronics,
      image: 'assets/img/Categories/Electronics.png'
    },
    {
      category: Category.Fishing,
      image: 'assets/img/Categories/Fishing.png'
    },
    {
      category: Category.HomeAndGarden,
      image: 'assets/img/Categories/Home&Garden.png'
    },
    {
      category: Category.MusicalInstruments,
      image: 'assets/img/Categories/MusicalInstruments.png'
    },
    {
      category: Category.Sports,
      image: 'assets/img/Categories/Sports.png'
    },
    {
      category: Category.AutoAccessories,
      image: 'assets/img/Categories/AutoAccessories.png'
    }
  ];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productList = this.productService.getProducts();
  }

}
