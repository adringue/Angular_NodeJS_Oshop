import { ShoppingCartItem } from './shoppingCartItem-interface';
export interface ShoppingCart {
  shoppingCartItems: ShoppingCartItem [];
}
///// rename to class then we need to add properties to this object.
// export class ShoppingCart {
//   constructor(public shoppingCartItems: ShoppingCartItem[]) {

//   }
//   get totalItemsCount() {
//     let count = 0;
//     // tslint:disable-next-line:forin
//     for (const item in this.shoppingCartItems) {
//       count += this.shoppingCartItems[item].quantity;
//     }
//     return count;
//   }
// }
