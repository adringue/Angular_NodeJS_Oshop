import { ShoppingCartService } from '../../../shared-business/services/shopping-cart.service';
import { ClientOrderService } from '../../../shared-business/services/client-order.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Order } from '../../../shared-business/interfaces/order';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Route, Router } from '@angular/router';
import { ShoppingCart } from '../../../shared-business/interfaces/shoppingCart-interface';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.scss']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  shipping: any = {};
  private userId = '';
  @Input('cart') cart: ShoppingCart;
  private jwtHelper = new JwtHelperService();
  private userToken;
  placeOrdersubscription: Subscription;
  constructor(private clientOrderService: ClientOrderService, private router: Router, private shoppingCartService: ShoppingCartService) { }
  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.userToken = this.jwtHelper.decodeToken(localStorage.getItem('token'));
      this.userId = this.userToken.userId;
    }
    this.shoppingCartService.changeNotInhome(true);
  }
  placeOrder = (value) => {
    const order = new Order(this.userId, value, this.cart);
    this.placeOrdersubscription = this.clientOrderService.placeOrder(order).subscribe(i => {
      this.shoppingCartService.clearMyCart();
      this.shoppingCartService.changeReinitializeCartQuantity(0);
      this.router.navigate(['/order-success', i.data.addedOrder._id]);
    });
  }
  ngOnDestroy() {
    // this.placeOrdersubscription.unsubscribe();
  }
}
