import {ListProductImage} from "./list-product-image";

export class ListProduct {
  id: string;
  name: string;
  stock: number;
  price: number;
  createdDate: Date;
  updateDate: Date;
  productImageFiles?: ListProductImage[];
  imagePath: string;
}
