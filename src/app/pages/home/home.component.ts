import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/core/enums/category';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  categories = [
    {
      category: Category.Clothes,
      image: 'assets/img/Clothes.png'
    },
    {
      category: Category.Electronics,
      image: 'assets/img/Electronics.png'
    },
    {
      category: Category.Fishing,
      image: 'assets/img/Fishing.png'
    },
    {
      category: Category.HomeAndGarden,
      image: 'assets/img/Home&Garden.png'
    },
    {
      category: Category.MusicalInstruments,
      image: 'assets/img/MusicalInstruments.png'
    },
    {
      category: Category.Sports,
      image: 'assets/img/Sports.png'
    },
    {
      category: Category.AutoAccessories,
      image: 'assets/img/AutoAccessories.png'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
