import { ShoppingCartItem } from '../../../shared-business/interfaces/shoppingCartItem-interface';
import { ShoppingCartService } from '../../../shared-business/services/shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { AuthService } from '../../../user-auth/services/auth.service';
import { Router } from '@angular/router';
import * as socketIo from 'socket.io-client';
import { environment } from '../../../../environments/environment';
import { Subscription } from 'rxjs';
const server_URL = environment.server_URL;
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  cart;
  totalCartPrice = 0;
  itemsCount = 0;
  noCart = false;
  cartClearedSubscription: Subscription;
  realTimeCartSubscription: Subscription;
  getCartSubscription: Subscription;
  authenticationSubscription: Subscription;
  constructor(
    private shoppingCartService: ShoppingCartService,
    private router: Router,
    private authService: AuthService,
    private route: Router
  ) { }
  ngOnInit() {
   this.cartClearedSubscription = this.shoppingCartService.shoppingCartHasBeenCleared.subscribe(k => {
      if (k === true) {
        this.cart = undefined;
        this.itemsCount = 0;
        this.totalCartPrice = 0;
      }
    });
   this.realTimeCartSubscription = this.shoppingCartService.realTimeCart.subscribe(p => {
      if (p === true) {
        if (this.shoppingCartService.getCart()) {
         this.getCartSubscription = this.shoppingCartService.getCart().subscribe(value => {
            this.cart = value;
            this.itemsCount = 0;
            this.totalCartPrice = 0;
            // tslint:disable-next-line:forin
            for (const item in value.data.shoppingCartItems) {
              this.itemsCount += value.data.shoppingCartItems[item].quantity;
              this.totalCartPrice +=
                value.data.shoppingCartItems[item].product.price *
                value.data.shoppingCartItems[item].quantity;
            }
          });
        }
      }
    });
    this.shoppingCartService.changeNotInhome(true);
    ///////////////////////////////////////////////////////
    this.authenticationSubscription = this.authService.authenticationStatusListener.subscribe(k => {
      if (k === false) {
        this.router.navigate(['/login']);
      }
    });
    ///////////////////////////////////////////////////////
    if (this.shoppingCartService.getCart()) {
      this.shoppingCartService.getCart().subscribe(value => {
        // tslint:disable-next-line:forin
        this.cart = value;
        // tslint:disable-next-line:forin
        this.itemsCount = 0;
        this.totalCartPrice = 0;
        // tslint:disable-next-line:forin
        for (const item in value.data.shoppingCartItems) {
          this.itemsCount += value.data.shoppingCartItems[item].quantity;
          this.totalCartPrice +=
            value.data.shoppingCartItems[item].product.price *
            value.data.shoppingCartItems[item].quantity;
        }
      });
    }
  }
  totalPrice(item: ShoppingCartItem) {
    return item.quantity * item.product.price;
  }
  clearMyCart() {
    this.shoppingCartService.clearMyCart();
  }
  cartTotalPrice(cart: ShoppingCartItem[]) {
    return this.totalCartPrice;
  }
  ngOnDestroy() {
  this.authenticationSubscription.unsubscribe();
  this.cartClearedSubscription.unsubscribe();
  // this.getCartSubscription.unsubscribe();
  this.realTimeCartSubscription.unsubscribe();

  }
}
