import { ShoppingCartService } from '../../../shared-business/services/shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { AuthService } from '../../../user-auth/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-welcome-to-my-resume',
  templateUrl: './welcome-to-my-resume.component.html',
  styleUrls: ['./welcome-to-my-resume.component.scss']
})
export class WelcomeToMyResumeComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  constructor(private authService: AuthService, private route: Router, private shoppingCartService: ShoppingCartService) {
  }
  authenticationSubscription: Subscription;
  ngOnInit() {
    this.shoppingCartService.changeNotInhome(false);
    this.shoppingCartService.changeNavBarVisible(false);
   this.authenticationSubscription = this.authService.authenticationStatusListener.subscribe(value => {
      if (value === false) {
        this.route.navigate(['/login']);
      }
    });
  }
  ngOnDestroy() {
    this.shoppingCartService.changeNotInhome(true);
    this.authenticationSubscription.unsubscribe();
  }
}
