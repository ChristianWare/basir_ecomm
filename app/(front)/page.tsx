import ProductItem from "@/components/Products/ProductItem";
import productService from "@/lib/lib/services/productService";
import { convertDocToObj } from "@/lib/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const featuredproducts = await productService.getFeatured();
  const latestProducts = await productService.getLatest();

  return (
    <>
      <h2 className='text-2xl py-2'>Featured Products</h2>
      {featuredproducts.map((product, index) => (
        <div key={product._id} className='carousel-item relative w-full'>
          <Link href={`/product/${product.slug}`}>
            <Image
              src={product.image}
              alt={product.name}
              width={350}
              height={350}
              className='w-full mb-3'
            />
          </Link>
        </div>
      ))}
      <h2 className='text-2xl py-2 mt-10'>Latest Products</h2>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4'>
        {latestProducts.map((product) => (
          <ProductItem key={product.slug} product={convertDocToObj(product)} />
        ))}
      </div>
    </>
  );
}
