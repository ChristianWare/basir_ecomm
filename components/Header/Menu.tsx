"use client";

import useCartService from "@/lib/lib/hooks/useCartStore";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Menu = () => {
  const { items } = useCartService();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div>
      <ul className='flex items-stretch'>
        <li>
          <Link href='/cart' className='btn btn-ghost rounded-btn'>
            Cart
            {mounted && items.length != 0 && (
              <div className='badge badge-secondary'>
                {items.reduce((a, c) => a + c.qty, 0)}{" "}
              </div>
            )}
          </Link>
        </li>
        <button className='btn btn-ghost rounded-btn' type='button'>
          Sign In
        </button>
      </ul>
    </div>
  );
};

export default Menu;
