import { Injectable } from '@angular/core';
import { Category } from '../enums';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // TODO: Populate products from an API
  products: Product[] = [
    {id:1, title: "Xiaomi mi note 10", description: "New xiaomi mi note 10 smartphone", category: Category.Electronics, price: 400, imageUrl: 'assets/img/Products/Smartphone.png'},
    {id:2, title: "Xiaomi mi 10 pro", description: "New xiaomi mi 10 pro smartphone", category: Category.Electronics, price: 400, imageUrl: 'assets/img/Products/Smartphone.png'},
    {id:3, title: "iPhone 12", description: "New iPhone 12 from Apple", category: Category.Electronics, price: 800, imageUrl: 'assets/img/Products/Smartphone.png'},
    {id:4, title: "iPhone 11", description: "New iPhone 11 from Apple", category: Category.Electronics, price: 700, imageUrl: 'assets/img/Products/Smartphone.png'}
  ]; 

  constructor() { }

  getProducts(): Product[] {
    // TODO: Populate products from an API and return Observable
    return this.products;
  }
}
