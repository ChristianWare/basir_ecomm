"use client";

import useCartService from "@/lib/lib/hooks/useCartStore";
import { OrderItem } from "@/lib/lib/models/OrderModel";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddToCart({ item }: { item: OrderItem }) {
  const router = useRouter();
  const { items, increase, decrease } = useCartService();
  const existItem = items.find((x) => x.slug === item.slug);
  const [quantity, setQuantity] = useState(1); // Set initial quantity to 1

  const addToCartHandler = () => {
    increase(item, quantity);
    setQuantity(1);
  };

  const removeFromCartHandler = () => {
    if (existItem && quantity > 1) {
      decrease(existItem);
      setQuantity(quantity - 1);
    } else if (existItem && quantity === 1) {
      decrease(existItem);
      setQuantity(1);
    }
  };

  return (
    <div>
      <button
        className='btn'
        type='button'
        onClick={removeFromCartHandler}
        disabled={quantity <= 1}
      >
        -
      </button>
      <span className='px-2'>{quantity}</span>
      <button
        className='btn'
        type='button'
        onClick={() => setQuantity(quantity + 1)}
      >
        +
      </button>
      <button
        className='btn btn-primary w-full'
        type='button'
        onClick={addToCartHandler}
      >
        Add to cart
      </button>
    </div>
  );
}
