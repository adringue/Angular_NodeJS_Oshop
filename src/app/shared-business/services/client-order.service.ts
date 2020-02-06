import { ShoppingCartService } from './shopping-cart.service';
import { Room } from '../interfaces/room-class';
import { map } from 'rxjs/operators';
import { ShoppingCart } from '../interfaces/shoppingCart-interface';
import { ItemModel } from '../interfaces/item-interface';
import { CategoryModel } from '../interfaces/category-interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { PostsService } from '../../user/services/posts.service';
import { BehaviorSubject, Subscription, Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthData } from '../../user-auth/models/auth-data.model';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/take';
import { ShoppingCartItem } from '../interfaces/shoppingCartItem-interface';
import { Rooms } from '../interfaces/rooms-class';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
const BACKEND_URL_SHOPPINGCART = environment.api_URL + '/shoppingCart';
@Injectable({
  providedIn: 'root'
})
export class ClientOrderService {
  constructor(private http: HttpClient,
    private shoppingCartService: ShoppingCartService,
    private router: Router,
    private route: ActivatedRoute) { }
  // storing Order and clearing shoppingcart
  placeOrder(order) {
    console.log('order', JSON.stringify(order.datePlace));
    const orderData = new FormData();
    orderData.append('userId', JSON.stringify(order.userId));
    orderData.append('datePlace', JSON.stringify(order.datePlace));
    orderData.append('shipping', JSON.stringify(order.shipping));
    orderData.append('items', JSON.stringify(order.items));
    return this.http.post<{
      success: boolean;
      message: string;
      data: any;
    }>(BACKEND_URL_SHOPPINGCART + '/save-order', orderData);
  }
}
