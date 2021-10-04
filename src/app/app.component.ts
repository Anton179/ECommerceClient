import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {PaymentService} from "./core/services/payment.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'eSearch-client';
  paymentHandler:any = null;

  constructor(private _paymentService: PaymentService, private _router: Router) { }

  ngOnInit() {
    this.invokeStripe();
  }

  invokeStripe() {
    if(!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement("script");
      script.id = "stripe-script";
      script.type = "text/javascript";
      script.src = "https://checkout.stripe.com/checkout.js";
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51JgUpAHuRSgDQFZdapSTaRdX7reSwkvQmnoMWVNczb58YUcDwYCpJgiaLjDGVo9HQoIK5yyZDMLWh339LjnMqVky00b0CTxTGj',
          locale: 'auto',
          token: function (stripeToken: any) {
          },
        });
      }

      window.document.body.appendChild(script);
    }
  }
}
