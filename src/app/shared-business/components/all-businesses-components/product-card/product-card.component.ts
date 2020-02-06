import { ShoppingCartService } from '../../../services/shopping-cart.service';
import { ItemModel } from '../../../interfaces/item-interface';
import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import 'rxjs/add/observable/fromPromise';
import { from } from 'rxjs';
import 'rxjs/add/operator/take';
import { BehaviorSubject } from 'rxjs';
import { ValueTransformer } from '@angular/compiler/src/util';
import * as socketIo from 'socket.io-client';
import { environment } from '../../../../../environments/environment';
const server_URL = environment.server_URL;
@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input('product') product: ItemModel;
  @Input('showActions') showActions = true;
  @Input('shoppingCart') shoppingCart;
  private _productQuantity: BehaviorSubject<any>;
  subscription: Subscription;
  constructor(private shoppingCartService: ShoppingCartService) {
    this._productQuantity = new BehaviorSubject(null);
  }
  get productQuantity() {
    return this._productQuantity;
  }
  changeProductQuantity(newVal: any) {
    this._productQuantity.next(newVal);
  }
  getQuantity() {
    if (this.shoppingCart) {
      if (this.shoppingCart.shoppingCartItems) {
        const filtered = this.shoppingCart.shoppingCartItems.filter(
          value =>
            value.product.name === this.product.name
        );
        if (filtered.length !== 0) {
          return filtered[0].quantity;
        } else {
          return 0;
        }
      }
    } else {
      return 0;
    }
  }
  addToCart() {
    this.shoppingCartService.addToCart(this.product);
  }
}
