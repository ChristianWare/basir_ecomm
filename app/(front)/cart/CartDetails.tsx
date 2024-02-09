"use client";

import { auth } from "@/lib/lib/auth";
import dbConnect from "@/lib/lib/dbConnect";
import useCartService from "@/lib/lib/hooks/useCartStore";
import CartModel from "@/lib/lib/models/cartModel";
import { Types } from "mongoose";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface CartItemsProps {
  cartId: string;
}

const fetchCartId = async () => {
  try {
    const session = await auth();
    if (!session?.user) {
      return null;
    }

    await dbConnect();
    const [cart] = await CartModel.aggregate([
      { $match: { userId: new Types.ObjectId(session.user.id) } },
      { $project: { id: { $toString: "$_id" } } },
    ]);

    return cart?.id || null;
  } catch (error) {
    console.error("Error fetching cart ID:", error);
    return null;
  }
};

const CartDetails: React.FC<CartItemsProps> = ({ cartId }) => {
  const router = useRouter();
  const { items, itemsPrice, decrease, increase, deleteItem } =
    useCartService();

  const [mounted, setMounted] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchCartIdAndSetState = async () => {
      const id = await fetchCartId();
      setCartId(id);
    };

    fetchCartIdAndSetState();
  }, []);

  if (!mounted) return <></>;

  const handleIncrease = (item: any) => {
    if (item.qty < item.countInStock) {
      increase(item);
    } else {
      console.log(`Cannot increase quantity beyond ${item.countInStock}`);
    }
  };

  const disableCheckout = items.some((item) => item.qty > item.countInStock);

  const handleCheckout = async () => {
    setBusy(true);
    const res = await fetch("/api/checkout", {
      method: "POST",
      body: JSON.stringify({ cartId }),
    });

    const { error, url } = await res.json();

    if (!res.ok) {
      toast.error(error);
    } else {
      window.location.href = url;
    }
    setBusy(false);
  };

  return (
    <>
      <h1 className='py-4 text-2xl'>Shopping Cart</h1>

      {items.length === 0 ? (
        <div>
          Cart is empty. <Link href='/'>Go shopping</Link>
        </div>
      ) : (
        <div className='grid md:grid-cols-4 md:gap-5'>
          <div className='overflow-x-auto md:col-span-3'>
            <table className='table'>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.slug}>
                    <td>
                      <Link
                        href={`/product/${item.slug}`}
                        className='flex items-center'
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={50}
                          height={50}
                        ></Image>
                        <span className='px-2'>{item.name}</span>
                      </Link>
                    </td>
                    <td>
                      <button
                        className='btn'
                        type='button'
                        onClick={() => decrease(item)}
                      >
                        -
                      </button>
                      <span className='px-2'>{item.qty}</span>
                      <button
                        className='btn'
                        type='button'
                        onClick={() => handleIncrease(item)}
                        disabled={item.qty === item.countInStock}
                      >
                        +
                      </button>
                      <button
                        className='btn ml-3'
                        type='button'
                        onClick={() => deleteItem(item)}
                      >
                        remove
                      </button>
                      {item.qty > item.countInStock && (
                        <div className='mt-3'>
                          Please decrease your quantity of this item. Only{" "}
                          <strong>{item.countInStock} </strong>
                          left in stock
                        </div>
                      )}
                    </td>
                    <td>${item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <div className='card bg-base-300'>
              <div className='card-body'>
                <ul>
                  <li>
                    <div className='pb-3 text-xl'>
                      Subtotal ({items.reduce((a, c) => a + c.qty, 0)}) : $
                      {itemsPrice}
                    </div>
                  </li>
                  <li>
                    <button
                      onClick={() => router.push("/shipping")}
                      className='btn btn-primary w-full'
                      disabled={disableCheckout}
                    >
                      Proceed to Checkout
                    </button>
                  </li>
                  <li className='mt-5'>
                    <button
                      onClick={handleCheckout}
                      className='btn btn-primary w-full'
                      disabled={disableCheckout}
                    >
                      Stripe
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartDetails;
