import { ShoppingCartService } from '../../../shared-business/services/shopping-cart.service';
import { AuthService } from '../../../user-auth/services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { isDefaultChangeDetectionStrategy } from '@angular/core/src/change_detection/constants';
import { Observable, Subscription } from 'rxjs';
import { ShoppingCart } from '../../../shared-business/interfaces/shoppingCart-interface';
@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss']
})
export class BsNavbarComponent implements OnInit, OnDestroy {
  Username = '';
  countShoppingCartItem = 0;
  adminRights = false;
  notInhome;
  navBarVisibility = true;
  shoppingCartClearedSubscription: Subscription;
  reinitCartQuantitySubscription: Subscription;
  loginDataSubscription: Subscription;
  realTimeCartSubscription: Subscription;
  getCartSubscription: Subscription;
  notInHomeSubscription: Subscription;
  navBarVisiBiliSubscription: Subscription;
  authenticationSubscription: Subscription;
  constructor(
    private authService: AuthService,
    private shoppingCartService: ShoppingCartService
  ) {}
  ngOnInit() {
    this.shoppingCartClearedSubscription = this.shoppingCartService.shoppingCartHasBeenCleared.subscribe(k => {
      if (k === true) {
        this.countShoppingCartItem = 0;
      }
    });
   this.reinitCartQuantitySubscription = this.shoppingCartService.reinitializeCartQuantity.subscribe(l => {
      if (l === 0) {
        this.countShoppingCartItem = 0;
      }
    });
    this.getUserNameInitial();
    (() => {
      if (this.authService.decodedTokenGetter()) {
        this.Username = this.authService.decodedTokenGetter().email;
      }
     this.loginDataSubscription = this.authService.loginData.subscribe(p => {
        if (p) {
          this.Username = p.email;
        }
      });
      this.isAdmin();
    })();
   this.realTimeCartSubscription = this.shoppingCartService.realTimeCart.subscribe(p => {
      const h = 0;
      if (p === true) {
        (y => {
          if (this.shoppingCartService.getCart()) {
            this.shoppingCartService.getCart().subscribe(value => {
              // tslint:disable-next-line:forin
              for (const item in value.data.shoppingCartItems) {
                y += value.data.shoppingCartItems[item].quantity;
              }
              this.countShoppingCartItem = y;
            });
          }
        })(h);
      }
    });
    if (this.shoppingCartService.getCart()) {
     this.getCartSubscription = this.shoppingCartService.getCart().subscribe(value => {
        // tslint:disable-next-line:forin
        for (const item in value.data.shoppingCartItems) {
          this.countShoppingCartItem +=
            value.data.shoppingCartItems[item].quantity;
        }
      });
    }
    ///////////////// set home icon  ///////////////////
   this.notInHomeSubscription = this.shoppingCartService.notInhome.subscribe(x => {
      if (x === true) {
        this.notInhome = true;
      } else {
        this.notInhome = false;
      }
    });
    this.navBarVisiBiliSubscription = this.shoppingCartService.navBarVisible.subscribe(g => {
      if (g === true) {
        this.navBarVisibility = true;
      } else {
        this.navBarVisibility = false;
      }
    });
    this.authenticationSubscription = this.authService.authenticationStatusListener.subscribe(value => {
      if (value === false) {
        this.Username = '';
        this.countShoppingCartItem = 0;
      }
    });
  }
  getUserNameInitial() {
    this.authService.loginData.subscribe(p => {
      if (p) {
        this.Username = p.email;
        this.isAdminInit(this.Username);
      }
    });
  }
  isAdmin() {
    if (this.authService.decodedTokenGetter()) {
      if (
        this.authService.decodedTokenGetter().email === 'nguesseu@yahoo.com'
      ) {
        this.adminRights = true;
      }
    }
  }
  isAdminInit(value) {
    if (value === 'nguesseu@yahoo.com') {
      this.adminRights = true;
    } else {
      this.adminRights = true;
    }
  }
  ngOnDestroy() {
   this.authenticationSubscription.unsubscribe();
   this.navBarVisiBiliSubscription.unsubscribe();
   this.getCartSubscription.unsubscribe();
   this.loginDataSubscription.unsubscribe();
   this.notInHomeSubscription.unsubscribe();
   this.realTimeCartSubscription.unsubscribe();
   this.reinitCartQuantitySubscription.unsubscribe();
  }
}
