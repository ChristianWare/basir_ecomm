export interface CartProduct {
  id: string;
  thumbnail: string;
  title: string;
  price: number;
  totalPrice: number;
  qty: number;
}

export interface CartItems {
  products: CartProduct[];
  id: string;
  totalQty: number;
  totalPrice: number;
}
