import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../user-auth/services/auth.service';
import { Subscription } from 'rxjs';
import {ShoppingCartService} from 'shared-business/services/shopping-cart.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private hideMainHeader: boolean;
  private authenticationListenerSubscrip: Subscription;
  constructor(private authService: AuthService, private shoppingCartService: ShoppingCartService) { } // to get the token saved in the service(in memory)
  ngOnInit() {
    this.authenticationListenerSubscrip = this.authService.authenticationStatusListener
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }
  ngOnDestroy() {
    this.authenticationListenerSubscrip.unsubscribe();
  }
  onLogout() {
     this.authService.logout();
    this.shoppingCartService.changeNavBarVisible(false);

  }
}
