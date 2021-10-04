import {Injectable} from "@angular/core";
import {PlaceOrderDialogComponent} from "../../components/dialogs/place-order-dialog/place-order-dialog.component";
@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  makePayment(amount: number) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51JgUpAHuRSgDQFZdapSTaRdX7reSwkvQmnoMWVNczb58YUcDwYCpJgiaLjDGVo9HQoIK5yyZDMLWh339LjnMqVky00b0CTxTGj',
      locale: 'auto',
      token: function (stripeToken: any) {
        PlaceOrderDialogComponent.paymentId = stripeToken.id;
      }
    });

    paymentHandler.open({
      name: 'eSearch',
      description: 'Payment',
      amount: amount * 100
    })
  }
}
