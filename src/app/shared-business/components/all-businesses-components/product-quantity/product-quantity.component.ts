import { Component, OnInit, Input } from '@angular/core';
import { ItemModel } from '../../../interfaces/item-interface';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ShoppingCartService } from '../../../services/shopping-cart.service';
@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.scss']
})
export class ProductQuantityComponent {
  @Input('product') product: ItemModel;
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
      const filtered = this.shoppingCart.shoppingCartItems.filter(
        value => value.product.name === this.product.name
      );
      if (filtered.length !== 0) {
        return filtered[0].quantity;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  }
  addToCart() {
    this.shoppingCartService.addToCart(this.product);
  }
  removeFromCart() {
    this.shoppingCartService.removeFromCart(this.product);
  }
}
