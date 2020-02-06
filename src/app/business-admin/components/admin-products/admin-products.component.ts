import { AuthService } from '../../../user-auth/services/auth.service';
import { ShoppingCartService } from '../../../shared-business/services/shopping-cart.service';
import { ItemModel } from '../../../shared-business/interfaces/item-interface';
import { helpSortId } from 'shared/help-functions/help-sort-by-id';
import { helpSort } from 'shared/help-functions/help-sort';
import { BusinessService } from '../../../shared-business/services/business.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import 'rxjs/add/operator/take';
import { Subscription } from 'rxjs';
import { DataTableResource } from 'angular5-data-table';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  subscriptionAllProducts: Subscription;
  subscriptionAllCategpries: Subscription;
  authenticationSubscription: Subscription;
  tableResources: DataTableResource<ItemModel>;
  itemCount: number;
  allProducts = [];
  allProductsBackup = [];
  categoriesArray = [];
  items: ItemModel[] = [];
  allCategories;
  constructor(private businessService: BusinessService,
    private router: Router,
    private authService: AuthService, private shoppingCartService: ShoppingCartService) {
  }
  private initializeTable(products: ItemModel[]) {
    this.tableResources = new DataTableResource(products);
    // initialising all products in page 1
    this.tableResources.query({ offset: 0 })
      .then(items => this.items = items);
    // returning number of products and initialising itemcount
    this.tableResources.count()
      .then(count => this.itemCount = count);
  }
  reloadItems(params) {
    if (this.tableResources) {
      this.tableResources.query(params)
        .then(items => this.items = items);
    }
  }
  ngOnInit() {
    this.subscriptionAllProducts = this.businessService.getAllItems().subscribe(allItems => {
      this.allProducts = allItems.data.sort(helpSort);
      this.allProductsBackup = this.allProducts;
      this.initializeTable(allItems.data);
    });
    this.subscriptionAllCategpries = this.businessService.getAllCategories().subscribe(categories => {
      this.allCategories = categories.data.sort(helpSortId);
    });
    this.shoppingCartService.changeNotInhome(true);
   this.authenticationSubscription = this.authService.authenticationStatusListener.subscribe(k => {
      if (k === false) {
        this.router.navigate(['/login']);
      }
    });
  }
  ngOnDestroy() {
    this.subscriptionAllCategpries.unsubscribe();
    this.subscriptionAllProducts.unsubscribe();
    this.authenticationSubscription.unsubscribe();
  }
  filter(query: string) {
    const essay = this.allProducts.filter(products => products['name'].toUpperCase().includes(query.toUpperCase()));
    if ((essay.length !== 0) && query !== '') {
      this.allProducts = essay;
    } else {
      this.allProducts = this.allProductsBackup;
    }
  }
}
