import { ShoppingCartService } from '../../../shared-business/services/shopping-cart.service';
import { helpSort } from 'shared/help-functions/help-sort';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomFormsModule } from 'ng2-validation';
import { Offers } from '../../../shared-business/interfaces/offers-interface';
import { Banners } from '../../../shared-business/interfaces/banners-interface';
import { ItemModel } from '../../../shared-business/interfaces/item-interface';
import { BusinessService } from '../../../shared-business/services/business.service';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import 'rxjs/add/operator/take';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit, OnDestroy {
  enableDeleteButton;
  priceField: Number;
  productId;
  productCategoryId;
  newProduct: ItemModel;
  itemEdit: any = {
    '_id': null, 'banner': [{ 'url': null }], 'category': null, 'categoryId': null, 'createAt': null,
    'description': null, 'name': null, 'offers': [{}], 'price': null, 'updateAt': null
  };
  categoriesArray: any = [];
  getAllCateSubscription: Subscription;
  updateItemSubscription: Subscription;
  createItemSubscription: Subscription;
  removeItemSubscription: Subscription;
  constructor(private businessService: BusinessService, private shoppingCartService: ShoppingCartService,
    private route: ActivatedRoute, private router: Router) {
  }
  ngOnInit() {
   this.getAllCateSubscription = this.businessService.getAllCategories().subscribe(categories => {
      this.categoriesArray.push(
        categories.data.filter(dataObject => dataObject['name'])
      );
      this.categoriesArray[0].sort(helpSort);
    });
    // getting route parameters
    this.productId = this.route.snapshot.paramMap.get('id');
    this.productCategoryId = this.route.snapshot.paramMap.get('categoryid');
    if (this.productId && this.productCategoryId) {
      this.businessService.getItemByCategoryAndItemId(this.productCategoryId, this.productId).take(1).subscribe(itm => {
        this.itemEdit = itm.data[0];
      }
      );
    }
  }
  save = (product) => {
    const categoryId: string = (this.categoriesArray[0].filter((catego) => catego['name'] === product.category))[0]._id;
    const _banners: Banners = { 'url': '' };
    const _offers: Offers = {
      'offerTitle': '',
      'offerDescription': '',
      'offerPictureUrl': ''
    };
    const category = product.category;
    const name: string = product.title;
    const description = 'Desciption is not available!';
    const price: number = product.price;
    _banners.url = product.imageUrl;
    _offers.offerTitle = 'Holiday price';
    _offers.offerPictureUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBsWTqlGenZ8QedeGNEqWksamQ6bDccPRFl8i-EzVpVpwu65zn';
    const banner: [Banners] = [_banners];
    const offers: [Offers] = [_offers];
    this.newProduct = { categoryId, category, name, banner, offers, description, price };
    if (this.productId && this.productCategoryId) {
     this.updateItemSubscription = this.businessService
     .updateItemByCategoryAndItemId(this.productId, this.productCategoryId, this.newProduct)
        .subscribe(updatedProduct => {
          this.shoppingCartService.changeRealTimeProduct(true);
        });
    } else {
      this.createItemSubscription = this.businessService.createAnItem(this.newProduct).subscribe((newProductResponse) => {
        this.shoppingCartService.changeRealTimeProduct(true);
      });
    }
    this.router.navigate(['/products']);
  }
  delete() {
    if (confirm('Are you sure about deleting this product?')) {
     this.removeItemSubscription = this.businessService.removeItemByCategoryAndItemId(this.productCategoryId, this.productId)
        .subscribe();
      this.shoppingCartService.changeRealTimeProduct(true);
      this.router.navigate(['/products']);
    }
  }
  ngOnDestroy() {
    this.removeItemSubscription.unsubscribe();
    this.createItemSubscription.unsubscribe();
    this.updateItemSubscription.unsubscribe();
    this.getAllCateSubscription.unsubscribe();
  }
}
