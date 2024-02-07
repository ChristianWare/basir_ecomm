"use client";

import useCartService from "@/lib/lib/hooks/useCartStore";
import { OrderItem } from "@/lib/lib/models/OrderModel";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddToCart({ item }: { item: OrderItem }) {
  const router = useRouter();
  const { items, increase, decrease } = useCartService();
  const existItem = items.find((x) => x.slug === item.slug);
  const [quantity, setQuantity] = useState(1);

  const addToCartHandler = () => {
    const maxQuantity = Math.min(quantity, item.countInStock); 
    increase(item, maxQuantity);
    // setQuantity(1); // Reset quantity to 1 after adding to cart
  };

  const removeFromCartHandler = () => {
    if (existItem) {
      if (quantity > 1) {
        decrease(existItem);
        setQuantity(quantity - 1);
      } else {
        decrease(existItem);
      }
    }
  };


  return (
    <div>
      <button
        className='btn'
        type='button'
        // onClick={removeFromCartHandler}
        onClick={() => setQuantity(Math.min(quantity - 1, item.countInStock))}
        disabled={quantity <= 1}
      >
        -
      </button>
      <span className='px-2'>{quantity}</span>
      <button
        className='btn'
        type='button'
        onClick={() => setQuantity(Math.min(quantity + 1, item.countInStock))}
      >
        +
      </button>
      <button
        className='btn btn-primary w-full'
        type='button'
        onClick={addToCartHandler}
        disabled={quantity > item.countInStock} // Disable button if quantity exceeds countInStock
      >
        Add to cart
      </button>
    </div>
  );
}