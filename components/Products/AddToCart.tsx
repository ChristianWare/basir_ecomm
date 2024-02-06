"use client";

import useCartService from "@/lib/lib/hooks/useCartStore";
import { OrderItem } from "@/lib/lib/models/OrderModel";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AddToCart({ item }: { item: OrderItem }) {
  const router = useRouter();
  const { items, increase, decrease } = useCartService();
  const [existingItem, setExistingItem] = useState<OrderItem | undefined>();

  useEffect(() => {
    setExistingItem(items.find((x) => x.slug === item.slug));
  }, [item, items]);

  const addToCartHandler = () => {
    increase(item);
  };

  return existingItem ? (
    <div>
      <button
        className='btn'
        type='button'
        onClick={() => decrease(existingItem)}
      >
        -
      </button>
      <span className='px-2'>{existingItem.qty}</span>
      <button
        className='btn'
        type='button'
        onClick={() => increase(existingItem)}
      >
        +
      </button>
    </div>
  ) : (
    <button className='btn btn-primary w-full' onClick={addToCartHandler}>
      Add to Cart
    </button>
  );
}
