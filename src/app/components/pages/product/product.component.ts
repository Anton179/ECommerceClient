import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  id: number | undefined;
  private subscription: Subscription;
  constructor(private activateRoute: ActivatedRoute){
       
      this.subscription = activateRoute.params.subscribe(params=>this.id=params['id']);
  }

  ngOnInit(): void {
  }

}
