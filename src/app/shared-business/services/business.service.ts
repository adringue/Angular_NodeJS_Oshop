import { ItemModel } from '../interfaces/item-interface';
import { CategoryModel } from '../interfaces/category-interface';
import { environment } from '../../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { PostsService } from '../../user/services/posts.service';
import { BehaviorSubject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthData } from '../../user-auth/models/auth-data.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
const BACKEND_URL = environment.api_URL + '/businessCategory';
const BACKEND_URL_ITEM = environment.api_URL + '/businessItem';
@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ///////////////// BUSINESS CATEGORY //////////////////////
  createACategory = (name: string, banner: string, description: string) => {
    const categoryData = new FormData();
    categoryData.append('name', name);
    categoryData.append('banner', banner);
    categoryData.append('description', description);
    return this.http.post(BACKEND_URL + '/create-category', categoryData);
  }
  getAllCategories = () => {
    return this.http.get<{
      success: boolean;
      message: string;
      data: any;
    }>(BACKEND_URL + '');
  }
  removeAllCategories = () => {
    return this.http.delete(BACKEND_URL + '');
  }
  getACategoryById = (categoryid: string) => {
    return this.http.get(BACKEND_URL + '/' + categoryid);
  }
  removeAcategoryById = (categoryid: string) => {
    return this.http.delete(BACKEND_URL + '/' + categoryid);
  }
  updateACategoryById = (categoryid: string, newVal: CategoryModel) => {
    const newValData = new FormData();
    newValData.append('name', newVal.name);
    newValData.append('banner', newVal.banner);
    newValData.append('description', newVal.description);
    return this.http.post(BACKEND_URL + '/update/' + categoryid, newValData);
  }
  /////////////////////////// BUSINESS ITEM /////////////////////////////
  createAnItem = (item: ItemModel) => {
    const itemData = new FormData();
    itemData.append('categoryId', item.categoryId);
    itemData.append('category', item.category);
    itemData.append('name', item.name);
    itemData.append('banner', JSON.stringify(item.banner));
    itemData.append('offers', JSON.stringify(item.offers));
    itemData.append('description', item.description);
    itemData.append('price', JSON.stringify(item.price));
    return this.http.post(BACKEND_URL_ITEM + '/add-new-item', itemData);
  }
  getAllItems = () => {
    return this.http.get<{
      success: boolean;
      message: string;
      data: any;
    }>(BACKEND_URL_ITEM + '');
  }
  removeAllItems = () => {
    return this.http.delete(BACKEND_URL_ITEM + '');
  }
  getItemByCategoryAndItemId = (categoryid: string, itemid: string) => {
    return this.http.get<{
      success: boolean;
      message: string;
      data: any;
    }>(BACKEND_URL_ITEM + '/' + categoryid + '/' + itemid);
  }
  removeItemByCategoryAndItemId = (categoryid: string, itemid: string) => {
    return this.http.delete<{
      success: boolean;
      message: string;
      data: any;
    }>(BACKEND_URL_ITEM + '/' + categoryid + '/' + itemid);
  }
  updateItemByCategoryAndItemId = (
    itemid: string,
    categoryid: string,
    newItem: ItemModel
  ) => {
    const itemDataUpdated = new FormData();
    itemDataUpdated.append('categoryId', categoryid);
    itemDataUpdated.append('name', newItem.name);
    itemDataUpdated.append('category', newItem.category);
    itemDataUpdated.append('description', newItem.description);
    itemDataUpdated.append('price', JSON.stringify(newItem.price));
    itemDataUpdated.append('banner', JSON.stringify(newItem.banner));
    itemDataUpdated.append('offers', JSON.stringify(newItem.offers));
    return this.http.post<{
      success: boolean;
      message: string;
      data: any;
    }>(
      BACKEND_URL_ITEM + '/update/' + categoryid + '/' + itemid,
      itemDataUpdated
    );
  }
}
