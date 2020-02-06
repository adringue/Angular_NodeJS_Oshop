import { AuthService } from '../../../user-auth/services/auth.service';
import { ShoppingCartService } from '../../../shared-business/services/shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit, OnDestroy {
  userToken;
  userId;
  myOrdersArray;
  private jwtHelper = new JwtHelperService();
  getUsersOrdersSubscription: Subscription;
  authenticationSubscription: Subscription;
  subs: Subscription = new Subscription(); // so we can add all subscriptions and unsubscribe later
  constructor(private shoppingCartService: ShoppingCartService, private authService: AuthService, private route: Router) { }
  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.userToken = this.jwtHelper.decodeToken(
        localStorage.getItem('token')
      );
      this.userId = this.userToken.userId;
    }
    this.shoppingCartService.changeNotInhome(true);
    this.subs.add(this.getUsersOrdersSubscription = this.shoppingCartService.getUserOrders(this.userId).subscribe(t => {
      this.myOrdersArray = t.data;
    }));
    this.authenticationSubscription = this.authService.authenticationStatusListener.subscribe(value => {
      if (value === false) {
        this.route.navigate(['/login']);
      }
    });
  }
  getDate(value) {
    return new Date(value);
  }
  ngOnDestroy() {
    this.authenticationSubscription.unsubscribe();
    this.getUsersOrdersSubscription.unsubscribe();
    this.subs.unsubscribe();
  }
}
