import { AuthService } from '../../../user-auth/services/auth.service';
import { ShoppingCartService } from '../../../shared-business/services/shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.scss']
})
export class OrderSuccessComponent implements OnInit, OnDestroy {
  authenticationSubscription: Subscription;
  constructor(private router: Router, private shoppingCartService: ShoppingCartService, private authService: AuthService) { }
  ngOnInit() {
    this.shoppingCartService.changeNotInhome(true);
   this.authenticationSubscription = this.authService.authenticationStatusListener.subscribe(value => {
      if (value === false) {
        this.router.navigate(['/login']);
      }
    });
    this.shoppingCartService.changeNavBarVisible(false);
  }
  ngOnDestroy() {
    this.authenticationSubscription.unsubscribe();
  }
}
