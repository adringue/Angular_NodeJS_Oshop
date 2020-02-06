import { AuthService } from '../../../user-auth/services/auth.service';
import { ShoppingCartService } from '../../../shared-business/services/shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit, OnDestroy {
  constructor(private shoppingCartService: ShoppingCartService, private router: Router, private authService: AuthService) { }
  subscription: Subscription;
  allOrders;
  getAllOrdersSubscription: Subscription;
  authenticationSubscription: Subscription;
  ngOnInit() {
    this.getAllOrdersSubscription = this.shoppingCartService.getAllOrders().subscribe(p => {
      this.allOrders = p.data;
    });
    this.shoppingCartService.changeNotInhome(true);
    this.authenticationSubscription = this.authService.authenticationStatusListener.subscribe(k => {
      if (k === false) {
        this.router.navigate(['/login']);
      }
    });
  }
  createOrders() {
    if (confirm('Are you sure about creating a new Orders Database?')) {
      this.subscription = this.shoppingCartService.createOrdersDatabase().subscribe(x => {
      });
    }
  }
  getDate(value) {
    return new Date(value);
  }
  ngOnDestroy() {
    // this.subscription.unsubscribe();
    this.authenticationSubscription.unsubscribe();
    this.getAllOrdersSubscription.unsubscribe();
  }
}
