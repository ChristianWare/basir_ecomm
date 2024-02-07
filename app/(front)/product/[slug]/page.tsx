import AddToCart from "@/components/Products/AddToCart";
import { convertDocToObj } from "@/lib/lib/utils";
import productService from "@/lib/lib/services/productService";
import Image from "next/image";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const product = await productService.getBySlug(params.slug);
  if (!product) {
    return { title: "Product not found" };
  }
  return {
    title: "Store Name || " + product.name,
    description: product.description,
  };
}

export default async function ProductDetails({
  params,
}: {
  params: { slug: string };
}) {
  const product = await productService.getBySlug(params.slug);
  if (!product) {
    return <div>Product Not Found</div>;
  }

  return (
    <>
      <div className='my-2'>
        <Link href='/'> Back to products</Link>
      </div>
      <div className='grid md:grid-cols-4 md:gap-3'>
        <Image
          src={product.image}
          alt={product.name}
          width={640}
          height={640}
          sizes='100vw'
          style={{
            width: "100%",
            height: "auto",
          }}
        />
      </div>
      <div>
        <ul className='space-y-4'>
          <li>
            <div className='text-xl'>{product.name}</div>
          </li>
          <li>
            {product.rating} of {product.numReviews} reviews
          </li>
          <li>{product.brand}</li>
          <li>
            <div className='divider'></div>
          </li>
          <li>
            Description: <p>{product.description}</p>
          </li>
        </ul>
      </div>
      <div>
        <div className='card bg-base-300 shadow-xl'>
          <div className='card-body'>
            <div className='mb-2 flex justify-between'>
              <div>Price</div>
              <div>${product.price}</div>
            </div>
            <div className='mb-2 flex justify-between'>
              <div>Status</div>
              <div>
                {product.countInStock > 0
                  ? product.countInStock + " In Stock"
                  : "Unavailable"}
                {/* {product.countInStock} */}
              </div>
            </div>
          </div>
          {product.countInStock !== 0 && (
            <div className='card-actions justify-center'>
              <AddToCart
                item={{
                  ...convertDocToObj(product),
                  qty: 0,
                  color: "",
                  size: "",
                }}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
