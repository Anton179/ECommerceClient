import { Injectable } from '@angular/core';
import { Category } from '../enums';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }

  getCategories(): {category: Category, image: string} [] {
    return this.categoryList;
  }

  categoryList = [
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
}
