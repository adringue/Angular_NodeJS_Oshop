import { Offers } from './offers-interface';
import { Banners } from './banners-interface';

export interface ItemModel {
  categoryId: string;
  category: string;
  name: string;
  description: string;
  banner: [Banners];
  offers: [Offers];
  price: number;
}
