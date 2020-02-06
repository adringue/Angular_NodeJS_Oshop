import { ShoppingCart } from '../../../shared-business/interfaces/shoppingCart-interface';
import { ClientOrderService } from '../../../shared-business/services/client-order.service';
import { ShoppingCartItem } from '../../../shared-business/interfaces/shoppingCartItem-interface';
import { ShoppingCartService } from '../../../shared-business/services/shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Order } from '../../../shared-business/interfaces/order';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  myCart;
  cartTotalPrice = 0;
  getCartSubscription: Subscription;
  constructor(private router: Router, private shoppingCartService: ShoppingCartService, private clientOrderService: ClientOrderService) { }
  ngOnInit() {
    if (this.shoppingCartService.getCart()) {
      this.getCartSubscription = this.shoppingCartService.getCart().subscribe(value => {
        this.myCart = value.data;
        (() => {
          // tslint:disable-next-line:forin
          for (const cartItem in this.myCart.shoppingCartItems) {
            this.cartTotalPrice += this.myCart.shoppingCartItems[cartItem].product.price;
          }
        })();
      });
    }
    //////////////////////////
    this.shoppingCartService.changeNotInhome(true);
  }
  ngOnDestroy() {
    this.getCartSubscription.unsubscribe();
  }
}
