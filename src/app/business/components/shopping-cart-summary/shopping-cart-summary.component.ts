import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCart } from '../../../shared-business/interfaces/shoppingCart-interface';
import { ShoppingCartItem } from '../../../shared-business/interfaces/shoppingCartItem-interface';
@Component({
  selector: 'app-shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.scss']
})
export class ShoppingCartSummaryComponent implements OnInit {
  @Input('cart') cart: ShoppingCart;
  constructor() { }
  ngOnInit() {
  }
  totalItemNumber() {
    if (this.cart) {
      let totalItem = 0;
      // tslint:disable-next-line:forin
      for (const cartItem in this.cart.shoppingCartItems) {
        totalItem += this.cart.shoppingCartItems[cartItem].quantity;
      }
      return totalItem;
    }
  }
  cartTotalPrice(cart2: ShoppingCart) {
    let totalItemPrice = 0;
    if (cart2) {
      // tslint:disable-next-line:forin
      for (const cartItem in cart2.shoppingCartItems) {
        totalItemPrice += ((cart2.shoppingCartItems[cartItem].product.price) * (cart2.shoppingCartItems[cartItem].quantity));
      }
      return totalItemPrice;
    }
  }
  itemTotalPrice(item: ShoppingCartItem) {
    return item.quantity * item.product.price;
  }
}
