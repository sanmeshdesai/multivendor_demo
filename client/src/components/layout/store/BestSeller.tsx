
import { products } from "@/data/products";
import ProductCard from "@/components/products/ProductCard";

export default function BestSellers() {
  return (
    <section className="px-4 py-10 sm:px-10 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Featured Products
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Discover products from our marketplace.
            </p>
          </div>

          <a
            href="/products"
            className="shrink-0 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
          >
            View all →
          </a>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              price={product.price}
              originalPrice={product.originalPrice}
              image={product.image}
              category={product.category}
              vendor={product.vendor}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
