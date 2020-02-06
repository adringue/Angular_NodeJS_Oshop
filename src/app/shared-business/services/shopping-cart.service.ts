import { Room } from '../interfaces/room-class';
import { map } from 'rxjs/operators';
import { ShoppingCart } from '../interfaces/shoppingCart-interface';
import { Injectable } from '@angular/core';
import { ItemModel } from '../interfaces/item-interface';
import { CategoryModel } from '../interfaces/category-interface';
import { environment } from '../../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { PostsService } from '../../user/services/posts.service';
import { BehaviorSubject, Subscription, Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthData } from '../../user-auth/models/auth-data.model';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/take';
import { ShoppingCartItem } from '../interfaces/shoppingCartItem-interface';
import { Rooms } from '../interfaces/rooms-class';
const BACKEND_URL = environment.api_URL + '/businessCategory';
const BACKEND_URL_ITEM = environment.api_URL + '/businessItem';
const BACKEND_URL_SHOPPINGCART = environment.api_URL + '/shoppingCart';
import * as socketIo from 'socket.io-client';
const server_URL = environment.server_URL;
@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private subscription: Subscription;
  private _realTimeCart: BehaviorSubject<boolean>;
  private _realTimeProduct: BehaviorSubject<boolean>;
  private _realTimeCategory: BehaviorSubject<boolean>;
  private _reinitializeCartQuantity: BehaviorSubject<any>;
  private _shoppingCartHasbeenCreated: BehaviorSubject<any>;
  private _shoppingCartProductQuantity: BehaviorSubject<any>;
  private _notInhome: BehaviorSubject<boolean>;
  private _navbarVisibility: BehaviorSubject<boolean>;
  private _shoppingCartHasBeenCleared: BehaviorSubject<boolean>;
  private cart;
  private cartId2 = '';
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this._reinitializeCartQuantity = new BehaviorSubject(null);
    this._shoppingCartHasbeenCreated = new BehaviorSubject('');
    this._shoppingCartProductQuantity = new BehaviorSubject(null);
    this._realTimeCart = new BehaviorSubject(false);
    this._realTimeProduct = new BehaviorSubject(false);
    this._realTimeCategory = new BehaviorSubject(false);
    this._shoppingCartHasBeenCleared = new BehaviorSubject(false);
    this._notInhome = new BehaviorSubject(false);
    this._navbarVisibility = new BehaviorSubject(false);
  }
  get shoppingCartHasBeenCleared() {
    return this._shoppingCartHasBeenCleared;
  }
  changeShoppingCartHasBeenCleared(newVal: boolean) {
    this._shoppingCartHasBeenCleared.next(newVal);
  }
  get notInhome() {
    return this._notInhome;
  }
  changeNotInhome(newVal: boolean) {
    this._notInhome.next(newVal);
  }
  get navBarVisible() {
    return this._navbarVisibility;
  }
  changeNavBarVisible(newVal: boolean) {
    this._navbarVisibility.next(newVal);
  }
  get reinitializeCartQuantity() {
    return this._reinitializeCartQuantity;
  }
  changeReinitializeCartQuantity(newVal: any) {
    this._reinitializeCartQuantity.next(newVal);
  }
  get updateShoppingCartCreated() {
    return this._shoppingCartHasbeenCreated;
  }
  changeUpdateShoppingCartCreated(newVal: any) {
    this._shoppingCartHasbeenCreated.next(newVal);
  }
  get updateShoppingCartProductQuantity() {
    return this._shoppingCartHasbeenCreated;
  }
  changeUpdateShoppingCartProductQuantity(newVal: any) {
    this._shoppingCartHasbeenCreated.next(newVal);
  }
  get realTimeCart() {
    return this._realTimeCart;
  }
  changeRealTimeCart(newVal: any) {
    this._realTimeCart.next(newVal);
  }
  get realTimeCategory() {
    return this._realTimeCategory;
  }
  changeRealTimeCategory(newVal: any) {
    this._realTimeCategory.next(newVal);
  }
  get realTimeProduct() {
    return this._realTimeProduct;
  }
  changeRealTimeProduct(newVal: any) {
    this._realTimeProduct.next(newVal);
  }
  createOrdersDatabase() {
    return this.http.post<{
      success: boolean;
      message: string;
      data: any;
    }>(BACKEND_URL_SHOPPINGCART + '/create-orders', {});
  }
  createCart = () => {
    return this.http.post<{
      success: boolean;
      message: string;
      data: any;
    }>(BACKEND_URL_SHOPPINGCART + '/create-shopping-cart', {});
  }
  getCart() {
    const cartId = localStorage.getItem('cartId');
    if (cartId) {
      return this.http.get<{
        success: boolean;
        message: string;
        data: ShoppingCart;
      }>(BACKEND_URL_SHOPPINGCART + '/myshoppingcart/' + cartId);
    } else {
      return null;
    }
  }
  getUserOrders(userId) {
    return this.http.get<{
      success: boolean;
      message: string;
      data: ShoppingCart;
    }>(BACKEND_URL_SHOPPINGCART + '/get-user-orders/' + userId);
  }
  getAllOrders() {
    return this.http.get<{
      success: boolean;
      message: string;
      data: any;
    }>(BACKEND_URL_SHOPPINGCART + '/get-all-orders');
  }
  removeFromCart(product) {
    const cartId = localStorage.getItem('cartId');
    if (cartId !== null) {
      this.http.post(BACKEND_URL_SHOPPINGCART + '/remove-from-cart/' + cartId + '/' + product._id, {})
        .take(1).subscribe(result3 => {
          this.changeUpdateShoppingCartProductQuantity(result3);
          this.changeRealTimeCart(true);
        });
    } else {
      return;
    }
  }
  addToCart(product) {
    const cartId = localStorage.getItem('cartId');
    if (cartId !== null) {
      this.http.post(BACKEND_URL_SHOPPINGCART + '/add-to-cart/' + cartId + '/' + product._id, {})
        .take(1).subscribe(result3 => {
          this.changeUpdateShoppingCartProductQuantity(result3);
          this.changeRealTimeCart(true);
        });
    } else {
      this.createCart().take(1).subscribe((result) => {
        localStorage.setItem('cartId', result.data._id);
        const cartId2 = localStorage.getItem('cartId');
        this.http.post(BACKEND_URL_SHOPPINGCART + '/add-to-cart/' + cartId2 + '/' + product._id, {})
          .subscribe(result2 => {
            this.changeUpdateShoppingCartProductQuantity(result2);
            this.changeRealTimeCart(true);
          });
      });
    }
  }
  clearMyCart() {
    this.http.post<{
      success: boolean;
      message: string;
      data: any;
    }>(BACKEND_URL_SHOPPINGCART + '/delete-carts-and-shopping-cart-items', {}).subscribe(x => {
      this.changeShoppingCartHasBeenCleared(true);
      localStorage.removeItem('cartId');
    });
  }
}
