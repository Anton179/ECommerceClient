import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  makePayment(amount: number): Observable<string> {
    const subject = new BehaviorSubject<string>('');

    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51JgUpAHuRSgDQFZdapSTaRdX7reSwkvQmnoMWVNczb58YUcDwYCpJgiaLjDGVo9HQoIK5yyZDMLWh339LjnMqVky00b0CTxTGj',
      locale: 'auto',
      token: function (stripeToken: any) {
        subject.next(stripeToken.id)
      }
    });

    paymentHandler.open({
      name: 'eSearch',
      description: 'Payment',
      amount: amount * 100
    })

    return subject.asObservable()
  }
}
