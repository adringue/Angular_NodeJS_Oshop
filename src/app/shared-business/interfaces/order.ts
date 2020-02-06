import { ShoppingCart } from './shoppingCart-interface';
import { map } from 'rxjs/operators';

// those classes are not going to be transpile into javascript file, it will stay ts file

export class Order {
  datePlace: number;
  items: any[];
  constructor(public userId: string, public shipping: any,  shoppingCart: ShoppingCart) {

  this.datePlace = new Date().getTime();
 this.items = shoppingCart.shoppingCartItems.map(item => {
    return {
      'product': {
        'name': item.product.name,
        'imageUrl': item.product.banner[0].url,
        'price': item.product.price
      },
      quantity: item.quantity,
      totalPrice: (item.product.price * item.quantity)
    };
  });

  }



}
